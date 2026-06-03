<script>
import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn.js";

let {
	variant = "info",
	dismissible = false,
	class: className = "",
	children,
	...rest
} = $props();

let dismissed = $state(false);

const alert = cva(
	"relative rounded-lg p-4 text-sm border",
	{
		variants: {
			variant: {
				info: "bg-info/5 border-info/20 text-info-dark dark:bg-info/10 dark:border-info/30 dark:text-info",
				success:
					"bg-success/5 border-success/20 text-success-dark dark:bg-success/10 dark:border-success/30 dark:text-success",
				warning:
					"bg-warning/5 border-warning/20 text-warning-dark dark:bg-warning/10 dark:border-warning/30 dark:text-warning",
				error:
					"bg-error/5 border-error/20 text-error-dark dark:bg-error/10 dark:border-error/30 dark:text-error",
			},
		},
		defaultVariants: { variant: "info" },
	},
);
</script>

{#if !dismissed}
  <div class={cn(alert({ variant }), className)} role="alert" {...rest}>
    <div class="flex items-start gap-2">
      <span class="shrink-0 mt-0.5">
        {#if variant === 'info'}ℹ️
        {:else if variant === 'success'}✅
        {:else if variant === 'warning'}⚠️
        {:else if variant === 'error'}❌
        {/if}
      </span>
      <div class="flex-1">{@render children()}</div>
      {#if dismissible}
        <button
          onclick={() => dismissed = true}
          class="shrink-0 ml-2 text-current opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="Dismiss"
        >
          ✕
        </button>
      {/if}
    </div>
  </div>
{/if}
