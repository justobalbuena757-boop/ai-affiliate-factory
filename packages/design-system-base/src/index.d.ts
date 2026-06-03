import { SvelteComponent } from "svelte";

export function cn(...inputs: unknown[]): string;

declare module "design-system-base" {
	export class Button extends SvelteComponent<{
		variant?: "primary" | "secondary" | "ghost" | "outline" | "link";
		size?: "sm" | "md" | "lg";
		disabled?: boolean;
		href?: string;
		class?: string;
		children?: import("svelte").Snippet;
	}> {}

	export class Badge extends SvelteComponent<{
		variant?: "default" | "success" | "warning" | "error" | "info" | "accent";
		size?: "sm" | "md";
		class?: string;
		children?: import("svelte").Snippet;
	}> {}

	export class ProgressBar extends SvelteComponent<{
		value?: number;
		max?: number;
		label?: string;
		variant?: "primary" | "success" | "warning" | "error" | "info" | "accent";
		size?: "sm" | "md" | "lg";
		showLabel?: boolean;
		animated?: boolean;
		class?: string;
	}> {}

	export class AffiliateBadge extends SvelteComponent<{
		type?: "affiliate" | "sponsored" | "editorPick" | "new" | "sale" | "science";
		size?: "sm" | "md";
		class?: string;
	}> {}

	export class Card extends SvelteComponent<{
		variant?: "default" | "elevated" | "bordered" | "glass" | "interactive";
		title?: string;
		class?: string;
		children?: import("svelte").Snippet;
	}> {}

	export class Alert extends SvelteComponent<{
		variant?: "info" | "success" | "warning" | "error";
		title?: string;
		dismissible?: boolean;
		icon?: boolean;
		class?: string;
		children?: import("svelte").Snippet;
	}> {}

	export class Breadcrumb extends SvelteComponent<{
		items?: Array<{ label: string; href?: string }>;
		separator?: string;
		class?: string;
	}> {}

	export class Hero extends SvelteComponent<{
		title?: string;
		subtitle?: string;
		primaryCta?: { label: string; href: string };
		secondaryCta?: { label: string; href: string } | null;
		variant?: "default" | "gradient" | "glass";
		backgroundImage?: string;
		class?: string;
	}> {}

	export type ResponsiveColumns =
		| number
		| { base?: number; md?: number; lg?: number };

	export class FeaturesGrid extends SvelteComponent<{
		title?: string;
		subtitle?: string;
		features?: Array<{ icon?: string; image?: string; title: string; description: string }>;
		columns?: ResponsiveColumns;
		class?: string;
	}> {}

	export class StatsGrid extends SvelteComponent<{
		stats?: Array<{ value: string; label: string }>;
		columns?: ResponsiveColumns;
		variant?: "default" | "gradient" | "accent";
		class?: string;
	}> {}

	export class CTASection extends SvelteComponent<{
		title?: string;
		subtitle?: string;
		cta?: { label: string; href: string };
		variant?: "glass" | "gradient";
		class?: string;
	}> {}

	export class Container extends SvelteComponent<{
		class?: string;
		children?: import("svelte").Snippet;
	}> {}

	export class ProductGrid extends SvelteComponent<{
		products?: Array<{
			title: string;
			description: string;
			image?: string;
			badge?: string;
			price?: string;
			compareAtPrice?: string;
			cta?: { label: string; href: string };
		}>;
		class?: string;
	}> {}

	export class TableOfContents extends SvelteComponent<{
		headings?: Array<{ depth: number; slug: string; text: string }>;
		title?: string;
		class?: string;
	}> {}

	export class NativeAd extends SvelteComponent<{
		title?: string;
		description?: string;
		image?: string;
		imageAlt?: string;
		badgeType?: "affiliate" | "sponsored" | "editorPick" | "new" | "sale" | "science";
		cta?: { label: string; href: string };
		variant?: "editorial" | "subtle";
		class?: string;
	}> {}

	export class AuthorBio extends SvelteComponent<{
		name?: string;
		avatar?: string;
		role?: string;
		bio?: string;
		socialLinks?: Array<{ label: string; href: string }>;
		class?: string;
	}> {}

	export class ArticleCard extends SvelteComponent<{
		title?: string;
		description?: string;
		image?: string;
		imageAlt?: string;
		category?: string;
		tags?: string[];
		author?: string;
		date?: string;
		readingTime?: string;
		href?: string;
		badgeType?: "affiliate" | "sponsored" | "editorPick" | "new" | "sale" | "science" | null;
		variant?: "default" | "subtle";
		class?: string;
	}> {}

	export class ComparisonTable extends SvelteComponent<{
		title?: string;
		products?: Array<{
			name: string;
			cta?: { label: string; href: string };
			[key: string]: unknown;
		}>;
		features?: Array<{ label: string; key: string }>;
		class?: string;
	}> {}

	export class TestimonialCarousel extends SvelteComponent<{
		title?: string;
		testimonials?: Array<{
			quote: string;
			author: string;
			role?: string;
		}>;
		autoplaySpeed?: number;
		class?: string;
	}> {}

	export class NewsletterSignup extends SvelteComponent<{
		title?: string;
		subtitle?: string;
		placeholder?: string;
		buttonLabel?: string;
		action?: string;
		variant?: "default" | "gradient";
		class?: string;
	}> {}
}
