"use client";

import { useState } from "react";
import { FormField } from "@/components/FormField";
import { createClient } from "@/lib/supabase/client";

export function ChangePasswordForm({ userEmail }: { userEmail: string }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (password.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("New passwords do not match.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: currentPassword,
    });

    if (signInError) {
      setLoading(false);
      setError("Current password is incorrect.");
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    setCurrentPassword("");
    setPassword("");
    setConfirm("");
  };

  return (
    <div className="card bg-base-100 shadow-md border border-base-300 max-w-lg">
      <div className="card-body">
        <h2 className="card-title text-lg">Change password</h2>
        <p className="text-sm opacity-70">
          Enter your current password, then choose a new one.
        </p>

        {success && (
          <div role="alert" className="alert alert-success text-sm">
            <span>Password updated successfully.</span>
          </div>
        )}
        {error && (
          <div role="alert" className="alert alert-error text-sm">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <FormField
            label="Current password"
            htmlFor="current-password"
            required
            inputProps={{
              type: "password",
              autoComplete: "current-password",
              value: currentPassword,
              onChange: (e) => setCurrentPassword(e.target.value),
            }}
          />
          <FormField
            label="New password"
            htmlFor="settings-new-password"
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
            label="Confirm new password"
            htmlFor="settings-confirm-password"
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
      </div>
    </div>
  );
}
