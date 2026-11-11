// Single-user app: only the owner's Google account may use it.
// ALLOWED_EMAIL is server-only (no NEXT_PUBLIC_ prefix) and may hold a comma-separated list.
// Encore keeps its own allowlist: the shared Supabase project has other apps' users, so the
// database repeats this check in `encore.is_owner()` (table `encore.allowed_emails`).
export function isAllowedEmail(
  email: string | null | undefined,
  allowList: string | undefined = process.env.ALLOWED_EMAIL,
): boolean {
  if (!email) return false;
  const allowed = (allowList ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.trim().toLowerCase());
}
