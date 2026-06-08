// useAnalytics — client-side beacon to /api/hit (§5.2). Best-effort and fully
// client-only; never gates on consent (the analytics are cookieless and
// consent-exempt — the notice is transparency, not a gate, §5.7).
//
// The router wiring lives in plugins/analytics.client.ts; this composable just
// owns the `track` primitive so it stays testable and reusable.
export function useAnalytics() {
  const base = useRuntimeConfig().public.apiBase || '/api'

  function track(path: string, referrer?: string): void {
    if (!import.meta.client) return
    const url = `${base}/hit`
    const payload = JSON.stringify({
      path,
      referrer: referrer ?? (document.referrer || undefined),
    })
    try {
      // sendBeacon survives page unload (e.g. clicking away immediately).
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, new Blob([payload], { type: 'application/json' }))
      } else {
        void fetch(url, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {})
      }
    } catch {
      // analytics is best-effort — swallow everything
    }
  }

  return { track }
}
