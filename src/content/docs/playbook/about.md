---
title: About the Playbook
description: The recurring hard problems of applied AI — earning autonomy, evaluating non-deterministic agents, controlling inference cost, reaching systems with no API — and the patterns, tools, and architectures teams use to solve them, drawn from the teardowns.
sidebar:
  order: 0
---

Read enough [teardowns](/teardowns/about/) and the same hard problems surface again and again, solved in recognizably similar ways. The **Applied AI Playbook** lifts those problems out of any single company and treats each one on its own: what makes it hard, the patterns that recur, the tools and popular choices teams reach for, a reference architecture, and the best practices — each tied back to the teardowns it's drawn from.

This is the cross-company comparative map the teardowns point toward. It's synthesis, not a per-company reconstruction: the unit here is the *problem and its solution space*, evidenced by linking to the teardowns where each move shows up — not a per-claim confidence tier (that discipline lives in the [teardowns themselves](/teardowns/about/)). For the vocabulary underneath these patterns, see [AI Engineering Terms](/notes/ai-engineering-terms/).

## The map

Each row is a problem common to applied-AI products and the page that works it through. Pages link to the teardowns that supply the evidence.

| Challenge | The problem in one line | Seen across |
| --- | --- | --- |
| [Graduating an agent from assistant to actor](/playbook/agent-assistant-to-actor/) | Crossing from "suggest" to "act" without losing user trust | Antimetal, Prophet Security, Pallet, Basis, Confido, Amperos |
| [Testing output that isn't reproducible](/playbook/evaluating-non-deterministic-agents/) | No fixed expected output, so a normal test suite can't gate changes | Glean, Rilla, Traba, Momentic, Basis |
| [Keeping inference cheap & fast](/playbook/inference-cost-and-latency/) | Frontier-model calls on every step blow up cost and latency | Basis, Glean, Momentic, Traba |
| [Reaching systems with no clean API](/playbook/integrating-systems-without-apis/) | The systems of record are legacy portals built for humans, not machines | Pallet, Amperos, Confido, Momentic |
| [Retrieval at multi-tenant scale](/playbook/multi-tenant-retrieval/) | Grounding every tenant in its own knowledge without per-customer code | Pallet, Glean, Rilla |
| [Surviving long, multi-day workflows](/playbook/durable-long-running-workflows/) | Multi-party flows must survive crashes, retries, and partial failure | Pylon, Gradient Labs, Harvey |
| [Beating context degradation](/playbook/context-degradation/) | One agent's context grows until quality quietly falls off | Traba, Antimetal |
| [Encoding dense domain rules](/playbook/encoding-domain-rules/) | Regulatory and underwriting logic must be exact, testable, and auditable | Pylon, Basis |
| [Own vs. rent the model](/playbook/own-vs-rent-the-model/) | Deciding where to spend a training budget vs. renting a frontier LLM | Rilla, Basis |

*Pages marked **Soon** in the sidebar are in the research queue — they fill in with patterns, tools, architecture, and best practices as they land.*
