# Publisher Elite

> Category: Starter
> A modern, authoritative publisher platform for the US market. Editorial clarity meets
> conversion-optimized design. Purpose-built for native ad formats, affiliate content,
> and evidence-based wellness/health publishing.
>
> **Technical reference:** See [`DESIGN.md`](../../DESIGN.md) (root) for the full component
> catalog, token tables, responsive breakpoints, accessibility guide, and development workflow.
> This file is the **brand contract** for AI agents — visual identity, design decisions,
> and agent prompt rules.

## Visual Theme & Atmosphere
Authoritative yet approachable. Clean editorial foundation with strategic accent moments
that guide the reader toward conversion. Trust signals (badges, author bios, science-backed
data) are baked into the visual language. Think "men's health meets Wirecutter" — polished,
scannable, credible.

## Color Palette & Roles
- **Background (page):** `#FAFAFA`
- **Foreground (primary text):** `#111111`
- **Accent (primary):** `#6366F1` (indigo) — CTAs, links, primary actions, one hero accent per page
- **Accent (secondary):** `#84CC16` (lime) — success signals, badges, secondary accents
- **Accent (warm):** `#F59E0B` (amber) — warnings, star ratings, price highlights
- **Muted:** `#6B7280` — secondary text, captions, timestamps, metadata
- **Border:** `#E5E7EB` — dividers, card borders, inputs
- **Surface:** `#FFFFFF` — cards, modals, dropdowns, elevated panels
- **Success:** `#22C55E`, **Warning:** `#F59E0B`, **Error:** `#EF4444`, **Info:** `#3B82F6`

Never use pure black anywhere user-facing.

## Typography Rules
- **Display / headings (serif):** `'Playfair Display', Georgia, serif` — weight 600–700, for H1–H2,
  pull quotes, hero headlines. Conveys editorial authority.
- **Body (sans):** `'Inter', -apple-system, system-ui, sans-serif` — weight 400, for articles,
  product copy, UI labels. Optimized for readability at all sizes.
- **Mono:** `'JetBrains Mono', ui-monospace, monospace` — code, data, stats
- **Scale (px):** 12 · 14 · 16 · 18 · 20 · 24 · 32 · 40 · 48 · 64 · 80
- **Line-height:** 1.7 for body (articles), 1.5 for UI body, 1.2 for headings
- **Letter-spacing:** -0.02em for display ≥ 40px; -0.01em for H2–H3; normal elsewhere
- **Max measure (articles):** 70ch per line

## Component Stylings
- **Buttons:** 10px radius, 12px padding-block, 20px padding-inline. Primary = indigo fill,
  white label. Secondary = 1.5px border indigo, transparent fill. Size variants: sm/md/lg.
- **Cards:** white surface, 1px border, 14px radius, 24px internal padding.
  Elevated variant: shadow-md (y+4, blur 6, foreground at 8%). Interactive: hover lift 2px.
- **Inputs:** 1px border (border), 10px radius, 12px vertical padding, indigo border on focus
  with ring offset 2px. Error state: red border + red text.
- **Links:** indigo, no underline by default, underline on hover inside body text.
- **Badges:** pill shape, 6px horizontal padding, 2px vertical. Variants for affiliate disclosure,
  sponsored content, editor's pick, new, sale, and science-backed. See `AffiliateBadge` component.
- **Native ad cards:** visually integrated — same card radius, same typography scale as editorial
  cards, but with a subtle "Sponsored" badge. Never use ad-native styling (glow, animation,
  bright borders) that breaks editorial cohesion. See `NativeAd` component.
- **Article cards:** 16:9 hero image, metadata row (author · date · reading time), optional
  category badge and science/affiliate badge. Responsive grid or single-column. See `ArticleCard`.
- **Author bio:** avatar (or initial fallback), name, role, bio text, social links. See `AuthorBio`.
- **Comparison tables:** responsive table with feature rows, check/cross marks for booleans,
  CTA column per product. See `ComparisonTable`.
- **Testimonial carousel:** centered pull quote, author attribution, dot navigation,
  autoplay with pause-on-hover. See `TestimonialCarousel`.
- **Newsletter signup:** email input + CTA, inline success state, accessible labels. See `NewsletterSignup`.

## Layout Principles
- 12-column grid, 1200px max-width, 24px gutters. Full-width hero allowed.
- Article: single-column, max-width 720px (42rem), centered. Sidebar only for TOC on desktop.
- Hero: 50–70vh. Content top-biased. Never vertically centered.
- Sections: 96px top+bottom spacing desktop, 64px tablet, 40px phone.
- Whitespace is the primary separator. Dividers only between unrelated top-level sections.
- Native ad placements: after H2, between sections 3-4, and after the concluding paragraph.

## Depth & Elevation
Three levels:
- **Flat (0):** default page background, non-interactive cards.
- **Raised (1):** interactive cards, dropdowns, floating elements. 4px y-offset, 8px blur,
  foreground at 6% opacity.
- **Modal (2):** modals, mobile menus. 8px y-offset, 16px blur, foreground at 10% opacity.
No neumorphism, no glassmorphism except for the hero overlay.

## Do's and Don'ts
- ✅ Lead with editorial authority: serif headlines, quality whitespace, science-backed data viz.
- ✅ One accent element per page section.
- ✅ Trust signals visible: author photo + bio, dates, disclosure badges, citations.
- ✅ Native ads must match editorial card design exactly (only "Sponsored" badge differentiates).
- ❌ No gradients (except subtle hero background blends).
- ❌ No glowing elements, animated ads, or ad-clutter patterns.
- ❌ No drop shadows on inputs.
- ❌ No emojis in headlines (allowed in social proof).
- ❌ No more than 3 type sizes on one screen.
- ❌ No pure black (`#000000`) or pure white (`#FFFFFF`) backgrounds.

## Responsive Behavior
- **Desktop ≥ 1024px:** 12-col grid, side-by-side content+sidebar, full hero.
- **Tablet 640–1023px:** 8-col grid, 16px gutters, stacked layout, hero 60vh.
- **Phone < 640px:** 4-col grid, 12px gutters, single-column, hero 40vh, all padding -25%.

## Agent Prompt Guide
- When generating artifacts against this DESIGN.md, treat the editorial-ad balance as the core
  design constraint. Every page is both a reading experience and a conversion surface.
- Typography is the primary differentiator — serif for authority, sans for clarity.
- Native ads should be indistinguishable from editorial cards at a glance.
- Color tokens are non-negotiable. Do not invent new hex values.
- Prefer 1 hero + 4-6 body sections over longer pages. Shorter, scannable, authoritative.
- Trust is the conversion lever: show the author, show the data, show the disclosure.
- For full technical API docs (component props, breakpoints, tokens table), read `DESIGN.md` in the project root.
