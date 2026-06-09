---
title: AI Engineering Terms
description: Practical applied-AI patterns and recipes distilled from the teardowns — autonomy gating, agent eval, model routing, durable execution — plus the foundational LLM/agent/retrieval vocabulary underneath.
sidebar:
  order: 2
---

A working reference for applied-AI engineering, in two parts. First, **patterns and recipes** distilled from how the teardown companies actually build — the recurring solutions to the genuinely hard problems, each linked to the teardowns it's drawn from. Then the **foundational vocabulary** those patterns are built on. Same rule throughout: a definition plus a sentence or two, not an essay.

## Patterns from the teardowns

The reusable moves that recur once you read enough teardowns — how teams make non-deterministic agents safe, cheap, and trustworthy enough to put in production. Each links to the teardown(s) where the signal appears, and those pages carry the per-claim **VERIFIED / INFERRED / SPECULATIVE** tiers. Where a pattern's specifics are a best-practice guess rather than something the company states, they're hedged in place ("likely," "typically").

### Autonomy, trust & safety

**Confidence-graduated autonomy** — Ship the agent as an assistant first, then graduate it to act on its own one *action class* at a time, gated on measured acceptance and override rates and on each action's blast radius. The crossing from "suggest" to "act" is the irreversible step, so trust is earned per action type, not granted wholesale. — [Antimetal](/teardowns/antimetal/), [Prophet Security](/teardowns/prophet-security/), [Pallet](/teardowns/pallet/), [Basis](/teardowns/basis/)

**Human-in-the-loop as the validation gate** — Auto-process the confident majority and route low-confidence or high-dollar items to a person, whose corrections feed back as training and eval signal. It's what lets a finance or ops team trust AI-produced figures in a system of record. — [Confido](/teardowns/confido/), [Amperos](/teardowns/amperos-health/), [Pallet](/teardowns/pallet/)

**Self-audit before handoff** — Have the agent review its own actions and emit proof-of-work artifacts — call recordings and transcripts, exported PDFs, reasoning traces — so output is pre-audited before a human ever sees it. Turns "trust me" into "here's the evidence." — [Amperos](/teardowns/amperos-health/)

**Show-your-work / explainability gating** — Make every output carry its data lineage and a confidence score, and gate go-live on how clearly the system can *explain* its reasoning, not just on accuracy. In regulated domains a confident-but-unexplained answer is a liability, so explainability becomes a first-class eval metric. — [Basis](/teardowns/basis/), [Pylon](/teardowns/pylon-lending/), [Prophet Security](/teardowns/prophet-security/), [Confido](/teardowns/confido/)

### Evaluating non-deterministic agents

**Eval as the only safety rail** — Because output isn't reproducible, a golden set scored by an LLM-as-judge becomes the agentic analog of a test suite, gating every prompt and model change in CI. Without it you can't tell whether a change actually helped or quietly regressed. — [Glean](/teardowns/glean/), [Rilla](/teardowns/rilla/), [Traba](/teardowns/traba/), [Momentic](/teardowns/momentic/)

**Trajectory-level eval & credit assignment** — When an agent runs for hours across thousands of decisions, the hard part is attributing a bad outcome back to the one reasoning step that caused it — and tuning judges when the "right" answer is subjective. Pass/fail on the final output isn't enough. — [Basis](/teardowns/basis/)

**Shadow / replay & simulation harness** — Run agent changes against recorded production events or historical scenarios in a sandbox before they touch anything live, scoring on acceptance/override before promotion. Lets you regression-test a system that can't be safely tested in prod. — [Antimetal](/teardowns/antimetal/), [Pallet](/teardowns/pallet/)

**Versioned eval datasets** — Keep human-annotated evaluation datasets (e.g. in Langfuse) under version control alongside templated prompts, so a change can be scored against ground truth in minutes instead of hours. Makes eval iterate at the speed of development. — [Traba](/teardowns/traba/)

### Cost & latency

**Per-step model routing** — A supervisor routes each step to the cheapest model that can handle it, picked off an internal benchmark re-run every release (verified at Basis); a small classifier likely gates whether an expensive frontier call is needed at all. Most steps don't need the biggest model. — [Basis](/teardowns/basis/), [Glean](/teardowns/glean/)

