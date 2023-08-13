import fs from 'fs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    css: ['~/assets/css/main.css', '~/assets/css/dnet.css'],

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
        '@pinia/nuxt'
    ]

})