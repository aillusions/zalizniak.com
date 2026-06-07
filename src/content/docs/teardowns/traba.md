---
title: Traba
company: Traba
author: Oleksandr Zalizniak
description: How Traba builds its light-industrial staffing marketplace and AI worker-vetting stack — Firestore→Postgres, an ElevenLabs multi-agent interviewer, and the GTM around it, reconstructed from the public record.
lastUpdated: 2026-06-07
---

## What they do

[Traba][home] runs a **light-industrial staffing marketplace**: businesses (warehousing, manufacturing, distribution, logistics, fulfillment) post shifts, and vetted flexible workers claim them from a mobile app — *"Traba is a tech staffing platform that helps our business customers … find flexible workers to handle fluctuations in demand. Workers see shifts posted by businesses on the Traba mobile app and can sign up for them"* ([engineering blog][pg]). Founded in 2021 in Miami, now run from New York City with a San Francisco office ([about][about], [Ashby][ashby]).

The wedge is reliability, not just liquidity: the headline metric is a **98% show rate** against a stated industry norm of ~30%, plus 55% less turnover and 150+ assessed skill attributes per worker ([home][home]). Staffing is explicitly the beachhead, not the destination — *"We started in workforce—temp staffing, the biggest operational pain point … and used it to embed ourselves inside their daily operations … by connecting to the systems running across every facility … we are building applied AI"* ([Ashby][ashby]).

The numbers Traba states publicly:

- Backed by **Founders Fund, Khosla Ventures, and General Catalyst** ([Ashby][ashby], [careers][careers]); Keith Rabois is a visible backer ([press][press]).
- **249K workers on platform**, **996+ light-industrial customers**, **1.0M workers connected to businesses**, operating across **33 states** ([about][about]).
- **5X revenue growth** ([careers][careers]); the addressable wedge is a *"$50B labor market"* in light-industrial staffing ([Ashby][ashby]).
- Co-founders: **CEO Mike Shebat** (ex-Uber) and **CTO Akshay Buddiga** ([about][about]).

Three product surfaces are visible in the public record: the **marketplace** itself (React Native worker app + React/Node business web app + internal Ops tooling), **Scout** — an AI phone interviewer that vets workers ([Scout post][scout]) — and a founding **Agents team** building *"an agentic platform that … operates autonomously inside our customers' supply chain workflows"* ([Ashby][ashby]).

:::note[Positioning is mid-pivot — confidence: high]
Marketing still leads with "Labor That Works" staffing, but the job board now opens every engineering role with *"Traba is the AI operating layer for the industrial supply chain"* ([Ashby][ashby]). The marketplace is becoming the data + distribution layer under an agent platform.
:::

## Stack

A pragmatic, TypeScript-centric marketplace stack, with Python reserved for the AI/ML surface and a deliberate "buy the managed thing" bias on infrastructure.

| Layer | Choice | Evidence |
| --- | --- | --- |
| **Web frontend** | React / Node.js (business web app + internal Ops tools platform) | [Ashby][ashby] |
| **Mobile** | React Native (worker app) | [Ashby][ashby] |
| **Backend** | Node.js + TypeScript | [pg post][pg], [Ashby][ashby] |
| **AI / ML services** | Python | [Ashby][ashby] |
| **Primary DB** | PostgreSQL on **Aiven** (managed; chosen over GCP Cloud SQL) | [pg post][pg] |
| **ORM** | **Prisma** (chosen over TypeORM) | [pg post][pg] |
| **Legacy / secondary DB** | **Firestore** — retained for feature flags + remaining NoSQL cases | [pg post][pg] |
| **Cloud** | **GCP** — Firebase, Cloud Functions, Datastream | [pg post][pg] |
| **Analytics warehouse** | **BigQuery** | [pg post][pg] |
| **CDC / ingestion** | GCP **Datastream** (Postgres → BigQuery), routed via Aiven to avoid a ~$500/mo Kafka bill | [pg post][pg] |
| **Batch / scheduled** | Firebase cron jobs + scheduled tasks for pre-computing metrics | [pg post][pg] |
| **Internal tooling** | **Retool** workflows for the Ops team | [pg post][pg] |
| **Load testing** | **Artillery** | [pg post][pg] |
| **Foundation LLMs** | **Anthropic + OpenAI** frontier models (agent reasoning, vetting, eval) | [Ashby][ashby] |
| **Agent stack** | tool use, sub-agents, retrieval, structured outputs, **MCP servers**, orchestration layer | [Ashby][ashby] |
| **Voice AI** | **ElevenLabs** — TTS/ASR, telephony, multi-agent transfer, language detection/switching | [Scout post][scout] |
| **LLM eval / datasets** | **Langfuse** + **Braintrust** — human-annotated ground-truth datasets + prompt testing | [Scout post][scout], [Ashby][ashby] |
| **System integration** | customers' **WMS / TMS / ERP** environments | [Ashby][ashby] |
| **Worker comms** | SMS + VOIP (telephony) | [Scout post][scout] |

