<script setup lang="ts">
// <DashboardWorldMap> — flat ECharts choropleth keyed by ISO-2 (§5.6; 3D globe
// deferred per §0.1). Lives on the ssr:false /dashboard route and is wrapped in
// <ClientOnly>, so all the echarts/map work runs client-side only.
//
// Matching: CF gives us ISO-2 (e.g. "US"); the world-atlas TopoJSON keys
// features by ISO-3166 *numeric* (feature.id, e.g. 840). We convert ISO-2 →
// numeric via i18n-iso-countries and match on a normalized numeric string.
import { use, registerMap } from 'echarts/core'
import { MapChart } from 'echarts/charts'
import { TooltipComponent, VisualMapComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import { feature } from 'topojson-client'
import worldTopo from 'world-atlas/countries-110m.json'
import isoCountries from 'i18n-iso-countries'
import type { CountryCount } from '~~/shared/types/analytics'

use([MapChart, TooltipComponent, VisualMapComponent, CanvasRenderer])

const { data } = defineProps<{ data: CountryCount[] }>()

// Gate the chart until after mount + a tick so echarts initializes against a
// laid-out, non-zero container. Initializing at 0×0 yields a singular transform
// matrix → matrixInvert returns null → echarts crashes in resizeGeo.
const ready = ref(false)
onMounted(() => nextTick(() => { ready.value = true }))

// Register the 'world' map once; build a numeric→display-name lookup for tooltips.
const numericToName = new Map<string, string>()
let registered = false
function ensureMap() {
  if (registered) return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const topo = worldTopo as any
  const geo = feature(topo, topo.objects.countries) as unknown as {
    features: { id: number | string; properties: Record<string, unknown> }[]
  }
  for (const f of geo.features) {
    const key = String(Number(f.id)) // normalize ("004" / 4 → "4")
    f.properties.numeric = key
    numericToName.set(key, String(f.properties.name ?? ''))
  }
  registerMap('world', geo as never)
  registered = true
}
ensureMap()

const seriesData = computed(() =>
  data
    .map((d) => {
      const num = isoCountries.alpha2ToNumeric(d.country)
      if (!num) return null
      const key = String(Number(num))
      return {
        name: key,
        value: d.count,
        // NB: avoid the reserved per-item keys `label`/`name` for our display
        // string — `label` expects a style object and passing a string crashes
        // echarts. Stash the country name under a custom key.
        cname: numericToName.get(key) ?? d.country,
        iso: d.country,
      }
    })
    .filter((d): d is NonNullable<typeof d> => d !== null),
)

const maxValue = computed(() => Math.max(1, ...seriesData.value.map((d) => d.value)))

const option = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'item',
    backgroundColor: '#171717',
    borderColor: '#4b5563',
    textStyle: { color: '#e5e7eb', fontFamily: 'Fira Code, monospace' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: (p: any) => {
      const d = p.data
      if (!d) return `${p.name}<br/>no visits`
      return `${d.cname} (${d.iso})<br/><b>${d.value}</b> visit${d.value === 1 ? '' : 's'}`
    },
  },
  visualMap: {
    min: 0,
    max: maxValue.value,
    left: 'left',
    bottom: 16,
    calculable: true,
    inRange: { color: ['#3f1212', '#991b1b', '#ef4444'] },
    textStyle: { color: '#9ca3af', fontFamily: 'Fira Code, monospace' },
  },
  series: [
    {
      type: 'map',
      map: 'world',
      nameProperty: 'numeric',
      // Explicit view rect — without it echarts computes the geo box from the
      // container and can hit a null transform during layout (resizeGeo crash).
      layoutCenter: ['50%', '54%'],
      layoutSize: '100%',
      roam: true,
      scaleLimit: { min: 1, max: 6 },
      data: seriesData.value,
      itemStyle: { areaColor: '#262626', borderColor: '#404040', borderWidth: 0.5 },
      emphasis: { label: { show: false }, itemStyle: { areaColor: '#7f1d1d' } },
      select: { label: { show: false }, itemStyle: { areaColor: '#991b1b' } },
    },
  ],
}))
</script>

<template>
  <UiCard padding="none" class="overflow-hidden">
    <div class="border-b border-secondary/20 px-5 py-3">
      <h2 class="font-display text-lg">Where visitors are</h2>
    </div>
    <div style="height: 440px" class="w-full">
      <ClientOnly>
        <VChart v-if="ready" :option="option" autoresize style="height: 100%; width: 100%" />
        <div v-else class="flex h-full items-center justify-center font-code text-sm text-gray-500">
          loading map…
        </div>
        <template #fallback>
          <div class="flex h-full items-center justify-center font-code text-sm text-gray-500">
            loading map…
          </div>
        </template>
      </ClientOnly>
    </div>
  </UiCard>
</template>
