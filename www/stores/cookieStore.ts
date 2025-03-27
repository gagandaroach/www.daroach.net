// stores/cookieStore.ts
import { defineStore } from 'pinia'

enum CookieConsent {
  ACCEPTED = 'accepted',
  DECLINED = 'declined'
}

const CONSENT_COOKIE_KEY = 'cookieConsent'
const TIMESTAMP_KEY = 'cookieConsentTimestamp'

export const useCookieStore = defineStore('cookie', {
  state: () => ({
    consentGiven: null as CookieConsent | null,
    isBannerVisible: true
  }),
  actions: {
    accept() {
      this.setConsent(CookieConsent.ACCEPTED)
    },
    decline() {
      this.setConsent(CookieConsent.DECLINED)
    },
    deleteCookieConsent() {
      this.consentGiven = null
      this.isBannerVisible = true
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem(CONSENT_COOKIE_KEY)
        localStorage.removeItem(TIMESTAMP_KEY)
      }
    },
    setConsent(status: CookieConsent) {
      this.consentGiven = status
      this.isBannerVisible = false
      
      if (typeof window !== 'undefined') {
        localStorage.setItem(CONSENT_COOKIE_KEY, status)
        localStorage.setItem(TIMESTAMP_KEY, new Date().toISOString())
      }
    },
    checkConsent() {
      if (typeof window !== 'undefined') {
        const storedConsent = localStorage.getItem(CONSENT_COOKIE_KEY)
        const isValidConsent = Object.values(CookieConsent).includes(storedConsent as CookieConsent)

        if (storedConsent && isValidConsent) {
          this.consentGiven = storedConsent as CookieConsent
          this.isBannerVisible = false
        }
      }
    }
  },
  getters: {
    hasConsent: (state) => state.consentGiven === CookieConsent.ACCEPTED,
    consentTimestamp(): Date | null {
      if (typeof window === 'undefined') return null
      const timestamp = localStorage.getItem(TIMESTAMP_KEY)
      return timestamp ? new Date(timestamp) : null
    }
  }
})
