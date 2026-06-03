<script>
import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn.js";

const isBrowser = typeof window !== "undefined";
const disableAnimations =
	!isBrowser ||
	(isBrowser && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

const track = cva(
	"w-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700",
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
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{Math.round(percent)}%</span>
    </div>
  {/if}
  <div class={track({ size })}>
    <div
      class={cn(fill({ variant }), animated && !disableAnimations && 'animate-pulse')}
      style="width: {percent}%"
    ></div>
  </div>
</div>