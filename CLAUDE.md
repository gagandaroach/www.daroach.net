# CLAUDE.md — daroach.net rebuild

Handoff notes for the next Claude Code session (development is moving to another
machine; memory won't carry over). Read this first, then **`DESIGN_PROPOSAL.md`
is the source of truth** for every decision.

## What this is

A from-scratch rebuild of **www.daroach.net** — Gagan Daroach's personal site.
Active branch: **`dev-2026`** (last commit `0226c7f` as of this writing). The app
lives in **`./www`** (Nuxt 4, `app/` directory convention).

It's three things on one dark, monospace-flavored site:
1. a **fullscreen hero homepage** (`/`),
2. **content** — a blog (`/blog`) + `/about` + a life/career **timeline** (`/timeline`),
3. a **live, self-hosted visitor dashboard** (`/dashboard`) — a world map + traffic,
   fed by **roll-your-own cookieless analytics** (the whole reason this isn't a
   static site).

### The vibe — the "dnet" brand
Dark-mode-first, hacker/homelab aesthetic. The identity has survived every
rewrite and **must be preserved**:
- **Primary:** Red-800 `#991b1b` (`--color-primary`). Surface: near-black `#171717`.
- **Type:** Ubuntu Mono (display/headings), Inter (body), Fira Code (code).
- **Motif:** the `.dnet-card` — `bg-surface/90` + backdrop blur, secondary border
  that turns red on hover, lifts ~2px. Now a `<UiCard>` component, not a CSS class.
- Tone: understated, a little playful ("served from a server in my home"),
  privacy-respecting. Tokens are centralized in `www/app/assets/css/main.css`
  (`@theme`), so the whole look is one file away from a rebrand.

## Locked decisions (do NOT re-litigate — see DESIGN_PROPOSAL §0/§0.1)

- **Nuxt 4 / Vue 3.5 / Tailwind v4** (CSS-first `@theme`, no `tailwind.config.js`).
- **Dark-only for v1.** The color-mode toggle is wired (`@nuxtjs/color-mode`,
  `.dark` class) so adding light later is additive — but only the dark palette
  is polished.
- **NO `@nuxt/ui`.** Hand-built design system: feature-colocated components +
  `app/components/ui/` primitives, styled with **`tailwind-variants` (`tv`)**.
- **Roll-your-own analytics** (Nitro `/api` + better-sqlite3), cookieless: store
  country + a salted-HMAC of the IP, **never the raw IP**. No GoatCounter/Umami.
- **Flat ECharts choropleth** for the map — **no 3D globe** in v1.
- **`/` IS the hero homepage** — no welcome gate/redirect.
- **State:** `useState`/composables first; **Pinia only for the dashboard**.

## Architecture rules (DESIGN_PROPOSAL §5.4a — follow exactly)

This is the real spec. The old `cursor` branch's atomic-design ceremony is
**explicitly rejected**.

1. **Organize by feature/domain**, not technical type or atomic tiers. Nuxt
   auto-imports `app/components/**`; the path IS the name (`ui/Button.vue` →
   `<UiButton>`, `layout/NavBar.vue` → `<LayoutNavBar>`, dedupe adjacent stutter).
2. **Pages fetch, components are dumb.** ALL data fetching (`useAsyncData`/
   `useFetch`/`queryCollection`) lives in `app/pages/**`. Components are pure
   functions of props; data down, events up. (Audited: zero fetches in components.)
3. **`<script setup lang="ts">` everywhere**; Vue 3.5 reactive-destructure props
   (`const { x = 1 } = defineProps<…>()`) — **no `withDefaults`** (none in repo).
4. **Styling = utility-first; variants via `tv`.** Reusable styled things are
   **components with a typed variant fn**, not `@apply` classes. `@apply` is
   confined to `main.css` (base) + the one blog-prose scoped block (which needs
   `@reference "../../assets/css/main.css"` — Tailwind v4 quirk).
5. **Semantic tokens only.** Use `bg-primary`/`text-surface`/`border-secondary`,
   never raw palette (`bg-red-800`). `gray-*` neutrals for text are fine.
6. **Composables for state/logic** (`app/composables/use*.ts`). **Pure utils +
   shared types in `shared/`** (auto-imported by client AND server). **`server/`
   is a hard boundary** — DB/secrets/IP hashing never reach the client.
7. **No barrel files.** Single-responsibility; decompose `.vue` past ~250 lines.

## Repo layout

```
DESIGN_PROPOSAL.md   ← SOURCE OF TRUTH (spec, phased plan §7, decisions, gotchas)
www/                 ← the Nuxt 4 app
  app/
    assets/css/main.css     @theme tokens + dark variant + base
    components/ ui|layout|blog|timeline|dashboard|consent|OgImage
    composables/ useTheme useConsent useAnalytics
    pages/ index about timeline blog/index blog/[...slug] dashboard
    stores/dashboard.ts      (the ONLY Pinia store)
    plugins/analytics.client.ts
  server/
    api/ hit.post.ts stats.get.ts geo.get.ts
    utils/ db.ts (sqlite+migrations) geo.ts (IP/country/HMAC)
  shared/ types/analytics.ts utils/date.ts
  content/ blog/*.md  timeline/*.yml   (timeline blurbs are STUBs; photos pending)
  nuxt.config.ts  content.config.ts
docker/  chart/      ← prod deploy infra (k3s + Helm + Cloudflare Tunnel), carried from `main`
_old/                ← asset-stripped archive of every pre-dev-2026 branch + THEME.md each;
                       _old/_assets/ holds the deduped historical images; see _old/README.md
```

## How to run

```bash
cd www
npm install                          # better-sqlite3 native build needs python3/make/g++
npm run dev                          # http://localhost:3000  (localhost only)
npm run dev -- --host 0.0.0.0        # expose on the LAN
npm run build && node .output/server/index.mjs   # production node-server preview
```
- Analytics DB writes to `www/.data/analytics.sqlite3` (gitignored). Set
  `NUXT_IP_HASH_SALT` in any real run (dev falls back to an insecure default).
- On LAN/localhost there's no Cloudflare header, so `country` is null — expected.

## Status (phases per DESIGN_PROPOSAL §7)

- **Phases 1–5: ✅ DONE & verified.** Shell/brand, content+blog+consent, timeline,
  analytics backend, dashboard. All build-green, screenshotted, committed.
- **Phase 6 (deploy): 🟡 partial.** Done: OG images (takumi renderer +
  `OgImage/Default.takumi.vue`), sharp works locally (linux-x64). **Open below.**
- Extra done: branch collation into `_old/` + `_old/_assets/`; an architecture
  review pass (extracted `<UiBadge>`, `<DashboardPanel>`, `<DashboardTopPaths>`;
  trimmed dead code). Codebase audited consistent with §5.4a.

### Open / next steps
1. **Prod launch regime (Gagan runs it, not Claude).** Update `docker/Dockerfile.prod`
   + `chart/` for the `app/` layout + Tailwind v4; rebuild sharp + better-sqlite3
   + @takumi-rs/core for the **container arch**; add an **analytics PVC** (default
   storageClass) mounted at `NUXT_ANALYTICS_DB_PATH`; wire secrets
   (`NUXT_IP_HASH_SALT`). Then Traefik `forwardedHeaders.trustedIPs` = Cloudflare
   CIDRs + enable the CF visitor-location Managed Transform. **Do NOT run
   `./chart/install.sh` without Gagan's go-ahead** (target host: `blackhole.daroach.lan`).
2. **schema.org still DISABLED** — genuine upstream bug in `nuxt-schema-org` 6.1.2
   / `@unhead/schema-org` (`potentialAction` crash, survives config + explicit
   seeding). Prod-only JSON-LD; revisit after a module bump.
3. **Content (Gagan's, non-blocking):** replace the 6 `STUB` timeline blurbs in
   `www/content/timeline/*.yml`; drop 6 photos into `www/public/timeline/`. The
   `<TimelineEntry>` placeholder handles missing photos with no code change.
4. Stale remote branches left intact (not pruned) so `_old/`-stripped assets stay
   recoverable.

## Landmines learned this session (don't re-discover these)

- **Clean reinstall fixes better-sqlite3** "Could not locate the bindings file"
  (`rm -rf node_modules && npm install`).
- **`tailwind-merge` must be installed explicitly** — it's an optional peer of
  `tailwind-variants`; build fails (`twMerge not exported`) without it.
- **`@vueuse/nuxt` auto-imports `useLocalStorage`/`useSessionStorage` but NOT
  bare `useStorage`** (SSR ReferenceError).
- **Tailwind v4 `@apply` in a scoped `<style>` needs `@reference`** to the main
  CSS.
- **ECharts:** (a) never put a string in a series-data item's `label` (reserved
  style key — crashes); use a custom key like `cname`. (b) Never init echarts in
  a 0×0 container → singular matrix → `resizeGeo` crash; wrap in a sized div +
  gate `<VChart>` behind an `onMounted(()=>nextTick(...))` `ready` ref.
- **`defineOgImageComponent()` must be server-only** — guarded with
  `if (import.meta.server)` in `app.vue`, else the `ssr:false` `/dashboard`
  route 500s (the build won't catch it — ssr:false routes aren't prerendered).
- **`ssr:false` routes aren't prerendered**, so the build can't surface their
  runtime errors — always click-test `/dashboard` after touching it.

## Working conventions

- After each unit of work: ensure **`npm run build` is green**, commit with a
  clear message, push to `origin/dev-2026`.
- Keep **`DESIGN_PROPOSAL.md` §7 updated** (mark phases done w/ commit hash;
  record new deferrals/decisions). Stay within locked decisions — if something
  forces a deviation, note it in the proposal and tell Gagan.
- End commit messages with:
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`
- Verify visually (this machine has `google-chrome-stable`; `puppeteer-core`
  was handy for capturing SPA console errors/stack traces).
