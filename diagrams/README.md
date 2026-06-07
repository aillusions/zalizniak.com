# Diagram sources

Mermaid sources for teardown diagrams. Rendered to committed SVG under
`public/diagrams/<company>/`. `mermaid-theme.json` is the shared theme (font,
palette, spacing) — always render with it so diagrams stay consistent.

Render one diagram:

```sh
npx mmdc -c diagrams/mermaid-theme.json -b transparent \
  -i diagrams/pallet/architecture.mmd \
  -o public/diagrams/pallet/architecture.svg
```

Re-render all of a company's diagrams:

```sh
for f in diagrams/pallet/*.mmd; do
  n=$(basename "$f" .mmd)
  npx mmdc -c diagrams/mermaid-theme.json -b transparent \
    -i "$f" -o "public/diagrams/pallet/$n.svg"
done
```

Requires `@mermaid-js/mermaid-cli` (a devDependency). This is the interim
manual render; the planned render-and-commit GitHub Action should use the same
`mermaid-theme.json`.
