import { useSettingsStore } from "~/stores/settings";

export default defineNuxtRouteMiddleware((to, from) => {

    const settings = useSettingsStore();

    if (to.path === '/' && settings.bRedirectToWelcome) {
        return navigateTo('/welcome');
    }

    return;

});
