<script setup lang="ts">
import SimpleBar from 'simplebar-vue'

const props = defineProps<{
  class?: string
}>()

const emit = defineEmits<{
  (e: 'scroll', event: Event): void
}>()

const simplebarRef = ref<InstanceType<typeof SimpleBar> | null>(null)

const onScroll = (e: Event) => {
  emit('scroll', e)
}

onMounted(async () => {
  await nextTick()

  const rootElement = simplebarRef.value?.$el as HTMLElement

  if (rootElement) {
    const scrollElement = rootElement.querySelector('.simplebar-content-wrapper') as HTMLElement

    if (scrollElement) {
      const cleanup = useEventListener(scrollElement, 'scroll', onScroll)

      onUnmounted(() => cleanup())
    } else {
      console.warn('BaseScrollWrapper: Elemento .simplebar-content-wrapper não encontrado.')
    }
  }
})
</script>

<template>
  <client-only>
    <simple-bar
      ref="simplebarRef"
      :auto-hide="false"
      :class="['base-scroll-wrapper', props.class ? props.class : '']"
    >
      <slot />
    </simple-bar>
  </client-only>
</template>

<style scoped>
.base-scroll-wrapper :deep(.simplebar-track.simplebar-vertical) {
  right: 0;
  top: 0;
  bottom: 0;
  width: 10px;
  background: var(--neutral-100);
}

.base-scroll-wrapper :deep(.simplebar-track.simplebar-horizontal) {
  left: 0;
  right: 0;
  bottom: 0;
  height: 10px;
  background: var(--neutral-100);
}

.base-scroll-wrapper :deep(.simplebar-scrollbar::before) {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--primary-default);
  border-radius: 0;
  opacity: 1;
}

@media (width <= 768px) {
  .base-scroll-wrapper :deep(.simplebar-track.simplebar-vertical) {
    width: 5px;
  }

  .base-scroll-wrapper :deep(.simplebar-track.simplebar-horizontal) {
    height: 5px;
  }
}
</style>
