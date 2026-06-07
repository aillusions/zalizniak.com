# Traba — Evidence Map

claim → tier → source URL → quote/signal

Tiers: VERIFIED (stated/shown on public page) · INFERRED (reasoned from cited signal) · SPECULATIVE (best-practice fill-in, no signal)

## Sources index
- home: https://traba.work/ — homepage
- eng: https://traba.work/company/engineering — engineering index
- scout: https://traba.work/company/engineering/building-scout — Project Scout post
- pg: https://traba.work/company/engineering/firestore-postgres-migration — Firestore→Postgres post
- careers: https://traba.work/company/careers
- about: https://traba.work/company/about
- press: https://traba.work/company/press
- ashby: https://jobs.ashbyhq.com/traba — Traba's own job board (first-party). Incl. "Software Engineer (Generalist)" and "Senior Software Engineer (AI Agents)".
- (REMOVED) Paraform list/JD — personal curated list, NOT citable per user instruction.

## First-party from Ashby JDs (replaces Paraform citations)

| Claim | Tier | Source | Quote/signal |
| --- | --- | --- | --- |
| Positioning: "the AI operating layer for the industrial supply chain" | VERIFIED | ashby | both JDs open with this exact line |
| Backed by Founders Fund, Khosla Ventures, General Catalyst | VERIFIED | ashby | "We are backed by Founders Fund, Khosla Ventures, and General Catalyst." |
| "proprietary data from millions of shifts" | VERIFIED | ashby | quoted in both JDs |
| Foundation LLMs: Anthropic + OpenAI frontier models | VERIFIED | ashby | "frontier model APIs (Anthropic, OpenAI, etc.)" (AI Agents JD) |
| Eval frameworks: Langfuse, Braintrust, internal harnesses | VERIFIED | ashby | "evaluation frameworks (e.g., Langfuse, Braintrust, internal harnesses)" |
| Agent stack: tool use, sub-agents, retrieval, structured outputs, MCP servers, orchestration | VERIFIED | ashby | "tool use, sub-agents, retrieval, structured outputs, MCP servers, and the orchestration layer that ties them together" |
| Integrates with customers' WMS, TMS, ERP | VERIFIED | ashby | "integrating with our internal systems and our customers' WMS, TMS, and ERP environments" |
| Founding "Agents team" building agentic platform operating autonomously in customer workflows | VERIFIED | ashby | "founding member of the Agents team … an agentic platform that … operates autonomously inside our customers' supply chain workflows" |
| Product surfaces: React Native worker app, React/Node business web app, React/Node ops tools | VERIFIED | ashby | "the React Native worker mobile app, the React/Node.js business web app, and a React/Node.js tools platform for our ops team" (Generalist JD) |
| Backend: Python and/or TypeScript/Node.js, PostgreSQL | VERIFIED | ashby | "Strong proficiency in Python and/or TypeScript/Node.js … data models in PostgreSQL" |
| FDE-style deployment (Palantir, Scale); embed with customers/operators | VERIFIED | ashby | "FDE-style (Palantir, Scale)"; "Embed with our customers and operators" |
| Offices: NYC + San Francisco (the "+1"); 24 open roles incl. offshore ops hubs | VERIFIED | ashby | board: "Open Positions (24)"; NYC + San Francisco on eng roles; LatAm/Philippines field-ops locations |
| Light industrial = ~$50B labor market | VERIFIED | ashby | "Light industrial flexible staffing is a $50B labor market" |
| Comparable companies named | VERIFIED | ashby | "Nash, HappyRobot, Augment, Pallet, Harvey, Legora, ElevenLabs" |

### Dropped — Paraform-only, not on a citable first-party page
- Exact "$45.6M total funding" and "Series A" round label (Paraform card only) → removed dollar figure; keep investor names (Ashby).
- "~100 employees" headcount (Paraform card) → removed; keep "~12 engineers by end of migration" (pg post) + 24 open roles (Ashby).
- Product name "Neo" (Paraform card only) → replaced with Ashby's "Agents team / agentic platform" framing.
- "SoHo" HQ specificity (Paraform) → generalized to NYC + SF (Ashby).
- "reports to Jeff Chen" (Paraform) → dropped; Jeff Chen remains as a Scout-post author (blog).
- "real-time job matching algorithm" (Paraform) → dropped.

---

## What they do

