/** Base URL for Supabase auth email links (password reset, etc.). */
export function getSiteUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export function passwordResetRedirectUrl(): string {
  return `${getSiteUrl()}/auth/callback?next=/login/reset-password`;
}
