#!/usr/bin/env python3
"""Lee 2021 Clin Endosc Fig. 1 の下段 NBI（Type 1 / 2A / 2B / 3）を切り出す。

上段は WLE、下段は NBI。列 A–D = Type 1 / 2A / 2B / 3。
原図は e-ce.org のサムネイル（1541×604）。座標は原画像基準。

  https://www.e-ce.org/upload/thumbnails/ce-2020-257f1.jpg

使い方: 原図 jpg を public/figures/jnet-lee2021-fig1.jpg に置くか、
パスを引数に渡す。切り抜き後は optimize-figures.py で WebP 化する。
フルプレートはメインにもアトラスにも埋め込まない。
"""

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / 'public' / 'figures'
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / 'jnet-lee2021-fig1.jpg'

# 4列はほぼ等幅。行の境は y≈310 の暗い継ぎ目。
CROPS = {
    'jnet-lee2021-type1.jpg': (0, 312, 385, 604),
    'jnet-lee2021-type2a.jpg': (385, 312, 770, 604),
    'jnet-lee2021-type2b.jpg': (770, 312, 1155, 604),
    'jnet-lee2021-type3.jpg': (1155, 312, 1541, 604),
}


def main() -> None:
    image = Image.open(SRC)
    for name, box in CROPS.items():
        crop = image.crop(box)
        dest = ROOT / name
        crop.save(dest, quality=92, optimize=True)
        print(dest.name, crop.size)


if __name__ == '__main__':
    main()
