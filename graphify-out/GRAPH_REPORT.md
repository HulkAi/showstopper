# Graph Report - .  (2026-05-12)

## Corpus Check
- Large corpus: 53 files · ~3,081,603 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 48 nodes · 69 edges · 7 communities (6 shown, 1 thin omitted)
- Extraction: 77% EXTRACTED · 17% INFERRED · 6% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Gallery Filtering & Rendering|Gallery Filtering & Rendering]]
- [[_COMMUNITY_DOM Element Selectors|DOM Element Selectors]]
- [[_COMMUNITY_Theme System & Layout|Theme System & Layout]]
- [[_COMMUNITY_Hero & Animation System|Hero & Animation System]]
- [[_COMMUNITY_Navigation & Scroll Controls|Navigation & Scroll Controls]]
- [[_COMMUNITY_Design Planning & Architecture|Design Planning & Architecture]]
- [[_COMMUNITY_Grain Overlay Effect|Grain Overlay Effect]]

## God Nodes (most connected - your core abstractions)
1. `Portfolio Redesign Implementation Plan (2026-05-12)` - 11 edges
2. `Portfolio Redesign Design Document (2026-05-12)` - 10 edges
3. `script.js DOMContentLoaded entry point` - 9 edges
4. `Scroll-driven light-to-dark theme transition` - 6 edges
5. `renderProjects() DOM renderer` - 5 edges
6. `loadPortfolio() async data fetcher` - 4 edges
7. `initFiltering() gallery filter controller` - 4 edges
8. `index.html page structure` - 4 edges
9. `GSAP overlapping animation timeline system` - 4 edges
10. `Manual theme toggle with localStorage persistence` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Lightbox modal (#lightbox)` --shares_data_with--> `script.js DOMContentLoaded entry point`  [AMBIGUOUS]
  index.html → script.js
- `initReveal() IntersectionObserver scroll reveal` --semantically_similar_to--> `Intersection Observer reveal fallback`  [INFERRED] [semantically similar]
  script.js → docs/plans/2026-05-12-portfolio-redesign-plan.md
- `GSAP overlapping animation timeline system` --semantically_similar_to--> `Hero cascading fade-in animation (setTimeout)`  [INFERRED] [semantically similar]
  docs/plans/2026-05-12-portfolio-redesign-design.md → script.js
- `Morphing background canvas (#morph-canvas)` --shares_data_with--> `script.js DOMContentLoaded entry point`  [AMBIGUOUS]
  index.html → script.js
- `Scroll progress indicator (#scroll-progress)` --shares_data_with--> `script.js DOMContentLoaded entry point`  [AMBIGUOUS]
  index.html → script.js

## Hyperedges (group relationships)
- **Gallery loading and filtering data pipeline** — portfolio_grid, script_js_renderProjects, script_js_initFiltering, filter_buttons, projects_json, data_category_attribute [INFERRED 0.95]
- **Hero entrance animation: existing setTimeout vs planned GSAP timeline** — hero_section, script_js_heroAnimation, gsap_animation_timeline [INFERRED 0.85]
- **Light-to-dark theme transition architecture** — scroll_driven_theme_transition, manual_theme_toggle, css_theme_system, diagonal_clip_path_divider [INFERRED 0.95]

## Communities (7 total, 1 thin omitted)

### Community 0 - "Gallery Filtering & Rendering"
Cohesion: 0.25
Nodes (11): data-category / data-filter attribute convention, Gallery filter button group (.filter-btn), Gallery section (#work), Intersection Observer reveal fallback, Lightbox modal (#lightbox), Portfolio grid container (#portfolio-grid), projects.json gallery data source, initFiltering() gallery filter controller (+3 more)

### Community 1 - "DOM Element Selectors"
Cohesion: 0.27
Nodes (9): heroDesc, heroTag, heroTitle, initFiltering(), initReveal(), loadPortfolio(), portfolioGrid, renderProjects() (+1 more)

### Community 2 - "Theme System & Layout"
Cohesion: 0.48
Nodes (7): CSS custom properties dual-theme system (light/dark), Portfolio Redesign Implementation Plan (2026-05-12), index.css stylesheet, index.html page structure, Inline SVG icons approach, Manual theme toggle with localStorage persistence, Scroll-driven light-to-dark theme transition

### Community 3 - "Hero & Animation System"
Cohesion: 0.4
Nodes (6): Angled CSS divider elements (.angled-divider), Diagonal clip-path transition divider, GSAP overlapping animation timeline system, Hero section (#hero), Manifesto section (#manifesto), Hero cascading fade-in animation (setTimeout)

### Community 4 - "Navigation & Scroll Controls"
Cohesion: 0.33
Nodes (6): Back-to-top button (#back-to-top), Morphing background canvas (#morph-canvas), Fixed navigation bar (#nav), script.js DOMContentLoaded entry point, Anchor link smooth scrolling, Scroll progress indicator (#scroll-progress)

### Community 5 - "Design Planning & Architecture"
Cohesion: 0.4
Nodes (6): Portfolio Redesign Design Document (2026-05-12), GSAP 3.x + ScrollTrigger CDN dependency, Lumina Creative Studio brand, Single-file no-build architecture principle, Slanted gradient header design pattern, Wayne Clarke Portfolio

## Ambiguous Edges - Review These
- `script.js DOMContentLoaded entry point` → `Lightbox modal (#lightbox)`  [AMBIGUOUS]
  index.html · relation: shares_data_with
- `script.js DOMContentLoaded entry point` → `Morphing background canvas (#morph-canvas)`  [AMBIGUOUS]
  index.html · relation: shares_data_with
- `script.js DOMContentLoaded entry point` → `Scroll progress indicator (#scroll-progress)`  [AMBIGUOUS]
  index.html · relation: shares_data_with
- `script.js DOMContentLoaded entry point` → `Back-to-top button (#back-to-top)`  [AMBIGUOUS]
  index.html · relation: shares_data_with

## Knowledge Gaps
- **14 isolated node(s):** `heroTag`, `heroTitle`, `heroDesc`, `portfolioGrid`, `target` (+9 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `script.js DOMContentLoaded entry point` and `Lightbox modal (#lightbox)`?**
  _Edge tagged AMBIGUOUS (relation: shares_data_with) - confidence is low._
- **What is the exact relationship between `script.js DOMContentLoaded entry point` and `Morphing background canvas (#morph-canvas)`?**
  _Edge tagged AMBIGUOUS (relation: shares_data_with) - confidence is low._
- **What is the exact relationship between `script.js DOMContentLoaded entry point` and `Scroll progress indicator (#scroll-progress)`?**
  _Edge tagged AMBIGUOUS (relation: shares_data_with) - confidence is low._
- **What is the exact relationship between `script.js DOMContentLoaded entry point` and `Back-to-top button (#back-to-top)`?**
  _Edge tagged AMBIGUOUS (relation: shares_data_with) - confidence is low._
- **Why does `script.js DOMContentLoaded entry point` connect `Navigation & Scroll Controls` to `Gallery Filtering & Rendering`, `Theme System & Layout`, `Hero & Animation System`?**
  _High betweenness centrality (0.282) - this node is a cross-community bridge._
- **Why does `Portfolio Redesign Implementation Plan (2026-05-12)` connect `Theme System & Layout` to `Gallery Filtering & Rendering`, `Hero & Animation System`, `Navigation & Scroll Controls`, `Design Planning & Architecture`?**
  _High betweenness centrality (0.259) - this node is a cross-community bridge._
- **Why does `Portfolio Redesign Design Document (2026-05-12)` connect `Design Planning & Architecture` to `Theme System & Layout`, `Hero & Animation System`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
