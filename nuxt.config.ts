import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
// https://nuxt.com/docs/api/configuration/nuxt-config

const rootDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
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

    // Tests
    '@nuxt/test-utils/module',
  ],
  ssr: true,
  devtools: { enabled: true },
  app: {
    head: {
      titleTemplate: '%s · Brick Home Center',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      // link: [{rel: 'icon', href: '/favicon.ico'}]
    },
  },
  site: {
    url: process.env.SITE_URL,
    name: 'Brick Home Center',
  },
  runtimeConfig: {
    backendBase: process.env.NUXT_BACKEND_BASE,
    privateApiKey: process.env.NUXT_PRIVATE_API_KEY,
    public: {
      siteName: 'Brick Home Center',
    },
  },
  alias: {
    '~': rootDir,
  },
  compatibilityDate: '2025-07-15',
  typescript: {
    strict: true,
    typeCheck: true,
  },
  eslint: {
    config: { stylistic: true },
  },
  fonts: {
    provider: 'google',
    families: [
      {
        name: 'Inter',
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        provider: 'google',
      },
      {
        name: 'Lexend Deca',
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        provider: 'google',
      }
    ],
    assets: {
      prefix: '/_fonts/',
    },
  },
  image: {
    format: ['webp', 'avif', 'jpeg'],
  },
  robots: {
    groups: [{ userAgent: '*', allow: '/' }],
    sitemap: ['/sitemap.xml'],
  },
  sitemap: {
    xsl: false,
  },
  stylelint: {
    cache: true,
    include: ['**/*.{css,scss,vue,html}'],
  },
  tailwindcss: {
    viewer: false,
  },
  css: [
    '~/assets/css/tailwind.css',
    'simplebar/dist/simplebar.min.css'
  ]
})
