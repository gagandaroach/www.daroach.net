import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settingsStore', {
    state: () => ({
        bRedirectToWelcome: true,
        _bDebugButtons: true,
    }),
    getters: {

    },
    actions: {
        reset() {
            this.bRedirectToWelcome = true;
            this._bDebugButtons = true;
        },
        hideDebugButtons()
        {
            this._bDebugButtons = false;
        }
    }
})
