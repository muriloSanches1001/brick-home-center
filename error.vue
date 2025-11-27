<script setup lang="ts">
import BaseScrollWrapper from '~/components/ui/scroll/BaseScrollWrapper.vue'
import { useAppScroll } from '~/composables/ui/app/useAppScroll'
import type { NuxtError } from '#app'
import BasePageHeader from '~/components/ui/navigation/BasePageHeader.vue'
import BaseSection from '~/components/ui/sections/BaseSection.vue'
import BaseHeading from '~/components/ui/typography/BaseHeading.vue'
import BaseText from '~/components/ui/typography/BaseText.vue'
import BaseArrowLink from '~/components/ui/links/BaseArrowLink.vue'

const route = useRoute()
const { registerScrollElement, scrollToTop } = useAppScroll()

const onWrapperReady = (el: HTMLElement) => {
  registerScrollElement(el)
}

watch(
  () => route.path,
  () => {
    scrollToTop(false)
  },
)

const props = defineProps<{ error: NuxtError }>()

const pageTitle = computed(() => {
  const code = Number(props.error?.statusCode)
  return code === 404
    ? 'Página Não Encontrada · Brick Home Center'
    : 'Erro Interno no Servidor · Brick Home Center'
})

useHead({
  title: pageTitle,
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})

const breadcrumbs = computed(() => {
  return [
    { label: 'Início', to: '/' },
    { label: 'Página Não Encontrada', to: '' },
  ]
})
</script>

<template>
  <base-scroll-wrapper
    class="h-screen"
    @ready="onWrapperReady"
  >
    <nuxt-layout>
      <base-page-header
        :title="'Página Não Encontrada'"
        :items="breadcrumbs"
      />

      <base-section padding-y="lg">
        <div class="flex flex-col items-center justify-center gap-8">
          <nuxt-img
            v-if="props.error.statusCode === 404"
            class="w-full h-auto"
            src="/images/error/404.svg"
            alt="Ilustração 404 — Página não encontrada"
          />
          <nuxt-img
            v-else
            class="w-full h-auto"
            src="/images/error/500.svg"
            alt="Ilustração 500 — Página não encontrada"
          />

          <base-heading
            v-if="props.error?.statusCode === 404"
            as="h2"
            size="display"
            class="text-center"
          >
            Oops! Página Não Encontrada.
          </base-heading>
          <base-heading
            v-else
            as="h2"
            size="display"
            class="text-center"
          >
            Oops! Erro Interno no Servidor.
          </base-heading>
          <base-text
            v-if="props.error?.statusCode === 404"
            class="text-center"
          >
            Desculpe — a página que procura não existe. Verifique o endereço ou volte à página inicial.
          </base-text>
          <base-text
            v-else
            class="text-center"
          >
            Ops — ocorreu um erro interno no servidor. Tente novamente mais tarde ou contacte o suporte.
          </base-text>

          <base-arrow-link to="/">
            Voltar para Home
          </base-arrow-link>
        </div>
      </base-section>
    </nuxt-layout>
  </base-scroll-wrapper>
</template>
