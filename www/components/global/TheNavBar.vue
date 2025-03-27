<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface NavButton {
  label: string
  url: string
}

const router = useRouter()
const navButtons = ref<NavButton[]>([
  { label: 'home', url: '/' },
  { label: 'blog', url: '/blog' },
  { label: 'about', url: '/about' }
])
</script>

<template>
  <nav class="dnet-navbar">
    <div class="dnet-navbar-data">
      <div class="flex flex-col">
        <NuxtLink to="/" class="dnet-navbar-text-main">daroach.net</NuxtLink>
        <div class="flex flex-row text-sm text-stone-500 space-x-2">
          {{ router.currentRoute.value.path }}
        </div>
      </div>
      <div class="dnet-nav-buttons">
        <NuxtLink 
          v-for="(button, index) in navButtons" 
          :key="index" 
          :to="button.url" 
          class="dnet-button-nav"
        >
          {{ button.label }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.dnet-navbar {
  @apply top-0 m-4;
}

.dnet-navbar-data {
  @apply max-w-screen-xl m-auto flex flex-row justify-between text-white bg-black rounded-md border-4 border-red-900 p-4 select-none font-mono;
  font-family: 'Ubuntu Mono', monospace;
}

.dnet-navbar-text-main {
  @apply text-xl hover:text-red-800;
}

.dnet-nav-buttons {
  @apply flex space-x-1;
}

.dnet-button-nav {
  @apply text-lg align-top text-white uppercase hover:text-red-800 p-1;
}
</style>
