# 0005 — Drizzle for Resources migrations

- Status: Accepted
- Date: 2026-11-07
- Issue: #68

## Context

M10 needs a `resources` table that mirrors `@pack-challenge/domain` Zod (`resourceSchema`): metadata, roles multi, flattened file pointer, timestamps. Compose Postgres is already up (`DATABASE_URL`); Nest modules land in later issues. We need one migration path that Nest can keep using without a second schema source of truth.

## Decision

- Use **Drizzle ORM** + **drizzle-kit** in `apps/api` for schema and SQL migrations.
- Map columns from domain constants/enums (title/description caps, category/language/provider enums, `roles` text[], file metadata, unique `storage_path`, `timestamptz`).
- Apply with `pnpm --filter @pack-challenge/api db:migrate` against host `DATABASE_URL` (Compose service `db`).
- Keep `storage_path` internal (API exposes resource id, not public FS paths).

## Consequences

- Nest create/list/search/file (#69–#72) reuse the same Drizzle schema under `apps/api/src/db/`.
- Prisma / TypeORM / raw-only migrate runners are out of scope unless a later ADR replaces this.
- CI may later add an API job that runs migrate against ephemeral Postgres (#73).
