<script>
import { cn } from "../../lib/cn.js";
import Button from "../atoms/Button.svelte";

let {
	title = "",
	subtitle = "",
	cta = { label: "Empezar", href: "#" },
	variant = "glass",
	class: className = "",
	...rest
} = $props();
</script>

<section
  class={cn(
    'relative overflow-hidden py-20 sm:py-24',
    variant === 'glass' &&
      'bg-white/50 dark:bg-gray-800/30 backdrop-blur-xl',
    variant === 'gradient' &&
      'bg-gradient-to-r from-primary to-accent text-white',
    className,
  )}
  {...rest}
>
  <div class="absolute inset-0 overflow-hidden -z-10" aria-hidden="true">
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
  </div>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
    <h2
      class={cn(
        'text-3xl sm:text-4xl font-bold tracking-tight',
        variant === 'gradient' ? 'text-white' : 'text-gray-900 dark:text-white',
      )}
    >
      {title}
    </h2>
    {#if subtitle}
      <p
        class={cn(
          'mt-4 text-lg max-w-2xl mx-auto',
          variant === 'gradient' ? 'text-white/80' : 'text-gray-600 dark:text-gray-400',
        )}
      >
        {subtitle}
      </p>
    {/if}
    <div class="mt-8">
      <Button
        variant={variant === 'gradient' ? 'outline' : 'primary'}
        size="lg"
        href={cta.href}
        class={variant === 'gradient' ? 'border-white text-white hover:bg-white hover:text-primary' : ''}
      >
        {cta.label}
      </Button>
    </div>
  </div>
</section>
