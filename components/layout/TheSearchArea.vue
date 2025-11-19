<script setup lang="ts">
import BaseArrowButton from '~/components/ui/buttons/BaseArrowButton.vue'
import BaseTextInput from '~/components/ui/inputs/BaseTextInput.vue'
import { useSearchArea } from '~/composables/ui/modals/useSearchArea'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import type { UseFocusTrapOptions } from '@vueuse/integrations'

const options: UseFocusTrapOptions = {
  escapeDeactivates: true,
  clickOutsideDeactivates: true,
  immediate: true,
  onDeactivate() {
    close()
  },
}

const dialogRef = ref<HTMLDialogElement | null>(null)
const searchInput = ref<string>('')

const { deactivate } = useFocusTrap(dialogRef, options)
const { close } = useSearchArea()

onUnmounted(() => {
  deactivate()
})

const search = () => {
  // TODO: Implement search functionality
  console.log('Searching for:', searchInput.value)
}

const handleClose = () => {
  deactivate()
  close()
}
</script>

<template>
  <dialog
    ref="dialogRef"
    class="fixed top-0 left-0 z-20 w-full py-16 bg-neutral-50 flex px-6 xl:px-0"
    aria-labelledby="search-title"
    aria-describedby="search-description"
    aria-modal="true"
  >
    <span
      id="search-title"
      class="sr-only"
    >Área de busca de produto</span>
    <span
      id="search-description"
      class="sr-only"
    >Digite os termos para realizar sua busca de produtos no site</span>

    <button
      type="button"
      aria-label="Fechar área de busca"
      class="absolute top-6 right-6 w-8 h-8 flex items-center justify-center focus:transition-all focus:duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
      @click="handleClose"
    >
      <Icon
        name="uil:times"
        class="w-8 h-8 text-neutral-700 hover:text-neutral-900 transition-colors duration-300 ease-in-out"
        aria-hidden="true"
      />
    </button>

    <form
      class="mx-auto w-full max-w-7xl flex flex-col md:flex-row items-center gap-4 md:gap-10"
      role="search"
      @submit.prevent="search"
    >
      <base-text-input
        id="search-area-product-name"
        v-model="searchInput"
        name="search"
        type="text"
        size="md"
        placeholder="Digite sua busca"
        icon="uil:search"
        ariaLabel="Campo de busca"
        ariaDescribedby="search-description"
        :disabled="false"
        :required="true"
        bg="bg-neutral-50"
        class="w-full md:w-3/4"
      />
      <base-arrow-button
        class="w-full md:w-1/4"
        size="sm"
        type="submit"
      >
        Buscar
      </base-arrow-button>
    </form>
  </dialog>
</template>

<style scoped>

</style>