:::note[Key finding — managed-DB bet over GCP-native]
Despite living "deep in the GCP ecosystem," Traba put its primary Postgres on **Aiven**, not Cloud SQL — trading granular tuning for a managed pool, backups, and a Datastream→BigQuery path that dodged a Kafka bill ([pg post][pg]). Velocity over control.
:::

The worker/business auth vendor and the Node backend's specific GCP compute target are not stated publicly — reconstructed in [Likely stack & infra choices](#likely-stack--infra-choices).

## Architecture

### Core marketplace: out of the Fire(store)

Traba booted in 2021 on Firebase/Firestore — *"with the meeting quickly looming, they scrapped the schema and got set up on Firebase in a day"* ([pg post][pg]). As data turned relational (companies, workers, shifts, shift_signups, associations), Firestore's limits bit: no fuzzy/`LIKE` matching, no counts without full scans, no multiple-inequality queries, no joins — operations like "workers who worked last week, aren't currently busy, and aren't blocked by company X" required pulling documents into Node memory and filtering by hand ([pg post][pg]).

The fix was a **one-year, zero-downtime migration to PostgreSQL on Aiven**, behind per-collection feature flags. Today the system runs **Postgres and Firebase in conjunction** — Postgres as the relational system of record, Firestore retained for feature flags and lightweight NoSQL, Firebase cron jobs still pre-computing metrics, and Datastream replicating Postgres into BigQuery for analytics ([pg post][pg]).

![Traba core architecture: React/React Native clients and a Node.js backend over Postgres (Aiven) as the relational system of record, with Firestore retained for feature flags and NoSQL, Datastream replicating to BigQuery, and Retool for internal ops.](/diagrams/traba/architecture.svg)

<details>
<summary>Mermaid source</summary>

```mermaid
flowchart LR
  classDef client fill:#eef2f8,stroke:#94a3b8,stroke-width:1.5px,color:#0f172a;
  classDef core fill:#eef0fe,stroke:#6366f1,stroke-width:1.5px,color:#0f172a;
  classDef data fill:#e8f1fd,stroke:#2563eb,stroke-width:1.5px,color:#0f172a;
  classDef legacy fill:#fdf1e7,stroke:#e0892f,stroke-width:1.5px,color:#0f172a;

  Worker("Worker app<br/>React Native"):::client
  Biz("Business platform + Ops<br/>React / React Native"):::client
  API("Node.js + TypeScript backend<br/>Prisma ORM"):::core
  Retool("Retool<br/>internal Ops workflows"):::client

  PG[("PostgreSQL on Aiven<br/>relational system of record")]:::data
  FS[("Firestore<br/>feature flags · residual NoSQL")]:::legacy
  Cron("Firebase cron / scheduled jobs<br/>pre-computed metrics"):::legacy
  BQ[("BigQuery<br/>analytics warehouse")]:::data

  Worker --> API
  Biz --> API
  Retool --> API
  API --> PG
  API --> FS
  Cron --> FS
  PG -- "Datastream CDC" --> BQ
```

</details>

The migration's engine was **trigger-based replication** (chosen over in-code "shadow writes"): a Firestore document change fires a Cloud Function that translates the document into a Postgres row insert/update/delete ([pg post][pg]). Two race-condition classes had to be solved — out-of-order replications (fixed with per-collection **reconciliation scripts** run on a self-healing cron) and ordering/constraint failures (fixed with **custom retry logic, 15+ attempts**, plus a Slack alert that *"amazingly pinged us a grand total of 0 times"*) ([pg post][pg]). The team backfilled history with the same translation logic, hit **99.99% replication precision** by April, and migrated the riskiest collections (`shifts`, `shift_signups`, `workers`) last — flipping reads and writes simultaneously for `shifts` to avoid replication-lag overfills ([pg post][pg]).

