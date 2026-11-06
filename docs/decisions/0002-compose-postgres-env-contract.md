# 0002 — Compose Postgres + env contract

- Status: Accepted
- Date: 2026-11-06
- Issue: #7

## Context

Later milestones need migrations (M10) and a full local stack (M12). The seed must reserve stable service names and a credentials pattern before Nest or web images exist.

## Decision

- Use Docker Compose (`compose.yaml`) with service names **`db`**, **`api`**, and **`web`**.
- Ship **`db`** now (Postgres 16, healthcheck, named volume, `pack` bridge network).
- Keep credentials and ports in **`.env` / `.env.example`** — non-default user/password/db (`pack` / `pack_dev_change_me` / `pack_challenge`), never bake secrets into the compose file.
- Host apps use `DATABASE_URL` → `localhost`; future in-compose `api` uses hostname **`db`**.

## Consequences

- M10/M12 can attach without renaming services.
- Local-only defaults are fine for the take-home; production secrets stay out of the repo.
- Full `api`/`web` images remain out of scope until M12.
