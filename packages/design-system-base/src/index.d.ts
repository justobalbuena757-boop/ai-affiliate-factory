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
		class?: string;
	}> {}

	export type ResponsiveColumns =
		| number
		| { base?: number; md?: number; lg?: number };

	export class FeaturesGrid extends SvelteComponent<{
		title?: string;
		subtitle?: string;
		features?: Array<{ icon?: string; title: string; description: string }>;
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
}
