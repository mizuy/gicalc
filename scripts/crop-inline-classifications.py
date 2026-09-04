#!/usr/bin/env python3
"""複合図を各型カード用に切り出す（Forrest / 大腸EC / 虫垂開口部 / LST / Hill / EREFS / NICE）。"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / 'public' / 'figures'

# 複合図は optimize-figures.py で WebP 化済み。座標は元のフル解像度基準。
# Forrest の WebP は幅 1738→1200 なので、再切り出しはフル解像度の原図が必要。
FORREST = ROOT / 'forrest-jsmu2025-fig1.webp'
HILL = ROOT / 'hill-ge2023-fig1.webp'
EREFS = ROOT / 'erefs-abe2022-fig2.webp'
LST = ROOT / 'lst-ce2025-fig3.webp'
OUNG = ROOT / 'oung2020-fig2.webp'
EC2 = ROOT / 'ec-maeda2021-fig2.webp'
EC3 = ROOT / 'ec-maeda2021-fig3.webp'
NICE = ROOT / 'nice-hamada2021-fig1.webp'

# box = (left, top, right, bottom)
CROPS: dict[str, tuple[Path, tuple[int, int, int, int]]] = {
    # Forrest: 6列 × 上下2例。列間・段間の白ガターは除く。
    'forrest-jsmu2025-fig1-ia-top.jpg': (FORREST, (0, 0, 282, 284)),
    'forrest-jsmu2025-fig1-ia-bottom.jpg': (FORREST, (0, 292, 282, 577)),
    'forrest-jsmu2025-fig1-ib-top.jpg': (FORREST, (290, 0, 573, 284)),
    'forrest-jsmu2025-fig1-ib-bottom.jpg': (FORREST, (290, 292, 573, 577)),
    'forrest-jsmu2025-fig1-iia-top.jpg': (FORREST, (581, 0, 864, 284)),
    'forrest-jsmu2025-fig1-iia-bottom.jpg': (FORREST, (581, 292, 864, 577)),
    'forrest-jsmu2025-fig1-iib-top.jpg': (FORREST, (872, 0, 1155, 284)),
    'forrest-jsmu2025-fig1-iib-bottom.jpg': (FORREST, (872, 292, 1155, 577)),
    'forrest-jsmu2025-fig1-iic-top.jpg': (FORREST, (1163, 0, 1446, 284)),
    'forrest-jsmu2025-fig1-iic-bottom.jpg': (FORREST, (1163, 292, 1446, 577)),
    'forrest-jsmu2025-fig1-iii-top.jpg': (FORREST, (1454, 0, 1738, 284)),
    'forrest-jsmu2025-fig1-iii-bottom.jpg': (FORREST, (1454, 292, 1738, 577)),
    # Hill: 2×2（I / II / III / IV）。細い継ぎ目で割る。
    'hill-ge2023-fig1-grade-i.jpg': (HILL, (2, 2, 390, 303)),
    'hill-ge2023-fig1-grade-ii.jpg': (HILL, (390, 2, 778, 303)),
    'hill-ge2023-fig1-grade-iii.jpg': (HILL, (2, 304, 390, 606)),
    'hill-ge2023-fig1-grade-iv.jpg': (HILL, (390, 304, 778, 606)),
    # EREFS: 3×2（a 浮腫 / b 輪状溝 / c 白斑 / d 縦走溝 / e 狭窄 / f 細径化）。
    'erefs-abe2022-fig2-edema.jpg': (EREFS, (5, 8, 248, 190)),
    'erefs-abe2022-fig2-rings.jpg': (EREFS, (256, 8, 497, 190)),
    'erefs-abe2022-fig2-exudates.jpg': (EREFS, (504, 8, 747, 190)),
    'erefs-abe2022-fig2-furrows.jpg': (EREFS, (5, 196, 248, 379)),
    'erefs-abe2022-fig2-stricture.jpg': (EREFS, (256, 196, 497, 379)),
    'erefs-abe2022-fig2-narrow-caliber.jpg': (EREFS, (504, 196, 747, 379)),
    # LST: 表の各行（模式図と深部SM浸潤率）。
    'lst-ce2025-fig3-g-homogeneous.jpg': (LST, (0, 90, 774, 300)),
    'lst-ce2025-fig3-g-mixed.jpg': (LST, (0, 301, 774, 520)),
    'lst-ce2025-fig3-ng-flat.jpg': (LST, (0, 521, 774, 710)),
    'lst-ce2025-fig3-ng-pseudodepressed.jpg': (LST, (0, 711, 774, 874)),
    # Oung: 上段 Type 0/1/2、下段 Type 3/3a。
    'oung2020-fig2-type-0.jpg': (OUNG, (20, 12, 268, 230)),
    'oung2020-fig2-type-1.jpg': (OUNG, (300, 12, 528, 230)),
    'oung2020-fig2-type-2.jpg': (OUNG, (530, 12, 788, 230)),
    'oung2020-fig2-type-3.jpg': (OUNG, (70, 248, 382, 458)),
    'oung2020-fig2-type-3a.jpg': (OUNG, (396, 248, 736, 458)),
    # EC Fig. 2: 左 EC1a/1b、中央 EC2、右 EC3a/3b。ラベル行を含める。
    'ec-maeda2021-fig2-ec1a.jpg': (EC2, (16, 18, 247, 337)),
    'ec-maeda2021-fig2-ec1b.jpg': (EC2, (16, 338, 247, 651)),
    'ec-maeda2021-fig2-ec2.jpg': (EC2, (296, 201, 527, 493)),
    'ec-maeda2021-fig2-ec3a.jpg': (EC2, (534, 18, 766, 337)),
    'ec-maeda2021-fig2-ec3b.jpg': (EC2, (534, 338, 766, 651)),
    # EC Fig. 3: EC-V1 / V2 / V3。見出しとキャプションを含める。
    'ec-maeda2021-fig3-ec-v1.jpg': (EC3, (8, 24, 258, 313)),
    'ec-maeda2021-fig3-ec-v2.jpg': (EC3, (272, 24, 521, 313)),
    'ec-maeda2021-fig3-ec-v3.jpg': (EC3, (524, 24, 766, 313)),
    # NICE: Hamada 2021 Fig. 1 の Endoscopic image 行（1956×1285 原寸 → 1200×788 WebP 座標）
    'nice-hamada2021-type1.jpg': (NICE, (250, 502, 511, 618)),
    'nice-hamada2021-type2.jpg': (NICE, (576, 502, 841, 618)),
    'nice-hamada2021-type3.jpg': (NICE, (907, 502, 1175, 618)),
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
