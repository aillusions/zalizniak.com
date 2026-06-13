---
title: How Guardrails Work
description: A practical reference for constraining LLM and agent behavior — the layers wrapped around the model (input filters, output validation, action limits), the deterministic-checks-plus-LLM-critics pattern, and what guardrails can't fix.
sidebar:
  order: 6
---

A guardrail is any constraint that stops a model from doing something unsafe, off-policy, or malformed. The key idea: guardrails live **around** the model, mostly as plain code and separate model calls — not inside the model you're prompting. You layer them at three points: input, output, and (for agents) actions. Companion to [Prompting Techniques](/notes/prompting-techniques/) and the [AI Engineering Terms](/ai-playbook/ai-engineering-terms/) glossary.

## On the input — before the model sees it

**Validation and allow-lists.** Reject or sanitize input up front: is the request in scope, the right length, free of disallowed content? Cheap and deterministic.

**Prompt-injection filters.** Detect "ignore your previous instructions"-style attacks — and not just in the user's message: malicious text hidden in *retrieved* content (a web page, a document) is the sneakier vector for any agent doing RAG. Filters reduce this risk; they don't remove it (see the caveats below).

## On the output — before it's used or shown

**Schema validation.** Force [structured output](/ai-playbook/ai-engineering-terms/) and reject anything that doesn't parse. The cheapest, most reliable guardrail there is — if it's not valid JSON matching your schema, it never reaches downstream code.

**Deterministic rule checks.** Plain code over the output: regex, allow-lists, business rules ("refund ≤ $500," "no PII," "must include a citation"). Fast, predictable, and auditable — use these for anything you can specify exactly.

**LLM critics / judges.** A second model call that scores the output against a policy — "is this on-policy, safe, grounded in the source?" This catches the fuzzy, judgment-based violations that rules can't express. It's the same machinery as [LLM-as-judge](/ai-playbook/ai-engineering-terms/) in eval, pointed at safety instead of quality.

**Classifiers / moderation models.** Purpose-built models for toxicity, safety categories, or PII detection (provider moderation endpoints, Llama Guard, etc.). Reach for these when the check is a well-known category someone already trained a model for.

## On actions — for agents that *do* things

**Capability limits.** The strongest guardrail is making the dangerous action impossible: the agent simply isn't given the tool, or its permissions bound what it can touch. You can't misuse a capability you don't have.

**Human-in-the-loop gate.** Route low-confidence or high-stakes actions to a person instead of executing them — see [graduating an agent from assistant to actor](/ai-playbook/agent-assistant-to-actor/). The escape hatch when the automated checks aren't enough to trust the action.

## The pattern that works

**Deterministic checks + LLM critics, layered, with a fallback.** Run cheap exact rules first; use an LLM critic for what you can't specify exactly; and when either fails, fall back to a safe default — refuse, answer "I don't know," or escalate to a human. Order them cheap-to-expensive so most cases never reach the costly model-based check.

The canonical production example is [Gradient Labs](/teardowns/gradient-labs/): **20+ guardrails run on every turn**, combining *deterministic policy checks with LLM critics*, and routing vulnerable or out-of-policy cases to a human. Cheap rules first, model critics second, human last.

## What guardrails can't fix

- **LLM-based guardrails are themselves non-deterministic.** A critic or classifier can be wrong, so a guardrail is a risk *reduction*, not a guarantee. Layer them; don't trust any single one.
- **Prompt injection is not solved.** Filters help, but a determined injection can still slip through. This is an open security problem, not a checkbox.
- **So the real safety comes from limiting what the agent *can do*** — capability and permission limits — not just from checking what it *says*. Constrain the blast radius, then add the output checks on top.

Off-the-shelf options exist (NeMo Guardrails, Guardrails AI, Llama Guard, provider moderation APIs), but most production teams combine one of those with their own deterministic business rules — the rules specific to your domain are always yours to write.
