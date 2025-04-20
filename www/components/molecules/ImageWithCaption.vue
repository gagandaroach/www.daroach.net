<template>
  <figure class="flex flex-col items-center">
    <img 
      class="rounded-lg shadow-lg" 
      :src="src" 
      :alt="alt"
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