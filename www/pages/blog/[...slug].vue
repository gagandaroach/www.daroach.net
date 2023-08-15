<template>
  <main>
    <ContentDoc class="dnet-blog-content"/>
  </main>
</template>

<style scoped>
.dnet-blog-content {
  @apply p-4 space-y-2;
}

h1 {
  font-family: 'Ubuntu Mono';
  @apply text-center;
  @apply text-stone-50 text-xl;
}

p {
  font-family: 'Ubuntu';
  @apply text-stone-100;
}

a {
  font-family: 'Ubuntu Condensed';
  @apply text-red-300;
}

</style>