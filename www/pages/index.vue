<script setup>
const settingsStore = useSettingsStore();
const { _bDebugButtons, bRedirectToWelcome, bCookieConsent } = storeToRefs(settingsStore);
</script>

<template>
  <div class="dnet-page">

    <!-- <div v-if="bWelcomeCard" >
      <WelcomeVisitor />
    </div>
    <div v-else>
    </div>

    <button @click="settingsStore.toggleWelcomeCard">Toggle Welcome Card</button> -->

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
        _bDebugButtons: {{ _bDebugButtons }}
        <br>
        bRedirectToWelcome: {{ bRedirectToWelcome }}
        <br>
        <!-- settings: {{ settings }} -->
      </p>
      <button class="dnet-button" @click="settingsStore.reset">
        reset settings
      </button>
    </DevOnly>

  </div>
</template>
