# Basis — evidence map

Crawled 2026-06-07 via claude-in-chrome (logged-in profile) + web search. First-party only where possible.
Tiers: VERIFIED (stated on a public page) · INFERRED (reasoned from a cited signal) · SPECULATIVE (best-practice fill-in).

## Source keys
- [home] https://www.getbasis.ai/
- [about] https://www.getbasis.ai/about
- [careers] https://www.getbasis.ai/careers
- [blog] https://www.getbasis.ai/blog
- [seriesb] https://www.getbasis.ai/blogs/basis-raises-100m-series-b-led-by-accel-and-google-ventures
- [seriesa] https://www.getbasis.ai/blogs/basis-raises-a-34m-series-a-led-by-khosla-ventures
- [deployed] https://www.getbasis.ai/blogs/introducing-deployed-intelligence
- [agi] https://www.getbasis.ai/blogs/building-a-company-for-the-agi-era
- [satellite] https://www.getbasis.ai/blogs/your-team-needs-a-unified-mcp-heres-a-recipe
- [monorepo] https://www.getbasis.ai/blogs/how-we-made-our-monorepo-ergonomic-for-agents
- [clueso] https://www.getbasis.ai/blogs/clueso-how-we-built-an-agent-that-autonomously-resolves-78-of-bugs
- [chesterton] https://www.getbasis.ai/blogs/chestertons-wall
- [openai] https://openai.com/index/basis/  (OpenAI case study, 2025-08-12; quotes Mitchell Troyanovsky)
- [ashby] https://jobs.ashbyhq.com/basis-ai  (job board + About blurb + investor list)
- [mts] https://jobs.ashbyhq.com/basis-ai/d0c983cf-214a-4d03-9ef4-e680ddf5022b (Member of Technical Staff JD)

---

## WHAT THEY DO

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Builds AI agents that do end-to-end accounting work autonomously | VERIFIED | [about] | "We build agents that do real accounting work, end to end. These agents run autonomously, sometimes for hours, collaborating with accountants at key decision points." |
| Agents run for hours, end-to-end, for largest accounting firms | VERIFIED | [ashby] | "Our agents operate for hours at a time, performing end-to-end work for some of the largest accounting firms in the world." |
| Founded 2023 | VERIFIED | [openai] | "Founded in 2023, Basis builds AI agents used by top accounting firms" |
| Automates reconciliations, journal entries, financial summaries; full visibility/control | VERIFIED | [openai] | "automate repetitive tasks like reconciliations, journal entries, and financial summaries while giving accountants full visibility into how decisions are made and control over the process" |
| ~30% time savings | VERIFIED | [openai] | "The result is up to 30% time savings"; "Firms using Basis report 30% time savings on average" |
| Can complete a partnership tax workbook end to end | VERIFIED | [seriesb] | "Basis can now complete a partnership tax workbook end to end"; used to "create complex journal entries, debug difficult reconciliations, prepare technical accounting memos." |
| Co-founders Matt Harpe (CEO) and Mitchell Troyanovsky | VERIFIED | [seriesb], [openai] | "Founders Matthew Harpe and Mitchell Troyanovsky"; Troyanovsky quoted as "co-founder of Basis" |

## FUNDING / SCALE

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| $100M Series B at $1.15B valuation, Feb 24 2026 | VERIFIED | [seriesb] | amount $100M, valuation $1.15B, date Feb 24 2026 |
| Led by Accel (Miles Clements) + GV (Google Ventures) | VERIFIED | [seriesb], [ashby] | "Accel (Miles Clements), Google Ventures" |
| Khosla doubling down (Series A lead) | VERIFIED | [seriesa], [ashby] | Series A "$34m ... Led by Khosla Ventures"; investors incl "Khosla Ventures (Keith Rabois & Vinod Khosla)" |
| Angel/investor roster | VERIFIED | [ashby] | "Nat Friedman & Daniel Gross, Adam D'Angelo, Jeff Dean, Jack Altman, Noam Brown, Kyle Vogt, Amjad Masad, Clem Delangue" |
| Series A was $34M (Khosla); seed $3.6M | VERIFIED | [seriesa], [blog] | post titles |
| "racing to deploy the most advanced applied ML at production scale" | VERIFIED | [ashby] | quote |
| Team size ~80 | INFERRED | third-party trackers + 30 open roles on [ashby] | trackers peg ~76–80; 30 roles open; not stated first-party |
| Supports a significant share of large US accounting firms | VERIFIED | [openai] | "Basis supports a significant share of large accounting firms across the U.S." |
| Baker Tilly partnership | VERIFIED | [blog] | "Baker Tilly and Basis Announce Collaboration to Expand AI-Powered Automation" |

