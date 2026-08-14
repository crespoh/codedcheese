import { useAuth } from "@/auth/AuthProvider";
import { supabase } from "@/lib/supabaseClient";
import AuthLayout from "@/components/AuthLayout";

export default function AppHome() {
  const { user } = useAuth();

  return (
    <AuthLayout>
      <div className="max-w-lg">
        <h1 className="font-display text-2xl font-bold mb-2">Welcome</h1>
        <p className="text-ink-soft mb-6">You're signed in.</p>

        <dl className="rounded-md border border-line-strong bg-surface divide-y divide-line text-sm mb-6">
          <div className="flex flex-wrap gap-2 justify-between px-3 py-2">
            <dt className="font-mono text-xs uppercase tracking-wide text-ink-soft">Email</dt>
            <dd className="break-all">{user?.email ?? "—"}</dd>
          </div>
          <div className="flex flex-wrap gap-2 justify-between px-3 py-2">
            <dt className="font-mono text-xs uppercase tracking-wide text-ink-soft">User ID</dt>
            <dd className="font-mono text-xs break-all">{user?.id ?? "—"}</dd>
          </div>
        </dl>

        <button
          onClick={() => supabase.auth.signOut()}
          className="rounded-md border border-line-strong px-4 py-2 font-medium transition-colors hover:bg-surface"
        >
          Sign out
        </button>
      </div>
    </AuthLayout>
  );
}
