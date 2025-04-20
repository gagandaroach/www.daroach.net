import { defineStore } from 'pinia'

interface WelcomeState {
  // Controls whether to redirect to welcome page
  shouldRedirectToWelcome: boolean
  // Stores the original destination URL
  originalDestination: string | null
}

export const useWelcomeStore = defineStore('welcome', {
  state: (): WelcomeState => ({
    shouldRedirectToWelcome: true, // Changed to true to always redirect
    originalDestination: null
  }),

  actions: {
    setOriginalDestination(url: string) {
      this.originalDestination = url
    },

    clearOriginalDestination() {
      this.originalDestination = null
    },

    disableRedirect() {
      this.shouldRedirectToWelcome = false
    },

    reset() {
      this.shouldRedirectToWelcome = true
    }
  }
}) 