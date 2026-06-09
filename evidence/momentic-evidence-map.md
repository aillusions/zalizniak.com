# Momentic — evidence map

Crawled 2026-06-08 via claude-in-chrome (logged-out) + web. First-party (momentic.ai docs/blog, momentic-ai GitHub, Ashby) prioritized; third-party (YC, TechCrunch) labeled.
Tiers: VERIFIED (stated on a public page) · INFERRED (reasoned from a cited signal) · SPECULATIVE (best-practice fill-in).

## Source keys
- [home] https://momentic.ai/
- [docs] https://momentic.ai/docs
- [how] https://momentic.ai/docs/get-started/how-momentic-works
- [cache] https://momentic.ai/docs/reliability/step-cache
- [heal] https://momentic.ai/docs/reliability/auto-heal
- [agentic] https://momentic.ai/docs/core-concepts/agentic-testing
- [finding] https://momentic.ai/docs/core-concepts/finding-elements
- [graph] https://momentic.ai/docs/ai/app-graph
- [memory] https://momentic.ai/docs/ai/memory
- [cfg] https://momentic.ai/docs/configuration/momentic-config
- [cfg-ai] https://momentic.ai/docs/configuration/ai
- [cmp-pw] https://momentic.ai/docs/comparisons/playwright
- [blog] https://momentic.ai/blog
- [blog-ch] https://momentic.ai/blog/postgres-to-clickhouse-migration
- [blog-intent] https://momentic.ai/blog/teaching-browser-agents-user-intent
- [gh] https://github.com/momentic-ai
- [gh-skills] https://github.com/momentic-ai/skills
- [gh-cm] https://github.com/momentic-ai/codemirror-ts
- [gh-orb] https://github.com/momentic-ai/momentic-circleci-orb
- [ashby] https://jobs.ashbyhq.com/momentic
- [yc] https://www.ycombinator.com/companies/momentic
- [tc] https://techcrunch.com/2025/11/24/momentic-raises-15m-to-automate-software-testing/ (third-party)

---

## WHAT THEY DO

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| AI-powered E2E testing for web, iOS, Android; NL tests | VERIFIED | [docs] | "Momentic is an AI-powered end-to-end testing platform for web, iOS, and Android apps. Write tests in natural language, run them anywhere." |
| Agent turns prompts into steps, runs, auto-heals | VERIFIED | [docs] | "An AI agent turns your prompts into reliable steps, runs them against your app, and auto-heals brittle locators." |
| Tests live in repo as YAML | VERIFIED | [docs], [how] | "Tests live in your repo as YAML, run locally or in CI"; [how]: "Tests live in your repo as YAML." |
| Positioned as alternative to Selenium/Cypress/Playwright | VERIFIED | [yc] | "Momentic is the modern alternative to Selenium, Cypress, and Playwright. We help software companies ship faster with reliable end-to-end tests that write themselves." |
| Founded 2023, YC W24, SF | VERIFIED | [yc] | "WINTER 2024"; "Founded: 2023"; "Location: San Francisco" |
| Founders Wei-Wei Wu (CEO) & Jeff An | VERIFIED | [yc] | "Wei-Wei Wu is a co-founder and CEO of Momentic"; "Jeff An … Founder" |
| Wu: ex-Assembled, founding eng Nashi (acq. Density 2021), staff eng Density | VERIFIED | [yc] | "Previously, he worked at Assembled … first employee and founding engineer at Nashi … acquired by Density in 2021"; launch: "staff engineer at Density, leading product engineering and product reliability" |
| An: ex-Splunk/Google/Robinhood; led testing Robinhood, enterprise quality Retool; Waterloo | VERIFIED | [yc] | "cloud and test infrastructure at companies like Splunk, Google, and Robinhood"; launch: "Jeff led testing at Robinhood and enterprise quality at Retool"; "University of Waterloo" |
| Founders' dev-tooling background (Qualtrics, WeWork; Wu on Node.js) | VERIFIED (third-party) | [tc] | "backgrounds in developer tooling at companies like Qualtrics and WeWork. (Wu is particularly proud of his contributions to the open source Node.js.)" — note: differs from YC bios; kept out of teardown body |

