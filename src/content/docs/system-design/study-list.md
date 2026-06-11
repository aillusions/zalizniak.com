---
title: Study List
description: A working study list of system design interview vocabulary — the design framework terms, the API/traffic edge, feed and timeline patterns, data and storage, caching, async messaging, distributed transactions, scaling/reliability, and storage internals — defined tight, one or two lines each.
sidebar:
  order: 2
---

A running study list of the vocabulary that comes up while practicing system design — terms collected as I hit them, defined for quick recall. Tight definitions, one or two lines each. Some entries (the API-edge cluster) are AWS-flavored because that's where they first showed up; the concepts generalize.

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

Beyond the common pool — infrastructure-flavored, often staff-level. Not what you'd be handed in a typical product-design round, but high-value if you work on platforms or interview for infra roles. Several lean on the same internals as the [Postgres Internals](/system-design/postgres-internals/) page.

| Problem | Angle | What it drills |
| --- | --- | --- |
| Payments API layer | Stripe | Idempotency keys, exactly-once charges, API versioning, webhook delivery |
| Durable execution engine | Temporal, from scratch | Persisting workflow state, deterministic replay, timers, retries at scale |
| Multi-tenant search service | Per-tenant SaaS search | Tenant isolation + relevance with no per-customer code |
| Managed database service (DBaaS) | RDS / Aurora | Fleet provisioning, multi-tenant ops, control plane vs. data plane |
| HA & automated failover | Replica promotion | Leader election, split-brain avoidance, RTO/RPO targets |
| Zero-downtime upgrades | Rolling version changes | Connection draining, backward-compatible schemas, online migrations |
| Backup & restore with PITR | Continuous WAL archiving | Point-in-time recovery, restore SLAs, [WAL](/system-design/postgres-internals/#wal-write-ahead-log)-based replay |
| Control plane / data plane isolation | Any managed service | Keeping management-layer failures off the serving path |

## Design vocabulary

**HLD (High-Level Design)** — the boxes and their data ownership; the structural skeleton you draw first.

**Deep Dive** — the algorithms inside a box and the hard scaling mechanics (e.g. the fan-out strategy), worked after the HLD stands.

**NFR (Non-Functional Requirement)** — qualities, not features: availability, scale (100M DAU), latency (<200 ms), durability, security.

**Availability over consistency** — the design preference to serve possibly-stale data rather than fail a request; argues for cached, precomputed reads.

**Modular monolith** — one deployable with clean internal module boundaries; the sane pre-microservices starting point, and usually the right interview default.

**Control plane** — the part of a system that decides *what should happen* and manages state: provisioning, scheduling, config, orchestration. The brain — it shouldn't sit on the request hot path. (Kubernetes' [control plane](/system-design/kubernetes/#architecture) is the canonical example.)

**Data plane** — the part that actually carries the workload: serves user requests, moves the bytes, runs the queries. The hot path.

**Management plane** — the operator-facing surface for administration, observability, and policy (consoles, admin APIs, billing, RBAC). Often folded into the control plane; called out separately when the human-/admin-facing layer is distinct from internal orchestration.

**Control/data plane isolation** — keep the control plane's failures *off* the serving path, so the data plane keeps serving even when provisioning/management is down. A recurring cloud-architecture principle — and a [DBaaS design drill](#advanced--infra-deep-dives).

## API & traffic edge

**API Gateway** — application-layer API front door; routes per-path to different services *and* manages cross-cutting concerns (auth, throttling, keys, metering, versioning).

**ALB (Application Load Balancer)** — L7 load balancer; path/host rules forward to target groups. Routes and distributes load, nothing more.

**NLB (Network Load Balancer)** — L4 load balancer; required by API Gateway REST API's VPC Link.

**ELB** — umbrella term for AWS load balancers (ALB/NLB are types).

**Target group** — the set of backend instances/tasks an ALB routes a matched rule to.

**HTTP API** — cheaper/faster AWS API Gateway tier (~$1/M requests); a VPC Link can target ALB/NLB/Cloud Map.

**REST API (AWS tier)** — pricier AWS API Gateway tier (~$3.50/M); richer API-key features; its VPC Link forces an NLB.

**REST (API style)** — resource-oriented HTTP convention (`POST /v1/tweets`); *different* from the AWS "REST API" product tier above.

**VPC Link** — private connection letting API Gateway reach services inside your VPC.

**Cloud Map** — AWS service discovery; an HTTP API VPC Link target (lets you skip a load balancer).

**Lambda authorizer** — function that validates a request (e.g. your `sk_` key) and returns allow/deny + context.

**Authorizer caching** — the gateway caches the authorizer result keyed on the token for a TTL; hot keys fire the Lambda once per TTL, not per request.

**Usage plan / quota / throttle** — gateway-native per-key rate limits and monthly caps, tied to billing tiers.

**BFF (Backend-for-Frontend)** — an endpoint composed and shaped for one specific client's use case, rather than for a storage resource.

## Feed & timeline patterns

**Fan-out-on-read** — compute the feed fresh per request by pulling the followees and merging their recent posts. Simple, but doesn't scale on read-heavy loads.

**Fan-out-on-write** — precompute each follower's timeline when a post is created; reads become one cheap lookup. Scales for read-heavy loads at the cost of write amplification.

**Celebrity / hot-key problem** — accounts with millions of followers make fan-out-on-write explode; solved with a hybrid: push for normal users, pull for celebrities and merge at read time.

**Timeline cache** — the per-user precomputed feed store (typically Redis) that fan-out-on-write writes into.

## Data & storage

**Sharding / partitioning** — splitting one logical dataset across many nodes by a partition key, so no single machine holds (or serves) all of it. The key choice decides hot spots.

**Consistent hashing** — a hashing scheme that maps keys onto a ring so adding/removing a node only remaps a small slice of keys, not the whole keyspace. Standard for distributing cache/DB partitions.

**Replication** — keeping copies of data on multiple nodes for durability and read scaling. Leader-follower (primary handles writes) is the common shape.

**CAP theorem** — under a network partition you must choose Consistency *or* Availability; partition tolerance isn't optional in a distributed system. The framing for "CP vs AP" design stances.

**Eventual consistency** — replicas converge to the same value *given time*; reads may be stale in the meantime. The usual trade for high availability.

**Read-your-writes** — a consistency guarantee that a client always sees its own most recent write, even if others see it later.

**Clock drift** — physical clocks on different machines tick at slightly different rates and steadily diverge; NTP only *bounds* the error, so you can't trust wall-clock timestamps to order events across machines.

**Clock skew** — the instantaneous offset between two machines' clocks at a given moment. It's why "which write happened first?" has no free answer across nodes — distributed systems construct order with [logical clocks](/system-design/distributed-systems/#time--ordering) instead of reading it off a clock.

**Quorum (R + W > N)** — requiring a majority of replicas to ack a read/write so reads and writes overlap on at least one current node; the knob behind Dynamo-style tunable consistency.

**Denormalization** — duplicating data across rows/tables/stores to make reads cheap, accepting write-time duplication and consistency work. The storage analog of fan-out-on-write.

**CDC (Change Data Capture)** — streaming a database's row-level changes (often off the WAL) to other systems — search indexes, caches, analytics — so they stay in sync without dual writes.

**WAL (Write-Ahead Log)** — the append-only log a database writes *before* applying changes; the basis of durability, crash recovery, and replication.

**Presigned URL** — a time-limited, signed URL that lets a client upload/download a blob (e.g. to S3) directly, keeping large files off your servers.

**Blob / object storage** — store for large unstructured files (images, video) — S3/GCS — fronted by a CDN, referenced from the DB by key rather than stored inline.

## Caching

**Cache-aside (lazy)** — the app checks the cache, and on a miss reads the DB and populates the cache. The default pattern; stale entries handled by TTL.

**Write-through / write-back** — write-through updates cache and DB together (consistent, slower writes); write-back updates the cache and flushes to the DB later (fast, risk of loss).

**TTL (time-to-live)** — expiry on a cache entry; the main lever trading staleness against hit rate.

**Cache stampede / thundering herd** — many requests miss simultaneously (e.g. a hot key expires) and all hit the DB at once; mitigated with request coalescing, jittered TTLs, or locks.

**Eviction policy (LRU/LFU)** — how a full cache decides what to drop — least-recently-used is the common default.

## Async & messaging

**Message queue** — durable buffer that decouples producers from consumers and absorbs bursts; lets work be processed asynchronously and retried (SQS, RabbitMQ).

**Pub/sub** — one published message delivered to many independent subscribers; decouples a producer from an unknown set of consumers (SNS, Kafka topics).

**Kafka** — a partitioned, replicated, durable log; high-throughput streaming and event backbone, with consumers tracking their own offsets.

**Dead-letter queue (DLQ)** — where messages land after repeated processing failures, so a poison message doesn't block the queue and can be inspected later.

**Backpressure** — letting a slow consumer signal upstream to slow down (or buffer/shed), so a fast producer doesn't overwhelm it.

**Idempotency** — designing an operation so repeating it has the same effect as doing it once (via an idempotency key), so retries and at-least-once delivery are safe.

**Exactly-once (effectively-once)** — the practical guarantee that a message's *effect* happens once, achieved with at-least-once delivery + idempotent consumers — true exactly-once delivery is largely a myth.

**Durable execution (Temporal)** — a workflow engine that persists each step's state so a long-running, multi-step process survives crashes and resumes exactly where it left off, instead of you hand-rolling sagas and retries.

## Distributed transactions & consistency

How to keep "update the DB *and* tell other systems" correct when there's no single transaction spanning them.

**Dual write (anti-pattern)** — writing to the DB and the queue as two separate operations; a crash in between leaves them diverged. The problem the outbox and CDC patterns exist to solve — name it, then reach for one of them.

**Transactional outbox** — write the business row and an *outbox* message row in the **same** DB transaction; a relay then polls the outbox and publishes to the queue. Makes "update state and emit an event" atomic without distributed commit.

**CQRS (Command Query Responsibility Segregation)** — separate the write model from one or more read models, kept in sync via published events; reads can be denormalized/precomputed independently of the write schema. Often paired with event sourcing.

**Event sourcing** — persist state as an append-only log of events rather than a mutable row; current state is a fold over the log. Full audit trail and time-travel, at the cost of rebuilds and projections.

**Saga** — model a distributed transaction as a chain of local steps, each with a **compensating** action to undo it on failure — eventual consistency instead of a global lock. Orchestrated (central coordinator) or choreographed (events).

**Two-phase commit (2PC)** — a coordinator drives an atomic commit across participants (prepare → commit). Strongly consistent, but blocks on the coordinator and scales poorly; usually avoided at web scale in favor of sagas.

**Idempotent consumer** — a consumer that dedupes on a message/idempotency key so redelivery is safe; the consumer-side half of [exactly-once](#async--messaging) under at-least-once delivery.

## Scaling & reliability

**Horizontal vs vertical scaling** — add more machines (scale out) vs. a bigger machine (scale up). Interviews almost always want horizontal, behind a load balancer.

**Load balancing** — distributing requests across backends (round-robin, least-connections, hashing). The entry point to any horizontally scaled tier.

**Rate limiting (token bucket / leaky bucket)** — capping request rate per client. Token bucket allows bursts up to a bucket size then refills steadily; leaky bucket smooths to a fixed outflow.

**CDN (Content Delivery Network)** — geo-distributed edge caches serving static (and some dynamic) content close to users, cutting latency and origin load.

**SLA / SLO / SLI** — the contract (SLA), the internal target (SLO), and the measured metric (SLI). "Three nines" availability is an SLO of 99.9%.

**Circuit breaker** — wraps a downstream call so that after repeated failures it "opens" and fails fast (instead of piling on a struggling service), then probes for recovery.

**Graceful degradation** — shedding non-essential functionality under load or partial failure so the core service stays up (e.g. drop personalization, still serve the feed).

**Reconciliation loop (control loop)** — a controller continuously compares **desired** state (spec) against **actual** state and acts to converge them, re-reading the whole state each pass (**level-triggered**, not event-driven), so a missed event can't corrupt it. The engine behind self-healing and the [Kubernetes operator pattern](/system-design/kubernetes/#extending-the-api-crds--operators).

**Allowlist / denylist** — explicitly permitted vs. explicitly blocked sets (IPs, keys, users). A denylist blocks known-bad; an allowlist permits only known-good (stricter default).

**Bloom filter** — a compact probabilistic set membership test: "definitely not present" or "possibly present," no false negatives. Used to skip expensive lookups (e.g. is this key in the DB at all?).

## Storage internals (deeper shelf)

Write-path mechanics below the design level — rarely the main thread of an interview, but the vocabulary that wins a storage-engine deep dive.

**Group commit** — batch many pending writes into a single log flush (`fsync`), trading a little latency for far higher write throughput.

**Journaling** — write intended changes to a sequential journal before applying them in place, so a crash can replay or roll back; the filesystem cousin of a WAL.

**Copy-on-write (CoW)** — never overwrite in place: write a new copy and atomically swap the pointer. Basis of cheap snapshots and crash-safe updates (filesystems, B-trees).

**Shadow paging** — a CoW variant: write changed pages to new locations, then atomically flip the root to point at them; the old version stays intact until the switch.

**Write amplification** — one logical write triggering several physical writes (compaction, page rewrites, replication fan-out). A key cost metric for LSM- and SSD-backed stores.

**Double buffering** — write into one buffer while the other is flushed/read, then swap; hides flush latency and avoids tearing.

**Scatter-gather (vectored) I/O** — read into / write from multiple non-contiguous buffers in one syscall (`readv`/`writev`), cutting copies and syscall count.

**Write combining / coalescing** — merge multiple adjacent or pending writes into one larger write before it hits the device, reducing round-trips.

**Compare-and-swap (CAS) / atomic write** — update a value only if it still equals an expected prior value; the hardware primitive under lock-free concurrency and optimistic concurrency control.

**Read-modify-write** — read a value, change it, write it back; not atomic unless guarded (CAS, lock, transaction) — otherwise two racing updates and one is lost.

**Write skew** — a snapshot-isolation anomaly: two transactions read an overlapping set, each writes a disjoint part, and together they break an invariant neither would alone.
