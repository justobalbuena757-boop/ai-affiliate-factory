import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  if (!site) return new Response('No site URL configured', { status: 500 });

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Evergreen Vitality Labs</title>
    <description>Science-Backed Wellness for Life</description>
    <link>${site}</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${site}rss.xml" rel="self" type="application/rss+xml"/>
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
};
