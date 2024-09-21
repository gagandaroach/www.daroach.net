<template>
    <div class="dnet-navbar">
        <div class="dnet-navbar-data">
            <div class="flex flex-col">
                <NuxtLink to="/" class="dnet-navbar-text-main">daroach.net</NuxtLink>
                <Breadcrumbs />
            </div>
            <div class="dnet-nav-buttons">
                <NuxtLink v-for="(b, index) in navButtons" :to="b.url" :key="index" class="dnet-button-nav"> {{ b.label }}
                </NuxtLink>
            </div>
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