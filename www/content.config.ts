import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // Blog posts: markdown under content/blog, routable as /blog/<slug>.
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.coerce.date().optional(),
        tags: z.array(z.string()).optional(),
        image: z.string().optional(),
        draft: z.boolean().optional(),
      }),
    }),

    // Timeline: one .yml per life/career milestone (see content/timeline/README.md).
    // Sorted by `order` DESC (newest first); `order` disambiguates same-year entries.
    timeline: defineCollection({
      type: 'data',
      source: 'timeline/*.yml',
      schema: z.object({
        year: z.number(),
        order: z.number(),
        title: z.string(),
        photo: z.string(),
        blurb: z.string(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
})