## PRODUCT ARCHITECTURE (the accounting agents)

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Multi-agent architecture assigning best-fit OpenAI model per job | VERIFIED | [openai] | "the team built a multi-agent architecture that assigns the best-fit OpenAI model to the right job." |
| Supervising agent, originally o3, migrated to GPT-5; routes to sub-agents | VERIFIED | [openai] | "Each task begins with a supervising agent, originally built on OpenAI o3 and now migrated to GPT-5, which coordinates the full process—routing steps to specialized sub-agents based on task, complexity, latency needs, and input type." |
| Sub-agents powered by range of models, selected by internal benchmark suite | VERIFIED | [openai] | "Sub-agents are powered by a range of models, selected by an internal benchmark suite that scores each model on key capabilities and traits." |
| GPT-4.1 for speed-critical interactions | VERIFIED | [openai] | "For speed-critical interactions ... Basis relies on GPT-4.1." |
| GPT-5 for complex reasoning (unusual transactions, ambiguous classifications, month-end close) | VERIFIED | [openai] | "Basis agents again rely on GPT-5 for its deep reasoning capabilities." |
| Models used: o3, o3-Pro, GPT-4.1, GPT-5 | VERIFIED | [openai] | "Built with OpenAI o3, o3-Pro, GPT-4.1, and GPT-5" |
| Central shared context layer; agents surface assumptions, data sources, logic | VERIFIED | [openai] | "Basis agents act independently but share context through a central layer, surfacing assumptions, data sources, and the logic behind each decision." |
| Reviewability is core; per-decision explanation + confidence | VERIFIED | [openai] | journal-entry example: "what data was used, why it was mapped that way, and how confident the system is in its recommendation." |
| Function calling enabled multi-step completion (not just proposals) | VERIFIED | [openai] | "Function calling pushed that forward, enabling agents to complete multi-step processes like reconciliations and journal entries, not just propose them" |
| Benchmark each model release on real workflows for accuracy AND explainability | VERIFIED | [openai] | "the Basis team runs detailed benchmarks on real-world accounting workflows, evaluating not just accuracy, but how clearly the model can explain its reasoning." |
| GPT-5 100% on Basis parallel tool-calling benchmark | VERIFIED | [openai] | "GPT-5 achieved a perfect 100% success rate" on tool-calling benchmark w/ code interpreter + web search |
| Worked with OpenAI from day one; co-design feedback | VERIFIED | [openai] | "We've worked with OpenAI from day one" |

## INTERNAL ENGINEERING / "ATLAS" PLATFORM

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Atlas team: build internal AI systems, context layer, internal agents, knowledge systems | VERIFIED | [agi], [mts] | "The Atlas team builds the context layer, internal agents, and knowledge systems that will eventually produce the majority of total output at Basis." |
| Atlas mandate: make every employee 100x more productive; responsibilities Context Architecture/Management, Integrations, Agent Development | VERIFIED | [agi] | quotes |
| "Treat your company context like a codebase" | VERIFIED | [agi] | quote |
| Org must be built "agent-native" | VERIFIED | [agi] | "The Basis organization needs to be built agent-native." |
| Satellite: one MCP endpoint fronting 36 providers; two identity layers | VERIFIED | [satellite] | "Satellite is one MCP endpoint that fronts 36 providers, with one identity layer for human callers and a second for service-to-service callers." |
| Google SSO for humans; service accounts + per-service allowlist for services | VERIFIED | [satellite] | quote |
| OAuth providers: Google Workspace, Slack, Linear, GitHub, Figma, Notion, Granola, Knock | VERIFIED | [satellite] | "eight providers where every person needs their own scope (Google Workspace, Slack, Linear, GitHub, Figma, Notion, Granola, Knock)" |
| Other named integrations: HubSpot, Gong, People Data Labs, Neon (Postgres), NetSuite | VERIFIED | [satellite] | named in post |
| Neon Postgres branches w/ 24h TTL, per-user cap 5 | VERIFIED | [satellite] | "Neon (PostgreSQL branches with 24-hour TTL and per-user cap of five)" |
| Telemetry ~30,000 lines/hr | VERIFIED | [satellite] | "Tool calls are logged with structured telemetry at roughly 30,000 lines per hour" |
| Supported agent harnesses: Claude Code, Codex, Cursor, Cowork | VERIFIED | [satellite] | "Claude Code, Codex, Cursor, and Cowork all support MCP." |
| Integrations per teammate jumped 3.2 -> 17.3 after Satellite | VERIFIED | [satellite] | metric |
| Clueso = internal incident-response agent; resolves >78% of incidents first pass | VERIFIED | [clueso] | "now debugs more than 78% of incidents on the first pass." |
| Clueso runs in a Modal VM using the Claude Agent SDK as harness | VERIFIED | [clueso] | "Clueso runs in a Modal VM using the Claude Agent SDK as a harness." |
| Clueso tools: monorepo, data query tool, logging service; runbooks, guides, docs; agent skills | VERIFIED | [clueso] | quotes |
| Clueso keeps a "progress document modeled after a researcher's logbook" | VERIFIED | [clueso] | quote |
| Support response times dropped ~50% | VERIFIED | [clueso] | quote |
| Monorepo: Python + TypeScript | VERIFIED | [monorepo] | both languages discussed |
| Tooling: Ruff, BasedPyright, ESLint, Prettier | VERIFIED | [monorepo] | "Ruff for Python linting and formatting, BasedPyright for type checking, ESLint and Prettier for TypeScript" |
| 100+ nested AGENTS.md; .agents/roles/ (6 sub-agent roles); .agents/skills/ | VERIFIED | [monorepo] | quotes |
| Verifier agent, standards-enforcer sub-agents | VERIFIED | [monorepo] | quotes |
| Token usage +5x/dev in 3 months; commit velocity +2.5x | VERIFIED | [monorepo] | metrics |
| Observability: Better Stack, PostHog | VERIFIED | [monorepo] | named in MCP layer |

