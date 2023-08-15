import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settingsStore', {
    state: () => ({
        redirectToWelcome: true,
    }),
    getters: {

    },
    actions: {
        reset() {
            this.redirectToWelcome = true;
        },
    }
})
