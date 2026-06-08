<script setup lang="ts">
// <UiButton> — the dnet button as a typed-variant component (§5.4a).
// Replaces the old `.dnet-button` @apply class. `tailwind-variants` gives the
// variant API + built-in tailwind-merge; `VariantProps` derives the prop union
// from the single `tv` definition (one source of truth for styles AND types).
//
// Renders as <NuxtLink> when `to` is set (so external + internal nav share the
// same look), otherwise a <button>. Extra attrs (target, rel, disabled, @click)
// fall through to the single root element.
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'inline-flex items-center justify-center gap-2 rounded-md font-display font-medium transition-colors duration-300 ease-[var(--ease-emphasized)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      solid: 'bg-primary text-white hover:bg-primary/90',
      outline: 'border border-primary text-primary hover:bg-primary/10',
      ghost: 'text-gray-300 hover:bg-primary/10 hover:text-primary',
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
    },
  },
  defaultVariants: { variant: 'solid', size: 'md' },
})

type V = VariantProps<typeof button>

const {
  variant,
  size,
  to,
  type = 'button',
  class: cls,
} = defineProps<{
  variant?: V['variant']
  size?: V['size']
  to?: string
  type?: 'button' | 'submit' | 'reset'
  class?: string
}>()
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="button({ variant, size, class: cls })">
    <slot />
  </NuxtLink>
  <button v-else :type="type" :class="button({ variant, size, class: cls })">
    <slot />
  </button>
</template>
