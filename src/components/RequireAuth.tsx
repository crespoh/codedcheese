import { PropsWithChildren } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import AuthLayout from "@/components/AuthLayout";

export function RequireAuth({ children, requireEmailConfirmed = false }: PropsWithChildren<{ requireEmailConfirmed?: boolean }>) {
  const { loading } = useAuthGuard({ requireEmailConfirmed });

  if (loading) {
    return (
      <AuthLayout>
        <div className="max-w-sm">
          <h1 className="font-display text-2xl font-bold mb-2">Loading…</h1>
          <p className="text-ink-soft">Checking your session.</p>
        </div>
      </AuthLayout>
    );
  }

  return <>{children}</>;
}

export default RequireAuth;
