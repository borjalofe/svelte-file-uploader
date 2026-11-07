# 0008 — Cloud object storage with local fallback

- Status: Accepted
- Date: 2026-11-07
- Issue: #84

## Context

#69 locked Nest multipart create against a local filesystem store (`FILE_STORAGE_ROOT`). M13 needs durable cloud objects for real deployments while keeping a working local/Compose path without cloud credentials.

## Decision

- Introduce a **`FileStore`** interface (`write` / `exists` / `openReadStream` / `delete`) shared by local and cloud backends.
- **`FILE_STORAGE_DRIVER=local|s3`** (default `local`).
- When `s3` and **complete** credentials (`S3_BUCKET` + `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`, optional `S3_REGION` / `S3_ENDPOINT` / `S3_PREFIX` / `S3_FORCE_PATH_STYLE`): use **S3-compatible** primary (`@aws-sdk/client-s3`) wrapped in **`FallbackFileStore`** with local secondary.
- When `s3` but credentials incomplete: **fall back to local only** (logged).
- Runtime write failures against the primary also fall back to local; reads check primary then secondary.
- Object keys remain **`resources/<uuid>.<ext>`** (optional `S3_PREFIX`); **no public ACL** — private bucket defaults only.
- Credentials stay in env; never bake secrets into images or compose.

## Consequences

- Compose/evaluator path stays local with zero cloud setup.
- Production can point at S3/MinIO/R2 via env without code changes.
- Objects written during a cloud outage land on local disk under the same relative key — operators must reconcile if both backends are used long-term.
