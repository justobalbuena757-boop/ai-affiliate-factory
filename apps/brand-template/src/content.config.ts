import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pillars = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/pillars' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    modifiedDate: z.coerce.date().optional(),
    pillar: z.string(),
    cluster: z.string(),
    order: z.number().min(1).max(9),
    stage: z.enum(['tofu', 'mofu', 'bofu']),
    author: z.object({
        name: z.string().default('AI Affiliate Factory'),
        sameAs: z.array(z.string()).default([]),
      }).default({ name: 'AI Affiliate Factory', sameAs: [] }),
    tags: z.array(z.string()).default([]),
    ogImage: z.string().optional(),
  }),
});

export const collections = { pillars, articles };
