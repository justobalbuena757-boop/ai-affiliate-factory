<script>
import { cn } from "../../lib/cn.js";

let { size = "default", class: className = "", children, ...rest } = $props();
</script>

<div
  class={cn(
    'mx-auto px-4 sm:px-6 lg:px-8',
    size === 'sm' && 'max-w-3xl',
    size === 'md' && 'max-w-5xl',
    size === 'default' && 'max-w-7xl',
    size === 'lg' && 'max-w-[90rem]',
    size === 'full' && 'max-w-none',
    className,
  )}
  {...rest}
>
  {@render children()}
</div>
