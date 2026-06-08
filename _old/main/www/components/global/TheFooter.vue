<script setup lang="ts">
import { ref } from 'vue'

const githubUrl = ref('https://github.com/daroachnet') // Replace with your actual GitHub URL
</script>

<template>
  <footer class="dnet-footer">
    <div class="dnet-footer-content">
      <p class="dnet-footer-text">Website Powered by Daroach.net</p>
      <NuxtLink :to="githubUrl" class="dnet-footer-button">
        Source Code
      </NuxtLink>
    </div>
  </footer>
</template>

<style scoped>
.dnet-footer {
  @apply w-full bg-black text-white py-4 mt-8;
}

.dnet-footer-content {
  @apply max-w-screen-xl m-auto flex flex-col items-center space-y-2;
}

.dnet-footer-text {
  @apply text-sm text-center font-mono;
  font-family: 'Ubuntu Mono', monospace;
}

.dnet-footer-button {
  @apply text-xs uppercase bg-red-800 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 ease-in-out;
}
</style>
