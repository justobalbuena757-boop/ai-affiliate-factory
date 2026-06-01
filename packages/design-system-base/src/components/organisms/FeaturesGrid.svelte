<script>
  import { cn } from '../../lib/cn.js';
  import Card from '../molecules/Card.svelte';

  let {
    title = '',
    subtitle = '',
    features = [],
    columns = '3',
    class: className = '',
    ...rest
  } = $props();

  function resolveGrid(c) {
    if (typeof c === 'object' && c !== null) {
      const base = c.base || 1;
      const md = c.md || base;
      const lg = c.lg || md;
      return `grid-cols-${base} tablet:grid-cols-${md} desktop:grid-cols-${lg}`;
    }
    const map = {
      2: 'tablet:grid-cols-2',
      3: 'tablet:grid-cols-2 desktop:grid-cols-3',
      4: 'tablet:grid-cols-2 desktop:grid-cols-4',
    };
    return `grid-cols-1 ${map[c] || 'tablet:grid-cols-2 desktop:grid-cols-3'}`;
  }

  let gridClass = $derived(resolveGrid(columns));
</script>

<section class={cn('py-16 sm:py-24', className)} {...rest}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {#if title}
      <div class="text-center mb-12 lg:mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{title}</h2>
        {#if subtitle}
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
        {/if}
      </div>
    {/if}
    <div class="grid {gridClass} gap-6 lg:gap-8">
      {#each features as feature, i}
        <Card variant="interactive">
          <div class="flex flex-col items-start">
            {#if feature.icon}
              <div class="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                {@html feature.icon}
              </div>
            {/if}
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
          </div>
        </Card>
      {/each}
    </div>
  </div>
</section>
