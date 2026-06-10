---
title: About the Opportunities
description: A research map of industries and operational workflows where an AI agent could own high-value, painful work that today runs on paper, phone, and tribal knowledge — each candidate scored on profit, pain, and whitespace, then researched to evidence standard.
sidebar:
  order: 0
---

The [teardowns](/teardowns/about/) reconstruct how applied-AI companies *did* build their products. **Opportunities** looks the other way: where could an AI agent fix high-value operational pain that **nobody has built for yet**? The unit of value is an **evidenced opportunity thesis** — is the pain real, how much money moves through it, how crowded is the space, and what would an agent actually have to do.

The pattern worth hunting is consistent: high-dollar, deadline- or regulation-driven workflows that still run on paper, fax, portals, and tribal knowledge — arcane and unglamorous enough that no AI-native company has shown up. The arcaneness is not a bug; **it is the moat**. These pages are written abstractly — about *an AI agent operating over documents and multi-party workflows*, not any one product — so the analysis stands on its own.

## How a candidate is judged

Three axes, scored before any build is imagined:

| Axis | The question |
| --- | --- |
| **Profit** | How much money moves through the workflow? Deal size × volume, and is there a model that bills from money found/saved (contingency) rather than a budget line? |
| **Pain** | How acute and urgent is it — does it have a hard deadline, a penalty, or a recurring fire-drill? |
| **Whitespace** | How uncrowded? ★★★ = near-empty; ★☆☆ = entrenched incumbents already here. |

## Evidence discipline

Same bar as the teardowns — these pages make *new external claims* (market size, how a workflow is done today, who the incumbents are), so each claim carries a tier:

- **VERIFIED** — stated/shown on a cited public page.
- **INFERRED** — reasoned from a cited public signal; confidence flagged.
- **SPECULATIVE** — best-practice assumption, explicitly labeled and hedged.

Supporting quotes for each cited claim go in a per-opportunity evidence map (`evidence/opp-<slug>-evidence-map.md`), tracked in the repo so citations stay verifiable as pages change.

## The map

Each row is a candidate workflow and the page that works it through. **Lens** marks how far it sits from a generic document/e-signature platform: *Adjacent* (reuses the same primitives) or *Drastic* (a true vertical bet, different domain and data).

Profit / Pain / Whitespace below are **seed estimates** to be confirmed in each deep dive.

