
Google: Microservices are a software development approach where a large, single application is broken down into small, 
independent, and loosely coupled components. Each component handles a specific business function and communicates 
with others using standard APIs, allowing developers to update and scale them individually without affecting the whole system.

Q1: "Microservices are a software development approach ..." is this architectural style or "software development approach"?
A: Primarily an **architectural style** (from Q1 of topic 1's list) — a set of constraints on how you structure
a system: split it into small, independently deployable services, each owning one business capability, talking
over the network. "Software development approach" is just Google softening the term for a general audience.
But there's a real reason it bleeds into "approach": microservices is unusually **tied to how you organize
teams and process** — small teams owning a service end-to-end, independent CI/CD, DevOps culture (Conway's Law).
So it's an architectural style with strong *organizational* implications, which is why people also call it an
"approach." Structurally: it's a style. Practically: adopting it changes your teams, not just your boxes.

Q2: "Each component communicates with others using standard APIs" so microservices should talk to each other directly via API?
OR this is not necessary?
A: Not necessary — direct API calls are the common way, not the only one. The real rule is just **talk over a
well-defined contract, not a shared DB**. Two patterns: **sync** (A calls B's REST/gRPC and waits — simple but
coupled: B down → A down) and **async** (A emits an event to a broker, B consumes later — looser, more resilient,
but eventually consistent). Mature systems mix both. Anti-pattern: two services sharing a database — that
secretly re-couples them and breaks independent deployment.

Q3: in call graph - is it acceptable to have cycles? e.g. Service A invokes service B and B also invokes A?
A: Strongly discouraged, especially *synchronous* cycles — they risk cascading failure/hangs, kill independent
deployment, and usually mean A and B are really one domain split badly. Fixes: merge them, extract the shared
part into a third service, or invert with events (A subscribes to B's event instead of B calling back). Aim for
a **DAG** of sync calls; async cycles are more tolerable (nobody blocks) but still worth a second look.

Q4: if they invoke each other via gRPC - how does it happen in real production deployments? Let's say i have 1 server A and 3 servers B
how does A know about how to invoke B? How is this done in various common situations?
A: The problem is called **service discovery + load balancing**. A never hardcodes B's IPs (they change on every
deploy/scale/crash) — it resolves a *name* ("service-b") to the live healthy instances, then picks one. Options:
- **DNS** — one name round-robins to the IPs. Simple, but slow to notice dead instances.
- **Server-side LB** — A calls one stable address (LB / K8s `Service`); it forwards to a healthy B. Extra hop.
- **Registry + client-side LB** — B registers in Consul/Eureka/etcd; A fetches all IPs and balances itself
  (gRPC does this natively). No extra hop.
- **Kubernetes (today's default)** — call `service-b.ns.svc.cluster.local`; use a **headless Service** so gRPC
  load-balances across all 3 pods (plain Services stick gRPC to one pod).
- **Service mesh (Istio/Linkerd)** — a sidecar handles discovery, LB, retries, mTLS. Most powerful, most ops.
For 1×A → 3×B: on K8s, headless Service + gRPC round-robin; add a mesh once you want retries/mTLS/metrics free.

Q5: if organization running several backend services which do not talk to each other - but handle requests from various web 
applications, are they considered "micro-services" or what make backend-service - a micro-service?
A: "Micro" is relative to *one application* you've split up — not "small backend." The test isn't whether they
call each other; it's: **do they own their own data, deploy independently, and each cover one business
capability, as pieces of one larger system?** If so → microservices (even if coupled only via async events).
If they're unrelated backends for different products → just **separate services**, not microservices.

Q6: Are Microservices often powered by K8s in 2026 - or not necessary?
A: Common, but not necessary. K8s is the *default* for medium/large fleets (it solves discovery, scaling,
rollouts, self-healing), but it's overkill for small teams. Widely-used lighter options: serverless (Lambda),
managed containers (ECS/Fargate, Cloud Run, Fly.io), or Nomad. Rule of thumb: few services / small team →
skip K8s; many services + dedicated platform people → K8s earns its complexity.

Q7: from Q4 - "gRPC does this natively".. it natively does what - fetches all ips?
A: Two built-in things: (1) a **name resolver** that turns "service-b" into the *full list* of IPs (e.g. via
DNS, returning all A-records — not just one), and (2) a **client-side load balancer** (default `round_robin`)
that opens a persistent HTTP/2 connection to *each* IP and spreads calls across them — re-balancing as instances
come and go. So "natively" = the gRPC client library does resolve-all-IPs + balance-across-them itself, no
external LB needed. Caveat: with plain DNS it only re-resolves periodically, so the registry/K8s-headless setups
feed it fresher instance lists.

Q8: What is "client-side load balancer" ?
A: The **caller** (A) does the balancing itself — it knows all of B's IPs and picks which one to hit per request,
with no middlebox in between. Contrast:
- **Server-side LB** — A sends every request to one address (nginx / AWS ALB / K8s Service); *that box* chooses
  a B and forwards. One extra network hop; the LB can bottleneck; A stays simple.
- **Client-side LB** — the LB logic lives *inside A* (a library like gRPC's, or a sidecar proxy). A holds the
  live IP list and dials a B directly. No extra hop, no central bottleneck; cost is A must track the instance
  list (needs discovery) and every language's client needs the logic — which is exactly why service meshes push
  it into a sidecar so your code stays clean.

Q9: is it common/possible to have Registry/Discovery on AWS ECS for example in cloud? OR locally in docker-compose somehow? 
A: Yes to both — and in both you usually get **DNS-based discovery for free**, no separate registry to run.
- **AWS ECS** — built-in **ECS Service Connect** (or older Service Discovery via **Cloud Map**) gives each
  service a stable DNS name; ECS keeps it mapped to healthy tasks as they scale/restart. Very common. For
  request/response you'd often just put an **ALB** in front instead (server-side LB). Only reach for Consul on
  ECS if you want its extra features.
- **docker-compose (local)** — discovery is automatic: every service is reachable by its **service name** as a
  hostname on the shared Docker network (`http://service-b:8080`). Docker's embedded DNS even round-robins across
  replicas. So locally you rarely need a registry at all.
Bottom line: a standalone registry (Consul/Eureka) is mostly a **VM/non-orchestrated** or multi-cluster need.
On ECS, K8s, or compose, the platform's own DNS *is* the discovery mechanism.

Q10: "the gRPC client library does resolve-all-IPs" -- how???? let's say i have docker compose with 
1 A service instance and 3 service B instances. Server A talks to B via gRPS - but what makes it find out all 
3 instances of service B?
A: The chain is **DNS**, and the trick is a *multi-record* DNS answer:
1. Compose runs an **embedded DNS server** (at `127.0.0.11`) inside the shared network. When service `B` has
   `deploy: replicas: 3`, that DNS returns **all 3 container IPs** as separate A-records for the name `b`.
2. gRPC's built-in **`dns` resolver** does a normal DNS lookup for `b` → gets the *list* of 3 IPs (not one).
3. Its **`round_robin` policy** then opens a persistent HTTP/2 connection to each of the 3 and rotates calls.
The two catches (why it's not automatic):
- **Use the dns resolver + round_robin.** Dial `dns:///b:50051` (not just `b:50051`) and set the policy to
  `round_robin` — the default `pick_first` grabs *one* IP and sticks to it, so you'd hit only 1 of 3.
- **Re-resolution is periodic**, so a just-added B isn't seen instantly (~30s-ish), and old cached IPs linger
  briefly. Fine locally; in prod that staleness is why people add K8s-headless/registry/mesh.
So what "finds" them is Docker's DNS returning many IPs + gRPC being told to fan out across all of them.

Q11: if instead of gRPC I would have normal RESTish axios based integration in service A - axios would not do load balancing?
A: Correct — axios does **no** load balancing or discovery; it just makes one HTTP request to whatever URL you
give it. But with plain HTTP/1.1 you often don't need it: every axios call is a **fresh connection**, so the OS
resolves the DNS name each time and, if the name has 3 IPs (Docker/K8s/ECS DNS), naturally spreads calls across
them. That's "good enough" round-robin for free — the exact opposite of gRPC's problem.
Why gRPC needed the extra config: it keeps **one long-lived HTTP/2 connection** and pins it to a single IP, so
without `round_robin` it never rotates. Short-lived REST calls sidestep that.
When you *do* add balancing for REST: put a **server-side LB in front** (nginx / ALB / K8s Service) and point
axios at that one URL — the standard, simplest pattern. Client-side LB in Node is rare; you'd only reach for it
(or a mesh sidecar) for retries/mTLS/fine-grained control.

Q12: is it possible to have long-lived HTTP connection with axios from Service A?
A: Yes — via a **keep-alive HTTP agent**. By default Node closes the TCP connection after each request; pass a
custom agent to reuse it:
```js
import http from 'node:http';
const agent = new http.Agent({ keepAlive: true, maxSockets: 50 });
axios.get('http://service-b:8080/x', { httpAgent: agent }); // (httpsAgent for TLS)
```
This pools and reuses connections — faster (skips TCP+TLS handshake per call), standard for hot service-to-service
paths. The catch is exactly the gRPC problem from Q11: a reused connection **pins to one B instance**, so it
stops naturally round-robining across the 3. Fix: point it at a **server-side LB** (which balances despite the
persistent connection), or cap connection lifetime so it periodically re-resolves DNS. So keep-alive buys speed
but you give back the free load-balancing — put an LB in front.