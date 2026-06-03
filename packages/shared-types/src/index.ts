import { z } from "zod";

export const TenantBrandSchema = z.object({
	name: z.string(),
	companyName: z.string(),
	description: z.string(),
	url: z.string(),
	locale: z.string().default("en-US"),
	favicon: z.string(),
	appleTouchIcon: z.string(),
	manifest: z.string(),
	defaultOgImage: z.string(),
	logoText: z.string(),
	themeColor: z.object({
		light: z.string(),
		dark: z.string(),
	}),
});

export const NavLinkSchema = z.object({
	label: z.string(),
	href: z.string(),
	isExternal: z.boolean().optional(),
	class: z.string().optional(),
});

export const SocialSchema = z.object({
	twitter: z.string().optional(),
	facebook: z.string().optional(),
	instagram: z.string().optional(),
	pinterest: z.string().optional(),
	youtube: z.string().optional(),
});

export const FooterColumnSchema = z.object({
	title: z.string().nullable(),
	links: z.array(
		z.object({
			label: z.string(),
			href: z.string(),
		}),
	),
});

export const TenantConfigSchema = z.object({
	brand: TenantBrandSchema,
	nav: z.object({
		primary: z.array(NavLinkSchema).optional(),
	}),
	social: SocialSchema.optional(),
	footer: z
		.object({
			copyright: z.string().optional(),
			columns: z.array(FooterColumnSchema).optional(),
		})
		.optional(),
	jsonLd: z
		.object({
			searchAction: z.boolean().optional(),
		})
		.optional(),
});

export type TenantBrand = z.infer<typeof TenantBrandSchema>;
export type NavLink = z.infer<typeof NavLinkSchema>;
export type Social = z.infer<typeof SocialSchema>;
export type FooterColumn = z.infer<typeof FooterColumnSchema>;
export type TenantConfig = z.infer<typeof TenantConfigSchema>;

export type ContentStage = "tofu" | "mofu" | "bofu";

export interface ArticleFrontmatter {
	title: string;
	description: string;
	pubDate: Date;
	modifiedDate?: Date;
	pillar: string;
	cluster: string;
	stage: ContentStage;
	order: number;
	tags: string[];
	author?: string;
	ogImage?: string;
	cta?: {
		label: string;
		href: string;
		product?: string;
		description?: string;
		sidebarDescription?: string;
		sectionTitle?: string;
		sectionSubtitle?: string;
		ctaLabel?: string;
		ratingValue?: string;
		offers?: Record<string, unknown>;
		aggregateRating?: Record<string, unknown>;
	};
}

export interface PillarFrontmatter {
	title: string;
	description: string;
	ogImage?: string;
}

export type ComponentVariant =
	| "default"
	| "primary"
	| "secondary"
	| "ghost"
	| "outline"
	| "link"
	| "elevated"
	| "bordered"
	| "glass"
	| "interactive"
	| "gradient"
	| "minimal";

export type ComponentSize = "sm" | "md" | "lg";

export interface CTA {
	label: string;
	href: string;
}

export interface SocialLink {
	label: string;
	url: string;
}

export interface BreadcrumbItem {
	label: string;
	href?: string;
}

export interface HeadingItem {
	depth: number;
	slug: string;
	text: string;
}

export interface StatItem {
	value: string;
	label: string;
}

export interface FeatureItem {
	title: string;
	description: string;
	icon?: string;
	href?: string;
}

export interface ProductItem {
	title: string;
	description: string;
	image?: string;
	price?: string;
	compareAtPrice?: string;
	badge?: string;
	rating?: number;
	reviews?: number;
	href?: string;
	cta?: CTA;
}

export interface TestimonialItem {
	quote: string;
	author: string;
	role?: string;
	avatar?: string;
}

export interface ComparisonProduct {
	name: string;
	[key: string]: string | boolean | CTA | undefined;
	cta?: CTA;
}
