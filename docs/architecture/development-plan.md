# AI Affiliate Factory — Development Plan

**Updated:** 2026-06-04
**Version:** 2026.1
**Status:** Active

---

## Datos clave del MVP

| Item | Valor |
|------|-------|
| **Brand** | Evergreen Vitality Labs |
| **Mercado** | USA / English |
| **Vertical** | Metabolic Wellness, Weight Wellness, Daily Energy |
| **Productos** | Product A (Coffee-based), Product B (Tea-based) |
| **Pilares** | 3: Metabolic Wellness, Daily Energy Optimization, Sustainable Healthy Habits |
| **Artículos** | 9 (3 por pilar) |
| **Quiz** | Metabolism Score Quiz |
| **Lead Magnet** | "7-Day Metabolic Reset" PDF |
| **Diseño** | Quiet Luxury Wellness Editorial |
| **Paleta** | Neutral + Green Wellness |
| **Tipografía** | Inter (sans-first), Source Serif (editorial accent) |
| **Breakpoints** | xs:320, sm:480, md:768, lg:1024, xl:1280, 2xl:1440 |
| **Performance** | Lighthouse Mobile 95+, CLS <0.05, LCP <2s, Initial JS <20KB |

---

## Fase 1: Fundación del Monorepo ✅

- [x] `package.json` — root con scripts dev/build/lint
- [x] `pnpm-workspace.yaml` — apps + packages
- [x] `turbo.json` — pipeline tasks
- [x] `tsconfig.base.json` — strict, paths, moduleResolution
- [x] `.gitignore` + `.editorconfig` + `.prettierrc` + `.prettierignore`
- [x] `pnpm install` + lock file (355 packages, Astro 6.4.4, Svelte 5.56.2, Tailwind v4)
- [x] Package.json validas para todos los workspaces (18 packages)
- [x] `apps/brand-x-us/astro.config.mjs` — Svelte 5, MDX, sitemap, Tailwind v4
- [x] `apps/brand-x-us/svelte.config.js` — runes mode
- [x] `apps/brand-x-us/tsconfig.json`
- [x] `apps/brand-x-us/tenant.config.ts` — Evergreen Vitality Labs
- [x] `apps/brand-x-us/src/styles/global.css` — Tailwind v4 + design tokens CSS
- [x] `apps/brand-x-us/src/layouts/Layout.astro`
- [x] `apps/brand-x-us/src/pages/index.astro`
- [x] `apps/brand-x-us/src/pages/404.astro`
- [x] `apps/brand-x-us/src/pages/robots.txt.ts`
- [x] `apps/brand-x-us/src/pages/rss.xml.ts`
- [x] `apps/brand-x-us/src/pages/sitemap.astro`
- [x] `apps/brand-x-us/public/favicon.svg`, `_headers`, `_redirects`
- [x] `astro check` — 0 errors, 0 warnings ✅
- [x] Migración: Tailwind → Native CSS + PostCSS + Autoprefixer + cssnano ✅
- [x] Migración: Biome lint/format + Prettier solo para .astro ✅
- [x] Git commit + push: `feat: bootstrap inicial AI Affiliate Factory` ✅

---

## Fase 2: Design Tokens ✅

- [x] `packages/design-tokens/package.json`
- [x] `packages/types/src/index.ts` — TenantConfig, SeoMeta, ContentStage, ArticleMeta, PillarMeta
- [x] `packages/design-tokens/src/tokens/color.json` — primitivas + semánticas (Green Wellness)
- [x] `packages/design-tokens/src/tokens/spacing.json` — scale 0-14
- [x] `packages/design-tokens/src/tokens/typography.json` — font families + scale + leading
- [x] `packages/design-tokens/src/tokens/motion.json` — duration + easing
- [x] `packages/design-tokens/src/tokens/radius.json` — xs-full
- [x] `packages/design-tokens/src/tokens/shadows.json` — xs-xl
- [x] `packages/design-tokens/src/tokens/z-index.json` — base-toast
- [x] `packages/design-tokens/src/tokens/layout.json` — container, prose, sidebar, gap
- [x] `packages/design-tokens/src/tokens/container.json`
- [x] `packages/design-tokens/src/tokens/breakpoints.json` — xs-2xl
- [x] `packages/design-tokens/src/tokens/color.json` ya implementado en CSS vía `tokens.css`
- [x] `packages/design-tokens/src/types/index.ts` — tipos TypeScript para tokens
- [x] `packages/design-tokens/src/index.ts` — re-export

