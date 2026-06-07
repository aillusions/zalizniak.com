# CLAUDE.md

> **Repo scope:** this is the source for the unified **zalizniak.com** site (Astro Starlight, deployed to AWS Amplify at the apex + `www`; Terraform in `infra/`). It has two parts: the personal **landing page** (`src/content/docs/index.mdx`, a normal doc page that keeps the sidebar) and the **Applied AI Teardowns** library under `src/content/docs/teardowns/`. The spec below governs the teardowns.

Working spec for authoring and editing teardowns in **Applied AI Teardowns** — a public library reconstructing how applied-AI startups build their products, from public signals only (job postings, blogs, docs, product behavior). Audience: engineers. The unit of value is **dense, evidenced inference** — not opinion, not insider info.

## Tech stack (decided — don't relitigate without reason)

- **Site:** Astro Starlight — chosen for light static output, SEO, content-heavy prose + diagrams.
- **Deploy:** AWS Amplify, static output, build dir `dist/`.
- **Diagrams:** text-based sources — **Mermaid** primary; **D2** only if a diagram needs it. Rendered to static SVG by a **GitHub Action (render-and-commit)**, never browser- or build-time-rendered, so the site build stays dumb and host-agnostic. *Exception:* the first Pallet post uses a one-off manual SVG render until the Action exists.
  - **Sources are tracked.** `.mmd` sources live in `diagrams/<company>/`, rendered SVGs in `public/diagrams/<company>/`. Do **not** keep diagram sources in `temp/` — it's gitignored and they'd be lost.
  - **Always theme — never ship default Mermaid.** Render every diagram with the shared `diagrams/mermaid-theme.json` (system font, slate/indigo palette, rounded nodes, generous spacing). Default Mermaid (Trebuchet MS, pale-yellow clusters, hairline borders) looks dated and is not acceptable. Use color to carry meaning (e.g. verified vs assumed; distinct node roles).
  - **Lay out for proportion.** Prefer horizontal (`flowchart LR`) for pipelines and two-part shapes so boxes don't stack into a tall column of oversized blocks; reserve vertical (`TB`) for genuinely layered systems. A diagram should be wide and scannable, not 25%-of-screen boxes down the page.
  - **Keep the Mermaid source on the page, but collapsed.** Under each rendered SVG, put the source in a `<details><summary>Mermaid source</summary>` block (collapsed by default — no `open`). The reader sees the diagram; the code is one click away, not a wall of text. Keep it in sync with the rendered SVG.
  - Render command and the all-of-a-company loop are in `diagrams/README.md`; the future render Action must reuse `mermaid-theme.json`.
- **Repo:** public, PR-based contribution, author frontmatter, CODEOWNERS.

## Discovery / authoring workflow

How a teardown is *produced* — authoring tooling, distinct from the product stack above (which is what the site is *built with*).

- **Browse sources with Claude Code `--chrome`** (the claude-in-chrome MCP): navigate sources under the author's own logged-in browser profile, extract page content, and capture login-walled pages that can't be archived. It pauses on login/CAPTCHA for manual handling.
- **Record the supporting quote as you write.** For every cited source, capture the exact quote/signal that backs each claim into an evidence map (`temp/<company>-evidence-map.md`: claim → VERIFIED/INFERRED/UNSUPPORTED → source URL → quote). That map — not an external archive — is what keeps citations durable and verifiable as pages change.
- **File flow:** raw discovery output and the evidence map → `temp/`; finished teardowns → `src/content/docs/teardowns/`; fallback screenshots → `assets/<company>/`.

## Evidence discipline (the core credibility rule)

Every claim sits in one of three tiers, and the tier is **always visually distinct**:

| Tier | Basis | How to mark it |
| --- | --- | --- |
| **VERIFIED** | Stated or shown on a public page | Cite the live source inline; `:::note` for key findings |
| **INFERRED** | Reasoned from a cited public signal | `:::note` / `:::caution` aside — flag the confidence level and name the signal |
| **SPECULATIVE** | No direct signal — assume best practices / what a team of this stage & domain would typically do | Its own labeled aside (`:::tip[Speculation]`) **and** in-text hedges ("likely," "probably," "a team this size would typically") |

