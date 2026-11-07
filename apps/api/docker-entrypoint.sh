#!/bin/sh
set -eu

echo "Applying Drizzle migrations…"
pnpm --filter @pack-challenge/api db:migrate:runtime

echo "Starting Nest API on :${API_PORT:-3000}"
exec pnpm --filter @pack-challenge/api start
