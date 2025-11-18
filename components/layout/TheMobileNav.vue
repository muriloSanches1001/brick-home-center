<script setup lang="ts">

import type {UseFocusTrapOptions} from "@vueuse/integrations";
import {useFocusTrap} from "@vueuse/integrations/useFocusTrap";
import {useMobileNav} from "~/composables/ui/modals/useMobileNav";

const navItems = ref<{ name: string; link: string }[]>([
  {name: 'Home', link: '/'},
  {name: 'Sobre', link: '/sobre'},
  {name: 'Serviços', link: '/servicos'},
  {name: 'Shop', link: '/shop'},
  {name: 'Blog', link: '/blog'},
  {name: 'Contato', link: '/contato'},
])

const options: UseFocusTrapOptions = {
  escapeDeactivates: true,
  clickOutsideDeactivates: true,
  immediate: true,
  onDeactivate() {
    close();
  },
};

const menuRef = ref<HTMLElement | null>(null);

const {deactivate} = useFocusTrap(menuRef, options);
const {close} = useMobileNav();

onUnmounted(() => {
  deactivate();
});

const handleClose = () => {
  deactivate();
  close();
};

const route = useRoute();

const isLinkActive = (link: string) => {
  if (link === '/') {
    return route.path === '/';
  }

  return route.path.startsWith(link);
};
</script>

<template>
  <nav
    class="fixed w-full h-full top-0 right-0 z-20 flex flex-col gap-4 bg-neutral-50 px-4 py-14"
    ref="menuRef"
    aria-labelledby="mobile-nav-title"
    aria-describedby="mobile-nav-description"
  >
    <span id="mobile-nav-title" class="sr-only">Menu de navegação</span>
    <span id="mobile-nav-description"
          class="sr-only">Navegue pelo menu do site para acessar todas as páginas disponíveis</span>

    <div class="flex gap-8 justify-between pl-2 pr-4 items-center">
      <nuxt-link
        aria-label="Ir para a página inicial"
        class="p-2 focus:transition-all focus:duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
        to="/"
      >
        <nuxt-img class="h-auto w-36" src="/images/logo/logo.png" alt="Logo da Empresa Brick Home Center"/>
      </nuxt-link>

      <button
        type="button"
        aria-label="Fechar menu mobile"
        @click="handleClose"
        class="w-8 h-8 flex items-center justify-center focus:transition-all focus:duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
      >
        <Icon
          name="uil:times"
          class="w-8 h-8 text-neutral-700 hover:text-neutral-900 transition-colors duration-300 ease-in-out"
          aria-hidden="true"
        />
      </button>
    </div>

    <div class="w-full h-px bg-neutral-300"/>

    <ul class="flex flex-col gap-1 mt-2">
      <li v-for="item in navItems" :key="item.link">
        <nuxt-link
          :to="item.link"
          class="px-4 rounded-lg py-3 w-full flex transition-colors duration-300 ease-in-out focus:transition-all focus:duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
          :class="[
            isLinkActive(item.link) ? 'bg-primary text-neutral-50 font-medium hover:bg-primary-strong' : 'bg-neutral-50 text-neutral-900 font-normal hover:text-primary'
          ]"
          :aria-current="isLinkActive(item.link) ? 'page' : undefined"
        >
          -
          {{ item.name }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>
