# Antimetal — evidence map

Crawled 2026-06-07 via claude-in-chrome (logged-in profile) + web search. First-party (antimetal.com, Ashby JDs, github.com/antimetal) prioritized; third-party trackers/press labeled.
Tiers: VERIFIED (stated on a public page) · INFERRED (reasoned from a cited signal) · SPECULATIVE (best-practice fill-in).

**Note on the pivot:** the planning queue filed Antimetal under "Cloud FinOps" — that was its 2022–2023 product (AWS cost optimization). By 2025–2026 the public record shows a full repositioning to an **autonomous production-engineering** platform (a "world model" + agents). This teardown documents the current company; the cost-optimization origin is the founding story, not the present product.

## Source keys
- [home] https://antimetal.com/ (homepage)
- [blog] https://antimetal.com/blog (research log index)
- [vision] https://antimetal.com/blog/the-future-of-infrastructure-is-invisible (Shreyas Iyer, 06/12/2025)
- [worldmodel] https://antimetal.com/blog/building-a-unified-model-of-software-systems (Shreyas Iyer & Thibaud Roy, 01/20/2026)
- [mcp] https://antimetal.com/blog/introducing-antimetal-for-coding-agents (Matt Casey, 04/16/2026)
- [anvil] https://antimetal.com/blog/how-we-automated-technical-implementation (Sai Naidu, 06/05/2026)
- [ashby] https://jobs.ashbyhq.com/antimetal (job board)
- [jd-platform] https://jobs.ashbyhq.com/antimetal/f7619c4a-8e35-4b70-875b-0586a93c9a54 (Platform Engineer)
- [jd-pe] https://jobs.ashbyhq.com/antimetal/c8d8ccad-70cf-4961-ad56-1f5512c7f766 (Product Engineer)
- [jd-agents] https://jobs.ashbyhq.com/antimetal/cc1139f1-e5c3-4527-876e-63d05007ac9b (Product Engineer - Agents)
- [jd-research] https://jobs.ashbyhq.com/antimetal/1bbcb7e5-f3c3-4060-ad50-6f76157fcacf (Research Engineer)
- [gh] https://github.com/antimetal (org)
- [gh-agent] https://github.com/antimetal/system-agent (in-cluster agent)
- [gh-skills] https://github.com/antimetal/skills (MCP / coding-agent plugin)
- [docs] https://docs.antimetal.com/connect (connect / MCP setup)
- [tc] https://techcrunch.com/2023/05/08/antimetal-is-putting-ai-to-work-to-root-out-cloud-cost-inefficiencies/ (third-party, 2023 seed + origin)
- [pr] https://www.prnewswire.com/news-releases/antimetal-raises-20m-to-automate-infrastructure-management-302480516.html (company press release, Series A)
- [builtin] https://www.builtinnyc.com/articles/antimetal-raises-20m-series-a-20250617 (third-party)

---

## WHAT THEY DO

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Building "the autonomous system for production" | VERIFIED | [home] | "Antimetal is the autonomous system for production. Continuously understanding, operating, and improving your environment." |
| A new layer between team and running systems that diagnoses/fixes/prevents | VERIFIED | [home] | "Antimetal is building the autonomous system for production: a new layer between your team and your running systems. It diagnoses. It fixes. It prevents. It learns how your systems run and operates production for you." |
| Core = a live "world model" + an army of specialized agents | VERIFIED | [home] | "At its core sits a live world model, a continuous understanding of how your stack behaves. On top, an army of specialized agents acts on the model to diagnose, fix, prevent, and answer any question." |
| Positions above observability, not replacing it | VERIFIED | [home] | "Antimetal sits on top of the observability tools you already use and uses their data to build and maintain its world model." |
| Default actions route through existing approval flow (PR / pipeline / Slack) | VERIFIED | [home] | "By default, changes still route through your existing approval flow, whether that is a pull request, deployment pipeline, or Slack approval." |
| Org tagline: "For everything that happens after you deploy." | VERIFIED | [gh] | org bio |
| Built in NYC; SOC 2, GDPR, HIPAA compliant | VERIFIED | [home] | "BUILT IN NYC"; "SOC 2, GDPR, AND HIPAA COMPLIANT." |
| Origin: AWS cost optimization ("save up to 75% on your AWS bill") | VERIFIED | [tc] | 2023: proprietary ML model to cut AWS bills, resize/relist reserved instances |