## FUNDING / SCALE

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| $15M Series A led by Standard Capital | VERIFIED | [home], [tc] | home banner: "ANNOUNCING OUR $15M SERIES A LED BY STANDARD CAPITAL"; [tc]: "raised $15 million in a Series A round led by Standard Capital" |
| Co-investors: Dropbox Ventures + existing YC, FCVC, Transpose Platform, Karman Ventures | VERIFIED (third-party) | [tc] | "with participation from Dropbox Ventures. Existing investors at Y Combinator, FCVC, Transpose Platform, and Karman Ventures also participated" |
| $3.7M seed in March 2025 | VERIFIED (third-party) | [tc] | "builds on a $3.7 million seed round, which the company announced in March" |
| 2,600 users; customers Notion, Xero, Bilt, Webflow, Retool | VERIFIED (third-party) | [tc] | "currently boasts 2,600 users … includes companies like Notion, Xero, Bilt, Webflow, and Retool" |
| ~200M test steps automated last month | VERIFIED (third-party) | [tc] | "in the last month, the company automated more than 200 million test steps" |
| Mobile launched August 2025 | VERIFIED (third-party) | [tc] | "launched support for mobile environments in August" |
| 1000+ engineer organizations | VERIFIED | [blog-intent] | "across 1000+ engineer organizations" |
| Team size ~12 | VERIFIED | [yc] | "Team Size: 12" |
| Customers incl. Poe/Quora, Pocus, Nuvo, Mutiny, CoverGo, Coframe, GPTZero | VERIFIED | [home] | testimonials + case studies on homepage |

## STACK

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| TypeScript primary, Python | VERIFIED | [gh] | org "Top languages: TypeScript Python JavaScript Dockerfile Shell" |
| CLI-first; npm distribution; cloud authoring deprecated | VERIFIED | [docs], [cfg] | "Momentic is CLI-first. Authoring and running tests in the cloud is deprecated; app.momentic.ai remains the dashboard"; cfg shows `npx momentic run` |
| Editor uses CodeMirror + TypeScript | INFERRED | [gh-cm] | org forks val-town/codemirror-ts: "lint, hover, and autocomplete extensions for CodeMirror + TypeScript" → low-code editor |
| Cache store: ClickHouse (ReplacingMergeTree, sparse PK, materialized view) | VERIFIED | [blog-ch] | "move our storage backend to ClickHouse"; "ClickHouse's ReplacingMergeTree"; "ClickHouse uses a sparse primary index"; "used a materialized view to precompute all of the available commit timestamps" |
| Migrated off Postgres + Redis | VERIFIED | [blog-ch] | "we stored the caches in a single table in Postgres"; "fully eliminate the Redis layer" |
| Browser: Chromium; managed runner | VERIFIED | [cmp-pw], [cfg] | cfg: "defaultBrowserType: Chromium"; cmp-pw: "executed on a managed runner" |
| Mobile: iOS sims / Android emulators, remote-hosted, regioned | VERIFIED | [docs], [cfg] | docs: "Local and remote simulators"; cfg `emulator.region`, "remote-hosted mobile emulators" |
| LLM layer managed, multi-provider, cross-provider failover, models unnamed | VERIFIED | [cmp-pw], [cfg-ai] | cmp-pw: "AI providers route with cross-provider failover behind a single managed surface"; cfg-ai: agents on "latest 2025 models" (no vendor) |
| Claude Agent SDK skill | VERIFIED | [gh-skills], [docs] | gh repo "skills": "Claude Agent SDK with a E2E testing tool"; docs: "npx skills add momentic-ai/skills, point your coding agent here" |
| CI: GitHub Actions, CircleCI orb, Bitrise | VERIFIED | [docs], [gh-orb] | docs examples: "GitHub Actions, CircleCI, and Bitrise workflows"; gh: "momentic-circleci-orb" |
| Five specialized agents, versioned independently | VERIFIED | [cfg-ai] | "Momentic uses several specialized AI agents. Each is versioned independently"; agents: locator, assertion, visual-assertion, text-extraction, failure-recovery |

