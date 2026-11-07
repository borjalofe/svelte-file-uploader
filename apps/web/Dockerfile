# SvelteKit web image — build with PUBLIC_API_URL, serve via vite preview (Compose `web`).
FROM node:22-bookworm-slim AS base
WORKDIR /app
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@11.18.0 --activate

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/
COPY packages/domain/package.json packages/domain/
COPY packages/tokens/package.json packages/tokens/
COPY packages/ui/package.json packages/ui/
RUN pnpm install --frozen-lockfile --filter @pack-challenge/web...

FROM deps AS build
ARG PUBLIC_API_URL=http://localhost:3000
ENV PUBLIC_API_URL=$PUBLIC_API_URL
COPY apps/web apps/web
COPY packages/domain packages/domain
COPY packages/tokens packages/tokens
COPY packages/ui packages/ui
RUN pnpm tokens:build \
	&& pnpm --filter @pack-challenge/web exec svelte-kit sync \
	&& pnpm --filter @pack-challenge/web build

FROM build AS runtime
ENV NODE_ENV=production
ENV WEB_PORT=5173
ENV HOST=0.0.0.0
EXPOSE 5173
CMD ["sh", "-c", "pnpm --filter @pack-challenge/web exec vite preview --host 0.0.0.0 --port ${WEB_PORT:-5173}"]
