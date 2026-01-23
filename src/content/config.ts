import { defineCollection, z } from 'astro:content';

const baseSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  lang: z.enum(['pl', 'en']).optional().default('pl'),
  status: z.enum(['seed', 'growing', 'evergreen']).optional().default('evergreen'),
  description: z.string().optional(),
});

const przemyslenia = defineCollection({
  type: 'content',
  schema: baseSchema,
});

const kod = defineCollection({
  type: 'content',
  schema: baseSchema,
});

export const collections = { przemyslenia, kod };
