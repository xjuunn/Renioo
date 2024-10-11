// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: false},
    // ssr: () => window.__TAURI_INTERNALS__ === undefined,
    ssr: false,
    routeRules: {
        '/': {prerender: true}
    },
    modules: [
        '@nuxtjs/device',
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n',
        '@hypernym/nuxt-anime',
        '@nuxt/content',
        '@nuxt/image',
        '@nuxt/icon',
        '@vueuse/nuxt',
        '@nuxtjs/supabase'
    ],
    i18n: {
        vueI18n: './i18n.config.ts'
    },
    supabase: {
        redirectOptions: {
            login: '/login',
            exclude: ['/','/*','/**/*'],
        }
    },
})