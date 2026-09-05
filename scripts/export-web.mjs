import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const version = JSON.parse(readFileSync('package.json', 'utf8')).version;

const result = spawnSync('npx', ['expo', 'export', '-p', 'web', '--clear'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    EXPO_PUBLIC_APP_VERSION: version,
  },
});

process.exit(result.status ?? 1);
