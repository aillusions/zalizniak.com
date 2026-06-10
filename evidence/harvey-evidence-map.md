# Harvey — evidence map

Crawled 2026-06-10 via Chrome MCP (logged-out) over harvey.ai first-party pages — the engineering "Technical Deep Dives" on the blog, the careers JDs, and the homepage/security page — plus one WebSearch/WebFetch for the funding round. First-party (harvey.ai blog, careers, security) prioritized; third-party trackers/press labeled.
Tiers: VERIFIED (stated on a public page) · INFERRED (reasoned from a cited signal) · SPECULATIVE (best-practice fill-in).

**Maturity note:** Harvey is a late-stage company ($11B growth round, Mar 2026). The teardown documents it as a *mature* build — the interesting thread is how a chat product hardened into an owned, multi-model **cloud agent runtime** with zero-data-retention and cost-routing as architectural properties, not an early-stage scramble. It sits in the site's vertical group under Legal.

## Source keys
- [home] https://www.harvey.ai/ (homepage)
- [security] https://www.harvey.ai/security (security & compliance)
- [blog] https://www.harvey.ai/blog (blog index — product + technical + insights)
- [runtime] https://www.harvey.ai/blog/why-we-built-our-own-cloud-agent-infrastructure (Why we Built our own Cloud Agent Infrastructure, Gabe Pereyra, Jun 1 2026)
- [spectre] https://www.harvey.ai/blog/building-spectre-internal-collaborative-cloud-agent-platform (Building Spectre, Joey Wang + Gabe Pereyra, Apr 7 2026)
- [embeddings] https://www.harvey.ai/blog/how-harvey-secures-embeddings-at-scale (How Harvey Secures Embeddings at Scale, Suha Sabi Hussain, Apr 30 2026)
- [review] https://www.harvey.ai/blog/rebuilding-harveys-review-algorithm (Rebuilding the Review Algorithm, Apr 21 2026)
- [vision] https://www.harvey.ai/blog/building-image-understanding-for-legal-documents (How we Built Image Understanding for Legal Documents, May 6 2026)
- [jd-infra] https://www.harvey.ai/company/careers/748edfbe-f819-47fd-85bb-3c4974f8913f (Senior SWE, Core Infrastructure)
- [jd-fe] https://www.harvey.ai/company/careers/04e17f81-d0a7-4f83-8526-ec4c9532ddcc (Senior SWE, Frontend)
- [growth] https://www.harvey.ai/blog/harvey-raises-growth-round-at-dollar11-billion-valuation-co-led-by-gic-and-sequoia (Growth round announcement, Mar 25 2026)
- [seriese] https://www.harvey.ai/blog/harvey-raises-series-e (Series E announcement, Jun 2025)
- [sacra] https://sacra.com/c/harvey/ (third-party — revenue/headcount estimates)
- [wiki] https://en.wikipedia.org/wiki/Harvey_(software) (third-party — founders/history)

---

## WHAT THEY DO / COMPANY

| Claim | Tier | Source | Quote / basis |
| --- | --- | --- | --- |
| AI software for legal & professional services; products Assistant, Vault, Workflows, Word/Outlook add-ins | VERIFIED | [home], [jd-fe] | "you will own and lead engineering projects that define the user experience of our different products: Assistant, Vault, Workflows, and Harvey in Microsoft Word and Outlook" |
| Moved from chat product to cloud agents | VERIFIED | [runtime] | "we've moved Harvey from a chat product to cloud agents — from answering a lawyer's question to completing a lawyer's task end to end" |
| 1,500+ customers in 60+ countries | VERIFIED | [jd-infra] | "With 1500+ customers in 60+ countries, strong product-market fit" |
| Customers run 25,000+ custom agents | VERIFIED | [growth] | "Customers operate 'more than 25,000 custom agents' on the platform" |
| Processing billions of prompt tokens and millions of daily requests | VERIFIED | [jd-infra] | "processing billions of prompt tokens and millions of daily requests across our global legal AI platform" |
| Founded 2022 by Winston Weinberg + Gabriel Pereyra | VERIFIED (3rd-party + first-party byline) | [wiki], [runtime] | Weinberg ex-O'Melveny litigator; Pereyra ex-DeepMind/Meta AI, authors the runtime/Spectre eng posts |
| $200M growth round at $11B valuation, co-led GIC + Sequoia, Mar 25 2026 | VERIFIED | [growth] | "$200M at an $11 billion valuation" / "co-led by GIC and returning investor Sequoia" |
| Series E $300M at $5B, co-led Kleiner Perkins + Coatue, Jun 2025 | VERIFIED | [seriese] | Series E announcement |
| Customers: Deutsche Telekom, Reed Smith, Syngenta, Repsol, Cuatrecasas, Adecco, CMS, Ashurst, Baker Donelson, GSK Stockmann | VERIFIED | [home], [growth] | named on homepage testimonials + growth announcement |
| Enterprise security: SOC2 II, ISO 27001, ISO 27701, ISO 42001, GDPR, CCPA; SAML SSO, audit logs, IP allow-listing | VERIFIED | [home], [security] | "SAML SSO, audit logs, IP allow-listing, data lifecycle management"; compliance badges listed |
| ~several hundred employees | INFERRED (3rd-party) | [sacra] | Sacra headcount tracker; not stated first-party |
| Offices: SF (HQ), New York, Singapore | VERIFIED | [jd-infra], [blog] | infra role "based in San Francisco"; "Harvey Opens in Singapore" (Jun 1 2026); NY legal-engineer role |

