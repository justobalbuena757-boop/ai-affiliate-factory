<script>
import { cn } from "design-system-base";

let {
	value = "99%",
	label = "Success Rate",
	variant = "default",
	children,
	...rest
} = $props();
</script>

<div
  class={cn(
    'flex items-center gap-5 p-5 rounded-xl my-8',
    variant === 'primary' && 'bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20',
    variant === 'gradient' && 'bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10',
    variant === 'default' && 'bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700',
  )}
  {...rest}
>
  <div class="shrink-0 text-center min-w-[80px]">
    <span class="block text-2xl sm:text-3xl font-bold text-primary">{value}</span>
    <span class="block text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">{label}</span>
  </div>
  {#if children}
    <div class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed border-l border-gray-200 dark:border-gray-700 pl-5">
      {@render children()}
    </div>
  {/if}
</div>
