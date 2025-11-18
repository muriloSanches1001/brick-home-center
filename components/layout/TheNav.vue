<script setup lang="ts">
import BaseArrowButton from "~/components/ui/buttons/BaseArrowButton.vue";
import {useSearchArea} from "~/composables/ui/modals/useSearchArea";

const navItems = ref<{ name: string; link: string }[]>([
  { name: 'Home', link: '/' },
  { name: 'Sobre', link: '/sobre' },
  { name: 'Serviços', link: '/servicos' },
  { name: 'Shop', link: '/shop' },
  { name: 'Blog', link: '/blog' },
  { name: 'Contato', link: '/contato' },
])

const isSticky = ref(false)

const handleScroll = () => {
  isSticky.value = window.scrollY > 50
}

const cleanup = useEventListener(window, 'scroll', handleScroll)

onMounted(() => {
  handleScroll()

  onUnmounted(cleanup)
})

const { open: openSearchArea } = useSearchArea()
</script>

<template>
  <nav
    :class="[
      'w-full z-10 transition-all duration-300 ease-in-out',
      isSticky ? 'fixed top-0 bg-neutral-50 shadow-md' : 'absolute inset-x-0 top-5'
    ]"
  >
    <div
      :class="[
        'flex items-center justify-between bg-neutral-50 px-10',
        'transition-all duration-300 ease-in-out',
        'max-w-7xl',
        isSticky ? 'rounded-none py-5 mx-auto' : 'rounded-full shadow-md py-3 lg:py-5 mx-2 md:mx-5 xl:py-4 xl:mx-auto'
      ]"
    >
      <div class="logo">
        <nuxt-img class="h-auto hidden [@media(min-width:550px)]:block w-36 sm:w-48" src="/images/logo/logo.png" alt="Logo da Empresa Brick Home Center" />
        <nuxt-img class="w-auto hidden [@media(max-width:550px)]:block h-12 sm:w-48" src="/images/logo/icone.png" alt="Ícone da Empresa Brick Home Center" />
      </div>

      <div class="w-px h-12 bg-neutral-300" />

      <ul class="hidden lg:flex lg:gap-8">
        <li v-for="item in navItems" :key="item.link">
          <nuxt-link
            :to="item.link"
            class="text-neutral-900 hover:text-primary font-normal transition-colors duration-300 ease-in-out"
          >
            {{ item.name }}
          </nuxt-link>
        </li>
      </ul>

      <div class="w-px h-12 bg-neutral-300 hidden lg:flex" />

      <div class="flex items-center gap-3">
        <button
          class="group flex justify-center items-center w-12 h-12 hover:bg-primary cursor-pointer transition-colors duration-300 ease-in-out"
          aria-label="Abrir área de busca de produtos"
          @click="openSearchArea"
        >
          <Icon
            name="uil:search"
            focusable="true"
            aria-hidden="true"
            class="bg-neutral-900 group-hover:bg-neutral-50 w-6 h-6 transition-colors duration-300 ease-in-out"
          />
        </button>

        <base-arrow-button class="hidden md:flex lg:hidden xl:flex">Entre em Contato!</base-arrow-button>

        <button
          class="hidden [@media(min-width:550px)]:flex justify-center items-center w-12 h-12 rounded-full bg-black hover:bg-primary cursor-pointer transition-colors duration-300 ease-in-out"
        >
          <Icon
            name="uil:align-justify"
            focusable="false"
            class="bg-neutral-50 w-6 h-6"
          />
        </button>

        <button
          class="flex lg:hidden justify-center items-center w-12 h-12 cursor-pointer"
        >
          <Icon
            name="uil:align-justify"
            focusable="true"
            aria-hidden="true"
            class="bg-neutral-900 w-6 h-6"
          />
        </button>
      </div>
    </div>
  </nav>
</template>


<style scoped>
</style>
