<script setup lang="ts">
// PHASE 0 PLACEHOLDER — Phase 1 replaces this with the real fullscreen hero
// (animated background, nav CTAs into Timeline / Blog / Dashboard). For now it
// just verifies the Nuxt 4 + Tailwind v4 + dnet-token pipeline renders.
useHead({ title: 'daroach.net' })
</script>

<template>
  <section class="min-h-dvh flex flex-col items-center justify-center gap-4 px-6 text-center">
    <h1 class="font-display text-5xl sm:text-7xl tracking-tight">
      GAGAN <span class="text-primary">DAROACH</span>
    </h1>
    <p class="font-body text-gray-400 max-w-prose">
      distinguished cpu / gpu engineer · rebuilding daroach.net
    </p>
    <code class="font-code text-sm text-gray-500">Nuxt 4 · Vue 3.5 · Tailwind v4 — Phase 0 scaffold</code>
  </section>
</template>
