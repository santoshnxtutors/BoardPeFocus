const pnpm = process.env.PNPM_BIN || 'pnpm';

const apps = [
  {
    name: 'boardpefocus-frontend',
    cwd: __dirname,
    script: pnpm,
    args: 'start:frontend',
    interpreter: 'none',
    env_production: {
      NODE_ENV: 'production',
      PORT: '3000',
      BACKEND_API_URL: 'http://127.0.0.1:3001/api',
    },
  },
  {
    name: 'boardpefocus-backend',
    cwd: __dirname,
    script: pnpm,
    args: 'start:backend',
    interpreter: 'none',
    env_production: {
      NODE_ENV: 'production',
      PORT: '3001',
    },
  },
  {
    name: 'boardpefocus-admin',
    cwd: __dirname,
    script: pnpm,
    args: 'start:admin',
    interpreter: 'none',
    env_production: {
      NODE_ENV: 'production',
      PORT: '3002',
      BACKEND_API_URL: 'http://127.0.0.1:3001/api',
    },
  },
];

module.exports = { apps };
