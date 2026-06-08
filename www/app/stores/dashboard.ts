// The single Pinia store in the app — the dashboard's data layer (§3/§5.4a:
// Pinia is reserved for genuinely global/dashboard state, everything else uses
// composables). The /dashboard route is ssr:false, so this fetches client-side.
import { defineStore } from 'pinia'
import type { Stats, CountryCount } from '~~/shared/types/analytics'

export const useDashboardStore = defineStore('dashboard', () => {
  const stats = ref<Stats | null>(null)
  const geo = ref<CountryCount[]>([])
  const pending = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    pending.value = true
    error.value = null
    try {
      const [s, g] = await Promise.all([
        $fetch<Stats>('/api/stats'),
        $fetch<CountryCount[]>('/api/geo'),
      ])
      stats.value = s
      geo.value = g
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load analytics'
    } finally {
      pending.value = false
    }
  }

  return { stats, geo, pending, error, load }
})
