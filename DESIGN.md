# Design System — AI Affiliate Factory

## Architecture

```
Tokens (CSS custom properties)
  └── Atoms (Button, Badge, ProgressBar)
       └── Molecules (Card, Alert, Breadcrumb, Container, ProductGrid)
            └── Organisms (Hero, FeaturesGrid, StatsGrid, CTASection, TableOfContents)
                 └── Templates (PillarLayout, ArticleLayout)
                       └── Routes ([pillar]/[cluster]/[article], [pillar]/, /)
                            └── Tenants (theme.css overrides)
```

Each layer is **brand-agnostic**. Tenants override only CSS variables — no component code duplication.

---

## Responsive & Mobile-First Rules

### Target devices (USA 2026)

| Category | Devices | Viewport widths |
|---|---|---|
| Mobile | iPhone 14–17 (6.1″–6.9″), Galaxy S24/S25, Pixel 9/10 | 360px–430px |
| Tablet | iPad (10th gen+), iPad Pro 11″/13″ | 768px–1024px |
| Desktop | 1920×1080 (most common), 1366×768, 2560×1440 | 1024px+ |

### Breakpoints (mobile-first)

| Breakpoint | Min width | Columns | Container padding |
|---|---|---|---|
| `mobile` | 0px | 4 | 16px |
| `tablet` | 640px | 8 | 24px |
| `desktop` | 1024px | 12 | 32px |
| `wide` | 1280px | 12 | 48px (max-width 1280px) |

### Implementation in global.css

```css
@import "tailwindcss";

@theme {
  --breakpoint-tablet: 640px;
  --breakpoint-desktop: 1024px;
  --breakpoint-wide: 1280px;

  /* color tokens… */
}
```

### Mobile-first guidelines

- **Always design for smallest viewport first**, then add `tablet:` / `desktop:` overrides.
- **Touch targets**: minimum 44×44px. Use `min-h-11` on interactive elements.
- **Safe areas**: use `env(safe-area-inset-top)` for notched devices.
- **Typography**: fluid with `clamp()` — see Fluid Typography section below.
- **Images**: `aspect-ratio` + `object-cover` to prevent layout shift (CLS).
- **No horizontal overflow**: `max-width: 100vw` + `overflow-x: hidden` on `body`.

---

## Design Tokens

### Color tokens (`@theme` in `global.css`)

Defined via Tailwind v4 `@theme` directive. Generates utility classes automatically:
`bg-primary`, `text-primary-dark`, `border-info/20`, `hover:bg-secondary`, etc.

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | Indigo 500 | Buttons, links, accents |
| `--color-primary-dark` | Indigo 600 | Hover states |
| `--color-primary-light` | Indigo 300 | Dark mode variants |
| `--color-secondary` | Lime 500 | Secondary actions |
| `--color-secondary-dark` | Lime 600 | Hover states |
| `--color-accent` | Amber 500 | Highlight / CTA |
| `--color-accent-dark` | Amber 600 | Hover states |
| `--color-success` | Green 500 | Positive feedback |
| `--color-success-dark` | Green 600 | Alert text (light mode) |
| `--color-warning` | Amber 500 | Warning feedback |
| `--color-warning-dark` | Amber 600 | Alert text (light mode) |
| `--color-error` | Red 500 | Error feedback |
| `--color-error-dark` | Red 600 | Alert text (light mode) |
| `--color-info` | Blue 500 | Informational feedback |
| `--color-info-dark` | Blue 600 | Alert text (light mode) |

### Design tokens package (`packages/design-tokens-base/`)

- `css/tokens.css` — non-color tokens: typography, spacing, borders, shadows, glassmorphism
- `json/tokens.json` — structured token data for tooling (Spacing, Border, Shadow)

### Tenant overrides

Each tenant creates a `theme.css` that imports `tokens.css` and overrides specific tokens:

```css
@import "../../../../packages/design-tokens-base/css/tokens.css";

:root {
  --color-primary: #6366f1;        /* Indigo */
  --color-secondary: #84cc16;      /* Lime */
  --color-bg: #fafafa;
  --color-bg-dark: #0a0a0f;
}
```

---

## Fluid Typography

Defined via `@theme` in `global.css`. Generates Tailwind utilities: `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-body-lg`, `text-body`.

```css
@theme {
  --font-size-display: clamp(2.5rem, 6vw, 4.5rem);
  --font-size-h1: clamp(2.25rem, 5vw, 4rem);
  --font-size-h2: clamp(1.75rem, 4vw, 3rem);
  --font-size-h3: clamp(1.5rem, 3vw, 2.25rem);
  --font-size-body-lg: clamp(1.125rem, 2vw, 1.25rem);
  --font-size-body: clamp(1rem, 1.5vw, 1.125rem);
}
```

