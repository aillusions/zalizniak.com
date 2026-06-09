# Prophet Security — evidence map

Crawled 2026-06-09 via claude-in-chrome (logged-out) + the Ashby posting API (`api.ashbyhq.com/posting-api/job-board/prophet-security`). First-party (prophetsecurity.ai, the Prophet blog, Ashby board) prioritized; Accel/press third-party.
Tiers: VERIFIED (stated on a public page) · INFERRED (reasoned from a cited signal) · SPECULATIVE (best-practice fill-in).

## Source keys
- [home] https://www.prophetsecurity.ai/
- [how] https://www.prophetsecurity.ai/ai-soc-analyst  (the "How it works" page)
- [about] https://www.prophetsecurity.ai/about-us
- [blog] https://www.prophetsecurity.ai/blog
- [blog-a] https://www.prophetsecurity.ai/blog/prophet-security-raises-30-million-series-a-led-by-accel
- [blog-amexciti] https://www.prophetsecurity.ai/blog/accelerating-the-agentic-ai-soc-movement-with-amex-ventures-and-citi-ventures
- [ashby] https://jobs.ashbyhq.com/prophet-security  (JD text via Ashby posting API)

JD note: the Ashby board is JS-rendered; role text was read from the public Ashby posting API. Per-posting deep links weren't captured, so all JD rows cite the board [ashby].

---

## WHAT THEY DO

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Agentic AI SOC: fleet of autonomous agents, Tier 1/2/3 | VERIFIED | [home] | "a fleet of autonomous AI agents that accelerates Tier 1, Tier 2, and Tier 3 tasks, from alert investigation and response to proactive threat hunting" |
| Reasoning, not playbooks; investigates like a human analyst | VERIFIED | [blog-a] | "investigate alerts as an experienced human analyst would, using flexible, explainable reasoning, not rigid playbooks" |
| Three products: SOC Analyst, Threat Hunter, Detection Advisor | VERIFIED | [blog-a] | listed: "Prophet AI SOC Analyst … Prophet AI Threat Hunter … Prophet AI Detection Advisor" |
| 100% transparency: plan + queries + evidence | VERIFIED | [home] | "show their work, including their reasoning … down to the investigative plan, the queries used … and all the evidence gathered" |
| Built by SecOps experts | VERIFIED | [home] | "Built by SecOps experts, Prophet AI is a comprehensive security operations platform" |

## FOUNDERS / FUNDING / SCALE

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| CEO Kamal Shah, CTO Vibhav Sreekanti, VP Product Grant Oviatt | VERIFIED | [about], [blog-a] | about team grid: "Kamal Shah CEO; Vibhav Sreekanti CTO; Grant Oviatt VP Product"; blog signed "-Kamal & Vibhav" |
| Founders previously scaled companies | VERIFIED | [about] | "Previously scaling companies like" (logos) |
| $30M Series A led by Accel + Bain Capital Ventures (Jul 29 2025) | VERIFIED | [blog-a] | "raised a $30 million Series A, led by Accel, with participation from Bain Capital Ventures and other strategic investors" |
| Accel partner Eric Wolford; "showing their work" differentiator | VERIFIED | [blog-a] | Eric Wolford quote: "delivering autonomy and speed while showing their work—a critical differentiator in an industry that runs on trust" |
| $11M seed (Bain Capital Ventures) | INFERRED | third-party + [blog-a] | Bain participation confirmed; $11M seed figure from trackers, not first-party |
| Strategic investments from Amex Ventures + Citi Ventures (Feb 2026) | VERIFIED | [blog-amexciti] | "Accelerating the Agentic AI SOC Movement with Amex Ventures and Citi Ventures" |
| Redpoint InfraRed 100 | VERIFIED | [blog] | "Prophet Security Named to 2025 Redpoint InfraRed 100 List" |
| Customers (logos / quotes): Instacart, Redis, Penske, Moveworks, Compass, Udemy, IAC, Thirty Madison, JB Poindexter, ETS, Partsource, Upgrade | VERIFIED | [home] | customer logo wall + testimonials |
| Customer Cabinetworks (hours→minutes) | VERIFIED | [blog-a] | "our customer Cabinetworks used Prophet AI to cut their investigation time from hours to minutes" |
| Metrics: 10x throughput, 90% MTTI/MTTR cut, 75% faster triage, 100% coverage | VERIFIED | [home] | testimonial stat tiles |
| Headcount ~50–80 | INFERRED | third-party trackers + Ashby role count | not stated first-party |

