<script setup lang="ts">
// <BlogPostCard> — presentational card for one post in the /blog list.
// Pure function of its props (the page does the fetching).
interface Post {
  path: string
  title: string
  description?: string
  date?: string | Date
  tags?: string[]
}

const { post } = defineProps<{ post: Post }>()
</script>

<template>
  <UiCard interactive padding="none" class="overflow-hidden">
    <NuxtLink :to="post.path" class="block p-6">
      <p v-if="post.date" class="font-code text-xs text-secondary/80">
        {{ formatDate(post.date) }}
      </p>
      <h2 class="mt-1 font-display text-xl text-gray-100">{{ post.title }}</h2>
      <p v-if="post.description" class="mt-2 text-sm leading-relaxed text-gray-400">
        {{ post.description }}
      </p>
      <div v-if="post.tags?.length" class="mt-3 flex flex-wrap gap-2">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="rounded bg-primary/10 px-2 py-0.5 font-code text-xs text-primary"
        >#{{ tag }}</span>
      </div>
    </NuxtLink>
  </UiCard>
</template>
