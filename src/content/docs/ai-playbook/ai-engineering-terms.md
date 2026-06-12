---
title: AI Engineering Terms
description: Practical applied-AI patterns and recipes distilled from the teardowns — autonomy gating, agent eval, model routing, durable execution — plus the foundational LLM/agent/retrieval vocabulary underneath.
sidebar:
  order: 1
---

A working reference for applied-AI engineering, in two parts. First, **patterns and recipes** distilled from how the teardown companies actually build — the recurring solutions to the genuinely hard problems, each linked to the teardowns it's drawn from. Then the **foundational vocabulary** those patterns are built on. Same rule throughout: a definition plus a sentence or two, not an essay.

## Patterns from the teardowns

The reusable moves that recur once you read enough teardowns — how teams make non-deterministic agents safe, cheap, and trustworthy enough to put in production. Each links to the teardown(s) where it shows up.

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

**Per-step model routing** — A supervisor routes each step to the cheapest model that can handle it, picked off an internal benchmark re-run every release; a small classifier can gate whether an expensive frontier call is needed at all. Most steps don't need the biggest model. — [Basis](/teardowns/basis/), [Glean](/teardowns/glean/)

**Compiled / semantic caching** — Cache the *result* of an expensive resolution (a located element, a retrieved answer) so the LLM fires only on a cache miss — Momentic runs inference on ~1 step in 20, ~300ms cached vs >5s uncached. The key encodes intent, so cosmetic changes don't bust it. — [Momentic](/teardowns/momentic/), [Glean](/teardowns/glean/)

**Cap plan depth / fan-out** — Explicitly bound how deep an agent can recurse and how many sub-calls it can spawn, so a multi-step plan can't multiply LLM calls without limit. Predictable cost beats unbounded autonomy. — [Glean](/teardowns/glean/), [Momentic](/teardowns/momentic/)

### Integrating the messy real world

**API → built-API → drive-the-UI fallback hierarchy** — Reach each system at the best interface it offers: native API first, an API you build second, and — where none exists — drive the legacy web UI with browser automation (Browserbase/Playwright) like a human would. The customer never has to migrate. — [Pallet](/teardowns/pallet/), [Amperos](/teardowns/amperos-health/), [Confido](/teardowns/confido/)

**Read-and-reason over record-and-replay** — Instead of brittle RPA that replays fixed clicks, an LLM agent reads the live screen/DOM, understands it, and adapts — so it survives portal redesigns and unscripted turns that break record-and-replay automation. — [Amperos](/teardowns/amperos-health/), [Momentic](/teardowns/momentic/)

**Cross-document reconciliation** — Extract structured fields from several documents that are supposed to agree (invoice ↔ PO ↔ goods-receipt, claim ↔ chart ↔ remittance) and reconcile them line-by-line, auto-clearing the matches and routing only the mismatches to a human. The hard part is entity resolution and tolerance across inconsistent formats, not OCR. — [Confido](/teardowns/confido/), [Amperos](/teardowns/amperos-health/)

**Document-vs-policy compliance** — Check a document against a codified ruleset (underwriting guidelines, regulatory controls, contract standards) and return *per-rule* pass/fail with the citing clause, not a bare yes/no. The policy stays the audited artifact and decides; the LLM locates and interprets the evidence. — [Pylon](/teardowns/pylon-lending/), [Norm AI](/teardowns/norm-ai/), [Comp AI](/teardowns/comp-ai/)

### Knowledge & retrieval

**Knowledge as data, not code** — Build the connectors and reasoning once and amortize them across customers; keep each tenant's uniqueness as learned "memories" and facts in a data layer rather than per-customer code. Pallet's agents run on 20,000+ customer-specific memories. — [Pallet](/teardowns/pallet/), [Glean](/teardowns/glean/)

**Permissioned / ACL-faithful retrieval** — Carry access-control metadata on the index itself (Glean puts ACLs on knowledge-graph edges) so a query can never return a document the user isn't allowed to open. In enterprise search the bottleneck is access fidelity, not recall. — [Glean](/teardowns/glean/)

**Proprietary corpus → semantic search** — Capture data no competitor has (in-person sales conversations), embed it, and turn it into a queryable corpus — the data becomes the moat under a search index. — [Rilla](/teardowns/rilla/)

### Architecture & orchestration

