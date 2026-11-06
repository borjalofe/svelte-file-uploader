# 0004 — Theme CSS emit (`:root` / `.dark` / `@theme inline`)

- Status: Accepted
- Date: 2026-11-06
- Issue: #18

## Context

Semantic and extension tokens must become Tailwind v4 utilities (`bg-primary`, …) for Storybook and `@pack-challenge/ui`. ADR 0003 already chose Style Dictionary → gitignored `dist/theme.css`. This record locks the **shape** of that file and how UI consumes it.

## Decision

1. **Generate on build** — do not commit `packages/tokens/dist/theme.css`. `pnpm tokens:build` (and UI `storybook` / `dev` / `build` scripts) regenerate it.
2. Custom format **`css/pack-theme`**:
   - `:root` — full token dump (primitives + short semantic/extension names)
   - `.dark` — same short **colors** only (light-only product look; no separate dark palette yet)
   - `@theme inline` — `--color-{name}: var(--{name})` plus radius/fonts so Tailwind emits utilities
3. UI imports `@pack-challenge/tokens/theme.css` from `layout.css`; Storybook preview loads that CSS and wraps stories in a tokenized decorator.
4. Components must use semantic/extension utilities — **no raw hex** in component styles.

## Consequences

- Clone → Storybook requires a tokens build first (scripted).
- Extension status colors (#17) ride the same emit.
- Dark UI remains a deferred review (`[review] Dark theme primitive aliases`); `.dark` is a compatibility alias today.
