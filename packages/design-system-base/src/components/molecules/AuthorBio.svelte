<script>
import { cn } from "../../lib/cn.js";

let {
	name = "",
	avatar = "",
	bio = "",
	role = "",
	expertise = [],
	publishDate = "",
	lastUpdated = "",
	socialLinks = [],
	class: className = "",
	...rest
} = $props();
</script>

<aside
  class={cn(
    'flex flex-col sm:flex-row gap-5 p-6 sm:p-8 rounded-2xl border border-border dark:border-border-dark',
    role ? 'bg-gradient-to-br from-muted/5 to-surface dark:from-surface-dark/40 dark:to-surface-dark/20' : 'bg-muted/5 dark:bg-surface-dark/50',
    className,
  )}
  itemscope
  itemtype="https://schema.org/Person"
  {...rest}
>
  {#if avatar}
    <img
      src={avatar}
      alt={name}
      class="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shrink-0 mx-auto sm:mx-0"
      loading="lazy"
      itemprop="image"
    />
  {/if}
  <div class="flex-1 text-center sm:text-left min-w-0">
    {#if role}
      <p class="text-xs uppercase tracking-wider text-muted dark:text-muted-dark font-semibold mb-1">Written by</p>
    {/if}
    <p class="font-semibold text-foreground dark:text-foreground-dark" itemprop="name">{name}</p>
    {#if role}
      <p class="text-sm text-muted dark:text-muted-dark" itemprop="jobTitle">{role}</p>
    {/if}
    <p class="mt-3 text-sm text-muted dark:text-muted-dark leading-relaxed" itemprop="description">{bio}</p>
    {#if expertise.length > 0}
      <div class="mt-4 flex flex-wrap gap-1.5 justify-center sm:justify-start">
        {#each expertise as area}
          <span class="inline-block text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
            {area}
          </span>
        {/each}
      </div>
    {/if}
    {#if publishDate}
      <meta itemprop="datePublished" content={publishDate} />
    {/if}
    {#if lastUpdated}
      <meta itemprop="dateModified" content={lastUpdated} />
    {/if}
    {#if socialLinks.length > 0}
      <div class="flex gap-3 mt-4 justify-center sm:justify-start">
        {#each socialLinks as link}
          <a
            href={link.url}
            class="text-xs text-muted dark:text-muted-dark hover:text-primary dark:hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        {/each}
      </div>
    {/if}
  </div>
</aside>