| Claim | Tier | Source | Quote/signal |
| --- | --- | --- | --- |
| Industrial/light-industrial staffing marketplace connecting businesses with flexible temp workers | VERIFIED | home, pg | "Traba is a tech staffing platform that helps our business customers (think warehousing, manufacturing, and distribution) find flexible workers to handle fluctuations in demand. Workers see shifts posted by businesses on the Traba mobile app and can sign up for them." (pg) |
| Sectors: manufacturing, production, logistics, distribution, supply chain | VERIFIED | home | "Serving customers across the manufacturing, production, logistics, distribution, and broader global supply chain sectors." |
| 1000+ businesses | VERIFIED | home | "Trusted by 1000+ businesses" |
| 98% show rate, 55% less turnover, 150+ assessed skills | VERIFIED | home | stat band: "98% show rate / 55% less turnover / 150+ assessed skills" |
| Founded summer 2021, Miami | VERIFIED | pg | "Traba's story starts in the summer of 2021 ... a meeting with the mayor of Miami" |
| Mission: make industrial supply chain operate at peak efficiency | VERIFIED | scout | "our mission is to make the industrial supply chain operate at peak efficiency" |
| Marketplace model: shifts posted by businesses, workers sign up via mobile app | VERIFIED | pg | (same quote as above) |

## Team / founders

| Claim | Tier | Source | Quote/signal |
| --- | --- | --- | --- |
| CTO: Akshay | VERIFIED | pg | "Our CTO, Akshay, and founding engineer, Moreno, had been heads down ..." |
| Founding engineer: Moreno Antunes | VERIFIED | pg | "founding engineer, Moreno" + author byline "Moreno Antunes" |
| ~12 engineers by end of migration (~end 2023/2024) | VERIFIED | pg | "even though we were only around ~12 engineers by the end of the migration" |
| Infra team members named | VERIFIED | pg | "Allison Hojsak, Arvind Anand, Mike Staunton, Moreno Antunes, Nazer Hasanian, and Tara Nagar"; analytics "Javier Rodriguez"; "Infra team member Mike Staunton" |
| Scout post authors | VERIFIED | scout | "Sumeet Bansal, Chirag Galani, Austin Carter, Shiv Godhia, Jeff Chen" |
| PG post authors | VERIFIED | pg | "Rohan Bansal, Moreno Antunes" |

## Stack

| Layer | Choice | Tier | Source | Quote/signal |
| --- | --- | --- | --- | --- |
| Backend | Node.js server, TypeScript (implied by Prisma/TypeORM debate, .map()) | VERIFIED(Node)/INFERRED(TS) | pg | "no extra latency would be added to the original request from our Node server"; ".map() calls"; TypeORM vs Prisma |
| Primary DB (now) | PostgreSQL | VERIFIED | pg | entire post |
| DB hosting | Aiven (managed Postgres) — chose over GCP Cloud SQL | VERIFIED | pg | "We went with Aiven." |
| ORM | Prisma — chose over TypeORM | VERIFIED | pg | "we still decided to go with Prisma" |
| Legacy/secondary DB | Firestore (Firebase) — still used for feature flags, NoSQL cases | VERIFIED | pg | "We (still) 💜 Firestore ... lightweight form of feature flags and wherever it still made sense to use NoSQL" |
| Cloud | GCP (Firebase, Cloud Functions, Datastream, BigQuery) | VERIFIED | pg | "We were already invested pretty deep in the GCP ecosystem"; Cloud Functions, Datastream, BigQuery all named |
| Batch/cron | Firebase cron jobs + scheduled tasks for pre-computing data/metrics | VERIFIED | pg | "continue to heavily use other parts of Firebase such as cron jobs for pre-computing data and metrics, and scheduled tasks/jobs" |
| Analytics warehouse | BigQuery | VERIFIED | pg | "still regularly use BigQuery"; Postgres→BigQuery via Datastream |
| CDC / ingestion | GCP Datastream (Postgres→BigQuery), routed through Aiven; considered Kafka (~$500/mo) | VERIFIED | pg | "connecting GCP's Datastream through Aiven such that we could avoid the estimated ~$500/mo Kafka bills" |
| Internal tooling | Retool workflows | VERIFIED | pg | "We (at the time) used a lot of Retool workflows" |
| Load testing | Artillery | VERIFIED | pg | "We also used Artillery to blast our dev environment" |
| Voice AI (interviewer) | ElevenLabs — TTS/ASR, telephony, multi-agent transfer, language detection/switching | VERIFIED | scout | "Why ElevenLabs?"; "a proper system of agent transfer"; "released language detection & switching" |
| LLM observability/eval | Langfuse — datasets + prompt eval | VERIFIED | scout | "promoting them into continuously-updating Langfuse datasets" |
| Multimodal comms | SMS + VOIP | VERIFIED | scout | "communicate with workers multimodally, both SMS and VOIP" |
| Semantic dedup | embeddings-based question dedup pipeline | VERIFIED(dedup)/INFERRED(embeddings) | scout | "pre-processing pipeline to identify and deduplicate semantically similar questions" |

