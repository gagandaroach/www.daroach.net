<script setup lang="ts">
import { useCookieStore } from '~/stores/cookieStore'
const cookieStore = useCookieStore()
</script>

<template>
  <Transition name="fade">
    <div v-if="cookieStore.isBannerVisible" class="dnet-cookie-banner">
      <AtomHeading :level="1">Welcome to daroach.net (=</AtomHeading>
      <div class="dnet-cookie-content">
        <AtomParagraph class="dnet-cookie-text">
          Would you some cookies! No ads or anything, the cookies record website data for fun features. <br>
          My entire website is open source at
          <a href="https://github.com/gagandaroach/www.daroach.net" target="_blank" rel="noopener noreferrer">
            github.com/gagandaroach/www.daroach.net
          </a>
          &lt;3
        </AtomParagraph>
        <div class="dnet-cookie-actions">
          <MoleculeButton @click="cookieStore.accept" variant="accept">Accept</MoleculeButton>
          <MoleculeButton @click="cookieStore.decline" variant="decline">Decline</MoleculeButton>
        </div>
      </div>
    </div>
    <DevOnly v-else>
      <div class="dnet-cookie-actions">
        <MoleculeButton @click="cookieStore.deleteCookieConsent" variant="accept">Delete Cookie</MoleculeButton>
      </div>
    </DevOnly>
  </Transition>
</template>

<style scoped>
.dnet-cookie-banner {
  @apply bg-black text-white p-4 z-50 m-4;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 