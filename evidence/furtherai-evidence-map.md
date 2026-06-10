# FurtherAI — evidence map

Crawled 2026-06-10 via claude-in-chrome (logged-out) + the Ashby posting API (`api.ashbyhq.com/posting-api/job-board/furtherai`). First-party (furtherai.com — homepage, company, the two engineering posts, the Eval Studio post, the Series A announcement, Ashby board) prioritized; press third-party.
Tiers: VERIFIED (stated on a public page) · INFERRED (reasoned from a cited signal) · SPECULATIVE (best-practice fill-in).

The engineering signal is unusually rich for the stage: a dedicated **Engineering** section with two deep, named-author technical posts. The public **job board** remains GTM-heavy (1 eng role, Forward Deployed Engineer), so stack rows lean on the eng posts + that one JD, not a broad board.

## Source keys
- [home] https://www.furtherai.com/
- [company] https://www.furtherai.com/company
- [eng] https://www.furtherai.com/engineering
- [hard] https://www.furtherai.com/engineering-blogs/the-hard-problems-at-furtherai  (Apr 23 2026)
- [extract] https://www.furtherai.com/engineering-blogs/hardest-document-extraction-problem-in-insurance  (Mar 30 2026)
- [eval] https://www.furtherai.com/blog/furtherai-eval-studio  (Eval Studio launch)
- [seriesa] https://www.furtherai.com/blog/furtherai-announces-25m-series-a-from-andreessen-horowitz-to-transform-insurance-workflows-with-ai-automating-busywork  (Oct 7 2025)
- [ashby] https://jobs.ashbyhq.com/furtherai  (JD text via Ashby posting API)

---

## WHAT THEY DO

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Domain-specific AI for insurers, MGAs, brokers (+reinsurers); "AI workspace" | VERIFIED | [home], [seriesa] | "Domain specific AI for Insurers, MGAs, and Brokers that automates busywork"; "the AI workspace purpose-built for insurance" |
| Workflows: submission intake/processing, underwriting audit, policy check & compare, claims intake, FNOL, SOV mapping, authority check, tower analysis, contract analysis, bind order verification, cyber analysis, guideline checks | VERIFIED | [home] | listed on homepage workflow ticker |
| Build AI agents for commercial insurance | VERIFIED | [hard], [extract] | "we build AI agents for the insurance industry"; "we build AI agents for commercial insurance" |
| "One workspace, every workflow" — start one workflow, expand to many | VERIFIED | [home], [seriesa] | "insurance-native workspace that lets insurance teams start with one workflow and expand across many" |
| Email + PDF submission automation; integrates with carrier/broker systems | VERIFIED | [home], [seriesa] | "deepen integrations with carrier and broker systems"; blog "email-and-pdf-submission-automation-for-carriers" |

## DOCUMENT EXTRACTION (the deepest technical post)

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Loss runs = hardest doc; ~30 fields/claim; hundreds of source formats; 200+ pages | VERIFIED | [extract] | "Around 30 fields per claim need to be extracted… Others span 200+ pages" |
| Stage 0: one extraction-API call w/ JSON schema silently lost claims (45→30) | VERIFIED | [extract] | "A document would clearly list 45 claims, and we'd get back 30" |
| Stage 1: LLM agent w/ tools (extraction API w/ page ranges + visual page inspection) decides its own strategy | VERIFIED | [extract] | "We gave it a curated prompt… a tool to call the extraction API with optional page ranges, and a tool to visually inspect specific pages" |
| Stage 2: self-correcting loop — non-prescriptive "skill" + validation tool + iterate | VERIFIED | [extract] | "we wrote a non-prescriptive skill: a description of the task… including verifiable validation criteria… gave the agent a validation tool and allowed it to iterate" |
| Three agent tools: extract_claims(page ranges), focus_pages(high-res chunks), validate_totals(financials + count) | VERIFIED | [extract] | code block with the three async tool signatures |
| Agent checks output against the doc's own summary totals; re-extracts until counts/dollars match | VERIFIED | [extract] | "checks the output against the document's own summary totals, and if something does not add up, it investigates" |
| Extraction backend barely matters once agent is in loop; uses commercial service OR LLMs directly | VERIFIED | [extract] | "We were surprised by how little the extraction backend mattered… sometimes a commercial extraction service, sometimes LLMs directly" |
| Context strategy: whole PDF for short docs; first+last pages + nav tools for 100+ pages | VERIFIED | [extract] | "For longer ones (100+ pages)… we give it the first and last few pages… plus tools to navigate the rest" |
| Result: 80% → 95% row-count accuracy via self-correction, not a better model | VERIFIED | [extract] | "went from 80% to 95% row count accuracy - not by improving the extraction model, but by giving an agent the tools to check and fix its own output" |
| "agentic GPT-5.4 result strongest"; models named | VERIFIED | [extract] | "the agentic GPT-5.4 result appears strongest overall" |
| 10-line validation function > weeks of prompt engineering | VERIFIED | [extract] | "A 10-line validation function turned out to be worth more than weeks of prompt engineering" |
| Eval framework: align by normalized claim number / optimal assignment over fields; lenient semantic scoring | VERIFIED | [extract] | "we aligned claims by normalized claim number; when that was not possible, we used an optimal assignment over fields" |
| Edge cases: 4 tables/5 pages same claims; page-5 header for 100 claims; summary rows inflated count 15%; blank = "same as above"; $0 ambiguous | VERIFIED | [extract] | enumerated in "Why This Is Hard" |
| Winning formula: agentic loops + validation tools + success criteria over rigid procedures + rigorous evals | VERIFIED | [extract] | conclusion four-part list |
| Accuracy on par/better than human review, seconds vs hours | VERIFIED | [extract] | "on par with or better than what manual human review typically achieves — and it takes seconds instead of hours" |

