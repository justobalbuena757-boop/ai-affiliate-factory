<script>
import { cn } from "../../lib/cn.js";
import Card from "../molecules/Card.svelte";

let {
	title = "",
	subtitle = "",
	features = [],
	columns = "3",
	class: className = "",
	...rest
} = $props();

function resolveGrid(c) {
	if (typeof c === "object" && c !== null) {
		const base = c.base || 1;
		const md = c.md || base;
		const lg = c.lg || md;
		return `grid-cols-${base} tablet:grid-cols-${md} desktop:grid-cols-${lg}`;
	}
	const map = {
		2: "tablet:grid-cols-2",
		3: "tablet:grid-cols-2 desktop:grid-cols-3",
		4: "tablet:grid-cols-2 desktop:grid-cols-4",
	};
	return `grid-cols-1 ${map[c] || "tablet:grid-cols-2 desktop:grid-cols-3"}`;
}

let gridClass = $derived(resolveGrid(columns));
</script>

<section class={cn('py-16 sm:py-24', className)} {...rest}>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {#if title}
      <div class="text-center mb-12 lg:mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-foreground dark:text-foreground-dark">{title}</h2>
        {#if subtitle}
          <p class="mt-4 text-lg text-muted dark:text-muted-dark max-w-2xl mx-auto">{subtitle}</p>
        {/if}
      </div>
    {/if}
    <div class="grid {gridClass} gap-6 lg:gap-8">
		{#each features as feature, i}
        <a
          href={feature.href}
          class="block group focus:outline-none focus:ring-2 focus:ring-primary rounded-xl"
        >
          <Card variant="interactive">
            {#if feature.image}
              <div class="relative overflow-hidden aspect-video -mx-6 -mt-6 mb-5 rounded-t-xl">
                <img
                  src={feature.image}
                  alt={feature.title}
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            {/if}
            <div class="flex flex-col items-start">
              {#if feature.icon}
                <div class="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {@html feature.icon}
                </div>
              {/if}
              <h3 class="text-lg font-semibold text-foreground dark:text-foreground-dark mb-2">
                {feature.title}
              </h3>
              <p class="text-muted dark:text-muted-dark text-sm leading-relaxed">{feature.description}</p>
              <span class="mt-4 text-sm font-medium text-primary group-hover:text-primary-dark transition-colors inline-flex items-center gap-1.5">
                Explore {feature.title}
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </span>
            </div>
          </Card>
        </a>
      {/each}
    </div>
  </div>
</section>
