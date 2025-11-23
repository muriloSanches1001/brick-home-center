<script setup lang="ts">
import BaseHeading from '~/components/ui/typography/BaseHeading.vue'
import BaseText from '~/components/ui/typography/BaseText.vue'

type Variant = 'primary' | 'dark'
type Size = 'sm' | 'md' | 'lg'

const props = defineProps<{
  variant?: Variant
  size?: Size
  title: string
  subtitle: string
  icon: string
  value: string
}>()

const cardVariantClass: Record<Variant, string> = {
  primary: 'from-primary to-primary/90 hover:from-primary-strong hover:to-primary-strong/90',
  dark: 'from-neutral-900 to-neutral-800 hover:from-primary hover:to-primary/90',
}

const cardSizeClass: Record<Size, string> = {
  sm: 'w-[180px]',
  md: 'w-[210px]',
  lg: 'w-[240px]',
}

const cardClasses = computed(() =>
  `${cardVariantClass[props.variant || 'primary']} ${cardSizeClass[props.size || 'md']}`,
)
</script>

<template>
  <div
    class="group bg-gradient-to-br flex flex-col gap-5 p-6 rounded-xl transition-colors duration-300 ease-in-out"
    :class="cardClasses"
  >
    <base-heading
      as="h5"
      size="sm"
      class="text-neutral-50"
    >
      {{ props.title }}
    </base-heading>
    <div class="border-b border-neutral-50 flex justify-end">
      <Icon
        :name="props.icon"
        class="group-hover:scale-x-[-1] transition-transform duration-300 ease-in-out w-12 h-12 text-neutral-50"
        focusable="false"
        aria-hidden="true"
      />
    </div>
    <div class="flex flex-col gap-2">
      <base-heading
        as="h4"
        size="display"
        class="text-neutral-50"
      >
        {{ props.value }}
      </base-heading>
      <base-text
        size="sm"
        class="text-neutral-50"
      >
        {{ props.subtitle }}
      </base-text>
    </div>
  </div>
</template>

<style scoped>

</style>
