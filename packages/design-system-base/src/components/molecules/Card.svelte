<script>
import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn.js";

let {
	variant = "default",
	title = "",
	class: className = "",
	children,
	...rest
} = $props();

const card = cva("rounded-xl overflow-hidden", {
	variants: {
		variant: {
			default: "bg-surface dark:bg-surface-dark shadow-md",
			elevated: "bg-surface dark:bg-surface-dark shadow-xl",
			bordered:
				"bg-surface dark:bg-surface-dark border border-border dark:border-border-dark",
			glass:
				"bg-surface/70 dark:bg-surface-dark/70 backdrop-blur-lg border border-surface/20 dark:border-surface-dark/30 shadow-lg",
			interactive:
				"bg-surface dark:bg-surface-dark shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});
</script>

<div class={cn(card({ variant }), className)} {...rest}>
  {#if title}
    <div class="px-6 py-4 border-b border-border dark:border-border-dark">
      <h3 class="text-lg font-semibold text-foreground dark:text-foreground-dark">{title}</h3>
    </div>
  {/if}
  <div class="p-6">
    {@render children()}
  </div>
</div>
