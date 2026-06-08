import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt 4: application code lives under app/ (srcDir defaults to app/)
  compatibilityDate: '2026-06-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
    '@pinia/nuxt', // dashboard store only (§3) — added in Phase 5 per the plan
  ],

  css: ['~/assets/css/main.css'],

  // @nuxt/content v3: Shiki syntax highlighting tuned to the dnet dark palette.
  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
          langs: ['ts', 'js', 'vue', 'bash', 'json', 'yaml', 'sql', 'python', 'html', 'css'],
        },
      },
    },
  },

  // Tailwind v4 via the official Vite plugin (NOT @nuxtjs/tailwindcss).
  vite: {
    plugins: [tailwindcss()],
  },

  // @nuxtjs/color-mode: toggle a `.dark` class on <html> (no `-mode` suffix),
  // wired to Tailwind v4's `@custom-variant dark` in assets/css/main.css.
  colorMode: {
    classSuffix: '',
    preference: 'dark', // dnet brand is dark-first
    fallback: 'dark',
  },

  // @nuxt/fonts self-hosts the dnet typefaces (replaces @nuxtjs/google-fonts).
  fonts: {
    families: [
      { name: 'Ubuntu Mono', provider: 'google' },
      { name: 'Inter', provider: 'google' },
      { name: 'Fira Code', provider: 'google' },
    ],
  },

  // @nuxtjs/seo
  site: {
    url: 'https://www.daroach.net',
    name: 'daroach.net',
    description: 'Gagan Daroach — CPU/GPU engineer, founder, homelab tinkerer.',
    defaultLocale: 'en',
  },
  // Schema.org JSON-LD: STILL DISABLED — upstream bug. nuxt-schema-org 6.1.2 /
  // @unhead/schema-org crashes at prerender with "Cannot read properties of
  // undefined (reading 'potentialAction')" in webSiteResolver, regardless of
  // config identity OR explicit definePerson/defineWebSite/defineWebPage seeding
  // in app.vue (the WebSite node arrives undefined to its resolver). This is
  // pure prod-facing SEO JSON-LD (invisible to users), so it's deferred to the
  // prod-SEO pass — revisit after a nuxt-schema-org bump. og-image IS enabled.
  schemaOrg: { enabled: false },

  runtimeConfig: {
    // Analytics (§5.2). All server-only — never exposed to the client bundle.
    ipHashSalt: '', // NUXT_IP_HASH_SALT — rotate; HMAC key for visitor hashing
    analyticsDbPath: './.data/analytics.sqlite3', // NUXT_ANALYTICS_DB_PATH — PVC mount in prod (Phase 6)
    analyticsRetentionDays: '90', // NUXT_ANALYTICS_RETENTION_DAYS — rows aged out past this
    public: { apiBase: '/api' },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      meta: [{ name: 'theme-color', content: '#991b1b' }],
    },
  },

  // Hybrid rendering: static pages prerendered, blog ISR, dashboard client-only,
  // API dynamic. (Routes filled in across later phases.)
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/timeline': { prerender: true },
    '/blog': { isr: 3600 },
    '/blog/**': { isr: true },
    '/dashboard': { ssr: false }, // client-only SPA; reads live SQLite, keeps data out of prerendered HTML (§5.6)
    '/api/**': { cors: true },
  },
})
