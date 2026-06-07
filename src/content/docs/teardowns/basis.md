---
title: Basis
company: Basis
author: Oleksandr Zalizniak
description: How Basis builds long-horizon AI agents that do end-to-end accounting work — a GPT-5 supervisor routing to model-benchmarked sub-agents over a reviewable context layer, plus the agent-native engineering org (Atlas, Satellite MCP, Clueso) behind it. Reconstructed from the public record.
lastUpdated: 2026-06-07
---

## What they do

[Basis][home] builds **AI agents that do accounting work end-to-end** for accounting firms — *"agents that do real accounting work, end to end. These agents run autonomously, sometimes for hours, collaborating with accountants at key decision points"* ([about][about]). Founded in 2023, it sells to the firms themselves: *"agents that do real work in the real economy … performing end-to-end work for some of the largest accounting firms in the world"* ([Ashby][ashby]). The visible workload is reconciliations, journal entries, financial summaries, technical accounting memos, and — as of the Series B — *"a partnership tax workbook end to end"* ([OpenAI case study][openai], [Series B][seriesb]).

The wedge is **reviewable autonomy**, not a copilot. Agents run independently but expose their work for sign-off: firms report *"up to 30% time savings"* and redirect the recovered capacity to advisory work ([OpenAI case study][openai]). Co-founders **Matt Harpe** (CEO) and **Mitchell Troyanovsky** ([Series B][seriesb], [OpenAI case study][openai]).

The numbers Basis states publicly:

- **$100M Series B at a $1.15B valuation** (Feb 24 2026), led by **Accel** (Miles Clements) and **GV** ([Series B][seriesb]); follows a **$34M Series A** led by **Khosla Ventures** and a **$3.6M** seed ([blog][blog]).
- Backers include **Khosla (Keith Rabois & Vinod Khosla), Nat Friedman & Daniel Gross, Adam D'Angelo, Jeff Dean, Jack Altman, Noam Brown, Kyle Vogt, Amjad Masad, Clem Delangue** ([Ashby][ashby]).
- *"Basis supports a significant share of large accounting firms across the U.S."* ([OpenAI case study][openai]); a named partnership with **Baker Tilly** ([blog][blog]).
- *"Racing to deploy the most advanced applied ML at production scale"* ([Ashby][ashby]).

:::note[Two systems, one bet — confidence: high]
Basis builds **a product** (the accounting agents, run on OpenAI models) *and* **an agent-native company** to build it — an internal team (Atlas) shipping internal agents, a unified tool gateway, and an agent-ergonomic monorepo ([building-for-AGI][agi], [Satellite][satellite]). The teardown covers both; they're deliberately the same playbook applied inward and outward.
:::

## Stack

TypeScript + Python across the board, with OpenAI frontier models as the product's reasoning substrate and a mix of coding-agent harnesses internally. Two columns of evidence: the customer-facing product, and the internal "Atlas" platform.

| Layer | Choice | Evidence |
| --- | --- | --- |
| **Product reasoning models** | OpenAI **o3, o3-Pro, GPT-4.1, GPT-5** | [OpenAI case study][openai] |
| **Supervising agent** | **GPT-5** (originally o3) | [OpenAI case study][openai] |
| **Sub-agents** | range of OpenAI models, chosen per task — **GPT-4.1** (speed), **GPT-5** (deep reasoning) | [OpenAI case study][openai] |
| **Model selection** | internal **benchmark suite** scoring capability/traits per release | [OpenAI case study][openai] |
| **Languages** | **Python + TypeScript** (monorepo) | [monorepo][monorepo] |
| **Lint / types** | **Ruff**, **BasedPyright**, **ESLint**, **Prettier** | [monorepo][monorepo] |
| **Internal tool gateway** | **Satellite** — one **MCP** endpoint fronting **36 providers** | [Satellite][satellite] |
| **Internal coding agents** | **Claude Code, Codex, Cursor, Cowork** (all MCP clients) | [Satellite][satellite] |
| **Internal incident agent** | **Clueso** — **Modal** VM + **Claude Agent SDK** harness | [Clueso][clueso] |
| **Dev databases** | **Neon** (Postgres branches, 24h TTL) | [Satellite][satellite] |
| **Observability** | **Better Stack**, **PostHog** | [monorepo][monorepo] |
| **SSO / identity** | **Google Workspace** SSO (humans); service accounts + allowlists (services) | [Satellite][satellite] |
| **Internal SaaS** | Slack, Linear, GitHub, Figma, Notion, Granola, Knock, HubSpot, Gong, NetSuite, People Data Labs | [Satellite][satellite] |

