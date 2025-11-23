<script setup lang="ts">
import BaseHeading from '~/components/ui/typography/BaseHeading.vue'
import BaseArrowLink from '~/components/ui/links/BaseArrowLink.vue'
import { useProducts } from '~/composables/products/useProducts'
import BaseLoader from '~/components/ui/loaders/BaseLoader.vue'
import BaseText from '~/components/ui/typography/BaseText.vue'

const { products, pending, error } = useProducts({ size: 8, page: 0, search: '' })
</script>

<template>
  <div class="w-full flex flex-col gap-12">
    <div class="flex w-full flex-col gap-4 items-center">
      <base-heading
        as="h3"
        size="sm"
        class="text-neutral-50 bg-primary px-5 py-2 rounded-full w-fit"
      >
        <span
          aria-hidden="true"
          class="select-none"
        >------ </span>O QUE OFERECEMOS<span
          aria-hidden="true"
          class="select-none"
        > ------</span>
      </base-heading>
      <base-heading
        as="h2"
        size="display"
        class="text-neutral-900"
      >
        Da Fundação ao Acabamento
      </base-heading>
    </div>

    <Carousel
      v-if="products.length && !pending && !error"
      :items-to-show="1.3"
      :wrap-around="true"
      :transition="300"
      :breakpoints="{
        768: { itemsToShow: 2 },
        1024: { itemsToShow: 3 },
        1280: { itemsToShow: 3.5 },
      }"
    >
      <Slide
        v-for="product in products"
        :key="product.id"
        class="items-start"
      >
        <shop-item :product="product" />
      </Slide>
    </Carousel>
    <div
      v-if="pending && !error && !products.length"
      class="w-full h-[200px] flex justify-center items-center"
    >
      <base-loader size="xl" />
    </div>
    <div
      v-if="error && !pending && !products.length"
      class="w-full h-[200px] flex justify-center items-center"
    >
      <base-text
        size="md"
        class="bg-red-800 text-neutral-50 px-4 py-2 rounded-full"
      >
        {{ error }}
      </base-text>
    </div>

    <div class="flex w-full justify-center">
      <base-arrow-link to="/shop">
        Ver mais
      </base-arrow-link>
    </div>
  </div>
</template>
