import { defineCollection, z } from 'astro:content';

const baseSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
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

const recenzje = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    medium: z.enum(['książka', 'film', 'serial', 'gra', 'muzyka', 'inne']),
    work: z.object({
      title: z.string(),
      creator: z.string(),
      year: z.number().optional(),
      isbn: z.string().optional(),
    }),
  }),
});

const tworczosc = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    medium: z.enum(['literatura', 'muzyka', 'inne']),
  }),
});

export const collections = { przemyslenia, kod, recenzje, tworczosc };