## CLOUD AGENT RUNTIME (the core build)

| Claim | Tier | Source | Quote / basis |
| --- | --- | --- | --- |
| Built their own cloud agent infrastructure | VERIFIED | [runtime] | "the infrastructure to run agents like that didn't exist, so we built our own" |
| Three reasons: multi-model, zero data retention, cost | VERIFIED | [runtime] | "There are three main considerations: being multi-model, zero data retention, and controlling cost" |
| Multi-model is table stakes (conflicts + confidentiality) | VERIFIED | [runtime] | "a client that builds its own models will not allow its outside counsel to send sensitive legal matters through a competitor's model" / "Multi-model isn't a feature for edge cases; it is becoming table stakes" |
| Route across frontier labs + cloud providers + self-hosted OSS | VERIFIED | [runtime] | "we work with all of them and route across them"; "Anthropic's Claude Managed Agents and OpenAI's … AWS, Microsoft's Foundry, and Google" |
| Abstraction layer normalizes harness/sandbox/behavior; model = routing decision | VERIFIED | [runtime] | "We built an abstraction layer that normalizes the harness, the sandbox, and the behavioral differences beneath a single interface, so that … the choice of model is just a routing decision" |
| ZDR is a gate; can't be bolted on; not "retention then deletion" | VERIFIED | [runtime] | "that isn't zero retention; it is retention followed by deletion … ZDR means designing the runtime so customer data is not written into durable application storage by default" |
| Transient working disk lifecycle-bound to sandbox, auto-cleaned on teardown | VERIFIED | [runtime] | "that disk is lifecycle-bound to the sandbox and automatically cleaned up as part of teardown" |
| Agents are stateful → automatic state persistence and ZDR are mutually exclusive | VERIFIED | [runtime] | "Automatic state persistence and zero retention are mutually exclusive; you cannot have both" |
| LAB = legal agent benchmark; separation by practice area/task; OSS matches frontier at fraction of cost | VERIFIED | [runtime] | "our legal agent benchmark (LAB) shows clear separation by practice area and task type"; "open-source models match frontier quality at a fraction of the cost" |
| Route to cheapest model meeting quality threshold, incl. self-hosted OSS | VERIFIED | [runtime] | "route each task to the most efficient model that meets the quality threshold, including open-source models we host ourselves" |
| 3–5x cost reduction vs frontier-only | VERIFIED | [runtime] | "empirically we see 3-5x cost reductions versus a frontier-only approach" |
| Single agent run = hundreds of model + tool calls over a large corpus | VERIFIED | [runtime] | "A single agent run can involve hundreds of model and tool calls over a large corpus" |
| Conflict-aware governance (which models a matter may touch) + inspectable audit record | VERIFIED | [runtime] | "conflict-aware governance that encodes which models a given matter is even allowed to touch, and a complete, inspectable record of what every agent did" |
| Sovereign / self-host deployment inside customer boundary; data residency | VERIFIED | [runtime] | "the option to self-host their own cloud agent infrastructure through us, inside their own boundary" |
| Model proxy routes millions of daily inference requests, model API compatibility | VERIFIED | [jd-infra] | "next-generation model proxy architecture that routes millions of daily inference requests while maintaining model API compatibility and enabling seamless model integration" |

## SPECTRE (internal agent platform; mirrors customer platform)

