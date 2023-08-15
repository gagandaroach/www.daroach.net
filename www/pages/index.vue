<template>
  <div class="flex flex-col space-y-8">

    <CardGaganIntro />

    <h1 class="dnet-section-header">Web Traffic</h1>
    <div class="dnet-card p-10">
      x
    </div>
    
    <DevOnly>
      <h1 class="dnet-section-header">Debug Stats</h1>
      redirectToWelcome: {{ settings.redirectToWelcome }}
    </DevOnly>

  </div>
</template>

<script setup>
import { useSettingsStore } from "~/stores/settings";
const settings = useSettingsStore();
</script>

