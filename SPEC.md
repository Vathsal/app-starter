# <App> - V1 Spec

Who it's for and the one job it does.

## Core loop
1.
2.
3.

## Screens
Bottom tabs: ...
1. **...**

## Logic
- Times in America/New_York.

## Stack
- Next.js (App Router, TypeScript) PWA on Vercel, from `Vathsal/app-starter`.
- Supabase project **personal**, schema `<schema>`. Google sign-in, allowlist = owner.

## Data model (schema `<schema>`)
- ...
- RLS: user tables = `user_id = auth.uid() and <schema>.is_owner()`.

## Design
- See `DESIGN.md`. Accent meaning: ...

## Out of V1
- ...

## Build order
1. Scaffold from app-starter + schema + Google auth (allowlist) + Vercel deploy
2. ...

## Acceptance
- Only the owner's Google account can sign in
- Installs as a PWA on Android; a new deploy reaches it without reinstall
