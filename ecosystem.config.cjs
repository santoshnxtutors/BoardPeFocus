const apps = [
  {
    name: 'boardpefocus-frontend',
    cwd: __dirname,
    script: 'pnpm',
    args: 'start:frontend',
    interpreter: 'none',
    env_production: {
      NODE_ENV: 'production',
      PORT: '3000',
    },
  },
  {
    name: 'boardpefocus-backend',
    cwd: __dirname,
    script: 'pnpm',
    args: 'start:backend',
    interpreter: 'none',
    env_production: {
      NODE_ENV: 'production',
      PORT: '3001',
    },
  },
];

if (process.env.START_ADMIN === 'true') {
  apps.push({
    name: 'boardpefocus-admin',
    cwd: __dirname,
    script: 'pnpm',
    args: 'start:admin',
    interpreter: 'none',
    env_production: {
      NODE_ENV: 'production',
      PORT: '3002',
    },
  });
}

module.exports = { apps };
