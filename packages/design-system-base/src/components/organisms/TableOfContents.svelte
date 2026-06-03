<script>
import { cn } from "../../lib/cn.js";

let {
	headings = [],
	title = "Table of Contents",
	class: className = "",
	...rest
} = $props();

let activeSlug = $state("");
let isOpen = $state(true);

function getHeadingElements() {
	const slugs = headings.map((h) => h.slug);
	return slugs
		.map((slug) => document.getElementById(slug))
		.filter(Boolean);
}

$effect(() => {
	const elements = getHeadingElements();
	if (elements.length === 0) return;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					activeSlug = entry.target.id;
				}
			}
		},
		{ rootMargin: "-80px 0px -60% 0px", threshold: 0 },
	);

	for (const el of elements) observer.observe(el);
	return () => observer.disconnect();
});
</script>

<nav
  class={cn(
    'rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-4',
    className,
  )}
  {...rest}
>
  <button
    class="flex w-full items-center justify-between text-left lg:cursor-default"
    onclick={() => isOpen = !isOpen}
    aria-expanded={isOpen}
  >
    <h3 class="text-sm font-semibold uppercase tracking-wider text-foreground dark:text-foreground-dark">{title}</h3>
    <svg
      class="w-4 h-4 text-muted dark:text-muted-dark transition-transform lg:hidden"
      class:rotate-180={isOpen}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if isOpen}
    <ul class="mt-3 space-y-1">
      {#each headings as heading}
        <li>
          <a
            href={`#${heading.slug}`}
            class={cn(
              'block py-1 text-sm transition-colors border-l-2 pl-3',
              heading.depth === 3 && 'pl-6',
              heading.depth === 4 && 'pl-9',
              activeSlug === heading.slug
                ? 'border-primary text-primary font-medium'
                : 'border-transparent text-muted dark:text-muted-dark hover:text-primary dark:hover:text-primary',
            )}
          >
            {heading.text}
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</nav>
