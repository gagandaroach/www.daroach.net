import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settingsStore', {
    state: () => ({
        showWelcome: true,
    }),
    getters: {

    },
    actions: {
        reset() {
            this.showWelcome = true;
        },
    }
})
