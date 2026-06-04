export interface TenantAffiliateProduct {
  id: string;
  name: string;
  type: string;
}

export interface TenantBrand {
  name: string;
  tagline: string;
  description: string;
}

export interface TenantDeployment {
  platform: string;
  production: string;
  preview?: string;
}

export interface TenantConfig {
  id: string;
  name: string;
  locale: string;
  region: string;
  language: string;
  vertical: string[];
  brand: TenantBrand;
  affiliate: {
    primary: string;
    products: TenantAffiliateProduct[];
  };
  deployment: TenantDeployment;
}

export interface SeoMeta {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  noindex?: boolean;
}

export type ContentStage = 'tofu' | 'mofu' | 'bofu';

export interface ArticleMeta {
  title: string;
  description: string;
  pillar: string;
  cluster: string;
  stage: ContentStage;
  publishedAt: Date;
  updatedAt?: Date;
}

export interface PillarMeta {
  title: string;
  description: string;
  slug: string;
  order: number;
}
