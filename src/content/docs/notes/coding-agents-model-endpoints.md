---
title: Coding Agents & Model Endpoints
description: How coding agents (Claude Code, Kimi Code, Cline, Cursor) bind to a model backend — Anthropic vs OpenAI wire formats — and how to run them against alternative or free endpoints like Kimi K2 on NVIDIA NIM.
sidebar:
  order: 5
---

A coding agent and the model it runs on are two separate things. The agent (Claude Code, Kimi Code, Cline, Continue, Cursor) is a client; it sends requests to a model endpoint over HTTP. Whether you can swap the backend comes down to **one question: does the agent's wire format match the endpoint's wire format?** Not "is it the same vendor."

## The two wire formats

There are two dominant request/response schemas, and they are not interchangeable on the wire:

- **Anthropic format** — `POST /v1/messages`, Anthropic's own request and response shape (content blocks, tool-use blocks, etc.). This is what **Claude Code** speaks.
- **OpenAI format** — `POST /v1/chat/completions`, the OpenAI schema that most of the ecosystem cloned. This is what **Cline, Continue, Cursor, and Kimi Code** speak, and what most hosted inference providers expose.

A client can only talk to an endpoint in the same format. To cross formats you need a **translation proxy** in between.

## Claude Code is not locked to Anthropic

A common misconception (one that confidently-wrong chatbots repeat): "Claude Code is hardcoded to Anthropic, no custom endpoint." False. Claude Code reads:

- `ANTHROPIC_BASE_URL` — point it at any host that speaks the Anthropic `/v1/messages` format
- `ANTHROPIC_AUTH_TOKEN` — the key for that host
- `ANTHROPIC_MODEL` — the model id to request

The real constraint is the **format**, not the vendor. Any endpoint that implements the Anthropic message API will work directly; anything else needs a proxy.

## Kimi K2, three ways

**1. Kimi native, with Claude Code — works directly.** Moonshot publishes an *Anthropic-compatible* endpoint at `https://api.moonshot.ai/anthropic` specifically so Claude Code can use Kimi. Set `ANTHROPIC_BASE_URL` to it, `ANTHROPIC_AUTH_TOKEN` to your Moonshot key, `ANTHROPIC_MODEL` to a Kimi model. No proxy needed.

**2. Kimi on NVIDIA NIM, with an OpenAI-format client — works directly.** NVIDIA's `build.nvidia.com` serves Kimi at `https://integrate.api.nvidia.com/v1` in OpenAI format. Point any OpenAI-compatible agent (Cline, Continue, Cursor, Kimi Code) at it with your `nvapi-…` key and model `moonshotai/kimi-k2.6`.

**3. Kimi on NVIDIA NIM, with Claude Code — works *only through a proxy*.** NVIDIA speaks OpenAI format; Claude Code speaks Anthropic format. So you can't bind them directly — but a translation proxy bridges it:

- **claude-code-router** — purpose-built to sit in front of Claude Code and route to OpenAI-format backends.
- **LiteLLM** — run it as a gateway; it exposes an Anthropic `/v1/messages` adapter that forwards to any OpenAI-format upstream.
- **y-router** — lightweight Anthropic↔OpenAI shim.

Point Claude Code's `ANTHROPIC_BASE_URL` at the proxy; the proxy holds the `nvapi-` key and talks OpenAI to NVIDIA. So the answer to "can Claude Code use Kimi on NVIDIA?" is **yes, via a proxy** — the opposite of what it first looks like.

## Which agent to actually run

You don't need a Kimi-branded agent to use Kimi. The question "what coding agent works with NVIDIA's free endpoint?" has a simple answer: **any agent that speaks OpenAI format and lets you set a custom base URL + key.** Point it at `https://integrate.api.nvidia.com/v1` with your `nvapi-` key and model `moonshotai/kimi-k2.6`. The mature, real options:

- **Aider** — git-native, edits via diffs and auto-commits; strong for multi-file refactors. Set `OPENAI_API_BASE` / `OPENAI_API_KEY`, run `aider --model openai/moonshotai/kimi-k2.6`.
- **OpenCode** (sst) — terminal TUI agent with plan/build modes and LSP; add NVIDIA as a custom provider in its config.
- **Goose** (Block) — agent with a large MCP-extension ecosystem; configure an OpenAI-compatible provider.
- **OpenAI Codex CLI** (`@openai/codex`) — sandboxed shell execution; takes a custom OpenAI-compatible provider.
- Editor-based: **Cline** and **Continue** (VS Code) do the same with a custom endpoint.

For **Claude Code** specifically, the path is the proxy from the previous section — it speaks Anthropic format, so it can't bind to NVIDIA's OpenAI endpoint without one.

Be skeptical of "Claude Code clone" tools that surface in a quick search: vet the repo before installing. A confident chatbot answer once invented a tool ("born from a source leak"), complete with a fake install command and fabricated star counts — a good reminder that this note exists to record *verified* paths, not search-result folklore.

## Why bother — and the free-tier catches

NVIDIA's hosted NIM is free (no card required), which is the whole appeal. The catches to check before relying on it:

- **Rate limits.** The free tier is throttled (reported around ~40 requests/min). Agentic workflows that fan out many calls hit this fast — a single multi-file edit or sub-agent burst can trip it.
- **Smaller context window.** The NVIDIA-hosted build exposes a reduced context vs Kimi's native maximum. Large-codebase, long-horizon sessions are where you'll feel it.
- **Version lag.** A hosted NIM can trail the model's native API.

For solo sessions and prototyping it's hard to beat free GPU inference on a strong coding model; for heavy agent orchestration, the native Moonshot endpoint (or a paid backend) holds up better.

## The general rule

Match the format, not the brand. Any agent + any model works if the formats line up directly, or if you put a translating proxy between them. "This vendor's tool can't use that vendor's model" is almost never the real limit.
