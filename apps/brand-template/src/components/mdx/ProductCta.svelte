<script>
  import { cn } from 'design-system-base';

  let {
    title = 'Try Java Burn Today',
    description = 'Join thousands of people over 40 who have transformed their morning coffee into a metabolic powerhouse.',
    price = '$69',
    href = 'https://www.javaburn.net/',
    image = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80',
    ...rest
  } = $props();
</script>

<div class="my-8 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:to-secondary/10 border border-primary/10 dark:border-primary/20 overflow-hidden" {...rest}>
  <div class="flex flex-col sm:flex-row gap-6 items-center p-6">
    {#if image}
      <div class="w-full sm:w-32 shrink-0" style="aspect-ratio: 4 / 3;">
        <img
          src={image}
          alt={title}
          width="128"
          height="96"
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover rounded-xl"
        />
      </div>
    {/if}
    <div class="flex-1 text-center sm:text-left">
      <h4 class="text-lg font-bold text-gray-900 dark:text-white">{title}</h4>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
      <div class="mt-3 flex items-center gap-3 justify-center sm:justify-start">
        <span class="text-2xl font-bold text-primary">{price}</span>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          class="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors no-underline"
        >
          Claim Discount
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</div>