## Architecture / process

| Claim | Tier | Source | Quote/signal |
| --- | --- | --- | --- |
| Firestore→Postgres migration: 1 year, zero downtime | VERIFIED | pg | "Exactly 1 year from when we started ... zero downtime" |
| Trigger-based replication (Firestore triggers → Cloud Function → Postgres row) chosen over shadow writes | VERIFIED | pg | "Approach #1: Trigger-based replication ... We were still bullish on trigger-based replication" |
| Reconciliation scripts on cron as self-healing; race-condition handling | VERIFIED | pg | "running these on a cron as a self-healing mechanism of sorts" |
| Custom retry logic on triggers (15+ retries) + Slack alert on failure | VERIFIED | pg | "keep on trying to insert ... for X number of times (we set X to a high number; often 15+)" |
| Migration order: small → medium → shifts/shift_signups/workers last | VERIFIED | pg | "started with some smaller collections ... large ones like shifts, shift_signups and workers towards the end" |
| 99.99% replication precision | VERIFIED | pg | "successfully replicating data into Postgres with 99.99% precision" |
| Feature-flag gated read/write cutover per collection | VERIFIED | pg | "time to flip the feature flags and turn on Postgres reads/writes" |
| Read latency: 10+s → <1s on critical endpoints | VERIFIED | pg | "critical read-heavy endpoints are down from 10+ seconds to <1 second" |
| 70%+ Firestore bill cut; hourly billing vs usage | VERIFIED | pg, eng | "slash 70+% of our Firestore bill" |
| Dedicated 1-month refactor to a data-access layer (collection files) | VERIFIED | pg | "invest a month of time to a dedicated refactor ... Moved all code that accessed Firestore to dedicated 'collection' files" |

## Scout (AI interviewer) — product/architecture

| Claim | Tier | Source | Quote/signal |
| --- | --- | --- | --- |
| Scout = AI recruiter, parallel real-time phone interviews | VERIFIED | scout | "an AI recruiter that conducts thousands of real-time interviews in parallel" |
| V1: single LLM agent, large context prompt, role-specific injection | VERIFIED | scout | "single LLM agent with a large context prompt that had role-specific content injected" |
| Evolved to multi-agent (agent transfer per interview phase) | VERIFIED | scout | "broke it down into several, each responsible for a different aspect" |
| Single prompt template w/ dynamic variable injection (not static prompt swap) | VERIFIED | scout | "we maintain a single prompt template and inject variables dynamically" |
| Custom prompt-testing framework, human-annotated ground truths → Langfuse datasets | VERIFIED | scout | "system for collecting human-annotated ground truths and promoting them into continuously-updating Langfuse datasets" |
| 250,000+ AI-led interviews to date | VERIFIED | scout | "we've conducted over 250,000 AI led interviews" |
| 17,000 interviews by end of March, ~5 min avg, saved 1400+ operator hours | VERIFIED | scout | "Scout had conducted and ranked over 17,000 interviews ... saved over 1400 operator hours" |
| 85%+ of vetting now AI; targeting ~100% within half a year | VERIFIED | scout | "over 85% of our vetting is conducted by AI" |
| AI-vetted workers 15% more likely to complete shifts than human-vetted | VERIFIED | scout | "AI vetted workers are 15% more likely to successfully complete their shifts" |
| 10-20% questions omitted via dedup for repeat applicants | VERIFIED | scout | "10-20% of questions being omitted for workers who had undergone multiple interviews" |
| Human-in-the-loop: operators trained agents (Custom Scout), final vetting in V1 | VERIFIED | scout | "Custom Scout, a flexible assessment framework for operators to train our agents" |
| Future: emotion/sentiment via audio+transcript, agentic interview generation | VERIFIED(roadmap) | scout | "passing the audio in conjunction with the transcript through an LLM" |

