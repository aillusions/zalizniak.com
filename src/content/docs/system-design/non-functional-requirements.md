---
title: Non-Functional Requirements
description: The non-functional requirements checklist for a system-design interview (FCC + SLEDS), plus the cluster people conflate — availability vs CAP's "A", high availability vs fault tolerance, and why redundancy/failover are tools, not requirements.
sidebar:
  order: 1.2
---

NFRs are the *qualities* a system must have ("the system should be…"), as opposed to features ("users can…"). In an interview, pick **3–4 that actually drive the design** and **quantify** them — "low latency" is a wish every system shares; "home timeline renders in < 200 ms" is a requirement that names a target.

## The checklist

Pull your 3–4 from these. Mnemonic: **FCC + SLEDS**.

| NFR | The question to ask |
| --- | --- |
| **Fault tolerance** | How well must it keep working through failures? |
| **CAP** | Consistency *or* availability under a network partition? (Partition tolerance is a given.) |
| **Compliance** | Legal / regulatory / industry standards? |
| **Scalability** | DAU/MAU, QPS, bursty traffic, read:write ratio? |
| **Latency** | How fast, on which operations specifically? |
| **Environment** | Mobile battery, limited memory/bandwidth? |
| **Durability** | How bad is data loss? (Social feed vs. bank ledger.) |
| **Security** | Data protection, access control? |

## Availability, CAP & fault tolerance — untangled

This cluster gets conflated constantly. Keep them separate:

- **Availability / uptime** — a real, quantifiable NFR target: % of time the system is up, in **nines** (99.9% ≈ 8.7 h down/yr, 99.99% ≈ 52 min/yr). This is the *goal*.
- **CAP's "A" is not this.** CAP-availability means "every request still gets a response *during a network partition*" — a behavior-under-partition property, not a percentage of uptime. Same word, different concept; don't state your uptime target as "the A in CAP."
- **High availability and fault tolerance are the *approach*, not the target** — how you hit an uptime number by surviving failures:
  - **High availability (HA)** — *minimizes* downtime; on failure a standby is promoted, so there's a **brief interruption**.
  - **Fault tolerance (FT)** — runs *continuously through* a failure with **no noticeable gap**, because redundant components serve in parallel.
  - The difference is the **failover gap**: HA has a small one, FT has none.
- **Redundancy, failover, recovery are tools** — the mechanisms that implement HA/FT. Not requirements in themselves.

So on a strict list the genuine NFRs are the **targets** (uptime %, durability, latency…). "Fault tolerance" is either the *means* to the uptime target or a sharper restatement of it — "survive an AZ loss with no gap" — not a separate axis.

HA and FT aren't a binary — they're the top rungs of a redundancy ladder, each shortening the failover gap at higher cost. The line: HA still has a **promote step**, FT doesn't.

| Posture | Backup state | Failover | |
| --- | --- | --- | --- |
| **No redundancy (SPOF)** | none | full outage | |
| **Cold standby** | off | minutes–hours (boot + restore) | |
| **Warm standby** | running, not serving | seconds–minutes (promote) | **HA** |
| **Hot standby (active-passive)** | live, ready | sub-second (promote) | **HA** |
| **Active-active** | all nodes serving | none — just lost capacity | **FT** |
| **Lockstep + voter** | parallel, in sync | none — fault masked | **FT** |
