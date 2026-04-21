#!/usr/bin/env bash

set -euo pipefail

APP_DIR="${APP_DIR:-/home/boardpefocus/htdocs/www.boardpefocus.in}"
BACKEND_ENV_FILE="${BACKEND_ENV_FILE:-$APP_DIR/apps/backend/.env}"

cd "$APP_DIR"

# Load production backend environment so Prisma can read DATABASE_URL.
if [ -f "$BACKEND_ENV_FILE" ]; then
  set -a
  # shellcheck disable=SC1090
  . "$BACKEND_ENV_FILE"
  set +a
else
  echo "Missing backend env file: $BACKEND_ENV_FILE"
  exit 1
fi

export CI=1

if ! command -v pnpm >/dev/null 2>&1; then
  corepack enable
  corepack prepare pnpm@9.5.0 --activate
fi

pnpm install --frozen-lockfile
pnpm db:generate
pnpm db:migrate:deploy
pnpm build:prod

if pm2 describe boardpefocus-frontend >/dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs --env production --update-env
else
  pm2 start ecosystem.config.cjs --env production
fi

pm2 save
