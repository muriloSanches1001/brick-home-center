<script setup lang="ts">
import TheMenu from '~/components/layout/TheMenu.vue'
import TheSearchArea from "~/components/layout/TheSearchArea.vue";
import {useSearchArea} from "~/composables/ui/modals/useSearchArea";

const { isOpen: isSearchAreaOpen } = useSearchArea()

</script>

<template>
  <header>
    <the-menu />
    <Transition name="search-slide">
      <the-search-area v-if="isSearchAreaOpen" />
    </Transition>
  </header>
</template>

<style scoped>
:global(.search-slide-enter-active),
:global(.search-slide-leave-active) {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease-out;
}

:global(.search-slide-enter-from),
:global(.search-slide-leave-to) {
  transform: translateY(-100%);
  opacity: 0;
}

:global(.search-slide-enter-to),
:global(.search-slide-leave-from) {
  transform: translateY(0);
  opacity: 1;
}
</style>
