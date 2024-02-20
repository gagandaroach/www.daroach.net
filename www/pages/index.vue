<template>
  <div class="dnet-page">

    <div class="dnet-blog-container">
      <h1 class="dnet-title">www.daroach.net</h1>
      
    </div>
    

    <div class="dnet-card p-10">
      <h1 class="dnet-h1">Web Traffic</h1>
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
