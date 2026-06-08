<script setup lang="ts">
import { useCookieStore } from '~/stores'
const cookieStore = useCookieStore()
const githubUrl = 'https://github.com/daroachnet'
</script>
<template>
  <footer class="bg-surface/80 backdrop-blur-sm border-t border-secondary/20 py-8">
    <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <p class="text-sm text-secondary/80 font-display">Website Powered by Daroach.net</p>
      <div class="flex space-x-2">
        <button @click="cookieStore.deleteCookieConsent" class="dnet-button">Reset Cookies</button>
        <a :href="githubUrl" target="_blank" rel="noopener noreferrer" class="dnet-button">Source Code</a>
      </div>
    </div>
  </footer>
</template> 