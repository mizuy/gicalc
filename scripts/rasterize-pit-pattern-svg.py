#!/usr/bin/env python3
"""提供されたpit pattern SVGの各crop-targetを高解像度WebPへラスタライズする。"""

from __future__ import annotations

import argparse
import copy
import shutil
import subprocess
import tempfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FIGURES = ROOT / 'public' / 'figures'
SOURCE = FIGURES / 'pit-pattern-gemini2.svg'
SVG_NS = 'http://www.w3.org/2000/svg'
NS = {'svg': SVG_NS}
SIZE = 900

OUTPUTS = {
    'I': 'pit-pattern-gemini2-type-i.webp',
    'II': 'pit-pattern-gemini2-type-ii.webp',
    'IIIs': 'pit-pattern-gemini2-type-iiis.webp',
    'IIIL': 'pit-pattern-gemini2-type-iiil.webp',
    'IV': 'pit-pattern-gemini2-type-iv.webp',
    'VI': 'pit-pattern-gemini2-type-vi.webp',
    'VN': 'pit-pattern-gemini2-type-vn.webp',
}


def render(target: ET.Element, defs: ET.Element, destination: Path) -> None:
    crop = ET.Element(
        f'{{{SVG_NS}}}svg',
        {
            'viewBox': '-70 -70 140 140',
            'width': str(SIZE),
            'height': str(SIZE),
        },
    )
    crop.append(copy.deepcopy(defs))
    isolated_target = copy.deepcopy(target)
    isolated_target.attrib.pop('transform', None)
    crop.append(isolated_target)

    with tempfile.NamedTemporaryFile(suffix='.svg') as temporary:
        ET.ElementTree(crop).write(temporary.name, encoding='utf-8', xml_declaration=True)
        subprocess.run(
            [
                'ffmpeg',
                '-loglevel',
                'error',
                '-y',
                '-i',
                temporary.name,
                '-frames:v',
                '1',
                '-c:v',
                'libwebp',
                '-quality',
                '92',
                '-compression_level',
                '6',
                str(destination),
            ],
            check=True,
        )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '--source',
        type=Path,
        help='初回のみ指定する提供SVG。検証後にpublic/figuresへ保存する。',
    )
    args = parser.parse_args()
    if args.source:
        ET.parse(args.source)
        shutil.copyfile(args.source, SOURCE)

    ET.register_namespace('', SVG_NS)
    root = ET.parse(SOURCE).getroot()
    defs = root.find('svg:defs', NS)
    if defs is None:
        raise ValueError('SVG defs not found')

    found: set[str] = set()
    for label, output in OUTPUTS.items():
        target = root.find(f".//svg:g[@id='crop-target-{label}']", NS)
        if target is None:
            continue
        render(target, defs, FIGURES / output)
        print(output, f'{SIZE}x{SIZE}')
        found.add(label)

    missing = set(OUTPUTS) - found
    if missing:
        raise ValueError(f'missing SVG groups: {sorted(missing)}')


if __name__ == '__main__':
    main()
