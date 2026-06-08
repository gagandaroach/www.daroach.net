# daroach.net — Fresh-Slate Design Proposal

> **Status:** Reviewed — key decisions confirmed by Gagan 2026-06-08 (see [§0.1](#01-confirmed-decisions-2026-06-08)). **Audience:** the follow-up engineering agent who will execute the rebuild.
> **Date:** 2026-06-08. **Author:** research + reconciliation pass (3 parallel agents: branch archaeology, modern-stack research, feature research).
>
> **Goal in one sentence:** start from a clean Nuxt 4 / Vue 3.5 / Tailwind v4 codebase that ships the *production deployment story already proven on `main`* (k3s + Helm + Cloudflare Tunnel) but folds in the *features and design language scattered across `dev`, `gdaroach/cursor`, and the old Next.js `main-bk*` branches*.

---

## 0. TL;DR — the decisions this proposal makes

| Decision | Choice | Why |
|---|---|---|
| Framework | **Nuxt 4.x** (`app/` srcDir), Vue 3.5+ | Latest stable; the `gdaroach/update-dev-to-nuxt4` branch already proved the bump is low-risk |
| Styling | **Tailwind CSS v4** via `@tailwindcss/vite` + CSS-first `@theme` | v4 is the 2026 default; drop the legacy `tailwind.config.js` |
| Components | **`@nuxt/ui` v4 NOT adopted** — hand-built design system: feature-colocated components + `ui/` primitives, **`tailwind-variants` (`tv`)** for variants | Keep full design control of the dnet brand. NOT atomic-design — see §5.4a. The `cursor` branch's atomic ceremony is explicitly rejected |
| State | **`useState` first, Pinia only for the dashboard** | Small site; avoid premature Pinia everywhere |
| Content/blog | **`@nuxt/content` v3** (SQLite-backed, `content.config.ts` collections) | Already a dependency; v3 is why `better-sqlite3` is in the tree |
| Analytics | **Roll-your-own Nitro `/api` + better-sqlite3**, cookieless, store country + salted-HMAC, never raw IP | Gagan wants *his own* dashboard + world map; SaaS tools don't expose a raw geo feed |
| Geo source | **`CF-IPCountry` header** (free, already at the edge) + optional local **GeoLite2-City** for points | Privacy-first, offline, no third-party IP leakage |
| World map | **ECharts via `vue-echarts`** for the flat choropleth; **globe.gl** as an optional 3D showpiece | Best 2D map ergonomics; reuse-chart.js path noted as fallback |
| Dark mode | **`@nuxtjs/color-mode`** + Tailwind v4 `@custom-variant dark` | No-flash SSR, system detection, persistence handled for us |
| Consent | **Keep the existing lightweight banner as a transparency notice**; no blocking banner legally required given cookieless analytics | ePrivacy exemption applies to first-party cookieless analytics |
| Deployment | **Carry `chart/` + `docker/Dockerfile.prod` + `install.sh` forward from `main` verbatim** | It's production-proven; don't reinvent it |

**Things I need from Gagan before/while executing** are collected in [§9](#9-open-questions--what-i-need-from-gagan). The big one: the **timeline content** (dates + events since 2012).

### 0.1 Confirmed decisions (2026-06-08)

These four were locked in by Gagan after the first draft — they override anything looser below:

| Question | Decision | Impact |
|---|---|---|
| Light vs dark for v1 | **Dark-only v1**, light theme deferred to a later pass | Phase 1 ships only the canonical dark "dnet" palette; still wire `@nuxtjs/color-mode` + the `@custom-variant dark` so adding light later is purely additive (no refactor) |
| Analytics approach | **Roll-your-own** Nitro + better-sqlite3 | Confirms §5.2 as written; do not pull in GoatCounter/Umami |
| World map | **Flat ECharts choropleth for v1**; 3D globe deferred | Phase 5 builds only the `vue-echarts` country map; skip globe.gl (no Three.js bundle in v1) |
| `@nuxt/ui` | **Not adopted** — hand-built light atomic set | Confirms §5.4; full control of the dnet brand |

---

## 1. Where we are — branch reconciliation

The repo is the sediment of many rewrites. Here's what each branch actually contains and what's worth salvaging.

### 1.1 Branch capability matrix

| Branch | Stack | What's good here | Carry forward? |
|---|---|---|---|
| **`origin/main`** | Nuxt 3.13, Tailwind 3.4 | **The production deployment**: `chart/` Helm chart, `docker/Dockerfile.prod`, `chart/install.sh`, `docker/launch.sh`. Live on k3s + Cloudflare Tunnel. | ✅ **Deployment infra verbatim** |
| **`origin/dev`** | Nuxt 3.13, Tailwind 3.4 | Best **design tokens** (`www/assets/css/main.css`: `--color-primary: 153 27 27`, Ubuntu Mono / Inter / Fira Code, `.dnet-card`/`.dnet-button`/`.focus-ring`). Cookie-consent Pinia store + footer reset button. Component prefixing (`Card*`, `Cookie*`, `Dbg*`). Placeholder home cards: "Web Traffic", "Hardware Status", "The Wall". | ✅ **Design language + consent UX** |
| **`origin/gdaroach/cursor`** | Nuxt 3.13 | Frontend-**learning sandbox**: full atoms/molecules/organisms/templates atomic-design ceremony + `useAtomicDesign()` — *over-engineered, NOT the model* (see §5.4a). One reusable idea: the `HardwareStatus.vue` live-updating card concept. | ⚠️ **Reject the architecture**; reimplement at most the hardware-card idea |
| **`gdaroach/update-dev-to-nuxt4`** | **Nuxt 4.2.1** | Proves the Nuxt 4 bump = a one-line `package.json` change; rest of `dev` is compatible. | ✅ **Validates the Nuxt 4 target** |
| **`origin/gdaroach/post-cassie-session-1`** | Nuxt 3.13 | Bug-fix pass over `dev` (e.g. `:href` binding fix in footer). | ⚠️ Cherry-pick fixes only |
| **`origin/nuxt3`** | Nuxt 3.10, Content v2 | Older; separated CSS files (`dnet-bg/blog/navbar/text.css`), `Breadcrumbs.vue`. | ❌ Superseded (maybe breadcrumbs idea) |
| **`origin/main-bk1` / `main-bkup`** | **Next.js 12 + React + MongoDB** | **The only real analytics implementation that ever shipped**: `pages/_middleware.ts` (`postHit()` capturing path/UA/method/protocol/timestamp), `pages/api/hits/{index,count}.ts`, `models/Hit.js`, `components/charts/PageViews.tsx` (chart.js pie). Also a `/contact` page. | ✅ **Analytics data-model reference** (port React→Vue, Mongo→SQLite) |
| **`_old/`** (working tree) | Next.js 12 | Same lineage as `main-bk1`; Dockerized Next. | ❌ Archive/delete after porting analytics ideas |

### 1.2 Consistent design language across every iteration (the "dnet" brand)

These have survived every rewrite and **must be preserved** — they are daroach.net's identity:

- **Primary color:** Red-800 `#991b1b` (`--color-primary: 153 27 27`), also the `theme-color` meta. Used for borders, buttons, accents.
- **Surface:** near-black `#171717` (`--color-surface: 23 23 23`); **dark-mode-first**.
- **Typography:** **Ubuntu Mono** (display/headings), **Inter** (body), **Fira Code** (code).
- **UI motif:** the **`.dnet-card`** — `bg-surface/90 backdrop-blur-lg`, secondary border that turns red on hover, lifts `-2px`. Card-grid home layout.
- **Radius/motion tokens:** `--radius-md: 8px`, `--ease-emphasized: cubic-bezier(0.4,0,0.2,1)`, `--duration-md: 300ms`.
- **A11y:** `.focus-ring` utility already in use.

The verbatim token block lives at `dev:www/assets/css/main.css` — **port it into the Tailwind v4 `@theme` block** (see §4).

---

## 2. Target stack & versions

| Layer | Choice (mid-2026) | Notes |
|---|---|---|
| Runtime | **Node 22.x LTS** | Nuxt 4 floor is Node ≥ 20.19; Dockerfile already uses `node:22-alpine` |
| Package manager | **pnpm** (recommend) or stay on npm | pnpm = faster/stricter; npm is fine and matches current Docker copy-`package.json` flow |
| Framework | **Nuxt 4.x**, **Vue 3.5+** | `srcDir = app/`; split tsconfigs |
| CSS | **Tailwind v4** via `@tailwindcss/vite`; CSS-first `@theme` | **Do not** use `@nuxtjs/tailwindcss` (v3-era) |
| Content | **`@nuxt/content` v3** (3.14+) | SQLite-backed; `content.config.ts` collections; Shiki highlighting built in |
| Modules | `@nuxt/image`, **`@nuxt/fonts`** (replaces `@nuxtjs/google-fonts`), **`@nuxtjs/color-mode`**, **`@vueuse/nuxt`**, **`@pinia/nuxt`** (dashboard only), **`@nuxtjs/seo`** + `nuxt-og-image` | `@nuxt/fonts` self-hosts + avoids CLS |
| Component styling | **`tailwind-variants`** (`tv`) for typed component variants (pulls in `tailwind-merge`) | Matches Nuxt UI internals; replaces `@apply` class libraries — see §5.4a |
| Charts/maps | **`echarts` + `vue-echarts`**; optional `globe.gl`/`three-globe`; (`chart.js`+`vue-chartjs` already present as fallback) | |
| DB | **`better-sqlite3`** (already present) | analytics + content both use SQLite |
| Geo | **GeoLite2-City `.mmdb`** via `maxmind` npm (optional) + `CF-IPCountry` header | |

> **Reference (official):** Nuxt 4 directory structure <https://nuxt.com/docs/4.x/directory-structure> · data fetching <https://nuxt.com/docs/4.x/getting-started/data-fetching> · rendering <https://nuxt.com/docs/4.x/guide/concepts/rendering> · Tailwind+Nuxt install <https://tailwindcss.com/docs/installation/framework-guides/nuxt> · Tailwind theme <https://tailwindcss.com/docs/theme> · Tailwind dark mode <https://tailwindcss.com/docs/dark-mode> · Vue 3.5 <https://blog.vuejs.org/posts/vue-3-5> · Nuxt Content v3 <https://content.nuxt.com/> · color-mode <https://nuxt.com/modules/color-mode>.

---

## 3. Project architecture & directory layout

Nuxt 4 moves application code into `app/`. Keep `www/` as the app root (so the Dockerfile/chart paths stay valid) and adopt the `app/` convention *inside* it:

```
www/
  app/
    assets/css/main.css         # @import "tailwindcss"; @theme {...}; @layer components { .dnet-* }
    components/
      brand/                    # Logo, wordmark
      cards/                    # DnetCard + the home card variants (Traffic, Hardware, Wall)
      layout/                   # TheNavBar, TheFooter
      consent/                  # CookieConsent (transparency notice)
      timeline/                 # Timeline, TimelineEntry
      dashboard/                # WorldMap, GlobeView, VisitorStats
      ui/                       # Button, Heading, Paragraph, SectionHeader (the "atoms")
    composables/
      useTheme.ts               # wraps useColorMode()
      useAnalytics.ts           # client beacon -> /api/hit
    layouts/
      default.vue               # navbar + slot + footer
      fullscreen.vue            # bare, for the landing page
    middleware/                 # (welcome redirect, if kept)
    pages/
      index.vue                 # fullscreen landing
      about.vue
      timeline.vue
      blog/index.vue
      blog/[...slug].vue
      dashboard.vue             # world map + visitor stats (ssr:false)
    app.vue
    app.config.ts               # { title: 'daroach.net' }
    error.vue
  server/
    api/
      hit.post.ts               # record a visit
      stats.get.ts              # aggregate for dashboard
      geo.get.ts                # country counts for the map
    middleware/
      track.ts                  # (optional) server-side auto-tracking
    utils/
      db.ts                     # better-sqlite3 singleton + migrations
      geo.ts                    # GeoLite2 lookup + IP hashing helpers
  content/
    blog/*.md
    timeline/*.md               # OR a single data file — see §5.3
  public/
  content.config.ts             # blog (+ timeline) collections
  nuxt.config.ts
  package.json
docker/Dockerfile.prod          # carried from main (verify app/ paths)
chart/                          # carried from main verbatim
```

**`nuxt.config.ts` skeleton:**
```ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content', '@nuxt/image', '@nuxt/fonts',
    '@nuxtjs/color-mode', '@vueuse/nuxt', '@pinia/nuxt', '@nuxtjs/seo',
  ],
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  colorMode: { classSuffix: '' },           // toggles `.dark` (no `-mode` suffix)
  fonts: { /* Ubuntu Mono, Inter, Fira Code */ },
  runtimeConfig: {
    ipHashSalt: '',                          // from env, rotated
    public: { apiBase: '/api' },
  },
  app: { head: { meta: [{ name: 'theme-color', content: '#991b1b' }] } },
  routeRules: {
    '/':            { prerender: true },
    '/about':       { prerender: true },
    '/timeline':    { prerender: true },
    '/blog':        { isr: 3600 },
    '/blog/**':     { isr: true },
    '/dashboard':   { ssr: false },          // client-only; reads live SQLite
    '/api/**':      { cors: true },
  },
  compatibilityDate: '2026-06-01',
})
```

**State:** use `useState('theme')`-style for trivial shared state; introduce a single **Pinia store only for the dashboard** (`stores/dashboard.ts`) if it grows multiple getters/actions. Never declare module-top-level `ref()` (SSR cross-request leak).

---

## 4. Design system (Tailwind v4 port of the "dnet" brand)

Port `dev:www/assets/css/main.css` into v4's CSS-first model. The tokens stay identical; only the syntax changes.

```css
/* app/assets/css/main.css */
@import "tailwindcss";

/* class-based dark mode wired to @nuxtjs/color-mode's .dark class */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-primary:   oklch(0.43 0.16 27);   /* ~#991b1b Red-800 */
  --color-surface:   oklch(0.20 0 0);        /* ~#171717 */
  --color-secondary: oklch(0.55 0.02 260);   /* Gray-600 */
  --color-error:     oklch(0.64 0.21 25);
  --font-display: "Ubuntu Mono", monospace;
  --font-body:    "Inter", sans-serif;
  --font-code:    "Fira Code", monospace;
  --radius-md: 0.5rem;
  --ease-emphasized: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Keep @layer for genuinely global, element-level base styles only: */
@layer base {
  body { @apply bg-surface text-gray-100 font-body antialiased; }
  h1, h2, h3 { @apply font-display tracking-tight; }
}
@layer utilities {
  @keyframes shiftTiles { from { background-position: 0 0 } to { background-position: -1920px -1080px } }
}
```
> **Tokens, not class libraries.** Port the *token values* from `dev:www/assets/css/main.css` (convert `R G B` triples to hex/oklch, verify identical render). But **do NOT recreate `.dnet-card` / `.dnet-button` as `@layer components` classes** — that's the old pattern. Express them as **components** (`<UiCard>`, `<UiButton>`) using `tailwind-variants`, per §5.4a. The old `@apply`-based rules are useful only as a reference for *what utilities* each variant should contain. `.focus-ring` → fold into the components' `base` (`focus-visible:outline-2 focus-visible:outline-primary/50`).

**Light mode:** the brand was born dark. Define light-mode token overrides under a `.dark`-absent root vs a `.dark` block so the *same* utilities adapt. Get the dark palette pixel-correct first (it's the canonical look), then design a tasteful light variant — don't just invert.

---

## 5. Feature designs

### 5.1 Fullscreen landing page
- **Route:** `/` using `layouts/fullscreen.vue` (no navbar chrome). `routeRules: { '/': { prerender: true } }`.
- **Prior art:** `dev:www/components/card/Welcome.vue` and `cursor:www/components/organisms/Welcome.vue` (centered card + GIF + "Enter daroach.net" CTA). The old `showWelcome.global.ts` middleware gated a welcome→home redirect (disabled 2025-03-27).
- **Design:** full-viewport hero — animated background (the `shiftTiles` keyframe already exists), wordmark, one-line identity, and entry CTAs into Timeline / Blog / Dashboard. Decide with Gagan whether `/` *is* the landing or redirects into content (see §9).

### 5.2 Analytics — page visits + source IP (cookieless, self-hosted)
**Architecture:** client beacon → Nitro `/api/hit` → `better-sqlite3`. Dashboard reads `/api/stats` + `/api/geo`.

**Getting the real client IP** (the critical detail for this topology `client → CF edge → cloudflared → Traefik → pod:3000`):
1. **Cloudflare injects `CF-Connecting-IP`** = real client IP (single value, no chain). Prefer it.
2. **`CF-IPCountry`** is free but **off by default** — enable the "Add visitor location headers" Managed Transform in the Cloudflare dashboard.
3. **Traefik must trust the upstream**: set the entrypoint's `forwardedHeaders.trustedIPs` to Cloudflare's published CIDRs (<https://www.cloudflare.com/ips/>), else Nitro's `getRequestIP` returns the cloudflared/Traefik IP and `X-Forwarded-For` is spoofable.

```ts
// server/utils/geo.ts (resolution order)
const ip = getHeader(event, 'cf-connecting-ip')
  ?? getHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim()
  ?? getRequestIP(event, { xForwardedFor: true })
```

**Privacy / GDPR (IP is PII in the EU):** **do not store the raw IP.** At write time:
- derive **country/region from `CF-IPCountry`** (or GeoLite2), and
- compute a **keyed HMAC of the IP using a rotating secret salt** (daily) for unique-visitor counting — *plain hashing of IPv4 is reversible, so HMAC+salt is mandatory*,
- then **discard the raw IP**. Add a **retention cleanup** (delete rows older than 30–90 days).

**Schema (SQLite):**
```sql
CREATE TABLE IF NOT EXISTS hits (
  id INTEGER PRIMARY KEY,
  ts INTEGER NOT NULL,            -- epoch ms
  path TEXT NOT NULL,
  referrer TEXT,
  country TEXT,                   -- ISO-2 from CF-IPCountry
  region TEXT,
  ua TEXT,
  visitor_hash TEXT               -- salted HMAC, NOT the IP
);
```
**Data-model reference:** port `main-bk1:pages/api/hits/index.ts` + `models/Hit.js` (Mongo→SQLite, React→Nitro). The `postHit()` field set (path, UA, method, protocol, referrer, timestamp) is a good starting capture list.

**Why roll-your-own over Umami/Plausible/GoatCounter:** all of those are cookieless *and deliberately discard IP*, so none expose the raw geo feed needed for a "where my visitors are" map. (GoatCounter = lightest single-binary+SQLite if Gagan ever wants to offload; noted in §9.)

### 5.3 Timeline of Gagan ✅ content stubbed (blurbs + photos pending)
- **Route:** `/timeline`, prerendered.
- **Content model — typed `@nuxt/content` collection**, one `.yml` per entry, so Gagan edits data not Vue. **The stub files already exist** at `www/content/timeline/*.yml` (+ a `README.md` documenting the schema). Wire this collection in `content.config.ts`:
  ```ts
  // content.config.ts
  timeline: defineCollection({
    type: 'data',
    source: 'timeline/*.yml',
    schema: z.object({
      year: z.number(),
      order: z.number(),                 // sort key; HIGHER = more recent
      title: z.string(),
      photo: z.string(),                 // path under www/public/timeline/
      blurb: z.string(),
      tags: z.array(z.string()).optional(),
    }),
  })
  ```
- **Entries (newest → oldest), sorted by `order` desc:**

  | order | year | title |
  |---|---|---|
  | 60 | 2026 | Founder — Dekho LLC |
  | 50 | 2020 | Machine Learning Engineer — NVIDIA |
  | 40 | 2017 | Milwaukee School of Engineering |
  | 31 | 2013 | University of Wisconsin–Madison |
  | 30 | 2013 | Graduated — Peshtigo High School |
  | 10 | 1995 | Born — Wisconsin |

  > **Why `order`, not `year`:** 2013 has two entries (Peshtigo HS grad in spring, UW–Madison starting fall) — year alone can't disambiguate. Sort by `order` descending.
- **Query (page-level):** `queryCollection('timeline').order('order', 'DESC').all()`.
- **Components:** `components/timeline/Timeline.vue` (vertical rail; alternating-side on desktop, single-column mobile; group by year with sticky markers) + `TimelineEntry.vue` (a `<UiCard>` with `photo` + `blurb`). **`TimelineEntry` must render a placeholder when the photo is missing** — the images don't exist yet.
- **Still pending from Gagan (does NOT block scaffolding):** (1) replace the 6 `STUB` blurbs; (2) drop 6 photos into `www/public/timeline/` (filenames in the content README). The old `composables/images/PeshtigoTree.ts` image may suit the Peshtigo HS entry.

### 5.4 Clean Vue + Tailwind architecture (this is the real spec — see §5.4a)

The detailed, opinionated architecture lives in **[§5.4a](#54a-component--styling-architecture-the-clean-2026-convention)** below. The `cursor` branch is **explicitly NOT the model** — it was Gagan's frontend-learning sandbox (full atoms/molecules/organisms/templates atomic-design ceremony, which the 2026 community treats as overkill/anti-pattern for an app). Build fresh from the conventions in §5.4a. At most, *one or two* components may be worth a glance for ideas (e.g. the `HardwareStatus` live-update card concept for the homelab "Hardware Status" home card) — but reimplement, don't copy.

### 5.4a Component & styling architecture — the clean 2026 convention

> Framed for a systems engineer: this is the frontend equivalent of "where do headers go, what's a translation unit, what's the linker doing." The reasoning matters as much as the rules.

**(1) Organize by feature/domain, NOT by technical type or atomic tier.**
Skip Atomic Design — it forces subjective "is this a molecule or an organism?" classification that buys nothing the runtime cares about, and it's what made the `cursor` branch heavy. The 2026 default is *feature colocation + a small shared primitives folder*. Locality of reference: everything for the dashboard lives under `dashboard/`.

```
app/components/
  ui/            # shared presentational PRIMITIVES, zero business logic
    Button.vue   -> <UiButton>      (Nuxt path-prefixes the name)
    Card.vue     -> <UiCard>
    Heading.vue  -> <UiHeading>
  layout/        # TheNavBar, TheFooter
  timeline/      # TimelineEntry.vue -> <TimelineEntry> (drop redundant filename prefix to avoid <TimelineTimelineEntry>)
  dashboard/     # WorldMap.vue, VisitorStats.vue
  blog/          # PostCard.vue, PostMeta.vue
  consent/       # ConsentNotice.vue
```
Nuxt auto-imports everything under `app/components/` (no `import` lines) and **the name = the path** (`ui/Button.vue` → `<UiButton>`, duplicate adjacent segments deduped). Lean into the prefix as a namespace; name folders so they read well as prefixes; avoid "stutter" (`timeline/Entry.vue`, not `timeline/TimelineEntry.vue`).

**(2) Smart vs. dumb = page vs. component.**
- **Pages (`app/pages/`) are the "smart"/container layer** — *all* data fetching lives here via `useFetch`/`useAsyncData` (SSR-aware: dedupes, serializes to the client payload, avoids hydration re-fetch). Fetching inside a deep child breaks SSR payload transfer and causes waterfalls.
- **Components are "dumb"/presentational** — receive `props`, render, `emit` up. No `useFetch`, no store reads, no API calls. A presentational component is a pure function of its props (Storybook-droppable, trivially testable).
- **Data flows down as props; events flow up as emits.**

**(3) Component API design (`<script setup lang="ts">` everywhere):**
```vue
<script setup lang="ts">
interface Props { label: string; count?: number }
// Vue 3.5: reactive destructure + inline defaults (no withDefaults)
const { label, count = 0 } = defineProps<Props>()
const emit = defineEmits<{ change: [id: number] }>()   // tuple-typed
const model = defineModel<string>()                     // two-way binding, no boilerplate
</script>
```
- **Props** for data/config; **slots** for parent-controlled markup (if you reach for a `labelHtml`/`renderX` prop, use a slot instead). Scoped slots when child owns state but parent owns presentation.
- **`provide/inject`** only for a bounded subtree (theme, form context) and always typed with `InjectionKey`. Not a prop-drilling band-aid, not global state.

**(4) Styling: utility-first by default; variants via `tailwind-variants` (`tv`); almost no `@apply` or scoped `<style>`.**
This is the most important correction to the old code. The previous iterations leaned on `@layer components` classes (`.dnet-card`, `.dnet-button`) — the *clean* modern pattern is to express a reusable styled thing as **a Vue component with a typed variant function**, not a CSS class.

- **Adopt `tailwind-variants` (`tv`)** — it's exactly what Nuxt UI uses internally, so bespoke components read like first-party ones. It gives a typed `variants`/`compoundVariants`/`defaultVariants` API, **built-in `tailwind-merge`** conflict resolution (no manual `twMerge`), and a `slots` feature for multi-element components. Preferred over bare `cva` (which needs manual merge) and over hand-glued `clsx` strings.

```vue
<!-- app/components/ui/Button.vue — the dnet button, done cleanly -->
<script setup lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'
const button = tv({
  base: 'inline-flex items-center justify-center gap-2 rounded-md font-display transition focus-visible:outline-2 disabled:opacity-50',
  variants: {
    variant: {
      solid:   'bg-primary text-white hover:bg-primary/90',
      outline: 'border border-primary text-primary hover:bg-primary/10',  // the old .dnet-button look
      ghost:   'text-primary hover:bg-primary/10',
    },
    size: { sm: 'h-8 px-3 text-sm', md: 'h-10 px-4', lg: 'h-12 px-6 text-lg' },
  },
  defaultVariants: { variant: 'solid', size: 'md' },
})
type V = VariantProps<typeof button>
const { variant, size, class: cls } = defineProps<{ variant?: V['variant']; size?: V['size']; class?: string }>()
</script>
<template><button :class="button({ variant, size, class: cls })"><slot /></button></template>
```
`VariantProps` derives the prop union from the single `tv` definition → one source of truth for styles *and* types. `.dnet-card` becomes a `<UiCard>` component the same way. Reserve scoped `<style>` for genuinely awkward cases (the `shiftTiles` keyframe, `:deep()` overrides of third-party map/chart markup).

**(5) Semantic design tokens via Tailwind v4 `@theme` are the single source of truth.**
Components reference **semantic** utilities (`bg-primary`, `text-surface`), never raw palette (`bg-red-800`). The dnet red (`#991b1b`) is defined once as `--color-primary` in `@theme` (§4); rebrand or theme = change one token, every component follows. This is the same model Nuxt UI ships (semantic `primary`/`error`/`neutral`/… colors).

**(6) Logic separation — composables for state/domain, components for view.**
- `use*` composables (`app/composables/`, auto-imported) own reactive state + domain operations (`useTheme`, `useAnalytics`). Naming is load-bearing: must start with `use`.
- **Pinia only for genuinely global state** (here: the dashboard store, if it grows). Don't dump feature-local/transient state into a global store — that's the composable's job.
- **Pure, framework-agnostic logic** (formatting, IP hashing, geo math) goes in plain `.ts` modules under `shared/` (importable by both `app/` client and `server/` Nitro) — no Vue imports, unit-testable in isolation. Layering: **page (orchestrate+fetch) → composable (state+domain) → presentational component (render); pure utils below all of it.**

**(7) Other conventions worth keeping:**
- **`shared/`** = cross-cutting types + pure utils shared by client and server (e.g. the zod schema for a `hit`, used by both `server/api/hit.post.ts` and the dashboard).
- **`server/` is a hard boundary** — secrets, DB access, geo lookup never leak into the client bundle.
- **No barrel files** (`index.ts` re-exports) — Nuxt auto-import makes them redundant ceremony and they hurt tree-shaking / Vite cold start.
- **Single responsibility**: a `.vue` past ~200–250 lines usually wants decomposition (split fetch→page, transform→composable, render→child).
- **`@vueuse/nuxt`** for the utility-belt composables (`useDark`, `useStorage`, `useIntervalFn` for the live hardware card) instead of hand-rolling.

> **Reference:** Nuxt components/auto-import <https://nuxt.com/docs/4.x/directory-structure/app/components> · Nuxt shared dir <https://nuxt.com/docs/4.x/directory-structure/shared> · Vue 3.5 TS (props/emits/defineModel/inject) <https://vuejs.org/guide/typescript/composition-api> · tailwind-variants <https://www.tailwind-variants.org/docs/introduction> · Nuxt UI theming (uses `tv` + semantic tokens) <https://ui.nuxt.com/docs/getting-started/theme/components> · structure opinion <https://alexop.dev/posts/how-to-structure-vue-projects/>.

### 5.5 Light / dark mode
- **`@nuxtjs/color-mode`** handles system detection + persistence + **no-flash SSR** (inline head script). Set `colorMode: { classSuffix: '' }` so it toggles `.dark`.
- Wire to Tailwind v4 via the `@custom-variant dark (&:where(.dark, .dark *))` shown in §4.
- **No-flash gotcha:** when preference is `system`, `$colorMode.value` is unknown during SSR — guard toggle UI with `$colorMode.unknown` or use the `<ColorScheme>` component. A `useTheme()` composable wraps `useColorMode()`.

### 5.6 World visitor dashboard
- **Route:** `/dashboard`, `ssr: false` (client-only SPA; reads live SQLite, keeps data out of prerendered HTML).
- **Data:** `/api/geo` returns `{ country: count }` aggregates from the `hits` table.
- **Flat map (default):** **ECharts `geo`/`map` via `vue-echarts`** — country choropleth keyed by `CF-IPCountry`, optional scatter layer for GeoLite2 city points. Register your own world GeoJSON. *Fallback to reuse the existing stack:* `chartjs-chart-geo` plugin on chart.js/vue-chartjs.
- **3D globe (optional showpiece):** **`globe.gl` / `three-globe`** plotting visitor points/arcs; lazy-load (heavy Three.js bundle), client-only.
- Pair the map with the existing `vue-chartjs` for the "Web Traffic" time-series card the `dev` home page mocked up.

### 5.7 Cookie consent (appropriate, legally-aware)
- **Legal nuance:** ePrivacy Art. 5(3) requires consent for *device storage* (cookies/localStorage). **Cookieless first-party analytics that stores no client state and no raw IP is consent-exempt** (CNIL/DSK have exempted properly-configured privacy-first analytics). Since §5.2 stores country + salted-HMAC and *no* raw IP, **no blocking banner is legally required.**
- **Recommendation:** keep the existing `Consent.vue` + cookie store from `dev` as a **non-blocking transparency notice** ("this site keeps cookieless aggregate analytics — learn more"), plus the footer "reset" control already built. A short privacy paragraph on `/about` or a `/privacy` page suffices. Don't pull in a heavyweight consent library.

### 5.8 Blog scaffolding (`@nuxt/content` v3)
```ts
// content.config.ts
import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'
export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(), description: z.string(),
        date: z.coerce.date(), tags: z.array(z.string()).optional(),
        image: z.string().optional(),
      }),
    }),
    // + timeline collection from §5.3
  },
})
```
- **List** (`pages/blog/index.vue`): `queryCollection('blog').order('date','DESC').all()` via `useAsyncData`.
- **Post** (`pages/blog/[...slug].vue`): `queryCollection('blog').path(route.path).first()` → `<ContentRenderer :value="post" />`.
- Markdown + **MDC** (Vue components in markdown), **Shiki** syntax highlighting built in, optional FTS5 search (v3.14+).
- **Gotchas:** a doc lives in exactly one collection; **remove the dead `documentDriven` comment** from the old `nuxt.config.ts` (removed in v3). Run `nuxt prepare` after editing `content.config.ts` (the `postinstall` already does).

---

## 6. Deployment — carry forward from `main`

The production story on `origin/main` is solid and **should be reused with minimal change**. It's already documented in the working-tree `README.md`. Artifacts:

```
docker/Dockerfile.prod   # multi-stage node:22-alpine; installs python3 make g++ to compile better-sqlite3
docker/launch.sh
chart/Chart.yaml
chart/values.yaml        # image wwwdnet-prod:latest; service 80->3000; ingress traefik/web; hosts daroach.net, www.daroach.net; nodeSelector blackhole.daroach.lan
chart/install.sh         # builds into k3s containerd via `nerdctl --namespace k8s.io build` (no registry); helm upgrade --install; waits for rollout
chart/templates/{deployment,service,ingress}.yaml
```
Deploy model: **Cloudflare Tunnel → Traefik → Ingress (host-based) → Service → Nuxt pod:3000**. One-command: `./chart/install.sh`.

**Migration tasks for the follow-up agent:**
1. Verify `Dockerfile.prod` `COPY`/build paths still hold under the Nuxt 4 `app/` layout and the Tailwind-v4 build (no `tailwind.config.js`).
2. Confirm `better-sqlite3` native compile still works on `node:22-alpine` (python3/make/g++ already added).
3. Add a **persistent volume** for the analytics SQLite DB (the content DB can rebuild from markdown, but `hits` data must survive pod restarts) — this is a **new chart requirement** not in `main` today. Mount a PVC; point `server/utils/db.ts` at it.
4. Wire `ipHashSalt` and any geo license key as env/secret in the chart.
5. Set Traefik `forwardedHeaders.trustedIPs` to Cloudflare CIDRs (§5.2) and enable the CF visitor-location Managed Transform.

---

## 7. Phased execution plan (for the follow-up agent)

**Phase 0 — Reset the slate.** New Nuxt 4 app under `www/app/`, Tailwind v4 via `@tailwindcss/vite`, modules wired (§3). Port design tokens (§4). Archive `_old/`. Smoke-test `npm run dev` + `npm run build` (both `main` and `dev` currently fail to build — getting a clean build is the Phase-0 exit criterion).

**Phase 1 — Shell & brand.** `layouts/default` + `fullscreen`, NavBar, Footer (with consent-reset), `useTheme()` + color-mode toggle (light/dark working, no flash). Port `.dnet-card`/`.dnet-button`. Fullscreen landing `/` (§5.1).

**Phase 2 — Content.** `content.config.ts` blog collection, `/blog` + `/blog/[...slug]`, sample posts, Shiki highlighting (§5.8). Cookie-consent transparency notice (§5.7). `/about`.

**Phase 3 — Timeline.** Wire the `timeline` collection (stub `.yml` files already in `www/content/timeline/`) + `Timeline.vue`/`TimelineEntry.vue` (§5.3). Renders fully against the 6 stub entries; `TimelineEntry` shows a placeholder where photos are missing. Real blurbs/photos drop in later with no code change.

**Phase 4 — Analytics backend.** `server/utils/db.ts` (SQLite + migrations + PVC), `server/api/hit.post.ts`, IP resolution + HMAC + retention (§5.2). `useAnalytics()` beacon. Verify real IP end-to-end through Traefik/Cloudflare.

**Phase 5 — Dashboard.** `/api/stats` + `/api/geo`, `/dashboard` (ssr:false), ECharts world choropleth + visitor stats cards; optional globe.gl 3D view; reuse `HardwareStatus.vue` for the homelab card (§5.6).

**Phase 6 — Deploy.** Update Dockerfile/chart for `app/` + Tailwind v4 + analytics PVC + secrets (§6). `./chart/install.sh`, verify on k3s behind the tunnel. SEO module + OG images.

Each phase should end on `main` only after a green `nuxt build`. Keep deployment infra changes isolated and reviewable.

---

## 8. Risks & gotchas (collected)

- **Both `main` and `dev` currently fail to build** — Phase 0's job is a clean Nuxt 4 build, not patching the old ones.
- **Tailwind v4** ignores legacy `tailwind.config.js`; the `shiftTiles` keyframe + custom timing functions must move into CSS.
- **Analytics SQLite needs a PVC** — not in the current chart; without it, hit data is lost on every pod restart.
- **Real client IP** is the single most error-prone piece: it silently returns Traefik's IP unless `trustedIPs` is set; `CF-IPCountry` is off until the Managed Transform is enabled.
- **Hashing IPv4 is not anonymization** — must be keyed HMAC + rotating salt, raw IP discarded.
- **Dashboard must be `ssr:false`** so visitor data never lands in prerendered HTML.
- **Do NOT model the rebuild on the `cursor` branch** — it was a frontend-learning sandbox; its atomic-design ceremony is explicitly rejected (§5.4a). Build fresh from the clean conventions, reimplementing at most the hardware-card *idea*.
- **`tailwind-variants` adds two small deps** (`tailwind-variants` pulls `tailwind-merge`) — intentional; it's what Nuxt UI uses internally and replaces ad-hoc `@apply` class libraries.
- Minor version numbers for some libs (Tailwind 4.3, Nuxt UI 4.8, maxmind npm) came from secondary sources — **pin against the live registry at execution time**.

---

## 9. Open questions — what I need from Gagan

**Resolved 2026-06-08** (see §0.1): dark-only v1 · roll-your-own analytics · flat ECharts map (no globe) · no `@nuxt/ui`.

**Resolved:** ✅ Timeline structure + 6 entries stubbed at `www/content/timeline/` (blurbs/photos pending but non-blocking).

**Still open:**

1. **Landing behavior** — is `/` a standalone fullscreen hero with CTAs into content, or does it redirect into the timeline/blog like the old welcome flow?
2. **Domains/infra** — any change from the `main` chart (hosts `daroach.net` + `www.daroach.net`, node `blackhole.daroach.lan`)? Can I provision a PVC for the analytics DB?
3. **`_old/` + stale branches** — OK to archive `_old/` and prune `nuxt3`/`main-bk*`/`post-cassie` after salvaging, or keep them?
4. **Timeline finish (non-blocking)** — replace the 6 `STUB` blurbs and add 6 photos to `www/public/timeline/`.

---

## 10. References

**Stack:** Nuxt 4 dir structure <https://nuxt.com/docs/4.x/directory-structure> · data fetching <https://nuxt.com/docs/4.x/getting-started/data-fetching> · rendering/routeRules <https://nuxt.com/docs/4.x/guide/concepts/rendering> · prerendering <https://nuxt.com/docs/4.x/getting-started/prerendering> · install/Node <https://nuxt.com/docs/getting-started/installation> · Vue 3.5 <https://blog.vuejs.org/posts/vue-3-5> · v-model/defineModel <https://vuejs.org/guide/components/v-model.html> · state mgmt <https://nuxt.com/docs/getting-started/state-management>.

**Tailwind v4:** Nuxt install <https://tailwindcss.com/docs/installation/framework-guides/nuxt> · theme/@theme <https://tailwindcss.com/docs/theme> · dark mode <https://tailwindcss.com/docs/dark-mode>.

**Content/modules:** Nuxt Content v3 <https://content.nuxt.com/> · collections <https://content.nuxt.com/docs/collections/define> · queryCollection <https://content.nuxt.com/docs/utils/query-collection> · color-mode <https://nuxt.com/modules/color-mode> + usage <https://color-mode.nuxtjs.org/usage/basic> · Nuxt SEO <https://nuxtseo.com/>.

**Analytics/IP/geo:** Traefik IPStrategy + CDNs <https://blog.lrvt.de/solving-traefiks-ipstrategy-dilemma-while-using-cdns/> · CF HTTP headers <https://developers.cloudflare.com/fundamentals/reference/http-headers/> · CF IP geolocation <https://developers.cloudflare.com/network/ip-geolocation/> · CF IP ranges <https://www.cloudflare.com/ips/> · IP-as-PII <https://techgdpr.com/blog/is-an-ip-address-considered-personal-data/> · IP anonymization (why hashing fails) <https://00f.net/2025/10/27/ip-anonymization/> · GeoLite2 <https://dev.maxmind.com/geoip/geolite2-free-geolocation-data/> · maxmind npm <https://www.npmjs.com/package/maxmind> · self-hosted analytics survey <https://openpanel.dev/articles/self-hosted-web-analytics>.

**Maps:** vue-echarts <https://vue-echarts.dev/> · d3-geo <https://d3js.org/d3-geo> · globe.gl <https://globe.gl/>.

**Consent:** Plausible on banners <https://plausible.io/blog/cookie-consent-banners> · analytics + GDPR consent <https://www.termsfeed.com/blog/analytics-tools-gdpr-consent/>.

**In-repo prior art (branch:path):** deploy → `origin/main:{chart/,docker/Dockerfile.prod}` (reuse) · design *token values* → `dev:www/assets/css/main.css` (port values only, not the `@layer` classes) · consent → `dev:www/{components/cookies/Consent.vue,stores/cookieStore.ts}` (UX reference) · analytics model → `origin/main-bk1:{pages/api/hits/index.ts,models/Hit.js,pages/_middleware.ts}` (port React→Nitro, Mongo→SQLite). **`cursor` branch components are NOT reference material** beyond the hardware-card idea — build per §5.4a.

**Architecture refs (clean component/styling conventions):** Nuxt components/auto-import <https://nuxt.com/docs/4.x/directory-structure/app/components> · Nuxt `shared/` <https://nuxt.com/docs/4.x/directory-structure/shared> · Vue 3.5 TS composition API <https://vuejs.org/guide/typescript/composition-api> · tailwind-variants <https://www.tailwind-variants.org/docs/introduction> · Nuxt UI theming (semantic tokens + `tv`) <https://ui.nuxt.com/docs/getting-started/theme/components> · folder-by-feature <https://alexop.dev/posts/how-to-structure-vue-projects/>.
