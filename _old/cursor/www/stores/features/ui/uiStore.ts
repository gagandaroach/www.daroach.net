import { defineStore } from 'pinia'

interface UIState {
  // Controls visibility of cookie consent UI
  showCookieConsent: boolean
}

export const useUIStore = defineStore('ui', {
  state: (): UIState => ({
    showCookieConsent: true
  }),

  actions: {
    toggleCookieConsent() {
      this.showCookieConsent = !this.showCookieConsent
    },

    reset() {
      this.showCookieConsent = true
    }
  }
}) 