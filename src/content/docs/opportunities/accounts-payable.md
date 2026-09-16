---
title: Accounts payable / invoice-to-pay
description: An agent that extracts invoice data, matches to POs, routes approvals, and gates payment with a full audit trail.
sidebar:
  order: 27
---

AP runs invoice → PO match → approval → payment, often manually and with weak audit trails and fraud exposure.

**Vitals (seed — unverified):** market: broad, universal pain · `every company` · buyer: finance / AP teams · model: subscription or per-transaction · whitespace: ★☆☆

:::caution[Research status: queued]
Seed thesis only — not yet researched to evidence standard. Every claim below is a
SPECULATIVE starting hypothesis to be verified, sharpened, or killed during the deep dive.
:::

## Seed thesis

- **The mess:** Extraction from messy invoices; PO/receipt matching; approval routing; payment gating and fraud checks; audit trail.
- **Why now:** Document extraction + durable approval workflow + audit; reachable buyers, simple public rules.
- **The money:** Universal; fraud and error reduction is quantifiable.
- **Whitespace:** Crowded (Ramp, Bill.com, Tipalti); the durable + audit + agentic angle differentiates.

<!-- Deep dive expands this into the full template (see _template.md):
overview → the mess → why now → the money → how it works today →
where an agent fits → whitespace & incumbents → hard problems → sources.
Evidence map: evidence/opp-accounts-payable-evidence-map.md -->