:::note[Key finding — data-integrity bugs came from connection management]
Two of the biggest "unknown unknowns" were both connection-pool issues: `.map()` loops that opened N Postgres connections (fixed by batching), and an 8-months-in refactor consolidating scattered Firestore calls into a dedicated data-access layer ([pg post][pg]). The NoSQL→SQL move's hardest part wasn't queries — it was concurrency.
:::

### Scout: a multi-agent AI interviewer

**Scout** vets workers by phone at scale — *"an AI recruiter that conducts thousands of real-time interviews in parallel"* ([Scout post][scout]). It runs on **ElevenLabs** for the voice/telephony layer (low-latency TTS/ASR, multilingual), reaches workers over **SMS and VOIP**, and hands back **structured, decision-grade evaluations** rather than raw transcripts ([Scout post][scout]).

The design moved from a **single agent** (one large context prompt with role-specific content injected, one holistic evaluation prompt, English-only) to a **multi-agent architecture** with **agent transfer** — separate agents for job intro, vetting, shift-logistics confirmation, and worker Q&A — explicitly to dodge context degradation: *"at a certain threshold of context, they begin to degrade"* ([Scout post][scout]). Around that core sit a **semantic dedup pre-processor** (omits 10–20% of questions for repeat applicants), a **Spanish-capable** agent via ElevenLabs language switching, and **Custom Scout**, an operator-trained per-question good/bad/great rubric ([Scout post][scout]).

![Traba Scout pipeline: a worker applies, a semantic dedup pre-processor trims repeat questions, an ElevenLabs voice layer carries SMS/VOIP, multiple transferred agents conduct the interview, and a Langfuse-backed evaluation prompt produces a structured decision routed to auto-qualify or an operator.](/diagrams/traba/scout-pipeline.svg)

<details>
<summary>Mermaid source</summary>

```mermaid
flowchart LR
  classDef io fill:#eef2f8,stroke:#94a3b8,stroke-width:1.5px,color:#0f172a;
  classDef ai fill:#eef0fe,stroke:#6366f1,stroke-width:1.5px,color:#0f172a;
  classDef eval fill:#e8f1fd,stroke:#2563eb,stroke-width:1.5px,color:#0f172a;
  classDef human fill:#fdecec,stroke:#e0564f,stroke-width:1.5px,color:#0f172a;

  Apply("Worker applies to role(s)"):::io
  Dedup("Semantic dedup pre-processor<br/>drop questions already answered<br/>(10–20% omitted for repeats)"):::ai
  Voice("ElevenLabs voice layer<br/>TTS / ASR · SMS + VOIP · multilingual"):::io

  subgraph Agents["Multi-agent interview · agent transfer"]
    direction TB
    Intro("Job intro agent"):::ai
    Vet("Vetting agent<br/>+ Custom Scout rubric"):::ai
    Logi("Shift-logistics agent"):::ai
    QA("Worker Q&A agent"):::ai
    Intro --> Vet --> Logi --> QA
  end

  Eval("Evaluation prompt<br/>single template, variables injected<br/>tested vs Langfuse datasets"):::eval
  Auto("Auto-qualify → eligible for shift"):::eval
  Op("Operator review / final vetting"):::human

  Apply --> Dedup --> Voice --> Agents
  Agents -- transcript --> Eval
  Eval -- high confidence --> Auto
  Eval -- needs review --> Op
```

</details>

:::note[Key finding — evaluation is a single templated prompt, tested like code]
Assessment isn't N static prompts — it's *"a single prompt template"* with questions and success criteria injected per call, evolved against continuously-updating **Langfuse** datasets of human-annotated ground truths, so prompt changes are tested *"in minutes rather than hours"* ([Scout post][scout]). Eval is treated as a versioned, measurable artifact.
:::

The outcomes Traba reports: **250,000+ AI-led interviews** to date; **85%+ of all vetting now AI-conducted** (targeting ~100% within half a year); and — counterintuitively — **AI-vetted workers are 15% more likely to complete their shifts** than human-vetted ones, attributed to a more consistent, empirically-refined process ([Scout post][scout]).

### The emerging agent layer