**Compiled / semantic caching** — Cache the *result* of an expensive resolution (a located element, a retrieved answer) so the LLM fires only on a cache miss — Momentic runs inference on ~1 step in 20, ~300ms cached vs >5s uncached. The key encodes intent, so cosmetic changes don't bust it. — [Momentic](/teardowns/momentic/), [Glean](/teardowns/glean/)

**Cap plan depth / fan-out** *(speculative)* — A team facing multi-step plans that multiply LLM calls would typically bound how deep an agent can recurse and how many sub-calls it can spawn, so cost stays predictable. Drawn from the *likely-approach* columns, not a stated mechanism. — [Glean](/teardowns/glean/), [Momentic](/teardowns/momentic/)

### Integrating the messy real world

**API → built-API → drive-the-UI fallback hierarchy** — Reach each system at the best interface it offers: native API first, an API you build second, and — where none exists — drive the legacy web UI with browser automation (Browserbase/Playwright) like a human would. The customer never has to migrate. — [Pallet](/teardowns/pallet/), [Amperos](/teardowns/amperos-health/), [Confido](/teardowns/confido/)

**Read-and-reason over record-and-replay** — Instead of brittle RPA that replays fixed clicks, an LLM agent reads the live screen/DOM, understands it, and adapts — so it survives portal redesigns and unscripted turns that break record-and-replay automation. — [Amperos](/teardowns/amperos-health/), [Momentic](/teardowns/momentic/)

### Knowledge & retrieval

**Knowledge as data, not code** — Build the connectors and reasoning once and amortize them across customers; keep each tenant's uniqueness as learned "memories" and facts in a data layer rather than per-customer code. Pallet's agents run on 20,000+ customer-specific memories. — [Pallet](/teardowns/pallet/), [Glean](/teardowns/glean/)

**Permissioned / ACL-faithful retrieval** — Carry access-control metadata on the index itself (Glean puts ACLs on knowledge-graph edges) so a query can never return a document the user isn't allowed to open. In enterprise search the bottleneck is access fidelity, not recall. — [Glean](/teardowns/glean/)

**Proprietary corpus → semantic search** — Capture data no competitor has (in-person sales conversations), embed it, and turn it into a queryable corpus — the data becomes the moat under a search index. — [Rilla](/teardowns/rilla/)

### Architecture & orchestration

