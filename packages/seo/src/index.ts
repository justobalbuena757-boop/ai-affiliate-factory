export interface OrganizationJsonLd {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}

export interface WebSiteJsonLd {
  name: string;
  url: string;
  description?: string;
  searchAction?: { target: string; queryParam: string };
}

export interface ArticleJsonLd {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: { name: string; url?: string };
  publisher: { name: string; logo?: string };
}

export interface BreadcrumbJsonLdItem {
  label: string;
  href?: string;
}

export function organizationSchema(data: OrganizationJsonLd): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    ...(data.logo && { logo: data.logo }),
    ...(data.description && { description: data.description }),
    ...(data.sameAs && data.sameAs.length > 0 && { sameAs: data.sameAs }),
  };
}

export function websiteSchema(data: WebSiteJsonLd): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    url: data.url,
  };
  if (data.description) schema.description = data.description;
  if (data.searchAction) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${data.url}${data.searchAction.target}?${data.searchAction.queryParam}={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    };
  }
  return schema;
}

export function articleSchema(data: ArticleJsonLd): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    url: data.url,
    ...(data.image && { image: data.image }),
    datePublished: data.datePublished,
    ...(data.dateModified && { dateModified: data.dateModified }),
    author: {
      '@type': 'Person',
      name: data.author.name,
      ...(data.author.url && { url: data.author.url }),
    },
    publisher: {
      '@type': 'Organization',
      name: data.publisher.name,
      ...(data.publisher.logo && { logo: { '@type': 'ImageObject', url: data.publisher.logo } }),
    },
  };
}

export function breadcrumbSchema(items: BreadcrumbJsonLdItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && { item: item.href }),
    })),
  };
}