| Claim | Tier | Source | Quote / basis |
| --- | --- | --- | --- |
| Spectre = internal collaborative cloud agent platform | VERIFIED | [spectre] | "Spectre is Harvey's internal collaborative cloud agent platform" |
| Request starts in Slack/web/automation → durable run → isolated sandbox → integrations (GitHub, Datadog, Linear) → artifacts | VERIFIED | [spectre] | "A request can start in Slack, the web app, or an automation; Spectre turns that request into a durable run, executes it inside an isolated sandbox, connects it to systems like GitHub, Datadog, and Linear" |
| Durable object is the run record, not the worker; workers ephemeral/short-lived | VERIFIED | [spectre] | "the durable object is the run record, not the worker process … Spectre workers are short-lived" |
| Follow-up resumes from archived session state via control plane, fresh worker | VERIFIED | [spectre] | "a new worker can resume from an archived session state … The control plane appends new interaction state to the durable run, starts a fresh worker, restores the relevant provider session context" |
| Sandbox = execution boundary; scoped/short-lived repo access + creds; no direct control-plane DB access | VERIFIED | [spectre] | "they do not get direct access to the control plane's database. Repository access is scoped and short-lived. Tool access is injected at run start" |
| Harness assembles context, starts provider adapter, normalizes provider-native events to stable internal shape | VERIFIED | [spectre] | "starts the right provider adapter, translates provider-native events into a stable internal shape … 'the harness becomes the product'" |
| Scheduled work uses cron-based automations on the same runtime as interactive | VERIFIED | [spectre] | "Spectre uses cron-based automations to materialize those runs … scheduled work uses the same runtime as interactive work" |
| Parallel team builds the same architecture in core product + customer-facing cloud agent platform | VERIFIED | [spectre] | "building the parallel pieces of this architecture inside Harvey's core product and customer-facing cloud agent platform" |
| Analogy: repos/PRs → matters/review workflows; sandbox boundaries → ethical walls, client isolation | VERIFIED | [spectre] | "repositories and pull requests become matters and review workflows … sandbox boundaries and scoped credentials become ethical walls, client isolation" |

## RAG / EMBEDDINGS / RETRIEVAL

| Claim | Tier | Source | Quote / basis |
| --- | --- | --- | --- |
| Uploads → embeddings in vector DB; semantic + agentic search → RAG | VERIFIED | [embeddings] | "the data uploaded is converted and stored inside of our vector databases as an embedding. Semantic and agentic search is then performed upon these embeddings" |
| Vector DB chosen for security, performance, reliability (vendor not named) | VERIFIED (vendor unstated) | [embeddings] | "choosing a vector database that prioritizes security, performance, and reliability" |
| Per-workspace isolation at DB layer: separate collections + storage, tenant IDs/namespaces | VERIFIED | [embeddings] | "we partition that storage so that each workspace has its own dedicated, isolated footprint, backed by separate collections and storage … segmented along tenant boundaries and tenant IDs rather than filtered after the fact" |
| Embeddings treated as extension of source data; same retention as source; query embeddings exist only for the request | VERIFIED | [embeddings] | "we treat embeddings as an extension of your source data … Embeddings generated for a single query exist only for the duration of that request" |
| All DB paths declared via infrastructure-as-code; short-lived programmatic credentials; encryption | VERIFIED | [embeddings] | "All paths into our vector database are declared through infrastructure-as-code … Application services use short-lived credentials refreshed programmatically" |
| Tenant-bound, encrypted performance caches with limited-lifetime keys | VERIFIED | [embeddings] | "Performance caches are tenant-bound and encrypted under keys with limited lifetimes" |
| Reject post-filtering (membership side-channel; single point of failure); enforce access at DB layer pre-retrieval | VERIFIED | [embeddings] | "We enforce access at the database layer so that unauthorized vectors are never retrieved in the first place" |
| Defense against embedding reversal (Jha et al.; Strong Platonic Representation Hypothesis) | VERIFIED | [embeddings] | "Jha et al. demonstrated that an attacker can reverse any embedding model by using an unsupervised learning approach" |
| Shared Spaces + multi-party collaboration features | VERIFIED | [embeddings], [blog] | "we've introduced Shared Spaces and we'll continue to build multi-party features" |

## REVIEW TABLES (document review at scale)

| Claim | Tier | Source | Quote / basis |
| --- | --- | --- | --- |
| Review tables extract structured grids from thousands of docs (due diligence, contract analysis) | VERIFIED | [review] | "turning thousands of contracts, filings, or agreements into a structured grid you can scan, filter, and act on" |
| New algorithm: answer + reasoning fields (was summary + additional context) | VERIFIED | [review] | "The new algorithm produces two parts for each result: answer and reasoning" |
| Sentence-level citations by pointing to indices throughout the document (was cell-level + fuzzy match) | VERIFIED | [review] | "moving from cell-level citations to sentence-based citations … pointing to indices throughout the document" |
| Scale: 30-column × 1000-doc table = 30,000 concurrent cells | VERIFIED | [review] | "a 30-column, 1000-document table produces 30,000 concurrent cells" |
| Latency benchmarked with prompt caching + parallel request handling across models | VERIFIED | [review] | "benchmarks that accounted for prompt caching and parallel request handling across different models" |
| Eval via Applied Legal Researchers (ALRs); no one sees real customer queries | VERIFIED | [review] | "Harvey's privacy guarantees mean no one on our team sees real customer queries … Applied Legal Researchers (ALRs), former practicing lawyers embedded in our product and engineering process" |
| New algorithm preferred 4x overall, 7x on complex docs (credit agreements, trial exhibits) | VERIFIED | [review] | "preferred four times more than the original … seven times more" |

