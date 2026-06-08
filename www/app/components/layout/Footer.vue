<script setup lang="ts">
// <LayoutFooter> — includes the consent-reset control carried forward from the
// old `dev` footer (§5.7). The reset clears the transparency-notice dismissal
// so the Phase 2 notice reappears.
const { reset } = useConsent()
const githubUrl = 'https://github.com/gagandaroach/www.daroach.net'
</script>

<template>
  <footer class="border-t border-secondary/20 bg-surface/80 py-8 backdrop-blur-md">
    <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
      <p class="font-display text-sm text-secondary/80">
        Website powered by daroach.net — running in a homelab.
      </p>
      <div class="flex items-center gap-2">
        <UiButton :to="githubUrl" target="_blank" rel="noopener noreferrer" variant="ghost" size="sm">
          Source
        </UiButton>
        <UiButton variant="outline" size="sm" @click="reset">
          Reset cookie consent
        </UiButton>
      </div>
    </div>
  </footer>
</template>