:::note[Key finding — model-agnostic by benchmark, not by allegiance]
Basis picks the model per step from a scored internal suite, and re-runs it every release — GPT-5 hit *"a perfect 100% success rate"* on its parallel-tool-calling benchmark before being promoted to the supervisor role ([OpenAI case study][openai]). The product is built so a better model upgrades the whole system, not so one model is load-bearing.
:::

The product's hosting target, customer-data store, and any vector/retrieval store behind the context layer aren't stated — reconstructed in [Likely stack & infra choices](#likely-stack--infra-choices).

## Architecture

### The product: a supervisor that routes to model-matched sub-agents

Basis *"treats accounting as a system of workflows, each with its own context and complexity"* and built *"a multi-agent architecture that assigns the best-fit OpenAI model to the right job"* ([OpenAI case study][openai]). Every task opens with a **supervising agent** — *"originally built on OpenAI o3 and now migrated to GPT-5, which coordinates the full process—routing steps to specialized sub-agents based on task, complexity, latency needs, and input type"* ([OpenAI case study][openai]). Sub-agents draw from a range of models *"selected by an internal benchmark suite"* — GPT-4.1 for *"speed-critical interactions, like clarifying questions mid-review,"* GPT-5 for *"interpreting unusual transaction patterns, resolving ambiguous classifications, or … month-end close"* ([OpenAI case study][openai]).

![Basis product architecture: an accounting task enters a GPT-5 supervising agent that routes by task, complexity, latency and input type to specialized sub-agents (GPT-4.1 for speed, GPT-5 for deep reasoning) whose model is chosen by an internal benchmark suite; agents read and write a central context layer of assumptions, data sources and decision logic, use function calling to complete multi-step work, and return decision-grade output with explanation and confidence to an accountant who approves or corrects at key decision points.](/diagrams/basis/product-architecture.svg)

<details>
<summary>Mermaid source</summary>

```mermaid
flowchart LR
  classDef io fill:#eef2f8,stroke:#94a3b8,stroke-width:1.5px,color:#0f172a;
  classDef sup fill:#eef0fe,stroke:#6366f1,stroke-width:1.5px,color:#0f172a;
  classDef sub fill:#e8f1fd,stroke:#2563eb,stroke-width:1.5px,color:#0f172a;
  classDef ctx fill:#e7f6ef,stroke:#2f9e6f,stroke-width:1.5px,color:#0f172a;
  classDef human fill:#fdecec,stroke:#e0564f,stroke-width:1.5px,color:#0f172a;

  Task("Accounting task<br/>reconciliation · journal entry · tax workbook"):::io

  Sup("Supervising agent<br/>GPT-5 (was o3)<br/>routes by task · complexity · latency · input"):::sup

  subgraph Subs["Specialized sub-agents · model picked by internal benchmark suite"]
    direction TB
    Fast("Speed-critical steps<br/>GPT-4.1<br/>clarifying Qs · quick feedback"):::sub
    Deep("Complex reasoning<br/>GPT-5<br/>ambiguous classifications · month-end close"):::sub
  end

  Ctx[("Central context layer<br/>assumptions · data sources · decision logic")]:::ctx
  Tools("Function calling<br/>retrieve data · complete multi-step work"):::io

  Acct("Accountant review<br/>entry + explanation + confidence"):::human

  Task --> Sup
  Sup --> Subs
  Subs --> Tools
  Sup <--> Ctx
  Subs <--> Ctx
  Subs -- "decision-grade output" --> Acct
  Acct -. "approve / correct at key decision points" .-> Sup
```

</details>

Two design choices make the autonomy sellable to auditors. First, a **shared context layer**: agents *"act independently but share context through a central layer, surfacing assumptions, data sources, and the logic behind each decision"* — so a journal entry arrives with *"what data was used, why it was mapped that way, and how confident the system is in its recommendation"* ([OpenAI case study][openai]). Second, **function calling** turned proposals into completed work — *"enabling agents to complete multi-step processes like reconciliations and journal entries, not just propose them"* ([OpenAI case study][openai]).

:::note[Key finding — explainability is gated, not assumed]
Basis benchmarks each model release on real workflows *"evaluating not just accuracy, but how clearly the model can explain its reasoning,"* and uses that to decide *"when agents can safely take on new workflows"* ([OpenAI case study][openai]). New autonomy ships only when a model can both do the task and account for it.
:::

### The internal platform: Atlas, Satellite, Clueso

Basis runs the same agent thesis on itself. The **Atlas** team's mandate is *"the context layer, internal agents, and knowledge systems that will eventually produce the majority of total output at Basis"* — built on the premise that *"the Basis organization needs to be built agent-native"* and that you should *"treat your company context like a codebase"* ([building-for-AGI][agi]).

The connective tissue is **Satellite**, a unified MCP gateway: *"one MCP endpoint that fronts 36 providers, with one identity layer for human callers and a second for service-to-service callers"* — humans authenticate with Google SSO, services with account credentials + per-service allowlists, and every call is logged *"at roughly 30,000 lines per hour"* ([Satellite][satellite]). It serves whatever harness an engineer uses — *"Claude Code, Codex, Cursor, and Cowork all support MCP"* — and per-teammate third-party integration use jumped from 3.2 to 17.3 after launch ([Satellite][satellite]).

![Basis internal Atlas platform: engineers using Claude Code, Codex, Cursor or Cowork (Google SSO), the Clueso incident agent running in a Modal VM on the Claude Agent SDK, and other internal services (service-account + allowlist) all call one unified Satellite MCP endpoint with two identity layers and ~30k telemetry lines per hour, which fronts 36 providers grouped as workspace tools, dev tools, Neon Postgres branches, and business systems.](/diagrams/basis/atlas-platform.svg)

<details>
<summary>Mermaid source</summary>

```mermaid
flowchart LR
  classDef human fill:#eef2f8,stroke:#94a3b8,stroke-width:1.5px,color:#0f172a;
  classDef agent fill:#eef0fe,stroke:#6366f1,stroke-width:1.5px,color:#0f172a;
  classDef gw fill:#e7f6ef,stroke:#2f9e6f,stroke-width:1.5px,color:#0f172a;
  classDef ext fill:#e8f1fd,stroke:#2563eb,stroke-width:1.5px,color:#0f172a;

  subgraph Callers["Callers"]
    direction TB
    Eng("Engineers<br/>Claude Code · Codex · Cursor · Cowork<br/>Google SSO"):::human
    Clueso("Clueso<br/>incident agent · Modal VM<br/>Claude Agent SDK harness"):::agent
    Svc("Other internal services<br/>service-account + allowlist"):::agent
  end

  Sat{{"Satellite<br/>one unified MCP endpoint<br/>2 identity layers · ~30k telemetry lines/hr"}}:::gw

  subgraph Providers["36 connected providers"]
    direction TB
    Work("Google Workspace · Slack · Notion · Figma · Granola"):::ext
    Dev("GitHub · Linear · Better Stack · PostHog"):::ext
    Data[("Neon Postgres branches<br/>24h TTL · cap 5/user")]:::ext
    Biz("HubSpot · Gong · People Data Labs · NetSuite · Knock"):::ext
  end

  Eng --> Sat
  Clueso --> Sat
  Svc --> Sat
  Sat --> Work
  Sat --> Dev
  Sat --> Data
  Sat --> Biz
```

</details>

**Clueso** is the proof that the internal agents are load-bearing: an incident-response agent that *"runs in a Modal VM using the Claude Agent SDK as a harness,"* *"pulls error logs, writes queries, steps through our monorepo,"* and *"now debugs more than 78% of incidents on the first pass"* — keeping *"a progress document modeled after a researcher's logbook"* for long investigations and cutting support response times *"almost 50%"* ([Clueso][clueso]). The monorepo itself was reshaped for agents: **100+ nested `AGENTS.md`** files, a `.agents/roles/` directory of six sub-agent roles (incl. a **verifier** and a **standards-enforcer**), and a skills directory — after which *"token usage increased 5x per developer in three months"* and *"commit velocity increased 2.5x"* ([monorepo][monorepo]).

:::note[Inference — internal agents are R&D for the product — confidence: high]
The same primitives appear on both sides: a supervisor delegating to specialized sub-agents (product) mirrors `.agents/roles/` with verifier/enforcer agents (monorepo); the product's "central context layer" mirrors "treat company context like a codebase" (Atlas). Building Clueso and Satellite is how Basis pressure-tests long-horizon agent patterns before — or alongside — shipping them to firms.
:::

## Team

Engineers are **"Members of Technical Staff,"** comp banded **$100K–$300K + equity**, **in-person in Flatiron, NYC, 5 days a week** ([Ashby MTS][mts]). Third-party trackers peg headcount near **~80**; the board lists **30 open roles**, heavily GTM and "Deployed Intelligence," with a compact technical core ([Ashby][ashby]).

| Role | People | Source |
| --- | --- | --- |
| Co-founder / CEO | Matt Harpe | [Series B][seriesb] |
| Co-founder | Mitchell Troyanovsky | [OpenAI case study][openai] |

The org is deliberately fluid: *"We don't have static functional teams. We have pods that … reform every quarter"* and engineers move *"core infra work one quarter and product agent work the next"* ([Ashby MTS][mts]). Technical work spans **Product Engineering, Agent Engineering** (context engineering, tool design), **Agent Platform** (harness engineering, eval systems), **Platform & Infrastructure, Agent Data**, and **Atlas** ([Ashby MTS][mts]). The named non-technical surface is **Deployed Intelligence** — an FDE-style function that *"parachute[s] into our customer's organizations … and give[s] them the tools to redesign their accounting workflows around intelligent agents"* ([Deployed Intelligence][deployed]).

:::note[Inference — applied-ML org, no public research function — confidence: medium]
Every technical role is *applied*: harnesses, eval systems, context/tool engineering over third-party frontier models ([Ashby MTS][mts]). The reasoning substrate is bought (OpenAI for product; Claude/Codex/Cursor harnesses internally), and there's no advertised pretraining or research org — consistent with *"the most advanced applied ML at production scale"* ([Ashby][ashby]) rather than model R&D.
:::

## Process

**Engineering is being redefined as agent-direction.** Basis states *"approx 20% of product engineering at Basis is teaching agents to tackle non-deterministic workflows. We see that being 70% by end of year,"* and frames the job as *"Engineering > Coding … Anything that can be clearly defined and verified will be delegated to an agent"* ([Ashby MTS][mts]). Every engineer gets an **unlimited token budget**, and excitement about coding agents is a stated non-negotiable ([Ashby MTS][mts]).

**Ownership is individualized.** *"Every project at Basis has a single Responsible Party (RP) who is accountable for whether it ships and whether it works"* ([Ashby MTS][mts]) — a named-owner model rather than committee sign-off, which fits a small org delegating execution to agents.

**Conventions are audited, not inherited.** The *Chesterton's Wall* post argues engineering best practices are constraint-coping mechanisms that go vestigial as models improve — even noting a colleague asked to **stop splitting PRs** because small diffs *"confused the AI code assistant"* when scaffolding landed without its integrations ([Chesterton's Wall][chesterton]). Internal eval culture shows up as a recurring **"Prompt Olympics"** ([blog][blog]).

