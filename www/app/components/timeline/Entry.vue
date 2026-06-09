<script setup lang="ts">
// <TimelineEntry> (timeline/Entry.vue — path-prefix gives the name, no stutter).
// One milestone, presentational. Renders a placeholder when the photo is
// missing (photos are still stubs — §5.3) by listening for the <img> error.
//
// A plain <img> (not <NuxtImg>) is intentional: @nuxt/image's IPX would try to
// optimize the file at prerender and fail on the not-yet-added photos. The bare
// tag just emits the URL; the browser 404s at runtime → @error → placeholder.
interface Entry {
  year: number
  order: number
  title: string
  photo: string
  blurb: string
  tags?: string[]
}

const { entry } = defineProps<{ entry: Entry }>()

const imageFailed = ref(false)
const imgEl = ref<HTMLImageElement | null>(null)

// The 404 often fires before Vue hydrates and attaches @error (the image loads
// during initial HTML parse), so the event is missed. Re-check on mount: a
// completed image with zero natural width = a broken/missing source.
onMounted(() => {
  const el = imgEl.value
  if (el && el.complete && el.naturalWidth === 0) {
    imageFailed.value = true
  }
})
</script>

<template>
  <UiCard interactive padding="none" class="overflow-hidden">
    <div class="aspect-video w-full bg-secondary/10">
      <img
        v-if="entry.photo && !imageFailed"
        ref="imgEl"
        :src="entry.photo"
        :alt="entry.title"
        loading="lazy"
        class="h-full w-full object-cover"
        @error="imageFailed = true"
      >
      <div
        v-else
        class="flex h-full w-full flex-col items-center justify-center gap-2 text-secondary/60"
        role="img"
        :aria-label="`${entry.title} — photo coming soon`"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <span class="font-code text-xs">photo coming soon</span>
      </div>
    </div>

    <div class="p-5">
      <p class="font-code text-xs text-primary">{{ entry.year }}</p>
      <h3 class="mt-1 font-display text-lg text-gray-100">{{ entry.title }}</h3>
      <p class="mt-2 text-sm leading-relaxed text-gray-400">{{ entry.blurb }}</p>
      <div v-if="entry.tags?.length" class="mt-3 flex flex-wrap gap-2">
        <UiBadge v-for="tag in entry.tags" :key="tag">#{{ tag }}</UiBadge>
      </div>
    </div>
  </UiCard>
</template>
