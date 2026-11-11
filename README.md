# app-starter

Starter for Vathsal's personal apps: Next.js 16 + Supabase (one schema per app in project **personal**) + Vercel, with owner-only Google sign-in and the standard shell already built.

Rules and the full new-app checklist: SecondBrain `wiki/setup/app-stack.md`.

## What's in it
- Login screen, Google sign-in, allowlist checked in `src/proxy.ts` and `/auth/callback`
- Header with brand left and avatar menu right (`Hi, {name}`, email, Log out)
- Bottom tab bar from `APP.tabs`, accent pill on the active tab
- Error screen that keeps the shell, offline page, service worker, manifest
- `lib/time.ts` (America/New_York, DST-tested), allowlist and time tests
- Starter migration: app schema, own allowlist table + `is_owner()`, example owner-only table
- Doc templates: `CLAUDE.md`, `SPEC.md`, `DESIGN.md`, `docs/BUILD-LOG.md`

## Start a new app
1. GitHub: **Use this template** -> new private repo.
2. Edit `src/app.config.ts` (name, brand, schema, tabs) and `--accent` in `src/app/globals.css`.
3. In `supabase/migrations/00000000000000_app_schema.sql`: replace `starter` with the schema, rename with a real timestamp.
4. Fill in `SPEC.md` and `CLAUDE.md`, then follow the checklist in `wiki/setup/app-stack.md` (migration, allowlist row, exposed schema, redirect URL, Vercel env vars).

## Commands
`npm test` · `npx tsc --noEmit` (after `next build`) · `npm run lint` · `npm run build`
