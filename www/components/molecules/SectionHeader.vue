<template>
  <header class="text-center">
    <AtomHeading :level="1" class="text-4xl md:text-6xl mb-4">
      <slot name="title" />
    </AtomHeading>
    <AtomParagraph class="text-xl text-secondary/80 max-w-2xl mx-auto">
      <slot name="subtitle" />
    </AtomParagraph>
  </header>
</template>

<script setup lang="ts">
// No additional logic required for this static component
</script> 