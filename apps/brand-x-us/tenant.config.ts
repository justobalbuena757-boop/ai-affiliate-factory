import type { TenantConfig } from "@af/types";

export const tenantConfig: TenantConfig = {
	id: "brand-x-us",
	name: "Evergreen Vitality Labs",
	locale: "en-US",
	region: "us",
	language: "en",
	vertical: ["metabolic-wellness", "weight-wellness", "daily-energy"],
	brand: {
		name: "Evergreen Vitality Labs",
		tagline: "Science-Backed Wellness for Life",
		description:
			"Evidence-based metabolic health, weight wellness, and daily energy optimization for adults 40+.",
	},
	affiliate: {
		primary: "product-a",
		products: [
			{
				id: "product-a",
				name: "Product A",
				type: "coffee-based metabolic support",
			},
			{
				id: "product-b",
				name: "Product B",
				type: "tea-based metabolic support",
			},
		],
	},
	deployment: {
		platform: "cloudflare-pages",
		production: "https://evergreenvitalitylabs.com",
		preview: "https://preview.evergreenvitalitylabs.com",
	},
};
