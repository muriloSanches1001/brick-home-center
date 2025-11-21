<script setup lang="ts">
const props = defineProps<{
  as?: string
}>()

const tag = computed(() => props.as ?? 'div')
</script>

<template>
  <component
    :is="tag"
    class="mx-auto w-full max-w-7xl px-4 md:px-6"
  >
    <slot />
  </component>
</template>
