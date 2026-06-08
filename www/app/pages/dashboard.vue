<script setup lang="ts">
// /dashboard — live visitor analytics (§5.6). ssr:false via routeRules, so this
// fetches client-side through the single Pinia store (§3). Skips the 3D globe
// (deferred, §0.1).
const store = useDashboardStore()
const { stats, geo, pending, error } = storeToRefs(store)

onMounted(() => store.load())

useSeoMeta({
  title: 'Dashboard — daroach.net',
  description: 'Live, cookieless visitor analytics for daroach.net — served from a homelab.',
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-16">
    <header class="mb-8 flex items-end justify-between gap-4">
      <div>
        <h1 class="font-display text-4xl tracking-tight">Dashboard</h1>
        <p class="mt-2 font-body text-gray-400">Live, cookieless visitor analytics — served from the homelab.</p>
      </div>
      <span v-if="pending" class="font-code text-xs text-secondary/80">loading…</span>
    </header>

    <UiCard v-if="error" class="mb-6 border-error/50 text-error">
      Couldn't load analytics: {{ error }}
    </UiCard>

    <!-- stat tiles -->
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <DashboardStat label="Total visits" :value="stats?.totalHits ?? 0" />
      <DashboardStat label="Last 24h" :value="stats?.last24hHits ?? 0" sub="page views" />
      <DashboardStat label="Visitors · 24h" :value="stats?.uniqueVisitors24h ?? 0" sub="unique (daily-rotated hash)" />
      <DashboardStat label="Countries" :value="stats?.countries ?? 0" />
    </div>

    <!-- map + top pages -->
    <div class="mt-6 grid gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2">
        <DashboardWorldMap :data="geo" />
      </div>
      <UiCard padding="none" class="overflow-hidden">
        <div class="border-b border-secondary/20 px-5 py-3">
          <h2 class="font-display text-lg">Top pages</h2>
        </div>
        <ul class="divide-y divide-secondary/10">
          <li
            v-for="p in stats?.topPaths ?? []"
            :key="p.path"
            class="flex items-center justify-between gap-3 px-5 py-2.5"
          >
            <span class="truncate font-code text-sm text-gray-300">{{ p.path }}</span>
            <span class="font-code text-sm text-primary">{{ p.count }}</span>
          </li>
          <li v-if="!stats?.topPaths?.length" class="px-5 py-4 font-code text-sm text-gray-500">
            No data yet.
          </li>
        </ul>
      </UiCard>
    </div>

    <!-- traffic over time -->
    <div class="mt-6">
      <DashboardTraffic :daily="stats?.daily ?? []" />
    </div>

    <p class="mt-8 text-center font-code text-xs text-gray-600">
      cookieless · country + salted hash, never raw IP ·
      <NuxtLink to="/about#privacy" class="text-primary hover:underline">how it works</NuxtLink>
    </p>
  </div>
</template>