## HARD PROBLEMS POST (named engineers)

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Agent harness = filesystem + tools + loop + verification | VERIFIED | [hard] | "A harness defines the primitives… a filesystem, a set of tools, a loop, and a verification step" |
| Trajectory-level visibility is the hard metric (verify the trace, not just the output) | VERIFIED | [hard] (Punyaslok Pattnaik) | "Two agents can produce identical extractions through wildly different traces… You need trajectory-level visibility" |
| Exploration vs thrashing line shifts with document complexity | VERIFIED | [hard] | "the line between exploration and thrashing shifts with document complexity" |
| Memory system learns from user corrections; stored + applied to future | VERIFIED | [hard] (Frieda Huang) | "We've built a memory system in our AI assistant that learns from user interactions" |
| Day 0 ~80% → day 100 ~99%; consolidating conflicting/stale corrections is the open problem | VERIFIED | [hard] | "On day zero… ~80% accurate. By day 100… closer to 99%"; "corrections can conflict, go stale, or apply only in narrow contexts" |
| Goal: automate FDE — agent w/ customer data + workflow builder + eval platform builds/tests/iterates | VERIFIED | [hard] | "Imagine an agent with access to customer data, the workflow builder, and the eval platform, that builds, tests, and iterates autonomously" |
| Entity linking across documents; address normalization ("123 Main St" vs "123 Main Street, Unit A"); match-aggressiveness tradeoff | VERIFIED | [hard] (Kshitij Jain) | "Match too aggressively and you collapse distinct properties… Too conservatively and the same building shows up three times" |
| HITL: 95%+ target, AI first pass + human review; citations, confidence cues, correction tools; edits feed model + memory | VERIFIED | [hard] (Giancarlo Fissore) | "our system lets AI take the first pass, while humans review… citations that show exactly where each value came from… Every human edit feeds back into the model and memory layer" |
| Platform paradox: opposite customer rules; single expressive interface; agentic UI that adapts | VERIFIED | [hard] | "we are building agentic UI that adapts to what each customer actually needs" |
| Synthetic data: no ImageNet for insurance; generate docs w/ "right distribution of chaos" | VERIFIED | [hard] | "there's no ImageNet for insurance documents… we need the right distribution of chaos" |

## EVAL STUDIO

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Customer-facing eval product launched inside FurtherAI | VERIFIED | [eval] | "Today we're launching Eval Studio inside FurtherAI" |
| Test set = 50–100 real submissions from the customer's own pipeline; define "good" | VERIFIED | [eval] | "You load a test set built from real submissions… typically 50 or 100… you define what 'good' looks like" |
| Side-by-side version comparison before shipping (model swap, prompt, downstream) | VERIFIED | [eval] | "compare the new version against the previous one side by side. You see exactly what improved and what regressed" |
| Production teams run weekly: change, run, compare, ship | VERIFIED | [eval] | "use this loop on a weekly cadence: change, run, compare, ship" |
| Motivation: new model every few months; swaps break workflows non-obviously | VERIFIED | [eval] | "A new model lands every few months… things break in ways that don't surface immediately" |

