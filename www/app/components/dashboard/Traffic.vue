<script setup lang="ts">
// <DashboardTraffic> — the "Web Traffic" time-series the old dev home mocked up
// (§5.6), now real: hits + unique visitors per UTC day over the last 30 days.
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import type { DailyPoint } from '~~/shared/types/analytics'

use([LineChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const { daily } = defineProps<{ daily: DailyPoint[] }>()

// Same guard as the map: init echarts only after the container is laid out.
const ready = ref(false)
onMounted(() => nextTick(() => { ready.value = true }))

const option = computed(() => ({
  backgroundColor: 'transparent',
  grid: { left: 44, right: 16, top: 32, bottom: 28 },
  legend: {
    top: 0,
    right: 0,
    textStyle: { color: '#9ca3af', fontFamily: 'Fira Code, monospace', fontSize: 11 },
    data: ['Hits', 'Visitors'],
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#171717',
    borderColor: '#4b5563',
    textStyle: { color: '#e5e7eb', fontFamily: 'Fira Code, monospace' },
  },
  xAxis: {
    type: 'category',
    data: daily.map((d) => d.date),
    axisLine: { lineStyle: { color: '#404040' } },
    axisLabel: { color: '#9ca3af', fontFamily: 'Fira Code, monospace', fontSize: 10 },
  },
  yAxis: {
    type: 'value',
    minInterval: 1,
    splitLine: { lineStyle: { color: '#262626' } },
    axisLabel: { color: '#9ca3af', fontFamily: 'Fira Code, monospace', fontSize: 10 },
  },
  series: [
    {
      name: 'Hits',
      type: 'line',
      smooth: true,
      showSymbol: false,
      data: daily.map((d) => d.hits),
      lineStyle: { color: '#ef4444' },
      itemStyle: { color: '#ef4444' },
      areaStyle: { color: 'rgba(153,27,27,0.22)' },
    },
    {
      name: 'Visitors',
      type: 'line',
      smooth: true,
      showSymbol: false,
      data: daily.map((d) => d.visitors),
      lineStyle: { color: '#9ca3af' },
      itemStyle: { color: '#9ca3af' },
    },
  ],
}))
</script>

<template>
  <UiCard padding="none" class="overflow-hidden">
    <div class="border-b border-secondary/20 px-5 py-3">
      <h2 class="font-display text-lg">Traffic — last 30 days</h2>
    </div>
    <div style="height: 260px" class="w-full">
      <ClientOnly>
        <VChart v-if="ready && daily.length" :option="option" autoresize style="height: 100%; width: 100%" />
        <div v-else class="flex h-full items-center justify-center font-code text-sm text-gray-500">
          {{ daily.length ? 'loading…' : 'no traffic data yet' }}
        </div>
        <template #fallback>
          <div class="flex h-full items-center justify-center font-code text-sm text-gray-500">
            loading…
          </div>
        </template>
      </ClientOnly>
    </div>
  </UiCard>
</template>
