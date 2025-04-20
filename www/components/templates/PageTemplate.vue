<template>
  <TemplateBaseLayoutTemplate>
    <template #header>
      <slot name="header">
        <Navbar />
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
        <Footer />
      </slot>
    </template>
  </TemplateBaseLayoutTemplate>
</template>

<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import Navbar from '~/components/organisms/Navbar.vue'
import Footer from '~/components/organisms/Footer.vue'

// Enhanced page template with Suspense and default slots

// Error handling for async operations
onErrorCaptured((error) => {
  console.error('Error in page template:', error)
  // You could emit this error to a global error handler
  return false // Prevent the error from propagating further
})
</script> 