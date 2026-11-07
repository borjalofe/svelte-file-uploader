# 0006 — Nest multipart create + local filesystem store

- Status: Accepted
- Date: 2026-11-07
- Issue: #69

## Context

#68 locked Drizzle + the `resources` table. #69 needs Nest `POST /resources` multipart create with shared Zod validation and durable file bytes. Cloud storage is deferred to M13.

## Decision

- Bootstrap **NestJS** in `apps/api` (`AppModule` + `ResourcesModule`).
- Validate create payloads with **`resourceCreateSchema`** from `@pack-challenge/domain`.
- Store objects on the **local filesystem** under `FILE_STORAGE_ROOT` (default `var/file-store`), outside web static roots.
- Object keys are **`resources/<uuid>.<ext>`** from allowlisted MIME — never from client path segments; reject absolute keys and `..` traversal.
- Persist metadata with **Drizzle** against the #68 schema when `DATABASE_URL` is set; use an in-memory repository for CI unit tests without Postgres.

## Consequences

- Upload security depends on Zod allowlists + random keys + rooted path resolution.
- List/search/download (#70–#72) reuse the same store and Drizzle schema.
