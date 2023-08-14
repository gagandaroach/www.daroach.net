<template>
    <div class="dnet-navbar flex flex-row justify-between">
        <div class="flex flex-col">
            <NuxtLink to="/">daroach.net</NuxtLink>
            <Breadcrumbs />
        </div>
        <div class="flex space-x-1">
            <NuxtLink v-for="(b, index) in navButtons" :to="b.url" :key="index" class="dnet-button-nav"> {{ b.label }}
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const navButtons = [
    {
        label: "home",
        url: "/"
    },
    {
        label: "blog",
        url: "/blog"
    },
    {
        label: "about",
        url: "/about"
    }
]
</script>