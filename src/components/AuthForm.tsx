"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/FormField";
import { createClient } from "@/lib/supabase/client";

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const supabase = createClient();

    if (mode === "signup") {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      setMessage(
        "Account created! If email confirmation is on, check your inbox. Otherwise, log in now."
      );
      setMode("login");
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 w-full max-w-md">
      <div className="card-body">
        <h2 className="card-title justify-center">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p className="text-center text-sm opacity-70 mb-2">
          {mode === "login"
            ? "Log in to track your concerts and spending."
            : "Sign up free and start logging shows."}
        </p>

        <div className="tabs tabs-boxed mb-4">
          <button
            type="button"
            className={`tab flex-1 ${mode === "login" ? "tab-active" : ""}`}
            onClick={() => {
              setMode("login");
              setError(null);
              setMessage(null);
            }}
          >
            Log in
          </button>
          <button
            type="button"
            className={`tab flex-1 ${mode === "signup" ? "tab-active" : ""}`}
            onClick={() => {
              setMode("signup");
              setError(null);
              setMessage(null);
            }}
          >
            Sign up
          </button>
        </div>

        {message && (
          <div className="alert alert-info text-sm">
            <span>{message}</span>
          </div>
        )}
        {error && (
          <div className="alert alert-error text-sm">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField
            label="Email"
            htmlFor="email"
            required
            inputProps={{
              type: "email",
              autoComplete: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "you@example.com",
            }}
          />
          <FormField
            label="Password"
            htmlFor="password"
            required
            hint="At least 6 characters"
            inputProps={{
              type: "password",
              autoComplete: mode === "login" ? "current-password" : "new-password",
              minLength: 6,
              value: password,
              onChange: (e) => setPassword(e.target.value),
            }}
          />
          {mode === "login" && (
            <div className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <div className="hidden sm:block" aria-hidden />
              <Link
                href="/login/forgot-password"
                className="link link-primary text-sm justify-self-start"
              >
                Forgot password?
              </Link>
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary w-full mt-2"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : mode === "login" ? (
              "Log in"
            ) : (
              "Sign up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
