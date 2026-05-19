"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormField } from "@/components/FormField";
import { createClient } from "@/lib/supabase/client";

export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setHasSession(!!user);
      setCheckingSession(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  if (checkingSession) {
    return (
      <div className="card bg-base-100 shadow-xl border border-base-300 w-full max-w-md">
        <div className="card-body items-center py-12">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      </div>
    );
  }

  if (!hasSession) {
    return (
      <div className="card bg-base-100 shadow-xl border border-base-300 w-full max-w-md">
        <div className="card-body gap-4">
          <h2 className="card-title justify-center">Reset link expired</h2>
          <p className="text-center text-sm opacity-70">
            Open the reset link from your email again, or request a new one.
          </p>
          <Link href="/login/forgot-password" className="btn btn-primary">
            Request new link
          </Link>
          <Link href="/login" className="btn btn-ghost btn-sm">
            Back to log in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 w-full max-w-md">
      <div className="card-body">
        <h2 className="card-title justify-center">Choose a new password</h2>
        <p className="text-center text-sm opacity-70">
          Enter your new password below.
        </p>

        {error && (
          <div role="alert" className="alert alert-error text-sm">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <FormField
            label="New password"
            htmlFor="new-password"
            required
            hint="At least 6 characters"
            inputProps={{
              type: "password",
              autoComplete: "new-password",
              minLength: 6,
              value: password,
              onChange: (e) => setPassword(e.target.value),
            }}
          />
          <FormField
            label="Confirm password"
            htmlFor="confirm-password"
            required
            inputProps={{
              type: "password",
              autoComplete: "new-password",
              minLength: 6,
              value: confirm,
              onChange: (e) => setConfirm(e.target.value),
            }}
          />
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Update password"
            )}
          </button>
        </form>

        <Link href="/login" className="btn btn-ghost btn-sm mt-2">
          Back to log in
        </Link>
      </div>
    </div>
  );
}
