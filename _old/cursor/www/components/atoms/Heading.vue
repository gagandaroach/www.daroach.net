<template>
  <h1 class="text-3xl font-display mb-2">
    <slot />
  </h1>
</template>

<script setup lang="ts">
defineProps<{
  level?: 1 | 2 | 3 | 4 | 5 | 6
}>()
</script> 