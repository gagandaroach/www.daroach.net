# `post-cassie` — a bug-fix pass over `dev`

**Source:** `origin/gdaroach/post-cassie-session-1` · **Stack:** Nuxt 3.13.

## Main theme
A small **bug-fix / cleanup session on top of `dev`** — not a distinct app, so
it's captured here as a **patch** rather than a duplicated tree:

- **`dev-to-post-cassie.patch`** — the full diff from `origin/dev` to this branch.

## What it changed (4 files)
- `www/components/card/GaganIntro.vue` — minor fix.
- `www/components/global/TheFooter.vue` — the `:href` binding fix (the old footer
  had a literal `"{{ githubUrl }}"` string in an `href` attribute).
- `www/composables/images/PeshtigoTree.ts` — tweaks.
- `www/stores/cookieStore.ts` — consent-store hardening (the bulk of the diff).

## Verdict
Cherry-pick-only. The footer `:href` fix and the cookie-store hardening are the
useful bits; `dev-2026` reimplements both areas fresh (footer as
`components/layout/Footer.vue`, consent as `useConsent()`), so the patch is
reference, not something to apply. The base tree is under [`../dev/`](../dev/THEME.md).
