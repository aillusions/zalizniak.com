---
title: Core Concepts
description: A compressed pass over the technology-agnostic building blocks behind every system design problem — networking, API design, data modeling, indexing, caching, sharding, consistent hashing, and the CAP/PACELC tradeoff — plus the rough numbers that drive scaling decisions.
sidebar:
  order: 1.5
---

The technology-agnostic building blocks that show up in nearly every design problem — the vocabulary interviewers assume you have before you start scaling Instagram or designing Uber. This page is the quick what/why/when for each; the hard mechanics live in the dedicated pages linked throughout.

## Networking

Default to **HTTP over TCP** — it covers ~90% of cases and is the assumed choice unless you have a reason to deviate.

- **SSE vs WebSockets** — SSE is unidirectional (server pushes over a client-opened HTTP connection: live scores, notifications); WebSockets are bidirectional (chat, collaboration). SSE is simpler and rides standard HTTP infra; reach for WebSockets only when the client must push frequently. Both are **stateful** — they don't sit behind a plain L7 balancer, and you must plan for connection persistence and server failure with thousands of live connections.
- **gRPC** — binary + HTTP/2, much faster than JSON/HTTP; use it for internal service-to-service calls. Not for public APIs (browsers need gRPC-Web + a proxy). Common pattern: REST externally, gRPC internally.
- **L7 vs L4 load balancing** — L7 routes on HTTP content (send API vs page requests to different services); L4 distributes TCP connections, faster but content-blind. WebSockets typically need L4 (persistent TCP).
- **Geography & latency** — NY↔London is ~80ms minimum just from light through fiber, before any processing. Global low latency forces regional deployments and geo-replication; this is why CDNs serve static content from the edge.

A common mistake: proposing WebSockets when long-polling or SSE would do. They're "real-time" but add real stateful-connection complexity — only when you genuinely need bidirectional push.

## API design

Sketch 4–5 endpoints and move on — most interviewers want reasonable APIs, not perfect ones. Spending 10 minutes here is going too deep.

