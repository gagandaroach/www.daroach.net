<script setup lang="ts">
import { usePeshtigoTree } from '~/composables/images/PeshtigoTree.ts'
const { Src, Alt } = usePeshtigoTree()
</script>

<template>
  <div class="flex max-w-3xl dnet-card">
    <div class="flex flex-col space-y-2">
      <h1>Gagandeep Bishamber Daroach</h1>
      <h2>Daroach.net Maintainer and Host</h2>
      <div class="flex flex-shrink-0 p-5">
        <nuxt-img class="object-scale-down h-auto w-auto" :src="Src" :alt="Alt" loading="lazy" placeholder preload />
      </div>
      <!-- <hr class="my-2" /> -->
      <p>
        I am a Software Engineer, hoping to
        <a href="https://youtu.be/J-GVd_HLlps?t=32">
          make the world a better place.
        </a>
        I hope to grow daroach.net into a place for people to share stories,
        knowledge, information, and data.
        <br>
        Here you can find information about myself and links to my open source projects.
      </p>
      <!-- <hr class="my-2" /> -->
      <div class="flex m-auto">
        <button class="dnet-button m-4">
          Learn More
        </button>
        <button class="dnet-button m-4">
          Contact
        </button>
      </div>
    </div>
  </div>
</template>
