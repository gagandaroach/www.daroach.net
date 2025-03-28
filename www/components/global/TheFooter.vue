<script setup lang="ts">
const githubUrl = 'https://github.com/daroachnet'
</script>

<template>
  <footer class="bg-surface/80 backdrop-blur-sm border-t border-secondary/20 py-8">
    <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <p class="text-sm text-secondary/80 font-display">Website Powered by Daroach.net</p>
      
      <a href="{{ githubUrl }}" target="_blank" rel="noopener noreferrer" class="dnet-button">Source Code</a>
    </div>
  </footer>
</template>
