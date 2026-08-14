import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import AuthLayout from "@/components/AuthLayout";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function finalize() {
      try {
        // If PKCE code param present, exchange explicitly; otherwise detectSessionInUrl handles it
        const code = params.get("code");
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) throw exchangeError;
        }
        // After finalizing session, go to protected area
        if (isMounted) navigate("/app", { replace: true });
      } catch (e) {
        const detail = e instanceof Error ? e.message : null;
        setError(detail ?? "Authentication failed. Please try again.");
      }
    }
    finalize();
    return () => {
      isMounted = false;
    };
  }, [navigate, params]);

  if (error) {
    return (
      <AuthLayout>
        <div className="max-w-sm">
          <h1 className="font-display text-2xl font-bold mb-2">Authentication error</h1>
          <p className="rounded-md border border-danger/40 px-3 py-2 text-sm text-danger mb-6">
            {error}
          </p>
          <Link
            to="/login"
            className="inline-block rounded-md bg-brand px-4 py-2 font-medium text-brand-ink transition-opacity hover:opacity-90"
          >
            Try again
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
