# 0003 — Token validation + theme emit pipeline

- Status: Accepted
- Date: 2026-11-06
- Issue: #13

## Context

M2 needs DTCG-style sources under `tokens/**` that later map to shadcn CSS variables. CI must fail on broken aliases and refuse unsafe semantic/radius shapes before any UI consumes generated theme CSS.

JSON Schema alone cannot follow `{alias}` references or enforce Pack-specific forbidden paths.

## Decision

- Keep token **sources** at repo-root `tokens/**` (DTCG `$value` / `$type`).
- Validate with a small Node tool in `@pack-challenge/tokens`: resolve aliases (missing + cycles), ban `color.text|action|surface.elevated|focus`, ban primitive `radius.sm|md|lg`.
- Emit CSS custom properties with **Style Dictionary** (`pnpm tokens:build` → `packages/tokens/dist/theme.css`, gitignored).
- Gate PRs with job **`tokens`** running `pnpm tokens:check` (validate + emit).

## Consequences

- Later `[token]` PRs inherit a hard CI contract; invalid aliases cannot merge quietly.
- Theme CSS is build output, not hand-edited source (refined further when `:root` / `.dark` / `@theme` land).
- Style Dictionary is the emit engine; Pack guardrails stay in custom validation, not only SD defaults.
