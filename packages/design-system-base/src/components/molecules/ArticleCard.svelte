<script>
import { cn } from "../../lib/cn.js";
import Card from "./Card.svelte";

let {
	title = "",
	excerpt = "",
	image = "",
	category = "",
	author = "",
	date = "",
	url = "",
	variant = "default",
	class: className = "",
	...rest
} = $props();
</script>

<article class={cn('h-full', className)} {...rest}>
  <a href={url} class="block h-full group focus:outline-none focus:ring-2 focus:ring-primary rounded-xl">
    <Card variant={variant === 'featured' ? 'elevated' : 'bordered'} class="h-full flex flex-col">
      {#if image}
        <div class="relative overflow-hidden aspect-video -mx-6 -mt-6 mb-4 rounded-t-xl">
          <img
            src={image}
            alt={title}
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      {/if}
      {#if category}
        <span class="text-xs font-semibold uppercase tracking-wider text-primary mb-2">{category}</span>
      {/if}
      <h3 class="text-lg font-semibold text-foreground dark:text-foreground-dark group-hover:text-primary transition-colors">
        {title}
      </h3>
      {#if excerpt}
        <p class="mt-2 text-sm text-muted dark:text-muted-dark leading-relaxed flex-1">{excerpt}</p>
      {/if}
      {#if author || date}
        <div class="mt-4 pt-4 border-t border-border dark:border-border-dark flex items-center gap-3 text-xs text-muted dark:text-muted-dark">
          {#if author}
            <span>{author}</span>
          {/if}
          {#if date}
            <span>{date}</span>
          {/if}
        </div>
      {/if}
    </Card>
  </a>
</article>
