<script setup lang="ts">
import { usePeshtigoTree } from '~/composables/images/PeshtigoTree.ts'
const { Src, Alt } = usePeshtigoTree()
</script>

<template>
  <AtomCard>
    <div class="flex flex-col space-y-2">
      <AtomHeading :level="1">Gagandeep Bishamber Daroach</AtomHeading>
      <AtomHeading :level="2">Daroach.net Maintainer and Host</AtomHeading>
      <div class="flex flex-shrink-0 p-5">
        <nuxt-img 
          class="object-scale-down h-auto w-auto" 
          :src="Src" 
          :alt="Alt" 
          loading="lazy" 
          placeholder 
          preload
          width="400"
          height="300"
          sizes="(max-width: 768px) 100vw, 400px"
          :decoding="'async'"
        />
      </div>
      <AtomParagraph>
        I am a Software Engineer, hoping to
        <a 
          href="https://youtu.be/J-GVd_HLlps?t=32" 
          class="text-primary hover:text-primary/80"
          target="_blank"
          rel="noopener noreferrer"
        >
          make the world a better place.
        </a>
        I hope to grow daroach.net into a place for people to share stories,
        knowledge, information, and data.
        <br>
        Here you can find information about myself and links to my open source projects.
      </AtomParagraph>
      <div class="flex m-auto space-x-4">
        <MoleculeButton to="/about">Learn More</MoleculeButton>
        <MoleculeButton to="/contact">Contact</MoleculeButton>
      </div>
    </div>
  </AtomCard>
</template> 