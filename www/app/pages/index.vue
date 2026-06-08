<script setup lang="ts">
// `/` IS the hero homepage — no welcome gate/redirect (§5.1, confirmed 0.1).
// Uses the bare `fullscreen` layout; nav CTAs go straight into the sections.
definePageMeta({ layout: 'fullscreen' })

useSeoMeta({
  title: 'Gagan Daroach — daroach.net',
  description:
    'Gagan Daroach — CPU/GPU engineer, founder, homelab tinkerer. Timeline, writing, and live visitor analytics from a server running at home.',
})
</script>

<template>
  <section class="dnet-hero relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center">
    <!-- theme toggle, corner-pinned (no navbar on the hero) -->
    <div class="absolute right-4 top-4 z-20">
      <LayoutThemeToggle />
    </div>

    <div class="relative z-10 flex max-w-3xl flex-col items-center gap-6">
      <p class="font-code text-xs uppercase tracking-[0.35em] text-primary/80 sm:text-sm">
        gagan daroach
      </p>

      <h1 class="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
        GAGAN <span class="text-primary">DAROACH</span>
      </h1>

      <p class="max-w-prose font-body text-lg text-gray-400 sm:text-xl">
        cpu / gpu engineer · founder · homelab tinkerer
      </p>

      <nav class="mt-4 flex flex-wrap items-center justify-center gap-3">
        <UiButton to="/timeline" variant="solid" size="lg">Timeline</UiButton>
        <UiButton to="/blog" variant="outline" size="lg">Blog</UiButton>
        <UiButton to="/dashboard" variant="outline" size="lg">Dashboard</UiButton>
        <UiButton to="/about" variant="ghost" size="lg">About</UiButton>
      </nav>
    </div>

    <p class="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-code text-xs text-gray-600">
      served from a server in my home
    </p>
  </section>
</template>

<style scoped>
/* Animated drifting grid behind the hero — the spiritual successor to the old
   `shiftTiles` background. Masked to a soft vignette so it reads as texture,
   not chrome. Honors prefers-reduced-motion. */
.dnet-hero::before {
  content: '';
  position: absolute;
  inset: -25%;
  background-image:
    linear-gradient(to right, color-mix(in oklab, var(--color-secondary) 14%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklab, var(--color-secondary) 14%, transparent) 1px, transparent 1px);
  background-size: 48px 48px;
  animation: gridDrift 24s linear infinite;
  -webkit-mask-image: radial-gradient(circle at center, black, transparent 70%);
  mask-image: radial-gradient(circle at center, black, transparent 70%);
  pointer-events: none;
}

/* a faint red glow centered behind the wordmark */
.dnet-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    40rem 40rem at 50% 45%,
    color-mix(in oklab, var(--color-primary) 16%, transparent),
    transparent 70%
  );
  pointer-events: none;
}

@keyframes gridDrift {
  from { background-position: 0 0; }
  to { background-position: 48px 48px; } /* one tile → seamless loop */
}

@media (prefers-reduced-motion: reduce) {
  .dnet-hero::before { animation: none; }
}
</style>
