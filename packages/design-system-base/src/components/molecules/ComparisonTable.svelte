<script>
import { cn } from "../../lib/cn.js";
import Button from "../atoms/Button.svelte";

let {
	title = "",
	products = [],
	features = [],
	class: className = "",
	...rest
} = $props();

let columns = $derived(
	products.length > 0 ? ['feature', ...products.map((_, i) => `product-${i}`)] : []
);
</script>

<section class={cn('py-8', className)} {...rest}>
  {#if title}
    <h2 class="text-2xl font-semibold text-foreground dark:text-foreground-dark mb-6">{title}</h2>
  {/if}
  <div class="overflow-x-auto rounded-xl border border-border dark:border-border-dark">
    <table class="w-full text-sm">
      <thead>
        <tr class="bg-muted/5 dark:bg-surface-dark/50">
          <th class="text-left px-4 py-3.5 font-semibold text-foreground dark:text-foreground-dark w-1/3">Feature</th>
          {#each products as product}
            <th class="text-center px-4 py-3.5 font-semibold text-foreground dark:text-foreground-dark min-w-[140px]">
              {product.name}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each features as feature}
          <tr class="border-t border-border dark:border-border-dark">
            <td class="px-4 py-3 text-muted dark:text-muted-dark font-medium">{feature.label}</td>
            {#each products as product}
              <td class="px-4 py-3 text-center text-foreground dark:text-foreground-dark">
                {#if product[feature.key] === true}
                  <span class="text-success">✓</span>
                {:else if product[feature.key] === false}
                  <span class="text-muted dark:text-muted-dark">—</span>
                {:else}
                  {product[feature.key]}
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
        {#if products.some(p => p.cta)}
          <tr class="border-t border-border dark:border-border-dark bg-muted/5 dark:bg-surface-dark/30">
            <td class="px-4 py-4"></td>
            {#each products as product}
              <td class="px-4 py-4 text-center">
                {#if product.cta}
                  <Button variant="primary" size="sm" href={product.cta.href}>
                    {product.cta.label}
                  </Button>
                {/if}
              </td>
            {/each}
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
</section>
