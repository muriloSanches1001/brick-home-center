<script setup lang="ts">
import BasePageHeader from '~/components/ui/navigation/BasePageHeader.vue'
import BaseSection from '~/components/ui/sections/BaseSection.vue'
import ShopCatalog from '~/components/shop/ShopCatalog.vue'
import TheMarquee from '~/components/layout/TheMarquee.vue'
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
