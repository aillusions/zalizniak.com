# Glean — evidence map

Crawled 2026-06-08 via web search + WebFetch (Chrome MCP navigation declined this session; public pages only, no login-walled JDs). First-party (glean.com, developers.glean.com, docs.glean.com, Greenhouse JDs, github.com/gleanwork) prioritized; third-party trackers/press labeled.
Tiers: VERIFIED (stated on a public page) · INFERRED (reasoned from a cited signal) · SPECULATIVE (best-practice fill-in).

**Maturity note:** Glean is a late-stage company ($7.2B, Series F). The teardown documents it as a *mature* build — the interesting thread is how the architecture hardened at scale (single-tenant isolation, permission-aware retrieval, eval/safety), not an early-stage scramble. The planning queue filed it under "Enterprise search & knowledge"; it sits in the site's general-AI-infra group, not a vertical.

## Source keys
- [home] https://www.glean.com/ (homepage / Work AI platform)
- [security] https://www.glean.com/security (security & deployment)
- [api-product] https://www.glean.com/product/api (APIs product page)
- [dev] https://developers.glean.com/ (developer platform)
- [agents-api] https://developers.glean.com/api/client-api/agents/overview (Agents API)
- [kg-blog] https://www.glean.com/blog/knowledge-graph-agentic-engine (knowledge-graph deep dive)
- [hybrid-blog] https://www.glean.com/blog/hybrid-vs-rag-vector (hybrid search)
- [agentic-blog] https://www.glean.com/blog/agentic-reasoning-future-ai (agentic reasoning)
- [dataflow] https://docs.glean.com/security/architecture/data-flow (data flow)
- [deploy] https://docs.glean.com/get-started/build/about-self-hosted (deployment models)
- [kg-security] https://docs.glean.com/security/knowledge-graph (KG / indexing)
- [jd-runtime] https://job-boards.greenhouse.io/gleanwork/jobs/4616929005 (SWE, Agentic Runtime)
- [jd-context] https://job-boards.greenhouse.io/gleanwork/jobs/4638008005 (SWE, Context Platform)
- [jd-devprod] https://job-boards.greenhouse.io/gleanwork/jobs/4614706005 (SWE, Developer Productivity)
- [jd-backend] https://job-boards.greenhouse.io/gleanwork/jobs/4006731005 (SWE, Backend)
- [careers] https://www.glean.com/careers (careers)
- [toolkit-gh] https://github.com/gleanwork/glean-agent-toolkit (open-source agent toolkit)
- [press-f] https://www.glean.com/press/glean-raises-150m-series-f-at-7-2b-valuation-to-accelerate-enterprise-ai-agent-innovation-globally (Series F press release)
- [sacra] https://sacra.com/c/glean/ (third-party — revenue/headcount estimates)
- [fortune] https://fortune.com/2025/03/27/glean-ceo-arvind-jain-lessons-from-an-ai-unicorn/ (third-party — founder)

---

## WHAT THEY DO / COMPANY

| Claim | Tier | Source | Quote / basis |
| --- | --- | --- | --- |
| Founded 2019 by Arvind Jain + 3 ex-Google engineers | VERIFIED | [fortune], [sacra] | Founders Arvind Jain, Vishwanath T R, Tony Gentilcore, Piyush Prahladka; Jain a Distinguished Engineer at Google Search, co-founded Rubrik |
| Series F: $150M at $7.2B valuation, led by Wellington, June 10 2025 | VERIFIED | [press-f] | "Glean today announced it raised $150 million in Series F financing, bringing its valuation to $7.2 billion." / "The round was led by Wellington Management" / "June 10, 2025" |
| Surpassed $100M ARR last fiscal year | VERIFIED | [press-f] | "Glean rapidly surpassed $100 million in annual recurring revenue (ARR) in its last fiscal year" |
| >100M agent actions annually; goal 1B by year end | VERIFIED | [press-f] | "the platform is already powering more than 100 million agent actions annually" with goals to support "one billion agent actions by the end of the year." |
| ~$768M raised total; ~1,600 employees | INFERRED (third-party) | [sacra] | Sacra tracker: ~$768M raised; ~1,625 employees as of Apr 2026 |
| Indexes 100+ enterprise SaaS connectors | VERIFIED | [jd-backend] | "100+ enterprise SaaS connectors" |
| Product surfaces: search, AI assistant, agents | VERIFIED | [jd-backend] | "intelligent Search, an AI Assistant, and scalable AI agents" |

