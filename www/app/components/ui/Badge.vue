<script setup lang="ts">
// <UiBadge> — the small tag/chip primitive (the dnet "#tag" pill). Promoted to
// ui/ because the same markup was repeated across blog + timeline (§5.4a:
// shared presentational primitives live here). Slot-based so callers control
// the content (e.g. the leading "#").
</script>

<template>
  <span class="rounded bg-primary/10 px-2 py-0.5 font-code text-xs text-primary">
    <slot />
  </span>
</template>
