<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="[
      'dnet-button focus-ring',
      { 'dnet-button-accept': variant === 'accept' },
      { 'dnet-button-decline': variant === 'decline' }
    ]"
  >
    <slot />
    <icon v-if="icon" :name="icon" class="w-5 h-5 ml-2" />
  </NuxtLink>
  <button
    v-else
    :class="[
      'dnet-button focus-ring',
      { 'dnet-button-accept': variant === 'accept' },
      { 'dnet-button-decline': variant === 'decline' }
    ]"
    @click="handleClick"
  >
    <slot />
    <icon v-if="icon" :name="icon" class="w-5 h-5 ml-2" />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  to?: string
  icon?: string
  variant?: 'accept' | 'decline'
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style scoped>
.dnet-button {
  @apply px-4 py-2 text-sm uppercase transition duration-300 ease-in-out;
}

.dnet-button-accept {
  @apply bg-red-800 text-white hover:bg-red-600;
}

.dnet-button-decline {
  @apply bg-gray-700 text-white hover:bg-gray-600;
}
</style> 