<script>
import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn.js";

let {
	variant = "default",
	size = "md",
	class: className = "",
	children,
	...rest
} = $props();

const badge = cva("inline-flex items-center font-medium rounded-full", {
	variants: {
		variant: {
			default: "bg-primary/10 text-primary-dark dark:text-primary",
			success: "bg-success/10 text-success-dark dark:text-success",
			warning: "bg-warning/10 text-warning-dark dark:text-warning",
			error: "bg-error/10 text-error-dark dark:text-error",
			info: "bg-info/10 text-info-dark dark:text-info",
			accent: "bg-accent/10 text-accent-dark dark:text-accent",
		},
		size: {
			sm: "px-2 py-0.5 text-xs",
			md: "px-2.5 py-1 text-sm",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "md",
	},
});
</script>

<span class={cn(badge({ variant, size }), className)} {...rest}>
  {@render children()}
</span>
