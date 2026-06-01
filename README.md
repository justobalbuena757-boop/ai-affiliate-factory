```markdown
# AI-Affiliate-Factory

**Multi‑tenant affiliate marketing platform** powered by an intelligent content generator (Pydantic Graph) and a high‑performance static frontend (Astro + Tailwind + Svelte).  
Built as a monorepo with Turborepo, pnpm, and uv – ready for edge deployment on Cloudflare and graph‑based knowledge storage in FalkorDB.

---

## 🚀 Overview

AI-Affiliate-Factory automates the entire content funnel:

- **TOFU** – Blog pillars/clusters, quizzes, lead magnets  
- **MOFU** – In‑depth articles, comparisons, email capture  
- **BOFU** – Affiliate product pages, reviews, call‑to‑action  

Content is generated as Markdown/MDX by a **Pydantic‑orchestrated DAG**, reviewed through a Git‑based CMS (Keystatic + GitHub PRs), and finally rendered as a static site on **Cloudflare Pages** with impeccable Core Web Vitals.

Every tenant (brand, niche, or client) inherits a shared **design system** (tokens + atomic Svelte components) but can override colours, typography, and even add custom components – without duplicating code.

---

## 🧱 Technology Stack

| Layer                | Tools                                                                                     |
|----------------------|-------------------------------------------------------------------------------------------|
| **Monorepo**         | Turborepo, pnpm, uv                                                                       |
| **Frontend**         | Astro 6, Tailwind CSS 4, Svelte 5, TypeScript 5, Zod                                      |
| **Content generation**| Python 3.13, Pydantic (models + graph), MDX, JSON                                        |
| **CMS & workflow**   | Keystatic (local UI), GitHub (PR approval), GitHub Actions (CI/CD)                        |
| **Hosting & edge**   | Cloudflare Pages, Cloudflare Workers (scheduled ETL), D1 (tracking)                       |
| **Knowledge graph**  | FalkorDB (graph database for BI, recommendations, and RAG)                               |
| **Quality**          | ESLint, Prettier, Vitest, Playwright, Chromatic (visual regression)                      |

---

## 📁 Repository Structure (Monorepo)

```text
ai-affiliate-factory/
├── apps/
│   └── brand-template/               # Tenant starter
│       ├── astro.config.mjs
│       ├── package.json
│       ├── src/
│       │   ├── content.config.ts      # Content collections (pillars + articles)
│       │   ├── content/               # MDX files organized by pillar/cluster
│       │   │   ├── pillars/
│       │   │   │   └── coffee-wellness.mdx
│       │   │   └── articles/
│       │   │       └── coffee-wellness/coffee-metabolism/
│       │   │           ├── article-1-tofu.mdx
│       │   │           ├── article-2-mofu.mdx
│       │   │           └── article-3-bofu.mdx
│       │   ├── layouts/              # Layout.astro, PillarLayout, ArticleLayout
│       │   ├── pages/                # index.astro, [pillar]/, [pillar]/[cluster]/[article]/
│       │   └── styles/               # global.css (tailwind + @theme), theme.css
│       └── tsconfig.json
├── packages/
│   ├── design-tokens-base/           # CSS variables + JSON tokens
│   └── design-system-base/           # Svelte 5 components (12 total)
├── DESIGN.md                         # Design system documentation
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

---

## 🎨 Design System

The platform uses a **professional atomic design system** — see [`DESIGN.md`](./DESIGN.md) for the full catalog.

**Implemented:**
- **Atoms**: Button (5 variants × 3 sizes, 44px touch target), Badge (6 semantic variants), ProgressBar
- **Molecules**: Card (5 variants), Alert (4 variants + dismissible + icons), Breadcrumb, Container, ProductGrid
- **Organisms**: Hero (3 variants), FeaturesGrid (responsive columns), StatsGrid, CTASection, TableOfContents (scrollspy + accordion)
- **Templates**: PillarLayout (article grid grouped by cluster), ArticleLayout (breadcrumb + TOC + CTA)
- **Content routing**: `[pillar]/[cluster]/[article]` via content collections + `getStaticPaths()`
- **Demo content**: 3 MDX articles (coffee-wellness/coffee-metabolism) — TOFU/MOFU/BOFU funnel
- **CVA + `cn()`**: All components use `class-variance-authority` + `clsx` + `tailwind-merge`
- **Brand-agnostic**: Tokens via `@theme` in `global.css`, overridable per tenant in `theme.css`
- **Dark mode**: Class toggle with `localStorage` persistence + `prefers-color-scheme`

---

## 🔄 Content Workflow (Draft → Approved → Live)

1. **Editor** writes/edits content locally using **Keystatic** (UI over files).  
2. Changes are pushed to a **feature branch** → GitHub Pull Request.  
3. **GitHub Actions** runs the **Pydantic Graph** (optional: auto‑generate missing sections).  
4. The PR preview is deployed to **Cloudflare Pages branch preview** for review.  
5. After approval, merging to `main` triggers the final production build.  

> **Note**: Phase 1 works with manually written MDX. Phase 3 adds the Pydantic Graph to generate content from prompts/LLM.

---

## 📦 Getting Started (Local Development)

```bash
# Clone the repository
git clone https://github.com/your-org/ai-affiliate-factory.git
cd ai-affiliate-factory

# Install Node.js dependencies (pnpm)
pnpm install

# (Optional) Install Python dependencies if you start working on the generator
uv sync

# Run the brand-template tenant in dev mode
pnpm dev --filter brand-template

# Build everything
pnpm build
```

Visit `http://localhost:4321` to see the Metabolic+40 demo site.

---

## 🧠 Knowledge Graph & Tracking

- **Tracking events** (clicks, conversions, quiz results) are sent from the frontend to **Cloudflare D1**.  
- A **scheduled Worker** (cron) daily extracts, transforms, and loads aggregated data into **FalkorDB**.  
- FalkorDB stores relationships between:  
  - Articles, products, quizzes, lead magnets  
  - User sessions (anonymised), conversions, affiliate clicks  
- This graph feeds **business intelligence dashboards** and **recommendation models** (GraphRAG) for funnel optimisation.

---

## 🔮 Future Roadmap

- [x] Monorepo structure + brand template  
- [x] Design system: 12 atomic components (Svelte 5, CVA, cn) + fluid typography  
- [x] Content routing: `[pillar]/[cluster]/[article].astro` + content collections  
- [x] Demo content: Metabolic +40 funnel (Java Burn affiliate, 3 articles TOFU/MOFU/BOFU)  
- [ ] Pydantic Graph content generation (DAG, LLM integration)  
- [ ] Keystatic + GitHub PR approval automation  
- [ ] FalkorDB ETL worker (Cloudflare → FalkorDB)  
- [ ] Multi‑tenant dashboard for analytics and A/B testing  

---

## 📄 License

Proprietary – all rights reserved.  
For inquiries, contact [your email / website].

---

**Built with ❤️ using Astro, Tailwind, Svelte, Pydantic, and FalkorDB.**
```