## ARCHITECTURE — AGENT LOOP

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Lifecycle: prompt→context→action→verify→cache→replay→heal | VERIFIED | [how] | enumerated list "Prompt … Context … Action … Verification … Cache … Replay … Heal" |
| Agent reads DOM + a11y tree + screenshot | VERIFIED | [how], [finding] | how: "reads the page (DOM, accessibility tree, screenshot)"; finding: "Momentic's AI reads the DOM, the accessibility tree, and a screenshot of the viewport" |
| Replay from cache, no LLM call until change | VERIFIED | [how] | "On the next run, Momentic replays from cache, no LLM call, until something changes" |
| LLM invoked only when needed | VERIFIED | [how] | "the agent is only invoked when it's actually needed" |
| Multi-modal locator: screen position, look, text, a11y+structural attrs | VERIFIED | [cache], [cmp-pw] | "stores more than one way to find its target: where the element sits on screen, what it looks like, what text it contains, and the accessibility and structural attributes" |
| Signal weighting inferred from NL description | VERIFIED | [cache] | "Which of those signals matters … is inferred from the step's natural-language description"; red Cancel vs Sign in examples |
| Agentic act primitive; V3 planner-style, caches trajectory, self-heals | VERIFIED | [agentic] | "AI action is the primitive that powers agentic testing"; "V3 … a planner-style agent that drafts the full flow up front, caches the resolved steps … and self-heals" |

## ARCHITECTURE — CACHE PLANE (ClickHouse)

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Scaled 80k → ~1B cache entries | VERIFIED | [blog-ch], [blog-intent] | "from having around 80k active cache entries to now approximately 1B" |
| Postgres lock contention at scale | VERIFIED | [blog-ch] | "lock contention from queries trying to read and write to the cache concurrently" |
| Cache keyed by test ID, step ID, version, branch, commit timestamp | VERIFIED | [blog-ch] | "keyed by test ID, step ID, Momentic version, git branch, and commit timestamp" |
| Sparse PK narrows to few granules | VERIFIED | [blog-ch] | "ClickHouse uses a sparse primary index … narrow down the search space to just a few granules" |
| Main-branch scans 500k+ rows → materialized view of commit timestamps | VERIFIED | [blog-ch] | "searching over all entries … (potentially 500k+ rows)"; "materialized view to precompute all of the available commit timestamps" |
| Insert-only TTL via ReplacingMergeTree; eliminated Redis | VERIFIED | [blog-ch] | "switched to using only INSERTS combined with ClickHouse's ReplacingMergeTree"; "fully eliminate the Redis layer" |
| Migration: double-write → double-read consistency check → cutover | VERIFIED | [blog-ch] | "double writing caches to both Postgres and ClickHouse"; "Double read + consistency check"; "gradually cut over production traffic" |
| 2M+ cache queries/day, ~20B entries/day, ~250ms latency | VERIFIED | [blog-ch] | "over two million cache queries per day, processing almost 20 billion cache entries every day while maintaining ~250ms resolution latency on average" |
| 95%+ cache hit rate; 300ms cached vs >5s uncached | VERIFIED | [blog-intent] | "maintained a cache hit rate over 95% … execute steps in 300ms on average, while a completely uncached step takes over 5s due to LLM latency" |

## ARCHITECTURE — INTENT-BASED CACHING

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Four failure modes: cross-branch, cross-version, false miss, false hit | VERIFIED | [blog-intent] | section headers "Cache pollution across branches", "across Momentic versions", "False cache misses (validation too strict)", "False cache hits (validation too loose)" |
| Locator agent classifies attributes used + emits related elements | VERIFIED | [blog-intent] | "modified our element locator agent to classify which attributes it used in its reasoning … generate targets for all of the additional elements" |
| Two condition types: attributes + related elements | VERIFIED | [blog-intent] | "Attributes are properties of the element itself …"; "Related elements are other elements … used to identify their target" |
| Shift: "does it match what the user meant?" | VERIFIED | [blog-intent] | "stopped asking 'does this look like the element we saw before?' and started asking 'does this element still match what the user meant?'" |
| "the blue button" strictly enforces blue | VERIFIED | [blog-intent] | "if the user specifies 'the blue button,' we now strictly enforce that the button is blue" |
| 1M flakes flagged across 200M resolutions (Feb 2026) | VERIFIED | [blog-intent] | "In Feb 2026, our attribute-based invalidation flagged 1M potential flakes across 200M resolutions" |
| Git-aware cache seeding from merge base | VERIFIED | [cache], [blog-intent] | cache: "new branches seed from the cache at their merge base"; blog-intent: "seeding their caches with the latest values from the merge base commit on main" |
| Version isolation: CLI uses only caches ≤ its own version | VERIFIED | [blog-intent] | "they could only use caches generated by versions less than or equal to their own version" |

