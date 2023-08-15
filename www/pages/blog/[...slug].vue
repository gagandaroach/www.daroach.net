<template>
  <main>
    <ContentDoc class="dnet-blog-content"/>
  </main>
</template>

<style>
.dnet-blog-content {
  @apply p-4 space-y-2;
}

.dnet-blog-content h1 {
  font-family: 'Ubuntu Mono';
  @apply text-center;
  @apply text-stone-50 text-xl;
}

.dnet-blog-content p {
  font-family: 'Ubuntu';
  @apply text-stone-100;
}

.dnet-blog-content a {
  font-family: 'Ubuntu Condensed';
  @apply text-red-900;
}

</style>