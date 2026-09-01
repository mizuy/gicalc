import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join } from 'node:path';

const root = process.cwd();
const staging = join(root, 'tmp-pages');
const dest = join(staging, 'gicalc');

rmSync(staging, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
cpSync(join(root, 'dist'), dest, { recursive: true });

const child = spawn('npx', ['serve', staging, '-l', '4173'], {
  stdio: 'inherit',
  cwd: root,
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
