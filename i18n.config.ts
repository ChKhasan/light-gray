import type { NuxtI18nOptions } from '@nuxtjs/i18n'

const i18nConfig: NuxtI18nOptions = {
    locales: [
        { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
        { code: 'ru', name: 'Russian', iso: 'ru-RU', file: 'ru.json' }
    ],
    defaultLocale: 'en',
    langDir: '../app/locales/',
    strategy: 'no_prefix',
    vueI18n: 'i18n.config.ts',
    detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        alwaysRedirect: false,
        fallbackLocale: 'en'
    }
}

export default i18nConfig
