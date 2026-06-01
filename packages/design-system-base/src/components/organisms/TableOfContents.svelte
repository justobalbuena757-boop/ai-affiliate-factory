<script>
  import { cn } from '../../lib/cn.js';

  let {
    headings = [],
    title = 'Table of Contents',
    class: className = '',
    ...rest
  } = $props();

  let activeSlug = $state('');
  let isOpen = $state(true);

  $effect(() => {
    if (typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSlug = entry.target.id;
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    );
    for (const h of headings) {
      const el = document.getElementById(h.slug);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  });
</script>

<nav class={cn('text-sm', className)} {...rest}>
  <button
    class="flex items-center justify-between w-full text-left font-semibold text-gray-900 dark:text-white uppercase tracking-wider tablet:hidden mb-3"
    onclick={() => (isOpen = !isOpen)}
    aria-expanded={isOpen}
  >
    <span>{title}</span>
    <svg
      class="w-4 h-4 transition-transform {isOpen ? 'rotate-180' : ''}"
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  <div class:block={isOpen} class:hidden={!isOpen} class="tablet:block">
    <p class="hidden tablet:block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
      {title}
    </p>
    <ul class="space-y-1.5">
      {#each headings.filter((h) => h.depth <= 3) as h}
        <li>
          <a
            href="#{h.slug}"
            class:ml-3={h.depth === 3}
            class:pl-3={h.depth >= 3}
            class="block py-1 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline border-l-2 border-transparent {activeSlug === h.slug ? 'text-primary border-primary font-medium' : ''}"
          >
            {h.text}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
