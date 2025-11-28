<script setup lang="ts">
import BaseSection from '~/components/ui/sections/BaseSection.vue'
import TheMarquee from '~/components/layout/TheMarquee.vue'
import BasePageHeader from '~/components/ui/navigation/BasePageHeader.vue'
import BlogCatalog from '~/components/blog/BlogCatalog.vue'

const config = useRuntimeConfig()

useSeoMeta({
  title: 'Blog de Obras · Brick Home Center',
  description: 'Dicas de construção, tendências de arquitetura e tutoriais de reforma. Acompanhe o blog da Brick Home Center e construa melhor.',

  ogTitle: 'Blog de Obras · Brick Home Center',
  ogDescription: 'Dicas de construção, tendências de arquitetura e tutoriais de reforma para sua obra.',
  ogImage: config.public.siteUrl + '/images/seo/blog-index.jpg',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <base-page-header />

    <base-section padding-y="lg">
      <blog-catalog />
    </base-section>

    <the-marquee />
  </div>
</template>

<style scoped>

</style>
