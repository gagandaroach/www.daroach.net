<template>
    <CardWelcome />
</template>
  
<script setup>
import { useSettingsStore } from '../stores/settings';

const settings = useSettingsStore();
settings.redirectToWelcome = false;

definePageMeta(
    {
        layout: "fullscreen"
    }
);
</script>
