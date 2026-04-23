#!/usr/bin/env bash

set -euo pipefail

APP_DIR="${APP_DIR:-/home/boardpefocus/htdocs/www.boardpefocus.in}"
BACKEND_ENV_FILE="${BACKEND_ENV_FILE:-$APP_DIR/apps/backend/.env}"
PM2_APPS=(
  "boardpefocus"
  "boardpefocus-frontend"
  "boardpefocus-backend"
  "boardpefocus-admin"
)

cd "$APP_DIR"

echo "Stopping old BoardPeFocus PM2 apps..."
for app in "${PM2_APPS[@]}"; do
  pm2 delete "$app" >/dev/null 2>&1 || true
done

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
export ADMIN_SEED_PASSWORD="${ADMIN_SEED_PASSWORD:-board@1234}"
export RESET_ADMIN_PASSWORD_ON_SEED="${RESET_ADMIN_PASSWORD_ON_SEED:-true}"

if ! command -v pnpm >/dev/null 2>&1; then
  corepack enable
  corepack prepare pnpm@9.5.0 --activate
fi

pnpm install --frozen-lockfile
pnpm db:generate
pnpm db:migrate:deploy
pnpm db:seed
pnpm build:prod

pm2 start ecosystem.config.cjs --env production --update-env
pm2 save