**Durable execution, idempotent activities, saga compensation** — Run long, multi-party, multi-day workflows on a durable engine (Temporal is named across Pylon's JDs) so they survive crashes and replays, with humans as exception handlers. The idempotent-activities + saga-compensation specifics are the likely engineering, not stated. — [Pylon](/teardowns/pylon-lending/)

**Multi-agent phase-splitting to dodge context degradation** — When one agent's context grows long enough that quality degrades, split the job into specialized phase agents (intro / vetting / logistics / Q&A) that hand off, keeping each one's context small and sharp. — [Traba](/teardowns/traba/), [Antimetal](/teardowns/antimetal/)

**Compile domain logic to a tested DSL** — Encode dense rules (regulatory guidelines, underwriting policy) into an executable DSL where AI drafts the rules, humans approve, and the DSL stays the audited artifact (verified at Pylon); a golden-file/snapshot test suite gating every change is the likely safeguard. — [Pylon](/teardowns/pylon-lending/)

**Own the hard model, rent the reasoning** — Fine-tune and self-host the model that's genuinely hard for your domain (e.g. ASR on noisy field audio), but rent the frontier LLM for general reasoning behind a router — and keep both swappable. Spend your training budget only where off-the-shelf fails. — [Rilla](/teardowns/rilla/)

## Foundational vocabulary

The base terms the patterns above are built from — models and inference, retrieval, agents and orchestration, reliability and evaluation.

### Models & inference

**LLM (large language model)** — the core engine: a model trained on huge text corpora that predicts the next token to generate language. Everything else in an applied-AI product is plumbing around getting good output from one (or several) of these.

**Inference** — running a trained model to produce output, as opposed to training it. It's the per-request unit that costs money and takes time, so inference cost and speed shape most architecture decisions.

**Latency** — how long the model takes to respond. It's a hard UX constraint: it drives choices like smaller models, streaming, caching, and whether a step can sit on the critical path of a user interaction.

**Context window** — the maximum amount of text (prompt + output) a model can consider at once, measured in tokens. It caps how much retrieved data, history, or instruction you can feed in, which is why retrieval and summarization exist.

**Token** — the unit a model reads and writes (roughly a word-piece), and the unit you're billed on. Counting tokens matters because both cost and the context-window limit are denominated in them.

**Fine-tuning** — further-training a base model on your own examples to specialize it for a narrower task or style. It trades flexibility for sharper, cheaper performance on the specific job, but needs data and re-training when the task shifts.

### Retrieval & memory

**RAG (retrieval-augmented generation)** — fetch documents relevant to the query and feed them into the prompt so the model answers from your data instead of its training. The standard way to ground an LLM in private, current, or domain-specific knowledge without fine-tuning.

**Embeddings** — numerical vectors that capture the meaning of text, so that similar meanings land near each other in vector space. They're what make "search by meaning" and RAG retrieval possible.

**Vector database** — a store optimized for finding the embeddings nearest a query vector, fast, at scale. It's the retrieval backbone of most RAG systems.

**Semantic search** — searching by meaning rather than exact keywords, using embeddings to match intent. It surfaces relevant results even when the wording doesn't overlap, which keyword search misses.

**Chunking** — splitting documents into smaller pieces before embedding them, so retrieval returns focused, relevant passages instead of whole files. Chunk size is a real tuning knob: too big wastes context, too small loses meaning.

**Grounding** — tying model output to specific cited source data rather than letting it free-associate from training. It's the main defense against hallucination and what lets a system show its receipts.

### Agents & orchestration

**Agentic** — an LLM that doesn't just answer but *acts*: it plans steps, calls tools, observes the results, and loops until a goal is met, rather than producing one response and stopping. This shift from single-shot answer to autonomous action is what most of the teardowns are really building.

**Agent loop** — the core cycle of an agentic system: plan → act (call a tool) → observe the result → decide the next step, repeating until done. It's the control structure that turns a one-shot model into something that pursues a goal.

**Multi-agent** — multiple specialized agents coordinating on a task, each with a narrower role (e.g. a planner, a researcher, a checker). Splitting the work can improve quality and focus, at the cost of more orchestration and more places for things to go wrong.

**Orchestration** — coordinating the models, tools, retrieval, and steps into a coherent workflow with state, retries, and branching. As soon as a product is more than one model call, orchestration is where most of the engineering lives.

**Tool / function calling** — the model invoking external functions or APIs in a structured (typically JSON) format, so it can fetch data or take actions in the real world. It's the bridge from "generates text" to "does something."

**Router** — a component that decides which model, agent, or path should handle a given request. Used to send easy requests to cheap/fast models and hard ones to stronger models, balancing cost against quality.

**Human-in-the-loop (HITL)** — inserting a person to approve, correct, or escalate before a non-deterministic system acts. The standard safety valve when a wrong autonomous action is expensive or irreversible.

**Guardrails** — constraints that block unsafe, off-policy, or malformed model behavior — input/output filters, validation, allowed-action limits. They bound what an agent can do so a bad generation doesn't become a bad action.

### Reliability & evaluation

**Eval (evaluation)** — systematic measurement of model or agent output quality against expected results, the AI analog of a test suite. Because output is non-deterministic, evals are how teams catch regressions and decide whether a prompt or model change actually helped.

**Deterministic vs. non-deterministic** — a deterministic system gives the same output for the same input every time; an LLM generally does not. That non-determinism is the central testing and reliability headache of applied AI, and the reason evals, guardrails, and HITL exist.

**Observability / tracing** — the ability to see inside a running non-deterministic system: logs, traces, and a record of what the agent actually did at each step. You can't debug or trust an agent you can't watch, so this is foundational for production AI.

**Fallback** — the backup path taken when a model or tool fails, times out, or returns low-confidence output (e.g. retry, switch models, hand off to a human). It keeps the system graceful instead of broken when the primary path doesn't work.

**Durable execution (Temporal)** — a workflow engine pattern where execution state is persisted so long-running jobs survive crashes, restarts, and retries without losing progress. It's increasingly the backbone for agent workflows that run for minutes or hours and must not silently die. *(Temporal is the most common such engine in the teardowns.)*

**Streaming** — emitting tokens to the user as they're generated rather than waiting for the full response. It makes a slow model *feel* fast and is the default for chat-style interfaces.

**Hallucination** — when a model produces confident, fluent output that is simply false. It's the failure mode grounding, RAG, citations, and evals are all built to contain.
