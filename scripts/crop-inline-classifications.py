#!/usr/bin/env python3
"""改変可能な複合図を各型カード用に切り出す。

対象: 大腸EC / Hill / EREFS / NICE / MESDA-G / GERD LA /
Toya ME-CV / WASP / ITBCC。
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / 'public' / 'figures'

# 複合図は optimize-figures.py で WebP 化済み。座標は元のフル解像度基準。
HILL = ROOT / 'hill-ge2023-fig1.webp'
EREFS = ROOT / 'erefs-abe2022-fig2.webp'
EC2 = ROOT / 'ec-maeda2021-fig2.webp'
EC3 = ROOT / 'ec-maeda2021-fig3.webp'
NICE = ROOT / 'nice-hamada2021-fig1.webp'
TOYA = ROOT / 'toya-kumei2025-fig1.webp'
WASP = ROOT / 'wasp-quach2024-fig4.webp'
ITBCC = ROOT / 'itbcc-zlobec2021-fig1.webp'
MESDA = ROOT / 'mesda-g-kurumi2021-fig5.webp'
LA = ROOT / 'la-jung2025-fig1.webp'

# box = (left, top, right, bottom)
CROPS: dict[str, tuple[Path, tuple[int, int, int, int]]] = {
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
    # NICE: Hamada 2021 Fig. 1 の Endoscopic image 行（1200×788 WebP 座標）
    # 旧座標 y=502–618 は行の下半分のみ。y=396–629 で画像セル全体。
    'nice-hamada2021-type1.jpg': (NICE, (250, 396, 511, 629)),
    'nice-hamada2021-type2.jpg': (NICE, (576, 396, 841, 629)),
    'nice-hamada2021-type3.jpg': (NICE, (907, 396, 1175, 629)),
    # Toya ME-CV: 2×2（a convoluted / b leaf-like / c reticular / d pinecone）。
    'toya-kumei2025-convoluted.jpg': (TOYA, (0, 0, 301, 261)),
    'toya-kumei2025-leaf-like.jpg': (TOYA, (301, 0, 602, 261)),
    'toya-kumei2025-reticular.jpg': (TOYA, (0, 261, 301, 522)),
    'toya-kumei2025-pinecone.jpg': (TOYA, (301, 261, 602, 522)),
    # WASP Fig. 4: b 不明瞭な辺縁 / c 不整形 / d 腺窩内暗点。
    'wasp-quach2024-indistinct-border.jpg': (WASP, (358, 0, 709, 320)),
    'wasp-quach2024-irregular-shape.jpg': (WASP, (0, 330, 348, 652)),
    'wasp-quach2024-dark-spots.jpg': (WASP, (358, 330, 709, 652)),
    # ITBCC: 2×2 のうち研究的 BD0（左上）を除き、公式 BD1–BD3 を切り出す。
    'itbcc-zlobec2021-bd1.jpg': (ITBCC, (342, 0, 684, 170)),
    'itbcc-zlobec2021-bd2.jpg': (ITBCC, (0, 174, 342, 344)),
    'itbcc-zlobec2021-bd3.jpg': (ITBCC, (342, 174, 684, 344)),
    # MESDA-G / VS: 上段 MSP、下段 MVP。各段は regular / irregular / absent。
    'mesda-g-kurumi2021-ms-regular.jpg': (MESDA, (151, 4, 347, 200)),
    'mesda-g-kurumi2021-ms-irregular.jpg': (MESDA, (351, 4, 550, 200)),
    'mesda-g-kurumi2021-ms-absent.jpg': (MESDA, (554, 4, 750, 200)),
    'mesda-g-kurumi2021-mv-regular.jpg': (MESDA, (151, 208, 347, 397)),
    'mesda-g-kurumi2021-mv-irregular.jpg': (MESDA, (351, 208, 550, 397)),
    'mesda-g-kurumi2021-mv-absent.jpg': (MESDA, (554, 208, 750, 397)),
    # GERD LA: Fig. 1 左上から A / B / C、左下が D（E / F は別疾患）。
    'la-jung2025-grade-a.jpg': (LA, (0, 0, 244, 220)),
    'la-jung2025-grade-b.jpg': (LA, (247, 0, 491, 220)),
    'la-jung2025-grade-c.jpg': (LA, (493, 0, 736, 220)),
    'la-jung2025-grade-d.jpg': (LA, (0, 222, 244, 442)),
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
