<!-- https://nuxt.com/docs/getting-started/views#layouts -->
<template>
<div class="">
  <div class="flex flex-col bg-stone-500 min-h-screen min-w-screen">
    <slot />
  </div>
</div>
</template>

<script setup>

const webpageMainTitle = "daroach.net"
const localTitleChunk = useState('title', () => webpageMainTitle)
useHead({
  titleTemplate: (titleChunk) => {
    const newTitle = titleChunk ? `${titleChunk} - ${webpageMainTitle}` : webpageMainTitle
    localTitleChunk.value = titleChunk ? `${webpageMainTitle} - ${titleChunk}` : webpageMainTitle;
    return newTitle;
  },
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
 ]
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.20s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