- **Speculation is welcome and encouraged** to complete the picture — but it must always wear the SPECULATIVE label and hedge language so a reader never mistakes it for fact. The **unknowns** section is the natural home for longer speculative reconstructions of missing pieces.
- **Never present a lower tier as a higher one.** Don't assert inference or speculation as fact, and never fabricate a source. "The JD implies a Temporal-style durable-execution layer" (inferred), not "they use Temporal" (verified).
- **No process leakage; no apology blocks.** The reader never hears about "the source draft," "the dossier," or what we "dropped/removed" — they don't know those exist. Factual sections carry only verified/inferred claims. A plausible-but-unconfirmed detail (the likely auth vendor, LLM router, memory store) goes to the **speculative section** as labeled best-practice fill-in — often a table — *not* a caution block in the factual section listing what you couldn't verify. Genuinely-open questions go to **unknowns**. Speculation completes the picture; treat it as a feature, not a confession.
- **Cite live source URLs.** Link the live page directly. (Decided 2026-06-07: web.archive.org Save-Page-Now crawls each URL synchronously at ~80s/page — too slow to be worth it. Dropped.) Durability comes from the per-claim evidence map (above): pages change, so the recorded quote is what lets a reader re-verify.
- **Screenshots are a fallback only** for login-walled JDs or JS-blank pages, stored in `assets/<company>/`. Not the default.

## Density / format discipline (compress, don't pad)

Match format to content type:

| Content type | Format |
| --- | --- |
| stack / tooling | table (component \| choice \| evidence) |
| architecture / data flow | diagram |
| cross-company comparison | table |
| individual claims | flagged one-line asides |
| reasoning (why a bet, what a signal implies) | tight prose (logic doesn't tabularize) |

- Ruthlessly cut filler: no "in this section," "it's worth noting," connective throat-clearing.
- Dense **and** legible — every table/diagram gets just enough connective prose to carry the reader; no inert data dumps.
- **Link the company on first mention.** The first time the company name appears in the body (the "what they do" opener), link it to the company's homepage so a reader instantly knows who it is — `[Acme][home]`, with `[home]: https://www.acme.com/` defined among the source links. Inline only; no banner, no logo header.
- **Value first.** Open on substance — what they do, the sharpest finding — never on a methodology banner. The "reconstructed from public sources / how to read the confidence tiers" note is compact (a sentence or two) and lives at the **bottom**, near Sources. No top-of-page disclaimer.
- **Don't over-disclaim.** One tier label per claim is enough; the reader is an engineer, not a child. No repeated hedges, no re-explaining the methodology every few sentences. State it once, move on.
- **Asides are tight.** `:::note` / `:::caution` / `:::tip` blocks — including "Key finding" notes — are ≤2 sentences: the insight and the so-what, nothing else. No restating surrounding prose, no "this is reasoned from…" meta. If it needs a paragraph, it belongs in body prose, not an aside.

## Teardown template (consistent across all entries)

Section order, so entries compose into a comparative map:

`what they do → stack → architecture → team → process → notable bets → unknowns`

Frontmatter (complete on every entry): `title`, `company`, `author`, `description`.

**Last-updated date:** every page shows a "Last updated" date. Use Starlight's built-in **git-based `lastUpdated`** (`lastUpdated: true` in the Starlight config in `astro.config.mjs`) — it derives the date from each file's last git commit and renders it in the page footer, so no per-entry frontmatter field is needed. Chosen over a manual `lastUpdated` frontmatter field because it's one config line, can't go stale, and needs nothing per entry. A per-page `lastUpdated` frontmatter value can still pin/override the date when needed.

## Acceptance criteria (a teardown is done when)

- Every factual claim has a cited public source (live link) with its supporting quote recorded in the evidence map.
- Every claim is tier-labeled: inferred claims flagged as inference with a confidence level; **speculative claims explicitly carry the SPECULATIVE label + hedge language** (never presented as fact).
- Stack is a table; architecture is at least one diagram; comparison data is tabular.
- No filler prose; reads dense but legible.
- Follows the template section order.
- Frontmatter complete (`title`, `company`, `author`, `description`).
- **Page shows a last-updated date** (Starlight git-based `lastUpdated`).
- Build succeeds; diagrams render.
