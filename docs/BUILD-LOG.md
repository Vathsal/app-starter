# Build log

What's built, why, infra, open items.

## Infrastructure
| Piece | Where |
|---|---|
| App | https://<app>.vercel.app (Vercel project `<app>`, Git-connected; `main` = production) |
| Database + auth | Supabase project **personal** (ref `xrmovlbqjbmwsdcqjyis`), schema `<schema>` |
| Google sign-in | Shared OAuth client; this app's `/auth/callback` in Supabase Redirect URLs |
| Env vars (Vercel) | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `ALLOWED_EMAIL` |

## Steps
| # | PR | What shipped |
|---|---|---|

## Decisions (and why)

## Open items
