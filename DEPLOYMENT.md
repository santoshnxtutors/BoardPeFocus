# BoardPeFocus CloudPanel Deployment

This repo is ready to deploy from GitHub onto your CloudPanel server.

## Production layout

- `www.boardpefocus.in` -> Next.js public frontend on port `3000`
- `www.boardpefocus.in/api/*` -> NestJS backend on port `3001`
- `admin.boardpefocus.in` -> Next.js admin app on port `3002` (optional but recommended)

## 1. Server prerequisites

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

## 2. Clone the GitHub repo on CloudPanel

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

## 3. Create production env files

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
DATABASE_URL="postgresql://DB_USER:DB_PASSWORD@127.0.0.1:5432/boardpefocus?schema=public"
JWT_SECRET="change-this-to-a-long-random-secret"
PORT=3001
NODE_ENV="production"
FRONTEND_ORIGIN="https://www.boardpefocus.in"
ADMIN_ORIGIN="https://admin.boardpefocus.in"
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

## 4. Build, migrate, seed, and start

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

## 5. CloudPanel vhost proxy rules

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

## 6. First login seed

The seed creates this initial admin login:

- email: `santosh@nxtutors.com`
- password: the value of `ADMIN_SEED_PASSWORD`, defaulting to the project admin password used for deployment

Change that password immediately after first login.
