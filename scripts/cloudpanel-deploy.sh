#!/usr/bin/env bash

set -euo pipefail

APP_DIR="${APP_DIR:-/home/boardpefocus/htdocs/www.boardpefocus.in}"
BACKEND_ENV_FILE="${BACKEND_ENV_FILE:-$APP_DIR/apps/backend/.env}"
PNPM_VERSION="${PNPM_VERSION:-9.5.0}"
PM2_APPS=(
  "boardpefocus"
  "boardpefocus-frontend"
  "boardpefocus-backend"
  "boardpefocus-admin"
)

load_node_runtime() {
  local profile

  for profile in /etc/profile "$HOME/.profile" "$HOME/.bash_profile" "$HOME/.bashrc"; do
    if [ -r "$profile" ]; then
      set +u
      # shellcheck disable=SC1090
      . "$profile" >/dev/null 2>&1 || true
      set -u
    fi
  done

  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  if [ -s "$NVM_DIR/nvm.sh" ]; then
    set +u
    # shellcheck disable=SC1090
    . "$NVM_DIR/nvm.sh" >/dev/null 2>&1 || true
    set -u
  fi

  local bin_dir
  for bin_dir in \
    "$HOME/.local/share/pnpm" \
    "$HOME/.npm-global/bin" \
    "$HOME/.npm-packages/bin" \
    "$HOME/.node/bin" \
    /usr/local/bin \
    /usr/bin \
    /bin; do
    if [ -d "$bin_dir" ] && [[ ":$PATH:" != *":$bin_dir:"* ]]; then
      PATH="$bin_dir:$PATH"
    fi
  done
  export PATH
}

require_command() {
  local command_name="$1"
  local install_hint="$2"

  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "Missing required command: $command_name"
    echo "$install_hint"
    exit 127
  fi
}

ensure_pnpm() {
  if command -v pnpm >/dev/null 2>&1; then
    return
  fi

  if command -v corepack >/dev/null 2>&1; then
    corepack enable >/dev/null 2>&1 || true
    if corepack prepare "pnpm@$PNPM_VERSION" --activate; then
      hash -r
    fi
  fi

  if ! command -v pnpm >/dev/null 2>&1 && command -v npm >/dev/null 2>&1; then
    if npm install -g "pnpm@$PNPM_VERSION"; then
      hash -r
    fi
  fi

  if ! command -v pnpm >/dev/null 2>&1; then
    echo "Unable to find or install pnpm@$PNPM_VERSION because npm/corepack is not available."
    echo "Install Node.js 20.x for the CloudPanel SSH user, then rerun the workflow:"
    echo "  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -"
    echo "  sudo apt-get install -y nodejs"
    echo "  sudo corepack enable"
    exit 127
  fi
}

load_node_runtime
ensure_pnpm
export PNPM_BIN
PNPM_BIN="$(command -v pnpm)"

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
export START_ADMIN="${START_ADMIN:-false}"
export ADMIN_SEED_PASSWORD="${ADMIN_SEED_PASSWORD:-board@1234}"
export RESET_ADMIN_PASSWORD_ON_SEED="${RESET_ADMIN_PASSWORD_ON_SEED:-true}"

require_command "pm2" "Install PM2 once on the server with: sudo npm install -g pm2"

"$PNPM_BIN" install --frozen-lockfile --prod=false
"$PNPM_BIN" db:generate
"$PNPM_BIN" db:migrate:deploy
"$PNPM_BIN" db:seed
"$PNPM_BIN" build:prod

pm2 start ecosystem.config.cjs --env production --update-env
pm2 save