| Utility | Min | Preferred | Max | Use case |
|---|---|---|---|---|
| `text-display` | 2.5rem (40px) | 6vw | 4.5rem (72px) | Hero headlines |
| `text-h1` | 2.25rem (36px) | 5vw | 4rem (64px) | Page titles |
| `text-h2` | 1.75rem (28px) | 4vw | 3rem (48px) | Section headings |
| `text-h3` | 1.5rem (24px) | 3vw | 2.25rem (36px) | Subheadings |
| `text-body-lg` | 1.125rem (18px) | 2vw | 1.25rem (20px) | Lead text |
| `text-body` | 1rem (16px) | 1.5vw | 1.125rem (18px) | Body text |

---

## Content Routing

The site uses Astro content collections with two collections:

- **`pillars`** — top-level content topics (e.g., `coffee-wellness`)
- **`articles`** — individual MDX entries with frontmatter: `pillar`, `cluster`, `stage` (tofu/mofu/bofu), `order`, `tags`

Routes are generated via `getStaticPaths()`:

```
/                                   → index.astro (TOFU landing + pillar nav)
/[pillar]/                          → PillarLayout (article grid grouped by cluster)
/[pillar]/[cluster]/[article]/      → ArticleLayout (breadcrumb, TOC, content, CTA)
```

---

## Performance & Compatibility (USA 2026)

| Requirement | Implementation |
|---|---|
| CLS < 0.1 | All images have `width`/`height` or `aspect-ratio`. No injected content without reserved space. |
| LCP < 2.5s | Hero images preloaded with `fetchpriority="high"`. Fonts self-hosted with `font-display: swap`. |
| Touch targets | Minimum 44×44px for all interactive elements (`min-h-11`). |
| Safe areas | Use `env(safe-area-inset-*)` for notched devices. |
| Browser support | Chrome 120+, Safari 16.5+, Firefox 115+, Edge 120+. No IE / legacy. |
| CSS animations | Prefer `transform`/`opacity`. Respect `prefers-reduced-motion`. Limit `backdrop-filter`. |
| Static HTML | All content pages are fully static HTML. Only TOC scrollspy uses Svelte island. |

---

## Accessibility (WCAG 2.1 AA)

- **Color contrast**: minimum 4.5:1 for normal text, 3:1 for large text (≥18.66px bold or ≥24px).
- **Focus indicators**: visible `outline` or `ring` on `:focus-visible` (not `:focus`).
- **Semantic HTML**: use `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` correctly.
- **ARIA**: `aria-label` on icon-only buttons, `role="alert"` on alerts, `aria-current="page"` on breadcrumb last item.
- **Motion**: `@media (prefers-reduced-motion: reduce)` disables animations.
- **Skip link**: hidden "Skip to content" link as first focusable element.
- **Screen readers**: all icons hidden with `aria-hidden="true"` unless essential.

---

## Component Catalog

All components use **Svelte 5** (`$props()` runes, `{@render children()}` snippets),
**CVA** (class-variance-authority) for variant management, and the **`cn()` utility**
(clsx + tailwind-merge) for class merging.

### Utility

#### `cn()`

```js
import { cn } from 'design-system-base';

cn('base-class', conditional && 'active', 'extra-class')
// → "base-class active extra-class" (conflicts resolved via tailwind-merge)
```

### Atoms

#### Button

```svelte
<Button variant="primary" size="md" disabled={false} href="#">Label</Button>
```

| Prop | Type | Default | Options |
|---|---|---|---|
| `variant` | string | `'primary'` | `primary`, `secondary`, `ghost`, `outline`, `link` |
| `size` | string | `'md'` | `sm` (32px), `md` (44px), `lg` (52px) |
| `disabled` | boolean | `false` | |
| `href` | string | `''` | renders `<a>` when set, `<button>` otherwise |
| `class` | string | `''` | merged via `cn()` — consumer overrides win |

> **Note:** `size="sm"` (32px) should only be used where touch target is not required (e.g., desktop-only toolbars). For mobile, use `size="md"` (44px) minimum.

#### Badge

```svelte
<Badge variant="success" size="sm">Active</Badge>
```

| Prop | Type | Default | Options |
|---|---|---|---|
| `variant` | string | `'default'` | `default`, `success`, `warning`, `error`, `info`, `accent` |
| `size` | string | `'md'` | `sm`, `md` |
| `class` | string | `''` | |

#### ProgressBar

```svelte
<ProgressBar value={75} label="Progress" variant="primary" size="md" animated />
```

| Prop | Type | Default | Options |
|---|---|---|---|
| `value` | number | `0` | 0–`max` |
| `max` | number | `100` | |
| `label` | string | `''` | shows label row when set |
| `variant` | string | `'primary'` | `primary`, `success`, `warning`, `error`, `info`, `accent` |
| `size` | string | `'md'` | `sm`, `md`, `lg` |
| `showLabel` | boolean | `true` | |
| `animated` | boolean | `false` | adds `animate-pulse` |
| `class` | string | `''` | |

