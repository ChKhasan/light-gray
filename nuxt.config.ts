// https://nuxt.com/docs/api/configuration/nuxt-config
import i18nConfig from "./i18n.config";
import type {IChapterDto} from "./app/services/chapter/chapter.dto";
import axios from "axios";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  app: {
    head: {
      titleTemplate: '%s | Light Gray',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
              'Light Gray is an original webcomic universe featuring Mortal Heroes, action, fantasy, and dramatic storytelling.'
        },
        { name: 'robots', content: 'index, follow' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' }
      ]
    }
  },
  nitro: {
    compressPublicAssets: true
  },
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@peterbud/nuxt-query',
    'nuxt-aos',
    '@nuxtjs/i18n',
    'dayjs-nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],
  sitemap: {
    urls: async () => {
      const chapters = await axios.get('/api/chapter');
      return chapters.data.map((c: IChapterDto) => ({
        loc: `/chapters/${c._id}`,
        lastmod: c.updatedAt
      }))
    }
  },
  robots: {
    sitemap: ['https://www.light-gray.art/sitemap.xml'], // sitemap listasi
    allow: ['/'],       // indekslash uchun yo‘llar
    disallow: ['/admin'],       // indeks qilinmasin degan yo‘llar
    metaTag: true       // har sahifaga <meta name="robots"> qo‘shadi
  },
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