---
title: Company Name
company: Company Name
author: your-name
description: One-line summary of how they build it (used for SEO + cards).
---

<!--
Frontmatter: title (page title, usually the company), company, author,
description. lastUpdated is optional — Starlight derives it from git unless you
pin it.

This is a TECHNICAL "how they built it" teardown, NOT a business profile. Lead
with engineering; keep business context present but compressed. This file is
prefixed "_" so it isn't published — copy it to <company>.md to start.

Section order (8), kept consistent so entries compose into a comparative map:
  Overview → The heavy lifting → Stack → Hard problems → Likely internals
  → Architecture → Team & process → Sources
See CLAUDE.md ("Teardown template") for the full rule on each section.
-->

<!-- 1 · OVERVIEW — NO "## Overview" heading. Lead content sits under the title;
     Starlight auto-labels it "Overview" in the on-this-page nav, so an explicit
     heading would show up twice. -->

[Company][home] is …
<!-- 2–4 sentences: what the product is + the sharpest TECHNICAL hook (the hard
thing they solve). Link the company on its first mention (define [home] below). -->

**Vitals:** founded YYYY · stage/raise · ~headcount · HQ ([source][home]).

<details>
<summary>Business context — founders, funding, customers, moat</summary>

<!-- ALL business info goes here, preserved but folded: founders + backgrounds,
full funding history + investors, customers/traction, founding story, and any
moat/defensibility narrative (tier-labeled). Never delete business info — fold it. -->
</details>

## The heavy lifting

<!--
2–4 bullets, NO intro prose. Each bullet = a concrete technical mechanism + the
specific constraint it beats — the differentiated engineering know-how. Ban promo
register ("cracks/owns/unlocks", "moat/seamless", "the entire X"). Every bullet
must say something an engineer could NOT get off the homepage; if it can't be
phrased as mechanism + constraint, cut it. Tier-cite. Synthesis of the page's
sharpest engineering — not a restatement of anything below.
-->

## Stack

<!-- component | choice | evidence table; cite each row to a JD/doc/repo. Only
what's public — conventional infra you're guessing goes in Likely internals. -->

## Hard problems

<!-- compact TABLE, 2–4 rows specific to THIS company:
Problem | Why it's hard | Public signal (verified+cited) | Likely approach (speculative).
Drop generic problems with no company-specific signal. -->

## Likely internals

<!-- ONE table: Component | Likely choice | Basis. The infra they don't name
publicly, inferred from the stack they do. Fold genuinely-open questions in as
rows (note the uncertainty in Basis) — do NOT add a separate "couldn't confirm"
block. No hedging asides: the methodology/tier note lives once on the About page;
one short framing line above the table is enough. -->

## Architecture

<!-- Reconstruction (verified + inferred) of how the system fits together. At
least one themed Mermaid diagram (see diagrams/README.md + mermaid-theme.json),
rendered to a committed SVG, with the source collapsed in a <details> below it.
Sits here (below Likely internals) because it ranks lower than the scannable lead
sections — but it's evidenced, so it stays its own section, not inside Likely
internals. -->

## Team & process

<!-- Merged + compact: a small roles table + ONE short paragraph (org shape + how
they build). No separate Process section, no restating points made above. -->

## Sources

<!-- One compact method line (public sources only; crawl date; tier legend +
pointer to evidence/<company>-evidence-map.md), then a numbered source table.
Define link references at the very bottom. -->

[home]: https://www.example.com/
