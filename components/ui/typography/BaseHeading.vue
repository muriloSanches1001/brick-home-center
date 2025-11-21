<script lang="ts" setup>
type HeadingLevels = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type HeadingSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'display'

const props = defineProps<{
  as?: HeadingLevels
  size?: HeadingSizes
  class?: string
}>()

const sizeClasses: Record<HeadingSizes, string> = {
  'xs': 'text-xs font-semibold tracking-wide',
  'sm': 'text-sm font-semibold tracking-wide',
  'md': 'text-base font-bold tracking-wide',
  'lg': 'text-xl font-bold tracking-normal',
  'xl': 'text-2xl font-extrabold tracking-normal',
  '2xl': 'text-3xl font-extrabold tracking-normal',
  'display': 'text-4xl md:text-5xl font-extrabold tracking-normal',
}

const tag = props.as || 'h2'
const classes = computed(() => {
  const base = sizeClasses[props.size || 'lg']
  return `${base} ${props.class || ''}`
})
</script>

<template>
  <component
    :is="tag"
    :class="classes"
  >
    <slot />
  </component>
</template>
