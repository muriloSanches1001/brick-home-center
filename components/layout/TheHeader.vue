<script setup lang="ts">
import TheNav from '~/components/layout/TheNav.vue'
import TheSearchArea from "~/components/layout/TheSearchArea.vue";
import {useSearchArea} from "~/composables/ui/modals/useSearchArea";
import TheMobileNav from "~/components/layout/TheMobileNav.vue";
import {useMobileNav} from "~/composables/ui/modals/useMobileNav";
import {useSidebar} from "~/composables/ui/modals/useSidebar";
import TheSidebar from "~/components/layout/TheSidebar.vue";

const { isOpen: isSearchAreaOpen } = useSearchArea()
const { isOpen: isMobileNavOpen } = useMobileNav()
const { isOpen: isSidebarOpen } = useSidebar()

</script>

<template>
  <header>
    <the-nav />
    <Transition name="search-slide">
      <the-search-area v-if="isSearchAreaOpen" />
    </Transition>
    <Transition name="mobile-nav-slide">
      <the-mobile-nav v-if="isMobileNavOpen" />
    </Transition>
    <Transition name="sidebar-slide">
      <the-sidebar v-if="isSidebarOpen" />
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

:global(.mobile-nav-slide-enter-active),
:global(.mobile-nav-slide-leave-active) {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease-out;
}

:global(.mobile-nav-slide-enter-from),
:global(.mobile-nav-slide-leave-to) {
  transform: translateX(100%);
  opacity: 0;
}

:global(.mobile-nav-slide-enter-to),
:global(.mobile-nav-slide-leave-from) {
  transform: translateX(0);
  opacity: 1;
}

:global(.sidebar-slide-enter-active),
:global(.sidebar-slide-leave-active) {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease-out;
}

:global(.sidebar-slide-enter-from),
:global(.sidebar-slide-leave-to) {
  transform: translateX(-100%);
  opacity: 0;
}

:global(.sidebar-slide-enter-to),
:global(.sidebar-slide-leave-from) {
  transform: translateX(0);
  opacity: 1;
}
</style>
