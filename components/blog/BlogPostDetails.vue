<script setup lang="ts">
import BaseText from '~/components/ui/typography/BaseText.vue'
import BaseHeading from '~/components/ui/typography/BaseHeading.vue'
import BaseArrowLink from '~/components/ui/links/BaseArrowLink.vue'

const props = defineProps<{
  post: {
    id: number
    date: string
    image_1: string
    title: string
    description_1: string
    description_2: string
    image_2: string
    subtitle: string
    description_3: string
  }
}>()

const { blog } = useAppConfig()

const isActive = (id: number) => {
  return props.post.id === id
}
</script>

<template>
  <div class="flex flex-col lg:flex-row w-full gap-8 lg:gap-12">
    <article class="flex flex-col gap-8 w-full lg:w-8/12">
      <div class="relative w-full aspect-[3/2] bg-neutral-200 overflow-hidden rounded-lg">
        <nuxt-img
          :src="`${props.post.image_1}`"
          class="w-full h-full object-cover"
          :alt="`Primeira imagem de ${props.post.title}`"
        />
        <div class="absolute bottom-4 right-4 z-[2]">
          <base-text
            size="md"
            class="bg-primary px-4 py-2 text-neutral-50 rounded-full font-medium shadow-sm"
          >
            {{ props.post.date }}
          </base-text>
        </div>
      </div>

      <base-heading
        as="h1"
        size="display"
      >
        {{ props.post.title }}
      </base-heading>
      <base-text
        size="lg"
        class="text-neutral-700 leading-relaxed"
      >
        {{ props.post.description_1 }}
      </base-text>
      <base-text
        size="lg"
        class="text-neutral-700 leading-relaxed"
      >
        {{ props.post.description_2 }}
      </base-text>

      <div class="w-full aspect-[3/2] bg-neutral-200 overflow-hidden rounded-lg my-4">
        <nuxt-img
          :src="`${props.post.image_2}`"
          class="w-full h-full object-cover"
          :alt="`Segunda imagem de ${props.post.title}`"
        />
      </div>

      <base-heading size="2xl">
        {{ props.post.subtitle }}
      </base-heading>
      <base-text
        size="lg"
        class="text-neutral-700 leading-relaxed"
      >
        {{ props.post.description_3 }}
      </base-text>
    </article>
    <aside class="flex flex-col w-full lg:w-4/12 gap-6">
      <div class="flex flex-col gap-2">
        <base-heading
          as="h3"
          size="lg"
          class="uppercase text-neutral-900 border-b border-neutral-200 pb-2"
        >
          Outras Publicações
        </base-heading>
      </div>

      <nav>
        <ul class="flex flex-col gap-2">
          <li
            v-for="item in blog"
            :key="item.id"
            class="w-full"
          >
            <NuxtLink
              :to="`/blog/${item.id}`"
              :aria-current="isActive(item.id) ? 'page' : undefined"
              class="w-full flex items-center px-4 py-3 border-[1px] rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              :class="[
                isActive(item.id)
                  ? 'bg-primary text-neutral-50 border-primary font-medium shadow-md pointer-events-none'
                  : 'border-neutral-400 hover:bg-neutral-100 text-neutral-900 bg-transparent',
              ]"
            >
              <span class="line-clamp-1">{{ item.title }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="mt-8 bg-neutral-900 p-6 rounded-lg flex flex-col items-center">
        <base-heading
          as="h4"
          size="md"
          class="mb-2 text-neutral-50"
        >
          Tem dúvidas?
        </base-heading>
        <base-text
          size="sm"
          class="mb-4 text-neutral-50"
        >
          Fale com nossos especialistas.
        </base-text>
        <base-arrow-link
          to="/contato"
          class="justify-center"
        >
          Contato
        </base-arrow-link>
      </div>
    </aside>
  </div>
</template>
