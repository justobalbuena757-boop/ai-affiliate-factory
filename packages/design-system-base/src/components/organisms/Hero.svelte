<script lang="ts">
  import { Button } from 'design-system-base';
  import { onMount } from 'svelte';
  import { cn } from '../../lib/cn.js';

  // Desestructurar props con $state
  // 1. Desestructurar props SIN $state
  let {
    title = '',
    subtitle = '',
    primaryCta = { label: 'Comenzar', href: '#' },
    secondaryCta = null,
    variant = 'default', // Valor por defecto SIN $state
    backgroundImage = '',
    overlay = true,
    class: className = '',
    ...rest
  } = $props();

  // 2. Declarar variant como estado reactivo DESPUÉS
  let variantState = $state(variant);

  // 3. Actualizar variantState si variant cambia
  $effect(() => {
    variantState = variant;
  });

  // Detect browser environment
  const isBrowser = typeof window !== 'undefined';

  onMount(() => {
    if (backgroundImage && isBrowser) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = backgroundImage;
      document.head.appendChild(link);
    }
  });
</script>

<section
  class={cn(
    'relative overflow-hidden py-20 sm:py-28 lg:py-36',
    variantState === 'gradient' &&
      !backgroundImage &&
      'bg-gradient-to-br from-primary/5 via-transparent to-secondary/5',
    variantState === 'glass' &&
      !backgroundImage &&
      'bg-white/50 dark:bg-gray-900/50 backdrop-blur-3xl',
    className,
  )}
  {...rest}
>
  {#if backgroundImage}
    <div
      class="absolute inset-0 -z-20 bg-cover bg-center"
      style="background-image: url({backgroundImage}); background-color: #333;"
      aria-hidden="true"
    ></div>
    {#if overlay}
      <div
        class="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900/70 via-gray-900/50 to-gray-900/80"
        aria-hidden="true"
      ></div>
    {/if}
  {/if}
  <div
    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
  >
    <h1
      class={cn(
        'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight',
        backgroundImage
          ? 'text-white drop-shadow-lg'
          : 'text-gray-900 dark:text-white',
      )}
    >
      {title}
    </h1>
    {#if subtitle}
      <p
        class={cn(
          'mt-6 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed',
          backgroundImage
            ? 'text-gray-200 drop-shadow-md'
            : 'text-gray-600 dark:text-gray-400',
        )}
      >
        {subtitle}
      </p>
    {/if}
    <div class="mt-10 flex items-center justify-center gap-4 flex-wrap">
      <Button variant={backgroundImage ? 'outline' : 'primary'} size="lg" href={primaryCta.href}
        class={backgroundImage ? 'border-white text-white hover:bg-white hover:text-gray-900' : ''}>
        {primaryCta.label}
      </Button>
      {#if secondaryCta}
        <Button variant={backgroundImage ? 'ghost' : 'ghost'} size="lg" href={secondaryCta.href}
          class={backgroundImage ? 'text-white hover:bg-white/10' : ''}>
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
