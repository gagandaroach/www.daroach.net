<template>
  <div class="flex flex-col space-y-8">
    
    <h1 class="dnet-title">www.daroach.net</h1>

    <h1 class="dnet-h1">Web Traffic</h1>
    
    <div class="dnet-card p-10">
      x
    </div>
    
    <DevOnly>
      <h1 class="dnet-h1">Debug Stats</h1>
      <p class="dnet-p">
        settings: {{  }}
        redirectToWelcome: {{ settings.redirectToWelcome }}
      </p>
      </DevOnly>

  </div>
</template>

<script setup>
import { useSettingsStore } from "~/stores/settings";
const settings = useSettingsStore();
</script>

