# AI-Native Semantic Rendering Design System

## Technical & Operational Specification

### Version
2026.1

### Target Stack

- Astro 6.x
- Native CSS
- PostCSS
- Autoprefixer
- cssnano
- TypeScript 5.x
- Svelte 5
- CVA
- pnpm workspace
- Turborepo
- Cloudflare Pages
- Cloudflare Workers
- HTML5 Semantic Rendering
- Multi-Tenant AI-Native Publishing Platform

---

# 1. Purpose

This document defines the official Semantic Rendering Design System architecture for the AI-native publishing ecosystem.

The Design System is not a visual component library only.

It is the rendering contract infrastructure responsible for:

- semantic rendering
- accessibility
- responsive behavior
- visual consistency
- performance enforcement
- tenant theming
- AI-composable UI
- semantic HTML output
- SEO/GEO optimization
- rendering determinism

---

# 2. Core Design Principles

## 2.1 Semantic-First Rendering

All components MUST produce semantic HTML5.

Required semantic elements:

```html
<header>
<nav>
<main>
<article>
<section>
<aside>
<footer>
```

Forbidden:

- generic div-only structures
- inaccessible interactive elements
- heading misuse
- non-semantic wrappers without purpose

---

## 2.2 Zero Hardcoded Content Rule

STRICT RULE:

NO COMPONENT MAY CONTAIN STATIC CONTENT.

Forbidden:

```tsx
<h2>Best Protein Powder</h2>
```

Required:

```tsx
<h2>{title}</h2>
```

All content MUST originate from:

- MDX
- rendering contracts
- tenant configuration
- AI workflows
- structured JSON
- CMS adapters

---

## 2.3 Token-Driven Rendering

All visual values MUST come from tokens.

Forbidden:

```css
padding: 17px;
color: #0f172a;
```

Required:

```css
padding: var(--space-4);
color: var(--color-text-primary);
```

---

## 2.4 Mobile-First Architecture

All components MUST be authored mobile-first.

Required baseline:

```text
320px → 480px → 768px → 1024px → 1280px → 1440px+
```

Desktop-first CSS is forbidden.

---

## 2.5 Performance-First Rendering

The Design System MUST optimize for:

- LCP
- CLS
- INP
- TTFB
- hydration minimization
- low JS execution
- edge rendering

Target metrics:

| Metric | Target |
|---|---|
| Lighthouse Mobile | 95+ |
| Initial JS | <20KB |
| Critical CSS | <50KB |
| CLS | <0.05 |
| LCP | <2s |

---

## 2.6 Accessibility-First

WCAG AA minimum compliance is mandatory.

Required:

- keyboard navigation
- focus-visible states
- reduced motion support
- semantic landmarks
- accessible forms
- aria compliance
- contrast validation

---

## 2.7 AI-Composable UI

Components MUST be:

- deterministic
- serializable
- schema-driven
- variant-driven
- slot-based
- AI-composable

The AI system NEVER generates HTML directly.

The AI system generates rendering contracts.

---

# 3. Monorepo Architecture

```text
/packages
  /design-tokens
  /ui
  /layouts
  /content
  /interactive
  /icons
  /seo
  /analytics
  /ads
  /utils
```

---

# 4. Design Tokens

## 4.1 Token Philosophy

Tokens are the single source of truth for:

- visual identity
- spacing
- responsive behavior
- typography
- elevation
- motion
- semantic surfaces

---

## 4.2 Token Categories

Required categories:

```text
color
spacing
typography
radius
shadow
z-index
motion
opacity
layout
container
breakpoint
grid
border
aspect-ratio
transition
elevation
```

---

## 4.3 Token Layers

### Primitive Tokens

```css
--color-blue-500
--space-4
--radius-md
```

### Semantic Tokens

```css
--surface-primary
--text-muted
--border-subtle
--cta-primary
```

### Component Tokens

```css
--card-padding
--hero-max-width
```

---

## 4.4 Color Token System

### Primitive Palette

```json
{
  "blue": {
    "50": "#eff6ff",
    "100": "#dbeafe",
    "500": "#2563eb",
    "700": "#1d4ed8",
    "900": "#1e3a8a"
  }
}
```

### Semantic Tokens

```css
--color-text-primary
--color-text-secondary
--color-surface-primary
--color-surface-elevated
--color-border-subtle
--color-cta-primary
--color-success
--color-warning
--color-danger
```

---

## 4.5 Spacing Tokens

Mandatory spacing scale:

```text
2
4
8
12
16
20
24
32
40
48
64
80
96
128
```

---

## 4.6 Typography System

### Typography Scale

```text
display
headline
title
body
caption
label
micro
```

### Font Families

Sans:

```css
Inter, system-ui, sans-serif
```

Serif:

```css
"Source Serif", Georgia, serif
```

### Fluid Typography

All typography MUST use:

```css
clamp()
```

Example:

```css
font-size: clamp(1rem, 2vw, 1.25rem);
```

---

## 4.7 Radius Tokens

```css
--radius-xs
--radius-sm
--radius-md
--radius-lg
--radius-xl
--radius-full
```

---

## 4.8 Shadow Tokens

```css
--shadow-xs
--shadow-sm
--shadow-md
--shadow-lg
```

---

## 4.9 Z-Index Tokens

```css
--z-base
--z-dropdown
--z-sticky
--z-modal
--z-toast
```

---

## 4.10 Motion Tokens

```css
--duration-fast
--duration-normal
--duration-slow

--ease-standard
--ease-emphasized
```

Only animate:

- transform
- opacity

Never animate:

- width
- height
- top
- left

---

# 5. Responsive System