## FOUNDING / FUNDING / SCALE

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Founded 2022; NYC | VERIFIED | [tc] | launched 2022 |
| Matthew Parkhurst — CEO, co-founder | VERIFIED | [pr], [tc] | named |
| Shreyas Iyer — CTO, co-founder | VERIFIED | [pr], [tc], [worldmodel] | named; blog author |
| Seed: $4.3M led by Framework Ventures (Chapter One, IDEO CoLab Ventures) | VERIFIED | [tc] | "$4.3 million … led by Framework Ventures" |
| Series A: $20M led by Sound Ventures (Jun 2025) | VERIFIED | [pr], [builtin] | "$20 million Series A led by Sound Ventures" |
| Series A angels: Buckley Ventures, Nat Friedman, Daniel Gross, Aravind Srinivas, Ben Uretsky, Aaron Levie, Arash Ferdowsi | VERIFIED | [pr] | named participants |
| CEO framing: complexity, not headcount | VERIFIED | [pr] | "More dashboards, more alerts, more tools. It's not a headcount problem. It's a complexity problem." |
| ~20 employees (11–50 band) | INFERRED | third-party trackers + [ashby] 9 open roles | not first-party |

## STACK (first-party)

| Layer | Choice | Tier | Source | Quote/signal |
| --- | --- | --- | --- | --- |
| Primary backend language | TypeScript | VERIFIED | [jd-platform], [jd-pe], [jd-agents] | "Proficient in TypeScript"; "Strong experience in Typescript, React, Postgres, and NestJS" |
| Backend framework | NestJS | VERIFIED | [jd-pe], [jd-agents] | "Typescript, React, Postgres, and NestJS" |
| Frontend | React | VERIFIED | [jd-pe], [jd-agents] | "from backend data models to React interfaces" |
| Primary datastore | PostgreSQL | VERIFIED | [jd-pe], [jd-agents] | "Postgres" |
| Research/ML language | Python (+ TypeScript) | VERIFIED | [jd-research] | "Proficient in Python and Typescript, with experience using common ML libraries" |
| In-cluster agent language | Go | VERIFIED | [gh-agent], [gh] | system-agent repo is Go (96%); org top languages Go/TS/Python |
| In-cluster telemetry collection | eBPF | VERIFIED | [gh-agent] | "eBPF programs (/ebpf): GPL-2.0-only … standard practice … for projects that include both userspace and eBPF code"; performance collectors + hardware discovery |
| Container orchestration | Kubernetes | VERIFIED | [jd-platform], [gh] helm-charts | "service architecture on Kubernetes … operating production services on Kubernetes" |
| Deployment packaging | Helm charts; Docker (linux/amd64 + arm64) | VERIFIED | [gh-agent], [gh] helm-charts | "helm chart … published in the antimetal/helm-charts repo"; "We build linux/amd64 and linux/arm64 images." |
| Telemetry standard | OpenTelemetry (OTEL) | VERIFIED | [jd-platform], [gh] opentelemetry-demo | "observability (OTEL, Datadog)"; org maintains an opentelemetry-demo fork |
| Internal observability | Datadog, OTEL/distributed tracing | VERIFIED | [jd-platform] | "observability (OTEL, Datadog)"; bonus: "modern observability (OTEL, distributed tracing)" |
| Customer onboarding IaC | Terraform (provider + AWS module) | VERIFIED | [gh] | terraform-provider-antimetal (Go, MPL-2.0), terraform-aws-antimetal (HCL, MIT) |
| Agent ↔ tools fabric | MCP gateway; self-hosted MCP servers; OAuth/credential mgmt | VERIFIED | [jd-platform], [mcp], [gh-skills] | "the MCP gateway that routes every tool call, the OAuth and credential management … the deployment and lifecycle of self-hosted MCP servers" |
| Public MCP endpoint | mcp.antimetal.com | VERIFIED | [mcp], [gh-skills] | "The server is live at mcp.antimetal.com" |
| Retrieval surfaces | semantic search + keyword + API + SQL | VERIFIED | [jd-agents] | "context and retrieval systems … (semantic search, keyword, API, SQL)" |
| Coding agent (internal) | Claude Code (heavy use) | VERIFIED | [jd-platform] | "We're all heavy users of Claude Code … the Claude-Code-native skills our engineers use every day to ship." |
| Internal onboarding tool | Anvil | VERIFIED | [anvil], [jd-platform] | "Anvil is an internal application … internal admin tooling (Anvil)" |
| Docs platform | Mintlify | VERIFIED | [gh] | mintlify-docs repo (MDX) |
| Cloud | AWS | VERIFIED (origin) / INFERRED (own infra) | [tc], [gh], [jd-agents] | AWS-first product; terraform-aws module; AWS named in jd-agents bonus |

