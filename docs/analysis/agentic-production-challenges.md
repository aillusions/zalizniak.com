# Agentic Production Challenges — a cross-teardown review

What actually breaks when you put a **non-deterministic agent into production** — implementing it, deploying it, and operating it — synthesized only from the published teardowns in this repo. The unit here is the *challenge*, lifted out of any one company and ranked by how badly it hurts against how poorly it's served today.

## Scope & method

- **Corpus: the 16 *published* teardowns.** Amperos Health, Antimetal, Basis, Comp AI, Confido, FurtherAI, Glean, Gradient Labs, Harvey, Momentic, Pallet, Prophet Security, Pylon Lending, Rilla, SightlineOS, Traba. The other 11 entries (Avallon, Chakra Labs, Decagon, Harper, Hippocratic AI, Mercor, Norm AI, QA Wolf, Ranger, Sierra, Spur) are "coming soon" stubs and contribute no evidence. Counts below are out of **16**.
- **Evidence tiers** carry through from the teardowns: **VERIFIED** (stated/shown on a cited public page), **INFERRED** (reasoned from a cited signal), **SPECULATIVE** (best-practice fill-in, hedged). A challenge's count is its company tally; the tier mix tells you how much of that tally is hard evidence vs. inference.
- **Skeptic stance.** Where the teardowns don't actually support a cross-industry claim, it's marked SPECULATIVE rather than dressed up as fact. One challenge (prompt-injection/security) is real industry-wide but nearly invisible in this corpus — that silence is itself reported, not smoothed over.
- **Ranking = severity × underservedness**, with **recurring challenges (≥3 teardowns) weighted above single-company observations**. Severity = cost of a wrong/lost action (irreversible, regulated, or money-moving ranks highest). Underservedness = maturity of off-the-shelf solutions: **solved / partial / open gap**.

## Ranking at a glance

| # | Challenge | Count | Tier mix | Severity | Maturity |
| --- | --- | --- | --- | --- | --- |
| 1 | Failure attribution across long runs (credit assignment) | 9/16 | 7 V · 2 I | High | **Open gap** |
| 2 | Durable execution meets non-determinism | 9/16 | 4 V · 5 I | High | Partial (no agent-native engine) |
| 3 | Context degradation over long horizons | 9/16 | 2 V · 7 I | High | **Open gap** (no product category) |
| 4 | Confidence calibration / when to escalate | 6/16 | 4 V · 2 I | High | **Open gap** |
| 5 | Regression testing without deterministic outputs | 14/16 | 8 V · 6 I | High | Partial (tooling maturing) |
| 6 | Explainability / lineage for regulated decisions | 9/16 | 9 V | High | Partial (bespoke) |
| 7 | Observability / tracing of non-deterministic runs | 12/16 | 10 V · 2 I | Med | Partial → served |
| 8 | Earning autonomy / trust gating / HITL | 10/16 | 9 V · 1 I | High | Partial (pattern, not product) |
| 9 | Integrating systems with no clean API | 9/16 | 8 V · 1 I | Med | Partial (active tooling) |
| 10 | Inference cost & latency control | 10/16 | 8 V · 2 I | Med | Served (gateways/caching) |
| 11 | Drift / model-swap churn | 5/16 | 4 V · 1 I | Med | Partial (folds into eval) |
| 12 | Own vs. rent / provider portability | 4/16 | 2 V · 2 I | Med | Served (gateways/routers) |
| — | Prompt injection / security of acting agents | 1/16 | 1 V | High | Open gap *(under-evidenced here — see note)* |

---

## 1. Failure attribution across long runs (credit assignment) — **open gap**

**Count: 9/16** — Antimetal (I), Basis (V), FurtherAI (V), Glean (V), Gradient Labs (V), Harvey (V), Momentic (V), Prophet Security (V), Pylon Lending (I).

