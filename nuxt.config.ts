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
        { name: 'theme-color', content: '#111827' },
        {
          name: 'description',
          content:
              'Light Gray is an original webcomic universe featuring Mortal Heroes, action, fantasy, and dramatic storytelling.'
        },
        { name: 'robots', content: 'index, follow' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-180x180.png' }
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
    '@vite-pwa/nuxt',
  ],
  sitemap: {
    urls: async () => {
      const chapters = await axios.get('https://www.light-gray.art/api/chapter');
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
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Light Gray',
      short_name: 'Light Gray',
      description: 'Read Light Gray webcomic chapters online.',
      theme_color: '#111827',
      background_color: '#111827',
      display: 'standalone',
      start_url: '/',
      scope: '/',
      lang: 'en',
      icons: [
        {
          src: '/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/icons/icon-512x512-maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      runtimeCaching: [
        {
          urlPattern: ({ request, url }) =>
              request.mode === 'navigate'
              && !url.pathname.startsWith('/admin')
              && !url.pathname.startsWith('/api'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'lg-pages',
            networkTimeoutSeconds: 3,
            cacheableResponse: {
              statuses: [0, 200]
            },
            expiration: {
              maxEntries: 40,
              maxAgeSeconds: 60 * 60 * 24 * 7
            }
          }
        },
        {
          urlPattern: ({ request, url }) =>
              request.method === 'GET' && /^\/api\/chapter(\/[^/]+)?$/.test(url.pathname),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'lg-api-chapter',
            networkTimeoutSeconds: 3,
            cacheableResponse: {
              statuses: [0, 200]
            },
            expiration: {
              maxEntries: 80,
              maxAgeSeconds: 60 * 60 * 24
            }
          }
        },
        {
          urlPattern: ({ request, url }) =>
              request.method === 'GET' && url.pathname === '/api/site-info',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'lg-api-site-info',
            networkTimeoutSeconds: 3,
            cacheableResponse: {
              statuses: [0, 200]
            },
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24
            }
          }
        },
        {
          urlPattern: ({ request, url }) =>
              request.destination === 'image'
              && (
                url.pathname.startsWith('/_nuxt/')
                || (
                  url.hostname.endsWith('supabase.co')
                  && url.pathname.includes('/storage/v1/object/public/uploads/')
                )
              ),
          handler: 'CacheFirst',
          options: {
            cacheName: 'lg-images',
            cacheableResponse: {
              statuses: [0, 200]
            },
            expiration: {
              maxEntries: 200,
              maxAgeSeconds: 60 * 60 * 24 * 30
            }
          }
        }
      ]
    },
    client: {
      installPrompt: true
    }
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
