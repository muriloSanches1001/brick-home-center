<script setup lang="ts">

import BasePageHeader from "~/components/ui/navigation/BasePageHeader.vue";
import BaseSection from "~/components/ui/sections/BaseSection.vue";
import TheMarquee from "~/components/layout/TheMarquee.vue";
import ContactThree from "~/components/contact/ContactThree.vue";
</script>

<template>
  <base-page-header />

  <base-section padding-y="lg">
    <contact-three />
  </base-section>

  <the-marquee />
</template>

<style scoped>

</style>
