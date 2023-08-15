<template>
  <div class="flex flex-col">
    <div class="">
      <h1 class="text-4xl">www.daroach.net</h1>
      <p class="text-base">WIP v2 site</p>
    </div>
    <CardGaganIntro />
    <div>
      show welcome: {{ settings.showWelcome }}
    </div>
  </div>
</template>

<script setup>
import { useSettingsStore } from "~/stores/settings";
const settings = useSettingsStore();
</script>
