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
// Enhanced page template with Suspense and default slots
</script> 