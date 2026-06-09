// useConsent — cookieless transparency-notice state (§5.7).
//
// daroach.net's analytics are first-party + cookieless (country + salted-HMAC,
// no raw IP), so under ePrivacy this is consent-EXEMPT — there's no blocking
// banner. This composable only records whether the user has dismissed the
// transparency notice, and exposes a reset used by the footer.
//
// State lives in localStorage via @vueuse's useLocalStorage (no Pinia — Pinia
// is reserved for the dashboard per §0/§3). NB: @vueuse/nuxt auto-imports
// useLocalStorage/useSessionStorage but NOT the bare useStorage.
//
// Only "acknowledged" exists: the analytics are consent-exempt and fire
// regardless, so a "decline" choice would carry no behavioural meaning — the
// notice is purely informational. The footer's reset re-shows it.
export type ConsentChoice = 'acknowledged'

const STORAGE_KEY = 'dnet-consent'

export function useConsent() {
  // null = the notice has not been dismissed yet.
  const consent = useLocalStorage<ConsentChoice | null>(STORAGE_KEY, null)

  const decided = computed(() => consent.value !== null)

  function acknowledge() {
    consent.value = 'acknowledged'
  }

  function reset() {
    consent.value = null
  }

  return { consent, decided, acknowledge, reset }
}
