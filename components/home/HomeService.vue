<script setup lang="ts">
import BaseSection from '~/components/ui/sections/BaseSection.vue'
import BaseHeading from '~/components/ui/typography/BaseHeading.vue'
import BaseArrowLink from '~/components/ui/links/BaseArrowLink.vue'
import BaseText from '~/components/ui/typography/BaseText.vue'

const { services } = useAppConfig()
</script>

<template>
  <div class="w-full min-h-[800px] bg-[url('/images/home/service/bg.jpg')] bg-cover bg-center bg-no-repeat">
    <base-section
      class="bg-transparent"
      padding-y="lg"
    >
      <div class="w-full flex flex-col md:flex-row gap-12">
        <div class="flex w-full md:w-1/2 lg:w-7/12 flex-col gap-8">
          <base-heading
            as="h3"
            size="sm"
            class="text-neutral-50 bg-primary px-5 py-2 rounded-full w-fit"
          >
            <span
              aria-hidden="true"
              class="select-none"
            >------ </span>NOSSOS SERVIÇOS
          </base-heading>
          <base-heading
            as="h2"
            size="display"
            class="text-neutral-50"
          >
            Soluções completas para a sua obra
          </base-heading>
          <ul class="flex flex-col gap-4">
            <li
              v-for="service in services"
              :key="service.id"
            >
              <base-arrow-link
                variant="secondary"
                :to="`/servicos/${service.id}`"
              >
                {{ service.title }}
              </base-arrow-link>
            </li>
          </ul>
        </div>
        <div class="flex flex-col gap-4 w-full md:w-1/2 lg:w-5/12">
          <nuxt-img
            class="w-full h-auto rounded-xl"
            src="/images/home/service/service-1.jpg"
            alt="Imagem de ferramentas de construção e acabamentos diversos"
          />
          <base-text
            size="md"
            class="text-neutral-50"
          >
            Nossa equipe especializada oferece soluções personalizadas
            para cada projeto, garantindo qualidade e eficiência em todos os serviços.
          </base-text>
        </div>
      </div>
    </base-section>
  </div>
</template>

<style scoped>

</style>