### Molecules

#### Card

```svelte
<Card variant="elevated" title="Optional Title">content</Card>
```

| Prop | Type | Default | Options |
|---|---|---|---|
| `variant` | string | `'default'` | `default` (soft shadow), `elevated` (deep shadow), `bordered` (outline), `glass` (glassmorphism), `interactive` (hover lift + shadow) |
| `title` | string | `''` | shows header row when set |
| `class` | string | `''` | |

#### Alert

```svelte
<Alert variant="info" title="Notice" icon dismissible>Message</Alert>
```

| Prop | Type | Default | Options |
|---|---|---|---|
| `variant` | string | `'info'` | `info`, `success`, `warning`, `error` |
| `title` | string | `''` | bold header |
| `icon` | boolean | `false` | shows semantic SVG icon |
| `dismissible` | boolean | `false` | shows close button |
| `class` | string | `''` | |

#### Breadcrumb

```svelte
<Breadcrumb items={[
  { label: 'Home', href: '/' },
  { label: 'Current Page' },
]} />
```

| Prop | Type | Default | Options |
|---|---|---|---|
| `items` | array | `[]` | `{ label: string, href?: string }[]` |
| `separator` | string | `'/'` | |
| `class` | string | `''` | |

#### Container

```svelte
<Container class="py-8">Content</Container>
```

| Prop | Type | Default | Options |
|---|---|---|---|
| `class` | string | `''` | merged via `cn()` |

A simple centered wrapper: `mx-auto w-full max-w-7xl` with responsive horizontal padding (`px-4 tablet:px-6 desktop:px-8`). No nested Container inside Container.

### Organisms

#### Hero

```svelte
<Hero
  title="Headline"
  subtitle="Supporting text"
  primaryCta={{ label: 'Start', href: '#' }}
  secondaryCta={{ label: 'Learn more', href: '#' }}
  variant="gradient"
/>
```

| Prop | Type | Default | Options |
|---|---|---|---|
| `title` | string | `''` | |
| `subtitle` | string | `''` | |
| `primaryCta` | object | `{ label: 'Start', href: '#' }` | |
| `secondaryCta` | object | `null` | |
| `variant` | string | `'default'` | `default`, `gradient`, `glass` |
| `class` | string | `''` | |

#### FeaturesGrid

```svelte
<FeaturesGrid
  title="Features"
  subtitle="What we offer"
  features={[{ icon: '<svg>...</svg>', title: 'Feature', description: '...' }]}
  columns={{ base: 1, md: 2, lg: 3 }}
/>
```

| Prop | Type | Default | Options |
|---|---|---|---|
| `title` | string | `''` | |
| `subtitle` | string | `''` | |
| `features` | array | `[]` | `{ icon?: string, title: string, description: string }[]` |
| `columns` | object | `{ base: 1, md: 2, lg: 3 }` | responsive: `{ base, sm, md, lg, xl }` |
| `class` | string | `''` | |

#### StatsGrid

```svelte
<StatsGrid
  stats={[{ value: '99%', label: 'Uptime' }]}
  columns={{ base: 2, md: 4 }}
  variant="gradient"
/>
```

| Prop | Type | Default | Options |
|---|---|---|---|
| `stats` | array | `[]` | `{ value: string, label: string }[]` |
| `columns` | object | `{ base: 2, md: 4 }` | responsive: `{ base, sm, md, lg, xl }` |
| `variant` | string | `'default'` | `default`, `gradient`, `accent` |
| `class` | string | `''` | |

#### CTASection

```svelte
<CTASection
  title="Ready?"
  subtitle="Get started today"
  cta={{ label: 'Start', href: '#' }}
  variant="glass"
/>
```

| Prop | Type | Default | Options |
|---|---|---|---|
| `title` | string | `''` | |
| `subtitle` | string | `''` | |
| `cta` | object | `{ label: 'Get Started', href: '#' }` | |
| `variant` | string | `'glass'` | `glass`, `gradient` |
| `class` | string | `''` | |

#### TableOfContents (TOC)

```svelte
<TableOfContents headings={[
  { depth: 2, slug: 'introduction', text: 'Introduction' },
  { depth: 3, slug: 'details', text: 'Details' },
]} />
```

| Prop | Type | Default | Options |
|---|---|---|---|
| `headings` | array | `[]` | `{ depth: number, slug: string, text: string }[]` |
| `title` | string | `'Table of Contents'` | |
| `class` | string | `''` | |

