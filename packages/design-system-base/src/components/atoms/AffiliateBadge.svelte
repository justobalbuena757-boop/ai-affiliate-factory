<script>
import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn.js";

let {
	type = "affiliate",
	size = "sm",
	class: className = "",
	...rest
} = $props();

const badge = cva("inline-flex items-center gap-1 font-medium rounded-full whitespace-nowrap", {
	variants: {
		type: {
			affiliate: "bg-warning/10 text-warning-dark dark:text-warning",
			sponsored: "bg-primary/10 text-primary-dark dark:text-primary",
			editorPick: "bg-success/10 text-success-dark dark:text-success",
			new: "bg-info/10 text-info-dark dark:text-info",
			sale: "bg-error/10 text-error-dark dark:text-error",
			science: "bg-secondary/10 text-secondary-dark dark:text-secondary",
		},
		size: {
			sm: "px-2 py-0.5 text-[10px] uppercase tracking-wider",
			md: "px-2.5 py-1 text-xs uppercase tracking-wider",
		},
	},
	defaultVariants: {
		type: "affiliate",
		size: "sm",
	},
});

const labels = {
	affiliate: "Affiliate Link",
	sponsored: "Sponsored",
	editorPick: "Editor's Pick",
	new: "New",
	sale: "Sale",
	science: "Science-Backed",
};

const icons = {
	affiliate: "🔗",
	sponsored: "📢",
	editorPick: "⭐",
	new: "✨",
	sale: "🏷️",
	science: "🔬",
};
</script>

<span class={cn(badge({ type, size }), className)} {...rest}>
  <span class="text-current opacity-70">{icons[type]}</span>
  {labels[type]}
</span>
