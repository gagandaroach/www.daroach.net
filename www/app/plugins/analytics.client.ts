// Wires the visitor beacon (useAnalytics) to the router: one hit on first mount,
// then one per client-side navigation. Client-only (`.client` suffix), so it
// never runs during SSR/prerender.
export default defineNuxtPlugin((nuxtApp) => {
  const { track } = useAnalytics()
  const router = useRouter()

  // Initial page load (after hydration).
  nuxtApp.hook('app:mounted', () => {
    track(router.currentRoute.value.fullPath)
  })

  // Subsequent SPA navigations — pass the previous path as the referrer.
  router.afterEach((to, from) => {
    if (to.fullPath !== from.fullPath) {
      track(to.fullPath, from.fullPath)
    }
  })
})
