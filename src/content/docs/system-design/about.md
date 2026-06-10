---
title: How to Prepare
description: A practice-driven method for system design interview prep — the active-recall loop that beats passive reading, the foundational resources worth your time, and the question patterns to cover.
sidebar:
  order: 0
---

Public study notes for system design interviews. This is the meta page: *how* to prepare. The companion [Delivery Framework](/system-design/delivery-framework/) is the in-room structure to run every question through, and individual question breakdowns build out from there.

The single biggest mistake is passive consumption — watching videos and reading books, never actually *doing* a design under time pressure. You learn the shape of a problem by struggling through it first, not by reading the answer key cold. So the method below is built around active recall.

## The practice loop

Run this loop per question. The order matters: you struggle first, then patch known gaps, then read the answer key last — when it'll actually stick.

1. **Pick a question with an answer key.** A worked solution you can check yourself against — a good blog post or video breakdown. Without a key you can't tell what you missed.
2. **Read only the requirements.** Just enough to understand the system. If the key is a video, watch only the opening. Don't spoil the design.
3. **Try it for real — timed.** Open a whiteboard (physical or [Excalidraw](https://excalidraw.com/)). Set a timer: **35–50 min** depending on the target company. A "45-minute" interview is really ~35 min of design — 5 min intros, 5 min questions. Answer as if it's live. When you hit something you don't know, **write it on the board and keep moving** — don't cheat, don't stall.
4. **Research the known unknowns.** Time's up — now you have a list of things you knew you didn't know. Fill those gaps actively (search, ask an LLM, read targeted docs).
5. **Read the answer key in full.** *Only now.* Having just struggled through it, the key clicks and is retained far better than if you'd read it first — it patches the *unknown* unknowns, the things you didn't know you'd missed.
6. **Rinse and repeat** across questions until it feels comfortable.
7. **(Optional) Mock interview.** Put it together against a real interviewer and adjust from the feedback.

## Foundations worth your time

Get the basics down first if you're not already comfortable with distributed systems. A few high-leverage resources:

| Resource | What it's for |
| --- | --- |
| *System Design Interview – An Insider's Guide* (Alex Xu) | The standard primer — broad coverage of the building blocks |
| [System Design in a Hurry](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction) (Hello Interview) | Condensed, interview-focused — core concepts, key technologies, numbers to know |
| [Jordan Has No Life](https://www.youtube.com/@jordanhasnolife5163) (YouTube) | Deep, practical walkthroughs |

On **DDIA** (*Designing Data-Intensive Applications*): a great book, but far denser than an interview needs. Worth it if you have endless time; otherwise it's not the efficient path.

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
| Foundational component | Rate limiter, message queue, distributed cache, web crawler, job scheduler | One building block, deeply |

---

These notes distill the [Hello Interview](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction) framework and Alex Xu's *System Design Interview* — reorganized as my own working reference, not a substitute for the originals.