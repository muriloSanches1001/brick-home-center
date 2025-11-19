<script setup lang="ts">
import type { UseFocusTrapOptions } from '@vueuse/integrations'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { useSidebar } from '~/composables/ui/modals/useSidebar'
import BaseHeading from '~/components/ui/typography/BaseHeading.vue'
import BaseText from '~/components/ui/typography/BaseText.vue'

const benefits = ref(['Qualidade', 'Durabilidade', 'Segurança', 'Pontualidade', 'Inovação'])
const socialLinks = ref<{
  link: string
  icon: string
  name: string
}[]>([
  { link: 'https://www.instagram.com', icon: 'uil:instagram', name: 'Instagram' },
  { link: 'https://www.facebook.com', icon: 'uil:facebook-f', name: 'Facebook' },
  { link: 'https://www.linkedin.com', icon: 'uil:linkedin-alt', name: 'LinkedIn' },
])

const options: UseFocusTrapOptions = {
  escapeDeactivates: true,
  clickOutsideDeactivates: true,
  immediate: true,
  onDeactivate() {
    close()
  },
}

const sidebarRef = ref<HTMLElement | null>(null)

const { deactivate } = useFocusTrap(sidebarRef, options)
const { close } = useSidebar()

onUnmounted(() => {
  deactivate()
})

const handleClose = () => {
  deactivate()
  close()
}
</script>

<template>
  <div class="w-full h-full fixed top-0 left-0 z-20 flex items-start bg-black/70">
    <dialog
      ref="sidebarRef"
      class="h-full w-full max-w-full sm:max-w-[400px] ml-0 flex flex-col gap-2 bg-neutral-50"
      aria-labelledby="sidebar-title"
      aria-describedby="sidebar-description"
    >
      <span
        id="mobile-nav-title"
        class="sr-only"
      >Menu de navegação</span>
      <span
        id="mobile-nav-description"
        class="sr-only"
      >Navegue pelo menu do site para acessar todas as páginas disponíveis</span>

      <button
        type="button"
        aria-label="Fechar sidebar"
        class="group absolute top-4 right-4 w-12 h-12 bg-neutral-50 hover:bg-primary focus:bg-primary flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
        @click="handleClose"
      >
        <Icon
          name="uil:times"
          class="w-8 h-8 text-neutral-700 group-hover:text-neutral-50 group-focus:text-neutral-50 transition-colors duration-300 ease-in-out"
          aria-hidden="true"
        />
      </button>

      <nuxt-img
        class="h-auto w-full"
        src="/images/sidebar/main.jpg"
        alt=""
        aria-hidden="true"
      />

      <div class="flex flex-col gap-4 px-4 sm:px-10 py-6">
        <BaseHeading
          as="h3"
          size="2xl"
        >
          Sobre a Brick
        </BaseHeading>
        <base-text
          size="sm"
          as="p"
        >
          A Brick é uma empresa de construção focada em entregar obras seguras, bem-feitas e adaptadas às necessidades de cada cliente.
        </base-text>
        <ul class="flex flex-col gap-1">
          <li
            v-for="benefit in benefits"
            :key="benefit"
            class=" text-neutral-900 text-lg font-medium flex items-center gap-2"
          >
            <Icon
              name="uil:check"
              class="w-5 h-5 text-slate-700"
              aria-hidden="true"
            />
            <base-text
              size="sm"
              as="span"
            >
              {{ benefit }}
            </base-text>
          </li>
        </ul>
        <base-heading
          as="h4"
          size="lg"
        >
          Acessibilidade
        </base-heading>
        <!--    TODO: Add accessibility section    -->
        <base-heading
          as="h4"
          size="lg"
        >
          Social
        </base-heading>
        <ul class="flex gap-2">
          <li
            v-for="social in socialLinks"
            :key="social.link"
          >
            <a
              :href="social.link"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Link para rede social ${social.name}`"
              class="w-8 h-8 rounded-full bg-neutral-900 hover:bg-primary focus:bg-primary flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
            >
              <Icon
                :name="social.icon"
                class="w-4 h-4 text-neutral-50"
                aria-hidden="true"
              />
            </a>
          </li>
        </ul>
      </div>
    </dialog>
  </div>
</template>