**Durable execution, idempotent activities, saga compensation** — Run long, multi-party, multi-day workflows on a durable engine (Temporal) so they survive crashes and replays; make each activity idempotent and use saga-style compensation to unwind partial failures, with humans as exception handlers. — [Pylon](/teardowns/pylon-lending/)

**Multi-agent phase-splitting to dodge context degradation** — When one agent's context grows long enough that quality degrades, split the job into specialized phase agents (intro / vetting / logistics / Q&A) that hand off, keeping each one's context small and sharp. — [Traba](/teardowns/traba/), [Antimetal](/teardowns/antimetal/)

**Compile domain logic to a tested DSL** — Encode dense rules (regulatory guidelines, underwriting policy) into an executable DSL with a golden-file/snapshot test suite gating every change; AI drafts the rules, humans approve, and the DSL stays the audited artifact. — [Pylon](/teardowns/pylon-lending/)

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

**Prompt / prompt engineering** — the input instructions you give a model; prompt engineering is the craft of shaping them (wording, examples, structure) for reliable output. In production prompts are version-controlled and tested like code, not hand-tweaked.

**System prompt** — the persistent instruction that sets a model's role, rules, and tone for a whole session, separate from the user's turn-by-turn messages. It's where persona and guardrails live.

**Few-shot / in-context learning** — giving the model a handful of worked examples inside the prompt so it infers the pattern, with no training. The cheapest way to steer behavior before reaching for fine-tuning.

**Temperature** — the sampling knob for randomness: near 0 makes output focused and repeatable, higher makes it varied. Production agents usually run low for consistency.

**Structured output** — forcing the model to return a fixed schema (JSON, a function signature) instead of free text, so downstream code can consume it reliably. The backbone of tool calling and extraction pipelines.

**Multimodal (multi-modal)** — a model that handles more than text — images, audio, documents — in one context. Lets a single model read a scanned invoice or hear a call instead of bolting on separate OCR/ASR.

**Frontier vs. small model** — frontier models are the largest and most capable (and costly/slow); small models are cheaper and faster but weaker. Most systems mix them, routing each step to the smallest model that suffices.

**Distillation** — training a small model to mimic a larger one, capturing much of its quality at a fraction of the cost and latency. A common way to make inference affordable at scale.

**Quantization** — shrinking a model's weights to lower precision (e.g. 16-bit → 4-bit) so it runs faster and cheaper, trading a little accuracy. Key to self-hosting large models economically.

**Prompt caching** — reusing the model's computation for an unchanged prompt prefix (e.g. a long system prompt) across calls, cutting cost and latency on repeated context.

### Retrieval & memory

**RAG (retrieval-augmented generation)** — fetch documents relevant to the query and feed them into the prompt so the model answers from your data instead of its training. The standard way to ground an LLM in private, current, or domain-specific knowledge without fine-tuning.

**Embeddings** — numerical vectors that capture the meaning of text, so that similar meanings land near each other in vector space. They're what make "search by meaning" and RAG retrieval possible.

**Vector database** — a store optimized for finding the embeddings nearest a query vector, fast, at scale. It's the retrieval backbone of most RAG systems.

**Semantic search** — searching by meaning rather than exact keywords, using embeddings to match intent. It surfaces relevant results even when the wording doesn't overlap, which keyword search misses.

**Chunking** — splitting documents into smaller pieces before embedding them, so retrieval returns focused, relevant passages instead of whole files. Chunk size is a real tuning knob: too big wastes context, too small loses meaning.

**Grounding** — tying model output to specific cited source data rather than letting it free-associate from training. It's the main defense against hallucination and what lets a system show its receipts.

**Hybrid search** — combining keyword (lexical) and semantic (vector) search so you catch both exact-term and meaning matches. Usually beats either alone on retrieval recall.

**Reranker** — a second-pass model that reorders an initial set of retrieved results by true relevance to the query. Cheap retrieval casts a wide net; the reranker tightens precision before the LLM sees the results.

**Knowledge graph** — a store of entities and the typed relationships between them, queryable by multi-hop connections rather than just text similarity. Carries structure — and often permissions and provenance — a flat vector store can't.

**Memory (long-term)** — facts or past interactions an agent persists and recalls across sessions, beyond the context window. Often stored as retrievable "memories" so behavior personalizes over time.

**Context pruning / compaction** — actively managing the working context during a long run: summarizing finished steps, dropping stale or irrelevant turns, and checkpointing key facts to external memory so the live context stays small and sharp. Without it a long agent run fills the window with noise and quality degrades — it's the housekeeping that keeps long-horizon reasoning viable.

