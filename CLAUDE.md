# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio website for Oleksandr Zalizniak, served at https://zalizniak.com/. It is a single static page — there is no build step, no package manager, no test suite, and no backend.

## Structure

The entire site is `index.html`: a self-contained file with all CSS in a `<style>` block in the `<head>` and all JavaScript in inline `<script>` tags before `</body>`. Supporting assets are the favicons (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`). The resume PDF and profile image are hosted externally (referenced by absolute URL), not in this repo.

## Working in this repo

- Preview changes by opening `index.html` directly in a browser — there is nothing to build or serve.
- Theming is driven by CSS custom properties on `:root` and `[data-theme="light"]`. The toggle script reads/writes the chosen theme to `localStorage` and swaps the moon/sun icon; keep both the CSS variable set and the icon `setIcon` logic in sync when changing themes.
- The email address is assembled at runtime by the inline script (splitting on `@`) as basic scrape protection — don't hardcode the full address into the markup.

## Deployment

The repo (`aillusions/zalizniak.com`) is the source for the live site at the custom domain. There is no deployment config committed here, so confirm the publishing mechanism before assuming a push goes live — but treat changes to `main` as potentially production-facing.