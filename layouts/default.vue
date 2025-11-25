<script setup lang="ts">
import TheHeader from '~/components/layout/TheHeader.vue'
import TheFooter from '~/components/layout/TheFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
    <the-header />

    <main
      id="main-content"
      class="flex-1"
    >
      <slot />
    </main>

    <the-footer />
  </div>
</template>
