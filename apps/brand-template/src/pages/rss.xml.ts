import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

type Article = CollectionEntry<'articles'>;

export const GET: APIRoute = async ({ site }) => {
  const articles = await getCollection('articles');
  const siteUrl = (site?.toString() || 'https://metabolic40plus.com').replace(/\/$/, '');

  const sorted = articles.sort(
    (a: Article, b: Article) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );

  const items = sorted
    .map((article: Article) => {
      const articleSlug = article.id.replace('.mdx', '').split('/').pop();
      const url = `${siteUrl}/${article.data.pillar}/${article.data.cluster}/${articleSlug}/`;
      const pubDate = article.data.pubDate.toUTCString();

      return `    <item>
      <title><![CDATA[${article.data.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>noreply@metabolic40plus.com (${article.data.author || 'AI Affiliate Factory'})</author>
      <category>${article.data.stage.toUpperCase()}</category>
      <description><![CDATA[${article.data.description}]]></description>
      ${article.data.tags.map((tag: string) => `<category>${tag}</category>`).join('\n      ')}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Metabolic 40+ — Health, Sleep, and Coffee</title>
    <link>${siteUrl}/</link>
    <description>Science-backed content about metabolic health, coffee, sleep, and healthy aging for adults over 40.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <managingEditor>noreply@metabolic40plus.com (AI Affiliate Factory)</managingEditor>
    <webMaster>noreply@metabolic40plus.com (AI Affiliate Factory)</webMaster>
    <copyright>Copyright © ${new Date().getFullYear()} AI Affiliate Factory</copyright>
    <ttl>60</ttl>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
