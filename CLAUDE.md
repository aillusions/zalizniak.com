# CLAUDE.md

> **Repo scope:** the source for **zalizniak.com** (Astro Starlight, deployed to AWS Amplify at the apex + `www`; Terraform in `infra/`). The site is the personal landing page (`src/content/docs/index.mdx`, a normal doc page that keeps the sidebar).

## Tech stack (decided — don't relitigate without reason)

- **Site:** Astro Starlight — light static output, SEO, content-heavy prose + diagrams.
- **Deploy:** AWS Amplify, static output, build dir `dist/`.
- **Diagrams:** text-based sources — **Mermaid** primary; **D2** only if a diagram needs it. Rendered to static SVG and committed, never browser- or build-time-rendered, so the site build stays dumb and host-agnostic.
  - **Sources are tracked.** `.mmd` sources live in `diagrams/<section>/`, rendered SVGs in `public/diagrams/<section>/`. Do **not** keep diagram sources in a gitignored scratch dir — they'd be lost.
  - **Always theme — never ship default Mermaid.** Render every diagram with the shared `diagrams/mermaid-theme.json` (system font, slate/indigo palette, rounded nodes, generous spacing). Default Mermaid (Trebuchet MS, pale-yellow clusters, hairline borders) looks dated and is not acceptable. Use color to carry meaning.
  - **Lay out for proportion.** Prefer horizontal (`flowchart LR`) for pipelines and two-part shapes so boxes don't stack into a tall column of oversized blocks; reserve vertical (`TB`) for genuinely layered systems. A diagram should be wide and scannable.
  - **Keep the Mermaid source on the page, but collapsed.** Under each rendered SVG, put the source in a `<details><summary>Mermaid source</summary>` block (collapsed by default). Keep it in sync with the rendered SVG.
  - Render command and the render loop are in `diagrams/README.md`.
- **Repo:** public, author frontmatter, CODEOWNERS.

## Writing discipline

- Ruthlessly cut filler: no "in this section," "it's worth noting," connective throat-clearing.
- Dense **and** legible — every table/diagram gets just enough connective prose to carry the reader; no inert data dumps.
- Match format to content: tables for tooling and comparisons, diagrams for architecture and data flow, tight prose for reasoning.
- **Value first.** Open on substance, never on a methodology banner or disclaimer.

## Page conventions

- Frontmatter: `title`, `description` (plus `author` where it applies).
- **Last-updated date:** Starlight's git-based `lastUpdated` (`lastUpdated: true` in `astro.config.mjs`) derives the date from each file's last git commit and renders it in the footer — no per-entry frontmatter field needed. A per-page `lastUpdated` value can pin/override it.
- Private planning and raw scratch go in `notes/`, which is **gitignored** — keep it out of the public repo.
