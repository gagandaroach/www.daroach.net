<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <slot name="header" />
    </header>
    <main class="flex-grow">
      <slot name="content" />
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
// Base layout template with header, content, and footer slots
</script> 