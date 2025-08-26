// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";


export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
    css: ['@/assets/css/tailwind.css'],
    vite: {
      plugins: [
          tailwindcss()
      ]
    },
    i18n: {
        defaultLocale: 'en',
        locales: [
            { code: 'en', name: 'English', file: 'en.json' },
            { code: 'es', name: 'Spanish', file: 'es.json' },
            { code: 'pt', name: 'Brasil', file: 'pt.json' },

        ],
        strategy: "no_prefix",
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root' // recommended
        }
    },
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: '',
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: './app/components/ui'
    },
    apollo: {
        clients: {
            default: {
                httpEndpoint: 'http://server.test/graphql'
            }
        },
    },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/test-utils',
    'shadcn-nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/apollo'
  ]
})