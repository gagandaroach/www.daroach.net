<template>
    <div class="m-auto rounded-3xl p-4 border-2 bg-stone-900">
        <h1 class="text-4xl text-white px-10">debug buttons</h1>
        <div class="flex space-x-4 p-4">
            <NuxtLink v-for="(b, index) in debug_buttons" :to="b.url" :key="index" class="dnet-button"> {{ b.label }}
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const debug_buttons = [
    {
        label: "/",
        url: "/"
    },
    {
        label: "welcome",
        url: "/welcome"
    },
    {
        label: "blog/index",
        url: "/blog"
    },
    {
        label: "blog/about",
        url: "/blog/about"
    },
]
</script>
