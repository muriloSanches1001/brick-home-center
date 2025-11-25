<script setup lang="ts">
import BlogItem from '~/components/blog/BlogItem.vue'

const { blog } = useAppConfig()
</script>

<template>
  <div
    class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
  >
    <div
      v-for="post in blog"
      :key="post.id"
      class="w-full"
    >
      <blog-item
        :id="post.id"
        :date="post.date"
        :title="post.title"
        :img-src="post.image_1"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
