<script setup lang="ts">
import BaseContainer from '~/components/ui/sections/BaseContainer.vue'

type SectionVariant = 'default' | 'muted' | 'dark'
type PaddingY = 'sm' | 'md' | 'lg'

const props = defineProps<{
  variant?: SectionVariant
  paddingY?: PaddingY
}>()

const variantClass: Record<SectionVariant, string> = {
  default: 'bg-white',
  muted: 'bg-slate-50',
  dark: 'bg-slate-900 text-slate-50',
}

const pyClass: Record<NonNullable<typeof props.paddingY>, string> = {
  sm: 'py-8 md:py-10',
  md: 'py-10 md:py-14',
  lg: 'py-12 md:py-20',
}

const sectionClasses = computed(() => [
  variantClass[props.variant ?? 'default'],
  pyClass[props.paddingY ?? 'md'],
].join(' '))
</script>

<template>
  <section :class="sectionClasses">
    <base-container>
      <slot />
    </base-container>
  </section>
</template>
