---
title: The Delivery Framework
description: A step-by-step structure for the system design interview — Requirements, Core Entities, API, optional Data Flow, High-Level Design, and Deep Dives — with timings, so you deliver a complete working system instead of running out of time.
sidebar:
  order: 1
---

The fastest way to fail a system design interview is to not deliver a *working system* in the time given — usually misdiagnosed as "time management." A practiced structure fixes this: it keeps you focused on what the interviewer cares about and gives you a linear path to fall back on when nerves hit. Build the solution up in order, one layer at a time.

The sequence and rough timings for a ~45-minute slot (~35 min of actual design):

| Step | Time | Goal |
| --- | --- | --- |
| Requirements | ~5 min | Pin down *what* you're building |
| Core Entities | ~2 min | The nouns your system persists & exchanges |
| API / Interface | ~5 min | The contract between system and users |
| Data Flow *(optional)* | ~5 min | Sequence of processing steps (data-heavy systems only) |
| High-Level Design | ~10–15 min | Boxes and arrows that satisfy the API |
| Deep Dives | ~10 min | Harden it against the non-functional requirements |

**Format and medium.** A few shapes recur: **remote** over video with a shared virtual whiteboard (most common today), **in-person** at a physical whiteboard, or a take-home/written design doc (rarer). Whatever the format, **you are always drawing** — boxes and arrows — and remotely that's almost always **[Excalidraw](https://excalidraw.com/)** (or the company's own tool like CoderPad). Ask your recruiter which tool ahead of time and practice in it so you're not fumbling on the day.

## Requirements (~5 min)

**The prompt is one line, and that's the point.** It's given verbally almost always (sometimes pasted into the shared doc — still a one-liner): *"Design Twitter."* *"Design a URL shortener."* No requirements doc, no test cases, deliberately almost nothing. **The interviewer says one or two sentences; you're expected to drive from there.**

**Functional requirements — pick 3–5 core features, then stop.** "Users should be able to…" statements. Drive them out as a back-and-forth with the interviewer and *prioritize* — a long list hurts you; many FAANG loops grade exactly this focus. For Twitter: *post a tweet, follow users, view the home timeline.* Add 1–2 more only if the interviewer pushes (search, notifications). And **say what you're cutting out loud**: "I'll scope out DMs and ads." Naming the cut is as much signal as naming the feature.

**Non-functional requirements — pick 3–4 with teeth.** "The system should be…" statements about qualities, and they must be **quantified and contextual**. Choose the ones that actually *drive the design*, not generic wishes — "low latency" is meaningless (every system wants that), but "home timeline renders in < 200 ms" names the part that matters and gives a target. Pull your 3–4 from this checklist:

- **CAP** — consistency vs. availability? (Partition tolerance is a given in a distributed system.)
- **Availability / uptime** — what uptime does the system promise, *if it matters*? Quantify it: 99.9% ("three nines") ≈ 8.7h down/yr, 99.99% ≈ 52min/yr. The "A" in CAP, stated as a target.
- **Scale (Scalability)** — DAU/MAU, QPS, bursty traffic, peak events, read:write ratio?
- **Latency** — how fast, on which operations specifically?
- **Environment** — mobile battery, limited memory/bandwidth?
- **Durability** — how bad is data loss? (Social feed vs. bank ledger.)
- **Security** — data protection, access control, compliance.
- **Fault tolerance** — redundancy, failover, recovery.
- **Compliance** — legal/regulatory/industry standards.

A popular mnemonic for the checklist: **FCC + SLEDS** — *Fault tolerance, CAP, Compliance · Scalability, Latency, Environment, Durability, Security.*

**Capacity estimation** — don't do it upfront just to prove arithmetic. Do the math *only when it changes a design decision* — e.g. estimating the number of trending topics to decide whether a single min-heap fits or you must shard it. Otherwise tell the interviewer you'll calculate while designing, when needed — in practice that lands in **deep dives** (below), where a number decides a shard count, cache size, or instance fan-out.

## Core Entities (~2 min)

Jot down a quick bulleted list of the core nouns — the things your API exchanges and your data model persists. For Twitter: `User`, `Tweet`, `Follow`. Don't enumerate full schemas yet — *you don't know what you don't know.* You'll discover fields as the design forces them out. Useful prompts: who are the actors? What resources satisfy the functional requirements? Pick good names.

## API / System Interface (~5 min)

Define the contract before the architecture — it guides everything downstream and often maps straight from the functional requirements. Pick a protocol:

- **REST** — HTTP verbs on resources. **Default choice** for most interviews.
- **GraphQL** — clients pick exactly what data they want; use for diverse clients with different needs.
- **RPC (gRPC)** — action-oriented, fast service-to-service; use for internal APIs where performance is critical.

Don't overthink it — default to REST. For real-time, add WebSockets or SSE, but design the core API first. Use **plural resource nouns** (`/v1/tweets`, not `/tweet`). Derive the current user from the **auth token**, never from the request body or path — never trust a user ID supplied by the client.

```
POST /v1/tweets        body: { "text": string }
GET  /v1/tweets/{id} -> Tweet
POST /v1/follows       body: { "followee_id": string }
GET  /v1/feed        -> Tweet[]
```

## Data Flow *(optional, ~5 min)*

For data-processing systems, list the sequence of actions the system runs on its inputs. Skip it if there's no meaningful pipeline. A web crawler: fetch seed URLs → parse HTML → extract URLs → store data → repeat. This list feeds the high-level design.

## High-Level Design (~10–15 min)

Draw the components — servers, databases, caches, queues — and the arrows between them, satisfying the API you just defined. A clean way to do it: **walk your API endpoints one at a time** and build the design up to serve each.

- **Stay simple first.** Meet the core *functional* requirements with a relatively simple design. Resist layering on complexity early — that's the #1 reason candidates never reach a complete solution.
- **Note, don't build, the optimizations.** When you spot a place for a cache or queue, make a quick verbal + written callout and **move on** — you'll handle it in deep dives.
- **Narrate the data flow.** Talk through how data moves and what state changes on each request, request → response. When you hit the persistence layer, annotate the *relevant* columns/fields right next to the DB — skip the obvious ones (a `User` has name/email/password — don't write that). Types can be inferred; don't slow down for them.

## Deep Dives (~10 min)

Now harden the design against the **non-functional requirements**, edge cases, and bottlenecks. This is where the interesting problems live — for Twitter, fan-out-on-write vs. fan-out-on-read for the feed; horizontal scaling, caching, and DB sharding for 100M+ DAU.

This is also where the **capacity math you deferred** gets done — and only the numbers that *decide* something. Estimate the QPS to size the instance fleet, the data volume to justify sharding, the working-set size to size the cache. A number that doesn't change the design isn't worth computing out loud.

Seniority sets the dynamic: junior candidates can let the interviewer point out where to improve; senior candidates should *proactively* identify and lead these discussions. But it's a balance — **don't talk over the interviewer.** They have specific signals they're probing for; leave room for their questions or you'll miss them (and tank your communication score).

Two things candidates routinely forget here, worth raising yourself:

- **Metrics & monitoring** — don't assume the system just "works." Say *how* you'd know it works and how you'd locate a bottleneck.
- **When the interviewer hijacks a deep dive** — they may steer hard into one component (e.g. Kafka partitioning) and eat the clock. Answer their questions first; that's the real signal being assessed. If time's nearly up and you haven't shown breadth, briefly note you'd like to walk the end-to-end flow to cover scaling/partitioning/failure. Don't contradict the interviewer, even a poor one.

---

This page distills the [Hello Interview Delivery Framework](https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery), reorganized as my own working reference.
