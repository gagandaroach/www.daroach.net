<script setup lang="ts">
// Default social card (1200×630), rendered to PNG by nuxt-og-image (takumi).
// Inline styles only — the og renderers don't run our Tailwind/@theme pipeline,
// so the dnet palette is hard-coded here (kept in sync with app/assets/css).
const { title = 'daroach.net', subtitle = 'cpu / gpu engineer · founder · homelab tinkerer' } =
  defineProps<{ title?: string; subtitle?: string }>()
</script>

<template>
  <div
    style="
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 80px;
      background-color: #171717;
      background-image: radial-gradient(60% 60% at 50% 45%, rgba(153, 27, 27, 0.22), transparent);
      color: #e5e7eb;
    "
  >
    <div style="display: flex; color: #ef4444; font-size: 26px; letter-spacing: 10px;">
      GAGAN DAROACH
    </div>
    <div style="display: flex; font-size: 80px; font-weight: 800; margin-top: 18px; line-height: 1;">
      {{ title }}
    </div>
    <div v-if="subtitle" style="display: flex; font-size: 32px; color: #9ca3af; margin-top: 20px;">
      {{ subtitle }}
    </div>
    <div style="display: flex; margin-top: auto; color: #6b7280; font-size: 22px;">
      daroach.net · served from a server at home
    </div>
  </div>
</template>
