<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '~/stores/settings' // Adjust path if needed
import { useCookieStore } from '~/stores/cookieStore'

const cookieStore = useCookieStore()
const settingsStore = useSettingsStore()
const { _bDebugButtons } = storeToRefs(settingsStore)

// --- Cookies ---
onMounted(() => { cookieStore.checkConsent() });

// --- Title Management ---
const webpageMainTitle = 'daroach.net'
const localTitleChunk = useState<string>('title', () => webpageMainTitle)

useHead({
  titleTemplate: (titleChunk?: string) => {
    const newTitle = titleChunk ? `${titleChunk} - ${webpageMainTitle}` : webpageMainTitle
    localTitleChunk.value = newTitle // Update state for potential other uses

    return newTitle
  },
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }]
})
</script>

<template>
  <div class="dnet-layout h-full min-h-screen dnet-bg m-auto">
    <div class="dnet-layout-content flex flex-col">
      <TheNavBar />
      <CookieConsent />

      <main class="dnet-layout-main">
        <slot />
      </main>

      <DevOnly>
        <div v-if="_bDebugButtons" class="dnet-debug-buttons bg-stone-800 border-4 border-green-300 m-auto">
          <DbgBar />
        </div>
      </DevOnly>

    </div>
    <TheFooter />
  </div>
</template>

<style scoped>
.dnet-layout-main {
  @apply transition-opacity duration-200; /* Apply transition to main content */
}

/* Nuxt Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.20s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
