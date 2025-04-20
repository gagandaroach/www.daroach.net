<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="transform opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-50">
        <div class="absolute inset-0 bg-black/50" @click="handleClose" />
        <div class="relative flex items-center justify-center min-h-screen p-4">
          <AtomCard class="max-w-lg w-full">
            <slot />
          </AtomCard>
        </div>
      </div>
    </Transition>
  </Teleport>
</template> 