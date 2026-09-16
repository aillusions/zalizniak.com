---
title: Design <System Name>
description: One-line statement of the system and its sharpest design challenge (used for SEO + cards).
---

<!--
QUESTION BREAKDOWN — one worked system design problem, run through the
Delivery Framework (/system-design/delivery-framework/). Study notes, NOT
teardown-style: clean prose + tables + at least one themed Mermaid diagram for
the high-level design. NO VERIFIED/SPECULATIVE tier labels.

This file is prefixed "_" so Astro doesn't publish it — copy it to <slug>.md.

Section order mirrors the framework so every breakdown is scannable the same way:
  Overview → Requirements → Core Entities → API → High-Level Design →
  Deep Dives → Takeaways
-->

<!-- OVERVIEW — NO "## Overview" heading. 2–3 sentences: what the system is and
     the single most interesting design challenge it forces. -->

## Requirements

**Functional** — the prioritized top ~3 "users should be able to…" features.

**Non-functional** — the top 3–5 quantified qualities (CAP stance, scale target, latency budget, durability, …).

## Core Entities

The handful of nouns the system persists and exchanges.

## API

The contract — REST by default. Plural resource nouns; current user from the auth token.

## High-Level Design

<!-- At least one themed Mermaid diagram (diagrams/system-design/<slug>.mmd →
rendered SVG in public/diagrams/system-design/), source collapsed in <details>
below it. Render with diagrams/mermaid-theme.json. Walk the reader through it,
ideally endpoint by endpoint. -->

## Deep Dives

<!-- The interesting bottlenecks and how the design meets each non-functional
requirement. One subsection per deep dive. Include metrics/monitoring. -->

## Takeaways

<!-- The transferable patterns this problem teaches — the bits that generalize
to other questions in the same category. Bullets. -->
