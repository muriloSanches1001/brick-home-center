<script setup lang="ts">
type TextAs = 'p' | 'span' | 'div' | 'small'
type TextSize = 'xs' | 'sm' | 'md' | 'lg'
type TextAlign = 'left' | 'center' | 'right' | 'justify'

const props = withDefaults(defineProps<{
  as?: TextAs
  size?: TextSize
  align?: TextAlign
  class?: string
}>(), {
  as: 'p',
  size: 'md',
  align: 'left',
})

const sizeClasses: Record<TextSize, string> = {
  xs: 'text-xs leading-relaxed',
  sm: 'text-sm leading-relaxed',
  md: 'text-base leading-relaxed',
  lg: 'text-lg leading-relaxed',
}

const alignClasses: Record<TextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
}

const classes = computed(() =>
  [
    sizeClasses[props.size],
    alignClasses[props.align],
    props.class,
  ].join(' '),
)
</script>

<template>
  <component
    :is="props.as"
    :class="classes"
  >
    <slot />
  </component>
</template>
