# Nest API image — migrate on start, then listen (Compose service `api`).
FROM node:22-bookworm-slim AS base
WORKDIR /app
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@11.18.0 --activate

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/
COPY packages/domain/package.json packages/domain/
RUN pnpm install --frozen-lockfile --filter @pack-challenge/api...

FROM deps AS runtime
COPY apps/api apps/api
COPY packages/domain packages/domain
COPY apps/api/docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV NODE_ENV=production
ENV API_PORT=3000
ENV FILE_STORAGE_ROOT=/data/file-store
EXPOSE 3000
VOLUME ["/data/file-store"]

ENTRYPOINT ["/entrypoint.sh"]
