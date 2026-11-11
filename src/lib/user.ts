import "server-only";
import { createClient } from "@/lib/supabase/server";

export type Profile = { email: string; name: string | null; avatarUrl: string | null };

/** Display info for the signed-in user, from the verified session claims (no extra request). */
export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const c = data?.claims;
  if (!c) return null;
  const meta = (c.user_metadata ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" && v ? v : null);
  return {
    email: str(c.email) ?? "",
    name: str(meta.full_name) ?? str(meta.name),
    avatarUrl: str(meta.avatar_url) ?? str(meta.picture),
  };
}