## From JD (Paraform, user-shared) — jd-swe

| Claim | Tier | Source | Quote/signal |
| --- | --- | --- | --- |
| Explicit tech stack | VERIFIED | jd-swe | "Tech stack: Typescript/Javascript, React, React Native, APIs, Python, Node.js" |
| Web = React; mobile (worker + business apps) = React Native | VERIFIED | jd-swe | "mobile apps for both workers & businesses, and web platforms ... React, React Native" |
| Python in stack (ML/AI side) | VERIFIED | jd-swe | "Python" in tech stack; "autonomous worker vetting pipelines powered by ML and AI agents" |
| Investors: Founders Fund, Khosla Ventures, General Catalyst | VERIFIED | jd-swe | "backed by some of the world's best investors, including Founders Fund, Khosla Ventures, and General Catalyst" |
| Total funding $45.6M | VERIFIED | jd-swe | "Total funding $45.6m" |
| ~100 employees | VERIFIED | jd-swe | "Team size 100 employees" |
| HQ SoHo NYC, 100% in-person; +1 location | VERIFIED | jd-swe | "We are 100% in-person in SoHo, New York"; "Office locations SoHo, New York +1" |
| Founded 2021 | VERIFIED | jd-swe | "Founded 2021" |
| Reports to Jeff Zhifan Chen | VERIFIED | jd-swe | "Report to https://www.linkedin.com/in/jeff-zhifan-chen/" (also Scout author "Jeff Chen") |
| Positioning shift: staffing → AI platform over facility systems | VERIFIED | jd-swe | "an AI platform that connects to the systems running every facility, activates the workers already on our platform" |
| "fully autonomous, orchestrated multi-agent AI workflows" | VERIFIED | jd-swe | quoted |
| Product "Neo": cross-system reasoning, early warnings, routine actions | VERIFIED | jd-swe | "Products like Neo handle the operational grind (cross-system reasoning, early warnings, and routine actions)" |
| Real-time job matching algorithms | VERIFIED | jd-swe | "real-time job matching algorithms to autonomous worker vetting pipelines" |
| "Millions of shifts of proprietary data" | VERIFIED | jd-swe | quoted |

## From About + Careers pages — about, careers

| Claim | Tier | Source | Quote/signal |
| --- | --- | --- | --- |
| Co-Founder & CEO Mike Shebat (ex-Uber) | VERIFIED | about | "Mike Shebat — Co-Founder & CEO"; press: "He Quit Uber to Build a Trillion Dollar Company" |
| Co-Founder & CTO Akshay Buddiga | VERIFIED | about | "Akshay Buddiga — Co-Founder & CTO" (matches "Our CTO, Akshay" in pg post) |
| Keith Rabois is a backer/associated | VERIFIED | about, press | "Keith Rabois and Mike Shebat on Traba's Culture" |
| Team from Uber, Google, Meta, Twitter, Airbnb, DoorDash, Palantir, Square, LinkedIn, Amazon, TikTok | VERIFIED | about | "former founders, experts from leading tech companies like Uber, Google, Meta, Twitter, Airbnb, DoorDash, Palantir, Square, LinkedIn, Amazon, Tiktok" |
| 249K workers on platform; 996+ customers; 1.0M workers connected; 33 states | VERIFIED | about | stat band on about page |
| 5X revenue growth | VERIFIED | careers | "fueled 5X revenue growth, consistently surpassing our targets" |
| Investors re-confirmed | VERIFIED | careers | "backed by top investors like Founders Fund, Khosla Ventures, and General Catalyst" |

## Unknowns (no public signal — for the teardown's unknowns/speculative sections)
- Foundation LLM provider for Scout's reasoning/eval (OpenAI / Anthropic / Google) — never named; only ElevenLabs (voice) + Langfuse (eval) confirmed
- Where the Node backend is hosted (GCP Cloud Run / GKE / App Engine?) — GCP confirmed, specific compute not
- Frontend/web hosting (Vercel? GCP?) — not stated
- Auth vendor (worker app + business platform) — not stated
- Vector store / embedding model for semantic question dedup — "semantically similar" stated, mechanism not
- Neo's architecture/internals — only a one-line positioning blurb in the JD
- Real-time job-matching algorithm internals — named in JD, not described
- IaC / DevOps tooling — not stated
