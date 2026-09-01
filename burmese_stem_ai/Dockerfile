# syntax=docker/dockerfile:1

# -----------------------------
# Install dependencies
# -----------------------------
FROM node:22-alpine AS dependencies

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./

RUN npm ci


# -----------------------------
# Database initializer
# -----------------------------
FROM dependencies AS database-init

WORKDIR /app

COPY . .

ENV NODE_ENV=production

CMD ["npm", "run", "init-db"]


# -----------------------------
# Build Next.js application
# -----------------------------
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build


# -----------------------------
# Production runtime
# -----------------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy the built project, source required by init-db,
# package scripts, and installed dependencies.
COPY --from=builder --chown=nextjs:nodejs /app ./

USER nextjs

EXPOSE 3000

CMD ["npm", "run", "start"]