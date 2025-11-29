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
    'vue3-carousel-nuxt',

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
      htmlAttrs: {
        lang: 'pt-BR',
      },
      charset: 'utf-8',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'msapplication-TileImage', content: '/images/favicon/ms-icon-144x144.png' },
        { name: 'theme-color', content: '#ffffff' },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/images/favicon/apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/images/favicon/apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/images/favicon/apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/images/favicon/apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/images/favicon/apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/images/favicon/apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/images/favicon/apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/images/favicon/apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/favicon/apple-icon-180x180.png' },

        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/images/favicon/android-icon-192x192.png' },

        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/images/favicon/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/favicon/favicon-16x16.png' },
      ],
    },
  },
  css: [
    '~/assets/css/tailwind.css',
    'simplebar/dist/simplebar.min.css',
  ],
  site: {
    url: process.env.NUXT_SITE_URL,
    name: 'Brick Home Center',
    description: 'A sua parceira completa em materiais de construção. Do básico ao acabamento, encontre pisos, tintas, ferramentas e decoração com os melhores preços.',
    indexable: true,
    defaultLocale: 'pt-BR',
  },
  runtimeConfig: {
    backendBase: process.env.NUXT_BACKEND_BASE,
    privateApiKey: process.env.NUXT_PRIVATE_API_KEY,
    public: {
      siteName: 'Brick Home Center',
      s3Base: process.env.NUXT_S3_BASE,
      siteUrl: process.env.NUXT_SITE_URL,
    },
  },
  alias: {
    '~': rootDir,
  },
  routeRules: {
    '/contato': { prerender: true },
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
      },
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
})