## ARCHITECTURE — HEALING & APP GRAPH

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| In-run heal ephemeral; persists only as cache when eligible | VERIFIED | [heal] | "In-run auto-healing … fixes are ephemeral: they never edit your test files, and they persist only as step-cache entries when the run is eligible to save cache" |
| Post-run triage agent rewrites tests, opens PR/patch | VERIFIED | [heal] | "Post-run triage agent (momentic ai triage) runs after a failed run, permanently rewrites the failing tests, and opens a pull request (or emits a patch)" |
| Heal honors PULL_REQUEST_TEMPLATE.md | VERIFIED | [heal] | "uses your repository's .github/PULL_REQUEST_TEMPLATE.md (if present)" |
| App graph fingerprints state (canonical URL + minhashed DOM), embeds summary, clusters | VERIFIED | [graph] | "fingerprinted (canonical URL plus a normalized, minhashed view of the DOM)"; "A short semantic summary of each state is embedded"; "clustered into a taxonomy of product areas, features, journeys, variants" |
| Coverage states: Covered/Partial/Quarantined/Missing/Ignored | VERIFIED | [graph] | status table |

## PROCESS

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Cloud authoring deprecated; dashboard for results/keys/integrations | VERIFIED | [docs] | "Authoring and running tests in the cloud is deprecated; app.momentic.ai remains the dashboard for results, settings, API keys, and integrations" |
| Migration from outsourced QA to engineering-owned tests | VERIFIED | [blog] | post title "A Migration Guide To Go From Outsourced QA To Engineering-Owned Tests" |
| "Truth-driven development"; "you cannot verify what you cannot reason" | VERIFIED | [blog] | posts "Speed at the Cost of Quality" ("truth-driven development … at Cursor speed") and "You cannot verify what you cannot reason" |
| Cache save eligibility: CI always; local only off main/protected | VERIFIED | [cache] | "CI runs (CI=true) are always eligible. Local runs are eligible when the current branch is not the main branch or a protected branch." |
| Heal output configurable: PR/draft/commit/patch/disk | VERIFIED | [heal] | "On successful heal" table: Pull request, Draft pull request, Direct commit, Patch, Leave on disk |

## TEAM / HIRING

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Henry Haefliger — engineer (authored caching posts) | VERIFIED | [blog-ch], [blog-intent] | byline "Henry Haefliger" on both engineering posts |
| Open roles: founding AE + SDR (GTM, SF, on-site) | VERIFIED | [ashby] | "Founding Account Executive, Mid-Market … San Francisco … On-site"; "Founding Sales Development Representative" |
| Founding Engineer (Frontend) role | VERIFIED | [yc] | "Founding Engineer (Frontend) … San Francisco … $150K - $220K … 0.50% - 1.00%" |

## SPECULATIVE (labeled in teardown)

| Claim | Tier | Basis |
| --- | --- | --- |
| LLM providers OpenAI+Anthropic+Google routed | SPECULATIVE | failover [cmp-pw] implies ≥2 vendors; Anthropic verified only for skill [gh-skills] |
| App-graph embeddings via hosted API | SPECULATIVE | "embedded" [graph]; no in-house model signal on ~12-person team |
| S3-class artifact store | SPECULATIVE | dashboard serves videos/traces [cmp-pw]; object storage default |
| Postgres retained for app/org/auth data | SPECULATIVE | only cache moved to ClickHouse [blog-ch] |
| Hosting AWS/GCP + managed ClickHouse | SPECULATIVE | multi-region runner + ClickHouse scale; low-ops for ~12 people |
| Auth SSO (SAML/OIDC) + API keys | INFERRED | "custom SSO" [yc]; MOMENTIC_API_KEY [cfg] |
