FROM imbios/bun-node:latest-current-debian AS deps

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get -y update && \
  apt-get install -yq openssl git ca-certificates tzdata && \
  ln -fs /usr/share/zoneinfo/Asia/Makassar /etc/localtime && \
  dpkg-reconfigure -f noninteractive tzdata
WORKDIR /app

COPY package.json bun.lock tsconfig.json ./
RUN bun install --frozen-lockfile

FROM deps AS builder

WORKDIR /app

COPY . .

FROM imbios/bun-node:latest-current-slim AS runner

WORKDIR /app

COPY --from=deps /app/node_modules node_modules

ENV NODE_ENV=production

COPY --from=builder /app/package.json .
COPY --from=builder /app/tsconfig.json .
COPY --from=builder /app/src src

CMD [ "bun", "run", "start" ]