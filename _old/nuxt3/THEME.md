# `nuxt3` — older Nuxt 3 iteration

**Source:** `origin/nuxt3` · **Stack:** Nuxt 3.10, `@nuxt/content` v2.

## Main theme
An **earlier Nuxt 3** pass, predating `dev`. Mostly superseded, but two
structural ideas are visible:

- **Split CSS files** — `assets/css/{dnet,dnet-bg,dnet-blog,dnet-navbar,dnet-text}.css`
  instead of one stylesheet. `dev-2026` consolidates into a single
  `app/assets/css/main.css` with Tailwind v4 `@theme` tokens (§4).
- **`components/Breadcrumbs.vue`** — a breadcrumbs component. Not yet in
  `dev-2026`; could be revisited if deep nav is wanted.

Also carries the same welcome-gate pattern (`middleware/showWelcome.global.ts`,
`pages/welcome.vue`) that `dev-2026` drops, and a `stores/settings.js`.

## Verdict
Superseded by `dev` → `dev-2026`. Keep for the breadcrumbs idea only.