:::note[Inference — the hard open problem is trajectory-level eval — confidence: high]
Basis names its own frontier: *"An agent runs for five hours across thousands of decisions. How do we attribute outcomes back to specific reasoning steps? How do we tune eval judges when the judgement includes subjectivity?"* ([Ashby MTS][mts]). Long-horizon credit assignment and judge-tuning — not raw model capability — are where they're spending engineering.
:::

## Notable bets

1. **Reviewable autonomy as the product.** Not a copilot — agents do the work end-to-end, but every output carries data lineage, mapping rationale, and a confidence signal so a CPA can sign off ([OpenAI case study][openai]).
2. **Model-agnostic by benchmark.** Route each step to the best-scoring model and re-benchmark every release, so the system compounds with model progress instead of betting on one ([OpenAI case study][openai]).
3. **Autonomy gated on explainability.** New workflows go live only when a model can both perform *and* explain — explainability is a release gate, not a nice-to-have ([OpenAI case study][openai]).
4. **Agent-native company.** Treat company context like a codebase; build Atlas, Satellite (unified MCP over 36 providers), and Clueso so internal output is increasingly agent-produced ([building-for-AGI][agi], [Satellite][satellite], [Clueso][clueso]).
5. **Buy reasoning, own orchestration.** OpenAI models for the product; Claude Agent SDK / Codex / Cursor / Cowork as internal harnesses — Basis owns routing, context, tools, and eval, not the models ([OpenAI case study][openai], [Satellite][satellite], [Clueso][clueso]).
6. **Org as a wager.** MTS titles, quarterly-reforming pods, single-RP ownership, unlimited token budgets, and 5-day in-person — an explicit claim that the company structure, not just the tech, is the edge ([Ashby MTS][mts], [building-for-AGI][agi]).