## ARCHITECTURE — THE WORLD MODEL (from [worldmodel])

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| v1 was a search-and-synthesis agent loop; degraded on complex incidents | VERIFIED | [worldmodel] | "The first version of Antimetal was an AI agent in a simple search-and-synthesis loop … in complex environments, quality quickly degraded." |
| Diagnosis: a representation problem, not a data problem | VERIFIED | [worldmodel] | "This wasn't a technology problem. It was a representation problem." |
| World model = 4 layers: structural, temporal, causal, semantic, updating continuously | VERIFIED | [worldmodel] | "the structural, temporal, causal, and semantic layers … Together, they form a single unified model that updates continuously." |
| Structural = ontology + runtime graph + code call graph, linked by logs/traces | VERIFIED | [worldmodel] | "We built an ontology that maps software components from any provider to a shared lexicon"; "Parsing code into ASTs, resolving functions and call sites"; "Logs and traces … are that link." |
| Temporal = streaming (always up-to-date) + time travel (diff vs past) | VERIFIED | [worldmodel] | "moving from periodic snapshots to a streaming architecture"; "it has to support time travel. The ability to rewind to any point in the past … and diff against the current state." |
| Causal = learned DAGs from changes, postmortems, reasoning traces | VERIFIED | [worldmodel] | "We encode these relationships as causal graphs: directed acyclic graphs"; sources: "System changes … Postmortems … Reasoning traces" |
| Semantic = learned by watching engineers work; service→system→domain hierarchy | VERIFIED | [worldmodel] | "we build this layer by watching engineers work … Services cluster into systems, and systems cluster into domains." |
| Model is a coordination surface: parallel agents over the same model | VERIFIED | [worldmodel] | "multiple agents can investigate different regions of the system in parallel, each using the full model" |
| Scale claim: thousands of services, trillions of data points/day | VERIFIED | [worldmodel] | "environments with thousands of services emitting trillions of data points per day." |

## PRODUCT SURFACES / AGENTS (from [home], [mcp], [gh-skills])

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Patrol agent — proactive risk/regression/drift watch | VERIFIED | [home] | "PROACTIVE / Patrol — Continuously watches for operational risks, regressions, and system drift." |
| Triage agent — turns noisy signals into structured issues | VERIFIED | [home] | "REACTIVE / Triage — Turns noisy production signals into structured, actionable issues." |
| World Model agent — learns system/team behavior | VERIFIED | [home] | "INTELLIGENCE / World Model — Continuously learns how your systems and teams behave and evolve." |
| Agent Builder — custom agents via natural language | VERIFIED | [home] | "PLATFORM / Agent Builder — Create custom operational agents via natural language." |
| MCP product: 50+ integrations (Datadog, CloudWatch, Grafana, PagerDuty…) | VERIFIED | [mcp] | "Antimetal pulls from 50+ integrations—Datadog, CloudWatch, Grafana, PagerDuty, and more" |
| MCP exposes 6 tools | VERIFIED | [mcp], [gh-skills] | investigate_issue, get_issue_report, get_issue_fixes, search_issues, get_artifact, ask |
| Skills: /investigate, /fix, /antimetal-mcp-setup | VERIFIED | [gh-skills] | command list |
| MCP clients: Claude Code (OAuth), Cursor (API key); also VS Code/Copilot, Windsurf, Codex per docs | VERIFIED | [gh-skills], [mcp], [docs] | "Bring Antimetal's … intelligence into Claude Code and Cursor"; [mcp]: "works in Cursor, Claude Code, VS Code with GitHub Copilot" |
| In-cluster system-agent connects infra to platform | VERIFIED | [gh-agent] | "Component that connects your infrastructure to the Antimetal platform." |

