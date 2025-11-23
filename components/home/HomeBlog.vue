<script setup lang="ts">
import BaseHeading from '~/components/ui/typography/BaseHeading.vue'
import BaseArrowLink from '~/components/ui/links/BaseArrowLink.vue'
import BlogItem from '~/components/blog/BlogItem.vue'

const { blog } = useAppConfig()
const latestPosts = computed(() => blog.slice(0, 3))
</script>

<template>
  <div class="flex w-full flex-col gap-12">
    <div class="flex w-full">
      <div class="flex flex-col gap-4 w-1/2">
        <base-heading
          as="h3"
          size="sm"
          class="text-primary"
        >
          <span
            aria-hidden="true"
            class="select-none"
          >------ </span>NOSSO BLOG
        </base-heading>
        <base-heading
          as="h2"
          size="display"
        >
          Últimas Notícias
        </base-heading>
      </div>
      <div class="flex w-1/2 justify-end items-center">
        <base-arrow-link to="/blog">
          Blog
        </base-arrow-link>
      </div>
    </div>
    <ul class="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-6 w-full">
      <li
        v-for="post in latestPosts"
        :key="post.id"
        class="w-full lg:w-[380px]"
      >
        <blog-item
          :id="post.id"
          :date="post.date"
          :title="post.title"
          :img-src="post.image_1"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
