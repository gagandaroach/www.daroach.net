// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  postcss: {
      plugins: {
          tailwindcss: {},
          autoprefixer: {},
      },
  },

  css: ['~/assets/css/main.css'],

  components: [
      { path: '~/components/card', prefix: 'Card' },
      { path: '~/components/cookies', prefix: 'Cookie' },
      { path: '~/components/debug', prefix: 'Dbg' },
      { path: '~/components/global', prefix: '' },
      { path: '~/components' }
  ],

  // https://nuxt.com/docs/getting-started/configuration#environment-variables-and-private-tokens
  runtimeConfig: {
      public: { apiBase: '/api' }
  },

  app: {
      pageTransition:
      {
          name: 'page', mode: 'out-in'
      },
    meta: [
      { name: 'theme-color', content: '#991b1b' },
    ],
  },

  modules: [
      '@nuxt/image',
      '@nuxt/content',
      '@pinia/nuxt',
      ['@nuxtjs/google-fonts', {
          families: {
            Ubuntu: true,
            'Ubuntu+Condensed': true,
            'Ubuntu+Mono': true,
            'Fira+Code': true,
            'Inter': true,
          }
      }]
  ],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },

  // https://content.nuxtjs.org/
  content: {
      // documentDriven: true
      // experimental: {
      //     search: true
      // }
  },

  compatibilityDate: '2025-03-27'
})