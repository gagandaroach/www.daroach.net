<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const modalRef = ref<HTMLElement | null>(null)
let previousActiveElement: HTMLElement | null = null

const handleClose = () => {
  emit('close')
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    handleClose()
  }
}

const trapFocus = (event: KeyboardEvent) => {
  if (event.key !== 'Tab') return

  const focusableElements = modalRef.value?.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>

  if (!focusableElements.length) return

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (event.shiftKey) {
    if (document.activeElement === firstElement) {
      lastElement.focus()
      event.preventDefault()
    }
  } else {
    if (document.activeElement === lastElement) {
      firstElement.focus()
      event.preventDefault()
    }
  }
}

// Prevent body scroll when modal is open
const preventBodyScroll = () => {
  document.body.style.overflow = 'hidden'
}

const restoreBodyScroll = () => {
  document.body.style.overflow = ''
}

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    previousActiveElement = document.activeElement as HTMLElement
    preventBodyScroll()
    // Focus the modal when it opens
    nextTick(() => {
      modalRef.value?.focus()
    })
  } else {
    restoreBodyScroll()
    // Restore focus to the previous active element
    previousActiveElement?.focus()
  }
})

onMounted(() => {
  if (props.isOpen) {
    preventBodyScroll()
  }
})

onUnmounted(() => {
  restoreBodyScroll()
})
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
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        @keydown="handleKeyDown"
        @keydown.tab="trapFocus"
        ref="modalRef"
        tabindex="-1"
      >
        <div 
          class="absolute inset-0 bg-black/50" 
          @click="handleClose"
          role="presentation"
        />
        <div class="relative flex items-center justify-center min-h-screen p-4">
          <AtomCard class="max-w-lg w-full">
            <slot />
          </AtomCard>
        </div>
      </div>
    </Transition>
  </Teleport>
</template> 