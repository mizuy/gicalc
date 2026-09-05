import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const current = JSON.parse(readFileSync('package.json', 'utf8')).version;

let previous = null;
try {
  previous = JSON.parse(execSync('git show HEAD~1:package.json', { encoding: 'utf8' })).version;
} catch {
  console.log('No previous commit to compare; skipping version bump check.');
  process.exit(0);
}

if (current === previous) {
  console.error(
    `Version must be bumped before pushing to main (still ${current}). Update package.json and app.config.js.`,
  );
  process.exit(1);
}

console.log(`Version bumped: ${previous} → ${current}`);
