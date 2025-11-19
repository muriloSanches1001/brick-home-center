<script setup lang="ts">
import BaseArrowButton from "~/components/ui/buttons/BaseArrowButton.vue";
import {useSearchArea} from "~/composables/ui/modals/useSearchArea";
import {useMobileNav} from "~/composables/ui/modals/useMobileNav";
import {useSidebar} from "~/composables/ui/modals/useSidebar";
import {useAppScroll} from "~/composables/ui/app/useAppScroll";

const navItems = ref<{ name: string; link: string }[]>([
  {name: 'Home', link: '/'},
  {name: 'Sobre', link: '/sobre'},
  {name: 'Serviços', link: '/servicos'},
  {name: 'Shop', link: '/shop'},
  {name: 'Blog', link: '/blog'},
  {name: 'Contato', link: '/contato'},
])

const { isSticky } = useAppScroll()

const {open: openSearchArea} = useSearchArea()
const {open: openMobileNav} = useMobileNav()
const {open: openSidebar} = useSidebar()
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
        'flex items-center justify-between bg-neutral-50 pr-10 pl-8',
        'transition-all duration-300 ease-in-out',
        'max-w-7xl',
        isSticky ? 'rounded-none py-5 mx-auto' : 'rounded-full shadow-md py-3 lg:py-5 mx-2 md:mx-5 xl:py-4 xl:mx-auto'
      ]"
    >
      <nuxt-link
        to="/"
        class="p-2 focus:transition-all focus:duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
      >
        <nuxt-img
          class="h-auto hidden [@media(min-width:550px)]:block w-36 sm:w-48" src="/images/logo/logo.png"
          alt="Logo da Empresa Brick Home Center"
        />
        <nuxt-img
          class="w-auto hidden [@media(max-width:550px)]:block h-12 sm:w-48" src="/images/logo/icone.png"
          alt="Ícone da Empresa Brick Home Center"
        />
      </nuxt-link>

      <div class="w-px h-12 bg-neutral-300"/>

      <ul class="hidden lg:flex lg:gap-4">
        <li v-for="item in navItems" :key="item.link">
          <nuxt-link
            :to="item.link"
            class="p-2 focus:transition-all focus:duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 text-neutral-900 hover:text-primary font-normal transition-colors duration-300 ease-in-out"
          >
            {{ item.name }}
          </nuxt-link>
        </li>
      </ul>

      <div class="w-px h-12 bg-neutral-300 hidden lg:flex"/>

      <div class="flex items-center gap-3">
        <button
          class="group flex justify-center items-center w-12 h-12 focus:outline-none focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:bg-primary hover:bg-primary cursor-pointer transition-colors duration-300 ease-in-out"
          aria-label="Abrir área de busca de produtos"
          @click="openSearchArea"
          type="button"
        >
          <Icon
            name="uil:search"
            aria-hidden="true"
            class="bg-neutral-900 group-hover:bg-neutral-50 group-focus:bg-neutral-50 w-6 h-6 transition-colors duration-300 ease-in-out"
          />
        </button>

        <base-arrow-button class="hidden md:flex lg:hidden xl:flex">Entre em Contato!</base-arrow-button>

        <button
          class="hidden [@media(min-width:550px)]:flex justify-center items-center w-12 h-12 rounded-full focus:outline-none bg-black focus:bg-primary hover:bg-primary cursor-pointer transition-colors duration-300 ease-in-out"
          @click="openSidebar"
          aria-label="Abrir o sidebar"
          type="button"
        >
          <Icon
            name="uil:align-justify"
            aria-hidden="true"
            class="bg-neutral-50 w-6 h-6"
          />
        </button>

        <button
          class="flex lg:hidden justify-center items-center w-12 h-12 focus:outline-none focus:ring-primary focus:ring-2 focus:ring-offset-2 cursor-pointer transition-colors duration-300 ease-in-out"
          @click="openMobileNav"
          aria-label="Abrir o menu mobile"
          type="button"
        >
          <Icon
            name="uil:align-justify"
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
