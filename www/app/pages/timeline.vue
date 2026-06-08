<script setup lang="ts">
// /timeline — Gagan's milestones (§5.3). Sorted by `order` DESC (newest first;
// `order` disambiguates the two 2013 entries). Fetch here; <Timeline> renders.
const { data: entries } = await useAsyncData('timeline', () =>
  queryCollection('timeline').order('order', 'DESC').all(),
)

useSeoMeta({
  title: 'Timeline — daroach.net',
  description: 'A timeline of Gagan Daroach — education, career, and milestones.',
})
</script>

<template>
  <div class="mx-auto max-w-4xl px-6 py-16">
    <header class="mb-12">
      <h1 class="font-display text-4xl tracking-tight">Timeline</h1>
      <p class="mt-2 font-body text-gray-400">Where I've been — newest first.</p>
    </header>

    <Timeline :entries="entries ?? []" />
  </div>
</template>
