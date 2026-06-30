---
title: Prompting Techniques
description: A practical, personal reference for getting reliable output from an LLM — the techniques worth reaching for, when to use each, and the production habits that keep prompts from rotting. Companion to the AI Engineering Terms glossary.
sidebar:
  order: 12
---

A working reference for *how* to prompt, not just what the terms mean (for definitions, see [AI Engineering Terms](/archive/ai-playbook/ai-engineering-terms/)). Each technique: what it does, when to reach for it, and the shape of it. Ordered roughly from foundation to production habit.

## Foundations

**Be specific and give the model a role.** A vague ask gets a vague answer. State the role, the audience, the format, and the constraints up front — "You are a senior tax accountant. Explain this to a CFO in three bullets, no jargon." The role (system prompt) sets persona and rules for the whole session; the user turn carries the specific task. Most "the model is dumb" problems are actually under-specified prompts.

**Show examples (few-shot) when format or judgment matters.** Instead of describing the output you want, paste two or three worked input→output pairs and let the model infer the pattern. The cheapest way to steer behavior before you reach for fine-tuning. Use it when the task has a consistent shape (classification, extraction, a house style) that's easier to demonstrate than to describe. Zero-shot (no examples) is fine for simple, common tasks — add examples only when zero-shot drifts.

**Put the facts in the prompt — don't trust memory.** A model answers from training data unless you give it the source. For anything current, private, or domain-specific, retrieve the relevant text and paste it in, then instruct "answer only from the context above; if it's not there, say so." This is the prompt-side of RAG and the main defense against confident hallucination.

## Getting better reasoning

**Ask for step-by-step reasoning (chain-of-thought).** For anything multi-step — math, logic, planning, debugging — "think through it step by step before answering" measurably improves correctness, because the model works through intermediate steps instead of blurting a guess. Note: dedicated **reasoning models** (o-series, R1-style) already do this internally, so you don't need to ask — and asking can even hurt. Use explicit CoT on standard models; skip it on reasoning models.

**Break a big task into chained prompts (decomposition).** Don't ask one mega-prompt to do five things. Split it: one prompt extracts, the next validates, the next drafts, the next critiques. Each step has a small, sharp context and is independently testable. This also dodges quality fall-off from a bloated context (see [context degradation](/archive/ai-playbook/context-degradation/)).

**Sample several times and take the consensus (self-consistency).** For a high-stakes call where the model wobbles, run the same prompt 3–5 times (or across different models) and vote / pick the majority answer. Trades cost for reliability. Pallet does a version of this with cross-model agreement on extracted fields.

**Have it critique and revise its own answer (reflection).** "Now review your answer for errors and fix them." Sometimes catches mistakes — but it's unreliable on its own; models often defend a wrong first answer rather than catch it. Treat it as a cheap improvement, not a safety net. Real safety comes from external evals and a human check.

## Structure & control

**Demand structured output.** When code consumes the result, force a fixed schema (JSON, a function signature) rather than free text — "return `{amount: number, currency: string, confidence: number}` and nothing else." This is the backbone of tool calling and extraction pipelines; it turns prose into something a program can rely on.

**Use clear delimiters and sections.** Separate instructions from data from examples with obvious markers (headers, triple-backticks, or XML-style tags). It stops the model from confusing your instructions with the content it's supposed to process, and makes long prompts legible to you later.

**Tell it what *not* to do, and give it an out.** Constrain explicitly — "don't guess; if the document doesn't state the figure, return null." An escape hatch ("say 'I don't know'") is far better than a confident fabrication, especially for anything that feeds a downstream action.

**Let it reason *and* act (ReAct / tool use).** For agentic tasks, structure the prompt so the model alternates reasoning and tool calls: think → call a tool → read the result → think again. This is the loop behind tool-using agents; the prompt's job is to make the available tools and the stopping condition clear.

## Production habits

**Treat prompts as versioned, tested code.** In production a prompt isn't hand-tweaked in a text box — it's a template with variables injected per call, kept in source control, and run against an eval set in CI so a change that regresses quality doesn't ship. This is what lets a team change a prompt confidently in minutes; see [testing non-deterministic output](/archive/ai-playbook/evaluating-non-deterministic-agents/).

**Build few-shot examples from real corrections.** The strongest examples aren't invented — they're the cases your system got wrong and a human fixed. Capture those corrections and feed the best ones back as few-shot examples (and as eval cases). The flywheel: real usage → corrections → better prompt.

**Keep a stable prefix for caching.** Put the long, unchanging part (system prompt, instructions, fixed context) at the front and the variable part at the end. Providers cache the unchanged prefix across calls, cutting cost and latency on repeated context — so prompt *layout* is also a cost lever.

**Match the technique to the model.** Capable frontier models need less hand-holding; small models need more examples and tighter structure. And as noted, reasoning models invert some advice (skip the "think step by step"). Re-test your prompts when you swap models — what helped one can hurt another.
