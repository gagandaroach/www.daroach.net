<template>
  <div class="dnet-page">

    <div class="dnet-blog-container">
      <h1 class="dnet-title">www.daroach.net</h1>
      <p class="dnet-p">
        a place for people to share stories,
        knowledge, information, and data.
      </p>
    </div>

    <div v-if="false" class="dnet-card p-10">
      <h1 class="dnet-h1">Web Traffic</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CardGaganIntro />
      <div class="dnet-card flex w-full h-full">
        <h1 class="dnet-h2">Blog</h1>
      </div>
    </div>

    <DevOnly>
      <h1 class="dnet-h1">Debug Stats</h1>
      <p class="dnet-p">
        _bDebugButtons: {{ settings._bDebugButtons }}
        <br>
        bRedirectToWelcome: {{ settings.bRedirectToWelcome }}
        <br>
        <!-- settings: {{ settings }} -->
      </p>
      <button class="dnet-button" @click="settings.reset">
        reset settings
      </button>
    </DevOnly>

  </div>
</template>

<script setup>
import { useSettingsStore } from "~/stores/settings";
const settings = useSettingsStore();

// import { useContent } from '@nuxt/content'
// const { data: recentPosts } = useContent('blog').limit(3).fetch()
</script>
