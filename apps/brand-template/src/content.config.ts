import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pillars = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/pillars' }),
  schema: z.object({
    title: z.string().max(60, 'Title exceeds SEO standard (max 60 ch)'),
    description: z.string().min(110).max(155, 'Meta-description out of range (110-155 ch)'),
    summary: z.string().max(200).optional(),
    icon: z.string().optional(),
    ogImage: z.string().url().optional(),
    dateModified: z.date().default(new Date()),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    title: z.string().max(60, 'Title exceeds SEO standard (max 60 ch)'),
    description: z.string().min(110).max(155, 'Meta-description out of range (110-155 ch)'),
    summary: z.string().max(200).optional(),
    pubDate: z.coerce.date(),
    dateModified: z.coerce.date().optional(),
    authorId: z.string().optional(),
    pillar: z.string(),
    cluster: z.string(),
    order: z.number().min(1).max(9),
    stage: z.enum(['tofu', 'mofu', 'bofu']),
    author: z.object({
      name: z.string().default('AI Affiliate Factory'),
      sameAs: z.array(z.string()).default([]),
    }).default({ name: 'AI Affiliate Factory', sameAs: [] }),
    tags: z.array(z.string()).default([]),
    ogImage: z.string().url().optional(),
    featuredImage: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

const leadMagnets = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/lead-magnets' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    downloadUrl: z.string().url(),
    emailRequired: z.boolean().default(true),
  }),
});

export const collections = { pillars, articles, leadMagnets };