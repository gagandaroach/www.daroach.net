<script setup lang="ts">
// Site-wide default social card (nuxt-og-image). Pages may override by calling
// defineOgImage()/defineOgImageComponent() in their own setup.
defineOgImageComponent('Default')
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <!-- Site-wide transparency notice (§5.7). Client-only: its visibility comes
       from localStorage, so SSR would flash/mismatch. -->
  <ClientOnly>
    <ConsentNotice />
  </ClientOnly>
</template>
