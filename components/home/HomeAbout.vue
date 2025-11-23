<script setup lang="ts">
import BaseHeading from '~/components/ui/typography/BaseHeading.vue'
import BaseArrowLink from '~/components/ui/links/BaseArrowLink.vue'
import BaseText from '~/components/ui/typography/BaseText.vue'
import BaseBasicCard from '~/components/ui/cards/BaseBasicCard.vue'
</script>

<template>
  <div>
    <div class="flex flex-col lg:flex-row gap-12 w-full">
      <div class="w-full lg:w-1/6 flex flex-col h-full justify-between gap-8">
        <base-heading
          as="h3"
          size="sm"
          class="text-primary"
        >
          <span
            aria-hidden="true"
            class="select-none"
          >------ </span>QUEM SOMOS
        </base-heading>
        <base-heading
          as="h2"
          size="display"
          class="block lg:hidden"
        >
          Tudo Para Sua Obra em Um Só Lugar: Do Básico ao Acabamento
        </base-heading>
        <nuxt-img
          class="w-full h-auto rounded-2xl"
          src="/images/home/about/about-2.jpg"
          alt="Conjunto de ferramentas e materiais de construção diversos"
        />
        <base-arrow-link
          class="lg:mt-[100%] hidden lg:flex"
          to="/sobre"
        >
          Leia mais
        </base-arrow-link>
      </div>
      <div class="w-full lg:w-5/6 flex flex-col gap-8">
        <base-heading
          as="h2"
          size="display"
          class="hidden lg:block ml-8"
        >
          Tudo Para Sua Obra em Um Só Lugar: Do Básico ao Acabamento
        </base-heading>
        <div class="flex flex-col lg:flex-row gap-8">
          <div class="w-full lg:w-1/2">
            <nuxt-img
              class="w-full h-auto rounded-2xl"
              src="/images/home/about/about-1.jpg"
              alt="Construção finalizada mostrando a qualidade e versatilidade dos produtos da Brick Home Center"
            />
          </div>
          <div class="w-full lg:w-1/2 flex flex-col gap-12">
            <div class="flex flex-col gap-3">
              <base-heading
                as="h4"
                size="xl"
              >
                Nossa visão
              </base-heading>
              <base-text size="md">
                Levar aos nossos clientes soluções completas em materiais de construção, garantindo qualidade, preço competitivo e uma experiência de compra prática e confiável.
              </base-text>
            </div>
            <div class="flex flex-col gap-3">
              <base-heading
                as="h4"
                size="xl"
              >
                Nossa missão
              </base-heading>
              <base-text size="md">
                Ajudar pessoas e profissionais da construção a realizarem seus projetos, oferecendo produtos selecionados, atendimento especializado e entrega rápida.
              </base-text>
            </div>
            <div class="flex flex-col sm:flex-row gap-4">
              <base-basic-card
                class="w-full"
                variant="dark"
                title="ESTOQUE"
                subtitle="Produtos Disponíveis"
                icon="fa7-solid:boxes"
                value="999+"
              />
              <base-basic-card
                class="w-full"
                variant="dark"
                title="EXPERIÊNCIA"
                subtitle="Anos no Mercado"
                icon="ic:baseline-people-alt"
                value="10+"
              />
            </div>
            <base-arrow-link
              class="lg:mt-[100%] flex lg:hidden"
              to="/sobre"
            >
              Leia mais
            </base-arrow-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
