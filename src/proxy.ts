import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAllowedEmail } from "@/lib/allowlist";
import { supabaseKey, supabaseUrl } from "@/lib/supabase/env";

const PUBLIC_PATHS = ["/login", "/auth/", "/offline"];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl(), supabaseKey(), {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (toSet) => {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        toSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // Verifies the JWT and refreshes an expiring session (writes cookies via setAll).
  const { data } = await supabase.auth.getClaims();
  const email = data?.claims?.email as string | undefined;

  const path = request.nextUrl.pathname;
  if (PUBLIC_PATHS.some((p) => path.startsWith(p))) return response;

  if (!data?.claims || !isAllowedEmail(email)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = data?.claims ? "?error=not_allowed" : "";
    const redirect = NextResponse.redirect(url);
    if (data?.claims) {
      // Signed in with the wrong account: drop its session cookies.
      request.cookies
        .getAll()
        .filter((c) => c.name.startsWith("sb-"))
        .forEach((c) => redirect.cookies.delete(c.name));
    }
    return redirect;
  }

  return response;
}

export const config = {
  // Skip static assets and image optimisation.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sw\\.js|manifest\\.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|webmanifest)$).*)",
  ],
};
