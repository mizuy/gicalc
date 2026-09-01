import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');

writeFileSync(join(dist, '.nojekyll'), '');

const notFound = join(dist, '+not-found.html');
if (existsSync(notFound)) {
  copyFileSync(notFound, join(dist, '404.html'));
}

console.log('prepared dist/.nojekyll and dist/404.html');