## Unknowns

:::caution[What the public record can't confirm]
Open questions where even a best-practice guess would be a stretch (conventional infra guesses live in [Likely stack & infra choices](#likely-stack--infra-choices)):

- **Product hosting/compute** — Modal is confirmed only for the *internal* Clueso agent ([Clueso][clueso]); the customer-facing product's compute target isn't stated.
- **Customer accounting-data store** — Neon Postgres is named for *dev* branches ([Satellite][satellite]); whether the product's system of record is the same or separate is unstated.
- **Context-layer storage** — the "central context layer" ([OpenAI case study][openai]) clearly implies retrieval, but the vector store / RAG design isn't public.
- **Per-firm isolation & security** — agents touch client financials and a GRC role is open ([Ashby][ashby]), but tenancy isolation and controls aren't described.
- **Trajectory eval mechanics** — Basis names long-horizon credit assignment and judge-tuning as open problems ([Ashby MTS][mts]); how they solve them isn't public.
- **Exact headcount and eng split** — only inferable from open roles and trackers.
:::

## Sources

Reconstructed from public sources only — no insider information. Crawled 2026-06-07. Claim tiers used above: **verified** (stated on a public page, linked) · **inferred** (reasoned from a cited signal, confidence flagged) · **speculative** (best-practice fill-in, labeled). Links are live; pages change, so the supporting quote for each claim is kept in this repo's evidence map (`evidence/basis-evidence-map.md`).

| # | Source | Link |
| --- | --- | --- |
| S1 | Homepage | <https://www.getbasis.ai/> |
| S2 | About | <https://www.getbasis.ai/about> |
| S3 | Careers | <https://www.getbasis.ai/careers> |
| S4 | Blog & News index | <https://www.getbasis.ai/blog> |
| S5 | Series B announcement | <https://www.getbasis.ai/blogs/basis-raises-100m-series-b-led-by-accel-and-google-ventures> |
| S6 | Introducing Deployed Intelligence | <https://www.getbasis.ai/blogs/introducing-deployed-intelligence> |
| S7 | Building a Company for the AGI Era | <https://www.getbasis.ai/blogs/building-a-company-for-the-agi-era> |
| S8 | Your team needs a unified MCP (Satellite) | <https://www.getbasis.ai/blogs/your-team-needs-a-unified-mcp-heres-a-recipe> |
| S9 | How We Made Our Monorepo Ergonomic for Agents | <https://www.getbasis.ai/blogs/how-we-made-our-monorepo-ergonomic-for-agents> |
| S10 | Clueso: an agent that resolves 78% of bugs | <https://www.getbasis.ai/blogs/clueso-how-we-built-an-agent-that-autonomously-resolves-78-of-bugs> |
| S11 | Chesterton's Wall | <https://www.getbasis.ai/blogs/chestertons-wall> |
| S12 | OpenAI case study (quotes Basis) | <https://openai.com/index/basis/> |
| S13 | Job board (Ashby) — incl. Member of Technical Staff (All Levels) | <https://jobs.ashbyhq.com/basis-ai> |

## Speculative reconstruction

:::tip[Best-practice reconstruction, not fact]
Nothing in this section is stated on a public page. It is what a team with *this* stack — a Python/TypeScript monorepo, OpenAI models for a multi-agent product, internal MCP + Neon Postgres + Modal, all in one NYC office — would *typically* build. It's here to complete the picture. In the diagram, solid boxes are verified anchors carried up from the sections above; everything dashed is assumed. Read every dashed box as "likely," not confirmed.
:::

### Likely stack & infra choices

| Component | Likely choice | Why |
| --- | --- | --- |
| Product front end | React / Next.js (TypeScript) | TypeScript is confirmed in the monorepo ([monorepo][monorepo]); React is the low-surprise default for a review-heavy web app |
| Product backend compute | containerized Python services (Modal or a cloud container runtime) | Modal is confirmed for internal Clueso ([Clueso][clueso]); the product's Python services would plausibly reuse the same muscle, but it's unstated |
| Customer data store | PostgreSQL | Neon Postgres is confirmed for dev ([Satellite][satellite]); Postgres is the conventional system of record for structured financial data |
| Context-layer retrieval | embeddings + pgvector / a managed vector DB | a "central context layer" surfacing sources implies retrieval; Postgres-adjacent pgvector is the low-friction choice |
| Customer auth | a managed IdP (Auth0 / WorkOS / Stytch) | Google SSO is confirmed *internally* ([Satellite][satellite]); firm-facing SSO/SAML usually goes through a managed IdP |
| Per-firm isolation | row-level / schema-per-tenant + scoped agent tool access | client financials demand tenancy isolation; an open GRC role ([Ashby][ashby]) signals controls exist |
| LLM gateway | thin internal router over OpenAI (+ benchmark hooks) | the benchmark-driven model selection ([OpenAI case study][openai]) implies a routing abstraction, though it isn't named |
| Secrets | a secrets manager behind Satellite | Satellite already does "secrets-manager indirection" for shared keys ([Satellite][satellite]) |

### Full system architecture

The verified spine is real: accountant users, a GPT-5 supervisor delegating to GPT-5/GPT-4.1 sub-agents chosen by an internal benchmark suite, a central context layer, Satellite for internal data/tools, and Better Stack + PostHog telemetry. Reconstructed here are the **product front end and Python backend**, the **customer data store + vector retrieval**, the **customer auth/IdP**, and **per-firm isolation**.

![Full-system architecture for Basis: verified anchors (accountant users, GPT-5 supervisor and sub-agents, internal benchmark suite, central context layer, Satellite unified MCP, Better Stack/PostHog observability) shown as solid boxes; assumed parts (TypeScript web app, Python backend, customer Postgres, vector store, managed auth IdP, per-firm isolation) shown dashed.](/diagrams/basis/speculative-architecture.svg)

<details>
<summary>Mermaid source</summary>

```mermaid
flowchart TB
  classDef verified fill:#e8f1fd,stroke:#2563eb,stroke-width:2px,color:#0f172a;
  classDef spec fill:#ffffff,stroke:#b4bdca,stroke-width:1.3px,stroke-dasharray:6 4,color:#475569;

  Acct("Accountants · accounting-firm users"):::verified
  App("Product web app · likely<br/>TypeScript front end"):::spec
  Compute("Product backend · likely<br/>Python services · containerized"):::spec

  subgraph Agents["Multi-agent accounting engine"]
    direction TB
    Sup("Supervising agent · GPT-5"):::verified
    Subm("Sub-agents · GPT-5 / GPT-4.1"):::verified
    Bench("Internal benchmark suite<br/>model selection + go-live gating"):::verified
    Sup --> Subm
    Bench -. scores .-> Subm
  end

  Ctx[("Central context layer<br/>assumptions · sources · logic")]:::verified
  Vec[("Vector / retrieval store<br/>for context layer · likely")]:::spec
  PG[("Customer accounting data store<br/>Postgres · likely")]:::spec
  Iso("Per-firm data isolation + GRC controls · likely"):::spec

  Sat{{"Satellite unified MCP<br/>internal data + tools"}}:::verified
  Obs("Observability<br/>Better Stack · PostHog"):::verified
  Auth("Auth / IdP · Google SSO internal; customer authn likely managed IdP"):::spec

  Acct --> App --> Compute
  Compute --> Agents
  Agents <--> Ctx
  Ctx -. embeddings .-> Vec
  Compute --> PG
  PG -. enforced by .-> Iso
  Compute --> Sat
  Compute -. traces .-> Obs
  Acct -. authn .-> Auth
```

</details>

[home]: https://www.getbasis.ai/
[about]: https://www.getbasis.ai/about
[careers]: https://www.getbasis.ai/careers
[blog]: https://www.getbasis.ai/blog
[seriesb]: https://www.getbasis.ai/blogs/basis-raises-100m-series-b-led-by-accel-and-google-ventures
[deployed]: https://www.getbasis.ai/blogs/introducing-deployed-intelligence
[agi]: https://www.getbasis.ai/blogs/building-a-company-for-the-agi-era
[satellite]: https://www.getbasis.ai/blogs/your-team-needs-a-unified-mcp-heres-a-recipe
[monorepo]: https://www.getbasis.ai/blogs/how-we-made-our-monorepo-ergonomic-for-agents
[clueso]: https://www.getbasis.ai/blogs/clueso-how-we-built-an-agent-that-autonomously-resolves-78-of-bugs
[chesterton]: https://www.getbasis.ai/blogs/chestertons-wall
[openai]: https://openai.com/index/basis/
[ashby]: https://jobs.ashbyhq.com/basis-ai
[mts]: https://jobs.ashbyhq.com/basis-ai/d0c983cf-214a-4d03-9ef4-e680ddf5022b
