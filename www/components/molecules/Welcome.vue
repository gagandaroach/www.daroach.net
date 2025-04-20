<template>
  <AtomCard size="medium" centered>
    <header class="text-center">
      <AtomHeading>Welcome to daroach.net</AtomHeading>
      <AtomParagraph secondary>Gagan's piece of our digital world</AtomParagraph>
    </header>

    <MoleculeImageWithCaption
      src="/media/gagan_daroach_donuts.gif"
      alt="Gagan Daroach at Metro Market"
    >
      Gagan Daroach at Metro Market, Milwaukee 2018
    </MoleculeImageWithCaption>

    <div class="space-y-4">
      <AtomParagraph>
        You have used the power of the internet to connect to a web server in my apartment.
        Welcome in and help yourself to some milk and donuts ❤️.
        With daroach.net I hope to grow a place for people to share stories, knowledge, information, and data.
      </AtomParagraph>
      <AtomParagraph align="right" size="sm" secondary>
        - Gagan Daroach
      </AtomParagraph>
    </div>

    <div class="text-center">
      <MoleculeButton to="/" icon="heroicons:arrow-right">
        Enter daroach.net
      </MoleculeButton>
    </div>
  </AtomCard>
</template>

<script setup lang="ts">
// No additional logic required for this static component
</script> 