#!/usr/bin/env python3
"""Oyama 2017 (CC BY 4.0) の複合図を Type / AVA ごとに切り出す。"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / 'public' / 'figures'

IM14 = ROOT / 'jes-oyama2017-fig1-4.jpg'
IM5 = ROOT / 'jes-oyama2017-fig5.jpg'

# Fig. 1–4 は 2×2（上段 Type A / B1、下段 Type B2 / B3）。各マスは a / b。
# Fig. 5 は AVA-small / middle / large。
CROPS = {
    'jes-oyama2017-fig1-type-a.jpg': (IM14, (0, 0, 598, 258)),
    'jes-oyama2017-fig2-type-b1.jpg': (IM14, (602, 0, 1200, 258)),
    'jes-oyama2017-fig3-type-b2.jpg': (IM14, (0, 265, 598, 523)),
    'jes-oyama2017-fig4-type-b3.jpg': (IM14, (602, 265, 1200, 523)),
    'jes-oyama2017-fig5-ava-small.jpg': (IM5, (0, 0, 232, 203)),
    'jes-oyama2017-fig5-ava-middle.jpg': (IM5, (237, 0, 470, 203)),
    'jes-oyama2017-fig5-ava-large.jpg': (IM5, (476, 0, 709, 203)),
}


def main() -> None:
    cache: dict[Path, Image.Image] = {}
    for name, (src, box) in CROPS.items():
        image = cache.get(src)
        if image is None:
            image = Image.open(src)
            cache[src] = image
        crop = image.crop(box)
        dest = ROOT / name
        crop.save(dest, quality=92, optimize=True)
        print(dest.name, crop.size)


if __name__ == '__main__':
    main()
