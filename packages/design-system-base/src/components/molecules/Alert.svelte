<script>
import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn.js";

let {
	variant = "info",
	title = "",
	dismissible = false,
	icon = false,
	class: className = "",
	children,
	...rest
} = $props();

let dismissed = $state(false);

const alert = cva(
	"relative rounded-xl p-4 border transition-opacity duration-300",
	{
		variants: {
			variant: {
				info: "bg-info/10 border-info/20 text-info-dark dark:text-info",
				success:
					"bg-success/10 border-success/20 text-success-dark dark:text-success",
				warning:
					"bg-warning/10 border-warning/20 text-warning-dark dark:text-warning",
				error: "bg-error/10 border-error/20 text-error-dark dark:text-error",
			},
		},
		defaultVariants: {
			variant: "info",
		},
	},
);

const icons = {
	info: '<svg style="width:1.25rem;height:1.25rem;flex-shrink:0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
	success:
		'<svg style="width:1.25rem;height:1.25rem;flex-shrink:0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
	warning:
		'<svg style="width:1.25rem;height:1.25rem;flex-shrink:0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>',
	error:
		'<svg style="width:1.25rem;height:1.25rem;flex-shrink:0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
};
</script>

{#if !dismissed}
  <div class={cn(alert({ variant }), className)} role="alert" {...rest}>
    <div class="flex gap-3">
      {#if icon}
        <span class="shrink-0 mt-0.5">{@html icons[variant]}</span>
      {/if}
      <div class="flex-1 min-w-0">
        {#if title}
          <h4 class="font-semibold mb-1">{title}</h4>
        {/if}
        <div class="text-sm">{@render children()}</div>
      </div>
      {#if dismissible}
        <button
          class="shrink-0 text-current opacity-60 hover:opacity-100 transition-opacity"
          onclick={() => dismissed = true}
          aria-label="Cerrar"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      {/if}
    </div>
  </div>
{/if}
