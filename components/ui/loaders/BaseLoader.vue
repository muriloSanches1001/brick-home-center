<script setup lang="ts">
type LoaderSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const props = defineProps<{
  size?: LoaderSizes
}>()

const sizeClasses: Record<LoaderSizes, string> = {
  'xs': 'w-4 h-4 border-[3px]',
  'sm': 'w-6 h-6 border-4',
  'md': 'w-8 h-8 border-[5px]',
  'lg': 'w-12 h-12 border-[6px]',
  'xl': 'w-16 h-16 border-[7px]',
}
</script>

<template>
  <div
    :class="[
      'rounded-full border-neutral-50 border-t-primary animate-spin',
      sizeClasses[size ?? 'md']
    ]"
    role="status"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>
