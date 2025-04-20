<template>
  <TemplateBaseLayoutTemplate>
    <template #header>
      <slot name="header">
        <TheNavBar />
      </slot>
    </template>
    
    <template #content>
      <Suspense>
        <template #default>
          <div class="container mx-auto px-4">
            <slot name="content" />
          </div>
        </template>
        <template #fallback>
          <MoleculeLoading />
        </template>
      </Suspense>
    </template>

    <template #footer>
      <slot name="footer">
        <TheFooter />
      </slot>
    </template>
  </TemplateBaseLayoutTemplate>
</template>

<script setup lang="ts">
import { onErrorCaptured } from 'vue'

// Enhanced page template with Suspense and default slots

// Error handling for async operations
onErrorCaptured((error) => {
  console.error('Error in page template:', error)
  // You could emit this error to a global error handler
  return false // Prevent the error from propagating further
})
</script> 