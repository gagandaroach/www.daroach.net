<template>
    <div class="p-2 m-3">
        <div class="flex space-x-2 p-2 justify-between">
            <MoleculeButton @click="debugStore.hideDebugButtons">
                -hide-
            </MoleculeButton>
            <MoleculeButton 
                v-for="(b, index) in debug_buttons" 
                :to="b.url" 
                :key="index"
            >
                {{ b.label }}
            </MoleculeButton>
            <MoleculeButton @click="debugStore.reset">
                reset settings
            </MoleculeButton>
            <MoleculeButton @click="cookieStore.deleteCookieConsent" variant="accept">
                Delete Cookie
            </MoleculeButton>
        </div>
    </div>
</template>

<script setup>
import { useDebugStore, useCookieStore } from '~/stores'
const cookieStore = useCookieStore()
const debugStore = useDebugStore()

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