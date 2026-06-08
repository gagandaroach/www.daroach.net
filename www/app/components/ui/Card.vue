<script setup lang="ts">
// <UiCard> — the dnet card as a typed-variant component (§5.4a), replacing the
// old `.dnet-card` @apply class. The motif (§1.2): bg-surface/90 + backdrop
// blur, a secondary border that turns red on hover, and a -2px lift.
import { tv, type VariantProps } from 'tailwind-variants'

const card = tv({
  base: 'rounded-md border border-secondary/30 bg-surface/90 backdrop-blur-lg transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-emphasized)]',
  variants: {
    interactive: {
      // the -2px lift + red border on hover
      true: 'hover:-translate-y-0.5 hover:border-primary hover:shadow-lg hover:shadow-primary/10',
      false: '',
    },
    padding: {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: { interactive: false, padding: 'md' },
})

type V = VariantProps<typeof card>

const {
  interactive,
  padding,
  class: cls,
} = defineProps<{
  interactive?: V['interactive']
  padding?: V['padding']
  class?: string
}>()
</script>

<template>
  <div :class="card({ interactive, padding, class: cls })">
    <slot />
  </div>
</template>
