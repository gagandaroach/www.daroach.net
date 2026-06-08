<script setup lang="ts">
useSeoMeta({
  title: 'About — daroach.net',
  description:
    'About Gagan Daroach and how daroach.net works — cookieless, first-party analytics served from a homelab.',
})
</script>

<template>
  <div class="mx-auto max-w-3xl px-6 py-16">
    <header class="mb-10">
      <h1 class="font-display text-4xl tracking-tight">About</h1>
    </header>

    <UiCard padding="lg" class="space-y-4">
      <p class="font-body leading-relaxed text-gray-300">
        I'm <strong class="text-gray-100">Gagan Daroach</strong> — a CPU/GPU
        engineer and founder. This site is my corner of the internet: a
        <NuxtLink to="/timeline" class="text-primary underline-offset-2 hover:underline">timeline</NuxtLink>
        of where I've been, a
        <NuxtLink to="/blog" class="text-primary underline-offset-2 hover:underline">blog</NuxtLink>,
        and a live
        <NuxtLink to="/dashboard" class="text-primary underline-offset-2 hover:underline">dashboard</NuxtLink>
        of who's visiting.
      </p>
      <p class="font-body leading-relaxed text-gray-300">
        The whole thing runs on a server in my home — Nuxt on k3s behind a
        Cloudflare Tunnel — and the source is
        <a
          href="https://github.com/gagandaroach/www.daroach.net"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary underline-offset-2 hover:underline"
        >open on GitHub</a>.
      </p>
    </UiCard>

    <section id="privacy" class="mt-12 scroll-mt-24">
      <h2 class="font-display text-2xl tracking-tight">Privacy &amp; analytics</h2>
      <UiCard padding="lg" class="mt-4 space-y-4">
        <p class="font-body leading-relaxed text-gray-300">
          daroach.net keeps its own lightweight analytics — no Google Analytics,
          no third parties, no tracking cookies. When you load a page, the server
          records the path, an aggregate country (from Cloudflare's edge), and a
          <strong class="text-gray-100">salted HMAC of your IP</strong> for counting
          unique visitors.
        </p>
        <p class="font-body leading-relaxed text-gray-300">
          Your <strong class="text-gray-100">raw IP is never stored</strong> — only
          the keyed hash, computed with a rotating secret salt, so it can't be
          reversed back to you. Records are aged out on a retention schedule. Because
          nothing is stored on your device and no raw IP is kept, this is exempt from
          cookie-consent requirements — the notice you saw is just transparency.
        </p>
        <p class="font-body leading-relaxed text-gray-400">
          You can clear the notice's dismissal anytime with
          <em>“Reset cookie consent”</em> in the footer.
        </p>
      </UiCard>
    </section>
  </div>
</template>