**Where it shows up.** Basis names it as its open frontier almost verbatim: *"an agent runs for five hours across thousands of decisions — how do we attribute outcomes back to specific reasoning steps?"* (VERIFIED, MTS JD). FurtherAI describes the exact failure shape — the agent *"had the correct value at step 12 but overwrote it at step 20"* (VERIFIED). Harvey persists a *"complete, inspectable record of what every agent did"* in a durable run record (VERIFIED); Momentic ships a post-run triage agent that rewrites the failing test (VERIFIED); Prophet Security persists plan + queries + evidence per investigation (VERIFIED); Glean keeps a span per step via OpenTelemetry (VERIFIED). Antimetal's time-travel diff and Pylon's per-rule decision log are inferred routes to the same end (INFERRED).

**Why it's hard.** Traditional systems give you a stack trace: a deterministic failure points at the line that threw. A long agent run has no throw — it ends with a *plausible, wrong* answer, and the causal step is buried among thousands of correct-looking ones. Output isn't reproducible, so you can't re-run to bisect. And "wrong" is often a graded judgment, not a boolean, so even locating the bad step needs a judge. This is the part that durable-execution engines explicitly *don't* solve: Temporal will faithfully replay *what happened*, but replay shows you the recorded outputs, not *why* the model chose them.

**How teams cope today.** Heavy tracing (OpenTelemetry, Langfuse), durable run records that retain every step (Harvey, Prophet), trajectory-level visibility tooling built in-house (FurtherAI), and post-hoc triage agents (Momentic). All of it is *capture* — keeping enough breadcrumbs to reconstruct manually. None of it is *attribution*: nothing automatically says "step 412 is the one that poisoned the result."

**Maturity: open gap.** Observability vendors give you the trace; the credit-assignment step on top is bespoke and, by Basis's own admission, unsolved. Highest-severity, least-served — ranked #1.

## 2. Durable execution meets non-determinism — **partial; no agent-native engine**

**Count: 9/16** — Gradient Labs (V), Harvey (V), Momentic (V), Pylon Lending (V), Traba (V on its migration), Antimetal (I), Pallet (I), Rilla (I), SightlineOS (I). **Temporal named explicitly at 2** (Gradient Labs, Pylon — both VERIFIED).

**Where it shows up.** Pylon runs *"Temporal [for] every multi-day origination workflow — durable, replayable workflows with humans as exception handlers"* (VERIFIED). Gradient Labs makes *"each conversation a long-running Temporal workflow… idempotent activities per LLM call so partial progress survives crashes, autoscaler kills, and rate limits"* (VERIFIED), with an *"ordered list of API provider preferences… failing over on 5XX, rate limits, invalid outputs, or p99+ latency"* and *"tailored prompts for both primary and backup models"* (VERIFIED). Harvey separates the durable run from the worker — *"the run, not the worker, is the thing that persists"* (VERIFIED). Momentic's step cache is the durable asset, replayed at a 95%+ hit rate (VERIFIED). Pallet leans on event-driven Pub/Sub instead of full replay (INFERRED).

**Why it's hard — specifically against Temporal's assumptions.** Durable execution rests on **deterministic replay**: the engine re-runs your workflow code against a journaled event history and *must* take the same path every time, so all non-determinism has to be quarantined inside *activities* whose results are recorded once and never re-derived. An LLM call breaks every part of that contract:

- It's the most non-deterministic step in the system, so it *must* be an activity — but then a replay shows you the recorded completion, and you can never deterministically reproduce the decision to debug it (this is what feeds challenge #1).
- Retries re-run activities, so every money-moving side effect needs **hand-built idempotency** — Pylon must *"survive crashes and retries without double-processing loans or double-charging fees."*
- LLM activities fail transiently *constantly* (5XX, rate limits, p99 latency, invalid JSON) and across *multiple providers* — a failure mode Temporal models generically but doesn't understand, so teams hand-roll ordered provider failover, per-provider prompts, and mid-stream checkpointing (Gradient Labs).
- Streaming tokens and tool-call loops don't map cleanly onto the activity boundary, so the checkpoint granularity is itself a design problem.

