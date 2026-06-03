import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwind from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

const isBuild = process.argv.includes('build');

export default defineConfig({
  site: 'https://metabolic40plus.com',
  output: 'static',
  ...(isBuild ? { adapter: cloudflare({ mode: 'directory', prerenderEnvironment: 'node' }) } : {}),
  integrations: [
    svelte(),
    mdx(),
    icon(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        const url = item.url.replace(/\/$/, '');
        if (url === 'https://metabolic40plus.com' || url === 'https://metabolic40plus.com/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (url.includes('/coffee-wellness') || url.includes('/sleep-recovery')) {
          if (url.match(/\/coffee-wellness\/coffee-metabolism\/.+/)) {
            item.priority = 0.6;
            item.changefreq = 'monthly';
          } else if (url.match(/\/coffee-wellness\/coffee-metabolism$/)) {
            item.priority = 0.7;
            item.changefreq = 'weekly';
          } else if (url.match(/\/coffee-wellness$/) || url.match(/\/sleep-recovery$/)) {
            item.priority = 0.8;
            item.changefreq = 'weekly';
          } else {
            item.priority = 0.6;
          }
        } else if (url.includes('/sitemap') || url.includes('/contact') || url.includes('/about') || url.includes('/disclosure') || url.includes('/privacy') || url.includes('/editorial') || url.includes('/research')) {
          item.priority = 0.5;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwind()],
    optimizeDeps: {
      include: ['svelte'],
    },
  },
});