## FOUNDERS / FUNDING / SCALE

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| CEO & Co-founder Aman Gour | VERIFIED | [seriesa] | "said Aman Gour, Co-Founder and CEO of FurtherAI" |
| CTO & Co-founder Sashank Gondala; ex-Apple AI/ML (speech & language models) | VERIFIED | [seriesa], [ashby] | "Sashank Gondala, Co-Founder and CTO"; FDE JD: "our CTO, Sashank, who brings experience from building speech and language models at Apple's AI/ML org" |
| $25M Series A led by a16z (Oct 7 2025); 6 months after $5M seed; total $30M | VERIFIED | [seriesa] | "$25 million Series A led by Andreessen Horowitz… just six months after its $5M seed round… total funding to $30 million" |
| Investors: a16z, Nexus Venture Partners, Y Combinator, South Park Commons, Converge | VERIFIED | [seriesa], [ashby] | "Nexus Venture Partners, Y Combinator"; FDE JD lists "Andreesen Horowitz, YC, Nexus, South Park Commons, Converge" |
| a16z partner Joe Schmidt; "one of the largest Series A ever in insurance AI" | VERIFIED | [seriesa] | "said Joe Schmidt, Partner at Andreessen Horowitz"; "one of the largest Series A ever raised in insurance AI" |
| San Francisco HQ; in-person 5-day week | VERIFIED | [seriesa], [ashby] | "San Francisco, CA"; "Work in-person from our San Francisco office (5 day week)" |
| Founding team: ex-Apple AI Research, 4 ex-YC founders, 6 ex-founders | VERIFIED | [ashby] | "Founding team includes ex-Apple AI Research, 4 ex-YC founders, and 6 ex-founders" |
| 10x revenue growth this year; post-PMF; closed a top-5 global insurer | VERIFIED | [ashby] | "grown 10x in revenue this year alone"; "we recently closed a top 5 insurance company in the world" |
| Named engineers: Punyaslok Pattnaik, Frieda Huang, Kshitij Jain, Giancarlo Fissore | VERIFIED | [hard] | bylined quotes |

## CUSTOMERS / METRICS

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Customers: Accelerant (Risk Exchange), MSI, Leavitt Group, McGowan Excess Casualty, Upland, Grange/GForce; largest US MGA | VERIFIED | [seriesa], [home] | "leading insurers like Accelerant, MSI, and Leavitt Group"; testimonials |
| Largest MGA: $1.5B+ premiums, 20+ programs, 1M+ policyholders | VERIFIED | [home] | case-study blurb |
| Processes billions in premiums/year | VERIFIED | [seriesa] | "FurtherAI processes billions in premiums each year" |
| Metrics: 30x faster submissions; audit time −45%; 95%+ policy-comparison accuracy; proposals 10x faster; submission-to-quote +15%; up to 400% ROI | VERIFIED | [home], [seriesa] | stat tiles + release |
| FDE model: insurance teams work side-by-side with an AI engineer | VERIFIED | [seriesa], [home] | "With our forward-deployed engineering model, insurance teams work side-by-side with an AI engineer" |
| Security: client prompts/data never used for training; isolated firm-specific storage; third-party audited | VERIFIED | [home] | enterprise-grade security bullets |

## SPECULATIVE / INFERRED (labeled in teardown)

| Claim | Tier | Basis |
| --- | --- | --- |
| Primary LLMs = OpenAI frontier (GPT-5.x) + likely Anthropic/Google, model-swappable | INFERRED | GPT-5.4 named [extract]; Eval Studio built for model swaps [eval]; CTO ex-Apple language models; full vendor list unstated |
| Agent orchestration framework in-house (harness: filesystem + tools + loop + verify) | INFERRED | harness primitives described [hard][extract]; no named framework |
| Cloud = AWS or GCP | SPECULATIVE | conventional for an SF a16z/YC startup; not stated |
| Web app TypeScript/React; Python backend | INFERRED | Python verified (FDE JD); "Founding Product Designer" + agentic-UI implies a modern web front end; FE stack unstated |
| Vector store / retrieval for memory + doc context | SPECULATIVE | memory layer + doc reasoning [hard]; store unnamed |
| Auth: enterprise SSO + per-tenant isolation | INFERRED | "completely isolated firm-specific data storage" [home]; vendor unstated |
| FDE-automation agent (build/test/iterate over workflow builder + eval platform) | INFERRED-as-direction | stated as the goal they're "actively working on" [hard], not shipped |
| Eval Studio = internal eval harness productized | INFERRED | "For the past year we've been asking how teams should answer that" [eval]; internal use predates the product |
