---
title: Durable-agent / AI-action-audit infra
description: "Infrastructure other applied-AI teams build on: durable execution, action audit trails, and human-in-the-loop gates for agents that act."
sidebar:
  order: 25
---

Applied-AI teams shipping agents that act (not just chat) lack a durable, auditable layer — survive-crashes execution, an action audit trail, and approval gates. Most rebuild it badly.

**Vitals (seed — unverified):** market: every applied-AI team building actors · `horizontal` · buyer: AI product teams · model: usage / platform · whitespace: ★★☆

:::caution[Research status: queued]
Seed thesis only — not yet researched to evidence standard. Every claim below is a
SPECULATIVE starting hypothesis to be verified, sharpened, or killed during the deep dive.
:::

## Seed thesis

- **The mess:** Long-running flows that must survive crashes/retries; proving what an agent did with what evidence; human approval gates; replay/audit.
- **Why now:** Durable execution is becoming table stakes for multi-day agent workflows, and most teams haven't built it.
- **The money:** Sells to a fast-growing base of AI teams; platform economics.
- **Whitespace:** Horizontal — most defensible engineering, worst GTM; fights the niche thesis. Treat as fallback or a wedge a vertical pulls out.

<!-- Deep dive expands this into the full template (see _template.md):
overview → the mess → why now → the money → how it works today →
where an agent fits → whitespace & incumbents → hard problems → sources.
Evidence map: evidence/opp-durable-agent-infrastructure-evidence-map.md -->
