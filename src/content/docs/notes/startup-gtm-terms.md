---
title: Startup & GTM Terms
description: A tight glossary of the strategy, metrics, go-to-market, and funnel terms that show up across the teardowns — defined for engineers, one or two lines each.
sidebar:
  order: 1
---

A working glossary of the strategy, unit-economics, go-to-market, and funnel vocabulary that recurs across the teardowns. Built for engineers: each entry is a tight definition and, where it helps, a one-line example or test — not an essay.

## Strategy & positioning

**Wedge** — the one sharp capability you use to *enter* a market and earn a foothold before expanding. Narrow enough to actually win, expandable enough not to dead-end. *Stripe: developer-friendly payments. Figma: browser-based real-time collaboration.*

**Beachhead** — the first narrow segment you fully dominate before expanding outward. The wedge is the capability; the beachhead is the *market slice* it wins you.

**Moat** — a *durable* competitive advantage that makes you hard to copy or displace. Common types: network effects, switching costs, economies of scale, brand/trust, proprietary tech or data. *Test: if a funded competitor tried to copy you, what stops them? If the answer is "just time," it's not a moat yet.* The wedge gets you in; the moat keeps you in.

**Defensibility** — whether that advantage actually *holds* over time. A feature is a head start; defensibility is what stops it from being competed away.

**PMF (product-market fit)** — the product solves a real problem well enough that the market pulls it from you (usage, retention, word-of-mouth) rather than you pushing it.

**ICP (ideal customer profile)** — the precise customer type you're built for: industry, size, role, pain. Sharp ICP makes targeting, messaging, and CAC efficient; a fuzzy one leaks money.

**TAM / SAM / SOM** — market sizing, narrowing down: **Total** addressable (everyone who could use it) → **Serviceable** (those you can actually reach/serve) → **Obtainable** (the slice you can realistically win near-term).

## Unit economics & metrics

**CAC (Customer Acquisition Cost)** — what it costs to land one customer. Total sales + marketing spend ÷ new customers acquired in the period.

**LTV (Lifetime Value)** — total profit expected from a customer over the whole relationship. ≈ avg revenue per customer × gross margin × avg lifetime (or revenue ÷ churn rate).

**LTV:CAC ratio** — the headline health check. **<1:1** loses money per customer (dead); **~3:1** is healthy for SaaS; **>5:1** often means you're underspending on growth and could acquire harder. *Watch the trap: cheap early CAC from founder network/organic doesn't scale — the ratio at scale is the real story.*

**CAC payback** — months of revenue needed to recover CAC. Under ~12 months is good for SaaS; under 18 is acceptable.

**ARR / MRR** — annual / monthly recurring revenue: the predictable subscription run-rate (ARR ≈ MRR × 12). The default scoreboard for SaaS.

**Gross margin** — revenue left after the direct cost of delivering the service (hosting, inference, support). High margin is what makes LTV work — *and why per-request inference cost matters so much for AI products.*

**Churn** — the rate customers leave. **Logo churn** = accounts lost; **revenue churn** = dollars lost. Low churn is the foundation of high LTV.

**NRR / NDR (net revenue retention)** — revenue from your *existing* customers a year later, including expansion and net of churn. **>100%** means you'd grow even with zero new logos — the strongest single SaaS health signal.

**Burn rate / runway** — cash spent per month / months of cash left at that rate. Runway = cash ÷ burn; it sets the clock on the next milestone or raise.

**Magic number** — sales efficiency: net new ARR ÷ prior-period sales & marketing spend. **>~0.75** suggests spending more on growth pays off; well below means fix the funnel before pouring in money.

## Go-to-market motion

**GTM (Go-to-market)** — the plan for how you actually reach and sell to customers: who you target, how you find them, how you price, and how the sale happens (self-serve vs. sales-led).

**PLG vs. sales-led** — **product-led growth**: the product itself acquires/converts users (self-serve signup, free tier, bottom-up adoption). **Sales-led**: reps drive deals top-down. Many AI startups run a hybrid.

**Land and expand** — win a small initial footprint (one team, one use case), then grow seats and usage inside the account. Cheap to land, expansion does the heavy lifting.

**Expansion revenue / upsell** — additional revenue from existing customers (more seats, higher tier, usage). The engine behind NRR >100%.

**Design partner** — an early customer who co-develops the product with you in exchange for influence, access, and pricing. Source of real requirements before you have a market.

**North star metric** — the single number that best proxies the value customers get (e.g. *weekly active documents signed*). Aligns the team on outcomes, not vanity counts.

## Funnel & growth

**Conversion funnel** — the staged path visit → signup → activated → paid → retained. A **leaky funnel** brings traffic in but drops people before they convert; the fix starts with finding *which* stage leaks worst relative to benchmark.

**Top-of-funnel / bottom-of-funnel** — TOFU = awareness and traffic (lots of people, low intent); BOFU = the revenue end (fewer people, high intent). A TOFU/BOFU mismatch is heavy traffic that never reaches paid.

**Activation** — reaching the "aha" moment that makes the product click (e.g. *sent first signature request*). Signups that never activate are an activation problem, not an acquisition one.

**AARRR ("pirate metrics")** — the funnel as five measurable stages: **A**cquisition, **A**ctivation, **R**etention, **R**eferral, **R**evenue. A checklist for where to instrument and where to look for leaks.

**Cohort analysis** — group users by signup week/source and watch their behavior over time. Separates an *acquisition* problem (bad cohorts coming in) from a *retention* problem (good cohorts leaking out later).

**Retention curve** — the % of a cohort still active plotted over time. A curve that **flattens** above zero = genuine stickiness; one that decays to zero = no durable value yet.

## Funnel diagnostics

When traffic rises but users/paid users don't, the name of the problem depends on *where* it leaks — and the fix follows the location.

**Traffic-quality problem** — the wrong visitors arrive (bad targeting, misleading messaging) and convert near zero. High traffic, low conversion *by source* is the tell — a marketing problem, not a product one.

**Monetization / paywall friction** — people use the product but won't pay (the active→paid step leaks). A pricing, packaging, or value-capture problem rather than acquisition or activation.
