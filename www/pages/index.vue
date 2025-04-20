<script setup lang="ts">
import { useSettingsStore } from '~/stores/settings'
const settingsStore = useSettingsStore()
</script>

<template>
  <div class="space-y-12">
    <MoleculeSectionHeader>
      <template #title>www.daroach.net</template>
      <template #subtitle>
        A place for people to share stories, knowledge, information, and data.
      </template>
    </MoleculeSectionHeader>

    <MoleculeGrid>
      <MoleculeGaganIntro />
      
      <AtomCard centered>
        <AtomHeading :level="2">Blog</AtomHeading>
        <MoleculeButton to="/blog">View Blog</MoleculeButton>
      </AtomCard>

      <AtomCard centered>
        <AtomHeading :level="2">Web Traffic</AtomHeading>
        <AtomParagraph>Chart 1: Daroach.net Overall Hits / Map</AtomParagraph>
        <AtomParagraph>Chart 3: Region Map</AtomParagraph>
        <AtomParagraph>Chart 2: SubPages</AtomParagraph>
      </AtomCard>
      
      <AtomCard centered>
        <AtomHeading :level="2">Hardware Status</AtomHeading>
        <AtomParagraph>CPU Usage</AtomParagraph>
        <AtomParagraph>GPU Usage</AtomParagraph>
        <AtomParagraph>Memory</AtomParagraph>
      </AtomCard>

      <AtomCard centered>
        <AtomHeading :level="2">The Wall</AtomHeading>
        <AtomParagraph>First - Gagan Daroach</AtomParagraph>
      </AtomCard>
      
      <DevOnly>
        <AtomCard>
          <AtomHeading :level="2">Debug Stats</AtomHeading>
          <MoleculeButton @click="settingsStore.reset">Reset Settings</MoleculeButton>
        </AtomCard>
      </DevOnly>
    </MoleculeGrid>
  </div>
</template>
