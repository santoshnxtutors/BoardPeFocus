# BoardPeFocus CloudPanel Deployment

This repo is ready to deploy from GitHub onto your CloudPanel server. The
GitHub Actions workflow in `.github/workflows/main.yml` deploys automatically
whenever `main` is pushed.

## Production layout

- `www.boardpefocus.in` -> Next.js public frontend on port `3000`
- `www.boardpefocus.in/api/*` -> NestJS backend on port `3001`
- `admin.boardpefocus.in` -> Next.js admin app on port `3002` (optional but recommended)

## 1. CloudPanel setup

In CloudPanel, create or confirm:

- Site: `www.boardpefocus.in`
- Site user: `boardpefocus`
- Root directory: `/home/boardpefocus/htdocs/www.boardpefocus.in`
- SSH user: use a user that can write to `/home/boardpefocus/htdocs/www.boardpefocus.in`

From the screenshots, the server IP is `13.127.64.109`. If you use the SSH user
`boardpefocusapp`, first confirm that it can write to the site root. If it
cannot, create a CloudPanel SSH user with access to `/home/boardpefocus/`.

## 2. Server prerequisites

Install or confirm:

- Node.js `20.x`
- `git`
- `pm2`
- PostgreSQL

Recommended setup:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git
sudo npm install -g pm2
corepack enable
corepack prepare pnpm@9.5.0 --activate
```

## 3. Database in CloudPanel

In CloudPanel, open `Databases` and create a PostgreSQL database.

Recommended values:

- Database name: `boardpefocus_db`
- Database user: `boarduser`
- Database password: use the production password, stored only in GitHub Secrets
- Host: `127.0.0.1`
- Port: `5432`

The backend will use this connection string:

```text
postgresql://boarduser:<database-password>@127.0.0.1:5432/boardpefocus_db?schema=public
```

## 4. One-time repo setup on CloudPanel

SSH to the server and switch to the site user:

```bash
ssh boardpefocus@13.127.64.109
cd /home/boardpefocus/htdocs/www.boardpefocus.in
```

If the folder already has old site files and you do not need them anymore, remove only the contents inside this exact directory:

```bash
find /home/boardpefocus/htdocs/www.boardpefocus.in -mindepth 1 -maxdepth 1 -exec rm -rf {} +
```

Clone the repo:

```bash
git clone https://github.com/santoshnxtutors/BoardPeFocus.git .
```

## 5. GitHub Actions secrets

Do not commit production passwords or `.env` files. Add them in GitHub:

`GitHub repo -> Settings -> Secrets and variables -> Actions -> New repository secret`

Create these repository secrets:

### `CLOUDPANEL_HOST`

```text
13.127.64.109
```

### `CLOUDPANEL_SSH_USER`

Use the CloudPanel SSH user that can write to the site root, for example:

```text
boardpefocusapp
```

If that user cannot access `/home/boardpefocus/htdocs/www.boardpefocus.in`, use
or create a user that can.

### `CLOUDPANEL_SSH_PASSWORD`

Use the CloudPanel SSH password.

### `FRONTEND_ENV_PRODUCTION`

```env
NEXT_PUBLIC_APP_URL="https://www.boardpefocus.in"
NEXT_PUBLIC_API_URL="https://www.boardpefocus.in/api"
```

### `ADMIN_ENV_PRODUCTION`

```env
NEXT_PUBLIC_APP_URL="https://admin.boardpefocus.in"
NEXT_PUBLIC_API_URL="https://www.boardpefocus.in/api"
```

### `BACKEND_ENV`

Paste this as one multiline GitHub Secret, replacing the password placeholders
with the real production values:

```env
DATABASE_URL="postgresql://boarduser:<database-password>@127.0.0.1:5432/boardpefocus_db?schema=public"
PORT=3001
NODE_ENV="production"
FRONTEND_ORIGIN="https://www.boardpefocus.in"
ADMIN_ORIGIN="https://admin.boardpefocus.in"

ADMIN_SEED_EMAIL="admin@gmail.com"
ADMIN_SEED_PASSWORD="<admin-login-password>"
ADMIN_SEED_NAME="BoardPeFocus Admin"
RESET_ADMIN_PASSWORD_ON_SEED="true"

DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=boardpefocus_db
DB_USER=boarduser
DB_PASSWORD="<database-password>"

