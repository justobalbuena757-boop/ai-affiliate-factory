<script>
  import { cn } from '../../lib/cn.js';

  let {
    class: className = '',
    children,
    ...rest
  } = $props();
</script>

<div class={cn('mx-auto w-full px-4 tablet:px-6 desktop:px-8 max-w-7xl', className)} {...rest}>
  {@render children()}
</div>
