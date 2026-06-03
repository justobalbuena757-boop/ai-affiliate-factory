<script>
  import { cn } from '../../lib/cn.js';

  let {
    class: className = '',
    children,
    ...rest
  } = $props();
</script>

<div class={cn('mx-auto w-full px-4 tablet:px-6 md:px-8 desktop:px-8 max-w-6xl', className)} {...rest}>
  {@render children()}
</div>
