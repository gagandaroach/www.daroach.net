<script setup lang="ts">
// <DashboardTopPaths> — the most-visited pages list. Pulled out of the page so
// it's a self-contained widget like WorldMap/Traffic (consistency). Presentational.
import type { PathCount } from '~~/shared/types/analytics'

const { paths } = defineProps<{ paths: PathCount[] }>()
</script>

<template>
  <DashboardPanel title="Top pages">
    <ul class="divide-y divide-secondary/10">
      <li
        v-for="p in paths"
        :key="p.path"
        class="flex items-center justify-between gap-3 px-5 py-2.5"
      >
        <span class="truncate font-code text-sm text-gray-300">{{ p.path }}</span>
        <span class="font-code text-sm text-primary">{{ p.count }}</span>
      </li>
      <li v-if="!paths.length" class="px-5 py-4 font-code text-sm text-gray-500">
        No data yet.
      </li>
    </ul>
  </DashboardPanel>
</template>
