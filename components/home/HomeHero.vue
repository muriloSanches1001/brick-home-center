<script setup lang="ts">
import BaseHeading from '~/components/ui/typography/BaseHeading.vue'
import BaseText from '~/components/ui/typography/BaseText.vue'
import BaseArrowLink from '~/components/ui/links/BaseArrowLink.vue'

const { social } = useAppConfig()
</script>

<template>
  <section
    class="relative w-full h-screen max-h-[1080px] bg-[url('/images/home/hero/bg.jpg')] bg-cover bg-center bg-no-repeat flex justify-center"
  >
    <div
      class="w-full max-7xl md:max-w-5xl px-4 md:px-8 flex flex-col items-center justify-center h-full gap-4 mt-[50px]"
    >
      <base-heading
        as="h3"
        size="md"
        class="text-neutral-50 bg-primary px-5 py-3 rounded-full inline-flex"
      >
        projetos em realidades
      </base-heading>
      <base-heading
        as="h1"
        size="2display"
        class="text-neutral-50 text-center"
      >
        Seu <span class="outlined-text">Parceiro de Confiança</span>
        em Construção
      </base-heading>
      <base-text
        size="lg"
        class="text-neutral-50 text-center"
      >
        Da fundação ao acabamento, nossa equipe combina
        experiência, tecnologia e compromisso para construir resultados sólidos
      </base-text>
      <base-arrow-link to="/shop">
        Começar Projeto
      </base-arrow-link>
    </div>
    <ul class="absolute bottom-0 left-0 flex px-10 py-5 rounded-r-full bg-neutral-50 bg-opacity-10 backdrop-blur-lg gap-2">
      <li
        v-for="(s, i) in social"
        :key="s.link"
        class="text-neutral-50"
      >
        <a
          :href="s.link"
          target="_blank"
          class="focus:transition-all focus:duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 text-neutral-50 hover:text-neutral-300 font-normal transition-colors duration-300 ease-in-out"
        >
          {{ s.name }}
        </a>
        <span
          v-if="i + 1 != social.length"
          aria-hidden="true"
          class="select-none"
        > • </span>
      </li>
    </ul>
  </section>
  <div class="relative overflow-hidden w-full">
    <div class="pattern-scroll flex">
      <nuxt-img
        class="w-full flex-shrink-0"
        src="/images/home/hero/pattern-1.png"
        alt="Padrão decorativo"
        aria-hidden="true"
      />
      <nuxt-img
        class="w-full flex-shrink-0"
        src="/images/home/hero/pattern-1.png"
        alt="Padrão decorativo"
        aria-hidden="true"
      />
    </div>
  </div>
</template>

<style scoped>
.outlined-text {
  color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: var(--neutral-50);
}

@keyframes scroll {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(0);
  }
}

.pattern-scroll {
  animation: scroll 20s linear infinite;
}
</style>
