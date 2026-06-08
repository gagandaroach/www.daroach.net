<script setup lang="ts">
// /blog — post list. Data fetching lives in the page (the "smart" layer, §5.4a);
// BlogPostCard is presentational.
const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blog').order('date', 'DESC').all(),
)

// Hide drafts (handles missing `draft` field correctly, unlike a SQL filter).
const published = computed(() => (posts.value ?? []).filter(p => !p.draft))

useSeoMeta({
  title: 'Blog — daroach.net',
  description: 'Writing from Gagan Daroach on CPUs, GPUs, homelab, and building things.',
})
</script>

<template>
  <div class="mx-auto max-w-3xl px-6 py-16">
    <header class="mb-10">
      <h1 class="font-display text-4xl tracking-tight">Blog</h1>
      <p class="mt-2 font-body text-gray-400">Notes on hardware, homelab, and building things.</p>
    </header>

    <div v-if="published.length" class="flex flex-col gap-4">
      <BlogPostCard v-for="post in published" :key="post.path" :post="post" />
    </div>
    <UiCard v-else class="text-center text-gray-400">
      No posts yet — check back soon.
    </UiCard>
  </div>
</template>
