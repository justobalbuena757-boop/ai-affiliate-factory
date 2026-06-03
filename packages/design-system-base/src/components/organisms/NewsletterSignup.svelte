<script>
import { cn } from "../../lib/cn.js";

let {
	title = "Subscribe to our newsletter",
	description = "",
	placeholder = "Enter your email",
	buttonText = "Subscribe",
	variant = "default",
	class: className = "",
	onsubmit,
	...rest
} = $props();

let email = $state("");
let status = $state("idle");
let message = $state("");

async function handleSubmit(e) {
	e.preventDefault();
	if (!email.trim()) return;

	status = "loading";
	message = "";

	if (onsubmit) {
		try {
			await onsubmit(email);
			status = "success";
			message = "Thank you for subscribing!";
			email = "";
		} catch (err) {
			status = "error";
			message = err.message || "Something went wrong. Please try again.";
		}
	} else {
		status = "success";
		message = "Thank you for subscribing!";
		email = "";
	}
}
</script>

<section
  class={cn(
    'rounded-xl p-6 sm:p-8 text-center',
    variant === 'card' && 'bg-surface dark:bg-surface-dark border border-border dark:border-border-dark shadow-md',
    variant === 'banner' && 'bg-muted/5 dark:bg-surface-dark/50 border border-border dark:border-border-dark',
    className,
  )}
  {...rest}
>
  {#if status === 'success'}
    <div class="py-4">
      <p class="text-lg font-semibold text-success">{message}</p>
    </div>
  {:else}
    <h3 class="text-lg font-semibold text-foreground dark:text-foreground-dark">{title}</h3>
    {#if description}
      <p class="mt-2 text-sm text-muted dark:text-muted-dark">{description}</p>
    {/if}
    <form onsubmit={handleSubmit} class="mt-4 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
      <input
        type="email"
        bind:value={email}
        placeholder={placeholder}
        required
        disabled={status === 'loading'}
        class="flex-1 px-4 py-2.5 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-foreground dark:text-foreground-dark placeholder:text-muted dark:placeholder:text-muted-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        class="px-5 py-2.5 rounded-lg bg-primary text-foreground-dark text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-60 whitespace-nowrap cursor-pointer"
      >
        {status === 'loading' ? 'Subscribing...' : buttonText}
      </button>
    </form>
    {#if status === 'error'}
      <p class="mt-2 text-sm text-error">{message}</p>
    {/if}
  {/if}
</section>
