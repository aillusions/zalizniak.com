# Gradient Labs — evidence map

Crawled 2026-06-10 via claude-in-chrome (logged-out) + the Ashby posting API (`api.ashbyhq.com/posting-api/job-board/gradient-labs`). First-party (gradient-labs.ai, the engineering blog at blog.gradient-labs.ai, Ashby board) prioritized; press third-party.
Tiers: VERIFIED (stated on a public page) · INFERRED (reasoned from a cited signal) · SPECULATIVE (best-practice fill-in).

## Source keys
- [home] https://gradient-labs.ai/
- [about] https://gradient-labs.ai/about
- [blog] https://gradient-labs.ai/blog  (marketing blog index)
- [eng] https://blog.gradient-labs.ai/archive  (engineering blog / Substack)
- [owl] https://blog.gradient-labs.ai/p/drawing-the-rest-of-the-owl  (Backend Engineering, May 2024)
- [resilient] https://blog.gradient-labs.ai/p/building-resilient-agentic-systems  (Sep 2025)
- [incident] https://blog.gradient-labs.ai/p/anatomy-of-an-ai-agent-incident  (Aug 2025)
- [blend] https://blog.gradient-labs.ai/p/llms-at-gradient-labs-the-perfect  (LLMs: the perfect blend, Apr 2025)
- [rag] https://blog.gradient-labs.ai/p/are-ai-agents-just-rag-in-disguise  (May 2024)
- [sop] https://blog.gradient-labs.ai/p/making-customer-support-automation  (procedures-as-documents, Jul 2024)
- [ashby] https://jobs.ashbyhq.com/gradient-labs  (JD text via Ashby posting API)

JD note: the Ashby board is JS-rendered; role text was read via the public Ashby posting API. Per-posting deep links weren't captured, so JD rows cite the board [ashby].

---

## WHAT THEY DO

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| AI agent for customer operations in financial services | VERIFIED | [home] | "AI-native customer operations for financial services … A suite of specialist agents for lending, disputes, and KYC with a platform that runs the operations in between" |
| Specialist agents: collections, disputes, onboarding, KYB, insurance claims, customer service | VERIFIED | [home] | per-use-case descriptions on homepage |
| One unified agent across customer operations | VERIFIED | [ashby] (Product Eng) | "it serves as one unified agent across the entirety of your customer operations" |
| Channels: email, text, voice | VERIFIED | [home] | "natural conversations on email, text, and voice" |
| Trained on SOPs + best human agents, not just help centre | VERIFIED | [home] | "Learns from real conversations, not just your help centre, and executes natural-language procedures that mirror your operations" |
| 80–90% peak resolution; 98% CSAT; 32M customers served | VERIFIED | [home] | stat tiles: "80-90% Peak resolution rate", "98% CSAT", "32M Customers served by our AI agents" |
| 20+ guardrails on every turn | VERIFIED | [home] | "Financial-services-specific guardrails run on every turn of conversation"; "20+ guardrails out of the box" |
| Regulatory coverage: FCA Consumer Duty, CONC, Reg E/Z, PSD2, GDPR, EU AI Act | VERIFIED | [home] | "Built for US, UK, and EU rules: FCA Consumer Duty, CONC, Reg E and Reg Z, PSD2, GDPR, and the EU AI Act" |

