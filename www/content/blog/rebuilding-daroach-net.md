---
title: Rebuilding daroach.net on Nuxt 4
description: Why I tore the site down to the studs and rebuilt it on Nuxt 4, Tailwind v4, and a roll-your-own analytics stack.
date: 2026-06-07
tags: [meta, nuxt, homelab]
draft: false
---

The old site was the sediment of many half-finished rewrites — a Next.js era, a
couple of Nuxt 3 branches, a frontend-learning sandbox heavy on atomic-design
ceremony. This rebuild starts from a clean slate.

## The stack

- **Nuxt 4** with the `app/` directory convention
- **Tailwind v4**, CSS-first `@theme` tokens (no `tailwind.config.js`)
- **tailwind-variants** for typed component variants
- **`@nuxt/content` v3** for this very post, with Shiki highlighting

A component is just a typed variant function plus a template:

```ts
const button = tv({
  base: 'inline-flex items-center justify-center rounded-md',
  variants: {
    variant: {
      solid: 'bg-primary text-white hover:bg-primary/90',
      outline: 'border border-primary text-primary',
    },
  },
  defaultVariants: { variant: 'solid' },
})
```

## What's next

Self-hosted, cookieless analytics — country counts and a salted hash, never a
raw IP — feeding a live visitor map. All served from a server in my home.
