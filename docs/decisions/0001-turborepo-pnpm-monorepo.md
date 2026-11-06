# 0001 — Turborepo + pnpm monorepo

- Status: Accepted
- Date: 2026-11-06
- Issue: #5

## Context

The Pack take-home needs a shared Svelte design-system package, a SvelteKit web app, a Nest API, and shared domain types — coordinated from one repo with one install path.

## Decision

Use a **pnpm** workspace with **Turborepo** task orchestration:

- Apps: `apps/web` (SvelteKit), `apps/api` (Nest stub)
- Packages: `packages/ui` (`@pack-challenge/ui`), `packages/domain` (`@pack-challenge/domain`)
- Canonical package manager: **pnpm** (lockfile committed)

## Consequences

- All later CI and feature work assumes this layout and `pnpm` scripts at the repo root.
- Shared packages are consumed via `workspace:*`.
- Storybook and Vitest for the design system live on `@pack-challenge/ui`.
