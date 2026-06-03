import type { APIRoute } from 'astro';
import tenant from '../config/tenant.json';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = (site?.toString() || tenant.brand.url).replace(/\/$/, '');

  const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap-index.xml

Disallow: /admin/
Disallow: /api/
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
