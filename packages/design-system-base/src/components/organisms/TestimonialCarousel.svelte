<script>
import { cn } from "../../lib/cn.js";

let {
	title = "",
	testimonials = [],
	autoplaySpeed = 5000,
	class: className = "",
	...rest
} = $props();

let current = $state(0);
let intervalId = $state(null);

function startAutoplay() {
	if (autoplaySpeed > 0) {
		intervalId = setInterval(() => {
			current = (current + 1) % testimonials.length;
		}, autoplaySpeed);
	}
}

function stopAutoplay() {
	if (intervalId) {
		clearInterval(intervalId);
		intervalId = null;
	}
}

$effect(() => {
	startAutoplay();
	return () => stopAutoplay();
});
</script>

<section
  class={cn('py-12', className)}
  {...rest}
  onmouseenter={stopAutoplay}
  onmouseleave={startAutoplay}
>
  {#if title}
    <h2 class="text-2xl font-semibold text-foreground dark:text-foreground-dark text-center mb-10">{title}</h2>
  {/if}
  {#if testimonials.length > 0}
    <div class="relative max-w-2xl mx-auto">
      <div class="overflow-hidden rounded-xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark p-8 text-center">
        <div class="transition-opacity duration-500" style="opacity: 1">
          <blockquote class="text-lg text-foreground dark:text-foreground-dark leading-relaxed italic">
            &ldquo;{testimonials[current].quote}&rdquo;
          </blockquote>
          <div class="mt-6">
            <p class="font-semibold text-foreground dark:text-foreground-dark">{testimonials[current].author}</p>
            {#if testimonials[current].role}
              <p class="text-sm text-muted dark:text-muted-dark mt-0.5">{testimonials[current].role}</p>
            {/if}
          </div>
        </div>
      </div>
      {#if testimonials.length > 1}
        <div class="flex justify-center gap-2 mt-6">
          {#each testimonials as _, i}
            <button
              class={cn(
                'w-2.5 h-2.5 rounded-full transition-all duration-300 border-0 cursor-pointer',
                i === current
                  ? 'bg-primary scale-110'
                  : 'bg-muted/40 dark:bg-muted-dark/40 hover:bg-muted/60 dark:hover:bg-muted-dark/60',
              )}
              onclick={() => { current = i; stopAutoplay(); setTimeout(startAutoplay, autoplaySpeed); }}
              aria-label={`Go to testimonial ${i + 1}`}
            ></button>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</section>
