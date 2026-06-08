<script setup lang="ts">
// Site-wide default social card (nuxt-og-image). Guarded to the server: og
// images are only needed for SSR/prerendered HTML (what crawlers read), and
// defineOgImage* throws in a client-only context — which is exactly the
// ssr:false /dashboard route, where app.vue setup runs client-side. Pages may
// override by calling defineOgImageComponent() in their own (server) setup.
if (import.meta.server) {
  defineOgImageComponent('Default')
}
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
