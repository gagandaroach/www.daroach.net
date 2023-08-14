<!-- https://nuxt.com/docs/getting-started/views#layouts -->
<template>
  <div class="h-full min-h-screen dnet-bg m-auto">
    <div class="flex flex-col">

      <DebugButtons /> 
      <!-- TODO: v-if buttons prod/dev - Gagan 8/13/2023 -->
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