## FOUNDERS / FUNDING / SCALE

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Founders: Dimitri Masin (CEO), Danai Antoniou (Chief Scientist), Neal Lathia (CTO) | VERIFIED | [about] | leadership grid with these three titles |
| All three ex-Monzo; started/scaled Data Science & ML there | VERIFIED | [about] | "Dimitri, Neal, and Danai met at Monzo … where they started and scaled the Data Science and Machine Learning disciplines" |
| Dimitri = Monzo's 20th employee, led 100+ data team | VERIFIED | [about] | "Dimitri was Monzo's 20th employee, growing and leading the data team of 100+" |
| Founded 2023; 14 months stealth; launched 2024 | VERIFIED | [about], [ashby] | "Founded in 2023"; "spent 14 months developing in stealth … launched their flagship AI agent in 2024" |
| Over 40 employees | VERIFIED | [about] | "Gradient Labs has grown to over 40 employees" |
| Seed £2.8M led by LocalGlobe (Aug 2024) | VERIFIED | [about] press | "Monzo alumni raise £2.8m led by LocalGlobe … August 20, 2024" |
| Series A $13M led by Redpoint Ventures (Jul 2025), w/ Exceptional Capital, Liquid 2, LocalGlobe, Puzzle | VERIFIED | [eng] | "$13M Series A led by Redpoint Ventures, with participation from Exceptional Capital, Liquid 2, LocalGlobe, Puzzle…" |
| Series A increased to $26M, led by Octopus Ventures and CommerzVentures (Jun 2026) | VERIFIED | [blog] | "Gradient Labs has increased its Series A to $26 million, led by Octopus Ventures and CommerzVentures" |
| Team from Monzo, Pleo, Google (also Wise, Mastercard, Revolut) | VERIFIED | [ashby] | "builders from leading companies like Monzo, Pleo, and Google"; AE/Marketing JDs add "Wise, Mastercard, Revolut" |
| Tom Blomfield (former Monzo CEO) as ambassador / endorser | VERIFIED | [about] | testimonial bylined "Tom Blomfield, Ambassador to the UK Government & Former Monzo CEO" |
| Customers: Plum, Zego, SteadyPay, Pockit, LHV Bank | VERIFIED | [home], [about] | customer stories: Plum, Zego, SteadyPay, Pockit; press: "LHV Bank to run AI PoC … with Gradient Labs" |
| Plum: 30-min setup, no eng effort, 98.6% QA, 80% CSAT | VERIFIED | [home] | "Gradient Labs' AI agent setup took Plum just 30 minutes and no engineering effort, achieving a 98.6% QA score and 80% CSAT" |
| Zego: 16% higher CSAT than human agents | VERIFIED | [home] | "achieving 16% higher scores than their human agents" |
| SteadyPay voice: 60% success among engaged, 20% jump in re-engagement | VERIFIED | [home] | "60% success rate among engaged customers, and a 20% jump in lapsed customer re-engagement" |
| HQ London (Liverpool St), NY office | VERIFIED | [ashby] | "London office, a short walk from Liverpool Street Station"; NY Office postings |

