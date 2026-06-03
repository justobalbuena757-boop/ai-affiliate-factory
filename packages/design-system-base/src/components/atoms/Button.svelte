<script>
import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn.js";

let {
	variant = "primary",
	size = "md",
	disabled = false,
	href = "",
	class: className = "",
	children,
	...rest
} = $props();

const button = cva(
	"no-underline font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-surface-dark transition-all duration-200 ease-in-out inline-flex items-center justify-center cursor-pointer",
	{
		variants: {
			variant: {
				primary:
					"bg-primary text-foreground-dark hover:bg-primary-dark focus:ring-primary",
				secondary:
					"bg-secondary text-foreground-dark hover:bg-secondary-dark focus:ring-secondary",
				ghost: "text-primary hover:bg-primary/10 focus:ring-primary",
				outline:
					"border-2 border-primary text-primary hover:bg-primary hover:text-foreground-dark focus:ring-primary",
				link: "text-primary underline-offset-4 hover:underline focus:ring-primary",
			},
			size: {
				sm: "px-3 py-1.5 text-sm gap-1.5 min-h-8",
				md: "px-4 py-2 text-base gap-2 min-h-11",
				lg: "px-6 py-3 text-lg gap-2.5 min-h-12",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
);
</script>

{#if href}
  <a
    href={href}
    class={cn(button({ variant, size }), disabled && 'pointer-events-none opacity-60', className)}
    aria-disabled={disabled}
    {...rest}
  >
    {@render children()}
  </a>
{:else}
  <button
    class={cn(button({ variant, size }), disabled && 'pointer-events-none opacity-60', className)}
    {disabled}
    aria-disabled={disabled}
    {...rest}
  >
    {@render children()}
  </button>
{/if}
