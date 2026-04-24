import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function parseEnvFile(content: string): Record<string, string> {
  const parsed: Record<string, string> = {};

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

function buildDatabaseUrl(env: NodeJS.ProcessEnv): string | undefined {
  if (typeof env.DATABASE_URL === 'string' && env.DATABASE_URL.trim()) {
    return env.DATABASE_URL.trim();
  }

  const requiredKeys = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'] as const;
  if (requiredKeys.some((key) => !env[key]?.trim())) {
    return undefined;
  }

  return `postgresql://${encodeURIComponent(env.DB_USER ?? '')}:${encodeURIComponent(
    env.DB_PASSWORD ?? '',
  )}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;
}

function preloadEnvironment() {
  const appRoot = resolve(__dirname, '..', '..');
  const repoRoot = resolve(appRoot, '..', '..');

  for (const filePath of [
    resolve(appRoot, '.env.local'),
    resolve(appRoot, '.env'),
    resolve(repoRoot, '.env.local'),
    resolve(repoRoot, '.env'),
  ]) {
    if (!existsSync(filePath)) {
      continue;
    }

    const parsed = parseEnvFile(readFileSync(filePath, 'utf8'));
    for (const [key, value] of Object.entries(parsed)) {
      process.env[key] = value;
    }
  }

  if (!process.env.DATABASE_URL) {
    const databaseUrl = buildDatabaseUrl(process.env);
    if (databaseUrl) {
      process.env.DATABASE_URL = databaseUrl;
    }
  }
}

preloadEnvironment();
