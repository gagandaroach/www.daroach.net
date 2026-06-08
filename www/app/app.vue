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
