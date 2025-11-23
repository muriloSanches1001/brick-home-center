<script lang="ts" setup>
type Variant = 'primary' | 'secondary'
type Size = 'sm' | 'md' | 'lg'

const props = defineProps<{
  variant?: Variant
  size?: Size
  disabled?: boolean
  to: string
}>()

const linkBase = 'rounded-full font-bold uppercase tracking-wider font-lexend flex items-center justify-center relative overflow-hidden focus-visible:outline-none'

const linkVariantClass: Record<Variant, string> = {
  primary: 'bg-primary text-neutral-50 primary',
  secondary: 'bg-neutral-900 text-neutral-50 secondary',
}

const linkSizeClass: Record<Size, string> = {
  sm: 'text-xs px-7 py-5',
  md: 'text-sm px-8 py-6',
  lg: 'text-base px-9 py-7',
}

const linkClasses = computed(() =>
  `${linkBase} ${!props.disabled ? 'group' : ''} ${linkSizeClass[props.size || 'md']} ${linkVariantClass[props.variant || 'primary']} ${props.disabled ? 'opacity-80 cursor-default' : ''}`,
)

const iconWrapperBase = 'flex items-center justify-center rounded-full absolute right-2 top-1/2 -translate-y-1/2 transition-colors duration-400 ease-in-out'

const iconWrapperVariantClass: Record<Variant, string> = {
  primary: ' bg-black group-hover:bg-neutral-50 group-focus-visible:bg-neutral-50',
  secondary: 'bg-neutral-50 group-hover:bg-black group-focus-visible:bg-black',
}

const iconWrapperSizeClass: Record<Size, string> = {
  sm: 'px-1 py-1',
  md: 'px-2 py-2',
  lg: 'px-3 py-3',
}

const iconWrapperClasses = computed(() =>
  `${iconWrapperBase} ${iconWrapperSizeClass[props.size || 'md']} ${iconWrapperVariantClass[props.variant || 'primary']}`,
)

const iconBase = 'rotate-45 icon'

const iconSizeClass: Record<Size, string> = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-7 h-7',
}

const iconVariantClass: Record<Variant, string> = {
  primary: 'bg-neutral-50 group-hover:bg-black group-focus-visible:bg-black',
  secondary: 'bg-black group-hover:bg-neutral-50 group-focus-visible:bg-neutral-50',
}

const iconClasses = computed(() =>
  `${iconBase} ${iconSizeClass[props.size || 'md']} ${iconVariantClass[props.variant || 'primary']}`,
)

const textVariantClass: Record<Variant, string> = {
  primary: 'text-neutral-50',
  secondary: 'text-neutral-50 group-hover:text-black group-focus-visible:text-black transition-colors duration-400 ease-in-out',
}

const textSizeClass: Record<Size, string> = {
  sm: 'mr-6',
  md: 'mr-8',
  lg: 'mr-10',
}

const textClasses = computed(() =>
  `${textSizeClass[props.size || 'md']} ${textVariantClass[props.variant || 'primary']}`,
)
</script>

<template>
  <nuxt-link
    :class="linkClasses"
    :disabled="props.disabled"
    :to="props.to"
  >
    <span :class="textClasses">
      <slot />
    </span>
    <div :class="iconWrapperClasses">
      <Icon
        name="uil:arrow-up"
        :class="iconClasses"
        focusable="false"
        aria-hidden="true"
      />
    </div>
  </nuxt-link>
</template>

<style scoped>
a.primary::after {
  @apply bg-black
}

a.secondary::after {
  @apply bg-neutral-50
}

a::after {
  overflow: hidden;
  content: "";
  z-index: 0;
  inset: 0;
  width: 100%;
  height: 200%;
  border-radius: 9999px;
  transform: translateY(100%);
  transform-origin: top;
  position: absolute;
  transition: transform 0.4s ease-in-out;
}

a > * {
  z-index: 1;
}

a:hover::after,
a:focus-visible::after {
  transform: translateY(-25%);
}

a:disabled:hover::after {
  transform: translateY(100%);
}
</style>
