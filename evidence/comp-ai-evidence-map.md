# Comp AI — evidence map

Sourced 2026-06-10. Unusually, **the entire product is open source** (`github.com/trycompai/comp`, AGPL-3.0) — so most architecture/stack rows are **VERIFIED from the actual code** (read from a shallow clone at commit state of 2026-06-09), not inferred. Product/positioning from the website (trycomp.ai); funding/founders from Comp AI's own pre-seed announcement + press.

## Source keys
- [repo] https://github.com/trycompai/comp  (AGPL-3.0 monorepo; read locally)
- [readme] repo `README.md`
- [pkg] repo `package.json` + per-app/package `package.json`
- [spec] repo `packages/device-agent/SPEC.md`
- [schema] repo `packages/db/prisma/schema/*.prisma`
- [trigger] repo `apps/app/src/trigger/**` (Trigger.dev tasks)
- [embed] repo `apps/app/src/lib/embedding/index.ts`
- [home] https://trycomp.ai/
- [seed] https://trycomp.ai/hub/comp-ai-pre-seed-round  (pre-seed announcement, Jul 28 2025)

---

## WHAT THEY DO

| Claim | Tier | Source | Quote/Evidence |
| --- | --- | --- | --- |
| Open-source AI-native compliance/GRC platform; Vanta & Drata alternative | VERIFIED | [repo], [readme] | repo description: "AI Native platform to get companies compliant - Vanta & Drata Alternative"; README "The open-source compliance platform" |
| Frameworks: SOC 2, ISO 27001, HIPAA, GDPR, FedRAMP | VERIFIED | [home] | "SOC 2, ISO 27001, HIPAA, and GDPR"; "From FedRAMP to any other framework" |
| 580+ integrations; 700+ companies; 4.9/5 | VERIFIED | [home] | "580+ integrations"; "Trusted by 700+ companies"; "4.9/5" |
| Automates evidence collection, policy generation, continuous monitoring | VERIFIED | [home], [readme] | "automates evidence collection, policy management, and control implementation" |
| AGPL-3.0; 1,620★ / 323 forks; created Jan 2025; TypeScript | VERIFIED | [repo] | GitHub API metadata |
| "automate up to 90% of the process" | VERIFIED | [seed] | "applying cutting-edge AI to automate up to 90% of the process" |

## MONOREPO / STACK (verified from code)

| Claim | Tier | Source | Evidence |
| --- | --- | --- | --- |
| Turborepo + Bun monorepo (bun@1.3.4) | VERIFIED | [pkg] | `turbo.json`, `bun.lock`, `"packageManager":"bun@1.3.4"` |
| apps: app, api, portal, framework-editor, mcp-server | VERIFIED | [repo] | `apps/` dirs |
| packages: auth, db, device-agent, integration-platform, integrations, billing, kv, email, analytics, ui, company | VERIFIED | [repo] | `packages/` dirs |
| Web app = Next.js + React 19 | VERIFIED | [pkg] | `apps/app` deps: `next`, react 19, `eslint-config-next` |
| API = NestJS + Express + Swagger | VERIFIED | [pkg] | `apps/api` deps: `@nestjs/platform-express`, `express`, `swagger-ui-express` |
| DB = Postgres + Prisma (adapter-pg) | VERIFIED | [pkg], [readme] | `@prisma/adapter-pg`, `@prisma/client`; README "Postgres (>=15.x)" |
| Background jobs = Trigger.dev v4 (4.4.3) | VERIFIED | [pkg], [readme] | `@trigger.dev/sdk` 4.4.3; README "Built With Trigger.dev"; `deploy:trigger-prod` |
| Cache/ratelimit = Upstash Redis + Ratelimit | VERIFIED | [pkg] | `@upstash/redis`, `@upstash/ratelimit` |
| Vector store = Upstash Vector | VERIFIED | [pkg], [embed] | `@upstash/vector`; embedding lib uses `Index` from `@upstash/vector` |
| AI via Vercel AI SDK + AI Gateway | VERIFIED | [pkg], [trigger] | `ai` ^5; `@ai-sdk/gateway`; `createGateway` from '@ai-sdk/gateway' |
| LLM providers: OpenAI, Anthropic, Google, Groq | VERIFIED | [pkg] | `@ai-sdk/{openai,anthropic,google,groq}` |
| Embedding model: OpenAI text-embedding-3-large (1536-dim in tests) | VERIFIED | [trigger], [embed] | `EMBEDDING_MODEL = 'text-embedding-3-large'`; embedMany via @ai-sdk/openai |
| Onboarding model: google/gemini-3-flash | VERIFIED | [trigger] | `ONBOARDING_MODEL = 'google/gemini-3-flash'` |
| Rerank model: google/gemini-3.1-flash-lite-preview | VERIFIED | [trigger] | `RERANK_MODEL = 'google/gemini-3.1-flash-lite-preview'` |
| Also uses anthropic/claude-sonnet-4.6 | VERIFIED | [trigger] | `gateway('anthropic/claude-sonnet-4.6')` |
| AI usage is structured-output-first | VERIFIED | [repo] | grep counts: 57 `generateObject`, 27 `generateText`, 27 `embed/embedMany`, 7 `streamText`, 32 `gateway` |
| Cloud evidence engine = ~60 AWS service SDK clients + Azure | VERIFIED | [pkg] | `apps/api` deps list ~50+ `@aws-sdk/client-*`; `@azure/identity` in `packages/integrations` |
| Browser automation = Browserbase + Playwright + Puppeteer | VERIFIED | [pkg], [schema] | `playwright-core`, `puppeteer-core`; models `BrowserAutomation`, `BrowserAutomationRun`, `BrowserbaseContext` |
| Storage = AWS S3 | VERIFIED | [pkg] | `@aws-sdk/client-s3`, `s3-request-presigner` |
| Auth = better-auth (org-scoped, OAuth, API keys) | VERIFIED | [pkg], [schema] | `better-auth` 1.4.22; models Account/Session/Member/Organization/Oauth*/ApiKey/Jwks |
| Notifications = Novu; errors = Sentry | VERIFIED | [pkg] | `@novu/nextjs`, `@sentry/nextjs` |
| Billing = Stripe | VERIFIED | [schema] | models `StripeWebhookEvent`, `OrganizationBilling*`, `Billing*Event` |
| Deploy: Vercel (app) + Docker/AWS CodeBuild (self-host) | VERIFIED | [repo] | Vercel OSS badge; `Dockerfile`, `docker-compose.yml`, `buildspec.yml`, `SELF_HOSTING.md` |
| Self-hostable | VERIFIED | [repo] | `SELF_HOSTING.md`, docker-compose |

