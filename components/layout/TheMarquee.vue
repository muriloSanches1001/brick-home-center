<script setup lang="ts">
import BaseMarquee from '~/components/ui/decorations/BaseMarquee.vue'

const firstMarqueeItems = ref<string[]>(
  [
    'Materiais de construção',
    'Tintas e acabamentos',
    'Hidráulica e metais',
    'Ferramentas profissionais',
    'Pisos e revestimentos',
  ],
)

const secondMarqueeItems = ref<string[]>(
  [
    'ENTREGA PROGRAMADA',
    'ATENDIMENTO NA OBRA',
    'ORÇAMENTOS PERSONALIZADOS',
    'QUALIDADE GARANTIDA',
    'SOLUÇÕES PARA REFORMAS',
  ],
)
</script>

<template>
  <div class="flex flex-col w-full">
    <base-marquee
      direction="left"
      duration="40s"
      class="bg-neutral-50 py-2 sm:py-4"
    >
      <div class="flex items-center gap-4 sm:gap-8 text-lg sm:text-4xl font-bold uppercase tracking-wider text-neutral-900">
        <template
          v-for="(item, index) in firstMarqueeItems"
          :key="index"
        >
          <span>{{ item }}</span>
          <Icon
            name="material-symbols:star"
            class="text-primary h-5 w-5 sm:h-6 sm:w-6"
          />
        </template>
      </div>
    </base-marquee>

    <base-marquee
      direction="right"
      duration="40s"
      class="bg-primary py-2 sm:py-4"
    >
      <div class="flex items-center gap-4 sm:gap-8 text-lg sm:text-4xl font-bold uppercase tracking-wider text-neutral-50">
        <template
          v-for="(item, index) in secondMarqueeItems"
          :key="index"
        >
          <span>{{ item }}</span>
          <Icon
            name="material-symbols:star"
            class="text-neutral-50 h-5 w-5 sm:h-6 sm:w-6"
          />
        </template>
      </div>
    </base-marquee>
  </div>
</template>
