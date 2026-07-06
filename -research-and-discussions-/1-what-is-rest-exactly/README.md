
- Google:
  - REST (Representational State Transfer) is not a single piece of software or strict architecture, 
  but rather an architectural style. It is a set of guiding principles 
  and design constraints used to build scalable, high-performing, and easily maintainable web services and APIs.

- Hellointerview: For creating these APIs, we have three main paradigms: REST, GraphQL, and gRPC.
  From https://www.hellointerview.com/learn/system-design/core-concepts/networking-essentials
- It's a simple and flexible way to create APIs that are easy to understand and use.
  The core principle behind REST is that clients are often performing simple operations against resources
  (think of them like database tables or files on a server). 

Q1: what is architectural style, what are most common and known architectural styles?
A: An **architectural style** = a named set of constraints on how components communicate and how a system is organized. 
Not code, not a spec — a reusable pattern with trade-offs.
("Use HTTP verbs on resources" is a constraint; a web framework is not.)
Most common/known:
- **Client–Server** — split UI from data/logic.
- **Layered (n-tier)** — presentation / business / data layers.
- **Monolith** — one deployable unit.
- **Microservices** — many small, independently deployed services.
- **REST** — resources + uniform interface (HTTP) + statelessness.
- **RPC** (incl. gRPC) — call remote functions like local ones.
- **Event-Driven / Pub-Sub** — components react to events/messages.
- **Message Queue / Broker** — async decoupling via a queue.
- **Pipe-and-Filter** — data flows through processing stages (Unix pipes, ETL).
- **P2P** — no central server; nodes are equal.
- **SOA** — services on a central bus (ESB); microservices' heavier ancestor.
- **Serverless / FaaS** — functions run on-demand, no managed servers.
For "how do I build an API" the relevant ones are REST, RPC/gRPC, GraphQL, and event-driven;
the rest describe overall system shape.

Q2: When people use word "REST" - they mean usually architectural style or something else?
A: Usually **not** the strict architectural style. In practice "REST" almost always means
**"a JSON HTTP API using URLs + verbs (GET/POST/PUT/DELETE)"** — often called **REST-ish** or **HTTP API**.
The strict style (Roy Fielding's dissertation) adds constraints most APIs ignore — especially **HATEOAS**
(responses link to the next possible actions). Almost nobody does that, so purists say "that's not real REST."
So: when someone says REST, assume they mean the loose convention, not the formal style —
unless they explicitly say "RESTful / HATEOAS / Fielding."

Q3: Hellointerview talks about REST as architectural style - or something else as well?
A: Something else — they treat it as an **API paradigm / practical choice**, not the formal style. They list REST
alongside GraphQL and gRPC as "three main paradigms" for building APIs and describe it operationally
(clients doing simple CRUD-style operations on resources over HTTP).
That's the loose/REST-ish meaning from Q2, framed as "how you shape your API," not Fielding's constraint set.
For interview purposes they care about the trade-offs vs GraphQL/gRPC, not REST purity.

Q4: How does BFF correlates with the above
A: **BFF (Backend-for-Frontend)** is a *deployment/composition pattern*, not an API paradigm — it's orthogonal to REST.
It's a thin backend dedicated to one client type (web, iOS, Android), sitting between that client and your
downstream services/microservices. Each frontend gets its own tailored API instead of sharing one generic one.
How it relates:
- **REST/GraphQL/gRPC** = *how* the BFF talks (protocol choice). A BFF can expose REST to the client and call
  gRPC downstream — it often translates between paradigms.
- **Microservices** = *why* BFF exists. With many services, a client would juggle N calls; the BFF fans out,
  aggregates, and reshapes into exactly what that screen needs.
- Solves the same pain GraphQL does (over/under-fetching, chatty clients) but per-client and server-side,
  rather than via one flexible query language.
Rule of thumb: reach for a BFF when different clients need meaningfully different shapes of the same data,
or to hide microservice sprawl behind one screen-shaped API.

Q5: can expose REST to the client... in most cases what does this mean - REST-ish?
A: Yes — REST-ish. In practice "expose REST" means: JSON over HTTP, resource-ish URLs (`/users/123/orders`),
HTTP verbs (GET/POST/PUT/PATCH/DELETE), and status codes (200/201/404/500). That's ~95% of "REST" APIs.
What's almost always missing (and why it's "-ish", not pure REST):
- **HATEOAS** — no hypermedia links telling the client what it can do next.
- **Consistent resource modeling** — real APIs have action-y endpoints like `POST /users/123/activate`,
  which is really RPC wearing REST clothes.
