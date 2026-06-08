# `dev` — the dnet design language + consent UX

**Source:** `origin/dev` · **Stack:** Nuxt 3.13, Tailwind 3.4, `@nuxt/content` v2.

## Main theme
The branch with the **best-realized "dnet" brand** — it's the design source
`dev-2026` ports forward. The notable pieces:

- **`www/assets/css/main.css`** — the canonical token block: `--color-primary: 153 27 27`
  (Red-800 `#991b1b`), `--color-surface` near-black, Ubuntu Mono / Inter / Fira
  Code, and the `.dnet-card` / `.dnet-button` / `.focus-ring` classes.
  → `dev-2026` ports the **token values** into Tailwind v4 `@theme`, but
  re-expresses `.dnet-card`/`.dnet-button` as `<UiCard>`/`<UiButton>` components
  via `tailwind-variants` (§4 / §5.4a) rather than `@apply` classes.
- **Cookie-consent UX** — `www/stores/cookieStore.ts` (Pinia) +
  `www/components/cookies/Consent.vue` + a footer "reset" button.
  → `dev-2026` keeps the UX as a non-blocking transparency notice, but as a
  `useConsent()` composable (no Pinia) + `<ConsentNotice>` (§5.7).
- Component prefixing (`Card*`, `Cookie*`, `Dbg*`), placeholder home cards
  ("Web Traffic", "Hardware Status", "The Wall").
- `www/composables/images/PeshtigoTree.ts` — image helper that may suit the
  Peshtigo HS timeline entry (§5.3).

## NOT carried forward
- `middleware/showWelcome.global.ts` + `pages/welcome.vue` — the welcome→home
  gate. Dropped: `/` IS the hero homepage now (§0.1/§5.1).
