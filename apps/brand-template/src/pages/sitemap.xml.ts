import { getCollection } from 'astro:content';

export async function GET() {
  const pillars = await getCollection('pillars');
  const articles = await getCollection('articles');

  const siteUrl = 'https://metabolic40plus.com';
  const pages = [
    '',
    '/about/',
    '/disclosure/',
    '/editorial-policy/',
    '/privacy-policy/',
    '/contact/',
    '/research-methodology/',
    '/ai-disclosure/',
    '/affiliate-disclosure/',
  ];

  const urls = pages.map(page => `${siteUrl}${page}`);

  pillars.forEach(p => {
    const slug = p.id.replace('.mdx', '');
    urls.push(`${siteUrl}/${slug}/`);
    articles.forEach(a => {
      const articleSlug = a.id.replace('.mdx', '').split('/').pop();
      urls.push(`${siteUrl}/${a.data.pillar}/${a.data.cluster}/${articleSlug}`);
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}