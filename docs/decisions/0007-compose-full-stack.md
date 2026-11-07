# 0007 — Compose full-stack Postgres + API + web

- Status: Accepted
- Date: 2026-11-07
- Issue: #80

## Context

ADR 0002 reserved Compose service names `db` / `api` / `web` and the env credential contract, but left Nest and SvelteKit images for M12. Pack evaluators need a **1–2 command** path that brings up Postgres, a migrated API, and a reachable UI.

## Decision

- Ship multi-stage **Dockerfiles** for `apps/api` and `apps/web` built from the monorepo root context.
- Compose services:
  - **`db`** — Postgres 16 (unchanged healthcheck contract)
  - **`api`** — depends on healthy `db`; entrypoint runs Drizzle runtime migrate then Nest; volume for `FILE_STORAGE_ROOT`; `GET /health` for Compose healthchecks; in-compose `DATABASE_URL` host = `db`
  - **`web`** — depends on healthy `api`; Vite preview after build; bake `PUBLIC_API_URL` for the **browser** (host `localhost`, not Docker DNS `api`)
- Evaluator path: `cp .env.example .env && docker compose up --build`

## Consequences

- Host-only `pnpm` + `db` remains valid for contributors; Compose is the Pack demo path.
- CORS is enabled on Nest so the published web origin can call the published API.
- ADR 0002 stays Accepted (names/env); this ADR locks the full-stack image + migrate entrypoint approach.
