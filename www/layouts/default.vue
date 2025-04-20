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
  <TemplatePageTemplate>
    <template #content>
      <OrganismCookieConsent v-if="showCookieConsent" />
      <DevOnly>
        <MoleculeDebugBar v-if="showDebugButtons" />
      </DevOnly>
      <slot />
    </template>
  </TemplatePageTemplate>
</template>