**How teams cope today.** Adopt Temporal (or Pub/Sub event-driven for lighter cases) and build the agent-specific layer themselves: idempotency keys, provider-failover ladders, LLM-as-child-workflow checkpointing, run-vs-worker separation. It works — but every team rebuilds the same scaffolding.

**Maturity: partial.** The durability primitive is solved and battle-tested (Temporal). The agent-native concerns — checkpointing/replaying non-deterministic model calls, built-in multi-provider failover, capturing enough to reproduce a decision — are not packaged anywhere; they're re-implemented per company. Ranked #2: high severity (lost/duplicated money-moving actions), recurring, and underserved at the layer that matters for agents.

## 3. Context degradation over long horizons — **open gap, no product category**

**Count: 9/16** — Traba (V), FurtherAI (V), Antimetal (I), Basis (I), Comp AI (I), Harvey (I), Momentic (I), Pallet (I), SightlineOS (I).

**Where it shows up.** Traba splits its voice interviewer into sequential intro/vetting/logistics/Q&A agents explicitly because *"at a certain threshold of context, they begin to degrade"* (VERIFIED). Antimetal's first agent *"dumped observability, infra, and code into context"* and found *"in complex environments, quality quickly degraded"* — its diagnosis, *"this wasn't a technology problem, it was a representation problem,"* is the whole lesson (the rebuild into a layered world model is INFERRED as the fix). Pallet externalizes 20,000+ per-tenant memories out of the window (INFERRED); Basis coordinates sub-agents through a central context layer (INFERRED).

**Why it's hard.** The failure is **silent and gradual** — nothing errors, answers just get worse as the window fills — so it's missed until a complex case collapses. And the intuitive fix (stuff in more context) is exactly what *causes* it: a model reasons better over a small, structured input than a giant raw one. There's no error budget, no alarm, no threshold the platform surfaces for you.

**How teams cope today.** All bespoke: phase-split at a context threshold with handoff (Traba), build an explicit world model instead of a raw dump (Antimetal), externalize state to memory + retrieval (Pallet, Glean), coordinate via a shared context layer (Basis), and dedup/prune inputs before the call (Traba drops 10–20% of repeat questions).

**Maturity: open gap.** There is no "context-management" product category. Every team hand-rolls splitting, summarization, and externalization. Recurring (9/16) and high-severity (silent quality collapse on the hardest cases) — ranked #3.

## 4. Confidence calibration / when to escalate — **open gap**

**Count: 6/16** — FurtherAI (V), Gradient Labs (V), Pallet (V), Traba (V), Antimetal (I), Comp AI (I).

**Where it shows up.** Pallet does *"field-level confidence scoring and cross-model validation: high-confidence auto-processes, low-confidence flagged — operators handle ~5%"* (VERIFIED). Traba branches the evaluation prompt on *high-confidence auto-qualify vs. needs-review → operator* (VERIFIED). Gradient Labs's guardrails decide per turn whether to answer or *escalate a vulnerable/out-of-policy case to a human* (VERIFIED). FurtherAI surfaces *citations and confidence cues* to the human reviewer (VERIFIED).

**Why it's hard.** The entire assistant→actor autonomy model (challenge #8) hinges on a trustworthy "am I sure?" signal, but LLM self-reported confidence is poorly calibrated — a model is often most fluent when most wrong. So the escalation threshold is the linchpin of the whole safety story, built on a number nobody fully trusts. Cross-model agreement (Pallet) is a workaround for the absence of a real calibration primitive.

**How teams cope today.** Cross-model/consensus validation, field-level rather than answer-level scoring, deterministic guardrails layered over model judgment, and conservative thresholds tuned by watching override rates.

