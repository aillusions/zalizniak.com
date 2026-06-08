# Rilla — evidence map

Crawled 2026-06-07 via claude-in-chrome (logged-in profile) + web search. First-party (rilla.com, Ashby JDs) prioritized; third-party trackers labeled.
Tiers: VERIFIED (stated on a public page) · INFERRED (reasoned from a cited signal) · SPECULATIVE (best-practice fill-in).

## Source keys
- [home] https://www.rilla.com/
- [stories] https://www.rilla.com/customer-stories
- [ashby] https://jobs.ashbyhq.com/rilla  (job board)
- [jd-ai] https://jobs.ashbyhq.com/rilla/fad15157-b4cc-44ff-92b7-4afd4fe3388e (Software Engineer, Applied AI)
- [jd-fde] https://jobs.ashbyhq.com/rilla/ec768352-6ddb-4d4b-8704-0c04c37fff13 (Forward Deployed Engineer, Integrations)
- [jd-swe] https://jobs.ashbyhq.com/rilla/37228ca3-4e4a-4e3c-9414-d8a2046ff496 (Software Engineer)
- [jd-sr] https://jobs.ashbyhq.com/rilla/6f4e6ca1-efe7-4f25-af69-59f78981ef70 (Senior Software Engineer)
- [nyu] https://entrepreneur.nyu.edu/blog/2025/08/12/how-sebastian-jimenez-built-rilla-from-field-hustle-to-speech-ai-for-sales/
- [cb] https://www.crunchbase.com/organization/rillavoice (third-party)
- [pb] https://pitchbook.com/profiles/company/399529-99 (third-party)

---

## WHAT THEY DO

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Mission: "index the offline world" | VERIFIED | [jd-ai] | "Rilla is on a mission to index the offline world." |
| Leading sales-coaching software for offline sales; "virtual ridealong" | VERIFIED | [jd-ai], [home] | "the leading sales coaching software for organizations doing sales offline"; home: "Record in-person salespeople and coach them 100x faster with Rilla." |
| Records / transcribes / analyzes in-person sales conversations for coaching | VERIFIED | [home], [jd-ai] | virtual ridealongs; "build agents that operate natively on real-world audio, extract insights from conversations no one else can even access" |
| 1000+ customers incl. The Home Depot, KKR, Neighborly, PulteGroup | VERIFIED | [jd-ai] | "over 1000 customers, including The Home Depot, KKR, Neighborly, and PulteGroup" |
| Industries: home building/improvement/service, automotive, dental, senior living, multifamily | VERIFIED | [home] | listed |
| Founder/CEO Sebastian Jimenez; co-founders Michael Castellanos & Christopher Martin; founded 2019 | INFERRED | [nyu], [cb] | Sebastian named in [nyu]; co-founders + 2019 per public record/Crunchbase (not on rilla.com) |
| Customer outcomes (e.g. +40% close rate, 5,000 ridealongs/30 days at Neighborly) | VERIFIED | [home] | stat tiles on homepage |

## FUNDING / SCALE

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Backed by Google Ventures, Bessemer Ventures, Crew Capital, Broom Ventures | VERIFIED | [jd-ai] | "backed by Google Ventures, Bessemer Ventures, Crew Capital, and Broom Ventures, along with others." |
| ~$75M raised, most recent round Series B | INFERRED | [cb], [pb] | third-party trackers |
| ~$40M ARR, 15% MoM, NRR >170%, profitable | INFERRED | third-party (startuphub/search) | not first-party; treat as reported |
| ~58-person team (2024); ~80 now | INFERRED | third-party + 23 open roles on [ashby] | pipeline + trackers |
| Largest dataset of in-person sales conversations | INFERRED | third-party + [jd-ai] | JD: "a whole new class of data"; "conversations no one else can even access" |

## STACK (first-party, from JDs)

