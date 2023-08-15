import { useSettingsStore } from "~/stores/settings";

export default defineNuxtRouteMiddleware((to, from) => {

    const settings = useSettingsStore();

    if (to.path === '/' && settings.redirectToWelcome) {
        return navigateTo('/welcome');
    }

    return;

});
