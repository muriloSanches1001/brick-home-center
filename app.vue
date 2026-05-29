<script setup lang="ts">
import BaseScrollWrapper from '~/components/ui/scroll/BaseScrollWrapper.vue'
import { useAppScroll } from '~/composables/ui/app/useAppScroll'
import { useAppAccessibility } from '~/composables/ui/app/useAppAccessibility'

const route = useRoute()
const { registerScrollElement, scrollToTop } = useAppScroll()
const { init } = useAppAccessibility()

const onWrapperReady = (el: HTMLElement) => {
  registerScrollElement(el)
}

watch(
  () => route.path,
  () => {
    scrollToTop(false)
  },
)

init()
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
  <div v-bind="{ vw: '' }" class="enabled">
    <div v-bind="{ 'vw-access-button': '' }" class="active" />
    <div v-bind="{ 'vw-plugin-wrapper': '' }">
      <div class="vw-plugin-top-wrapper" />
    </div>
  </div>
</template>