### Agents & orchestration

**Agentic** — an LLM that doesn't just answer but *acts*: it plans steps, calls tools, observes the results, and loops until a goal is met, rather than producing one response and stopping. This shift from single-shot answer to autonomous action is what most of the teardowns are really building.

**Agent loop** — the core cycle of an agentic system: plan → act (call a tool) → observe the result → decide the next step, repeating until done. It's the control structure that turns a one-shot model into something that pursues a goal.

**Long-horizon reasoning** — sustaining coherent, goal-directed reasoning across many steps over a long run — minutes to days, sometimes thousands of decisions — without losing the thread as context fills and small errors compound. It's the hard part of serious agents: the failure modes are context degradation and drift over the run, which is why teams reach for phase-splitting, durable execution, and trajectory-level credit assignment to keep a long run on track.

**Multi-agent** — multiple specialized agents coordinating on a task, each with a narrower role (e.g. a planner, a researcher, a checker). Splitting the work can improve quality and focus, at the cost of more orchestration and more places for things to go wrong.

**Agent swarm** — running many agents in parallel on one problem, usually many copies of the *same* role rather than a few specialized ones: fan out the work, let each explore independently, then merge or vote on the results. Where *multi-agent* divides a task by role, a swarm divides it by scale — useful for broad search, redundancy, or sampling many attempts, at the cost of multiplied inference and a harder merge step. Marketed counts ("hundreds of sub-agents") are usually a throughput claim, not a fixed architecture.

**Orchestration** — coordinating the models, tools, retrieval, and steps into a coherent workflow with state, retries, and branching. As soon as a product is more than one model call, orchestration is where most of the engineering lives.

**Tool / function calling** — the model invoking external functions or APIs in a structured (typically JSON) format, so it can fetch data or take actions in the real world. It's the bridge from "generates text" to "does something."

**Router** — a component that decides which model, agent, or path should handle a given request. Used to send easy requests to cheap/fast models and hard ones to stronger models, balancing cost against quality.

**Human-in-the-loop (HITL)** — inserting a person to approve, correct, or escalate before a non-deterministic system acts. The standard safety valve when a wrong autonomous action is expensive or irreversible.

**Guardrails** — constraints that block unsafe, off-policy, or malformed model behavior — input/output filters, validation, allowed-action limits. They bound what an agent can do so a bad generation doesn't become a bad action.

**MCP (Model Context Protocol)** — an open standard for connecting models to tools and data through a uniform interface, so one integration works across many systems instead of bespoke glue per tool. Increasingly the connector layer for agents.

**ReAct** — an agent pattern that interleaves reasoning ("think") and acting ("call a tool"): the model reasons about what to do, acts, observes the result, and reasons again. The common loop behind tool-using agents.

**Planner** — the component or model step that breaks a goal into an ordered set of steps before execution, rather than reacting one move at a time. Separating planning from acting improves complex multi-step tasks.

**Supervisor / sub-agent** — an orchestration pattern where a supervisor decomposes a task, delegates pieces to specialized sub-agents, and integrates their results. Keeps each agent's job — and context — narrow.

**Hierarchical planning** — planning in layers: break a macro-goal into sub-goals, then plan each sub-goal's steps, so the agent never has to reason over hundreds of flat steps at once. Bounding the planning horizon at each level is a main defense against the drift and combinatorial blow-up of long-horizon reasoning.

**Computer use / browser agent** — an agent that operates software the way a person does, reading the screen and clicking/typing in a real browser or desktop, to reach systems with no API. The adaptive fallback when integration isn't available.

**RPA (robotic process automation)** — older automation that replays a fixed sequence of UI clicks and keystrokes. Reliable on stable screens but brittle when layouts change — the thing LLM "read-and-reason" agents are displacing.

**Playbook** — a predefined, hardcoded sequence of steps for handling a situation (e.g. a SOAR security-response script). Reliable but brittle: it can't adapt when inputs or upstream systems shift, which is why agentic systems increasingly replace static playbooks with reasoning that builds the plan per case.

**Handoff** — passing control and the relevant context from one agent or phase to another, or from the agent to a human. Clean handoffs are how multi-agent systems and HITL escalation avoid losing state.

### Reliability & evaluation

**Eval (evaluation)** — systematic measurement of model or agent output quality against expected results, the AI analog of a test suite. Because output is non-deterministic, evals are how teams catch regressions and decide whether a prompt or model change actually helped.

