<script setup lang="ts">
type TextAs = 'p' | 'span' | 'div' | 'small'
type TextSize = 'xs' | 'sm' | 'md' | 'lg'
type TextVariant = 'default' | 'muted' | 'subtle' | 'danger' | 'success'
type TextAlign = 'left' | 'center' | 'right' | 'justify'

const props = withDefaults(defineProps<{
  as?: TextAs
  size?: TextSize
  variant?: TextVariant
  align?: TextAlign
  class?: string
}>(), {
  as: 'p',
  size: 'md',
  variant: 'default',
  align: 'left',
})

const sizeClasses: Record<TextSize, string> = {
  xs: 'text-xs leading-relaxed',
  sm: 'text-sm leading-relaxed',
  md: 'text-base leading-relaxed',
  lg: 'text-lg leading-relaxed',
}

const variantClasses: Record<TextVariant, string> = {
  default: 'text-slate-700',
  muted: 'text-slate-500',
  subtle: 'text-slate-400',
  danger: 'text-red-600',
  success: 'text-green-600',
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
    variantClasses[props.variant],
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
