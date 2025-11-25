<script setup lang="ts">
import BaseSection from '~/components/ui/sections/BaseSection.vue'
import TheMarquee from '~/components/layout/TheMarquee.vue'
import BasePageHeader from '~/components/ui/navigation/BasePageHeader.vue'
import BlogCatalog from '~/components/blog/BlogCatalog.vue'
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
