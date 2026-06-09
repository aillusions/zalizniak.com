# Amperos Health — evidence map

Crawled 2026-06-09 via claude-in-chrome (logged-out) + the Ashby posting API (`api.ashbyhq.com/posting-api/job-board/amperos`). First-party (amperos.com, the Amperos blog, Amperos's Ashby board) prioritized; Bessemer post labeled third-party.
Tiers: VERIFIED (stated on a public page) · INFERRED (reasoned from a cited signal) · SPECULATIVE (best-practice fill-in).

## Source keys
- [home] https://www.amperos.com/
- [about] https://www.amperos.com/about
- [solution] https://www.amperos.com/end-to-end-insurance-recovery
- [blog] https://www.amperos.com/blog
- [blog-llm] https://www.amperos.com/blog/how-llms-are-transforming-revenue-cycle-management
- [blog-a] https://www.amperos.com/blog/series-a-announcement
- [blog-boulder] https://www.amperos.com/blog/boulder-care-...-engages-amperos-...
- [ashby] https://jobs.ashbyhq.com/amperos  (JD text via the Ashby posting API)
- [bvp] https://www.bvp.com/news/amperos-tackling-healthcares-260b-denial-management-problem (third-party)

JD note: the Ashby board is JS-rendered; role text was read from the public Ashby posting API (descriptionPlain + compensation). Per-posting deep links weren't captured, so all JD rows cite the board [ashby].

---

## WHAT THEY DO

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Healthcare's first AI-native denial management + revenue recovery platform | VERIFIED | [ashby], [blog-a] | "Amperos is healthcare's first AI-native denial management and revenue recovery platform." |
| Agentic AI recovers insurance revenue end-to-end | VERIFIED | [home] | "Amperos uses agentic AI to recover insurance revenue end-to-end — driving more collections, faster." |
| Agent is named "Amanda," a multi-modal AI coworker | VERIFIED | [blog-boulder], [blog-llm] | boulder: "beginning with Amanda, Amperos' multi-modal AI coworker"; llm: "Amanda, our AI agent, is a multi-modal AI coworker for RCM—phone + portals" |
| Amanda launched as "world's first AI biller" (seed, June 2025) | VERIFIED | [blog-a] | seed PR link titled "Amperos Health Launches Amanda, the World's First AI Biller for Healthcare Denials and Collections" |
| Works claims like a human across PM, payer portals, phone | VERIFIED | [blog-llm] | "Like a human collector, Amanda—Amperos' AI for AR—works across the PM, payer [portals], and phone" |

## FOUNDERS / FUNDING / SCALE

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Co-founders Miernowski (CEO), Alvin Wu (CPO), Wilson Wang (CTO) | VERIFIED | [about] | "Michal Miernowski (CEO & Co-Founder)"; "Alvin Wu (Chief Product Officer & Co-Founder)"; "Wilson Wang (Chief Technology Officer & Co-Founder)" |
| Wang: AI agent developer since early ChatGPT | VERIFIED | [about] | "AI agent developer since early ChatGPT days" |
| Miernowski: healthcare PE background | VERIFIED | [about] | "Career at leading private equity firms partnering with healthcare executives to scale clinics" |
| $16M Series A led by Bessemer; Uncork + Neo participate (Apr 22 2026) | VERIFIED | [blog-a], [bvp] | "$16M Series A led by Bessemer Venture Partners"; HLTH/LinkedIn: "Bessemer … Uncork Capital and Neo" |
| $4.2M seed, June 2025 | VERIFIED | [blog-a] | "$4.2 million seed funding announcement" (June 2025) |
| NYC HQ, primarily in-office | VERIFIED | [about] | "Headquartered in New York City with primarily in-office work (NYC-based)" |
| Headcount small (~15–40) | INFERRED | third-party trackers + Ashby role count | not stated first-party |
| Customers: Boulder Care, U.S. Urology Partners, EyeCare Services Partners, Tend Dental, inpatient provider | VERIFIED | [blog-boulder], [blog], [blog-llm] | boulder named in blog; "U.S. Urology Partners aligns with Amperos"; llm: "EyeCare Services Partners… Tend Dental… Inpatient provider" |
| Metrics: 22%+ recovery, 60%+ AR backlog cut, 50% lower cost, 500K+ claims | VERIFIED | [home] | homepage stat tiles |
| Denials -80%, 2–5× claims in ~8 wks, 50–80% cheaper per action, 90+ day AR -40%+ | VERIFIED | [blog-llm] | "denials decrease by up to 80%"; "2–5× more claims within roughly eight weeks"; "costs 50–80% less than a human"; "90+ day AR decrease by 40%+" |
| Market: ~12% claims denied 2024, $262B problem | VERIFIED | [blog-a] | linked stats: "12%", "$262 billion" |

## STACK / ARCHITECTURE

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Heavy Python; ML / applied-LLM | VERIFIED | [ashby] (AI Research) | "Mainly a mix of ML, data science, and applied LLM work. Heavy Python." |
| LLM orchestration, prompt optimization, evaluation framework, AI infra | VERIFIED | [ashby] (AI Research) | "improving models, LLM orchestration, prompt optimizations, evaluation framework, and AI infra" |
| Eyes o1, OpenAI voice mode, Claude Computer-Use | VERIFIED | [ashby] (AI Research) | "Eager to try out the latest releases (ie. o1, OpenAI voice mode, Claude Computer-Use)" |
| Voice AI, browser agents, generative features | VERIFIED | [ashby] (Full Stack) | "Work on building voice AI, browser agents, and generative AI features" |
| EMR integration via APIs, RPA, or agentic flows | VERIFIED | [ashby] (Integrations) | "Build and maintain integrations with healthcare EMR software using APIs, RPA, or agentic flows" |
| AWS stack; dev-ops, observability, LLM observability | VERIFIED | [ashby] (Infra) | "Own dev ops, dev experience, compliance, observability, monitoring for our AWS stack"; "improve LLM observability" |
| Multi-modal: phone + portals + PM | VERIFIED | [blog-llm] | "works across the PM, payer [portals], and phone" |
| Read-and-reason vs RPA click-looping | VERIFIED | [blog-llm] | "LLM agents can do the same actions as RPA (click, type), and they can also read and think" |
| Self-audit: pauses to review after every action; AI auditor | VERIFIED | [blog-llm] | "After every action—portal or call—she pauses to r[eview]"; "checked by an AI auditor for accuracy" |
| Proof: every call recorded+transcribed; portal actions → PDF | VERIFIED | [blog-llm] | "every call is recorded and transcribed; every portal action is captured and exported to PDF" |
| Memory & grounding: prior attempts, payer policies, playbooks | VERIFIED | [blog-llm] | "Agents leverage prior attempts, payer policies, and internal playbooks" |
| Planning: denial categories, thousands of scenarios, reprocessing | VERIFIED | [blog-llm] | "knows thousands of denial scenarios and knows when and how to request reprocessing" |
| Write-back structured updates to PM/workqueue | VERIFIED | [blog-llm] | "orchestrates actions across systems and writes back structured updates" |
| Analytics: payer- and code-level patterns | VERIFIED | [blog-llm] | "clear visibility into payer- and code-level patterns" |
| SOC 2 + HIPAA (Drata) | VERIFIED | [home] | footer compliance: "AICPA SOC", "HIPAA compliance monitored by Drata" |
| Internal AI tooling: Claude Code, Cursor, Figma Make | VERIFIED | [ashby] (Designer) | "AI/LLM tools in your design processes (ie Figma Make, Claude Code, Cursor)" |

## TEAM / PROCESS

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Eng comp $170–300K + equity | VERIFIED | [ashby] | AI Research $200–300K; Full Stack/Integrations $170–285K; Infra $200–285K |
| Offshore RCM billers as oversight (AR & Denials; AI Quality) | VERIFIED | [ashby] | "Billing Associate (AR & Denials)" + "Billing Associate (AI Quality)", India (Remote), RCM dept |
| No in-house research org / no QA team | INFERRED | [ashby], [blog-llm] | roles are applied (AI Research = applied LLM); quality = AI auditor + billers, no QA/SDET posting |
| Deployment maps customer workflows/SOPs | VERIFIED | [solution] | "Your Amperos deployment team maps your exact workflows, payor priorities, and standard operating procedures into the system" |
| AI Deployment Strategist role (Ops & CSM) | VERIFIED | [ashby] | role listed |

## SPECULATIVE (labeled in teardown)

| Claim | Tier | Basis |
| --- | --- | --- |
| LLM providers OpenAI + Anthropic, routed | SPECULATIVE/INFERRED | "o1, OpenAI voice mode, Claude Computer-Use" wishlist [ashby]; production providers unnamed |
| Voice stack (OpenAI voice / Deepgram / ElevenLabs-class) + telephony | SPECULATIVE | "speech technology" [blog-llm]; vendor unstated |
| Browser-agent infra (Browserbase/Playwright-class) | SPECULATIVE | "browser agents" [ashby]; platform unnamed |
| Memory vector store over payer policies/playbooks | SPECULATIVE | "memory & grounding" [blog-llm] |
| Eval/observability (Langfuse/Braintrust-class) | SPECULATIVE | "evaluation framework" + "LLM observability" [ashby] |
| Postgres on AWS | SPECULATIVE | AWS confirmed [ashby]; relational claims data conventional |
| Enterprise SSO + audited access | SPECULATIVE | SOC 2 / HIPAA [home] |
