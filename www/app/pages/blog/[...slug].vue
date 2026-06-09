<script setup lang="ts">
// /blog/<slug> — render a single post. Fetch in the page; ContentRenderer +
// Shiki (configured in nuxt.config) do the markdown/highlighting.
const route = useRoute()

const { data: post } = await useAsyncData(`blog-${route.path}`, () =>
  queryCollection('blog').path(route.path).first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useSeoMeta({
  title: () => `${post.value?.title} — daroach.net`,
  description: () => post.value?.description,
})
</script>

<template>
  <article v-if="post" class="mx-auto max-w-3xl px-6 py-16">
    <NuxtLink to="/blog" class="font-code text-sm text-secondary/80 transition-colors hover:text-primary">
      ← all posts
    </NuxtLink>

    <header class="mt-6 mb-10 border-b border-secondary/20 pb-8">
      <p v-if="post.date" class="font-code text-sm text-secondary/80">{{ formatDate(post.date) }}</p>
      <h1 class="mt-2 font-display text-4xl tracking-tight">{{ post.title }}</h1>
      <p v-if="post.description" class="mt-3 font-body text-lg text-gray-400">{{ post.description }}</p>
      <div v-if="post.tags?.length" class="mt-4 flex flex-wrap gap-2">
        <UiBadge v-for="tag in post.tags" :key="tag">#{{ tag }}</UiBadge>
      </div>
    </header>

    <div class="prose-dnet">
      <ContentRenderer :value="post" />
    </div>
  </article>
</template>

<style scoped>
/* Tailwind v4 needs @reference to resolve `@apply` + theme tokens inside a
   scoped style block (the block is compiled separately from the main sheet). */
@reference "../../assets/css/main.css";

/* Prose styling for rendered markdown. Scoped + :deep() per §4's allowance for
   "third-party / generated markup" — avoids pulling in @tailwindcss/typography
   (not in the locked stack). Code blocks are colored by Shiki (github-dark). */
.prose-dnet :deep(h2) {
  @apply mt-10 mb-4 font-display text-2xl tracking-tight;
}
.prose-dnet :deep(h3) {
  @apply mt-8 mb-3 font-display text-xl tracking-tight;
}
.prose-dnet :deep(p) {
  @apply my-4 font-body leading-relaxed text-gray-300;
}
.prose-dnet :deep(a) {
  @apply text-primary underline-offset-2 hover:underline;
}
.prose-dnet :deep(ul) {
  @apply my-4 list-disc space-y-1 pl-6 text-gray-300;
}
.prose-dnet :deep(ol) {
  @apply my-4 list-decimal space-y-1 pl-6 text-gray-300;
}
.prose-dnet :deep(blockquote) {
  @apply my-6 border-l-2 border-primary/60 pl-4 italic text-gray-400;
}
.prose-dnet :deep(strong) {
  @apply font-semibold text-gray-100;
}
/* inline code */
.prose-dnet :deep(:not(pre) > code) {
  @apply rounded bg-secondary/20 px-1.5 py-0.5 font-code text-sm text-primary;
}
/* fenced code blocks (Shiki adds its own colors via inline styles) */
.prose-dnet :deep(pre) {
  @apply my-6 overflow-x-auto rounded-md border border-secondary/30 p-4 font-code text-sm;
}
.prose-dnet :deep(img) {
  @apply my-6 rounded-md border border-secondary/20;
}
.prose-dnet :deep(hr) {
  @apply my-10 border-secondary/20;
}
</style>