## DEVICE AGENT (verified from SPEC + code)

| Claim | Tier | Source | Evidence |
| --- | --- | --- | --- |
| Custom Electron system-tray app; replaced FleetDM | VERIFIED | [spec] | "custom Electron-based system tray application that replaces the previous FleetDM-based device compliance system" |
| Runs 4 checks every hour: disk encryption, antivirus, password policy, screen lock | VERIFIED | [spec] | "runs four compliance checks every hour: Disk Encryption… Antivirus… Password Policy… Screen Lock" |
| Cross-platform: FileVault/BitLocker/LUKS; XProtect/Defender/ClamAV; 8-char pw; 15-min lock | VERIFIED | [spec] | per-check platform detail |
| Auto-remediation; platform-specific checks (macos/windows/linux dirs) | VERIFIED | [spec], [repo] | `src/checks/{macos,windows,linux}`, `src/remediations/*` |
| Direct DB registration via portal API; Postgres via Prisma | VERIFIED | [spec] | architecture table |
| Built with electron-vite + electron-builder | VERIFIED | [repo] | `electron.vite.config.ts`, `electron-builder.config.js` |

## AI FEATURES (verified from trigger tasks + schema)

| Claim | Tier | Source | Evidence |
| --- | --- | --- | --- |
| Onboarding auto-builds the program: generate full policies, risk/vendor mitigations, link risks/vendors to work | VERIFIED | [trigger] | tasks: `onboard-organization`, `generate-full-policies`, `generate-risk-mitigation`, `generate-vendor-mitigation`, `link-risks-and-vendors-to-work` |
| Policies generated from org onboarding Q&A context + framework, per-business | VERIFIED | [trigger], [home] | `generate-full-policies` uses `getOrganizationContext` (Q&A) + framework instances; home: "generate every policy from the context you provide" |
| Citations: select mitigation citations, build citation headings | VERIFIED | [trigger] | `select-mitigation-citations.ts`, `build-citations-heading.ts` |
| Embeddings link risks/vendors/tasks per org; semantic similarity | VERIFIED | [embed] | `EntityKind = 'risk'|'vendor'|'task'`, `findSimilarTasks`, `upsertEntityEmbeddings` |
| AI cloud-security remediation: preview → execute, batched, retry | VERIFIED | [trigger] | `cloud-security/` remediate-preview, remediate-single, remediate-batch, execute-result, retry-preview |
| Scheduled integration checks (evidence) + vendor risk scoring + research | VERIFIED | [trigger] | `integration/run-integration-tests`, `integration-schedule`; `scrape/score-vendor-risk`, `scrape/research` |
| AI-written browser tests: NL → daily browser verification + screenshot, auditable | VERIFIED | [home], [schema] | home: "give it browser instructions… AI opens a browser, verifies the control, and screenshots the result… auditable and logged"; models BrowserAutomation/Run |
| MCP server (Anthropic MCP bundle); org binding | VERIFIED | [pkg], [schema] | `apps/mcp-server` uses `@anthropic-ai/mcpb`; model `McpOrgBinding` |
| Data model spans full GRC: Control, Policy/Version, Task, Risk, Finding*, EvidenceAutomation*, FrameworkInstance, FrameworkEditor* templates, RequirementMap, CustomFramework, SOA*, Trust*, Vendor, Device, Questionnaire, Pentest | VERIFIED | [schema] | ~120 Prisma models enumerated |
| Cross-framework mapping: control library + many-to-many requirement maps + framework editor | VERIFIED | [schema], [repo] | `RequirementMap`, `FrameworkControl{Policy,Task,DocumentType}Link`, `FrameworkEditor*`, `apps/framework-editor` |
| Trust center: live-monitored, only verified controls/published policies shown | VERIFIED | [home], [schema] | home point 05; models Trust/TrustDocument/TrustAccessGrant/TrustResource |
| Team dogfoods AI coding agents | VERIFIED | [repo] | ships `.claude/skills`, `.cursor/skills`, `.codeium/windsurf`, `opencode.json`, `AGENTS.md`, `.mcp.json`, `skills-lock.json` |
| Release: semantic-release + conventional commits + Discord notifier | VERIFIED | [pkg] | semantic-release* deps, commitlint, `semantic-release-discord` |

