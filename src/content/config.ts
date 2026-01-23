import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['pl', 'en']).optional().default('pl'),
  }),
});

export const collections = { blog };
