import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function crc32(buf) {
  let crc = 0xffffffff;
  for (const byte of buf) {
    crc ^= byte;
    for (let i = 0; i < 8; i += 1) {
      const mask = -(crc & 1);
      crc = (crc >>> 1) ^ (0xedb88320 & mask);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([length, typeBuf, data, crc]);
}

function writePng(path, size, paint) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y += 1) {
    const row = y * (size * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < size; x += 1) {
      const [r, g, b, a] = paint(x, y, size);
      const i = row + 1 + x * 4;
      raw[i] = r;
      raw[i + 1] = g;
      raw[i + 2] = b;
      raw[i + 3] = a;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;

  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
  writeFileSync(path, png);
}

function logoPaint(x, y, size) {
  const cx = (x + 0.5) / size - 0.5;
  const cy = (y + 0.5) / size - 0.5;
  const r = Math.hypot(cx, cy);
  if (r > 0.48) return [0, 0, 0, 0];
  if (r > 0.42) return [13, 115, 119, 255];
  const inCross =
    (Math.abs(cx) < 0.08 && Math.abs(cy) < 0.22) ||
    (Math.abs(cy) < 0.08 && Math.abs(cx) < 0.22);
  if (inCross) return [255, 255, 255, 255];
  return [13, 115, 119, 255];
}

function opaqueLogo(x, y, size) {
  const [r, g, b, a] = logoPaint(x, y, size);
  if (a === 0) return [244, 248, 248, 255];
  return [r, g, b, 255];
}

writePng(join(root, 'public/logo192.png'), 192, opaqueLogo);
writePng(join(root, 'public/logo512.png'), 512, opaqueLogo);
writePng(join(root, 'assets/images/icon.png'), 1024, opaqueLogo);
writePng(join(root, 'assets/images/favicon.png'), 48, opaqueLogo);
writePng(join(root, 'assets/images/splash-icon.png'), 512, logoPaint);
writePng(join(root, 'assets/images/android-icon-foreground.png'), 432, logoPaint);
writePng(join(root, 'assets/images/android-icon-background.png'), 432, () => [13, 115, 119, 255]);
writePng(join(root, 'assets/images/android-icon-monochrome.png'), 432, logoPaint);

console.log('generated PWA and app icons');