Scout is the first agent; the job board describes a founding **Agents team** generalizing the pattern into *"production agent systems on top of frontier LLMs: tool use, sub-agents, retrieval, structured outputs, MCP servers, and the orchestration layer that ties them together,"* integrating with customers' **WMS, TMS, and ERP** environments ([Ashby][ashby]). The reasoning substrate is explicitly **frontier model APIs (Anthropic, OpenAI)**, with evaluation run on **Langfuse / Braintrust** and internal harnesses ([Ashby][ashby]).

:::note[Inference — marketplace data is the moat under the agents — confidence: high]
The agent platform is pitched as synthesizing *"the data flowing through our marketplace"* and operating *"autonomously inside our customers' supply chain workflows"* ([Ashby][ashby]). Staffing produced the proprietary shift data and the MCP/WMS/TMS/ERP connectors; the agents monetize both — the same convergence-vs-divergence shape seen at vertical-AI peers.
:::

## Team

**~12 engineers** by the end of the Postgres migration ([pg post][pg]); today the job board lists **24 open roles** across New York City, San Francisco, and offshore ops hubs (Colombia, Ecuador, the Philippines), including a dedicated **AI Agents** engineering track ([Ashby][ashby]). The named, attributable picture:

| Role | People | Source |
| --- | --- | --- |
| Co-founder / CEO | Mike Shebat (ex-Uber) | [about][about] |
| Co-founder / CTO | Akshay Buddiga | [about][about], [pg post][pg] |
| Founding engineer | Moreno Antunes | [pg post][pg] |
| Infra team | Allison Hojsak, Arvind Anand, Mike Staunton, Nazer Hasanian, Tara Nagar | [pg post][pg] |
| Analytics | Javier Rodriguez | [pg post][pg] |
| Scout team | Sumeet Bansal, Chirag Galani, Austin Carter, Shiv Godhia, Jeff Chen | [Scout post][scout] |

The generalist role is explicitly **full-stack, founding-team product engineering** — building *"the React Native worker mobile app, the React/Node.js business web app, and a React/Node.js tools platform for our ops team,"* partnering directly with the CTO. The parallel **AI Agents** track ships *"production agent systems on top of frontier LLMs"* and treats *"evaluation as a first-class discipline,"* explicitly FDE-style — *"embed with our customers and operators"* (Palantir/Scale lineage) ([Ashby][ashby]). Traba advertises pedigree from Uber, Google, Meta, Twitter, Airbnb, DoorDash, Palantir, Square, LinkedIn, Amazon, and TikTok ([about][about]).

:::note[Inference — small, generalist eng org; no public ML-research function — confidence: medium]
The migration ran with ~12 engineers "chipping in when they had bandwidth," and even the AI Agents role is an *applied* agent engineer, not a researcher ([pg post][pg], [Ashby][ashby]). The AI work is applied — orchestration, prompting, eval — over third-party frontier models (ElevenLabs voice; Anthropic/OpenAI reasoning), consistent with no advertised in-house ML-research org.
:::

Culture markers: 100% in-person (New York City + San Francisco), "Olympian's Work Ethic," and a stated preference for *"motors, not gears"* ([Ashby][ashby], [careers][careers]).

## Process

**Migration ran alongside product work, not as a freeze.** No team was dedicated 100% to the year-long Postgres migration; it advanced opportunistically while features shipped, which forced the migration plan to absorb a moving target — reconciliation scripts that took minutes early on took **20+ minutes** near the end as new fields and scale piled on ([pg post][pg]).

**Safety came from scripts, flags, and load tests, not a QA org.** The verified mechanisms: per-collection reconciliation crons as a self-healing layer; 15+-retry trigger logic with Slack escalation; a **rollback script** (with request-freezing) prepared for the `shifts` cutover; and **Artillery** load tests blasting a Postgres-backed dev environment before the riskiest flips ([pg post][pg]). Analytics validated data alignment on top of the reconciliation scripts ([pg post][pg]).

**Prompt engineering is a measured loop.** For Scout, Traba built ground-truth collection → Langfuse datasets → a concurrent prompt-testing harness reporting accuracy, per-question-type breakdowns, and trend lines — explicitly to move *"from prompt guessing to prompt engineering"* ([Scout post][scout]).

:::note[Inference — feature-flagged, incremental cutover is the house style — confidence: high]
Both the DB migration (per-collection read/write flags, bake-in periods) and Scout (V1 operator safety net → progressive autonomy to 85%+) follow the same pattern: ship behind a flag, validate against ground truth, then widen autonomy ([pg post][pg], [Scout post][scout]).
:::

