<script setup lang="ts">
// <DashboardStat> — a single stat tile. Presentational.
const { label, value, sub } = defineProps<{
  label: string
  value: number | string
  sub?: string
}>()
</script>

<template>
  <UiCard padding="md">
    <p class="font-code text-xs uppercase tracking-wider text-secondary/80">{{ label }}</p>
    <p class="mt-2 font-display text-3xl text-gray-100">{{ value }}</p>
    <p v-if="sub" class="mt-1 font-body text-xs text-gray-500">{{ sub }}</p>
  </UiCard>
</template>