So "expose REST to the client" ≈ "a conventional JSON HTTP API the frontend team already knows how to consume."

Q6: RE: "really RPC wearing REST clothes"... do people use RPC then over HTTP?
A: Yes — constantly. RPC just means "call a remote procedure (a verb/action), not manipulate a resource (a noun)."
It's a *style of thinking*, and HTTP is a common transport for it. Flavors you'll see:
- **Accidental RPC** — a "REST" API with action endpoints: `POST /users/123/activate`, `POST /cart/checkout`.
  Most real-world APIs are this hybrid. Nobody calls it RPC, but it is.
- **Explicit HTTP-RPC** — everything is `POST /rpc` (or `POST /doThing`) with a JSON body naming the method.
  E.g. **JSON-RPC**, older **SOAP**, Slack/Stripe-style action endpoints, Twirp.
- **gRPC** — Google's RPC framework, runs over **HTTP/2** with Protobuf. Explicitly RPC, very common between
  backend services (not browser-friendly without a proxy).
Mental model: **REST = nouns** (`/orders/42`), **RPC = verbs** (`createOrder`, `refund`). Both ride HTTP fine;
they're just two ways to model the same call. Most APIs are a pragmatic blend.

Q7: RE "Explicit HTTP-RPC" - so RPC does not rely on HTTP verbs and status codes?
A: Correct — RPC treats HTTP as a **dumb pipe**, not as semantics. It typically:
- Uses **one verb** (almost always `POST`) for everything — GET/PUT/DELETE aren't used to convey meaning.
- Puts the real "what to do" in the **URL path or body** (`POST /createOrder`, or `{"method":"refund"}`).
- Often returns **HTTP 200 even on failure**, and signals success/error in the **response body**
  (`{"error": {...}}`) instead of via status codes like 404/409.
Contrast: **REST makes HTTP itself the API** — the verb (GET vs DELETE) and status code (404 vs 200) *are*
the meaning. RPC ignores that layer and carries meaning inside the payload.
Caveat: gRPC does map to its own status codes and uses HTTP/2 framing, but it's still "meaning in the payload,
one method per call" — not resource+verb semantics. So yes: RPC generally does **not** lean on HTTP verbs/statuses.

Q8: RESTfull == REST?
A: In everyday use, yes — **"RESTful" is just the adjective for "follows REST"**, and people use them
interchangeably ("a RESTful API" = "a REST API"). No real distinction in practice.
Pedantically: "RESTful" implies *actually satisfying REST's constraints* (incl. HATEOAS), whereas "REST API"
has drifted to mean the REST-ish JSON/HTTP convention from Q2. So a purist might say most "REST APIs" aren't
truly "RESTful." But nobody outside that debate cares — treat them as synonyms.