**Maturity: open gap.** No standard calibration tool; everyone invents a heuristic. Slightly lower recurrence (6/16) keeps it at #4, but it gates challenges #8 and #1 — a strong honorable-mention for the underserved shortlist.

## 5. Regression testing without deterministic outputs — **partial; tooling maturing**

**Count: 14/16** (the most recurring challenge in the corpus) — Antimetal (V), Basis (V), FurtherAI (V), Glean (V), Harvey (V), Momentic (V), Pallet (V), Traba (V), Amperos (I), Comp AI (I), Prophet Security (I), Pylon (I), Rilla (I), SightlineOS (I).

**Where it shows up.** Traba tests *"a single prompt template"* against continuously-updated *Langfuse* datasets, shipping changes *"in minutes rather than hours"* (VERIFIED). FurtherAI's Eval Studio runs *"change, run, compare, ship"* weekly over 50–100 real submissions (VERIFIED). Glean reports *+24% relevance* with LLM-as-judge over golden sets (VERIFIED). Momentic makes `assert`/`assertVisually` agent-scored so a non-deterministic UI passes/fails reliably (VERIFIED). Antimetal runs candidates against *"sandboxed shadow traffic… live customer events"* (VERIFIED); Pallet runs *"thousands of simulations… before deployment"* (VERIFIED).

**Why it's hard.** The same prompt run twice returns different text — `assertEquals` has nothing to equal. "Correct" is a graded, often subjective judgment, so the grader is itself a non-deterministic LLM that needs calibrating. Regressions are silent: nothing throws when a change makes the agent 10% worse, so without a measured baseline you ship the regression and hear about it from users.

**How teams cope today.** Golden sets graded by an LLM judge, eval-as-code in CI (prompt + dataset + judge versioned together), gating on downstream business lift rather than raw accuracy, and growing the dataset from production corrections. Vendor tools exist and are real: **Langfuse** and **Braintrust** are the de-facto pair (confirmed at Traba and Basis).

**Maturity: partial.** This is the *best-served* of the high-severity challenges — a genuine tool category exists and is maturing. It's ubiquitous (14/16), which is why it ranks high, but the existence of working vendor tooling keeps it below the open gaps above. The unsolved residue (judge calibration, golden-set curation) bleeds into #1 and #4.

## 6. Explainability / lineage for regulated decisions — **partial; bespoke**

**Count: 9/16, all VERIFIED** — Amperos, Basis, Comp AI, Confido, Glean, Gradient Labs, Harvey, Prophet Security, Pylon Lending.

**Where it shows up.** Basis ships a workflow only when the model emits *"what data was used, why it was mapped that way, and how confident the system is"* — enough for a CPA to sign off (VERIFIED). Harvey gives *sentence-level citations pointing to document indices* (VERIFIED). Gradient Labs keeps *"full audit logging for regulators"* (VERIFIED). Pylon ties each outcome to the exact DSL rule version (VERIFIED). Comp AI goes furthest — *"every agent, every integration, every check is auditable on GitHub"* (VERIFIED).

**Why it's hard.** In finance/healthcare/security/legal, a confident-but-unexplained answer is a liability, not a feature. The non-deterministic system must carry a deterministic, auditable trail of *which data and which rule produced this*, and explainability becomes a first-class *eval gate* (Basis benchmarks models on explanation clarity, not just accuracy) — a requirement traditional ML observability never had to meet.

**How teams cope today.** Data/decision lineage attached to every output, citations to source spans, immutable per-decision logs, and (Pylon, Basis) compiling the domain rules into an audited DSL so the rule — not the LLM — is the artifact of record.

**Maturity: partial.** Concentrated in regulated verticals; entirely bespoke per company; no general "lineage for agents" product. High severity where it applies, hence #6 despite an all-VERIFIED tally.

## 7. Observability / tracing of non-deterministic runs — **partial → served**

