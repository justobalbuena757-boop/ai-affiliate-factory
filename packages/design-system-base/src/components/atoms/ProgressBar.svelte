<script>
import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn.js";

const track = cva(
	"w-full rounded-full overflow-hidden bg-muted/20 dark:bg-muted-dark/20",
	{
		variants: {
			size: {
				sm: "h-2",
				md: "h-3",
				lg: "h-4",
			},
		},
		defaultVariants: { size: "md" },
	},
);

const fill = cva("h-full rounded-full transition-all duration-700 ease-out", {
	variants: {
		variant: {
			primary: "bg-primary",
			success: "bg-success",
			warning: "bg-warning",
			error: "bg-error",
			info: "bg-info",
			accent: "bg-accent",
		},
	},
	defaultVariants: { variant: "primary" },
});

let {
	value = 0,
	max = 100,
	label = "",
	variant = "primary",
	size = "md",
	showLabel = true,
	animated = false,
	class: className = "",
} = $props();

let percent = $derived((Math.min(Math.max(0, value), max) / max) * 100);
</script>

<div class={cn('w-full', className)}>
  {#if showLabel && label}
    <div class="flex justify-between mb-1.5">
      <span class="text-sm font-medium text-foreground dark:text-foreground-dark">{label}</span>
      <span class="text-sm font-medium text-muted dark:text-muted-dark">{Math.round(percent)}%</span>
    </div>
  {/if}
  <div class={track({ size })}>
    <div
      class={cn(fill({ variant }), animated && 'animate-pulse')}
      style="width: {percent}%"
    ></div>
  </div>
</div>
