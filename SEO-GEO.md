
# EXECUTIVE DIRECTIVES FOR DEEP SEO & GEO AUDIT (AFFILIATE MARKETING ENGINE)
**Target Stack:** Astro 6, Svelte 5 (Runes), Tailwind CSS v4, Zod v4, Astro Content Layer API
**Target Market:** High-Performance US Affiliate Market (ClickBank / Digistore24)
**Objective:** Achieve a 100/100 Core Web Vitals score, flawless Google Mobile-First Indexing, and maximum Generative Engine Optimization (GEO/LLMO) visibility for AI-driven search engines (OpenAI Search, Perplexity, Gemini, Claude).

---

## 1. DATA VALIDATION & CONTENT LAYER INTEGRATION (Zod v4 & Astro 6)
You must enforce a strict, typed schema via Zod v4 within `src/content.config.ts` to block invalid meta-data or malformed architectures before production compilation.

*   **Strict Character Constraints:** Hard-limit SEO meta-tags using Zod primitives to prevent text truncation in SERPs.
*   **Taxonomy & Silo Enforcement:** Categorize content strictly into `pillar`, `cluster`, or `article` page types via enums to map semantic context.
*   **Freshness Metrics:** Mandate a `dateModified` timestamp to signal content freshness to Googlebot and AI crawlers.

### Reference Configuration Setup:
```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/data/blog' }),
  schema: z.object({
    title: z.string().max(60, "Title exceeds SEO standard (max 60 ch)"),
    description: z.string().min(110).max(155, "Meta-description out of range (110-155 ch)"),
    datePublished: z.date(),
    dateModified: z.date().default(new Date()),
    authorId: z.string(),
    category: z.enum(['pillar', 'cluster', 'article']),
    featuredImage: z.string().url(),
    draft: z.boolean().default(false),
  })
});

```

---

## 2. PERFORMANCE & HYDRATION ARCHITECTURE (Svelte 5 & INP Optimization)

To secure an Interaction to Next Paint (INP) metric under 200ms and a Largest Contentful Paint (LCP) under 2.5s, JavaScript execution must be radically minimized.

* **Zero-JS Default:** Render all standard MDX body components (pros/cons boxes, static review tables, callouts) as pure, static HTML. Do not use Astro client directives unless deep user interaction is required.
* **Deferred Hydration:** For dynamic elements like interactive financial calculators or dynamic multi-step affiliate quizzes, utilize `client:visible` or `client:idle` in Svelte 5 to preserve the main thread during initial page load.
* **Runes Optimization:** Enclose high-frequency computational data inside Svelte 5 `$derived` runes to isolate state changes and avoid UI rendering blocks.

---

## 3. LAYOUT STABILITY & ASSET OPTIMIZATION (Tailwind v4 & CLS = 0)

Using Tailwind CSS v4's native Rust compilation engine, layouts must render with pixel-perfect visual stability (Cumulative Layout Shift < 0.1).

* **Explicit Structural Sizing:** Every custom component injected into an MDX file must reserve structural layout space before asset rendering. Apply native aspect-ratio utilities (`aspect-video`, `aspect-square`, `aspect-[16/9]`) directly on content blocks.
* **LCP Asset Optimization:** The hero image or first above-the-fold graphical asset must bypass lazy-loading. Inject the Astro native `<Image />` component with `loading="eager"` and `fetchpriority="high"`.
* **Universal Responsive CSS Parsing:** Avoid inline style injections within MDX components. Rely completely on Tailwind v4 theme variables to enforce absolute uniformity across modern mobile viewports (Safari iOS / Chrome Mobile).

---

## 4. SEMANTIC SCHEMA & ENTITY GRAPH INTEGRATION (JSON-LD JSON Automation)

Search engines and LLMs map meaning through Knowledge Graphs. You must systematically output microdata to declare your page's exact technical identity.

* **Article Page Types (`category: 'article' | 'cluster'`):** Dynamically build and output an inline JSON-LD script for `BlogPosting` or `Article` schemas. Automatically bind parameters for `headline`, `image`, `datePublished`, and `dateModified`.
* **Pillar Hub Structures (`category: 'pillar'`):** Implement `CollectionPage` schemas paired with a rigid `BreadcrumbList` hierarchy mapping exact multi-tenant pathways: `Home > Pillar > Cluster > Article`.
* **Entity Linkage:** Utilize explicit `sameAs` targets inside author nodes, linking to credible external profiles (LinkedIn, professional author registries) to feed authority signals back into the engine.

---

## 5. GENERATIVE ENGINE OPTIMIZATION (GEO / LLMO Compliance)

AI crawlers synthesize data differently than classic reverse-index spiders. To ensure extraction, citations, and mentions by modern LLM engines, enforce the following structural frameworks:

* **Low-Density Semantic HTML:** Keep a strict structural-tag-to-text ratio. Ensure content lives inside `<article>`, `<section>`, and `<main>` containers. Avoid arbitrary nesting of unstructured `<div>` blocks.
* **Information Gain Framework:** Every core cluster and article MDX must lead with an executive semantic summary block (maximum 50 words) that directly resolves the user intent. AI engines scrap this point for quick inline citations.
* **Factual Anchor Point Formatting:** Data points, percentages, product metrics, or regulatory references must be emphasized using standard markdown strong tags (`bold`). Ensure external references map smoothly for crawler citation anchors.
* **Crawler Accessibility Rules:** The site-wide `robots.txt` configuration must remain open to non-traditional search entities. Ensure the following configurations are preserved:

```text
    User-agent: GPTBot
    Allow: /

    User-agent: PerplexityBot
    Allow: /

    User-agent: ClaudeBot
    Allow: /
    ```


## 6. AFFILIATE TRANSPARENCY & E-E-A-T AUDIT (US Market Compliance)
Strict enforcement of commercial transparency is mandatory for processing under US consumer protection standards (FTC) and search quality algorithms.

*   **Native Affiliate Disclosure Component:** A permanent, static Svelte 5 component (`AffiliateDisclosure.svelte`) must be globally hooked into the top of all article layout trees, rendering visibly above the fold and before the first outbound monetary call-to-action.
*   **Outbound Attribution Routing:** Implement programmatic filters or custom markdown links to force security parameters onto external vendor paths (ClickBank / Digistore24 hops). Every commercial link must strictly feature: `rel="noopener noreferrer nofollow sponsored"`.

