<script setup lang="ts">
import type { ProductResponse } from '~/types/api'
import BaseText from '~/components/ui/typography/BaseText.vue'
import BaseHeading from '~/components/ui/typography/BaseHeading.vue'
import BaseArrowLink from '~/components/ui/links/BaseArrowLink.vue'

const props = defineProps<{
  product: ProductResponse
}>()

const config = useRuntimeConfig()

const selectedImage = ref(props.product.images?.[0] || '')

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-12 animate-fade-in">
    <div class="w-full lg:w-1/2 flex flex-col gap-4">
      <div class="w-full aspect-[3/4] bg-neutral-200 overflow-hidden rounded-lg">
        <nuxt-img
          v-if="selectedImage"
          :src="`${config.public.s3Base}${selectedImage}`"
          class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          :alt="`Imagem do produto ${props.product.name}`"
        />
        <div
          v-else
          class="w-full h-full flex items-center justify-center text-neutral-400"
        >
          <Icon
            name="material-symbols:image-not-supported"
            size="48"
          />
        </div>
      </div>

      <div
        v-if="props.product.images?.length > 1"
        class="flex gap-4 overflow-x-auto pb-2"
      >
        <button
          v-for="img in props.product.images"
          :key="img"
          type="button"
          class="w-20 h-auto aspect-[3/4] shrink-0 border-2 rounded-md overflow-hidden transition-all duration-200"
          :class="selectedImage === img ? 'border-primary ring-2 ring-primary/30' : 'border-transparent hover:border-neutral-300'"
          @click="selectedImage = img"
        >
          <nuxt-img
            :src="`${config.public.s3Base}${img}`"
            class="w-full h-full object-cover"
          />
        </button>
      </div>
    </div>

    <div class="w-full lg:w-1/2 flex flex-col gap-6">
      <div class="flex flex-col gap-3">
        <base-text
          size="md"
          class="text-neutral-500 uppercase"
        >
          {{ props.product.categories[0]?.name || 'Geral' }}
        </base-text>
        <base-heading
          as="h2"
          size="2xl"
          class="text-neutral-900"
        >
          {{ product.name }}
        </base-heading>
        <base-heading
          as="h3"
          size="xl"
          class="text-neutral-800"
        >
          {{ formatPrice(product.price) }}
        </base-heading>
      </div>

      <div class="h-px bg-neutral-200 w-full" />

      <base-text class="text-neutral-600">
        {{ props.product.description }}
      </base-text>

      <base-arrow-link
        :to="props.product.link"
        class="mt-4 w-full sm:w-fit"
      >
        Comprar
      </base-arrow-link>
    </div>
  </div>
</template>

<style scoped>

</style>
