<script lang="ts">
import { Button } from "design-system-base";
import { cn } from "../../lib/cn.js";

let {
	title = "",
	subtitle = "",
	primaryCta = { label: "Comenzar", href: "#" },
	secondaryCta = null,
	variant = "default",
	backgroundImage = "",
	class: className = "",
	...rest
} = $props();

let variantState = $derived(variant);
</script>

<section
  class={cn(
    'relative overflow-hidden py-20 sm:py-28 lg:py-36',
    variantState === 'gradient' &&
      !backgroundImage &&
      'bg-gradient-to-br from-primary/5 via-transparent to-secondary/5',
    variantState === 'glass' &&
      !backgroundImage &&
      'bg-surface/50 dark:bg-surface-dark/50 backdrop-blur-3xl',
    className,
  )}
  {...rest}
>
  {#if backgroundImage}
    <img
      src={backgroundImage}
      alt=""
      width="1920"
      height="1080"
      loading="eager"
      fetchpriority="high"
      decoding="sync"
      class="absolute inset-0 w-full h-full object-cover"
      aria-hidden="true"
    />
    <div
      class="absolute inset-0 bg-gradient-to-br from-bg-dark/70 via-bg-dark/50 to-bg-dark/80"
      aria-hidden="true"
    ></div>
  {/if}
  <div
    class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
  >
    <h1
      class={cn(
        'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight',
        backgroundImage
          ? 'text-foreground-dark drop-shadow-lg'
          : 'text-foreground dark:text-foreground-dark',
      )}
    >
      {title}
    </h1>
    {#if subtitle}
      <p
        class={cn(
          'mt-6 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed',
          backgroundImage
            ? 'text-muted-dark drop-shadow-md'
            : 'text-muted dark:text-muted-dark',
        )}
      >
        {subtitle}
      </p>
    {/if}
    <div class="mt-10 flex items-center justify-center gap-4 flex-wrap">
      <Button variant={backgroundImage ? 'outline' : 'primary'} size="lg" href={primaryCta.href}
        class={backgroundImage ? 'border-foreground-dark text-foreground-dark hover:bg-foreground-dark hover:text-foreground' : ''}>
        {primaryCta.label}
      </Button>
      {#if secondaryCta}
        <Button variant={backgroundImage ? 'ghost' : 'ghost'} size="lg" href={secondaryCta.href}
          class={backgroundImage ? 'text-foreground-dark hover:bg-foreground-dark/10' : ''}>
          {secondaryCta.label}
        </Button>
      {/if}
    </div>
  </div>
  {#if !backgroundImage}
    <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
      ></div>
    </div>
  {/if}
</section>
