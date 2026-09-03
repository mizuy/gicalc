import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const master = join(root, 'assets/images/icon.png');

function convert(args) {
  execFileSync('convert', args, { stdio: 'inherit' });
}

function resize(dest, size) {
  convert([master, '-resize', `${size}x${size}`, '-depth', '8', '-strip', dest]);
}

resize(join(root, 'public/logo192.png'), 192);
resize(join(root, 'public/logo512.png'), 512);
resize(join(root, 'assets/images/favicon.png'), 48);
resize(join(root, 'assets/images/splash-icon.png'), 512);
resize(join(root, 'assets/images/android-icon-foreground.png'), 432);
convert(['-size', '432x432', 'xc:#014B7F', '-strip', join(root, 'assets/images/android-icon-background.png')]);
convert([
  master,
  '-resize',
  '432x432',
  '-colorspace',
  'gray',
  '-normalize',
  '-depth',
  '8',
  '-strip',
  join(root, 'assets/images/android-icon-monochrome.png'),
]);

console.log('generated PWA and app icons from assets/images/icon.png');
