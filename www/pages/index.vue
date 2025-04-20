<script setup lang="ts">
import { useDebugStore } from '../stores'
const debugStore = useDebugStore()
</script>

<template>
  <TemplateBaseLayoutTemplate>
    <template #content>
      <div class="space-y-12">
        <MoleculeSectionHeader>
          <template #title>www.daroach.net</template>
          <template #subtitle>
            A place for people to share stories, knowledge, information, and data.
          </template>
        </MoleculeSectionHeader>

        <TemplateCardGrid>
          <OrganismGaganIntro />
          
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
            <AtomHeading :level="2">Webserver Status</AtomHeading>
            <MoleculeHardwareStatus />
          </AtomCard>

          <AtomCard centered>
            <AtomHeading :level="2">The Wall</AtomHeading>
            <AtomParagraph>First - Gagan Daroach</AtomParagraph>
          </AtomCard>
          
          <DevOnly>
            <AtomCard>
              <AtomHeading :level="2">Debug Stats</AtomHeading>
              <MoleculeButton @click="debugStore.reset">Reset Settings</MoleculeButton>
            </AtomCard>
          </DevOnly>
        </TemplateCardGrid>
      </div>
    </template>
  </TemplateBaseLayoutTemplate>
</template>