## TEAM / PROCESS

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Title is "Member of Technical Staff"; comp $100K–$300K + equity | VERIFIED | [mts] | header |
| In-person Flatiron NYC 5 days/week | VERIFIED | [mts] | "In person in Flatiron, NYC 5 days a week" |
| Every engineer gets unlimited token budget | VERIFIED | [mts] | "we give every engineer an unlimited token budget" |
| No static functional teams; quarterly-reforming pods | VERIFIED | [mts] | "We don't have static functional teams. We have pods that exist around areas and objectives which reform every quarter" |
| Work areas: Product Eng, Agent Eng (context eng, tool design), Agent Platform (harness eng, eval systems), Platform & Infra, Agent Data, Atlas | VERIFIED | [mts] | bullet list |
| ~20% of product eng is teaching agents nondeterministic workflows; targeting 70% by EOY | VERIFIED | [mts] | "Approx 20% of product engineering at Basis is teaching agents ... We see that being 70% by end of year." |
| RP (Responsible Party) system: single accountable owner per project | VERIFIED | [mts] | "Every project at Basis has a single Responsible Party (RP) who is accountable for whether it ships and whether it works." |
| "Engineering > Coding"; delegate definable+verifiable work to agents | VERIFIED | [mts] | quote |
| Boundaries melting: frontend/backend, infra/product, ml/eng | VERIFIED | [mts] | quote |
| Deployed Intelligence = FDE model; parachute into customers, redesign workflows | VERIFIED | [deployed] | "parachute into our customer's organizations, learn their unique context, and give them the tools to redesign their accounting workflows around intelligent agents" |
| "50-person team" framing | VERIFIED | [deployed] | "give every accountant the equivalent of a 50-person team to support their work" |
| Prompt Olympics internal event | VERIFIED | [blog] | post "Prompt Olympics Summer 2024 - Recap" |
| Chesterton's Wall: eng practices are constraint-coping; some vestigial as AI improves | VERIFIED | [chesterton] | small-PR/code-review unbundling argument; colleague asked to stop splitting PRs because it confused the AI assistant |

## NOTABLE BETS (synthesis, all traceable to above)
1. Model-agnostic-by-benchmark product: route per task to best OpenAI model; re-benchmark every release [openai].
2. Reviewability as the product, not a feature: central context layer + per-decision explanation + confidence [openai].
3. Agent-native company (Atlas): treat company context like a codebase; internal agents (Clueso) + unified MCP (Satellite) [agi][satellite][clueso].
4. Buy reasoning (OpenAI) for the product; mix harnesses (Claude SDK, Codex, Cursor) internally [openai][clueso][satellite].
5. Org design as a bet: MTS + reforming pods + RP ownership + 5-day in-person [mts].
6. FDE GTM (Deployed Intelligence) — embed, redesign workflows [deployed].

## UNKNOWNS (open, not best-practice-guessable)
- Product backend compute/hosting (Modal confirmed only for internal Clueso, not product).
- Whether the product's data layer is the same Neon Postgres seen in internal Satellite, or separate.
- How customer accounting data is isolated/secured per firm (GRC role open, no public detail).
- Vector/RAG store for the "central context layer".
- Eval-judge tuning specifics for long agent trajectories (named as an open problem in [mts]).
- Exact headcount and eng/non-eng split.
