<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCookieStore, useUIStore, useDebugStore } from '~/stores'

const cookieStore = useCookieStore()
const uiStore = useUIStore()
const debugStore = useDebugStore()
const { showDebugButtons } = storeToRefs(debugStore)
const { showCookieConsent } = storeToRefs(uiStore)

// --- Cookies ---
onMounted(() => { cookieStore.checkConsent() })

// --- Title Management ---
const webpageMainTitle = 'daroach.net'
const localTitleChunk = useState<string>('title', () => webpageMainTitle)

useHead({
  titleTemplate: (titleChunk?: string) => {
    const newTitle = titleChunk ? `${titleChunk} - ${webpageMainTitle}` : webpageMainTitle
    localTitleChunk.value = newTitle
    return newTitle
  },
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }]
})
</script>

<template>
  <div class="flex flex-col min-h-screen dnet-bg">
    <TheNavBar />
    <MoleculeCookieConsent v-if="showCookieConsent" />
    <DevOnly>
      <MoleculeDebugBar v-if="showDebugButtons" />
    </DevOnly>
    <main class="flex-grow py-8">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