**Count: 12/16** — Amperos (V), Antimetal (V), Comp AI (V), FurtherAI (V), Glean (V), Gradient Labs (V), Harvey (V), Momentic (V), Prophet Security (V), Traba (V), Basis (I), Rilla (I).

**Where it shows up.** Glean runs *tracing (OpenTelemetry), metrics, dashboards, and production forensics* (VERIFIED). Momentic captures *run videos, traces, network* (VERIFIED). Comp AI screenshots and logs every browser-verified control (VERIFIED). Gradient Labs uses the Temporal workflow cache plus Cloud Profiler for incident root-cause (VERIFIED).

**Why it's hard.** You can't debug or trust an agent you can't watch, and the thing you need to capture — full reasoning trajectories, per-step tool calls, confidence — is higher-dimensional and far larger than traditional request logs. But the *capture* problem is increasingly tractable.

**How teams cope today.** OpenTelemetry spans per step, Langfuse/Datadog for traces and dashboards, durable run records retaining trajectories. This is mostly an integration exercise now.

**Maturity: partial → served.** Strong tooling exists; the open part is what you *do* with the trace (→ #1). Recurring (12/16) but well-supported, so mid-pack.

## 8. Earning autonomy / trust gating / HITL — **partial; a pattern, not a product**

**Count: 10/16** — Amperos (V), Antimetal (V), Basis (V), Confido (V), FurtherAI (V), Gradient Labs (V), Pallet (V), Prophet Security (V), Traba (V), Comp AI (I).

**Where it shows up.** Antimetal: *"initially these systems should assist… as confidence grows, [the system] begins automating,"* defaulting to existing approval flows (VERIFIED). Amperos routes low-confidence work to a human biller (VERIFIED); Pallet's operators handle ~5% (VERIFIED); Prophet is autonomous on high-confidence threats, HITL on complex cases (VERIFIED).

**Why it's hard.** The crossing from "suggest" to "act" is the irreversible step — a wrong autonomous action moves money, files a document, or remediates a server. Trust has to be earned per action class on measured acceptance/override rates, and the gate depends on a confidence signal that isn't well-calibrated (#4).

**How teams cope today.** Ship as assistant first, graduate one action class at a time gated on blast radius, route low-confidence/high-dollar items to humans, and feed corrections back as eval signal.

**Maturity: partial.** A well-understood *pattern* recurring across 10/16, but each team builds its own gating logic — no shared product. Lower in the ranking because the pattern is mature even if the implementation is bespoke.

## 9. Integrating systems with no clean API — **partial; active tooling**

**Count: 9/16** — Amperos (V), Comp AI (V), Confido (V), Harvey (V), Momentic (V), Pallet (V), Prophet Security (V), Pylon (V), Traba (I).

**Where it shows up.** Pallet reaches *"any system with an API, including on-premise AS400… where APIs don't exist, Pallet builds them,"* falling back to Browserbase/Playwright (VERIFIED). Amperos drives payer portals with browser agents (VERIFIED). Harvey ships Word/Outlook add-ins because the system of record is the office suite (VERIFIED). Pylon spans *"REST, SOAP, file-based — the full spectrum"* (VERIFIED).

**Why it's hard.** The systems of record are legacy portals built for humans; layouts change and break scripted automation. The agentic bet is read-and-reason over record-and-replay — more resilient, but still brittle against redesigns and CAPTCHAs.

**How teams cope today.** API → built-API → drive-the-UI fallback hierarchy, browser automation (Browserbase/Playwright), and computer-use agents.

**Maturity: partial.** An active, funded tooling category (Browserbase, computer-use models). Recurring but increasingly served, so mid-pack.

## 10. Inference cost & latency control — **served**

**Count: 10/16** — Basis (V), Comp AI (V), Glean (V), Gradient Labs (V), Harvey (V), Momentic (V), Pallet (V), Antimetal (I), Pylon (I), Rilla (I).

**Where it shows up.** Harvey reports *3–5× cost reductions vs. a frontier-only approach* via its routing layer (VERIFIED). Momentic fires the LLM on ~1 step in 20 — *~300ms cached vs. >5s uncached* (VERIFIED). Comp AI and Basis route cheap models for bulk work, frontier models for hard reasoning (VERIFIED).

**Why it's hard.** Frontier calls on every step blow up cost and latency; latency is also a hard UX constraint on voice/interactive paths (Rilla).

**How teams cope today.** Per-step model routing, semantic/compiled caching, plan-depth and fan-out caps. Gateways/routers (Vercel AI Gateway, LiteLLM, OpenRouter) are off-the-shelf.

**Maturity: served.** Real, adoptable tooling exists. High recurrence but low underservedness, so it ranks low despite ubiquity.

## 11. Drift / model-swap churn — **partial; folds into eval**

**Count: 5/16** — Basis (V), FurtherAI (V), Glean (V), Momentic (V), Pallet (I). FurtherAI puts it plainly: *"a new model lands every few months… things break in ways that don't surface immediately."* Coped with by re-benchmarking every release (Basis), version-isolated caches (Momentic), and the weekly eval loop (FurtherAI). **Partial** — it's mostly a consequence handled by the eval rail (#5), not a standalone problem.

## 12. Own vs. rent / provider portability — **served**

**Count: 4/16** — Harvey (V), Gradient Labs (V), Glean (I), Rilla (I). Harvey *built its own runtime* because the infra to run agents with ZDR + multi-model + cost control *"didn't exist"* (VERIFIED); Gradient Labs swaps models *"with a one-line edit"* (VERIFIED); Rilla owns the hard model (field-audio ASR) and rents frontier reasoning (INFERRED). **Served** by gateways/routers for the portability half; the "own the runtime" half is a deliberate build, not a gap.

## — Prompt injection / security of acting agents — **under-evidenced in this corpus**

**Count: 1/16** — only Gradient Labs gives a direct signal: *20+ guardrails per turn, deterministic policy checks + LLM critics* (VERIFIED).

**This low count is a finding about the teardowns, not about the real world.** Prompt injection is a top-tier, industry-wide risk for any agent that can *act* — and most of these companies build acting agents. The near-total silence across 15 of 16 teardowns most likely reflects that security isn't surfaced in public job posts and blogs (the source material), **not** that these systems are unexposed. Treat the broad claim *"this is a severe, largely-open challenge for production agents"* as **SPECULATIVE** on the strength of this corpus: it's well-supported by the wider field but only minimally evidenced here. Flagged rather than dropped, and rather than inflated to a confident row in the main ranking.

---

## Shortlist: the 3 most underserved challenges

Each is high-severity, recurring (≥9/16), and lacks a real product category — what a standalone tool would do, in one line:

1. **Agent trajectory debugger (credit assignment, #1).** Ingests a full run trace and pinpoints the specific reasoning/tool step that caused a wrong final outcome — turning "the five-hour run was wrong" into "step 412 misread this field" — the attribution layer that today's tracing vendors stop just short of.

2. **Agent-native durable execution (#2).** A Temporal-shaped engine where LLM calls are first-class activities — checkpointed, idempotent, with built-in multi-provider failover and a replay model that *records* non-deterministic outputs and captures enough to *reproduce the decision*, so teams stop hand-rolling the same scaffolding on top of a workflow engine that assumes determinism.

3. **Context-engineering layer (degradation management, #3).** A managed "context budget" service that watches an agent's working context and automatically splits, summarizes, externalizes-to-memory, and prunes it at the degradation threshold — instead of every team reinventing phase-splitting and bespoke world models to fight a silent quality collapse.

*Close fourth:* a **calibrated-confidence / escalation gate (#4)** — a trustworthy "am I sure?" signal would unlock both autonomy gating (#8) and the escalation decisions that the entire assistant→actor model rests on.
