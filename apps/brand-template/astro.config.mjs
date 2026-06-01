import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://metabolic40plus.com',
  output: 'static',
  integrations: [
    svelte(),
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [tailwind()],
    optimizeDeps: {
      include: ['svelte'],
      exclude: ['tailwind-merge', 'class-variance-authority'],
    },
    ssr: {
      noExternal: ['tailwind-merge', 'class-variance-authority'],
    },
  },
});