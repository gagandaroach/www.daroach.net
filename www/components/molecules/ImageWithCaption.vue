<template>
  <figure class="flex flex-col items-center">
    <nuxt-img 
      class="rounded-lg shadow-lg" 
      :src="src" 
      :alt="alt"
      placeholder 
    />
    <figcaption class="mt-2 text-sm text-secondary/60">
      <slot />
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt: string
}>()
</script> 