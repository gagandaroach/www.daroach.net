<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '~/stores/settings'
import { useCookieStore } from '~/stores/cookieStore'

const cookieStore = useCookieStore()
const settingsStore = useSettingsStore()
const { _bDebugButtons } = storeToRefs(settingsStore)

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
  <div class="min-h-screen dnet-bg">
    <TheNavBar />
    
    <main class="py-8">
      <slot />
    </main>
    
    <TheFooter />
  </div>
</template>
