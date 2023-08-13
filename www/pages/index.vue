<template>
  <div>
    <div class="container flex-col m-auto my-14 md:my-20 text-white text-center">
      <h1 class="text-4xl">www.daroach.net</h1>
      <p class="text-base">WIP v2 site</p>
    </div>
    <div>
      <h1 class="text-4xl text-white p-10">debug buttons</h1>
      <div class="flex">
        <NuxtLink v-for="(b, index) in debug_buttons" :to="b.url" :key="index"
          class="py-4 px-4 rounded-xl bg-green-600 m-10 hover:bg-green-200"> {{ b.label }} </NuxtLink>
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
