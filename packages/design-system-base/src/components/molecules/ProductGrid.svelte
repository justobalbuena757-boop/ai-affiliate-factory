<script>
  import { cn } from '../../lib/cn.js';
  import Card from './Card.svelte';
  import Button from '../atoms/Button.svelte';

  let {
    products = [],
    class: className = '',
    ...rest
  } = $props();

  const gridCols = 'grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3';
</script>

<section class={cn('py-12', className)} {...rest}>
  <div class="grid {gridCols} gap-6">
    {#each products as product, i}
      <Card variant={i === 0 ? 'elevated' : 'bordered'} class="flex flex-col">
        <div class="flex flex-col h-full">
          {#if product.image}
            <div class="w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          {/if}
          {#if product.badge}
            <span class="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light mb-3 w-fit">
              {product.badge}
            </span>
          {/if}
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {product.title}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
            {product.description}
          </p>
          {#if product.price}
            <div class="mt-4 flex items-center gap-2">
              {#if product.compareAtPrice}
                <span class="text-sm text-gray-400 line-through">${product.compareAtPrice}</span>
              {/if}
              <span class="text-xl font-bold text-primary">${product.price}</span>
            </div>
          {/if}
          {#if product.cta}
            <div class="mt-4">
              <Button variant="primary" size="md" href={product.cta.href}>
                {product.cta.label}
              </Button>
            </div>
          {/if}
        </div>
      </Card>
    {/each}
  </div>
</section>
