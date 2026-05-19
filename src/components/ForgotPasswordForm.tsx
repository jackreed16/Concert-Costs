"use client";

import Link from "next/link";
import { useState } from "react";
import { FormField } from "@/components/FormField";
import { passwordResetRedirectUrl } from "@/lib/auth-redirect";
import { createClient } from "@/lib/supabase/client";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      { redirectTo: passwordResetRedirectUrl() }
    );

    setLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setMessage(
      "If an account exists for that email, we sent a reset link. Check your inbox (and spam folder)."
    );
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 w-full max-w-md">
      <div className="card-body">
        <h2 className="card-title justify-center">Forgot your password?</h2>
        <p className="text-center text-sm opacity-70">
          Enter your email and we&apos;ll send you a link to choose a new password.
        </p>

        {message && (
          <div role="alert" className="alert alert-success text-sm">
            <span>{message}</span>
          </div>
        )}
        {error && (
          <div role="alert" className="alert alert-error text-sm">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <FormField
            label="Email"
            htmlFor="forgot-email"
            required
            inputProps={{
              type: "email",
              autoComplete: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "you@example.com",
            }}
          />
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading || !!message}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Send reset link"
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
