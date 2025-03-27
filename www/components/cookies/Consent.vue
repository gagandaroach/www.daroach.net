<script setup lang="ts">
import { useCookieStore } from '~/stores/cookieStore'
const cookieStore = useCookieStore()
</script>

<template>
  <Transition name="fade">
    <div v-if="cookieStore.isBannerVisible" class="dnet-cookie-banner">
      <div class="dnet-cookie-content">
        <p class="dnet-cookie-text">
          This website uses cookies to enhance your browsing experience. 
          By continuing to use this site, you agree to our use of cookies.
        </p>
        <div class="dnet-cookie-actions">
          <button @click="cookieStore.accept" class="dnet-button dnet-button-accept">Accept</button>
          <button @click="cookieStore.decline" class="dnet-button dnet-button-decline">Decline</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.dnet-cookie-banner {
  @apply bg-black text-white p-4 z-50 m-4;
  /* @apply fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-50; */
  font-family: 'Ubuntu Mono', monospace;
}

.dnet-cookie-content {
  @apply max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center;
}

.dnet-cookie-text {
  @apply text-sm mb-4 sm:mb-0 sm:mr-4;
}

.dnet-cookie-actions {
  @apply flex space-x-2;
}

.dnet-button {
  @apply px-4 py-2 text-sm uppercase transition duration-300 ease-in-out;
}

.dnet-button-accept {
  @apply bg-red-800 text-white hover:bg-red-600;
}

.dnet-button-decline {
  @apply bg-gray-700 text-white hover:bg-gray-600;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
