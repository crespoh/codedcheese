import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import AuthLayout from "@/components/AuthLayout";

// How long to wait for a session before assuming the link won't complete.
const SESSION_TIMEOUT_MS = 10_000;

/**
 * Magic links use the implicit flow (supabase-js defaults to flowType:
 * 'implicit'), so the tokens arrive in the URL *fragment* and are consumed
 * asynchronously by detectSessionInUrl inside the client's _initialize().
 * That resolves after this component's effect runs, so navigating straight to
 * /app raced the session: RequireAuth could read a null session and bounce the
 * user back to /login. Wait for the session to actually exist instead.
 *
 * Failures in the URL are swallowed by the client (it logs and moves on), so
 * the error fragment is read here directly -- otherwise an expired link would
 * sit on "Signing you in..." forever.
 */
function readUrlError(search: string): string | null {
  const fromHash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const fromQuery = new URLSearchParams(search);
  const description = fromHash.get("error_description") ?? fromQuery.get("error_description");
  const code = fromHash.get("error") ?? fromQuery.get("error");
  if (!description && !code) return null;
  return description ?? code;
}

export default function AuthCallback() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const search = params.toString();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let settled = false;

    const urlError = readUrlError(search);
    if (urlError) {
      setError(urlError);
      return;
    }

    const succeed = () => {
      if (settled) return;
      settled = true;
      navigate("/app", { replace: true });
    };

    const fail = (message: string) => {
      if (settled) return;
      settled = true;
      setError(message);
    };

    // Subscribe before reading the session so the SIGNED_IN event that
    // detectSessionInUrl emits can't land in the gap and be missed.
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) succeed();
    });

    async function settle() {
      try {
        // A ?code= param means PKCE, which needs an explicit exchange.
        const code = new URLSearchParams(search).get("code");
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) throw exchangeError;
        }
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) succeed();
      } catch (e) {
        fail(e instanceof Error ? e.message : "Authentication failed. Please try again.");
      }
    }
    settle();

    const timer = window.setTimeout(
      () => fail("That sign-in link didn't complete. It may have expired — request a new one."),
      SESSION_TIMEOUT_MS
    );

    return () => {
      settled = true;
      subscription.subscription.unsubscribe();
      window.clearTimeout(timer);
    };
  }, [navigate, search]);

  if (error) {
    return (
      <AuthLayout>
        <div className="max-w-sm">
          <h1 className="font-display text-2xl font-bold mb-2">Couldn't sign you in</h1>
          <p className="rounded-md border border-danger/40 px-3 py-2 text-sm text-danger mb-6">
            {error}
          </p>
          <Link
            to="/login"
            className="inline-block rounded-md bg-brand px-4 py-2 font-medium text-brand-ink transition-opacity hover:opacity-90"
          >
            Request a new link
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="max-w-sm">
        <h1 className="font-display text-2xl font-bold mb-2">Signing you in…</h1>
        <p className="text-ink-soft">Please wait while we complete your login.</p>
      </div>
    </AuthLayout>
  );
}
