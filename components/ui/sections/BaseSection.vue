<script setup lang="ts">
import BaseContainer from '~/components/ui/sections/BaseContainer.vue'

type SectionVariant = 'default' | 'muted' | 'dark'
type PaddingY = 'sm' | 'md' | 'lg'

const props = defineProps<{
  variant?: SectionVariant
  paddingY?: PaddingY
}>()

const variantClass: Record<SectionVariant, string> = {
  default: 'bg-neutral-50',
  muted: 'bg-slate-50',
  dark: 'bg-slate-900 text-slate-50',
}

const pyClass: Record<NonNullable<typeof props.paddingY>, string> = {
  sm: 'py-[50px] md:py-[60px]',
  md: 'py-[60px] md:py-[80px]',
  lg: 'py-[70px] md:py-[100px]',
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
