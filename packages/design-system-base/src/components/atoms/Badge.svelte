<script>
import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn.js";

let {
	variant = "default",
	size = "sm",
	class: className = "",
	children,
	...rest
} = $props();

const badge = cva("inline-flex items-center font-medium rounded-full whitespace-nowrap", {
	variants: {
		variant: {
			default: "bg-muted/10 text-foreground dark:bg-muted-dark/10 dark:text-foreground-dark",
			primary: "bg-primary/10 text-primary-dark dark:bg-primary/20 dark:text-primary-light",
			success: "bg-success/10 text-success-dark dark:bg-success/20 dark:text-success",
			warning: "bg-warning/10 text-warning-dark dark:bg-warning/20 dark:text-warning",
			error: "bg-error/10 text-error-dark dark:bg-error/20 dark:text-error",
			info: "bg-info/10 text-info-dark dark:bg-info/20 dark:text-info",
			accent: "bg-accent/10 text-accent-dark dark:bg-accent/20 dark:text-accent",
		},
		size: {
			sm: "px-2.5 py-0.5 text-xs",
			md: "px-3 py-1 text-sm",
			lg: "px-4 py-1.5 text-base",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "sm",
	},
});
</script>

<span class={cn(badge({ variant, size }), className)} {...rest}>
  {@render children()}
</span>
