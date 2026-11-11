import { APP } from "@/app.config";

function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing env var ${name}`);
  return value;
}

// The shared "personal" Supabase project hosts several apps, one schema each.
// Every query from this app targets its own schema.
export const DB_SCHEMA = APP.schema;

// NEXT_PUBLIC_* must be referenced literally so Next can inline them in the client bundle.
export const supabaseUrl = () => required("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL);

export const supabaseKey = () =>
  required("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
