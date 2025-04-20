<template>
    <MoleculeWelcome />
</template>
  
<script setup>
import { useWelcomeStore } from '~/stores'
import { onMounted } from 'vue'

const welcomeStore = useWelcomeStore()

// When the welcome page is mounted, disable the redirect
// This will trigger the middleware to redirect back to the original destination
onMounted(() => {
    welcomeStore.disableRedirect()
})

definePageMeta(
    {
        layout: "fullscreen"
    }
);
</script>