## ARCHITECTURE / STACK

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Loop: Plan → Investigate → Respond → Adapt | VERIFIED | [how] | section headers + bodies on the AI SOC Analyst page |
| Plan: summarize, extract artifacts, classify, build investigation plan | VERIFIED | [how] | "instantly summarizes incoming alerts, extracts key artifacts, classifies them, and dynamically builds an investigation plan, i.e. what are the key questions that an expert analyst would ask" |
| Investigate: retrieve+correlate across SIEM/data lake/tools/object storage; Dig Deeper | VERIFIED | [how] | "retrieving, correlating, and analyzing all information … from multiple data sources (SIEMs, security data lakes, security tools, object storage)"; "Dig Deeper capabilities" |
| Respond: severity, prioritize, remediation steps, dedup, case mgmt | VERIFIED | [how] | "assigns severity … prioritizes critical alerts … delivers concrete remediation steps … deduplicates related alerts" |
| Autonomous for high-confidence, human-in-the-loop for complex | VERIFIED | [home] | "autonomous remediation for high-confidence threats and human-in-the-loop decision points for complex cases" |
| Adapt: learns from analyst feedback, ingests org context | VERIFIED | [home], [how] | "continuously refine … by ingesting organizational context and learning from analyst feedback"; how: "learns from every analyst feedback" |
| Bi-directional connectors (not just ingestion) | VERIFIED | [home] | "Connectors are built with bi-directional communication to support the full investigation lifecycle, not just simple alert ingestion" |
| Named integrations: Google SecOps (Chronicle), ExtraHop (NDR) | VERIFIED | [blog] | "Prophet AI Now Integrates with Google Security Operations"; "Prophet Security and ExtraHop" |
| Backend Python + Go; agents, data synthesis, security tool integration | VERIFIED | [ashby] (Backend) | "AI-powered agents, data synthesis and correlation, security tool integration, Python, Go, React, and Typescript" |
| Frontend React + TypeScript | VERIFIED | [ashby] (Full Stack) | "Strong proficiency with React and TypeScript"; "Familiarity with Python or Go is a plus" |
| ML role: architect Agentic AI platform; prompt eng + RAG + fine-tuning + safety | VERIFIED | [ashby] (ML) | "Lead the architecture, design, and development of our Agentic AI platform"; "prompt engineering, and retrieval-based context augmentation methods"; "fine-tuning techniques, and safety considerations" |
| SecOps Engineer writes code (Python/Go) for investigations/automation | VERIFIED | [ashby] (SecOps) | "Comfort writing code to support investigations or automation (Python, Go, or similar)" |
| SOC 2 Type 2 | VERIFIED | [home] | "SOC 2 Type 2 Compliant" |
| Plain-English findings; SOAR/MDR replacement | VERIFIED | [blog-a], [blog] | "delivers findings in plain English"; "reasoning-based investigation to eliminate playbook maintenance" |

## TEAM / PROCESS

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| R&D org Menlo Park (HQ) + NYC, hybrid/remote | VERIFIED | [ashby] | role locations "Menlo Park (Hybrid), with secondary in New York"; "Remote" |
| Eng comp $150–273K + equity | VERIFIED | [ashby] | Backend/ML/Full-Stack ranges |
| Analyst becomes "investigation reviewer"; role elevation not elimination | VERIFIED | [blog], [blog-a] | "transforms SOC analysts into Investigation reviewers"; "role elevation, not role elimination" |
| 30-min POV, read-only access to 2-3 data sources | VERIFIED | [how] | "Setup takes 30 minutes or less … Provide read-only access to 2-3 data sources" |
| Practitioner-heavy blog (SecOps veterans on staff) | VERIFIED | [blog] | bylines: Jon Hencinski, Augusto Barros, Grant Oviatt, Matt Bromiley, etc. |

## SPECULATIVE (labeled in teardown)

| Claim | Tier | Basis |
| --- | --- | --- |
| LLM providers OpenAI + Anthropic, routed | SPECULATIVE/INFERRED | fine-tuning + agentic reasoning [ashby]; blog analyzes Anthropic/Google models; production vendor unnamed |
| Vector/RAG store over org context + investigations | SPECULATIVE | "retrieval-based context augmentation" [ashby]; "ingesting organizational context" [home] |
| In-house agent planner/executor | SPECULATIVE | "Agentic AI platform" [ashby]; framework unnamed |
| AWS cloud | SPECULATIVE | conventional for Menlo Park R&D security SaaS; not stated |
| Postgres + evidence/object store | SPECULATIVE | investigations/evidence/case state; object storage named as read source only |
| Eval harness + LLM-as-judge | SPECULATIVE | "safety considerations" [ashby]; explainability core claim [blog] |
| Enterprise SSO + least-privilege connectors | SPECULATIVE | SOC 2; read-only POV [how] |
