import { defineStore } from 'pinia'

interface DebugState {
  // Controls visibility of debug buttons
  showDebugButtons: boolean
}

export const useDebugStore = defineStore('debug', {
  state: (): DebugState => ({
    showDebugButtons: true
  }),

  actions: {
    hideDebugButtons() {
      this.showDebugButtons = false
    },

    reset() {
      this.showDebugButtons = true
    }
  }
}) 