**Deterministic vs. non-deterministic** — a deterministic system gives the same output for the same input every time; an LLM generally does not. That non-determinism is the central testing and reliability headache of applied AI, and the reason evals, guardrails, and HITL exist.

**Observability / tracing** — the ability to see inside a running non-deterministic system: logs, traces, and a record of what the agent actually did at each step. You can't debug or trust an agent you can't watch, so this is foundational for production AI.

**Lineage (data / decision lineage)** — the auditable family tree of an outcome: which data sources, transformations, and specific rules produced it, traceable end to end. In regulated domains, making every decision carry the lineage that proves *which rule fired* is what turns a non-deterministic answer into a defensible one — see [Encoding domain rules](/ai-playbook/encoding-domain-rules/).

**Fallback** — the backup path taken when a model or tool fails, times out, or returns low-confidence output (e.g. retry, switch models, hand off to a human). It keeps the system graceful instead of broken when the primary path doesn't work.

**Durable execution (Temporal)** — a workflow engine pattern where execution state is persisted so long-running jobs survive crashes, restarts, and retries without losing progress. It's increasingly the backbone for agent workflows that run for minutes or hours and must not silently die. *(Temporal is the most common such engine in the teardowns.)*

**Streaming** — emitting tokens to the user as they're generated rather than waiting for the full response. It makes a slow model *feel* fast and is the default for chat-style interfaces.

**Hallucination** — when a model produces confident, fluent output that is simply false. It's the failure mode grounding, RAG, citations, and evals are all built to contain.

**LLM-as-judge** — using an LLM to score another model's output against criteria, instead of exact-match assertions. The workhorse of agent eval, since correct answers are often open-ended.

**Golden set** — a curated set of inputs with known-good outputs, used as the benchmark an eval scores against. The fixed yardstick that tells you whether a change improved or regressed quality.

**Prompt injection** — an attack where malicious text in the input (or in retrieved content) hijacks the model into ignoring its instructions. The defining security problem of LLM apps, especially agents that can act.

**Jailbreak** — input crafted to bypass a model's safety guardrails and make it produce disallowed output. Related to prompt injection, but aimed at the model's policy rather than the app's instructions.

**Confidence scoring** — attaching a calibrated certainty to an output so the system can auto-act when confident and escalate when not. The signal most autonomy-gating and HITL routing depends on.

**Drift** — the gradual decay of output quality as inputs, data, or an upstream model change underneath a system tuned for the old conditions. Why evals run continuously, not once.

**Error compounding** — in a multi-step agent run, per-step errors multiply: even 95%-accurate steps strung across 50 interdependent decisions leave roughly a one-in-thirteen chance the whole run survives (0.95⁵⁰ ≈ 8%). It's the math that makes long-horizon reliability hard, and the reason teams bound step count, checkpoint, and verify mid-run instead of trusting a long chain end to end.

**Context degradation** — the quality fall-off as an agent's context fills over a long run: accumulated state, stale instructions, and prior steps crowd and confuse the model, so later decisions get worse. The driver behind context pruning, phase-splitting, and capping how long any one agent runs before handing off.

**Self-correction / reflection** — having the model critique its own output and revise before committing (the Reflexion-style loop). It helps, but is unreliable on its own — models often double down on an early hallucination rather than catch it — which is why external evals, guardrails, and human-in-the-loop remain the real safety rails.

**Red-teaming** — deliberately attacking your own system (prompt injection, jailbreaks, edge cases) to find failure modes before users or adversaries do.

## Voice & multimodal I/O

For the voice-native and document-heavy products in the teardowns, the I/O layer is its own hard problem.

**ASR (automatic speech recognition)** — speech-to-text: turning spoken audio into a transcript. The hard part in the field is noise, accents, and crosstalk that wreck off-the-shelf models, which is why some teams fine-tune their own.

**TTS (text-to-speech)** — generating spoken audio from text, the output side of a voice agent. Quality and latency here decide whether a spoken agent feels human.

**Turn-taking** — detecting when the user has stopped speaking and the agent should respond (and handling interruptions), so a voice conversation flows instead of talking over the person.

**Diarization** — separating an audio stream into who-spoke-when across multiple speakers. Needed to attribute lines in a multi-party call or sales conversation.

**OCR (optical character recognition)** — extracting text from images or scanned documents. The entry point for processing invoices, forms, and faxes that arrive as pixels, not data.