**Behaviour:**
- **Mobile**: renders as collapsible accordion (starts open). Toggle button with chevron indicator.
- **Tablet/Desktop**: sticky navigation. Highlights active section via `IntersectionObserver` (Svelte island, client:load).
- **Smooth scroll**: target sections use `scroll-margin-top: 80px` to account for sticky header.

#### ProductGrid

```svelte
<ProductGrid products={[
  { title: 'Java Burn', description: '...', image: '...', badge: 'Best Seller', price: '69', cta: { label: 'Buy Now', href: '...' } },
]} />
```

| Prop | Type | Default | Options |
|---|---|---|---|
| `products` | array | `[]` | `{ title, description, image?, badge?, price?, compareAtPrice?, cta? }[]` |
| `class` | string | `''` | |

Grid of product cards (image, badge, title, description, pricing, CTA button). First product gets `elevated` card variant.

---

## Dark Mode

### Strategy: class toggle (native detection + persistence)

A blocking `<script is:inline>` in `<head>` applies `.dark` to `<html>` before first paint:

```html
<script is:inline>
  (function() {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  })();
</script>
```

### Implementation rules

- Components use `dark:` variants: `bg-white dark:bg-gray-800`
- `.dark` class on `<html>` — set inline before paint to prevent flash
- Persisted to `localStorage` for user preference across sessions
- All interactive elements respect both the media query AND the class toggle

---

## Theming (per tenant)

1. Create a new app directory under `apps/`
2. Create `src/styles/theme.css` that imports `tokens.css` and overrides colors
3. The `@theme` block in `global.css` sets defaults; `theme.css` overrides at runtime via CSS cascade

```css
/* apps/my-brand/src/styles/theme.css */
@import "../../../../packages/design-tokens-base/css/tokens.css";

:root {
  --color-primary: #dc2626;      /* Red brand */
  --color-secondary: #2563eb;    /* Blue brand */
  --color-bg: #fef2f2;
}
```

---

## Convention: class overrides

All components accept a `class` prop merged via `cn()`:

```svelte
<!-- Consumer can override ANY utility -->
<Button class="bg-red-500 hover:bg-red-700 text-xs">Custom</Button>
```

`tailwind-merge` resolves conflicts: `bg-red-500` replaces `bg-primary`.

---

## Development

### Adding a new component

1. Create file under `packages/design-system-base/src/components/{atoms,molecules,organisms}/`
2. Use `$props()` + CVA + `cn()`
3. Export from `index.js`
4. Add types to `index.d.ts`
5. Use in any tenant via `import { Component } from 'design-system-base'`

### Component checklist

- [ ] Responsive: mobile-first with `tablet:` / `desktop:` breakpoints
- [ ] Touch target: minimum 44×44px on interactive elements
- [ ] Dark mode: `dark:` variants for all surfaces and text
- [ ] Class override: `class` prop merged via `cn()`
- [ ] Accessibility: semantic element, `aria-*` attributes, focus management
- [ ] Motion: no animations without `prefers-reduced-motion` respect

### Stack requirements

- pnpm 11.3+
- Astro 6 + Svelte 5
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- `class-variance-authority` ^0.7
- `clsx` ^2.1
- `tailwind-merge` ^3.2

---

## Roadmap (design system)

### ✅ Implemented
- Design tokens (CSS variables + `@theme`)
- Responsive breakpoints: `tablet` (640px), `desktop` (1024px), `wide` (1280px)
- Fluid typography with `clamp()` (display, h1–h3, body)
- Dark mode class toggle with `localStorage` persistence + `prefers-color-scheme`
- Atoms: Button (5 variants × 3 sizes, 44px touch target), Badge (6 variants), ProgressBar
- Molecules: Card (5 variants), Alert (4 variants + icon/dismiss), Breadcrumb, Container, ProductGrid
- Organisms: Hero (3 variants), FeaturesGrid (responsive columns), StatsGrid, CTASection, TableOfContents (scrollspy + accordion)
- Templates: PillarLayout (article grid + stage badges), ArticleLayout (breadcrumb + TOC + CTA)
- Content collections: `pillars` + `articles` with Zod schemas
- Routes: `[pillar]/[cluster]/[article]`, `[pillar]/index`, `/` (TOFU landing)
- 3 MDX articles: TOFU (Awareness), MOFU (Consideration), BOFU (Decision + affiliate disclaimer)
- CVA + `cn()` utility
- Brand-agnostic theming (per-tenant `theme.css` overrides)

### 🚧 Pending
- [ ] WCAG 2.1 AA audit (tool: axe DevTools)
- [ ] Storybook / Astro component browser
- [ ] Visual regression tests (Chromatic)
- [ ] Keystatic CMS integration
- [ ] Pydantic DAG content generation
- [ ] FalkorDB knowledge graph
- [ ] D1 ETL worker