| Opportunity | The mess in one line | Profit | Pain | Whitespace | Lens |
| --- | --- | --- | --- | --- | --- |
| [Probate & estate settlement](/opportunities/probate-estate-settlement/) | Every death triggers a months-long, multi-party paper ordeal across courts, banks, and the IRS | Very High | Acute | ★★ | Drastic |
| [Commercial property-tax appeals](/opportunities/property-tax-appeals/) | Over-assessed properties overpay tax because appeals are deadline + comps drudgery | High | High | ★★★ | Drastic |
| [Unclaimed property / escheatment](/opportunities/unclaimed-property-escheatment/) | Every company is legally exposed to state escheatment but most don't know it | Med–High | Latent→urgent | ★★★ | Drastic |
| [Energy interconnection & permitting](/opportunities/energy-interconnection/) | Renewable projects stall for years in interconnection queues and AHJ permitting | High | High | ★★★ | Drastic |
| [UCC lien perfection & monitoring](/opportunities/ucc-lien-perfection/) | Lenders lose collateral priority on botched, deadline-driven filings | Med–High | High | ★★★ | Drastic |
| [Government grants & permitting](/opportunities/government-grants-permitting/) | Paper-era approval chains with no status visibility and strict accessibility rules | Med–High | Med | ★★★ | Adjacent |
| [Insurance subrogation recovery](/opportunities/insurance-subrogation/) | Carriers leave billions unrecovered because adjusters can't chase every file | High | High | ★★☆ | Drastic |
| [Government RFP discovery & bid response](/opportunities/government-rfp-response/) | SMBs skip trillions in public contracts because responding is a compliance nightmare | Very High | High | ★★☆ | Drastic |
| [Title search & curative](/opportunities/title-search-curative/) | Every property sale needs manual record abstraction and judgment-heavy curative work | Very High | High | ★★☆ | Drastic |
| [Tax resolution / IRS-notice response](/opportunities/tax-resolution/) | Tens of millions of notices a year; taxpayers panic and overpay | Med–High | Acute | ★★☆ | Drastic |
| [Customs brokerage & trade compliance](/opportunities/customs-trade-compliance/) | Every cross-border shipment needs arcane HS classification and entry filing | High | High | ★★☆ | Drastic |
| [Workers-comp & disability claims](/opportunities/workers-comp-claims/) | Multi-month, multi-party claims bleed admin cost and leakage | High | High | ★★☆ | Drastic |
| [Pharma regulatory submission (eCTD)](/opportunities/pharma-regulatory-submission/) | Each submission gates billions in drug revenue and is assembled by hand | Very High | High | ★★☆ | Drastic |
| [M&A due-diligence deal rooms](/opportunities/ma-due-diligence/) | Associates hand-read thousands of contracts under deadline | High | High | ★★☆ | Adjacent |
| [Mortgage / loan-doc closing](/opportunities/mortgage-closing/) | A multi-day, multi-party document-and-signature marathon | High | High | ★★☆ | Adjacent |
| [Commercial lease execution](/opportunities/commercial-lease-execution/) | Redline ping-pong plus manual signature chasing across many parties | Med–High | Med | ★★☆ | Adjacent |
| [Construction change-orders & lien waivers](/opportunities/construction-change-orders/) | Approvals run on paper and email; disputes over what was approved | Med–High | Med–High | ★★☆ | Adjacent |
| [Procurement intake & approval routing](/opportunities/procurement-intake/) | Vendor contracts get signed, then forgotten | Med–High | Med | ★★☆ | Adjacent |
| [Insurance brokerage / policy binding](/opportunities/insurance-brokerage/) | Brokers re-key the same data across carrier portals | High | Med–High | ★★☆ | Adjacent |
| [Healthcare prior-authorization & intake](/opportunities/healthcare-prior-auth/) | Auth packets bounce between provider and payer for weeks | Very High | High | ★★☆ | Adjacent |
| [Immigration / visa case assembly](/opportunities/immigration-case-assembly/) | 200-page petitions assembled and checked by hand | Med–High | Med–High | ★★☆ | Adjacent |
| [Clinical-trial consent & regulatory docs](/opportunities/clinical-trial-consent/) | Consent versioning across sites, audit-critical | Med–High | High | ★★☆ | Adjacent |
| [Estate planning / wills & trusts](/opportunities/estate-planning/) | Manual drafting plus witnessing and notary logistics, per-state rules | Med | Med | ★★☆ | Adjacent |
| [Vertical back-office ops agent](/opportunities/vertical-back-office-ops/) | Humans copy-paste all day between legacy portals | High | High | ★★☆ | Drastic |
| [Durable-agent / AI-action-audit infra](/opportunities/durable-agent-infrastructure/) | Applied-AI teams lack a durable, auditable layer for agent actions | High | Med | ★★☆ | Adjacent |
| [Contract lifecycle management](/opportunities/contract-lifecycle-management/) | Signed contracts are unread promises; renewals and obligations slip | High | Med–High | ★☆☆ | Adjacent |
| [Accounts payable / invoice-to-pay](/opportunities/accounts-payable/) | Invoice → PO match → approve → pay, with no audit trail | High | Med–High | ★☆☆ | Adjacent |
| [HR / employee-lifecycle paperwork](/opportunities/hr-employee-lifecycle/) | Onboarding/offboarding paperwork chaos across HRIS, payroll, IT | Med | Med | ★☆☆ | Adjacent |
| [Compliance attestation & audit](/opportunities/compliance-attestation/) | Annual sign-off fire-drills with evidence scattered across teams | Med | High | ★☆☆ | Adjacent |
| [Remote online notarization](/opportunities/remote-online-notarization/) | High-stakes documents need identity-verified, witnessed signing | Med | Med | ★☆☆ | Adjacent |

## Research roadmap

Each entry below is a **seed thesis** — a starting hypothesis, not yet researched to evidence standard. Deep dives run roughly in priority order; a candidate can be promoted, demoted, or killed once the evidence is in.

**Wave 1 — blue ocean + provable ROI** (highest whitespace, and a model that bills from money found/saved):
probate-estate-settlement · property-tax-appeals · insurance-subrogation · unclaimed-property-escheatment · energy-interconnection · ucc-lien-perfection

**Wave 2 — big TAM, reachable buyers:**
government-rfp-response · title-search-curative · tax-resolution · customs-trade-compliance · workers-comp-claims · government-grants-permitting

**Wave 3 — adjacent, instructive** (crowded but close to the core primitives; useful for contrast):
contract-lifecycle-management · accounts-payable · procurement-intake · commercial-lease-execution · ma-due-diligence · mortgage-closing · construction-change-orders · hr-employee-lifecycle · compliance-attestation · remote-online-notarization · durable-agent-infrastructure

**Wave 4 — gated, high-moat** (research when domain access appears):
healthcare-prior-auth · insurance-brokerage · clinical-trial-consent · pharma-regulatory-submission · immigration-case-assembly · estate-planning · vertical-back-office-ops