JWT_SECRET="<long-random-jwt-secret>"
JWT_EXPIRES_IN="12h"

ADMIN_PHONE_NUMBER="919876543210"
```

The workflow writes these files on the server:

- `/home/boardpefocus/htdocs/www.boardpefocus.in/apps/backend/.env`
- `/home/boardpefocus/htdocs/www.boardpefocus.in/apps/frontend/.env.production`
- `/home/boardpefocus/htdocs/www.boardpefocus.in/apps/admin/.env.production`

## 6. Automatic deployment

After the secrets are added, every push to `main` runs:

1. SSH into CloudPanel.
2. Clone or update `/home/boardpefocus/htdocs/www.boardpefocus.in`.
3. Write frontend, admin, and backend env files from GitHub Secrets.
4. Run `scripts/cloudpanel-deploy.sh`.
5. Install dependencies, run Prisma migrations, seed admin login, build apps, and restart PM2.

To run it manually:

`GitHub repo -> Actions -> Deploy to CloudPanel -> Run workflow`

## 7. Manual env file setup

Create these files on the server before building:

### `apps/frontend/.env.production`

```bash
cat > apps/frontend/.env.production <<'EOF'
NEXT_PUBLIC_APP_URL="https://www.boardpefocus.in"
NEXT_PUBLIC_API_URL="https://www.boardpefocus.in/api"
EOF
```

### `apps/admin/.env.production`

```bash
cat > apps/admin/.env.production <<'EOF'
NEXT_PUBLIC_APP_URL="https://admin.boardpefocus.in"
NEXT_PUBLIC_API_URL="https://www.boardpefocus.in/api"
EOF
```

### `apps/backend/.env`

Replace the placeholders with your real values:

```bash
cat > apps/backend/.env <<'EOF'
DATABASE_URL="postgresql://boarduser:<database-password>@127.0.0.1:5432/boardpefocus_db?schema=public"
JWT_SECRET="change-this-to-a-long-random-secret"
JWT_EXPIRES_IN="12h"
PORT=3001
NODE_ENV="production"
FRONTEND_ORIGIN="https://www.boardpefocus.in"
ADMIN_ORIGIN="https://admin.boardpefocus.in"
ADMIN_SEED_EMAIL="admin@gmail.com"
ADMIN_SEED_PASSWORD="<admin-login-password>"
ADMIN_SEED_NAME="BoardPeFocus Admin"
RESET_ADMIN_PASSWORD_ON_SEED="true"
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=boardpefocus_db
DB_USER=boarduser
DB_PASSWORD="<database-password>"
S3_ENDPOINT="s3.amazonaws.com"
S3_ACCESS_KEY="your-access-key"
S3_SECRET_KEY="your-secret-key"
S3_BUCKET="boardpefocus-media"
S3_REGION="ap-south-1"
WHATSAPP_API_URL="https://api.whatsapp-provider.com/v1/send"
WHATSAPP_API_TOKEN="your-token"
ADMIN_PHONE_NUMBER="919876543210"
EOF
```

## 8. Build, migrate, seed, and start

From the project root on the server:

```bash
bash scripts/cloudpanel-deploy.sh
```

The deploy script deletes the old BoardPeFocus PM2 apps first, then installs
dependencies, runs Prisma generate/migrations/seed, builds all workspaces, and
starts these three services:

- `boardpefocus-frontend` on port `3000`
- `boardpefocus-backend` on port `3001`
- `boardpefocus-admin` on port `3002`

Run `pm2 startup` once on the server if PM2 has not already been configured to
restart after reboot.

For future updates:

```bash
cd /home/boardpefocus/htdocs/www.boardpefocus.in
git pull origin main
bash scripts/cloudpanel-deploy.sh
```

## 9. CloudPanel vhost proxy rules

Use CloudPanel `Vhost` custom config for `www.boardpefocus.in` and proxy the app like this:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

If you add `admin.boardpefocus.in` as a second CloudPanel site, point its vhost root to port `3002`:

```nginx
location / {
    proxy_pass http://127.0.0.1:3002;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## 10. First login seed

The seed creates this initial admin login:

- email: `admin@gmail.com`
- password: the value of `ADMIN_SEED_PASSWORD` from the `BACKEND_ENV` GitHub Secret

Change that password immediately after first login.
