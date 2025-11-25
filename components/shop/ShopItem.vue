<script setup lang="ts">
import type { ProductResponse } from '~/types/api'
import BaseHeading from '~/components/ui/typography/BaseHeading.vue'
import BaseText from '~/components/ui/typography/BaseText.vue'

const props = defineProps<{
  product: ProductResponse
}>()

const config = useRuntimeConfig()
</script>

<template>
  <article class="group flex flex-col gap-4 w-full">
    <nuxt-link
      :to="`/shop/${props.product.id}`"
      class="relative w-full aspect-[3/4] block overflow-hidden bg-neutral-200 focus:transition-all focus:duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
    >
      <div
        class="absolute inset-0 z-[1] bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex justify-center items-center"
      >
        <Icon
          name="material-symbols:arrow-right-alt-rounded"
          class="w-20 h-20 text-neutral-50"
          aria-hidden="true"
        />
      </div>

      <nuxt-img
        v-if="props.product.images.length > 0"
        class="w-full h-full object-cover"
        :src="`${config.public.s3Base}${props.product.images[0]}`"
        :alt="`Imagem do produto ${props.product.name}`"
      />

      <div
        v-else
        class="w-full h-full flex items-center justify-center"
      >
        <Icon
          name="material-symbols:image-not-supported"
          class="w-12 h-12 text-primary"
          aria-hidden="true"
        />
      </div>
    </nuxt-link>

    <div class="flex flex-col gap-2 w-full">
      <nuxt-link
        :to="`/shop/${props.product.id}`"
        class="text-neutral-900 w-fit focus:transition-all focus:duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
      >
        <base-heading
          as="h3"
          size="sm"
        >
          {{ props.product.name }}
        </base-heading>
      </nuxt-link>

      <div class="flex justify-between w-full items-center">
        <base-text
          size="lg"
          as="span"
          class="text-neutral-900 font-medium"
        >
          R$ {{ Number(props.product.price).toFixed(2).replace('.', ',') }}
        </base-text>

        <button
          type="button"
          aria-label="Visitar página do produto {{ props.product.name }}"
          class="group flex justify-center items-center w-12 h-12 focus:outline-none text-neutral-900 hover:text-neutral-50 focus:text-neutral-50 focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:bg-primary hover:bg-primary cursor-pointer transition-colors duration-300 ease-in-out"
        >
          <Icon
            name="material-symbols:add-shopping-cart"
            class="w-6 h-6 transition-colors duration-300 ease-in-out"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  </article>
</template>
