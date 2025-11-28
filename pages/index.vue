<script setup lang="ts">
import BaseSection from '~/components/ui/sections/BaseSection.vue'

const config = useRuntimeConfig()

useSeoMeta({
  title: 'Brick Home Center · Sua Loja de Material de Construção',
  description: 'Tudo para sua construção e reforma. Encontre pisos, tintas, ferramentas e materiais de acabamento com os melhores preços na Brick Home Center.',
  ogTitle: 'Início · Brick Home Center',
  ogDescription: 'Tudo para sua construção e reforma. Encontre pisos, tintas, ferramentas e materiais de acabamento com os melhores preços na Brick Home Center.',
  ogImage: config.public.siteUrl + '/images/seo/home-index.jpg',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <home-hero />

    <base-section padding-y="lg">
      <home-about />
    </base-section>

    <home-service />

    <base-section padding-y="lg">
      <home-product-showcase />
    </base-section>

    <home-contact />

    <base-section padding-y="lg">
      <home-blog />
    </base-section>
  </div>
</template>
