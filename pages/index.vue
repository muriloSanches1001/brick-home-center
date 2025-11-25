<script setup lang="ts">
import BaseSection from '~/components/ui/sections/BaseSection.vue'
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
