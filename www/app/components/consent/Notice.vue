<script setup lang="ts">
// <ConsentNotice> — non-blocking transparency notice (§5.7).
//
// daroach.net's analytics are cookieless, first-party, and store only an
// aggregate country + a salted HMAC (never the raw IP), which is consent-EXEMPT
// under ePrivacy — so this is a dismissible *notice*, not a blocking gate.
// Mounted site-wide from app.vue, wrapped in <ClientOnly> there (state lives in
// localStorage via useConsent()). The footer's "Reset cookie consent" brings it
// back.
const { decided, acknowledge } = useConsent()
</script>

<template>
  <Transition name="consent">
    <div
      v-if="!decided"
      class="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:left-auto sm:right-0 sm:max-w-md"
    >
      <UiCard padding="md" class="shadow-lg shadow-black/40">
        <p class="font-display text-sm text-gray-100">cookieless analytics</p>
        <p class="mt-2 text-sm leading-relaxed text-gray-400">
          This site keeps lightweight, first-party analytics — an aggregate
          country count and a salted hash, <strong class="text-gray-300">never your raw IP</strong>.
          No third parties, no tracking cookies.
          <NuxtLink to="/about#privacy" class="text-primary underline-offset-2 hover:underline">
            How it works
          </NuxtLink>.
        </p>
        <div class="mt-4 flex justify-end">
          <UiButton variant="solid" size="sm" @click="acknowledge">Got it</UiButton>
        </div>
      </UiCard>
    </div>
  </Transition>
</template>

<style scoped>
.consent-enter-active,
.consent-leave-active {
  transition: opacity 0.3s ease, transform 0.3s var(--ease-emphasized);
}
.consent-enter-from,
.consent-leave-to {
  opacity: 0;
  transform: translateY(0.75rem);
}
</style>
