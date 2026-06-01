<script>
  import { cn } from '../../lib/cn.js';

  let {
    items = [],
    separator = '/',
    class: className = '',
    ...rest
  } = $props();
</script>

<nav class={cn('flex items-center text-sm', className)} aria-label="Breadcrumb" {...rest}>
  <ol class="flex items-center flex-wrap gap-y-1">
    {#each items as item, i}
      <li class="flex items-center">
        {#if i > 0}
          <span class="mx-2 text-gray-400 dark:text-gray-500 select-none" aria-hidden="true">{separator}</span>
        {/if}
        {#if item.href && i < items.length - 1}
          <a
            href={item.href}
            class="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
          >
            {item.label}
          </a>
        {:else}
          <span class="text-gray-900 dark:text-white font-medium" aria-current="page">{item.label}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
