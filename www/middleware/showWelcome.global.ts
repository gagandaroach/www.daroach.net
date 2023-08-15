import { useSettingsStore } from "~/stores/settings";

export default defineNuxtRouteMiddleware((to, from) => {

    const settings = useSettingsStore();

    if (to.path === '/' && settings.showWelcome) {
        console.log('redirect to welcome');
        return navigateTo('/welcome');
    }
    
    settings.showWelcome = false;

    return;

});
