<template>
  <p :class="[
    'text-base',
    { 'text-secondary/80': secondary },
    { 'text-right': align === 'right' },
    { 'text-sm': size === 'sm' }
  ]">
    <slot />
  </p>
</template>

<script setup lang="ts">
defineProps<{
  secondary?: boolean
  align?: 'left' | 'right' | 'center'
  size?: 'sm' | 'base' | 'lg'
}>()
</script> 