## STACK

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Backend in Go (preferred), Python, Java, C++ | VERIFIED | [jd-runtime], [jd-context], [jd-backend] | runtime: "Python, Go, Java, or C++"; context: "at least one modern backend language (ideally Golang...); experience with TypeScript, Python, and/or Java is a plus"; backend: "Strong coding skills (for example in Go/Python/Java/C++ etc)" |
| Client SDKs in Python, TypeScript, Java, Go | VERIFIED | [dev] | client libraries for "Python, TypeScript, Java, and Go" |
| Bazel monorepo, multi-language, custom rules, remote execution | VERIFIED | [jd-devprod] | "Develop and maintain our Bazel monorepo with support for multiple languages." / "Extend Bazel with custom rules, macros, and integrations." / "Reduce CI latency through remote execution, caching, and parallelization." |
| CI/CD on GitHub Actions + Kubernetes + cloud runners | VERIFIED | [jd-devprod] | "Operate and optimize pipelines on GitHub Actions, Kubernetes, and cloud runners." |
| Docker / Kubernetes | VERIFIED | [jd-devprod], [jd-runtime] | "Familiarity with Docker/Kubernetes, cloud runners..."; runtime: "operating services on Kubernetes" |
| Runs on Kubernetes + a major cloud (GCP/AWS/Azure) | VERIFIED | [jd-runtime] | "Kubernetes and at least one major cloud (e.g., GCP, AWS, or Azure)" |
| Event/streaming: Pub/Sub, Kafka; caching: Redis | VERIFIED | [jd-runtime] | "event/streaming systems (e.g., Pub/Sub, Kafka), caching (e.g., Redis), and data stores for low-latency paths" |
| Ingestion via Google Dataflow pipelines | VERIFIED | [dataflow] | "All data processing occurs within your tenant's project using Google Dataflow pipelines." |
| Observability: OpenTelemetry tracing, metrics, dashboards | VERIFIED | [jd-runtime] | "tracing (e.g., OpenTelemetry), metrics, dashboards, and production forensics" |
| Multi-provider LLMs: OpenAI, Anthropic, Google Gemini; model routing | VERIFIED | [jd-runtime] | "leading LLM providers (e.g., OpenAI, Anthropic, Google Gemini)"; "tool/function calling, structured outputs, streaming, and model selection/routing" |
| MCP: single HTTP endpoint into 20+ hosts | VERIFIED | [dev] | integrates with "Claude, Cursor, Copilot, ChatGPT, Windsurf, and 20+ MCP hosts" through a single HTTP endpoint |
| Agent frameworks: LangChain, OpenAI Agents SDK, Google ADK, CrewAI | VERIFIED | [dev], [toolkit-gh] | "LangChain, OpenAI Agents SDK, Google ADK, or any MCP-compatible framework," plus CrewAI |
| Internal dev uses Copilot, Cursor, Claude | VERIFIED | [jd-devprod] | "Enable engineers to integrate AI-powered coding assistants (e.g. Github Copilot, Cursor, Claude) into daily workflows." |

## ARCHITECTURE

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Hybrid search = vector + lexical + knowledge graph | VERIFIED | [hybrid-blog] | "leveraging the precision of lexical search and the nuanced understanding of vector search—all powered by the additional context and nuance provided by the signals and anchors within our knowledge graph" |
| Ranking via "anchors and signals" | VERIFIED | [hybrid-blog] | "Countless anchors and signals...Normalization...Synonymy...Structured annotation...Intent classification...Document understanding...Retrieval and topicality...Popularity" |
| KG is a triplet model with edge properties | VERIFIED | [kg-blog] | "At the core of a knowledge graph is the triplet structure: (subject, predicate, object)." / "Edge properties—such as timestamps, access control, confidence scores, or provenance—can be attached to each relationship." |
| KG built automatically (noun extraction, frequency/prominence filtering, signals) | VERIFIED | [kg-blog] | "Automated noun extraction"; "Frequency and prominence filtering"; "Presence in the titles of key documents"; "Frequent linking across popular resources"; "Selective property extraction and predicate identification" |
| Personal graph clusters activity into subtasks → tasks | VERIFIED | [kg-blog] | "the personal graph, which captures employee activity..."; "clusters each atomic action into subtasks," then "higher-level tasks with context-aware labels." |
| Framing: "the system of context" | VERIFIED | [kg-blog] | "the system of context: a reflection of how each organization works that enables AI to work better for everyone in it." |
| Agentic reasoning decomposes into multi-step plans run by sub-agents | VERIFIED | [agentic-blog] | "agents decompose questions into multi-step plans. Each step is executed by agents using tools, such as search, reasoning, data analysis, employee search, and expert search." |
| Plan phase queries LLM then rewrites into a plan | VERIFIED | [agentic-blog] | "we run a series of initial questions to the LLM to gather background information" then "rewrite the query into a multi-step plan." |
| Sub-agents pick tools; search is the basis of most tools | VERIFIED | [agentic-blog] | "Sub-agents carry out each execution step. They reason about the tools to use (search, data analysis, email, calendar, employee search, expert search, etc.)" / "The basis for many tools in Glean is search." |
| Agents self-reflect on confidence | VERIFIED | [agentic-blog] | agents self-reflect by assessing "its own confidence in its answer" |
| Agentic reasoning +24% relevance | VERIFIED | [agentic-blog] | "a significant increase of 24% in the relevance of responses and actions using agentic reasoning." |
| Agents Runtime = low-latency orchestration/tooling/routing/memory/streaming/safety | VERIFIED | [jd-runtime] | "The Agents Runtime team builds the low-latency, reliable, and secure foundation that powers Glean's AI agents and assistant experiences at scale" / "core runtime services for multi-turn orchestration, tool calling, model routing, memory, streaming, and safety" |
| Context Platform owns SDKs/MCP/Code Search/Code Writer/Memory on horizontal layers | VERIFIED | [jd-context] | "Build custom platform context services and actions such as Code Search, Code Writer, and Memory" / "reusable platform primitives on top of Glean's horizontal layers (connectors, security/governance, knowledge graph, memory, model orchestration)" |
| Agents reason over the knowledge graph, not just a prompt window | VERIFIED | [dev] | agents reason "over your company's knowledge graph, not just a prompt window," with native access to "Search, chat, code, people, and meetings as native tools." |

