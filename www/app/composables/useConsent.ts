// useConsent — cookieless transparency-notice state (§5.7).
//
// daroach.net's analytics are first-party + cookieless (country + salted-HMAC,
// no raw IP), so under ePrivacy this is consent-EXEMPT — there's no blocking
// banner. This composable only records whether the user has dismissed the
// transparency notice, and exposes a reset used by the footer.
//
// State lives in localStorage via @vueuse's useStorage (no Pinia — Pinia is
// reserved for the dashboard per §0/§3). The notice UI itself lands in Phase 2;
// Phase 1 only needs `reset()` for the footer control.
export type ConsentChoice = 'acknowledged' | 'declined'

const STORAGE_KEY = 'dnet-consent'

export function useConsent() {
  // null = the notice has not been dismissed yet.
  const consent = useStorage<ConsentChoice | null>(STORAGE_KEY, null)

  const decided = computed(() => consent.value !== null)

  function acknowledge() {
    consent.value = 'acknowledged'
  }

  function decline() {
    consent.value = 'declined'
  }

  function reset() {
    consent.value = null
  }

  return { consent, decided, acknowledge, decline, reset }
}
