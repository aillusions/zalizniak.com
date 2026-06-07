# Pallet teardown — evidence map (Phase 1)

Crawl date: 2026-06-07. Classification: **VERIFIED** (stated/shown on a public page), **INFERRED** (reasoned from a signal; page doesn't state it directly), **UNSUPPORTED** (no public signal found).

Sources (archive links in `temp/archive-results.txt`):
- S1 `https://www.pallet.com/` — homepage
- S2 `https://www.pallet.com/product/agent` — Agents/platform product page
- S3 `https://www.pallet.com/product/atlas` — Atlas product page
- S4 `https://www.pallet.com/company` — company / careers
- S5 `https://www.pallet.com/blog/pallet-forge` — Forge announce (Raman, 2026-05-14)
- S6 `https://www.pallet.com/blog/introducing-deep-reasoning` — Deep Reasoning (Kaiser, 2025-09-02)
- S7 `https://www.pallet.com/blog/memory-reasoning-overview` — "Real AI Agent vs ChatGPT Wrapper" (Patel, 2025-09-05)
- S8 `https://www.pallet.com/blog/pallet-core` — Pallet Core (Raman, 2026-02-09)
- S9 `https://www.pallet.com/blog/parallel` — Parallel Agents (Raman, 2025-12-15)
- S10 `https://www.pallet.com/blog/continuous-intelligence` — Continuous Intelligence (Raman, 2026-02-26)
- S11 `https://encore.dev/customers/pallet` — Encore customer story (Kohlberg, 2026-04-07)
- J1 FDSE `…/jobs/5065850007` · J2 Product Engineer `…/5149075007` · J3 Platform Eng, Security `…/5107230007` · J4 Security Platform Eng `…/5153428007` · J5 Enterprise Deployment Strategist `…/5149065007`
- S12 `https://pallet.safebase.us/` — CoPallet Trust Center (SafeBase)

---

## §1 What they do

| Claim | Class | Source | Quote / signal |
|---|---|---|---|
| AI agents for logistics back-office (scheduling, load mgmt, data entry, docs) for 3PLs/brokers/warehouses | VERIFIED | J1–J5, S2 | "automating the manual workflows… scheduling and appointment setting to data entry and load management"; S2 use cases: order entry, load building, POD retrieval, invoice auditing, customs |
| Meets legacy systems at whatever interface they offer (TMS/WMS/ERP, on-prem AS400) | VERIFIED | S2, S5 | S2: "pre-built MCP connectors with all common TMS, WMS, and ERP systems… any system with an API, including on-premise AS400-based databases"; S5: "on-prem infrastructure including AS400 systems. Where APIs don't exist, Pallet builds them." |
| "$1T of logistics spend globally goes to administrative back office work" | **UNSUPPORTED** | — | Not found. Pallet's pages cite the **total** industry as "$11T" (S4) / "$12 trillion" (J1–J5). No $1T-back-office figure anywhere. |
| Customer quote: "decouple headcount growth from revenue growth… accelerate AI" | VERIFIED | S8 | Exact, attributed to **David Radom, CEO, Prism Logistix**: "We have to decouple headcount growth from revenue growth, and the only way to do that is to accelerate AI. Pallet increases our operating margin by 10%." (Draft left it anonymous.) |
| $50M raised; General Catalyst, Bessemer, Bain Capital Ventures | VERIFIED | J1–J5 | "We've raised $50M from top investors, including General Catalyst, Bessemer Venture Partners, and Bain Capital Ventures." |
| Series A+B | INFERRED (med) | S11 | S11 calls them "A Series-B funded supply chain technology company." Series B stated; "A+B" is the obvious implication, not stated. |
| 70+ logistics orgs in production | VERIFIED | S8 | "More than 70 logistics organizations, including Mallory Alexander, Knight-Swift Transportation, Lineage Logistics, STG Logistics, and Prism Logistix use Pallet in production today." |
| ~70 people (~60 SF, ~10 NY) | **UNSUPPORTED** | — | No headcount figure on any page. SF + NYC offices confirmed (J1–J5), split not. |
| CEO/founder Sushanth Raman | VERIFIED | S5, S8, S9, S10 | Byline "Sushanth Raman, CEO and founder." |
| Nilkanth Patel = CTO / Head of Product Engineering | VERIFIED | J2, S7 | J2: "Executive Chat - Nilkanth (Neel) Patel, CTO"; S7 byline "Nilkanth Patel, Head of Product Engineering." |
| ⅓ of team from logistics operators (Uber Freight, CEVA, Worldwide Express) | **UNSUPPORTED** | — | Pages cite tech backgrounds only: "leaders from Google, DoorDash, YC" (J1–J5); "Scale AI… DoorDash… Rippling" (J3/J4); "Aren (ex-Google), Nilkanth (ex-DoorDash), Vidhur (Document AI at Scale)" (J2). No logistics-operator pedigree, no Uber Freight/CEVA/Worldwide Express. |
| Four surfaces: CoPallet, Forge, Atlas, Core | VERIFIED (w/ refinement) | S2, S5, S3, S8 | All four exist: **CoPallet**=the agent (J1, S12 "CoPallet Trust Center", S4 footer "Try CoPallet"); **Forge** (S5); **Atlas** (S3); **Pallet Core** (S8). But live platform is now decomposed as **Agents / Forge / Memory / Intelligence / Fabric / Platform** (S2) + Atlas + Core. "Four surfaces" understates the current platform framing. |

## §2 Stack

| Claim | Class | Source | Quote / signal |
|---|---|---|---|
| Cloud = GCP | VERIFIED | J1–J5, S11 | "hosted on GCP"; S11 title "…on GCP without touching Terraform." |
| Cloud SQL (Postgres) | VERIFIED | S11, J1–J5 | S11: "The database is Cloud SQL"; JDs: "Database: PostgreSQL." |
| Pub/Sub | VERIFIED | S11 | "a service with Postgres, bucket storage, and Pub/Sub running on GCP in under an hour"; "Event-driven primitives. Pub/Sub setup that 'just works.'" |
| Bucket storage (Cloud Storage) | VERIFIED | S11 | "Postgres, bucket storage, and Pub/Sub." |
| Vertex AI (fine-tuned models) | VERIFIED | J1 | "fine-tuned models on Vertex AI." |
| Cloud Run (not GKE/Compute Engine) | **UNSUPPORTED** | — | No compute service named. Encore-on-GCP commonly uses Cloud Run, but that's an inference about Encore's defaults, not a Pallet statement. |
| Secret Manager, VPC, Cloud Load Balancer, Security Command Center | **UNSUPPORTED** | — | None named publicly. J3/J4 say only generic "authentication, authorization, secrets management, and access control." |
| Backend: Node.js + TypeScript on Encore.dev, event-driven, on GCP | VERIFIED | J1–J5, S11 | "Backend: Node.js + TypeScript, Encore for server-side development and managed DevOps, hosted on GCP"; J1: "Event-driven design with message passing and queues." |
| Encore = their "DevOps department" | VERIFIED | S11 | "Encore's platform acts as the team's 'DevOps department.'" |
| Encore chosen after evaluating Hono/Bun/Elysia/FastAPI to avoid Terraform | VERIFIED | S11 | "The team evaluated Hono, Bun, Elysia, and FastAPI, with a preference for TypeScript"; CTO: "I've used Terraform, but… I don't want me or my team to deal with it." |
| "service w/ Postgres, bucket storage, Pub/Sub on GCP in under an hour" | VERIFIED | S11 | Exact quote. |
| Encore Cloud — resources in Pallet's own GCP account, portable | VERIFIED | S11 | "All resources live in Pallet's own Google Cloud, fully visible and portable"; "I still see all my resources in the Google Cloud console. I can take it with me." |
| Frontend: Next.js / React / TypeScript on Vercel | VERIFIED | J1–J5 | "Frontend: Next.js + React + TypeScript. Hosted on Vercel" (J1); "React + TypeScript, hosted on Vercel" (J2–J4). |
| Possible GraphQL layer (bonus JD skill) | VERIFIED | J2 | "Bonus: Node.js, TypeScript, GraphQL." |
| LLMs: OpenAI, Anthropic, Google foundation models | VERIFIED | J1–J4, S7 | "LLMs: OpenAI, Anthropic, Google (foundation models)"; S7: "multiple models from different providers, including OpenAI, Google, Anthropic." |
| Routed through **OpenRouter** | **UNSUPPORTED** | — | No router/aggregator named anywhere. |
| Specific model roster (GPT-5, o3, Claude-4-Sonnet, Grok-4/3-mini, Gemini-2.5, DeepSeek R1, Llama-4 Scout/Maverick, Qwen 32B) | **UNSUPPORTED** | — | Only provider names (OpenAI/Anthropic/Google) appear; no model list. |
| Proprietary model trained on licensed supply-chain data | VERIFIED | S8 | "Pallet's proprietary model, trained on licensed supply chain datasets. Pallet's model leads frontier models in speed and accuracy benchmarks." |
| Browser automation: Browserbase + Playwright | VERIFIED | J1/J2 (Playwright), J3/J4 (Browserbase) | J1/J2: "Playwright"; J3/J4: "Browserbase (browser automation)." Both appear across JDs → division of labor, as draft says. |
| Auth: Stytch (passwordless) | **UNSUPPORTED** | — | Not named. J3/J4 only generic "authentication… access control systems." |
| RS256-signed JWTs w/ audience validation | **UNSUPPORTED** | — | Not named. |
| Observability: Datadog | VERIFIED | J1 | "Observability: Datadog for logging and metrics." |
| OpenTelemetry tracing | **UNSUPPORTED** | — | Only Datadog named; no OTel. |
| Compliance: SOC 2 Type 2 | VERIFIED | S2, S12 | S2 FAQ: "Pallet is SOC 2 Type 2 compliant"; S12 lists SOC 2 Type 2 + Type 1. |
| GDPR, CCPA | **UNSUPPORTED** | — | Not stated. S12 says only "follow all applicable privacy regulations." |

## §3 Architecture

| Claim | Class | Source | Quote / signal |
|---|---|---|---|
| Event-driven end to end: "Everything in the system would be triggered by events" | VERIFIED | S11 | Exact quote (the CTO's stated requirement). |
| Async operations over Pub/Sub (managed by Encore) | VERIFIED | S11, J1 | S11 Pub/Sub orchestrated automatically; J1 "message passing and queues." |
| Multi-tenant w/ per-org data isolation | INFERRED (med) | S7, S8, S10 | Per-customer rules/memories pervasive ("20 custom rules per customer across 200 customers", S7; "customer-level operating rules", S8). Tenancy strongly implied; isolation **mechanism** not stated. |
| RLS via `CREATE POLICY … USING (organization_id = current_setting(...))` | **UNSUPPORTED** | — | No SQL/RLS detail public. |
| "organization-scoped data isolation maintained across all LLM operations" | **UNSUPPORTED** | — | Not found as a statement. |
| Staging / QA / production environments; "multiple services" | VERIFIED | S11 | "Staging, QA, and production environments"; "running 4 environments on GCP"; "started with… a handful of services. Now we have multiple environments." |
| Convergence: MCP connectors ("Fabric") to TMS/WMS/ERP, built once | VERIFIED | S2 | "pre-built MCP connectors with all common TMS, WMS, and ERP systems"; S2 platform component **"Fabric: Connectors to every system, including on-prem systems."** |
| Fallback hierarchy → browser automation → any API incl. on-prem AS400 | VERIFIED | S2, S5 | S2 quote above; S5: "Where APIs don't exist, Pallet builds them." |
| Divergence in **data** (Memory Layer in Postgres), not per-tenant code | VERIFIED (concept) | S5, S7, S10 | S7: SOPs "broken into thousands of 'memories'… stored… in plain English"; S10: "Only validated memories are committed to your Enterprise Memory Layer." Memory-as-divergence is explicit. (Memory store = Postgres is INFERRED — DB is Cloud SQL Postgres, S11.) |
| "Everest… 20,000 customer-specific memories… inferred from their inbox" | VERIFIED | S5 | Exact quote. |
| LLM + memory absorbs heterogeneity (the key bet) | INFERRED (high) | S5, S7, S10 | Reasoning over the above; framing is the teardown's, well-supported. |
| Customer-facing composable agent builder ("modular action and reasoning nodes") | VERIFIED | S2 | "a composable agent builder with modular action and reasoning nodes, so you can assemble agents." S8: "A flexible agent builder orchestrates workflows across tasks, tool calls, and validation steps." |
| Internal workflow authoring = code + Zod schemas + prompts | **UNSUPPORTED** | — | "code + prompts" plausible but the **Zod** specific is not public. |

## §4 Agent execution

| Claim | Class | Source | Quote / signal |
|---|---|---|---|
| Generator/Judge ("AI Operations Specialist" / "AI Quality Controller") | VERIFIED | S6 | "Generator: Your AI Operations Specialist"; "Judge: Your AI Quality Controller"; reject→feedback loop; escalate to human after multiple iterations. |
| "Deep Reasoning" = produce-then-critique over feedback cycles | VERIFIED | S6, S7 | S6: "two complementary AI models that work together to generate and judge outputs over multiple feedback cycles." |
| Multi-model consensus / cross-model validation for confidence | VERIFIED (concept) | S7, S9 | S7: "reasoning is done by multiple models from different providers… each working independently"; S9: "field-level confidence scoring and cross-model validation. High-confidence fields… automatically. Low-confidence… flagged for human review." |
| Weight by performance + dedicated model analyzes spread; `confidenceMethod: 'llm-judge' \| 'pure-confidence'` | **UNSUPPORTED** | — | The enum / weighting scheme is not public. Concept of confidence scoring is (above). |
| Typed actions as guardrails; `z.enum(['click','fill','navigate','prompt'])` | **UNSUPPORTED** (concept INFERRED) | S2, S8, S6 | Guardrailed-agentic concept supported (agent builder + "validation steps" + judge); the **Zod typed-action contracts / z.enum** code is not public. |
| Dynamic compute routing: lightweight workers vs GPU instances | **UNSUPPORTED** (concept INFERRED) | S9 | S9 verifies "dynamically spins up multiple AI workers" / parallel workers; the **lightweight-vs-GPU** split is not stated. |
| Many trigger/execution surfaces: email, API, portal navigation, voice | VERIFIED | S7, S2 | S7 Interaction Layer: "sending the email, pushing an API call, navigating through a third-party portal, or making a voice call"; S2: "Any system, email, voice, and browser." |
| Voice vendors ElevenLabs/Bland/Cartesia named as landscape (med-confidence in-product) | VERIFIED | S7 | "voice is a rapidly maturing technology with vendors like OpenAI, ElevenLabs, Bland, and Cartesia." Framed as landscape, not Pallet's confirmed stack — matches draft's hedge. |

## §5 Team

| Claim | Class | Source | Quote / signal |
|---|---|---|---|
| 13 open roles | VERIFIED | S4 | 13 postings enumerated (Eng 4, Ops 2, Sales 4, G&A 2, Marketing 1). |
| Eng 4: FDSE, 2× Platform/Security Eng, Product Eng | VERIFIED | S4, J1–J4 | All four postings present. |
| Ops 2: Agent PM, Enterprise Deployment Strategist | VERIFIED | S4, J5 | Both present. |
| Sales 4 | VERIFIED (refine) | S4 | Sales Engineer + 2× Senior Enterprise AE (Central, East) + Strategic Sales. (Draft said "three senior AEs"; actually 2 senior AE + 1 Strategic Sales.) |
| G&A 2 (Chief of Staff, Workplace Experience Mgr); Marketing 1 (GTM Strategy) | VERIFIED | S4 | Enumerated. |
| Zero QA/SDET roles | VERIFIED | S4 | None listed. |
| Zero dedicated ML/eval/data-eng roles | VERIFIED | S4 | None listed (Enterprise Deployment Strategist is Ops, not ML research). |
| FDE model: reverse-engineer APIs/ERPs/TMS; onsite ~25% travel; own go-lives | VERIFIED | J1 | Exact: "Reverse engineer undocumented APIs, ERPs, TMS systems"; "Sit onsite with customer teams (~25% travel)"; "Own customer go-lives end-to-end." |
| Paired non-coding Deployment Strategist: "translate complex business processes into executable AI agent workflows" | VERIFIED | J5 | Exact quote; role requires only "Basic SQL literacy", "Excel/PPT." |
| JDs reference each other | VERIFIED (corrected) | J5 | J5: "Partner with **Agent Delivery Engineers** to validate assumptions and execute technically." (Draft misquoted as "Forward Deployed Engineers… validate and execute.") |
| "Agent Delivery Engineers" = internal alias for FDSE | INFERRED (med) | J5, S4 | Term used in J5; no separate "Agent Delivery Engineer" posting exists, so it maps to the FDSE role. |
| Equity at 80th percentile; bonuses tied to go-lives; "extreme ownership"; Claude/Cursor encouraged | VERIFIED | J1, S4 | J1: "Salary and equity at 80th percentile, plus bonuses tied to customer go-lives"; "AI tools encouraged (Claude, Cursor)—but you must understand the architecture." S4 value "Job's not finished… Extreme ownership." |

## §6 Process

| Claim | Class | Source | Quote / signal |
|---|---|---|---|
| "Pallet runs thousands of simulations to validate agent performance before deployment" | VERIFIED | S2 | Exact quote (also S8: "thousands of simulations on synthetic data"). |
| Forge "runs thousands of simulations, diagnoses failures, and iterates automatically", 5–6× | VERIFIED | S5 | Exact: "driving 5-6x faster iteration on deployments." |
| Memory backtesting: "before that memory becomes active, it is backtested against historical scenarios to ensure consistent outcomes" | VERIFIED | S10 | Exact quote. |
| Production observability: OTel on "every network request, decision point, and state transition" → Datadog | **PARTIAL** | J1 | Datadog VERIFIED; "OTel on every network request/decision point/state transition" **UNSUPPORTED** (no such quote; no OTel). |
| Observe-in-prod + simulate model (no QA org) | INFERRED (high) | S2, S5, S10, S4 | Reasoning over verified sim/backtest/Datadog + zero QA roles. |
| CI/CD largely Encore; no GH Actions/CircleCI signal; prod-first | VERIFIED/INFERRED | S11, J1 | Encore-as-deploy-platform VERIFIED (S11); "no GH Actions signal" = absence-of-evidence (INFERRED). J1: "your first week might involve wiring a new integration into production… this isn't demo work." |
| Forge automates the FDE / decouples headcount from revenue | INFERRED (high) | S5, S8 | S5 (Forge compresses deployment) + S8 (Radom quote). Framing is the teardown's. |
| "couple examples late Wednesday… ready to go live [Friday]" | VERIFIED | S5 | Exact, Cody Arsenault, Director of IT, Eassons Transport Group. |
| Eassons: 40 days to live, 98% touchless; every additional customer in 48h | VERIFIED | S5 | "Eassons Transport Group went live in 40 days and now runs 98% touchless… every additional customer onboarded in 48 hours." |

## §8 Unknowns (draft's list — all still genuinely unknown)
Monorepo vs multi-repo; GitHub vs Bitbucket; per-PR ephemeral envs; proprietary-model training infra/method; scripted-vs-agentic ratio; PR gating/CI beyond Encore/on-call; two near-identical security postings (now confirmed **word-for-word identical** body+stack+salary — relist vs 2 headcount still unknown). All UNSUPPORTED/UNKNOWN — correctly placed.

---

## UNSUPPORTED summary (must be removed or moved to Unknowns; never asserted as fact)
1. "$1T back-office spend" pitch (Pallet says $11–12T total industry)
2. OpenRouter as routing layer
3. Specific model roster (GPT-5/o3/Grok/DeepSeek/Llama/Qwen/etc.)
4. `confidenceMethod: 'llm-judge' | 'pure-confidence'` enum
5. Zod typed-action contracts / `z.enum(['click','fill','navigate','prompt'])`
6. RLS `CREATE POLICY … organization_id = current_setting(...)`
7. RS256-signed JWTs w/ audience validation
8. Stytch (passwordless auth)
9. OpenTelemetry tracing (+ "every network request/decision point/state transition")
10. Cloud Run / Secret Manager / VPC / Cloud Load Balancer / Security Command Center (specific GCP services)
11. "organization-scoped data isolation across all LLM operations" (as a statement)
12. Dynamic compute routing: lightweight workers vs GPU instances
13. ~70 people / 60-SF-10-NY split
14. ⅓ of team from logistics operators (Uber Freight, CEVA, Worldwide Express)
15. GDPR / CCPA

## Discrepancies (live source diverged from draft)
- **Customer quote attribution:** "decouple headcount…" is **David Radom, CEO Prism Logistix** (S8), not anonymous.
- **Industry size:** draft "$1T back-office"; live "$11T" (S4) / "$12T" (JDs) total industry — different figure entirely.
- **Product naming:** live platform = Agents/Forge/Memory/Intelligence/Fabric/Platform (+Atlas, +Core). "CoPallet" persists (agent brand, trust-center name, footer CTA) but the nav now says "Agents." Draft's "four surfaces" is dated.
- **JD cross-reference quote:** actual text "Partner with **Agent Delivery Engineers** to validate assumptions and execute technically" (J5) — draft wrote "Forward Deployed Engineers… validate and execute."
- **Sales mix:** 2 Senior Enterprise AE + 1 Strategic Sales + 1 Sales Engineer (not "three senior AEs").
- **Deployment time:** headline is "live in 6 weeks" (S2/S5); "48 hours" is specifically *each additional* Eassons customer after the first (S5), not general onboarding.
- **Team pedigree:** verified backgrounds are tech (Google/DoorDash/Scale/Rippling/YC), not logistics operators.
