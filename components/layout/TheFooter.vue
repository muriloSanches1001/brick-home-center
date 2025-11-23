<script setup lang="ts">
import BaseText from '~/components/ui/typography/BaseText.vue'
import BaseHeading from '~/components/ui/typography/BaseHeading.vue'
import BaseArrowButton from '~/components/ui/buttons/BaseArrowButton.vue'
import BaseTextInput from '~/components/ui/inputs/BaseTextInput.vue'

const { social } = useAppConfig()

const firstNavItems = ref<{ name: string, link: string }[]>([
  { name: 'Home', link: '/' },
  { name: 'Sobre', link: '/sobre' },
  { name: 'Serviços', link: '/servicos' },
])

const endNavItems = ref<{ name: string, link: string }[]>([
  { name: 'Shop', link: '/shop' },
  { name: 'Blog', link: '/blog' },
  { name: 'Contato', link: '/contato' },
])

const emailInput = ref<string>('')

const newsletter = () => {
  // TODO: Implement newsletter functionality
  console.log('Newsletter for email:', emailInput.value)
}
</script>

<template>
  <footer
    class="m-4 md:m-8 [calc(100%-2rem)] md:w-[calc(100%-4rem)] bg-[url('/images/footer/bg.jpg')] bg-neutral-950/95  bg-cover bg-center bg-no-repeat bg-blend-overlay backdrop-blur-2xl rounded-xl px-4 md:px-8 py-16 flex flex-col gap-12"
  >
    <div class="max-w-7xl mx-auto w-full h-full flex flex-col md:flex-row justify-between gap-8 lg:gap-0">
      <div class="flex flex-col gap-4 w-full md:w-1/3 lg:w-1/4">
        <nuxt-link
          to="/"
          class="focus:transition-all focus:duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
        >
          <nuxt-img
            class="h-auto w-48"
            src="/images/logo/logo-dark.png"
            alt="Logo da Empresa Brick Home Center"
          />
        </nuxt-link>
        <base-text
          as="p"
          size="sm"
          class="text-neutral-50"
        >
          Servimos nossos clientes, nossos colaboradores e nossa comunidade com compromisso, liderança, excelência e
          atenção aos detalhes.
        </base-text>
        <div class="flex gap-4 align-center">
          <base-text
            as="p"
            size="md"
            class="font-bold text-neutral-50"
          >
            Siga-nos:
          </base-text>
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
      </div>
      <div class="flex flex-col gap-4 w-full md:w-1/3 lg:w-auto md:mx-auto">
        <base-heading
          as="h4"
          size="xl"
          class="text-neutral-50"
        >
          LINKS
        </base-heading>
        <div class="flex justify-between md:justify-normal md:gap-8 lg:gap-32">
          <ul class="flex flex-col gap-3">
            <li
              v-for="item in firstNavItems"
              :key="item.link"
            >
              <nuxt-link
                :to="item.link"
                class="p-2 focus:transition-all focus:duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 text-neutral-50 focus:text-primary hover:text-primary font-normal transition-colors duration-300 ease-in-out"
              >
                {{ item.name }}
              </nuxt-link>
            </li>
          </ul>
          <ul class="flex flex-col gap-3">
            <li
              v-for="item in endNavItems"
              :key="item.link"
            >
              <nuxt-link
                :to="item.link"
                class="p-2 focus:transition-all focus:duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 text-neutral-50 focus:text-primary hover:text-primary font-normal transition-colors duration-300 ease-in-out"
              >
                {{ item.name }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex flex-col gap-4 w-full md:w-1/3 lg:w-1/4">
        <base-heading
          as="h4"
          size="xl"
          class="text-neutral-50"
        >
          NEWSLETTER
        </base-heading>
        <base-text
          as="p"
          size="sm"
          class="text-neutral-50"
        >
          conteúdos para nossos clientes, nossa equipe e nossa comunidade, com compromisso e leveza.
        </base-text>
        <form
          class="w-full flex flex-col gap-3"
          role="form"
          @submit.prevent="newsletter"
        >
          <base-text-input
            id="footer-email"
            v-model="emailInput"
            name="email"
            type="email"
            size="md"
            placeholder="Digite seu email"
            icon="oui:email"
            input-aria-label="Campo de email para newsletter"
            input-aria-describedby="footer-newsletter-description"
            :disabled="false"
            :required="true"
            bg="bg-neutral-50"
            class="w-full"
          />
          <base-arrow-button
            class="w-full"
            size="sm"
            type="submit"
          >
            Inscrever-se
          </base-arrow-button>
        </form>
      </div>
    </div>
    <div class="max-w-7xl mx-auto flex w-full py-6 px-9 bg-neutral-800 rounded-full justify-center md:justify-start">
      <base-text
        as="p"
        size="sm"
        class="text-neutral-50"
      >
        Copyright © 2025 - Todos os diretos reservados.
      </base-text>
    </div>
  </footer>
</template>

<style scoped>

</style>
