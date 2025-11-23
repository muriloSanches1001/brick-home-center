<script setup lang="ts">
import BaseHeading from '~/components/ui/typography/BaseHeading.vue'
import BaseArrowLink from '~/components/ui/links/BaseArrowLink.vue'
import BaseText from '~/components/ui/typography/BaseText.vue'

const props = defineProps<{
  id: number
  title: string
  date: string
  imgSrc: string
}>()
</script>

<template>
  <article class="flex flex-col gap-4">
    <router-link
      :to="`/blog/${id}`"
      class="w-full relative aspect-[3/2] rounded-2xl overflow-hidden group"
    >
      <div
        class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-[1]"
      />
      <nuxt-img
        class="w-full h-full object-cover"
        :src="props.imgSrc"
        :alt="props.title"
      />
      <div class="absolute bottom-4 right-4 z-[2]">
        <base-text
          size="sm"
          class="bg-primary px-4 py-2 text-neutral-50 rounded-full"
        >{{ props.date }}</base-text>
      </div>
    </router-link>
    <router-link
      :to="`/blog/${props.id}`"
      class="text-neutral-900 hover:text-primary transition-colors transition-duration-300 ease-out"
    ><base-heading
      as="h3"
      size="lg"
    >{{ props.title }}</base-heading></router-link>
    <base-arrow-link
      variant="secondary"
      size="sm"
      :to="`/blog/${props.id}`"
      class="w-[50%]"
    >
      Ler Mais
    </base-arrow-link>
  </article>
</template>

<style scoped>

</style>
