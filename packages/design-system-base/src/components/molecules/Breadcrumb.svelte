<script>
import { cn } from "../../lib/cn.js";

let { items = [], separator = "/", class: className = "", ...rest } = $props();
</script>

<nav class={cn('flex items-center text-sm', className)} aria-label="Breadcrumb" {...rest}>
  <ol class="flex items-center flex-wrap gap-y-1">
    {#each items as item, i}
      <li class="flex items-center">
        {#if i > 0}
          <span class="mx-2 text-muted dark:text-muted-dark select-none" aria-hidden="true">{separator}</span>
        {/if}
        {#if item.href && i < items.length - 1}
          <a
            href={item.href}
            class="text-muted dark:text-muted-dark hover:text-primary dark:hover:text-primary transition-colors"
          >
            {item.label}
          </a>
        {:else}
          <span class="text-foreground dark:text-foreground-dark font-medium" aria-current="page">{item.label}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
