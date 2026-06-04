import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pillars = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/pillars' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    icon: z.string().optional(),
    image: z.string().optional(),
    ctaLabel: z.string().optional(),
    ctaHref: z.string().optional(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pillarId: z.string(),
    cluster: z.string(),
    stage: z.enum(['tofu', 'mofu', 'bofu']),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string(),
    authorBio: z.string().optional(),
    authorRole: z.string().optional(),
    image: z.string().optional(),
    readTime: z.string(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
  }),
});

const leadMagnets = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/lead-magnets' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    image: z.string().optional(),
    fileUrl: z.string().optional(),
    ctaLabel: z.string().optional(),
  }),
});

export const collections = { pillars, articles, leadMagnets };
