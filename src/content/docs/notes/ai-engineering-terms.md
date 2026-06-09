---
title: AI Engineering Terms
description: A tight glossary of the LLM, retrieval, agent, and reliability terms that recur across the teardowns — defined for engineers, a definition plus a sentence or two each.
sidebar:
  order: 2
---

A working glossary of the applied-AI engineering vocabulary that recurs across the teardowns — models and inference, retrieval, agents and orchestration, reliability and evaluation. Same rule as the [startup terms](/notes/startup-gtm-terms/): a definition plus a sentence or two of explanation, not an essay.

## Models & inference

**LLM (large language model)** — the core engine: a model trained on huge text corpora that predicts the next token to generate language. Everything else in an applied-AI product is plumbing around getting good output from one (or several) of these.

**Inference** — running a trained model to produce output, as opposed to training it. It's the per-request unit that costs money and takes time, so inference cost and speed shape most architecture decisions.

**Latency** — how long the model takes to respond. It's a hard UX constraint: it drives choices like smaller models, streaming, caching, and whether a step can sit on the critical path of a user interaction.

**Context window** — the maximum amount of text (prompt + output) a model can consider at once, measured in tokens. It caps how much retrieved data, history, or instruction you can feed in, which is why retrieval and summarization exist.

**Token** — the unit a model reads and writes (roughly a word-piece), and the unit you're billed on. Counting tokens matters because both cost and the context-window limit are denominated in them.

**Fine-tuning** — further-training a base model on your own examples to specialize it for a narrower task or style. It trades flexibility for sharper, cheaper performance on the specific job, but needs data and re-training when the task shifts.

## Retrieval & memory

**RAG (retrieval-augmented generation)** — fetch documents relevant to the query and feed them into the prompt so the model answers from your data instead of its training. The standard way to ground an LLM in private, current, or domain-specific knowledge without fine-tuning.

**Embeddings** — numerical vectors that capture the meaning of text, so that similar meanings land near each other in vector space. They're what make "search by meaning" and RAG retrieval possible.

**Vector database** — a store optimized for finding the embeddings nearest a query vector, fast, at scale. It's the retrieval backbone of most RAG systems.

**Semantic search** — searching by meaning rather than exact keywords, using embeddings to match intent. It surfaces relevant results even when the wording doesn't overlap, which keyword search misses.

**Chunking** — splitting documents into smaller pieces before embedding them, so retrieval returns focused, relevant passages instead of whole files. Chunk size is a real tuning knob: too big wastes context, too small loses meaning.

**Grounding** — tying model output to specific cited source data rather than letting it free-associate from training. It's the main defense against hallucination and what lets a system show its receipts.

## Agents & orchestration

**Agentic** — an LLM that doesn't just answer but *acts*: it plans steps, calls tools, observes the results, and loops until a goal is met, rather than producing one response and stopping. This shift from single-shot answer to autonomous action is what most of the teardowns are really building.

**Agent loop** — the core cycle of an agentic system: plan → act (call a tool) → observe the result → decide the next step, repeating until done. It's the control structure that turns a one-shot model into something that pursues a goal.

**Multi-agent** — multiple specialized agents coordinating on a task, each with a narrower role (e.g. a planner, a researcher, a checker). Splitting the work can improve quality and focus, at the cost of more orchestration and more places for things to go wrong.

**Orchestration** — coordinating the models, tools, retrieval, and steps into a coherent workflow with state, retries, and branching. As soon as a product is more than one model call, orchestration is where most of the engineering lives.

**Tool / function calling** — the model invoking external functions or APIs in a structured (typically JSON) format, so it can fetch data or take actions in the real world. It's the bridge from "generates text" to "does something."

**Router** — a component that decides which model, agent, or path should handle a given request. Used to send easy requests to cheap/fast models and hard ones to stronger models, balancing cost against quality.

**Human-in-the-loop (HITL)** — inserting a person to approve, correct, or escalate before a non-deterministic system acts. The standard safety valve when a wrong autonomous action is expensive or irreversible.

**Guardrails** — constraints that block unsafe, off-policy, or malformed model behavior — input/output filters, validation, allowed-action limits. They bound what an agent can do so a bad generation doesn't become a bad action.

## Reliability & evaluation

**Eval (evaluation)** — systematic measurement of model or agent output quality against expected results, the AI analog of a test suite. Because output is non-deterministic, evals are how teams catch regressions and decide whether a prompt or model change actually helped.

**Deterministic vs. non-deterministic** — a deterministic system gives the same output for the same input every time; an LLM generally does not. That non-determinism is the central testing and reliability headache of applied AI, and the reason evals, guardrails, and HITL exist.

**Observability / tracing** — the ability to see inside a running non-deterministic system: logs, traces, and a record of what the agent actually did at each step. You can't debug or trust an agent you can't watch, so this is foundational for production AI.

**Fallback** — the backup path taken when a model or tool fails, times out, or returns low-confidence output (e.g. retry, switch models, hand off to a human). It keeps the system graceful instead of broken when the primary path doesn't work.

**Durable execution (Temporal)** — a workflow engine pattern where execution state is persisted so long-running jobs survive crashes, restarts, and retries without losing progress. It's increasingly the backbone for agent workflows that run for minutes or hours and must not silently die. *(Temporal is the most common such engine in the teardowns.)*

**Streaming** — emitting tokens to the user as they're generated rather than waiting for the full response. It makes a slow model *feel* fast and is the default for chat-style interfaces.

**Hallucination** — when a model produces confident, fluent output that is simply false. It's the failure mode grounding, RAG, citations, and evals are all built to contain.
