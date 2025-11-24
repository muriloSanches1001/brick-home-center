<script setup lang="ts">
import BaseScrollWrapper from '~/components/ui/scroll/BaseScrollWrapper.vue'
import { useAppScroll } from '~/composables/ui/app/useAppScroll'

const route = useRoute()
const { registerScrollElement, scrollToTop } = useAppScroll()

const onWrapperReady = (el: HTMLElement) => {
  registerScrollElement(el)
}

watch(
  () => route.path,
  () => {
    scrollToTop(false)
  },
)
</script>

<template>
  <base-scroll-wrapper
    class="h-screen"
    @ready="onWrapperReady"
  >
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </base-scroll-wrapper>
</template>
