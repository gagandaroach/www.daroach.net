<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

const props = defineProps<{
  promise: Promise<any>
}>()

const error = ref<Error | null>(null)

// Handle promise rejection
props.promise.catch((err) => {
  error.value = err
})

// Handle component errors
onErrorCaptured((err) => {
  error.value = err
  return false
})
</script>

<template>
  <Suspense>
    <template #default>
      <AtomCard>
        <slot v-if="!error" />
        <div v-else class="text-error">
          <AtomHeading :level="2">Error</AtomHeading>
          <AtomParagraph>{{ error.message }}</AtomParagraph>
        </div>
      </AtomCard>
    </template>
    <template #fallback>
      <MoleculeLoading />
    </template>
  </Suspense>
</template> 