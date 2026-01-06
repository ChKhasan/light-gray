// https://nuxt.com/docs/api/configuration/nuxt-config
import i18nConfig from "./i18n.config";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@peterbud/nuxt-query',
    'nuxt-aos',
    '@nuxtjs/i18n',
  ],
  i18n: i18nConfig,
  imports: {
    dirs: [
      'composable'
    ]
  },
  nuxtQuery: {
    autoImports: ['useQuery', 'useMutation'],

    devtools: true,

    queryClientOptions: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          staleTime: 1000 * 60 * 5,
        },
      },
    },
  },
})