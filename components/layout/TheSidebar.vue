<script setup lang="ts">
import type { UseFocusTrapOptions } from '@vueuse/integrations'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { useSidebar } from '~/composables/ui/modals/useSidebar'
import BaseHeading from '~/components/ui/typography/BaseHeading.vue'
import BaseText from '~/components/ui/typography/BaseText.vue'
import BaseScrollWrapper from '~/components/ui/scroll/BaseScrollWrapper.vue'
import {useAppAccessibility} from "~/composables/ui/app/useAppAccessibility";

const benefits = ref(['Qualidade', 'Durabilidade', 'Segurança', 'Pontualidade', 'Inovação'])
const { social } = useAppConfig()

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

// accessibility

const { zoom, increase, decrease, reset, MIN_ZOOM, MAX_ZOOM } = useAppAccessibility()
</script>

<template>
  <div class="w-full h-full fixed top-0 left-0 z-20 flex items-start bg-black/70">
    <dialog
      ref="sidebarRef"
      class="h-full w-full max-w-full sm:max-w-[400px] ml-0 flex flex-col gap-2 bg-neutral-50"
      aria-labelledby="sidebar-title"
      aria-describedby="sidebar-description"
    >
      <base-scroll-wrapper class="h-full">
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
          class="group absolute top-5 right-5 w-12 h-12 bg-neutral-50 hover:bg-primary focus:bg-primary flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
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
            class="text-slate-700"
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
          <div class="flex gap-3 flex-col">
            <div class="flex items-center gap-4">
              <base-heading as="h5" size="sm">
                Tamanho da fonte:
              </base-heading>
              <div class="flex gap-2">
                <button
                  type="button"
                  @click="decrease"
                  :disabled="zoom <= MIN_ZOOM"
                  aria-label="Diminuir tamanho da fonte"
                  class="w-6 h-6 rounded-sm bg-neutral-900 hover:bg-primary focus:bg-primary flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                >
                  <Icon name="uil:minus" class="w-3 h-3 text-neutral-50" />
                </button>
                <button
                  type="button"
                  @click="reset"
                  aria-label="Restaurar tamanho original"
                  title="Clique para restaurar o padrão"
                  class="px-3 h-6 rounded-sm bg-neutral-900 hover:bg-primary focus:bg-primary flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                >
                  <base-text size="sm" as="span" class="text-neutral-50">{{ zoom === 100 ? 'Padrão' : zoom + '%' }}</base-text>
                </button>
                <button
                  type="button"
                  @click="increase"
                  :disabled="zoom >= MAX_ZOOM"
                  aria-label="Aumentar tamanho da fonte"
                  class="w-6 h-6 rounded-sm bg-neutral-900 hover:bg-primary focus:bg-primary flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-neutral-900"
                >
                  <Icon name="uil:plus" class="w-3 h-3 text-neutral-50" />
                </button>
              </div>
            </div>
          </div>
          <base-heading
            as="h4"
            size="lg"
          >
            Social
          </base-heading>
          <ul class="flex gap-2">
            <li
              v-for="s in social"
              :key="s.link"
            >
              <a
                :href="s.link"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Link para rede social ${s.name}`"
                class="w-8 h-8 rounded-full bg-neutral-900 hover:bg-primary focus:bg-primary flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
              >
                <Icon
                  :name="s.icon"
                  class="w-4 h-4 text-neutral-50"
                  aria-hidden="true"
                />
              </a>
            </li>
          </ul>
        </div>
      </base-scroll-wrapper>
    </dialog>
  </div>
</template>
