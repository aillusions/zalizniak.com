# Diagram sources

Mermaid sources for site diagrams. Rendered to committed SVG under
`public/diagrams/<section>/`. `mermaid-theme.json` is the shared theme (font,
palette, spacing) — always render with it so diagrams stay consistent.

Render one diagram:

```sh
npx mmdc -c diagrams/mermaid-theme.json -b transparent \
  -i diagrams/system-design/architecture.mmd \
  -o public/diagrams/system-design/architecture.svg
```

Re-render a whole directory:

```sh
for f in diagrams/system-design/*.mmd; do
  n=$(basename "$f" .mmd)
  npx mmdc -c diagrams/mermaid-theme.json -b transparent \
    -i "$f" -o "public/diagrams/system-design/$n.svg"
done
```

Requires `@mermaid-js/mermaid-cli` (a devDependency). This is the interim
manual render; the planned render-and-commit GitHub Action should use the same
`mermaid-theme.json`.
