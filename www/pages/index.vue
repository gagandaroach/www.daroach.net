<script setup lang="ts">
import { useSettingsStore } from '~/stores/settings'
const settingsStore = useSettingsStore()
</script>

<template>
  <div class="space-y-12">
    <header class="text-center">
      <h1 class="text-4xl md:text-6xl font-display mb-4">www.daroach.net</h1>
      <p class="text-xl text-secondary/80 max-w-2xl mx-auto">
        A place for people to share stories, knowledge, information, and data.
      </p>
    </header>

    <section class="dnet-grid">
      <CardGaganIntro />
      
      <div class="dnet-card flex flex-col items-center">
        <h2 class="text-3xl font-display mb-4">Blog</h2>
        <NuxtLink to="/blog" class="dnet-button">
          View Blog
        </NuxtLink>
      </div>
      
      <DevOnly>
        <section class="dnet-card mt-8">
          <h2 class="text-xl font-display mb-4">Debug Stats</h2>
          <button class="dnet-button" @click="settingsStore.reset">Reset Settings</button>
        </section>
      </DevOnly>
    </section>
  </div>
</template>