## PROCESS / TEAM

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| 9 open roles, all NYC on-site; 4 engineering (Platform, Product, Product-Agents, Research) | VERIFIED | [ashby] | board: "Open Positions (9)"; Engineering (4) |
| Eng comp: Senior $200–250K, Staff $250–300K, + equity | VERIFIED | [jd-platform], [jd-pe], [jd-research] | salary bands |
| In-person from NYC office; builder culture; experimentation-heavy | VERIFIED | [jd-pe] | "excited to work in-person from our new and spacious office in New York … Thrive in a fast-paced iterative environment" |
| Anvil: automate onboarding before hiring FDEs | VERIFIED | [anvil] | "Most startups scale onboarding by hiring forward-deployed engineers. We built Anvil to do most of it in software, before reaching for people." |
| Anvil 5-stage pipeline: Scope → Configure → Secure → Verify → Launch | VERIFIED | [anvil] | stage list |
| Anvil cut hands-on onboarding work ~80% on hardest accounts | VERIFIED | [anvil] | "Anvil has cut the hands-on work by around 80%." |
| Sandboxed shadow-traffic envs to test against live customer events | VERIFIED | [anvil] | "we've created sandboxed shadow traffic environments to run our product against live customer events." |
| Research areas: infra intelligence, autonomous agents (RL), evaluation | VERIFIED | [jd-research] | research areas list; "multi-step reasoning, orchestration, context management, memory, and reinforcement learning" |
| Eval treated as core infra (live + offline pipelines, synthetic data) | VERIFIED | [jd-research], [jd-agents], [anvil] | "live and offline evaluation pipelines, benchmarks, and synthetic data generation"; Anvil "verification and eval suites" |

## NOTABLE BETS (interpretive — INFERRED from cited signals)

| Bet | Tier | Basis |
| --- | --- | --- |
| The world model is the moat (representation > raw data/model) | INFERRED | [worldmodel] thesis: "missing understanding," not missing data |
| Own the in-cluster collection layer (Go + eBPF agent) | INFERRED | [gh-agent] eBPF/performance collectors → first-party telemetry, not just vendor APIs |
| Aggregate the observability ecosystem rather than replace it | VERIFIED | [home], [mcp] | "sits on top of the observability tools you already use"; 50+ integrations |
| Meet engineers in the coding agent (MCP + skills), not just a dashboard | VERIFIED | [mcp], [gh-skills] | the MCP product |
| Automate the company's own ops first (Anvil) — software over headcount | VERIFIED | [anvil] | dogfooding thesis |
| Trust earned gradually: assist → automate as override rates drop | VERIFIED | [vision], [home] | "Initially, these systems should assist … As confidence grows … it begins automating"; approval-flow default |

## UNKNOWNS (open)
- LLM provider(s) for the agents (Claude Code is the internal coding tool; the production reasoning model isn't named).
- The streaming/time-travel datastore for the temporal layer (Postgres confirmed for product; the temporal graph store isn't named — likely a graph/time-series/event store).
- Vector store / index behind semantic retrieval (semantic search confirmed; engine not named).
- Agent orchestration framework (multi-step reasoning/RL described; framework not named).
- Whether models are fine-tuned/distilled in-house vs. prompted frontier models (research JD mentions fine-tuning + RL; production specifics not stated).
- Exact headcount, ARR, customer count, valuation (third-party/unstated).
- Cloud for their own platform (AWS-first heritage; own-infra cloud not explicitly stated).