## VISION / IMAGE UNDERSTANDING

| Claim | Tier | Source | Quote / basis |
| --- | --- | --- | --- |
| On-demand vision tool invoked by the agent at query time (not at indexing) | VERIFIED | [vision] | "an on-demand visual analysis tool that the agent invokes only when it needs to" |
| Text-first, vision-second gating | VERIFIED | [vision] | "We gate image analysis behind a text search step. If the agent can find the answer in the text, we don't spend more token on vision" |
| Candidate page selection narrows 500-page doc → 2-3 pages in ms via existing search infra | VERIFIED | [vision] | "Our candidate page selection narrows a 500-page document down to 2-3 pages in milliseconds using existing search infrastructure" |
| Dedicated rendering service, separate from main app; high-DPI render | VERIFIED | [vision] | "A dedicated rendering service handles this at scale, separate from the main application" |
| Image processing ~50x cost of text; billions of images/month; 90% unnecessary | VERIFIED | [vision] | "Processing a single image is roughly 50x more expensive than generating a text response … 90% of those images are not actually necessary" |
| Tool-description tuning drives recall/over-trigger trade-off | VERIFIED | [vision] | "Small changes to the tool description … had an outsized impact on overall tool recall and response quality" |

## STACK (from JDs + posts)

| Claim | Tier | Source | Quote / basis |
| --- | --- | --- | --- |
| Multi-cloud: Azure (preferred) + GCP; Kubernetes orchestration, networking, containers | VERIFIED | [jd-infra] | "Own and evolve our multi-cloud infrastructure (Azure, GCP), including Kubernetes orchestration, networking, and container management" |
| IaC: Terraform, Pulumi | VERIFIED | [jd-infra] | "infrastructure-as-code practices using tools like Terraform and Pulumi" |
| Languages: Python, Go | VERIFIED | [jd-infra] | "Strong programming skills in Python, Go, or similar languages" |
| Redis-backed distributed rate limiting / quota management | VERIFIED | [jd-infra] | "distributed rate limiting and quota management systems using Redis-backed algorithms" |
| Observability: Datadog, Sentry; incident: PagerDuty, Incident.io | VERIFIED | [jd-infra] | "Experience with observability tools (Datadog, Sentry) and incident response practices (PagerDuty, Incident.io)" |
| Multi-region deployment for data-residency requirements | VERIFIED | [jd-infra] | "multi-region deployment strategies that meet strict data residency requirements" |
| Frontend: React + TypeScript + TailwindCSS, PWA, internal design system | VERIFIED | [jd-fe] | "polished, high-performance React + TypeScript interfaces using TailwindCSS"; "leveraging PWA technologies" |
| UX for long-running jobs, streaming results, tool-calling workflows | VERIFIED | [jd-fe] | "shape APIs and UX for long-running jobs, streaming results, and tool-calling workflows" |
| Newest frontier models integrated fast (Fable 5, Opus 4.8, GPT-5.5 preview) | VERIFIED | [blog] | product announcements "Fable 5, Now Available in Harvey"; "Opus 4.8, Now Live in Harvey"; "GPT-5.5: Research Preview Results" |
| Internal eng tools: GitHub, Linear, Slack, Datadog | VERIFIED | [spectre] | named integration targets |

## LIKELY INTERNALS (speculative — inferred from stack they do name)

| Component | Likely choice | Basis |
| --- | --- | --- |
| Vector DB vendor | a security-first managed vector DB (e.g. Turbopuffer/Pinecone) or self-managed pgvector/Qdrant with per-tenant namespaces | [embeddings] names requirements + namespacing but not the vendor |
| Durable-run control plane | a durable-execution / workflow engine (Temporal-style) backing run records + checkpoints | [spectre] "durable run", "checkpoints", "control plane appends … restores session context"; engine unnamed |
| OSS model serving | vLLM/TGI on GPU nodes in Azure/GCP K8s | [runtime] "open-source models we host ourselves"; [jd-infra] K8s + AI/ML inference; vendor unnamed |
| Backend service framework | Python services (FastAPI-style) for AI + Go for infra/proxy | [jd-infra] Python+Go; web framework not named |
| Control-plane DB / artifact store | Postgres + object storage (Azure Blob/GCS) | standard for run records + artifacts; not stated |
| Auth / SSO | enterprise IdP via SAML SSO + SCIM | [home]/[security] "SAML SSO"; vendor not named |
