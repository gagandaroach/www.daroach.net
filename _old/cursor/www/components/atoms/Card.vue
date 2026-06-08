<template>
  <div :class="[
    'dnet-card',
    { 'flex flex-col items-center': centered },
    { 'max-w-3xl': size === 'large' },
    { 'max-w-md': size === 'medium' },
    { 'max-w-sm': size === 'small' }
  ]">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  centered?: boolean
  size?: 'small' | 'medium' | 'large'
}>()
</script> 