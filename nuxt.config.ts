import {fileURLToPath} from 'node:url'
import {dirname} from 'node:path'
// https://nuxt.com/docs/api/configuration/nuxt-config

const rootDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    ssr: true,
    devtools: {enabled: true},
    modules: [
        // UI + utils
        '@nuxtjs/tailwindcss',
        '@nuxt/image',
        '@nuxt/fonts',
        '@nuxt/icon',

        // Code quality
        '@nuxt/eslint',
        '@nuxtjs/stylelint-module',

        // SEO
        '@nuxtjs/sitemap',
        '@nuxtjs/robots',

        // Recommended
        '@pinia/nuxt',
        '@vueuse/nuxt',
    ],
    runtimeConfig: {
        backendBase: process.env.NUXT_BACKEND_BASE,
        privateApiKey: process.env.NUXT_PRIVATE_API_KEY,
        public: {
            siteName: 'Brick Home Center',
        }
    },
    image: {
        format: ['webp', 'avif', 'jpeg'],
    },
    fonts: {
        provider: 'google',
        families: [
            {
                name: 'Inter',
                weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
                provider: 'google'
            }
        ],
        assets: {
            prefix: '/_fonts/'
        }
    },
    tailwindcss: {
        viewer: false
    },
    eslint: {
        config: {stylistic: true}
    },
    stylelint: {
        cache: true,
        include: ['**/*.{css,scss,vue,html}']
    },
    site: {
        url: process.env.SITE_URL,
        name: 'Brick Home Center'
    },
    sitemap: {
        xsl: false
    },
    robots: {
        groups: [{userAgent: '*', allow: '/'}],
        sitemap: ['/sitemap.xml']
    },
    typescript: {
        strict: true,
        typeCheck: true
    },
    app: {
        head: {
            titleTemplate: '%s · Brick Home Center',
            meta: [
                {name: 'viewport', content: 'width=device-width, initial-scale=1'}
            ],
            // link: [{rel: 'icon', href: '/favicon.ico'}]
        }
    },
    alias: {
        '~': rootDir
    }
})