# zalizniak.com

The source for [zalizniak.com](https://zalizniak.com) — Oleksandr Zalizniak's
personal site, built with [Astro Starlight](https://starlight.astro.build/) and
deployed to AWS Amplify. One site, two parts:

- **Landing page** (`src/content/docs/index.mdx`) — the personal profile: what
  I'm building, background, and links. Rendered as a normal doc page so it keeps
  the sidebar and in-page table of contents.
- **Applied AI Teardowns** (`src/content/docs/teardowns/`) — a library of
  architecture teardowns of applied-AI startups, reconstructed from public
  signals only (job postings, blogs, docs, product behavior). Audience: engineers.

## Run locally (Node 20+)

```
npm install      # install dependencies
npm run dev      # dev server at localhost:4321
npm run build    # static build to dist/
```

## Deploy

Hosting is Terraform-managed in [`infra/`](infra/) — an AWS Amplify app that
builds from `main` on every push and serves at the apex + `www`. See
[`infra/README.md`](infra/README.md).

## Teardowns: evidence rules

Teardown entries are **dense, evidenced inference** — never opinion or insider
info. Every factual claim cites a live public source (with the supporting quote
recorded in a per-company evidence map), and every claim carries a confidence
tier — *verified*, *inferred*, or *speculative* — kept visually distinct and
never presented as fact. Authoring spec and section order live in
[`CLAUDE.md`](CLAUDE.md); contribute one markdown file per company under
`src/content/docs/teardowns/`.
