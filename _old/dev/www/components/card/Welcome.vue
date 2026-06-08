<template>
  <div class="dnet-card p-6 max-w-md mx-auto space-y-6">
    <header class="text-center">
      <h1 class="text-3xl font-display mb-2">Welcome to daroach.net</h1>
      <p class="text-secondary/80">Gagan's piece of our digital world</p>
    </header>

    <figure class="flex flex-col items-center">
      <nuxt-img 
        class="rounded-lg shadow-lg" 
        src="/media/gagan_daroach_donuts.gif" 
        alt="Gagan Daroach at Metro Market"
        placeholder 
      />
      <figcaption class="mt-2 text-sm text-secondary/60">
        Gagan Daroach at Metro Market, Milwaukee 2018
      </figcaption>
    </figure>

    <div class="space-y-4">
      <p class="text-base">
        You have used the power of the internet to connect to a web server in my apartment.
        Welcome in and help yourself to some milk and donuts ❤️.
        With daroach.net I hope to grow a place for people to share stories, knowledge, information, and data.
      </p>
      <p class="text-right text-sm text-secondary/80">
        - Gagan Daroach
      </p>
    </div>

    <div class="text-center">
      <NuxtLink to="/" class="dnet-button">
        Enter daroach.net
        <icon name="heroicons:arrow-right" class="w-5 h-5 ml-2" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional logic required for this static component
</script>
