<script setup lang="ts">
// <LayoutThemeToggle> — light/dark switch (§5.5). The icon is wrapped in
// <ClientOnly> because the *resolved* color mode isn't known during SSR (it's
// read from client storage), so rendering the icon server-side would risk a
// hydration mismatch / flash. The button chrome renders on the server; only the
// glyph hydrates client-side.
const { isDark, toggle } = useTheme()
</script>

<template>
  <button
    type="button"
    class="inline-flex h-10 w-10 items-center justify-center rounded-md border border-secondary/30 text-gray-300 transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
  >
    <ClientOnly>
      <!-- dark active → show a sun (click goes to light) -->
      <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      <!-- light active → show a moon -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <template #fallback>
        <span class="h-5 w-5" />
      </template>
    </ClientOnly>
  </button>
</template>
