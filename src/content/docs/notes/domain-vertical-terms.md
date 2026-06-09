---
title: Domain & Vertical Terms
description: The business and domain vocabulary specific to the verticals the teardowns cover — starting with healthcare revenue-cycle management — so the engineering reads in context.
sidebar:
  order: 3
---

The applied-AI products in the teardowns live inside specific industries, and the engineering only makes sense against that domain's vocabulary. This page collects the business/domain terms by vertical. Definitions, a sentence or two each.

## Healthcare & revenue cycle (RCM)

Why agents matter here: healthcare operations run across a huge number of legacy third-party web portals that usually expose no API. The agent logs into someone else's system — a payer portal, an EHR — and clicks buttons, navigates menus, reads claim status, downloads documents, submits forms, and extracts data. Historically that was [RPA](/notes/ai-engineering-terms/); the bet (e.g. [Amperos](/teardowns/amperos-health/)) is that an LLM agent is more resilient, because it can reason "this page is asking for a member ID" and continue even when the layout changed, instead of "click button X at coordinates Y."

**RCM (revenue cycle management)** — the end-to-end financial process a provider runs to get paid for care: eligibility, coding, claim submission, status checks, denials, and collections. The domain these healthcare agents automate.

**Provider** — the entity delivering care (hospital, clinic, practice) and submitting claims to get paid. The customer of an RCM product.

**Payer** — the insurer or government program that reimburses the provider. Its websites are the "payer portals" staff log into all day.

**Payer portal** — an insurer's web portal where provider staff check claims, eligibility, and authorizations. Typically no API and layouts change often — the brittle third-party surface an agent operates on.

**Eligibility verification** — confirming a patient's insurance coverage and benefits before care, so the provider knows what's covered and what the patient will owe.

**Prior authorization (prior auth / PA)** — a payer's requirement that a treatment or drug be approved *before* it's delivered, or it won't be reimbursed. Submitted and tracked through payer systems, often a major bottleneck.

**Claim** — the itemized bill a provider submits to a payer for services rendered. The unit that flows through the whole revenue cycle.

**Claim status** — where a submitted claim stands in the payer's system: paid, pending, or denied. Checking it across portals is a constant manual task.

**Denial** — a payer's rejection of a claim. "Working denials" — finding out why and resubmitting — is one of the most labor-intensive RCM tasks, and a prime automation target.

**EHR / EMR (electronic health record / medical record)** — the system of record for a patient's clinical and billing data. Often reached through a web interface the agent has to navigate like a human.

**PBM (pharmacy benefit manager)** — the intermediary that administers prescription-drug benefits for payers, with its own portals for drug claims and authorizations.

**Clearinghouse** — an intermediary that validates, formats, and routes claims (via EDI) between providers and payers before they reach the insurer.
