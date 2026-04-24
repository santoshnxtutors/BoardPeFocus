const { existsSync, readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { spawnSync } = require('node:child_process');

function parseEnvFile(content) {
  const parsed = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');
    if (separatorIndex <= 0) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    parsed[key] = value;
  }

  return parsed;
}

function loadEnvFiles(env, filePaths) {
  for (const filePath of filePaths) {
    if (!existsSync(filePath)) {
      continue;
    }

    const parsed = parseEnvFile(readFileSync(filePath, 'utf8'));
    for (const [key, value] of Object.entries(parsed)) {
      if (env[key] === undefined) {
        env[key] = value;
      }
    }
  }
}

function buildDatabaseUrl(env) {
  if (typeof env.DATABASE_URL === 'string' && env.DATABASE_URL.trim()) {
    return env.DATABASE_URL.trim();
  }

  const requiredKeys = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
  if (requiredKeys.some((key) => typeof env[key] !== 'string' || !env[key].trim())) {
    return undefined;
  }

  return `postgresql://${encodeURIComponent(env.DB_USER)}:${encodeURIComponent(
    env.DB_PASSWORD,
  )}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;
}

const repoRoot = resolve(__dirname, '..');
const databaseRoot = resolve(repoRoot, 'packages', 'database');
const env = { ...process.env };

loadEnvFiles(env, [
  resolve(repoRoot, '.env.local'),
  resolve(repoRoot, '.env'),
  resolve(repoRoot, 'apps', 'backend', '.env.local'),
  resolve(repoRoot, 'apps', 'backend', '.env'),
  resolve(databaseRoot, '.env.local'),
  resolve(databaseRoot, '.env'),
]);

const databaseUrl = buildDatabaseUrl(env);
if (!databaseUrl) {
  console.error(
    'Missing database configuration. Set DATABASE_URL or DB_HOST/DB_PORT/DB_NAME/DB_USER/DB_PASSWORD.',
  );
  process.exit(1);
}

env.DATABASE_URL = databaseUrl;

const prismaEntrypoint = require.resolve('prisma/build/index.js', {
  paths: [databaseRoot],
});

const result = spawnSync(process.execPath, [prismaEntrypoint, ...process.argv.slice(2)], {
  cwd: databaseRoot,
  env,
  stdio: 'inherit',
});

process.exit(result.status ?? 1);