## ARCHITECTURE / STACK

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Backend = Go services | VERIFIED | [owl], [ashby] | "The crux of our backend platform … Go services"; Backend JD "Deep fluency in Go (Golang)" |
| Five backend areas: external-facing services; resource services (conversations, documents, procedures, tasks); FSM; agents (deployed separately); LLM orchestrator | VERIFIED | [owl] | enumerated list of "five areas" |
| Conversation modeled by a finite-state machine | VERIFIED | [owl] | "A finite-state machine that models conversations and is responsible for triggering our first AI agent, dispatching actions, and handling failures" |
| Agents deployed separately for rapid experimentation | VERIFIED | [owl] | "The agents themselves, which we currently deploy separately in order to enable more rapid experimentation" |
| Encore.dev backend engine (Go + Postgres + Pub/Sub to own cloud account) | VERIFIED | [owl] | "Encore.dev is the backend engine that we use to ship our Go services backed by Postgres databases and Pub/Sub to our own cloud provider account" |
| Similarity search via Postgres + pgvector | VERIFIED | [owl] | "We even do our similarity-search using Postgres … and pgvector" |
| Temporal for durable execution / fault tolerance | VERIFIED | [owl], [resilient], [incident] | "Temporal.io is our choice of toolkit"; "we use Temporal, a durable execution system" |
| Each conversation = a long-running Temporal workflow (state, timers, child workflows) | VERIFIED | [incident] | "Each conversation that our agent participates in is a long-running Temporal workflow which manages the conversation's state, timers, and runs child workflows to generate responses" |
| Deployed on Google Cloud Run; GCP + Kubernetes | VERIFIED | [incident], [ashby] | "deployed using Cloud Run"; Backend JD "PostgreSQL, Temporal, GCP, Kubernetes" |
| Also adopted Incident.io, Vercel, Google BigQuery | VERIFIED | [owl] | "we've also adopted Incident.io, Vercel, Google's BigQuery" |
| 2,831 PRs into the journey (May 2024) | VERIFIED | [owl] | "We are 2,831 pull requests into this journey" |
| Multi-model blend: OpenAI, Anthropic, Google (Sonnet, Gemini, GPT) | VERIFIED | [blend], [home], [resilient] | "a blend of Sonnet, Gemini, and GPT models"; "the latest from OpenAI, Anthropic, and Google"; "three major groups of models — from OpenAI, Anthropic and Google" |
| Provider hosting: OpenAI via OpenAI+Azure; Anthropic via Anthropic+AWS+GCP; Google via GCP regions | VERIFIED | [resilient] | "OpenAI models served by: OpenAI and Azure APIs; Anthropic models served by Anthropic, AWS and GCP APIs; and Google models served by GCP APIs in different regions" |
| Each completion request has an ordered provider-preference list; global + per-company; proportional traffic split | VERIFIED | [resilient] | "each completion request starts with an ordered list of API provider preferences … configure these preferences on both a global and a per-company basis … assign them proportionally" |
| Four failover categories: invalid responses, 5XX errors, rate limits, p99+ latency | VERIFIED | [resilient] | "Successful, invalid responses … Errors … We'll failover when we hit most 5XX errors … Rate limits … Latency … failover if the request exceeds a timeout in the p99+ percentile" |
| Model failover: tailored prompt-model pairs for primary + backup models | VERIFIED | [resilient] | "For several critical components of our system, we have tailored prompts for both the primary and backup models" |
| Per-building-block model selection; one-line model swap via internal abstraction | VERIFIED | [blend] | "AI Engineers … pick the ideal model for the building block"; "internal abstraction that enables changing models by editing one line" |
| Completion logging/observability inside the abstraction | VERIFIED | [blend] | "We log each completion request that is made, whether it succeeded or failed; this happens inside of our internal abstraction" |
| Beyond RAG: tool use + procedure orchestration + meta-capability of choosing approach | VERIFIED | [rag] | "a wider set of capabilities needs to be built. Tool use and procedure orchestration and execution are front runners here, as well as the meta-capabilities of knowing when to use which approach" |
| Three query categories: general info / personal info / procedural | VERIFIED | [rag] | "General information … Personal information … Procedural" |
| Vulnerability detection / right answer may be no answer | VERIFIED | [rag] | "identify vulnerability as the overarching problem and redirect the customer to the right team, not answer their informational query" |
| Procedures = plain-English SOPs, not box-and-arrow workflows | VERIFIED | [sop] | "we're doing away with the concept of box & arrow workflows altogether. Instead, we're developing an engine for AI agents to safely follow SOPs that are written in plain English" |
| Workflow blow-up: a moderate login flow needs 60–80 elements | VERIFIED | [sop] | "modelling all the relevant scenarios and edge cases … would require 60-80 workflow elements" |
| Est. 70–80% of manual customer-ops work automatable | VERIFIED | [sop] | "it's possible to automate 70-80% of today's manual customer ops work" |
| AI agents: tool calling, multi-step reasoning, integrate customer APIs; reliable/observable/auditable | VERIFIED | [ashby] (AI Eng) | "agentic systems powered by LLMs — handling tool calling, multi-step reasoning, and integration with customer APIs and data sources … reliable, observable, and auditable from day one" |
| Eval suites are core to dev lifecycle | VERIFIED | [ashby] (AI Eng), [blend] | "Build robust evaluation infrastructure: Create and maintain eval suites"; "designing and evaluating multiple prompt-model pairs … is already part of our development lifecycle" |
| Simulations + customer conversation synthesis as eval tools | VERIFIED | [blend] | "a suite of tools and product features … ranging from simulations all the way through to advanced customer conversation synthesis" |
| Resilience via multi-cloud + multi-LLM failover | VERIFIED | [home] | "Robust failover system across multiple cloud and LLM providers for uninterrupted service" |
| SOC 2 Type 2; SSO, audit logs, RBAC; GDPR | VERIFIED | [home] | "full SOC 2 type 2 certification"; "SSO, comprehensive audit logs, and role-based permissions"; "Fully GDPR compliant" |
| Founding Platform & Security Eng: deploy agent globally across multiple clouds (own + others') | VERIFIED | [ashby] | "deploy our platform across our and others' cloud environments"; "deploy our agent globally across multiple clouds" |
| Memory-leak incident root-caused to Temporal workflow cache; Cloud Run autoscaling pitfall | VERIFIED | [incident] | Temporal "Workflow cache … stores workflow execution histories"; "Cloud Run … auto scales based on incoming HTTP requests … Since our agent is a Temporal workflow, it had none of these" |
| Google Cloud Profiler used for diagnosis | VERIFIED | [incident] | "The Google Cloud Profiler flame graphs deltas … finally shed some light" |

## TEAM / PROCESS

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Technology roles: AI Engineer, Backend Engineer, Founding Platform & Security Engineer, Product Engineer (London) | VERIFIED | [ashby] | Technology dept postings, all London Office, Hybrid |
| Hybrid 2–3 days/week, London office | VERIFIED | [ashby] | "hybrid model from our London office … collaborate and connect 2-3 days a week" |
| Backend Eng is senior/staff+ scope; owns systems 0→1→scale | VERIFIED | [ashby] (Backend) | "Senior, Staff, Principal or Distinguished level in practice"; "Take Products from 0 → 1 → Scale" |
| Founding Platform & Security Eng reports to CTO | VERIFIED | [ashby] | "Reporting directly to the CTO, you'll lead the technical vision for Platform & Security" |
| AI Engineer is a build-and-ship, customer-facing role | VERIFIED | [ashby] (AI Eng) | "This is a build-and-ship role … You'll be the technical counterpart in customer conversations" |
| AI Delivery team supports customers to go live (ex-finance) | VERIFIED | [home], [ashby] | "our AI delivery team will support you"; "We come from finance"; AI Delivery Lead/Associate roles |

## SPECULATIVE (labeled in teardown)

| Claim | Tier | Basis |
| --- | --- | --- |
| LLM router/gateway logic is fully in-house | INFERRED | named "orchestrator"/"internal abstraction" [owl][blend]; routing + failover logic described, no third-party gateway named |
| Eval = in-house harness + LLM-as-judge + simulation | SPECULATIVE | "eval suites" [ashby], "simulations … conversation synthesis" [blend]; exact tooling unstated |
| Guardrail engine = layered deterministic + LLM policy checks per turn | SPECULATIVE | "20+ guardrails on every turn" [home]; implementation unstated |
| Auth/SSO via a vendor (e.g. WorkOS) | SPECULATIVE | "SSO … audit logs … role-based permissions" [home]; vendor unnamed |
| Frontend = Next.js on Vercel | INFERRED | Vercel verified [owl]; Next.js is the conventional pairing; Product Eng role |
| Voice agent uses a telephony + STT/TTS vendor | SPECULATIVE | voice product [home]; vendor unnamed |
| Single-tenant / deploy-into-customer-cloud for some enterprise | INFERRED | "across our and others' cloud environments" [ashby]; scope/customers unstated |
| Message bus = GCP Pub/Sub (via Encore) | VERIFIED-ish | "Pub/Sub" via Encore [owl]; assumed GCP Pub/Sub given GCP stack |
