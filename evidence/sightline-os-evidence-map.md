# SightlineOS — evidence map

Crawled 2026-06-10 via claude-in-chrome (logged-out). First-party (sightlineos.com — homepage, About, the three product pages, the Din Tai Fung case study, the single blog post) prioritized; the PR Newswire stealth-launch release and the SynergySuite partnership note are third-party.
Tiers: VERIFIED (stated on a public page) · INFERRED (reasoned from a cited signal) · SPECULATIVE (best-practice fill-in).

**Engineering-signal caveat:** SightlineOS has **no engineering blog, no public job board/ATS, and a ~5-person team**. There is essentially zero first-party disclosure of languages, frameworks, cloud, or model architecture. The Stack table is therefore deliberately thin; the engineering internals live in **Likely internals** as labeled inference grounded in founder pedigree (Branch, Ekimetrics) + observable product behaviour. The TS/Next/Node/Postgres/Redis/AWS/Python list in the old WIP stub came from a recruiter posting that **does not name the company** — treated here as unconfirmed and *not* cited as fact.

## Source keys
- [home] https://www.sightlineos.com/
- [about] https://www.sightlineos.com/about-us
- [fcast] https://www.sightlineos.com/forecasting
- [inv] https://www.sightlineos.com/inventory-optimization
- [cogs] https://www.sightlineos.com/cogs-management
- [dtf] https://www.sightlineos.com/case-studies/din-tai-fung
- [story] https://www.sightlineos.com/blog/hx0v1d2gxgkv2awro1d3wf93ns91jm  (founder story, 5/6/26)
- [pr] https://www.prnewswire.com/news-releases/sightline-os-launches-out-of-stealth-…-302764001.html  (stealth launch, May 6 2026)
- [synergy] https://www.synergysuite.com/blog/synergysuite-sightline-os-announce-integrative-partnership/

---

## WHAT THEY DO

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| AI-native supply-chain planning & management platform for restaurant chains | VERIFIED | [story], [home] | "an AI-native supply chain planning and management platform for forecasting, inventory optimization, and COGS management" |
| Three product areas: ML forecasting, inventory optimization, COGS management | VERIFIED | [home] | "machine learning-powered forecasting, inventory optimization, and COGS management" |
| Launched out of stealth May 6 2026; private beta prior year | VERIFIED | [pr] | "launches out of stealth"; "platform was in private beta during prior year" |
| NYC-based | VERIFIED | [pr] | dateline / company location New York |
| Early-stage, small team | VERIFIED | [story], [about] | "We're early"; About lists 3 cofounders + 2 leads |

## FORECASTING (most-evidenced technical area)

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| ML engine captures daily ordering cadence, seasonality, holidays, recent volume shifts; robust to sparse & volatile data | VERIFIED | [fcast] | "captures daily ordering cadence, seasonality, holidays, and recent volume shifts while remaining robust to sparse and volatile data" |
| Forecasts incorporate ramp-up for new openings, LTOs, marketing campaigns from historical data | VERIFIED | [fcast], [home] | "Forecasts incorporate ramp-up periods for new restaurant openings, LTOs, and marketing campaigns with your historical data" |
| ML predicts the ramp-up for new restaurant openings (cold-start) | VERIFIED | [fcast] | "uses machine learning to predict the ramp-up for new restaurant openings — so your supply chain is ready before the doors open" |
| Continuously learns from the customer's owned historical data; gets smarter over time | VERIFIED | [fcast] | "continuously learns from your owned historical data, adapts to seasonality and trends, and produces stable, high-accuracy forecasts" |
| Forecasts at ingredient level across the restaurant network | VERIFIED | [fcast] | "predict ingredient demand across your restaurant network" |
| Positioned vs legacy "basic formula-based models" not true ML | VERIFIED | [fcast] | "legacy restaurant systems that use basic formula-based models rather than true machine learning" |

## INVENTORY OPTIMIZATION

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Sets optimum inventory levels at item × distributor level | VERIFIED | [inv] | "sets optimum inventory levels at the item x distributor level" |
| Identifies supply continuity risk up to 12 weeks ahead from open POs, supplier lead times, expected depletion | VERIFIED | [inv] | "identifies supply continuity risk up to 12 weeks in advance by looking at open POs, supplier lead times, and expected depletion" |
| Root-cause attribution: demand vs supplier-originated vs freight delay | VERIFIED | [inv] | "whether it's caused by higher demand, a supplier-originated issue, or a freight delay" |
| Keeps items above safety-stock levels | VERIFIED | [inv] | "works to keep items above safety stock levels" |
| Supplier & DC performance via scorecards + stack-ranking | VERIFIED | [inv] | "Supplier and DC performance is tracked through scorecards and stack-ranking reports" |
| Auto-flags excess / dead stock + expiration risk | VERIFIED | [inv] | "automatic flagging of inventory that is at risk of expiration"; "flags excess stock and dead stock" |

