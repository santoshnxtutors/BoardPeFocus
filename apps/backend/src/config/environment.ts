import { existsSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { resolve } from 'node:path';

type NodeEnvironment = 'development' | 'production' | 'test';

export interface AppEnvironment extends Record<string, unknown> {
  NODE_ENV: NodeEnvironment;
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_SECRET_GENERATED: boolean;
  JWT_EXPIRES_IN: string;
  FRONTEND_ORIGIN?: string;
  ADMIN_ORIGIN?: string;
  ADMIN_PHONE_NUMBER?: string;
}

function getString(
  config: Record<string, unknown>,
  key: string,
): string | undefined {
  const value = config[key];
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function getPort(config: Record<string, unknown>): number {
  const rawPort = getString(config, 'PORT');
  if (!rawPort) {
    return 3001;
  }

  const parsedPort = Number.parseInt(rawPort, 10);
  if (!Number.isInteger(parsedPort) || parsedPort < 1 || parsedPort > 65535) {
    throw new Error('Invalid PORT value. Expected an integer between 1 and 65535.');
  }

  return parsedPort;
}

function buildDatabaseUrl(config: Record<string, unknown>): string | undefined {
  const directUrl = getString(config, 'DATABASE_URL');
  if (directUrl) {
    return directUrl;
  }

  const host = getString(config, 'DB_HOST');
  const port = getString(config, 'DB_PORT');
  const name = getString(config, 'DB_NAME');
  const user = getString(config, 'DB_USER');
  const password = getString(config, 'DB_PASSWORD');

  if (!host || !port || !name || !user || !password) {
    return undefined;
  }

  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(
    password,
  )}@${host}:${port}/${name}`;
}

export function getEnvFilePaths(): string[] {
  const appRoot = resolve(__dirname, '..', '..');
  const repoRoot = resolve(appRoot, '..', '..');

  return [
    resolve(appRoot, '.env.local'),
    resolve(appRoot, '.env'),
    resolve(repoRoot, '.env.local'),
    resolve(repoRoot, '.env'),
  ].filter((filePath, index, paths) => {
    return existsSync(filePath) && paths.indexOf(filePath) === index;
  });
}

export function validateEnvironment(
  config: Record<string, unknown>,
): AppEnvironment {
  const nodeEnv =
    (getString(config, 'NODE_ENV') as NodeEnvironment | undefined) ??
    'development';
  const databaseUrl = buildDatabaseUrl(config);

  if (!databaseUrl) {
    throw new Error(
      'Missing database configuration. Set DATABASE_URL or DB_HOST/DB_PORT/DB_NAME/DB_USER/DB_PASSWORD.',
    );
  }

  const jwtSecret = getString(config, 'JWT_SECRET');
  const generatedJwtSecret =
    !jwtSecret && nodeEnv !== 'production'
      ? randomBytes(32).toString('hex')
      : undefined;
  const resolvedJwtSecret = jwtSecret ?? generatedJwtSecret;

  if (!resolvedJwtSecret) {
    throw new Error('Missing required environment variable: JWT_SECRET');
  }

  return {
    ...config,
    NODE_ENV: nodeEnv,
    PORT: getPort(config),
    DATABASE_URL: databaseUrl,
    JWT_SECRET: resolvedJwtSecret,
    JWT_SECRET_GENERATED: Boolean(generatedJwtSecret),
    JWT_EXPIRES_IN: getString(config, 'JWT_EXPIRES_IN') ?? '12h',
    FRONTEND_ORIGIN: getString(config, 'FRONTEND_ORIGIN'),
    ADMIN_ORIGIN: getString(config, 'ADMIN_ORIGIN'),
    ADMIN_PHONE_NUMBER: getString(config, 'ADMIN_PHONE_NUMBER'),
  };
}
