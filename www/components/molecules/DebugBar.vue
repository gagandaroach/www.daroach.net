<template>
    <div class="p-2 m-3">
        <div class="flex space-x-2 p-2 justify-between">
            <MoleculeButton @click="settings.hideDebugButtons">
                -hide-
            </MoleculeButton>
            <MoleculeButton 
                v-for="(b, index) in debug_buttons" 
                :to="b.url" 
                :key="index"
            >
                {{ b.label }}
            </MoleculeButton>
            <MoleculeButton @click="settings.reset">
                reset settings
            </MoleculeButton>
            <MoleculeButton @click="cookieStore.deleteCookieConsent" variant="accept">
                Delete Cookie
            </MoleculeButton>
        </div>
    </div>
</template>

<script setup>
import { useSettingsStore } from '../../stores/settings';
import { useCookieStore } from '~/stores/cookieStore'
const cookieStore = useCookieStore()
const settings = useSettingsStore();

const debug_buttons = [
    {
        label: "/",
        url: "/"
    },
    {
        label: "welcome",
        url: "/welcome"
    },
    {
        label: "blog/index",
        url: "/blog"
    },
    {
        label: "blog/about",
        url: "/blog/about"
    },
]
</script> 