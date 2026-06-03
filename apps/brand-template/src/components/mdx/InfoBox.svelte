<script>
import { cn } from "design-system-base";

let { variant = "info", title = "", children, ...rest } = $props();

const config = {
	info: {
		bg: "bg-info/5 dark:bg-info/10 border-info/20 dark:border-info/30",
		icon: "text-info",
		path: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
	},
	tip: {
		bg: "bg-success/5 dark:bg-success/10 border-success/20 dark:border-success/30",
		icon: "text-success",
		path: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
	},
	warning: {
		bg: "bg-warning/5 dark:bg-warning/10 border-warning/20 dark:border-warning/30",
		icon: "text-warning",
		path: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
	},
};

const c = $derived(config[variant] || config.info);
</script>

<div class={cn('border-l-4 rounded-r-xl px-5 py-4 my-8', c.bg)} {...rest}>
  <div class="flex gap-3">
    <svg class={cn('w-5 h-5 mt-0.5 shrink-0', c.icon)} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={c.path} />
    </svg>
    <div>
      {#if title}
        <p class="font-semibold text-foreground dark:text-foreground-dark mb-1 text-sm">{title}</p>
      {/if}
      <div class="text-sm text-muted dark:text-muted-dark leading-relaxed">
        {@render children()}
      </div>
    </div>
  </div>
</div>
