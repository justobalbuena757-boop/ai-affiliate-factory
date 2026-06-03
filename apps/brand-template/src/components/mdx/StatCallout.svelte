<script>
import { cn } from "design-system-base";

let {
	value = "99%",
	label = "Success Rate",
	variant = "default",
	children,
} = $props();
</script>

<div
  class={cn(
    'flex items-center gap-5 p-5 rounded-xl my-8',
    variant === 'primary' && 'bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20',
    variant === 'gradient' && 'bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10',
    variant === 'default' && 'bg-muted/5 dark:bg-surface-dark/50 border border-border dark:border-border-dark',
  )}
>
  <div class="shrink-0 text-center min-w-[80px]">
    <span class="block text-2xl sm:text-3xl font-bold text-primary">{value}</span>
    <span class="block text-xs font-medium text-muted dark:text-muted-dark mt-0.5">{label}</span>
  </div>
  {#if children}
    <div class="text-sm text-muted dark:text-muted-dark leading-relaxed border-l border-border dark:border-border-dark pl-5">
      {@render children()}
    </div>
  {/if}
</div>
