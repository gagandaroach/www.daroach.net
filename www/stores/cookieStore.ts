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
        try {
          localStorage.removeItem(CONSENT_COOKIE_KEY)
          localStorage.removeItem(TIMESTAMP_KEY)
        } catch (error) {
          console.warn('Failed to delete cookie consent from localStorage:', error)
        }
      }
    },
    setConsent(status: CookieConsent) {
      this.consentGiven = status
      this.isBannerVisible = false

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(CONSENT_COOKIE_KEY, status)
          localStorage.setItem(TIMESTAMP_KEY, new Date().toISOString())
        } catch (error) {
          console.warn('Failed to save cookie consent to localStorage:', error)
        }
      }
    },
    checkConsent() {
      if (typeof window !== 'undefined') {
        try {
          const storedConsent = localStorage.getItem(CONSENT_COOKIE_KEY)
          const isValidConsent = Object.values(CookieConsent).includes(storedConsent as CookieConsent)

          if (storedConsent && isValidConsent) {
            this.consentGiven = storedConsent as CookieConsent
            this.isBannerVisible = false
          }
        } catch (error) {
          console.warn('Failed to read cookie consent from localStorage:', error)
        }
      }
    }
  },
  getters: {
    hasConsent: (state) => state.consentGiven === CookieConsent.ACCEPTED,
    consentTimestamp(): Date | null {
      if (typeof window === 'undefined') return null
      try {
        const timestamp = localStorage.getItem(TIMESTAMP_KEY)
        return timestamp ? new Date(timestamp) : null
      } catch (error) {
        console.warn('Failed to read cookie timestamp from localStorage:', error)
        return null
      }
    }
  }
})
