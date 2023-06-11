<!-- https://nuxt.com/docs/getting-started/views#layouts -->
<template>
<div class="">
  <div class="flex flex-col bg-black min-h-screen min-w-screen">
    <div :class="headerClass">
      <div>

        <div class="flex flex-col">
          <div class="flex flex-row space-x-1">
            <NuxtLink to="/" :class="headerTitleClass" :active-class="headerTitleActiveClass">daroach.net</NuxtLink>
          </div>

          <div class="flex flex-col space-y-1">
            <p :class="headerPlugClass"></p>
          </div>

        </div>

      </div>
  
      <div class="flex space-x-2">
        <!-- <div>
          <NuxtLink to="/teams" :class="buttonClass" :active-class="buttonActiveClass">Teams</NuxtLink>
        </div>
        <div>
          <NuxtLink to="/games" :class="buttonClass" :active-class="buttonActiveClass">Games</NuxtLink>
        </div>
        <div>
          <NuxtLink to="/scoreboard" :class="buttonClass" :active-class="buttonActiveClass">Scoreboard</NuxtLink>
        </div> -->
      </div>
    </div>

    
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

const headerClass = "flex justify-between text-white md:p-3 p-1";
const headerTitleClass = "flex md:text-4xl text-base";
const headerPlugClass = "md:text-base text-xs tracking-widest";
const headerTitleActiveClass = ""
const buttonCommonClass = "flex text-center md:text-lg text-xs md:p-3 p-1";
const buttonClass = `${buttonCommonClass} my-2 self-center`;
const buttonActiveClass = `${buttonCommonClass} text-hsu-red`;

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
