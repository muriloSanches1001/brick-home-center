<script setup lang="ts">
import BasePageHeader from '~/components/ui/navigation/BasePageHeader.vue'
import BaseSection from '~/components/ui/sections/BaseSection.vue'
import ShopCatalog from '~/components/shop/ShopCatalog.vue'
import TheMarquee from '~/components/layout/TheMarquee.vue'

const config = useRuntimeConfig()

useSeoMeta({
  title: 'Loja Online · Brick Home Center',
  description: 'Catálogo completo de materiais de construção. Compre online pisos, revestimentos, tintas, elétrica e hidráulica com entrega rápida.',

  ogTitle: 'Loja Online · Brick Home Center',
  ogDescription: 'Catálogo completo de materiais de construção. Compre online com entrega rápida e segura.',
  ogImage: config.public.siteUrl + '/images/seo/shop-index.jpg',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <base-page-header />

    <base-section padding-y="lg">
      <shop-catalog />
    </base-section>

    <the-marquee />
  </div>
</template>

<style scoped>

</style>