## Notable bets

1. **Staffing as a data wedge.** Win the "biggest operational pain point" first, accumulate *"proprietary data from millions of shifts"* and embedded customer relationships, then build the agent platform on top ([Ashby][ashby]).
2. **Relational core, kept NoSQL where it fits.** A full year and zero downtime to move the system of record to Postgres — but Firestore stays for feature flags and cron. Right tool per job, not ideology ([pg post][pg]).
3. **Managed infra over control.** Aiven over Cloud SQL; Datastream over self-run Kafka; Prisma for migrations and type safety. Spend the team's scarce hours on product, not pool tuning ([pg post][pg]).
4. **AI as the default vetter, human as the shrinking loop.** From an operator "safety net" to 85%+ AI vetting, justified by a *measured* 15% lift in shift completion — autonomy earned with metrics, not asserted ([Scout post][scout]).
5. **Buy the voice layer, own the orchestration.** Lean on ElevenLabs for the hard real-time audio pipeline; keep the multi-agent design, dedup, rubric, and eval in-house ([Scout post][scout]).
6. **Eval as a first-class, versioned artifact.** Langfuse datasets + a custom test harness make prompt changes measurable — quality engineering aimed at a probabilistic system, replacing a traditional QA org ([Scout post][scout]).

## Unknowns

