"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const ERRORS: Record<string, string> = {
  not_allowed: "That account isn't on the list.",
  auth: "Sign-in failed. Try again.",
};

export function LoginForm() {
  const error = useSearchParams().get("error");
  const [pending, setPending] = useState(false);

  async function signIn() {
    setPending(true);
    const { error } = await createClient().auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        // Always show the account picker so a wrong account can be swapped.
        queryParams: { prompt: "select_account" },
      },
    });
    if (error) setPending(false);
  }

  return (
    <>
      {error && <p className="login-error">{ERRORS[error] ?? ERRORS.auth}</p>}
      <button className="pill fill" onClick={signIn} disabled={pending}>
        {pending ? "Opening Google…" : "Sign in with Google"}
      </button>
    </>
  );
}
