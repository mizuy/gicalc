#!/usr/bin/env python3
"""public/figures の CC 図を Web 表示向けにリサイズして WebP に変換する。

- 最大幅 1200px（ページ幅 720 / ライトボックス 1000 の Retina 相当）
- それより小さい図は拡大しない
- 出力: 同名 .webp（元の jpg/png は削除）
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
FIGURES = ROOT / 'public' / 'figures'
MAX_WIDTH = 1200
WEBP_QUALITY = 85
SOURCE_SUFFIXES = {'.jpg', '.jpeg', '.png'}


def optimize(path: Path) -> tuple[int, int, int]:
    im = Image.open(path)
    w, h = im.size
    if im.mode not in ('RGB', 'RGBA'):
        im = im.convert('RGBA' if 'A' in im.getbands() else 'RGB')
    if w > MAX_WIDTH:
        nh = round(h * MAX_WIDTH / w)
        im = im.resize((MAX_WIDTH, nh), Image.Resampling.LANCZOS)
    dest = path.with_suffix('.webp')
    save_kwargs: dict = {'quality': WEBP_QUALITY, 'method': 6}
    if im.mode == 'RGBA':
        save_kwargs['lossless'] = False
    im.save(dest, 'WEBP', **save_kwargs)
    orig_size = path.stat().st_size
    new_size = dest.stat().st_size
    nw, nh = im.size
    path.unlink()
    return orig_size, new_size, nw * nh


def main() -> int:
    if not FIGURES.is_dir():
        print(f'missing {FIGURES}', file=sys.stderr)
        return 1

    sources = sorted(
        p for p in FIGURES.iterdir() if p.suffix.lower() in SOURCE_SUFFIXES
    )
    if not sources:
        print('no source figures to optimize')
        return 0

    total_before = 0
    total_after = 0
    print(f'Optimizing {len(sources)} figures -> WebP (max width {MAX_WIDTH}, q={WEBP_QUALITY})')
    for path in sources:
        before, after, _ = optimize(path)
        total_before += before
        total_after += after
        pct = (1 - after / before) * 100 if before else 0
        print(f'  {path.name} -> {path.stem}.webp  {before // 1024}KB -> {after // 1024}KB  ({pct:.0f}% smaller)')

    print(f'Total: {total_before / 1024 / 1024:.2f} MB -> {total_after / 1024 / 1024:.2f} MB')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
