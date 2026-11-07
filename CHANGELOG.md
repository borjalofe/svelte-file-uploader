# Changelog — Pack product slice (`svelte-file-uploader`)

Preprod product SemVer: **`0.y.z` only**. This is **not** a production `1.x` release.

The design-system package `@pack-challenge/ui` was cut separately at **`0.1.0`** (`@pack-challenge/ui@0.1.0`). This document tracks the **product** slice (domain + Nest API + web + Compose).

## [0.2.0] — 2026-11-07

Preprod tag: **`v0.2.0`**

Upload / list / search / download + Compose full-stack delivery for Pack evaluators.

### Domain

- Shared Zod Resource create/list schemas and constants in `@pack-challenge/domain` (title/description caps, roles, category/language/provider, file MIME/size allowlists)

### API (`apps/api`)

- Drizzle `resources` migration mapped to domain Zod (enums, file pointer, timestamps)
- `POST /resources` multipart create + local filesystem object store (`FILE_STORAGE_ROOT`, random keys, no path traversal)
- `GET /resources` list with safe file meta (no public FS paths)
- `GET /resources?q=` search on title **or** description (`ILIKE`)
- `GET /resources/:id/file` download by id (fail-closed 404)
- `GET /health` for Compose healthchecks
- CORS for host browser → published API

### Web (`apps/web`)

- Live Resources page composing Pack UI organisms
- List/search wired to Nest (`q`); filter tabs use dataset counts (Pack rule)
- Upload dialog → `POST /resources`
- Row click → `GET /resources/:id/file` + success Toast

### Delivery / CI

- Compose **`db` + `api` + `web`**: `cp .env.example .env && docker compose up --build`
- API migrates on container start; web preview with baked `PUBLIC_API_URL`
- PR gate jobs **`api`** (ephemeral Postgres) and **`web`** (lint/test/typecheck)

### Decisions

- ADR 0005 — Drizzle resources migration
- ADR 0006 — Nest multipart + local file store
- ADR 0007 — Compose full-stack images + evaluator path

### Notes

- Packages remain **`private: true`**; no npm publish in this tag flow
- UI package surface unchanged at **0.1.0** (see `packages/ui/CHANGELOG.md`)