## 5.1 Breakpoints

```text
xs: 320
sm: 480
md: 768
lg: 1024
xl: 1280
2xl: 1440
```

---

## 5.2 Required CSS Features

Mandatory:

- CSS Grid
- Flexbox
- clamp()
- min()
- max()
- calc()
- aspect-ratio
- object-fit
- logical properties
- content-visibility
- contain
- line-clamp
- scroll-margin-top

---

## 5.3 Browser Compatibility

Required compatibility:

```text
>=98% modern browser compatibility
```

Target:

- Chrome
- Safari
- Edge
- Firefox
- iOS Safari
- Android Chrome

---

# 6. Atomic Design System

## 6.1 Atomic Hierarchy

```text
atoms
molecules
organisms
templates
pages
```

---

## 6.2 Atoms

- Button
- Input
- Label
- Text
- Heading
- Badge
- Icon

---

## 6.3 Molecules

- ArticleCard
- AuthorMeta
- NewsletterForm
- QuizOption
- CTAGroup

---

## 6.4 Organisms

- HeroSection
- ArticleGrid
- SidebarCTA
- FAQSection
- QuizFlow

---

## 6.5 Templates

- ArticleTemplate
- PillarTemplate
- LandingTemplate
- QuizTemplate

---

# 7. Component Contracts

## 7.1 Component Requirements

All components MUST be:

- semantic
- prop-driven
- slot-based
- typed
- variant-driven
- accessible
- token-driven

---

## 7.2 CVA Rules

CVA controls ONLY:

- variants
- sizes
- states
- themes

CVA must NOT contain business logic.

---

## 7.3 Slot Architecture

```astro
<Card>
  <slot name="header" />
  <slot name="content" />
  <slot name="footer" />
</Card>
```

---

# 8. Content Primitives

Required primitives:

```text
ArticleBody
RichText
TOC
FAQBlock
ComparisonTable
AffiliateBox
QuoteBlock
Callout
LeadMagnet
QuizBlock
```

---

# 9. SEO & GEO Requirements

## 9.1 Semantic HTML Output

The final rendered output MUST produce:

- valid HTML5
- semantic hierarchy
- crawlable content
- machine-readable structure

---

## 9.2 Structured Data

Required support:

- JSON-LD
- schema.org
- FAQ schema
- article schema
- breadcrumb schema
- review schema

---

## 9.3 GEO Optimization

The system MUST optimize for:

- AI search
- LLM ingestion
- vector indexing
- semantic extraction

Required:

- clean DOM
- semantic chunking
- entity metadata
- structured sections

---

# 10. Interactive Islands

## 10.1 Svelte Usage Policy

Svelte 5 is allowed ONLY for:

- quizzes
- calculators
- filters
- dynamic forms
- interactive widgets

---

## 10.2 Hydration Rules

Hydration must remain isolated.

Global hydration is forbidden.

---

## 10.3 Vanilla JS Usage

Vanilla JS preferred for:

- menus
- accordions
- tabs
- lightweight interactions

---

# 11. Multi-Tenant Theming

## 11.1 Tenant Overrides

Tenant overrides allowed ONLY through:

- tokens
- themes
- variants

Tenants may NOT override:

- semantic structure
- accessibility rules
- responsive contracts
- rendering guarantees

---

# 12. Analytics Integration

## 12.1 First-Party Analytics Hooks

Components may expose:

```ts
analyticsId
trackingLabel
trackingContext
```

No third-party analytics hardcoded.

---

## 12.2 Event Strategy

```text
client
→ edge worker
→ analytics pipeline
```

---

# 13. Performance Enforcement

Mandatory:

- lazy loading
- responsive images
- zero CLS
- async decoding
- minimal hydration
- code splitting

Required image attributes:

```html
loading="lazy"
decoding="async"
```

Preferred image formats:

- AVIF
- WebP

---

# 14. Accessibility Requirements

Mandatory:

- keyboard support
- focus-visible
- aria labels
- semantic landmarks
- reduced motion support

Required support:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 15. AI Rendering Contracts

The AI system MUST generate structured rendering contracts.

Forbidden:

```html
<div class="hero">
```

Required:

```json
{
  "component": "Hero",
  "variant": "affiliate",
  "props": {}
}
```

---

# 16. Implementation Phases

## Phase 1 — Foundations

Deliverables:

- token architecture
- CSS layers
- typography system
- spacing system
- semantic base styles
- reset layer

---

## Phase 2 — Atomic Components

Deliverables:

- atoms
- molecules
- CVA architecture
- accessibility enforcement

---

## Phase 3 — Content System

Deliverables:

- article primitives
- MDX rendering
- SEO blocks
- schema support

---

## Phase 4 — Layout System

Deliverables:

- templates
- grids
- responsive containers
- editorial layouts

---

## Phase 5 — Interactive Islands

Deliverables:

- quiz system
- calculators
- interactive widgets

---

## Phase 6 — Multi-Tenant Theming

Deliverables:

- tenant tokens
- theme overrides
- variant orchestration

---

## Phase 7 — Performance Hardening

Deliverables:

- CSS optimization
- hydration audits
- Lighthouse optimization
- bundle analysis

---

## Phase 8 — AI Rendering Contracts

Deliverables:

- schema-driven rendering
- component registries
- rendering contracts
- AI composition validation

---

# 17. Final Principle

This Design System is NOT a UI kit.

It is a:

# Semantic AI Rendering Infrastructure

designed for:

- AI-native publishing
- semantic web rendering
- GEO optimization
- multi-tenant orchestration
- edge-native deployment
- performance-first UX
- structured content ecosystems
- future AI-driven composition systems
