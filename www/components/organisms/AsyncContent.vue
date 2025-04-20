<script setup lang="ts">
defineProps<{
  promise: Promise<any>
}>()
</script>

<template>
  <Suspense>
    <template #default>
      <AtomCard>
        <slot />
      </AtomCard>
    </template>
    <template #fallback>
      <MoleculeLoading />
    </template>
  </Suspense>
</template> 