<script setup lang="ts">
import BasePageHeader from '~/components/ui/navigation/BasePageHeader.vue'
import BaseSection from '~/components/ui/sections/BaseSection.vue'
import BaseHeading from '~/components/ui/typography/BaseHeading.vue'
import BaseText from '~/components/ui/typography/BaseText.vue'
import BaseArrowLink from '~/components/ui/links/BaseArrowLink.vue'
import TheMarquee from '~/components/layout/TheMarquee.vue'
import { useBlogPost } from '~/composables/blog/useBlogPost'

const route = useRoute()
const postId = route.params.id as string

const { post, error } = useBlogPost(postId)

useHead({
  title: computed(() => post.value ? `${post.value.title} · Brick Home Center` : 'Carregando...'),
  meta: [
    { name: 'description', content: computed(() => post.value?.description_1 || '') },
  ],
})

const breadcrumbs = computed(() => {
  const items = [
    { label: 'Início', to: '/' },
    { label: 'Blog', to: '/blog' },
  ]

  if (post.value) {
    items.push({ label: post.value.title, to: '' })
  }

  return items
})
</script>

<template>
  <div>
    <base-page-header
      :title="post?.title || 'Detalhes do Post'"
      :items="breadcrumbs"
    />

    <base-section padding-y="lg">
      <div
        v-if="error || !post"
        class="flex flex-col items-center justify-center gap-4 py-20"
      >
        <base-heading
          as="h2"
          size="xl"
        >
          Post não encontrado
        </base-heading>
        <base-text class="text-center">
          O post que você está procurando não existe ou foi removido.
        </base-text>
        <base-arrow-link
          to="/blog"
          size="lg"
        >
          Voltar para o blog
        </base-arrow-link>
      </div>

      <blog-post-details
        v-else
        :post="post"
      />
    </base-section>

    <the-marquee />
  </div>
</template>