| Layer | Choice | Tier | Source |
| --- | --- | --- | --- |
| Web frontend | React | VERIFIED | [jd-swe], [jd-sr] ("React, React Native, Typescript and Python") |
| Mobile | React Native | VERIFIED | [jd-swe], [jd-sr] |
| Backend langs | TypeScript + Python | VERIFIED | [jd-ai], [jd-swe], [jd-fde] |
| API framework | FastAPI | VERIFIED | [jd-ai] ("FastAPI for API development") |
| Runtime/libs | Node.js, Turborepo, Lodash, Zod | VERIFIED | [jd-swe], [jd-fde] |
| ML framework | PyTorch | VERIFIED | [jd-ai] |
| LLM APIs | OpenAI APIs | VERIFIED | [jd-ai] |
| Model hosting/inference | Baseten | VERIFIED | [jd-ai] |
| LLM gateway/router | LiteLLM | VERIFIED | [jd-ai] |
| Real-time comms / voice | LiveKit | VERIFIED | [jd-ai] ("AWS and LiveKit for real-time communications") |
| Cloud | AWS | VERIFIED | [jd-ai] |
| Datastores | PostgreSQL, Redis, S3 | VERIFIED | [jd-ai] ("PostgreSQL, Redis, and S3 for data storage"); Postgres also [jd-swe] |
| IaC / CI | Terraform, Spacelift, GitHub Actions | VERIFIED | [jd-swe], [jd-fde] |
| Other welcomed langs | JS, C++, Python, Rust | VERIFIED | [jd-swe] requirements |
| Coding agents | "Unlimited token budget" perk | VERIFIED | [jd-swe], [jd-sr] benefits list |

## PRODUCT ARCHITECTURE / ROADMAP (from Applied AI JD)

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Audio intelligence pipeline for messy, noisy, unstructured real-world conversations | VERIFIED | [jd-ai] | "A first-of-its-kind audio intelligence pipeline—designed for the messy, noisy, wildly unstructured conversations that happen in the real world, not in an online meeting" |
| Voice-first interface: command Rilla via natural speech | VERIFIED | [jd-ai] | "A voice-first interface that lets users command Rilla directly through natural speech" |
| Search engine over voice data | VERIFIED | [jd-ai] | "A search engine that uncovers business-critical insights from voice data that's never been searchable" |
| Agents operate natively on real-world audio | VERIFIED | [jd-ai] | quote above |
| Full AI lifecycle: data acquisition → real-time inference → user-facing chat | VERIFIED | [jd-ai] | "work across the full AI lifecycle—from data acquisition to real-time inference and user-facing chat interfaces" |
| Uses eval frameworks, agent tooling, prompt engineering in production | VERIFIED | [jd-ai] | requirements list |
| Proprietary signal-processing + NLP analyzes conversations | INFERRED | third-party + [jd-ai] | PyTorch + Baseten + "audio intelligence pipeline" imply custom/self-hosted speech models |

## TEAM / PROCESS

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| In-office NYC; ~60 hrs/week in person | VERIFIED | [jd-ai], [jd-swe] | "Working ~60 hrs/week in person with some of the most ambitious people in NYC" |
| "Builders who operate like high speed reinforcement learners" | VERIFIED | [jd-ai] | quote |
| FDE model: solo, end-to-end, customer integrations, up to 50% travel | VERIFIED | [jd-fde] | "strikingly similar to those of a startup CTO: you'll work in small teams, often solo, and own end-to-end execution"; "travel up to 50%" |
| Full-stack generalist culture; ship across the stack at high velocity | VERIFIED | [jd-swe] | "architect and ship features across the stack at lightning speed" |
| Comp bands: SWE $185–260K; Sr SWE $230–300K; Applied AI $200–300K; FDE $170–300K; all + equity | VERIFIED | JD headers | |
| 7 engineering roles open; 23 total; mostly NYC, 1 London | VERIFIED | [ashby] | board counts |
| Values: infinite learner, customer-obsessive, unafraid of failure | VERIFIED | [jd-swe] | "What We Value" list |

## UNKNOWNS (open)
- Whether speech-to-text is fully in-house vs. a hosted/fine-tuned third-party model (Baseten hosting confirmed; the specific model isn't named).
- The search engine's index/vector store design.
- Agent orchestration framework for the voice-first interface (LiveKit handles transport; orchestration not stated).
- Datastore-to-warehouse analytics path.
- Exact headcount and eng split; exact total raised/valuation (third-party only).
- Auth vendor.
