<script setup lang="ts">
// <Timeline> (timeline/Timeline.vue — adjacent duplicate segment deduped by
// Nuxt). The vertical rail: single column on mobile (rail on the left),
// alternating sides on desktop. Presentational — the page does the query.
interface Entry {
  year: number
  order: number
  title: string
  photo: string
  blurb: string
  tags?: string[]
}

const { entries } = defineProps<{ entries: Entry[] }>()
</script>

<template>
  <ol v-if="entries.length" class="relative">
    <!-- the rail: left on mobile, centered on md+ -->
    <span
      aria-hidden="true"
      class="absolute left-4 top-0 h-full w-px bg-secondary/30 md:left-1/2 md:-translate-x-1/2"
    />

    <li
      v-for="(entry, i) in entries"
      :key="entry.order"
      class="relative mb-12 last:mb-0 md:grid md:grid-cols-2 md:gap-12"
    >
      <!-- node on the rail -->
      <span
        aria-hidden="true"
        class="absolute left-4 top-4 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-surface bg-primary md:left-1/2"
      />
      <!-- card: pushed right of the rail on mobile; alternating columns on md+ -->
      <div
        class="pl-12 md:pl-0"
        :class="i % 2 === 0 ? 'md:col-start-1 md:pr-4' : 'md:col-start-2 md:pl-4'"
      >
        <TimelineEntry :entry="entry" />
      </div>
    </li>
  </ol>

  <UiCard v-else class="text-center text-gray-400">
    No timeline entries yet.
  </UiCard>
</template>
