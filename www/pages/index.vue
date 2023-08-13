<template>
  <div>
    <div class="container flex-col m-auto my-14 md:my-20 text-white text-center">
      <h1 class="text-4xl">www.daroach.net</h1>
      <p class="text-base">WIP v2 site</p>
    </div>
    <div class="border-2 border-black bg-slate-900 m-auto">
      <h1 class="text-4xl text-white px-10">debug buttons</h1>
      <div class="flex space-x-4 p-4">
        <NuxtLink v-for="(b, index) in debug_buttons" :to="b.url" :key="index"
          class="dnet-button"> {{ b.label }} </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const debug_buttons = [
  {
    label: "blog/index",
    url: "/blog"
  },
  {
    label: "blog/about",
    url: "/blog/about"
  },
  {
    label: "landing",
    url: "/landing"
  },
  {
    label: "/",
    url: "/"
  }
]
</script>
