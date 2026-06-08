<script setup lang="ts">
// <LayoutNavBar> — sticky top chrome for the default layout (not the hero,
// which uses the bare `fullscreen` layout). Presentational only.
const links = [
  { label: 'Timeline', to: '/timeline' },
  { label: 'Blog', to: '/blog' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'About', to: '/about' },
]
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-secondary/20 bg-surface/80 backdrop-blur-md">
    <nav class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
      <NuxtLink to="/" class="font-display text-xl tracking-tight transition-colors hover:text-primary">
        daroach<span class="text-primary">.net</span>
      </NuxtLink>

      <div class="flex items-center gap-1 sm:gap-2">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-md px-3 py-2 font-display text-sm text-gray-300 transition-colors hover:text-primary"
          active-class="text-primary"
        >
          {{ link.label }}
        </NuxtLink>
        <LayoutThemeToggle class="ml-1" />
      </div>
    </nav>
  </header>
</template>
