# zalizniak.com

The source for [zalizniak.com](https://zalizniak.com) — Oleksandr Zalizniak's
personal site, built with [Astro Starlight](https://starlight.astro.build/) and
deployed to AWS Amplify.

- **Landing page** (`src/content/docs/index.mdx`) — the personal profile: what
  I'm building, background, and links. Rendered as a normal doc page so it keeps
  the sidebar.

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
