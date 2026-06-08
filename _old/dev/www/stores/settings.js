import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settingsStore', {
    state: () => ({
        // Disabled landing page redirect on March 27 2025. Set to true to enable redirect.
        bRedirectToWelcome: false,

        // Homepage Card
        bCookieConsent: true,

        // Display special debug bar
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
        },
        toggleWelcomeCard()
        {
            this.bCookieConsent = !this.bCookieConsent;
        }
    }
})
