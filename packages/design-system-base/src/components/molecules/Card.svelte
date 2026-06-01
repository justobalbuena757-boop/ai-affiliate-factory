<script>
  import { cva } from 'class-variance-authority';
  import { cn } from '../../lib/cn.js';

  let {
    variant = 'default',
    title = '',
    class: className = '',
    children,
    ...rest
  } = $props();

  const card = cva(
    'rounded-xl overflow-hidden',
    {
      variants: {
        variant: {
          default: 'bg-white dark:bg-gray-800 shadow-md',
          elevated: 'bg-white dark:bg-gray-800 shadow-xl',
          bordered: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
          glass: 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-white/20 dark:border-gray-700/30 shadow-lg',
          interactive:
            'bg-white dark:bg-gray-800 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    },
  );
</script>

<div class={cn(card({ variant }), className)} {...rest}>
  {#if title}
    <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
    </div>
  {/if}
  <div class="p-6">
    {@render children()}
  </div>
</div>
