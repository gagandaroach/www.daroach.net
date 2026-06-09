<script setup lang="ts">
// <DashboardPanel> — a titled card used by the dashboard widgets. DRYs the
// repeated "UiCard + bordered header bar" chrome (was duplicated across the map,
// traffic, and top-pages widgets). Composes the UiCard primitive; body via slot.
const { title } = defineProps<{ title: string }>()
</script>

<template>
  <UiCard padding="none" class="overflow-hidden">
    <div class="border-b border-secondary/20 px-5 py-3">
      <h2 class="font-display text-lg">{{ title }}</h2>
    </div>
    <slot />
  </UiCard>
</template>
