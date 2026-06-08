<script setup lang="ts">
const navButtons = [
  { label: 'Home', url: '/' },
  { label: 'Blog', url: '/blog' },
];
</script>

<template>
  <nav class="bg-surface/80 backdrop-blur-sm border-b border-secondary/20 py-4">
    <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <NuxtLink to="/" class="text-xl font-display text-primary hover:text-primary/80">daroach.net</NuxtLink>
      
      <div class="flex space-x-4">
        <NuxtLink v-for="button in navButtons" :key="button.url" :to="button.url" class="dnet-button">{{ button.label }}</NuxtLink>
      </div>
    </div>
  </nav>
</template>