:::caution[What the public record can't confirm]
Open questions where even a best-practice guess would be a stretch (conventional infra guesses live in [Likely stack & infra choices](#likely-stack--infra-choices)):

- **Agent-platform internals** — the Agents team builds on tool use, sub-agents, retrieval, structured outputs, and MCP servers ([Ashby][ashby]), but the orchestration design, which model runs which step, and per-customer rollout mechanics aren't public.
- **Model routing** — Anthropic + OpenAI frontier models are confirmed ([Ashby][ashby]); whether a gateway/router sits in front and how models are selected per task is not stated.
- **Node backend compute target** — GCP is confirmed; Cloud Run vs GKE vs App Engine is not stated.
- **Auth vendor** — worker app + business platform + Ops tooling clearly need authn/authz; no vendor is named.
- **Semantic dedup mechanism** — "semantically similar questions" implies embeddings + a vector index, but the model and store aren't stated.
- **Miami origin status** — founded in Miami (2021); the current footprint is New York City + San Francisco + offshore ops hubs ([Ashby][ashby]), and the original Miami office's status is unconfirmed.
:::

## Sources

Reconstructed from public sources only — no insider information. Crawled 2026-06-07. Claim tiers used above: **verified** (stated on a public page, linked) · **inferred** (reasoned from a cited signal, confidence flagged) · **speculative** (best-practice fill-in, labeled). Links are live; pages change, so the supporting quote for each claim is kept in this repo's evidence map (`evidence/traba-evidence-map.md`).

| # | Source | Link |
| --- | --- | --- |
| S1 | Homepage | <https://traba.work/> |
| S2 | About | <https://traba.work/company/about> |
| S3 | Careers | <https://traba.work/company/careers> |
| S4 | Press | <https://traba.work/company/press> |
| S5 | Engineering index | <https://traba.work/company/engineering> |
| S6 | Project Scout: Building an AI Interviewer | <https://traba.work/company/engineering/building-scout> |
| S7 | Out of the Fire(store): Traba's Journey to Postgres | <https://traba.work/company/engineering/firestore-postgres-migration> |
| S8 | Job board (Ashby) — incl. Software Engineer (Generalist) and Senior Software Engineer (AI Agents) | <https://jobs.ashbyhq.com/traba> |

## Speculative reconstruction

:::tip[Best-practice reconstruction, not fact]
Nothing in this section is stated on a public page. It is what a team with *this* stack — Node/TypeScript on GCP, Postgres on Aiven via Prisma, React/React Native clients, ElevenLabs voice + Anthropic/OpenAI for vetting, and a small generalist eng org — would *typically* build. It is here to complete the picture. In the diagram, solid boxes are verified anchors carried up from the sections above; everything dashed is assumed. Read every dashed box as "likely," not confirmed.
:::

### Likely stack & infra choices

None of these appear on a public page, but for a team on GCP + Aiven Postgres running an LLM-driven vetting product, they're the low-surprise choices:

| Component | Likely choice | Why |
| --- | --- | --- |
| Backend compute | Cloud Run (containers) | GCP-native, scales to zero, fits a small team avoiding cluster ops; matches the "managed over self-run" pattern |
| LLM gateway / router | thin internal abstraction over Anthropic + OpenAI | the *providers* are confirmed ([Ashby][ashby]); a routing layer that picks model per task/cost is the conventional pattern, but unstated |
| Semantic dedup | embeddings + pgvector in Postgres | "semantically similar questions" implies vector similarity; Postgres is already the system of record |
| Auth | a managed IdP (Auth0 / Stytch / Firebase Auth) | Firebase Auth is the zero-friction holdover given the Firebase history; an IdP is the conventional alternative |
| Secrets / config | GCP Secret Manager | GCP-native default; table stakes once off Firebase-only |
| Observability | Datadog or GCP Cloud Monitoring + Langfuse for LLM | Langfuse is confirmed for prompt eval; app/infra telemetry is unstated but conventional |
| CI/CD | GitHub Actions | dominant default for a TypeScript monorepo; no signal either way |
| Job/queue | Cloud Tasks / Pub/Sub | already inside GCP; Cloud Functions + triggers are confirmed, so event plumbing exists |

### Full system architecture

A team this size would most likely run a modular Node service (or a few services) behind the React/React Native clients, with Postgres as the transactional core and the Scout/AI workloads as a separate Python surface calling out to ElevenLabs and an LLM. The verified spine is real: the clients, the Node+Prisma backend, Postgres on Aiven, the retained Firebase pieces, Datastream→BigQuery, Retool, and the ElevenLabs+Langfuse vetting loop. Reconstructed here are the **compute target**, the **LLM gateway + vector store**, the **auth layer**, and app/infra **observability**.

![Full-system architecture for Traba: verified anchors (React/React Native clients, Node+Prisma backend, Postgres on Aiven, Firebase residuals, BigQuery, Retool, ElevenLabs + Langfuse vetting) shown as solid boxes; assumed parts (Cloud Run compute, LLM gateway, pgvector, auth IdP, observability) shown dashed.](/diagrams/traba/speculative-architecture.svg)

<details>
<summary>Mermaid source</summary>

```mermaid
flowchart TB
  classDef verified fill:#e8f1fd,stroke:#2563eb,stroke-width:2px,color:#0f172a;
  classDef spec fill:#ffffff,stroke:#b4bdca,stroke-width:1.3px,stroke-dasharray:6 4,color:#475569;

  Clients("Worker app · Business platform · Ops<br/>React Native + React"):::verified
  Auth("Auth / IdP<br/>Firebase Auth or Auth0 · likely"):::spec
  Compute("Backend on Cloud Run · likely<br/>Node.js + TypeScript · Prisma"):::spec
  PG[("PostgreSQL on Aiven<br/>system of record")]:::verified
  Vec[("pgvector — question / skill embeddings · likely")]:::spec
  FB[("Firebase<br/>feature flags · cron · residual NoSQL")]:::verified
  BQ[("BigQuery<br/>via Datastream CDC")]:::verified
  Retool("Retool<br/>internal Ops"):::verified

  subgraph Vetting["Scout vetting service"]
    direction TB
    Py("AI services · Python · likely"):::spec
    EL("ElevenLabs voice<br/>TTS/ASR · SMS + VOIP"):::verified
    LLM("LLM gateway · likely<br/>over Anthropic + OpenAI (confirmed)"):::spec
    LF("Langfuse<br/>datasets + prompt eval"):::verified
    Py --> EL
    Py --> LLM
    Py --> LF
  end

  Obs("Observability<br/>Datadog / Cloud Monitoring · likely"):::spec

  Clients --> Auth --> Compute
  Compute --> PG
  Compute --> FB
  Compute --> Vec
  Compute --> Vetting
  Retool --> Compute
  PG -- "Datastream" --> BQ
  Compute -. traces .-> Obs
  Vetting -. results .-> Compute
```

</details>

[home]: https://traba.work/
[about]: https://traba.work/company/about
[careers]: https://traba.work/company/careers
[press]: https://traba.work/company/press
[eng]: https://traba.work/company/engineering
[scout]: https://traba.work/company/engineering/building-scout
[pg]: https://traba.work/company/engineering/firestore-postgres-migration
[ashby]: https://jobs.ashbyhq.com/traba