Q9: Why google "what is REST in programming" replies "REST, which stands for Representational State Transfer, 
is an architectural style designed for building web services". Does it mean "API style" buy architectural style - or 
something else mostly?
A: It means **"API style"** — Google's blurb is technically citing Fielding's formal "architectural style," but
in the context of "REST in programming" it's really answering "how do I shape a web API." The two collapse here.
Why the confusion: "architectural style" is the academically correct label (from Fielding's 2000 dissertation),
so blurbs parrot it. But 99% of readers asking "what is REST" want the practical answer: *a convention for
building HTTP/JSON APIs around resources + verbs*. That's the API style, not a whole-system architecture.
So: same thing, two registers. "Architectural style" = the formal pedigree; "API style" = what you actually do.
Don't read "architectural" as "affects your whole app's architecture" — REST only governs the API boundary.

Q10: in earlier question "Q1: what is architectural style" - you said REST, RPC, EDA, Monolith are all architectural styles.. 
I am confused, can you explain REST as architectural style - apart the API stylistics.. 
A: Fair — "URLs and verbs" is the *surface*. As an architectural style, REST is really a set of **6 constraints**
Fielding derived to explain *why the Web scaled to billions of nodes*. They're about system properties, not syntax:
- **Client–Server** — separate UI from data storage; each evolves independently.
- **Stateless** — server keeps no per-client session; every request carries everything it needs.
  This is the big one: any server can handle any request → trivial horizontal scaling + load balancing.
- **Cacheable** — responses declare if they're cacheable; lets proxies/CDNs serve copies → huge scale win.
- **Uniform interface** — the *defining* constraint: everything is a **resource** with a standard set of
  operations and a **self-describing representation** (+ HATEOAS). Uniformity is what lets a browser, curl,
  and a CDN all talk to any REST server without custom code.
- **Layered system** — client can't tell if it's talking to the real server or a proxy/gateway/cache in between;
  lets you insert LBs, auth gateways, CDNs transparently.
- **Code-on-demand** (optional) — server can ship executable code to the client (e.g. JS).
Point: REST-the-style is a recipe for **internet-scale, evolvable, intermediary-friendly distributed systems** —
statelessness + caching + uniformity are the real content. "Resource URLs + verbs" is just how those show up in
an HTTP API. Contrast: RPC optimizes for *calling functions*, EDA for *reacting to events*, REST for *scalable,
cacheable, loosely-coupled access to state*. That's the architectural difference, independent of JSON prettiness.

Q11: Frm Google: "REST is not a single piece of software or strict architecture".. what is the difference between
strict architecture and architectural style? Client–Serve - is an architectural style or architecture? Is there a
distinction really?
A: Yes, there's a real distinction — think **three levels of abstraction**:
- **Architectural style** = a *reusable set of constraints*, no specifics. "Client–Server", "REST", "microservices".
  It says nothing about *your* app — it's a category. (Style : architecture :: recipe : the meal you cooked.)
- **Architecture** ("strict architecture" in the blurb) = the *concrete design of one specific system*: these
  services, this database, this queue, these boxes-and-arrows. It's a *particular instance*, often blending
  several styles (e.g. "microservices + event-driven + REST at the edges").
- **Implementation** = the actual code/software realizing that architecture.
So Client–Server is a **style** (a constraint anyone can apply), not *an* architecture. Your specific
"React app ↔ Node server ↔ Postgres" *is* an architecture — one that *uses* the client–server style.
What Google means: REST isn't a rigid blueprint you must implement exactly ("strict architecture") — it's a
loose menu of constraints you pick from. That's why REST-ish exists: you can adopt some constraints, skip
HATEOAS, and still call it REST. A "strict architecture" wouldn't allow that pick-and-choose.
Shorthand: **style = the constraints; architecture = your specific choices; implementation = the code.**

Q12: Architectural Style VS Architecture VS System Design?
A: Two are *nouns* (the thing), one is a *verb* (the activity):
- **Architectural style** — a reusable vocabulary of constraints, app-agnostic. "microservices", "REST",
  "event-driven". You *choose from* these. (The menu.)
- **Architecture** — the resulting *structure* of one specific system: its components, their responsibilities,
  and how they connect. The noun/artifact. Usually combines several styles. (The dish you plated.)
- **System design** — the *activity* of producing that architecture: gathering requirements, estimating scale,
  weighing trade-offs, picking styles + technologies (DB, cache, queue), sizing capacity, handling failure.
  It's the *process*; architecture is its *output*. (The cooking.)
Chain: **system design (the work)** → picks **architectural styles (the constraints)** → yields an
**architecture (the structure)** → realized as an **implementation (the code)**.
Note "system design" also names the interview genre — same thing: "walk me through designing X" tests whether
you can run that activity and justify the trade-offs, not whether you memorized a style. 

Q13: GraphQL VS BFF - what usually wins?
A: Wrong axis — they're not rivals. They solve the *same problem* (clients need tailored, aggregated data)
at different layers, and often **combine**: a common pattern is "BFF that speaks GraphQL." So "what wins"
depends on how many client types you have:
- **1–2 similar clients** → **BFF with plain REST** usually wins. Simpler, cacheable, no GraphQL infra/learning
  curve. Most teams over-reach for GraphQL here.
- **Many clients wanting wildly different shapes** (web + iOS + Android + partners) → **GraphQL** tends to win:
  one flexible endpoint, each client queries exactly its fields — no N BFFs to maintain.
- **Big org, per-team ownership** → often **both**: GraphQL as the query layer, sometimes one BFF per client,
  or a federated graph. Netflix/Airbnb-style.
What actually wins in the median company: **REST BFF**, because GraphQL's costs (caching is hard, N+1 queries,
schema governance, extra server) only pay off at real client diversity. Reach for GraphQL when client-shape
divergence is your dominant pain; otherwise a BFF is less machinery.