## COGS MANAGEMENT

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Real-time spend reporting; weekly & monthly variance flags | VERIFIED | [cogs] | "Real-time spend reporting … flags weekly and monthly variances" |
| Master contract pricing repository; invoice reconciliation for overspend | VERIFIED | [cogs] | "master contract pricing repository and automatically identify overspend with invoice reconciliation" |
| Real-time commodity tracker: invoice vs 700+ market commodities (corn, soy) | VERIFIED | [cogs] | "track invoice vs. 700+ market commodities … monitor key input prices like corn and soy" |
| Spend connected to inventory + forecasting (one data model) | VERIFIED | [cogs] | "connects your spend data directly to your inventory and forecasting" |

## INTEGRATIONS / DATA

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| SynergySuite bidirectional integration (sales/ops data in, supply-chain intelligence back) | VERIFIED | [pr], [synergy] | "feed their owned sales and supply chain data bidirectionally"; SynergySuite sales/ops data into Sightline, intelligence back |
| Ingests distributor data, invoices, open POs, supplier lead times | VERIFIED | [inv], [cogs] | open POs / lead times (inv); invoices (cogs) |
| Replaces retrospective tools + reliance on distributors' internal buying systems | VERIFIED | [dtf] | "previous platform offered a retrospective view"; "leaning on distributors' internal buying systems meant working with data that couldn't keep pace" |

## CUSTOMERS / TRACTION

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Customers: Din Tai Fung, Bonchon | VERIFIED | [home], [story] | testimonials + "first customers — including Din Tai Fung and Bonchon" |
| Din Tai Fung: +$27MM average AUV/location (highest US AUV) | VERIFIED | [dtf] | "+$27MM average AUV per location" |
| DTF: 14% lift in forecast accuracy | VERIFIED | [fcast], [dtf], [pr] | "14% lift in forecast accuracy" |
| DTF: 25% reduction in priority-SKU distributor out-of-stocks within 5 months; 13% across all proprietary SKUs; 99.7% fill rate | VERIFIED | [dtf] | "reduced distributor out-of-stocks on their most critical SKUs by 25% … 13% reduction across all proprietary SKUs … 99.7% fill rate" |
| Bonchon: <3-month rollout, hands-off implementation | VERIFIED | [home] | "roll out date of under 3 months to fully test and train"; "truly hands-off experience" |
| White-glove implementation team | VERIFIED | [inv], [home] | "white glove service from their implementation team" |

## FOUNDERS / TEAM

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Yusha Hu — CEO & Cofounder; ex supply chain at Chipotle, sweetgreen, HelloFresh | VERIFIED | [about], [story] | "led supply chain and procurement teams at Chipotle, sweetgreen, and HelloFresh" |
| Derrick Staten — CTO & Cofounder; ex engineer & head of product at Branch (clients Starbucks, Uber) | VERIFIED | [about] | "served as engineer and head of product at Branch … one of the world's most widely used mobile marketing platforms" |
| Louis Bensard — Head of Data/AI/ML & Cofounder; ex data science manager at Ekimetrics; ML for Fortune 500 in retail/finance/aviation | VERIFIED | [about] | "data science manager at Ekimetrics, where he led cross-functional teams … depth of applied ML experience directly to Sightline's forecasting engine" |
| Jake Anderson — Director of Sales (ex Olo, Cardlytics, Groupon) | VERIFIED | [about] | bio |
| Emily Schultz — Head of Marketing (ex Clover, BentoBox) | VERIFIED | [about] | bio |
| Models "get smarter the longer they run" — built by Louis | VERIFIED | [about] | "building models that get smarter the longer they run" |

## SPECULATIVE / INFERRED (labeled in teardown)

| Claim | Tier | Basis |
| --- | --- | --- |
| ~$2M seed, closed ~Feb 2026; Series A "imminent" | SPECULATIVE | sourced from a recruiter posting that does NOT name the company; no Crunchbase/press confirmation. Treat as unconfirmed. |
| Web app: TypeScript / React / Next.js front end, Node API | SPECULATIVE | founder pedigree (Branch = consumer-scale web/mobile eng); modern SaaS dashboard product; recruiter JD (unconfirmed) lists this |
| Cloud: AWS | SPECULATIVE | conventional for a NYC seed SaaS; recruiter JD hint (unconfirmed) |
| Datastores: Postgres (relational) + Redis (cache/queues) | SPECULATIVE | conventional; recruiter JD hint (unconfirmed) |
| ML stack: Python; gradient-boosted trees / hierarchical + global time-series models with intermittent-demand handling | INFERRED | "robust to sparse and volatile data" + item×distributor + new-opening ramp ([fcast][inv]); Ekimetrics pedigree = applied/econometric ML; framework unnamed |
| Cold-start via pooled/analog priors across comparable SKUs & openings | INFERRED | "predict the ramp-up for new restaurant openings … incorporate … with your historical data" ([fcast]) |
| Hierarchical reconciliation (item → category → location → network) | INFERRED | forecasts "across your restaurant network" at ingredient level ([fcast]) |
| Batch ETL + entity resolution (SKU / UOM normalization across distributors) | INFERRED | item×distributor levels, invoice reconciliation, distributor data integration ([inv][cogs][dtf]) |
| Commodity market-data feed (700+) via a third-party data provider | INFERRED | "700+ market commodities" ([cogs]); provider unnamed |
| Per-customer (single-tenant-ish) models trained on owned data | INFERRED | "continuously learns from your owned historical data" ([fcast]) |
