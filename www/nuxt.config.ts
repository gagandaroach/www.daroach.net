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
  ],

  css: ['~/assets/css/main.css'],

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
  },
  // OG image generation needs a native renderer (@takumi-rs/core). Deferred to
  // Phase 6 (SEO + social cards); disabled now to keep the Phase 0 build clean.
  ogImage: { enabled: false },
  // Schema.org JSON-LD needs full site/identity config (Phase 6). Disabled now;
  // sitemap, robots, and SEO meta from @nuxtjs/seo stay active.
  schemaOrg: { enabled: false },

  runtimeConfig: {
    ipHashSalt: '', // set via NUXT_IP_HASH_SALT in prod (analytics, Phase 4)
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
  },
})
