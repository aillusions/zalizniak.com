---
title: Popular System Design Topic
slug: archive/system-design/study-list
description: The system-design interview question patterns to cover — from online ticketing and social feeds to the advanced infra-flavored deep dives — each with a representative system and its core challenge.
sidebar:
  order: 1
---

The system-design questions worth practicing, grouped into patterns so no shape catches you cold. For the vocabulary that comes up along the way, see [Terminology](/archive/system-design/terminology/).

## Question patterns to cover

Like coding interviews, system design questions cluster into patterns. Practice at least one from each category so no shape catches you cold:

| Pattern | Representative system | Core challenge |
| --- | --- | --- |
| Online ticketing | Ticketmaster | Consistency & concurrency under high-demand sales |
| Streaming / content delivery | YouTube, Netflix | Real-time streaming, CDN, large blobs |
| Location-based | Uber, Yelp | Geo indexing, location tracking, proximity search |
| E-commerce | Amazon | Scalability + transaction management |
| Social network | Twitter, FB News Feed, Instagram | Data scale, real-time updates, fan-out |
| Messaging | WhatsApp, FB Live Comments | Real-time delivery, presence, notifications |
| Banking / financial | Robinhood, payment system | Security, privacy, transaction consistency |
| Collaborative editing | Google Docs | Concurrency & conflict resolution (CRDT/OT) |
| Cloud storage | Dropbox | Efficient, scalable file storage & sharing |
| Competition / leaderboards | LeetCode, top-K | Real-time interaction, ranking at scale |
| URL shortener / ID generation | Bitly, TinyURL, Snowflake | Read-heavy lookups, short-key generation, no collisions |
| Search / autocomplete | Typeahead, FB post search | Inverted index, prefix matching, ranking at scale |
| Analytics / stream aggregation | Ad-click aggregator, metrics monitoring | High-volume ingest, windowed aggregation, approximate top-K |
| Notifications | Push / email / SMS | Multi-channel fan-out, dedup, delivery guarantees |
| Foundational component | Rate limiter, message queue, distributed cache, web crawler, job scheduler | One building block, deeply |

### Advanced / infra deep dives

Beyond the common pool — infrastructure-flavored, often staff-level. Not what you'd be handed in a typical product-design round, but high-value if you work on platforms or interview for infra roles. Several lean on the same internals as the [Postgres Internals](/archive/system-design/postgres-internals/) page.

| Problem | Angle | What it drills |
| --- | --- | --- |
| Payments API layer | Stripe | Idempotency keys, exactly-once charges, API versioning, webhook delivery |
| Durable execution engine | Temporal, from scratch | Persisting workflow state, deterministic replay, timers, retries at scale |
| Multi-tenant search service | Per-tenant SaaS search | Tenant isolation + relevance with no per-customer code |
| Managed database service (DBaaS) | RDS / Aurora | Fleet provisioning, multi-tenant ops, control plane vs. data plane |
| HA & automated failover | Replica promotion | Leader election, split-brain avoidance, RTO/RPO targets |
| Zero-downtime upgrades | Rolling version changes | Connection draining, backward-compatible schemas, online migrations |
| Backup & restore with PITR | Continuous WAL archiving | Point-in-time recovery, restore SLAs, [WAL](/archive/system-design/postgres-internals/#wal-write-ahead-log)-based replay |
| Control plane / data plane isolation | Any managed service | Keeping management-layer failures off the serving path |