---

## Fase 3: Core Design System (UI Kit) ✅

### 3.1 Atoms
- [x] Button (.astro, CVA variants: primary/secondary/ghost/link, sizes: sm/md/lg)
- [x] Badge (.astro, variants: default/success/warning/accent)
- [x] Text (.astro, variant/weight/color system con typography tokens)
- [x] Container (.astro, sizes: full/wide/default/narrow/prose)
- [x] Section (.astro, background + spacing variants, aria props)
- [x] ProgressBar (value 0-100, variant/size, aria progressbar)
- [x] AffiliateBadge (disclosure text, configurable)

### 3.2 Primitives + Composables
- [x] Sistema CVA (button.ts) sin clsx/tailwind-merge
- [ ] Primitives layout (pendiente)

### 3.3 Molecules
- [x] Card (.astro, slot-based: header/content/footer, variants: default/elevated/bordered/ghost)
- [x] Breadcrumb (.astro, prop-driven array)
- [x] ArticleCard (.astro, prop-driven, stage badges, image, metadata)
- [x] Alert (variant: info/success/warning/error, dismissible con vanilla JS)
- [x] AuthorBio (avatar, name, role, bio, optional href)
- [x] ComparisonTable (headers, rows, highlight cells, responsive)
- [x] ProductGrid (columns 2-4, card per product, star ratings, prices)

### 3.4 Organisms
- [x] HeroSection (.astro, rendering contract props, variants: default/centered/split)
- [x] CTASection (.astro, rendering contract props)
- [x] FeaturesGrid (icon, title, description, columns 2-4)
- [x] StatsGrid (value, label, prefix/suffix, columns 2-4)
- [x] TestimonialCarousel (vanilla JS, auto-rotate, prev/next, dots, pause-on-hover)
- [x] TableOfContents (nested sections, scroll-to anchor links)
- [x] NewsletterSignup (vanilla JS fetch submit, success/error messages)

### 3.5 Variants
- [x] CVA para Button (variants + sizes)

### 3.6 Contracts
- [x] Tipos exportados: HeroSectionProps, CTASectionProps, ArticleCardProps, BreadcrumbItem

---

## Fase 4: Layout System

- [ ] `packages/layouts/package.json`
- [ ] `packages/layouts/src/Layout.astro` (o Svelte)
- [ ] `packages/layouts/src/ArticleLayout.astro`
- [ ] `packages/layouts/src/PillarLayout.astro`
- [ ] `packages/layouts/src/index.ts`

---

## Fase 5: brand-x-us App

- [ ] `apps/brand-x-us/package.json` — astro, svelte, tailwind, mdx
- [ ] `apps/brand-x-us/astro.config.mjs` — Cloudflare, Svelte 5, MDX, sitemap
- [ ] `apps/brand-x-us/tsconfig.json`
- [ ] `apps/brand-x-us/svelte.config.js` — runes mode
- [ ] `apps/brand-x-us/tenant.config.ts` — Evergreen Vitality Labs
- [ ] `apps/brand-x-us/src/config/tenant.json`
- [ ] `apps/brand-x-us/src/styles/global.css` — Tailwind v4
- [ ] `apps/brand-x-us/src/styles/theme.css` — tokens CSS
- [ ] `apps/brand-x-us/src/layouts/Layout.astro`
- [ ] `apps/brand-x-us/src/layouts/ArticleLayout.astro`
- [ ] `apps/brand-x-us/src/layouts/PillarLayout.astro`
- [ ] `apps/brand-x-us/src/pages/index.astro` — Homepage completa
- [ ] `apps/brand-x-us/src/pages/404.astro`
- [ ] `apps/brand-x-us/src/pages/robots.txt.ts`
- [ ] `apps/brand-x-us/src/pages/rss.xml.ts`
- [ ] `apps/brand-x-us/src/pages/sitemap.astro`
- [ ] `apps/brand-x-us/wrangler.toml`