## DEPLOYMENT / SECURITY

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Single-tenant deployment | VERIFIED | [security] | "Run Glean in a fully isolated, single-tenant environment that keeps your data and platform secure" |
| Glean-hosted or in customer's own AWS/Azure/GCP | VERIFIED | [security] | "either Glean-hosted or in your own AWS, Azure, or GCP cloud" |
| Single-tenant connectors + enforced data permissions | VERIFIED | [security] | "Customers get single-tenant connectors, enforced data permissions" |
| RAG architecture minimizes LLM data exposure | VERIFIED | [security] | "a RAG architecture that minimizes LLM data exposure" |
| Zero-retention agreements with model providers | VERIFIED | [security] | "Zero-retention agreements with model providers ensure your data is never stored or used for model training" |
| Data never leaves the tenant environment; processed in tenant project | VERIFIED | [dataflow] | "All data processing occurs within your tenant's project using Google Dataflow pipelines. Your data never leaves your tenant's environment." |
| Tenant-specific query endpoint `<tenant_id>-be.glean.com` | VERIFIED | [dataflow] | each tenant maps to "a tenant-specific Query Endpoint (QE) of the form `<tenant_id>-be.glean.com`." |
| Query flow: SSO auth → tenant search API | VERIFIED | [dataflow] | users authenticate via SSO, then "requests are sent to: `https://<tenant_id>-be.glean.com/api/v1/search`" |
| Permission mapping maintains source ACLs | VERIFIED | [dataflow] | "Permission Mapping" "Maps and maintains access controls." |
| Real-time per-query permission enforcement | INFERRED | [security], [dataflow] | "enforced data permissions" + per-tenant ACL mapping imply query-time permission checks; exact mechanism (index-time vs request-time filter) not stated |

## PROCESS

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Bazel monorepo; hermeticity/caching/reproducibility goals | VERIFIED | [jd-devprod] | "Improve build hermeticity, caching, reproducibility, and dependency management." |
| Dedicated Developer Productivity org | VERIFIED | [jd-devprod] | team builds "CLI utilities, IDE plugins, GitHub bots" and "Simplify onboarding and local dev environments." |
| AI fluency assessed in interview | VERIFIED | [jd-runtime], [jd-backend] | roles include "an AI-focused exercise or discussion as part of the interview process" |
| India product-backend team | VERIFIED | search/[careers] | "Software Engineer, Product Backend (India)" listing |

## SPECULATIVE (no direct signal — best-practice fill-in)

| Component | Likely choice | Basis |
| --- | --- | --- |
| Index / retrieval engine | proprietary inverted index + embedding store (not a named third-party vector DB) | "anchors and signals," "self-learning language model" ([hybrid-blog]); no vendor named; ex-Google-Search team |
| Embedding models | mix of fine-tuned in-house + provider embeddings | hybrid/self-learning search ([hybrid-blog]); multi-provider posture ([jd-runtime]) |
| Knowledge-graph store | derived/materialized graph over the tenant index rather than a standalone graph DB | triplets + edge properties built from the index ([kg-blog]); no graph-DB named |
| Memory store | per-tenant store keyed to the knowledge graph | "memory" named as a runtime + platform primitive ([jd-runtime], [jd-context]); backing store not stated |
| Ranking model | learning-to-rank over the anchors/signals | "self-learning language model" + signal list ([hybrid-blog]) |
| Auth | enterprise SSO (SAML/OIDC) | SSO confirmed at query time ([dataflow]); specific IdP integration breadth not enumerated here |
