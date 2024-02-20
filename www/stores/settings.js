import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settingsStore', {
    state: () => ({
        redirectToWelcome: true,
        _bDebugButtons: true,
    }),
    getters: {

    },
    actions: {
        reset() {
            this.redirectToWelcome = true;
            this._bDebugButtons = true;
        },
        hideDebugButtons()
        {
            this._bDebugButtons = false;
        }
    }
})
