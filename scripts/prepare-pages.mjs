import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const version = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8')).version;

writeFileSync(join(dist, '.nojekyll'), '');
writeFileSync(join(dist, 'version.json'), `${JSON.stringify({ version }, null, 2)}\n`);

const notFound = join(dist, '+not-found.html');
if (existsSync(notFound)) {
  copyFileSync(notFound, join(dist, '404.html'));
}

console.log(`prepared dist/.nojekyll, dist/version.json (${version}), and dist/404.html`);