---

## Fase 6: Pillar + Cluster Content

### Schemas & Content
- [ ] `packages/schemas/package.json`
- [ ] `packages/schemas/src/index.ts` — Zod v4 schemas (Pillar, Article, LeadMagnet, Quiz)
- [ ] `packages/types/package.json`
- [ ] `packages/types/src/index.ts` — tipos compartidos
- [ ] `packages/content/package.json`
- [ ] `packages/content/src/index.ts` — content helpers
- [ ] `packages/seo/package.json`
- [ ] `packages/seo/src/index.ts` — JSON-LD, OG, sitemap helpers
- [ ] `apps/brand-x-us/src/content.config.ts`

### MDX Content (3 pillars, 9 articles, 1 lead magnet)
- [ ] Pillar 1: `metabolic-wellness.mdx`
- [ ] Pillar 2: `daily-energy-optimization.mdx`
- [ ] Pillar 3: `sustainable-healthy-habits.mdx`
- [ ] Article 1.1 (Metabolic Wellness)
- [ ] Article 1.2 (Metabolic Wellness)
- [ ] Article 1.3 (Metabolic Wellness)
- [ ] Article 2.1 (Daily Energy)
- [ ] Article 2.2 (Daily Energy)
- [ ] Article 2.3 (Daily Energy)
- [ ] Article 3.1 (Healthy Habits)
- [ ] Article 3.2 (Healthy Habits)
- [ ] Article 3.3 (Healthy Habits)
- [ ] Lead Magnet: `7-day-metabolic-reset.mdx`

### Pages dinámicas
- [ ] `[pillar]/index.astro`
- [ ] `[pillar]/[cluster]/[article].astro`
- [ ] `lead-magnets/[slug].astro`

---

## Fase 7: Quiz Funnel

- [ ] `packages/interactive/package.json`
- [ ] `packages/interactive/src/quiz/` — Quiz engine (Svelte 5)
- [ ] `packages/interactive/src/widgets/` — Widgets reutilizables
- [ ] `packages/interactive/src/index.ts`
- [ ] `apps/brand-x-us/src/pages/quiz/metabolism-quiz.astro`
- [ ] `apps/brand-x-us/src/islands/QuizWidget.svelte`
- [ ] Resultados → CTA + segmentación

---

## Fase 8: Lead Magnet + Thank You

- [ ] `apps/brand-x-us/src/pages/lead-magnets/[slug].astro`
- [ ] `apps/brand-x-us/src/pages/thank-you.astro`
- [ ] Email capture form (MailerLite API)
- [ ] `packages/interactive/src/forms/` — LeadForm, NewsletterSignup

---

## Fase 9: Analytics MVP

- [ ] `packages/analytics/package.json`
- [ ] `packages/analytics/src/index.ts` — first-party analytics
- [ ] `apps/brand-x-us/src/pages/api/track.ts`
- [ ] `apps/brand-x-us/src/pages/api/subscribe.ts`
- [ ] `apps/brand-x-us/src/pages/api/visits.ts`

---

## Fase 10: Performance + SEO/GEO Hardening

- [ ] Lighthouse audit (Mobile 95+)
- [ ] Schema.org JSON-LD en todas las páginas
- [ ] Sitemap XML + robots.txt + RSS validados
- [ ] Semantic HTML5 landmarks audit
- [ ] CLS < 0.05, LCP < 2s, JS < 20KB
- [ ] CSP headers

---

## Fase 11: GitHub + Infra Setup

- [ ] Commit final: `feat: MVP Evergreen Vitality Labs`
- [ ] Push a `origin/master`
- [ ] Cloudflare Pages setup (preview + production)
- [ ] `wrangler.toml` configurado
- [ ] CI pipelines: lint + typecheck (GitHub Actions)

---

## Referencias

- [MVP Implementation Plan](../deployment/MVP%20Implementation%20Plan.md)
- [System Architecture](../system-design/system-design.md)
- [Design System](../design-system/design-system.md)
