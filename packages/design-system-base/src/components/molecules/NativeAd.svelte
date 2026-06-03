<script>
import { cn } from "../../lib/cn.js";
import Button from "../atoms/Button.svelte";
import AffiliateBadge from "../atoms/AffiliateBadge.svelte";

let {
	title = "",
	description = "",
	image = "",
	sponsor = "",
	url = "",
	variant = "default",
	class: className = "",
	...rest
} = $props();
</script>

<article
  class={cn(
    'rounded-xl overflow-hidden flex flex-col sm:flex-row',
    variant === 'bordered' && 'border border-border dark:border-border-dark bg-surface dark:bg-surface-dark',
    variant === 'card' && 'shadow-md bg-surface dark:bg-surface-dark',
    variant === 'minimal' && 'bg-muted/5 dark:bg-surface-dark/50',
    className,
  )}
  {...rest}
>
  {#if image}
    <div class="sm:w-48 shrink-0">
      <img
        src={image}
        alt={title}
        class="w-full h-48 sm:h-full object-cover"
        loading="lazy"
      />
    </div>
  {/if}
  <div class="flex-1 p-5 flex flex-col justify-center">
    <div class="flex items-center gap-2 mb-2 flex-wrap">
      <AffiliateBadge type="sponsored" />
      {#if sponsor}
        <span class="text-xs text-muted dark:text-muted-dark">by {sponsor}</span>
      {/if}
    </div>
    <h3 class="text-lg font-semibold text-foreground dark:text-foreground-dark">{title}</h3>
    <p class="mt-1 text-sm text-muted dark:text-muted-dark leading-relaxed">{description}</p>
    {#if url}
      <div class="mt-3">
        <Button variant="link" size="sm" href={url}>Learn More</Button>
      </div>
    {/if}
  </div>
</article>
