#!/usr/bin/env python3
"""Haggitt / Yamada / Borrmann の GI Calc SVG から各型を高解像度 WebP にする。"""

from __future__ import annotations

import copy
import re
import subprocess
import tempfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FIGURES = ROOT / 'public' / 'figures'
SVG_NS = 'http://www.w3.org/2000/svg'
NS = {'svg': SVG_NS}
WIDTH = 1200
HEIGHT = 680

JOBS = (
    {
        'source': FIGURES / 'haggitt-gicalc2026-original.svg',
        'outputs': {
            'Level 0': 'haggitt-gicalc2026-level-0.webp',
            'Level 1': 'haggitt-gicalc2026-level-1.webp',
            'Level 2': 'haggitt-gicalc2026-level-2.webp',
            'Level 3': 'haggitt-gicalc2026-level-3.webp',
            'Level 4': 'haggitt-gicalc2026-level-4.webp',
            'Sessile = L4': 'haggitt-gicalc2026-sessile.webp',
        },
    },
    {
        'source': FIGURES / 'yamada-gicalc2026-original.svg',
        'outputs': {
            'Type I': 'yamada-gicalc2026-type-i.webp',
            'Type II': 'yamada-gicalc2026-type-ii.webp',
            'Type III': 'yamada-gicalc2026-type-iii.webp',
            'Type IV': 'yamada-gicalc2026-type-iv.webp',
        },
    },
    {
        'source': FIGURES / 'borrmann-gicalc2026-original.svg',
        'outputs': {
            'Type 1': 'borrmann-gicalc2026-type-1.webp',
            'Type 2': 'borrmann-gicalc2026-type-2.webp',
            'Type 3': 'borrmann-gicalc2026-type-3.webp',
            'Type 4': 'borrmann-gicalc2026-type-4.webp',
        },
    },
)


def label_for(group: ET.Element) -> str | None:
    for text in group.findall('svg:text', NS):
        if text.get('class') == 'label':
            return ''.join(text.itertext()).strip()
    return None


def translation(group: ET.Element) -> tuple[int, int]:
    match = re.fullmatch(r'translate\((\d+),\s*(\d+)\)', group.get('transform', ''))
    if not match:
        raise ValueError(f'unsupported transform: {group.get("transform")}')
    return int(match.group(1)), int(match.group(2))


def geometry_only(group: ET.Element) -> ET.Element:
    result = copy.deepcopy(group)
    for text in result.findall('svg:text', NS):
        result.remove(text)
    return result


def render(group: ET.Element, defs: ET.Element, destination: Path) -> None:
    x, y = translation(group)
    crop = ET.Element(
        f'{{{SVG_NS}}}svg',
        {
            'viewBox': f'{x} {y} 300 185',
            'width': str(WIDTH),
            'height': str(HEIGHT),
        },
    )
    crop.append(copy.deepcopy(defs))
    crop.append(geometry_only(group))

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


def rasterize(source: Path, outputs: dict[str, str]) -> None:
    ET.register_namespace('', SVG_NS)
    root = ET.parse(source).getroot()
    defs = root.find('svg:defs', NS)
    if defs is None:
        raise ValueError(f'SVG defs not found: {source}')

    found: set[str] = set()
    for group in root.findall('svg:g', NS):
        label = label_for(group)
        if label not in outputs:
            continue
        render(group, defs, FIGURES / outputs[label])
        found.add(label)
        print(outputs[label], f'{WIDTH}x{HEIGHT}')

    missing = set(outputs) - found
    if missing:
        raise ValueError(f'{source.name}: missing SVG groups: {sorted(missing)}')


def main() -> None:
    for job in JOBS:
        rasterize(job['source'], job['outputs'])


if __name__ == '__main__':
    main()
