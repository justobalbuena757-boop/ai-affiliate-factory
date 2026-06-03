<script>
import { cn } from "../../lib/cn.js";
import Button from "../atoms/Button.svelte";

let {
	title = "",
	subtitle = "",
	cta = { label: "Get Started", href: "#" },
	variant = "glass",
	class: className = "",
	...rest
} = $props();
</script>

<section
  class={cn(
    'relative overflow-hidden rounded-2xl py-16 sm:py-20 px-6 sm:px-12 text-center',
    variant === 'glass' &&
      'bg-surface/50 dark:bg-surface-dark/30 backdrop-blur-3xl border border-surface/20 dark:border-surface-dark/20',
    variant === 'gradient' &&
      'bg-gradient-to-br from-primary to-accent text-foreground-dark',
    className,
  )}
  {...rest}
>
  <h2 class={cn(
    'text-3xl sm:text-4xl font-bold',
    variant === 'gradient' ? 'text-foreground-dark' : 'text-foreground dark:text-foreground-dark',
  )}>
    {title}
  </h2>
  {#if subtitle}
    <p class={cn(
      'mt-4 text-lg max-w-2xl mx-auto',
      variant === 'gradient' ? 'text-foreground-dark/80' : 'text-muted dark:text-muted-dark',
    )}>
      {subtitle}
    </p>
  {/if}
  <div class="mt-8">
    <Button
      variant={variant === 'gradient' ? 'secondary' : 'primary'}
      size="lg"
      href={cta.href}
    >
      {cta.label}
    </Button>
  </div>
  {#if variant === 'glass'}
    <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div class="absolute -top-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>
    </div>
  {/if}
</section>
