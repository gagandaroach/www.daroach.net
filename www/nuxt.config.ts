// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  postcss: {
      plugins: {
          tailwindcss: {},
          autoprefixer: {},
      },
  },

  css: [
      '~/assets/css/main.css',
      '~/assets/css/dnet.css',
      '~/assets/css/dnet-bg.css',
      '~/assets/css/dnet-blog.css',
      '~/assets/css/dnet-text.css'
  ],

  components: [
      { path: '~/components/Card', prefix: '' },
      { path: '~/components/global', prefix: '' },
      { path: '~/components/debug', prefix: 'Dbg' },
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
      }
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
          }
      }]
  ],

  // https://content.nuxtjs.org/
  content: {
      // documentDriven: true
      // experimental: {
      //     search: true
      // }
  },

  compatibilityDate: '2025-03-27'
})