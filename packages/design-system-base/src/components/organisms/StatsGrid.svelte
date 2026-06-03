<script>
import { cn } from "../../lib/cn.js";
import { onMount } from "svelte";

let {
	stats = [],
	columns = "4",
	variant = "default",
	class: className = "",
	...rest
} = $props();

let isLoading = $state(true);

onMount(() => {
	isLoading = false;
});

function resolveGrid(c) {
	if (typeof c === "object" && c !== null) {
		const base = c.base || 1;
		const md = c.md || base;
		const lg = c.lg || md;
		return `grid-cols-${base} tablet:grid-cols-${md} desktop:grid-cols-${lg}`;
	}
	const map = {
		2: "grid-cols-2",
		3: "tablet:grid-cols-3",
		4: "grid-cols-2 tablet:grid-cols-4",
	};
	return `${map[c] || "grid-cols-2 tablet:grid-cols-4"}`;
}

let gridClass = $derived(resolveGrid(columns));
</script>

<section
  class={cn(
    'py-16 sm:py-20',
    variant === 'gradient' && 'bg-gradient-to-r from-primary/5 to-secondary/5',
    variant === 'accent' && 'bg-primary text-foreground-dark dark:bg-primary-dark',
    className,
  )}
  {...rest}
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {#if isLoading}
      <div class="grid {gridClass} gap-8 lg:gap-12">
        {#each Array(4) as _, i}
          <div class="text-center">
            <div class="h-12 bg-muted/20 dark:bg-muted-dark/20 rounded-lg animate-pulse"></div>
            <div class="mt-2 h-4 bg-muted/20 dark:bg-muted-dark/20 rounded-lg animate-pulse"></div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="grid {gridClass} gap-8 lg:gap-12">
        {#each stats as stat, i}
          <div class="text-center {variant === 'accent' ? '' : 'text-foreground dark:text-foreground-dark'}">
            <div class={cn(
              'text-3xl sm:text-4xl lg:text-5xl font-bold',
              variant === 'accent' ? '' : 'text-primary',
            )}>
              {stat.value}
            </div>
            <div class={cn(
              'mt-2 text-sm sm:text-base',
              variant === 'accent' ? 'text-foreground-dark/80' : 'text-muted dark:text-muted-dark',
            )}>
              {stat.label}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
