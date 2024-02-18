<template>
    <div class="p-2 m-3">
        <div class="flex space-x-2 p-2 justify-between">
            <NuxtLink v-for="(b, index) in debug_buttons" :to="b.url" :key="index" class="dnet-button">
                {{ b.label }}
            </NuxtLink>
            <button class="dnet-button" @click="settings.reset">
                reset settings
            </button>
        </div>
    </div>
</template>

<script setup>
import { useSettingsStore } from '../stores/settings';

const settings = useSettingsStore();

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
    {
        label: "random-error-page",
        url: "/asdfajsdfka/sdklfja/sdkfjas/kdfj"
    },
    {
        label: "blog-error-page",
        url: "/blog/sdklfja/sdkfjas/kdfj"
    },
]
</script>
