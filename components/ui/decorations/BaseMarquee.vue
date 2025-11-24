<script setup lang="ts">
const props = withDefaults(defineProps<{
  direction?: 'left' | 'right'
  duration?: string
  class?: string
}>(), {
  direction: 'left',
  duration: '30s',
  class: '',
})

const animationStyle = computed(() => ({
  animationDuration: props.duration,
}))
</script>

<template>
  <div
    class="marquee-container w-full overflow-hidden flex whitespace-nowrap"
    :class="props.class"
  >
    <div
      class="marquee-wrapper flex shrink-0 items-center"
      :class="direction === 'right' ? 'animate-marquee-right' : 'animate-marquee-left'"
      :style="animationStyle"
    >
      <div class="flex shrink-0 items-center pr-8 lg:pr-16 items-wrapper">
        <slot />
      </div>

      <div
        class="flex shrink-0 items-center pr-8 lg:pr-16 items-wrapper"
        aria-hidden="true"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-wrapper {
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.marquee-container:hover .marquee-wrapper {
  animation-play-state: paused;
}

@keyframes marquee-left {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee-left {
  animation-name: marquee-left;
}

@keyframes marquee-right {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(0%);
  }
}

.animate-marquee-right {
  animation-name: marquee-right;
}

.items-wrapper :deep(> *) {
  display: flex;
  align-items: center;
}
</style>
