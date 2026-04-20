#!/usr/bin/env bash

set -euo pipefail

APP_DIR="${APP_DIR:-/home/boardpefocus/htdocs/www.boardpefocus.in}"

cd "$APP_DIR"

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
