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
        '~/assets/css/dnet-navbar.css',
        '~/assets/css/dnet-text.css'
    ],

    components: [
        { path: '~/components/Card', prefix: '' },
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

})