## FOUNDERS / FUNDING / TRACTION

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Co-founders: Mariano Fuentes, Lewis Carhart, Claudio Fuentes | VERIFIED | [seed] | "Our founding team (left to right: Mariano Fuentes, Lewis Carhart, Claudio Fuentes)… experienced Silicon Valley VC-backed founders" |
| Founders felt SOC 2 pain at previous startups | VERIFIED | [seed] | "first-hand experience going through the pains of achieving SOC 2 compliance at their previous startups" |
| $2.6M pre-seed, co-led by OSS Capital + Grand Ventures (Jul 28 2025) | VERIFIED | [seed] | "secured $2.6 million in pre-seed funding… co-led by OSS Capital and Grand Ventures" |
| Angels: David Cramer (Sentry founder), Ben Tossell (Ben's Bites) | VERIFIED | [seed] | "Additional participation comes from Sentry founder David Cramer and Ben Tossell of Ben's Bites" |
| Launched from stealth April 2025 | VERIFIED | [seed] | "Since launching from stealth in April 2025" |
| Traction: first customers saved 2,500+ hrs; 3,500+ companies in pre-launch; 89%+ avg monthly growth | VERIFIED | [seed] | quoted figures |
| Vercel Spring '25 OSS initiative | VERIFIED | [seed], [readme] | "participated in the Vercel Spring '25 OSS initiative"; Vercel OSS badge |
| Mission: help 100,000 companies get compliant; "Vercel of compliance" | VERIFIED | [seed] | "mission of helping 100,000 companies achieve compliance"; press positioning |
| OSS Capital = Joseph Jacks; Grand Ventures = Nathan Owen (GP) | VERIFIED | [seed] | investor quotes |
| AI Agent studio: customer-deployable agents for evidence/risk/vendor onboarding (beta→GA) | VERIFIED | [seed] | "Launching our AI Agent studio… deploy agents that automate evidence collection, risk assessments, and vendor onboarding" |
| 1:1 Slack support, in-house experts respond <3 min | VERIFIED | [home] | "Our in-house experts respond in under 3 minutes" |
| ~10 people | INFERRED | pipeline scouting | small early team; headcount not stated first-party |
| HQ location | UNKNOWN | — | not stated; founders described as Silicon Valley; team is remote/open-source |

## SPECULATIVE / INFERRED (labeled in teardown)

| Claim | Tier | Basis |
| --- | --- | --- |
| Cloud-evidence checks run on a schedule via Trigger.dev, write Findings + track regressions | INFERRED | `integration-schedule` task + Finding/FindingRegression models; exact cadence per-integration |
| AI browser tests = NL → Playwright/codegen executed in Browserbase sessions, screenshots to S3 | INFERRED | BrowserAutomation + Browserbase models + playwright/puppeteer + S3; codegen path not fully read |
| Multi-tenant, org-scoped isolation via better-auth Organization | INFERRED | better-auth org model + `organizationId` scoping in embedding/trigger code |
| AI Gateway routes cheap bulk → Gemini Flash, harder reasoning → Claude Sonnet | INFERRED | model constants (Gemini for onboarding/rerank) + claude-sonnet-4.6 usage; routing policy not centrally documented |
