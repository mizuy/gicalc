#!/usr/bin/env python3
"""Pit pattern SVGの各型要素を抽出し、高解像度WebPへラスタライズする。"""

from __future__ import annotations

import argparse
import copy
import re
import shutil
import subprocess
import tempfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FIGURES = ROOT / 'public' / 'figures'
SOURCE = FIGURES / 'pit-pattern-user2026-original.svg'
SVG_NS = 'http://www.w3.org/2000/svg'
NS = {'svg': SVG_NS}
SIZE = 900

OUTPUTS = {
    'I': 'pit-pattern-user2026-type-i.webp',
    'II': 'pit-pattern-user2026-type-ii.webp',
    'IIIs': 'pit-pattern-user2026-type-iiis.webp',
    'IIIL': 'pit-pattern-user2026-type-iiil.webp',
    'IV': 'pit-pattern-user2026-type-iv.webp',
    'VI': 'pit-pattern-user2026-type-vi.webp',
    'VN': 'pit-pattern-user2026-type-vn.webp',
}


def render(group: ET.Element, defs: ET.Element, destination: Path) -> None:
    match = re.fullmatch(r'translate\((\d+),\s*(\d+)\)', group.get('transform', ''))
    if not match:
        raise ValueError(f'unsupported transform: {group.get("transform")}')
    x, y = int(match.group(1)), int(match.group(2))
    crop = ET.Element(
        f'{{{SVG_NS}}}svg',
        {
            'viewBox': f'{x - 60} {y - 60} 120 120',
            'width': str(SIZE),
            'height': str(SIZE),
        },
    )
    crop.append(copy.deepcopy(defs))
    crop.append(copy.deepcopy(group))

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

    pending_label: str | None = None
    found: set[str] = set()
    for child in root:
        if child.tag == f'{{{SVG_NS}}}text' and child.get('class') == 'type-text':
            pending_label = ''.join(child.itertext()).strip()
            continue
        if child.tag != f'{{{SVG_NS}}}g' or pending_label not in OUTPUTS:
            continue
        render(child, defs, FIGURES / OUTPUTS[pending_label])
        print(OUTPUTS[pending_label], f'{SIZE}x{SIZE}')
        found.add(pending_label)
        pending_label = None

    missing = set(OUTPUTS) - found
    if missing:
        raise ValueError(f'missing SVG groups: {sorted(missing)}')


if __name__ == '__main__':
    main()
