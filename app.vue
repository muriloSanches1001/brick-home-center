<script setup lang="ts">
import BaseScrollWrapper from '~/components/ui/scroll/BaseScrollWrapper.vue'
import { useAppScroll } from '~/composables/ui/app/useAppScroll'

const { updateScrollTop } = useAppScroll()
</script>

<template>
  <base-scroll-wrapper
    class="h-screen"
    @scroll="updateScrollTop"
  >
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </base-scroll-wrapper>
</template>
