<template>
    <CardWelcome />
</template>
  
<script setup>
import { useSettingsStore } from '../stores/settings';

const settings = useSettingsStore();
settings.bRedirectToWelcome = false;

definePageMeta(
    {
        layout: "fullscreen"
    }
);
</script>
