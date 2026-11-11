# CLAUDE.md

App name: **App Starter** (replace). Use it in the PWA manifest and page titles (`src/app.config.ts`).

Read `SPEC.md` first. It's the source of truth.
Shared rules for all personal apps: SecondBrain `wiki/setup/app-stack.md` (stack, auth, standard shell, testing, new-app checklist). Visual rules: SecondBrain `wiki/design/visual-language.md`; this app's decisions go in `DESIGN.md`.
Keep `docs/BUILD-LOG.md`: what's built, why, infra, open items.

## Status
Nothing built beyond the starter shell. Start at step 1.

## Build rules
- Follow the build order in SPEC.md. Stop after each step so I can test, and tell me exactly what to test.
- Ask before every push. No force pushes.
- Merging a PR into `main` needs no extra confirmation once the push is approved.
- Small single-purpose commits that each build. Commit messages explain why, not what.
- If anything in the spec is ambiguous, ask. Don't guess.
- Never commit secrets. `.env*` stays in .gitignore. Service role key never reaches the client.
- Out-of-scope items in SPEC.md stay out unless I say otherwise.
- Supabase: project **personal**, schema `<schema>` only. Never touch `public` or another app's schema. Prefix cron jobs / Edge Functions with `<short name>_`.
- Shell changes (header, avatar menu, tabs, login, PWA, auth) get copied back to `Vathsal/app-starter` in the same session.

## Decided
- (date) ...

## Open items
- ...

## Testing
- `npm test`, `npx tsc --noEmit`, `npm run lint`, `npm run build`.
- UI checks: headless browser at 390px against stubbed data in a scratch copy; never commit stubs.
