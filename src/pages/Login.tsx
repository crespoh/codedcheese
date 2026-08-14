import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AuthLayout from "@/components/AuthLayout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (signInError) throw signInError;
      setMessage("Check your email for a login link.");
    } catch (err) {
      const detail = err instanceof Error ? err.message : null;
      setError(detail ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="max-w-sm">
        <h1 className="font-display text-2xl font-bold mb-2">Sign in</h1>
        <p className="text-ink-soft mb-6">
          Enter your email and you'll get a link that signs you in — no password to remember.
        </p>

        <form onSubmit={onSubmit} className="grid gap-4">
          <label className="grid gap-1.5">
            <span className="font-mono text-xs uppercase tracking-wide text-ink-soft">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full rounded-md border border-line-strong bg-surface px-3 py-2 text-ink placeholder:text-ink-soft/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40 transition-colors"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-brand px-4 py-2 font-medium text-brand-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending…" : "Send magic link"}
          </button>

          {message && (
            <p className="rounded-md border border-line-strong bg-surface px-3 py-2 text-sm">
              {message}
            </p>
          )}
          {error && (
            <p className="rounded-md border border-danger/40 px-3 py-2 text-sm text-danger">
              {error}
            </p>
          )}
        </form>

        <p className="mt-6 text-sm text-ink-soft">
          If your link is expired, request a new one. If you recently signed up, check your inbox to
          confirm your email.
        </p>
      </div>
    </AuthLayout>
  );
}