- **REST by default** — resources to URLs, HTTP verbs to actions (`GET /users/{id}`, `POST /events/{id}/bookings`).
- **Pagination** — [cursor- vs offset-based](/system-design/terminology/#data--storage): cursor for real-time data where items get inserted frequently, offset for most cases.
- **Auth** — JWT for user sessions, API keys for service-to-service.
- **Rate limiting** — mention it if abuse/bots are plausible; don't go deep unless asked.

## Data modeling

The schema choices have massive downstream effects on performance and scalability.

- **Relational vs NoSQL** — relational ([Postgres](/system-design/postgres-internals/)) for structured data with clear relationships, complex queries (SQL joins), transactions, and constraints. NoSQL (DynamoDB, MongoDB) for flexible schemas or horizontal scale without joins.
- **Normalize vs [denormalize](/system-design/terminology/#data--storage)** — normalized splits data across tables (consistent, but reads need joins that get expensive at scale); denormalized duplicates data to kill joins (fast reads, but every copy must be updated). **Default: start normalized, denormalize specific hot paths** once you've identified a read problem — don't denormalize upfront.
- **NoSQL is access-pattern-first** — you design the partition/sort key around your queries. `user_id` as partition key makes "posts for user X" a fast single-partition lookup but makes "posts with hashtag Y" a full scan. You must know the queries up front.

## Indexing

Without an index, finding a user by email scans every row; with one, it's a millisecond jump. See [Postgres Internals](/system-design/postgres-internals/) for the mechanics.

- **B-tree** — the default; supports exact lookups *and* range queries. **Hash** is faster for exact matches only (no ranges). Specialized: **full-text** for search, **geospatial** for location.
- **Index what you query frequently** — email for auth lookups, `user_id` on the orders table. **Compound index** for multi-column filters ("events in SF on Dec 25" → index on `(city, date)`).
- **External indexes** — Elasticsearch for full-text, PostGIS for geo in Postgres. They sync from the primary via [CDC](/system-design/terminology/#data--storage), so reads lag slightly — stale by a small amount, almost always fine for search.

## Caching

Comes up the moment your database is read-bound. Store hot data in fast memory (Redis) and skip the DB for most reads — also offloading the DB so it can take more writes. ([Caching vocabulary](/system-design/terminology/#caching).)

- **Cache-aside + Redis** is the 90% pattern: check cache → on miss, query DB, populate with a TTL, return.
- **Invalidation is the hard part** — on write, delete/update the cached copy or you serve stale data. Tools: invalidate-on-write, short TTLs, or both.
- **Stampede** — when a hot key expires, concurrent misses pile onto the DB. Defend with request coalescing/locks, early recomputation, or jittered TTLs. A full **Redis outage** is distinct: defend with a small in-process fallback, circuit breakers, or graceful degradation.
- **Don't cache everything** — only frequently-read, rarely-changed data; caching per-request-changing data just adds latency. Profile first.

CDN caching (static assets at the edge) and in-process caching (small rarely-changed values like config/flags) are different tools; external Redis is the default for core app data.

## Replication

Keep copies of data on multiple nodes — for **read scaling** (fan reads across replicas) and **durability/HA** (survive a node loss). The first lever to pull before sharding. ([Replication entry](/system-design/terminology/#data--storage).)

- **Leader-follower** is the common shape: the **leader** takes writes, **followers** serve reads and stand by to take over. Scales reads, not writes (every write still hits the leader).
- **Sync vs async** — sync replication waits for follower acks (no data loss on failover, higher write latency); async acks immediately (fast, but a leader crash can lose the last writes). Async is the default.
- **Replication lag** — followers trail the leader, so reads can be stale. This is the source of the read-your-writes problem: a user updates, then reads a lagging replica and sees the old value. Fix by reading your own writes from the leader, or pinning the session briefly.
- **Failover** — on leader loss, a follower is promoted (manual or via leader election). Watch for **split-brain** (two leaders) and data loss of unreplicated writes.

Replication scales **reads** and gives HA; **sharding** scales **writes** and storage. **The decision rule:** sharding solves *"too much data / too many writes for one node"*; replication solves *"too many reads"* and *"I need failover."* They compose — production systems usually shard *and* replicate each shard.

## Sharding

Split data across independent servers once a single DB is outgrown — storage (TB+), write throughput (tens of thousands of writes/s), or read load replicas can't absorb. ([Sharding/partitioning](/system-design/terminology/#data--storage).)

- **Shard key decides everything** — `user_id` keeps a user's data on one shard (fast user-scoped queries) but makes global queries ("trending across all users") hit every shard and aggregate. State the key and the tradeoff.
- **Strategies** — **hash-based** (hash key, modulo to a shard) distributes evenly, avoids hot spots, most common; **range-based** works when access naturally partitions (multi-tenant) but risks hot ranges; **directory-based** (lookup table) is flexible but adds a dependency and latency — rarely worth it.
- **Mapping keys to shards — two standard approaches.** **Fixed slots/buckets**: hash the key into a large fixed set of slots (Redis Cluster uses 16384), then assign slot ranges to nodes — moving a node reassigns *slots*, not a rehash of every key, and the slot→node map is small enough to gossip. **Consistent hashing / hash ring** (Cassandra, DynamoDB): place nodes and keys on a ring so adding/removing a node only shifts one arc (see below). Both are standard and solve the same resize problem; the slot layer just adds an indirection that decouples key count from node count. Redis chose fixed slots; Dynamo-lineage stores chose the ring.
- **Don't shard too early** — a tuned single DB with read replicas goes far. Do the capacity math first; 10K writes/s and 100GB doesn't need it.
- **New problems** — cross-shard transactions are near-impossible (design boundaries to avoid them, else sagas/distributed transactions); **hot spots** (one shard hammered); **resharding** is painful data movement.

## Consistent hashing

Fixes the resize problem in distributed caches and sharded stores. Arrange servers and keys on a **virtual ring**: a key belongs to the next server clockwise, so adding/removing a server only moves the keys in that one arc. Used by Redis Cluster, Memcached, Cassandra, DynamoDB, some CDNs and load balancers. In interviews it's usually enough to *name* it — bring it up when discussing elastic scaling. See [Distributed Systems](/system-design/distributed-systems/).

**Internally:** wrap the hash space (`0 … 2^m−1`) into a circle and place both nodes and keys with the same hash — `pos = hash(x) mod 2^m`. A key is owned by the **first node clockwise** (smallest `pos(node) ≥ pos(key)`, wrapping), found by binary search in `O(log N)`. Add/remove a node and only its one arc moves. **Virtual nodes** — each node hashed to ~100–200 ring points — even out lopsided arcs and spread a departing node's load across many neighbors.

## CAP & PACELC

Under a network partition you get **two of three**: Consistency, Availability, Partition tolerance. Partitions are unavoidable, so the real choice is **C or A**. ([CAP entry](/system-design/terminology/#data--storage).)

- **Choose consistency** → some nodes refuse requests during a partition rather than serve stale data (correct but may be down).
- **Choose availability** → every node keeps serving, nodes may diverge until the partition heals.
- **Default: availability + eventual consistency** — feeds, recommendations, analytics tolerate slightly stale data but not downtime.
- **Strong consistency** when stale data costs money: inventory (overselling), banking (balances), booking (double-booked seats). You can mix per subsystem — eventually-consistent reviews, strongly-consistent inventory.
- **PACELC** extends it: during a **P**artition choose **A**/**C**; **E**lse (healthy network) choose **L**atency/**C**onsistency. Even healthy, strong consistency costs latency because nodes coordinate before responding.

## Numbers to know

You don't do back-of-envelope math up front — you do it when a decision needs it ("shard or not?", "one Redis enough?"). Modern hardware is bigger than most assume; 2010-era numbers make you shard and cache far too early.

**Latency ladder** (the gaps that drive decisions): memory access ≈ nanoseconds · SSD reads ≈ microseconds · intra-datacenter network ≈ 1–10 ms · cross-continent ≈ tens–hundreds of ms.

**Availability nines** (downtime budget per year): 99% ≈ 3.65 days · 99.9% ("three nines") ≈ 8.76 h · 99.99% ("four nines") ≈ ~52 min · 99.999% ("five nines") ≈ ~5 min. Each nine is 10× less downtime — and roughly an order more cost/complexity, so name the target before designing for it.

| Component | Rough capacity | Scale triggers |
| --- | --- | --- |
| **Cache (Redis)** | ~1 ms latency · 100K+ ops/s · memory-bound (up to ~1TB) | hit rate < 80% · latency > 1ms · memory > 80% · thrashing |
| **Database** | up to ~50K txns/s · sub-5ms cached reads · 64 TiB+ storage | writes > 10K TPS · uncached read latency > 5ms · geo-distribution needs |
| **App server** | 100K+ concurrent connections · 8–64 cores · 64–512GB RAM (up to 2TB) | CPU > 70% · latency > SLA · connections near 100K/instance · memory > 80% |
| **Message queue** | up to ~1M msgs/s per broker · sub-5ms end-to-end · up to ~50TB | throughput near 800K msgs/s · ~200K partitions/cluster · growing consumer lag |

A single Postgres instance handles a few TB comfortably — don't shard until tens of TB. Proposing sharding at 500GB adds complexity for nothing.
