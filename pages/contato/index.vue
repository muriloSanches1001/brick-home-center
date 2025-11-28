<script setup lang="ts">
import BasePageHeader from '~/components/ui/navigation/BasePageHeader.vue'
import BaseSection from '~/components/ui/sections/BaseSection.vue'
import TheMarquee from '~/components/layout/TheMarquee.vue'
import ContactThree from '~/components/contact/ContactThree.vue'

const config = useRuntimeConfig()

useSeoMeta({
  title: 'Fale Conosco · Brick Home Center',
  description: 'Entre em contato com a Brick Home Center. Solicite orçamentos, tire dúvidas sobre entregas ou visite nossa loja física de materiais de construção.',

  ogTitle: 'Fale Conosco · Brick Home Center',
  ogDescription: 'Entre em contato com a Brick Home Center. Solicite orçamentos, tire dúvidas sobre entregas ou visite nossa loja física.',
  ogImage: config.public.siteUrl + '/images/seo/contact-index.jpg',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <base-page-header />

    <base-section padding-y="lg">
      <contact-three />
    </base-section>

    <the-marquee />
  </div>
</template>

<style scoped>

</style>
