import { createBrowserClient } from "@supabase/ssr";
import { DB_SCHEMA, supabaseKey, supabaseUrl } from "./env";

export function createClient() {
  return createBrowserClient(supabaseUrl(), supabaseKey(), {
    db: { schema: DB_SCHEMA },
  });
}
