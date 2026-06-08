import { useWelcomeStore } from "~/stores";

export default defineNuxtRouteMiddleware((to, from) => {
    const welcomeStore = useWelcomeStore();

    // If we're already on the welcome page, don't redirect
    if (to.path === '/welcome') {
        return;
    }

    // If we should show welcome and we're not already on it
    if (welcomeStore.shouldRedirectToWelcome) {
        // Store the original destination
        welcomeStore.setOriginalDestination(to.fullPath);
        // Redirect to welcome
        return navigateTo('/welcome');
    }

    // If we have a stored destination and we're coming from welcome
    if (welcomeStore.originalDestination && from.path === '/welcome') {
        const destination = welcomeStore.originalDestination;
        // Clear the stored destination
        welcomeStore.clearOriginalDestination();
        // Redirect to the original destination
        return navigateTo(destination);
    }
});
