---
title: Event-Driven Architecture
description: "Message-driven, event-driven, and command-driven architecture for system design — the umbrella and the styles, choreography vs orchestration, EDA patterns (event notification, event-carried state transfer, event sourcing, CQRS), and the tradeoffs."
sidebar:
  order: 12
  label: Event-driven architecture
---

The layer *above* the transports ([Kafka](/system-design/kafka/), [queues](/system-design/queues/), [Temporal](/system-design/temporal/)): how services actually talk. In **event-driven architecture (EDA)** — the standard name for this — services communicate by **asynchronous messages** instead of direct synchronous calls, which buys loose coupling, isolation, and resilience (a slow or dead consumer doesn't take the producer down).

The messages are mostly **events** — facts like `OrderPlaced` — which is where the name comes from, but the same pipes also carry **commands** (instructions like `ChargeCard`):

- **Event** — announces a fact; the producer doesn't know or care who reacts. Maximally decoupled.
- **Command** — directs a specific handler to do something.

Same messages on the wire; the difference is [intent](/system-design/study-list/#async--messaging). (The Reactive Manifesto calls the underlying async-messaging foundation "message-driven" — a less-common synonym you'll occasionally see.)

## Choreography vs orchestration

The big structural fork — *who owns the multi-step flow?*

![Choreography (services react to events) vs orchestration (a coordinator directs)](/diagrams/system-design/choreography-vs-orchestration.svg)

<details>
<summary>Mermaid source</summary>

```mermaid
flowchart TB
  classDef svc fill:#eef2f8,stroke:#94a3b8,stroke-width:1.5px,color:#0f172a;
  classDef coord fill:#eef0fe,stroke:#6366f1,stroke-width:1.5px,color:#0f172a;
  subgraph CH["Choreography — services react to events (no central owner)"]
    direction LR
    A1["Order svc"]:::svc -->|"OrderPlaced"| B1["Payment svc"]:::svc
    B1 -->|"PaymentTaken"| C1["Shipping svc"]:::svc
  end
  subgraph OR["Orchestration — a coordinator directs the flow"]
    direction LR
    O["Orchestrator"]:::coord -->|"charge"| B2["Payment svc"]:::svc
    O -->|"ship"| C2["Shipping svc"]:::svc
    B2 -.->|"result"| O
    C2 -.->|"result"| O
  end
```

</details>

- **Choreography** — each service reacts to others' events; no central controller. Maximally decoupled and easy to extend (add a consumer without touching anyone), but the end-to-end flow is **emergent** — nobody owns it, and "what happened across the whole order?" is reconstructed from event soup. Great for simple, loosely-related reactions.
- **Orchestration** — a coordinator issues commands, collects results, and owns the state. The flow is **explicit and visible**, failure/compensation is centralized — at the cost of a component that knows about the others. This is where an [orchestrator](/system-design/temporal/) (Temporal) earns its place; the [queue request-reply trap](/system-design/queues/#returning-a-result-and-why-it-gets-brittle) is what pushes you here.

Rule of thumb: **choreography for a few independent reactions; orchestration once you must track the state of a process.**

## EDA patterns

Common shapes once you're event-driven:

- **Event notification** — a thin "X happened, go look" ping; the consumer calls back for details. Lowest coupling, but chatty.
- **Event-carried state transfer** — the event carries the data the consumer needs, so it doesn't call back. Decoupled and fast, at the cost of duplicated/denormalized data.
- **[Event sourcing](/system-design/study-list/#distributed-transactions--consistency)** — the event log *is* the source of truth; state is a fold over events. Full audit + replay, harder to query.
- **[CQRS](/system-design/study-list/#distributed-transactions--consistency)** — split the write model from read models kept in sync via events; often paired with event sourcing.

## The tradeoffs

Message-/event-driven isn't free — know what you're buying:

- **Wins:** loose coupling, independent scaling and deployment, resilience (absorb bursts, survive a down consumer), and easy extension (new consumers attach without touching producers).
- **Costs:** **eventual consistency** (no synchronous "it's done"), much harder **debugging and observability** (a request's path is spread across services and time — lean on [tracing](/system-design/otel/)), ordering and duplicate handling ([idempotency](/system-design/study-list/#async--messaging)), and — in pure choreography — **no single owner** of the flow.

Reach for it when components must scale and fail independently and reactions are many/unknown. Keep a plain synchronous call when you need an immediate answer and the coupling is fine.

---

These are working notes — the architecture that composes the messaging transports. The throughline: async messages decouple services; *events* let many react, *commands* direct one, and the choreography-vs-orchestration choice decides **who owns the flow**. Transports on the [Kafka](/system-design/kafka/), [Queues](/system-design/queues/), and [Temporal](/system-design/temporal/) pages; vocabulary in the [Study List](/system-design/study-list/#async--messaging).
