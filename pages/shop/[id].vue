<script setup lang="ts">
import { useProduct } from '~/composables/products/useProduct'
import BasePageHeader from '~/components/ui/navigation/BasePageHeader.vue'
import BaseSection from '~/components/ui/sections/BaseSection.vue'
import ShopProductDetails from '~/components/shop/ShopProductDetails.vue'
import BaseLoader from '~/components/ui/loaders/BaseLoader.vue'
import BaseHeading from '~/components/ui/typography/BaseHeading.vue'
import BaseText from '~/components/ui/typography/BaseText.vue'
import BaseArrowLink from '~/components/ui/links/BaseArrowLink.vue'
import TheMarquee from '~/components/layout/TheMarquee.vue'

const route = useRoute()
const productId = route.params.id as string

const { product, pending, error } = useProduct(productId)

const cleanDesc = (text: string): string => text ? text.substring(0, 155) + '...' : 'Confira este produto na Brick Home Center.'

const config = useRuntimeConfig()

useSeoMeta({
  title: () => `${product.value?.name} · Brick Home Center`,
  description: () => cleanDesc(product.value?.description || ''),

  ogTitle: () => `${product.value?.name} · Brick Home Center`,
  ogDescription: () => `Compre ${product.value?.name}. Confira as ofertas de materiais de construção na Brick Home Center.`,
  ogImage: () => product.value && product.value.images.length > 0 ? config.public.s3Base + product.value?.images[0] : config.public.siteUrl + '/images/seo/shop-detail.jpg',
  twitterCard: 'summary_large_image',
})

const breadcrumbs = computed(() => {
  const items = [
    { label: 'Início', to: '/' },
    { label: 'Shop', to: '/shop' },
  ]

  if (product.value) {
    items.push({ label: product.value.name, to: '' })
  }

  return items
})
</script>

<template>
  <div>
    <base-page-header
      :title="product?.name || 'Detalhes do Produto'"
      :items="breadcrumbs"
    />

    <base-section padding-y="lg">
      <div
        v-if="pending"
        class="flex w-full justify-center h-[400px] items-center"
      >
        <base-loader size="lg" />
      </div>

      <div
        v-else-if="error || !product"
        class="flex flex-col items-center justify-center gap-4 py-20"
      >
        <base-heading
          as="h2"
          size="xl"
        >
          Produto não encontrado
        </base-heading>
        <base-text class="text-center">
          O produto que você está procurando não existe ou foi removido.
        </base-text>
        <base-arrow-link
          to="/shop"
          size="lg"
        >
          Voltar para a loja
        </base-arrow-link>
      </div>

      <shop-product-details
        v-else
        :product="product"
      />
    </base-section>

    <base-section padding-y="lg">
      <shop-product-showcase />
    </base-section>

    <the-marquee />
  </div>
</template>
