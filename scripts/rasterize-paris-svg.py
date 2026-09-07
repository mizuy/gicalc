#!/usr/bin/env python3
"""Paris分類SVGから各型の要素を抽出し、高解像度WebPへラスタライズする。"""

from __future__ import annotations

import copy
import re
import subprocess
import tempfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FIGURES = ROOT / 'public' / 'figures'
SOURCE = FIGURES / 'paris-user2026-original.svg'
SVG_NS = 'http://www.w3.org/2000/svg'
NS = {'svg': SVG_NS}
WIDTH = 1200
HEIGHT = 680

OUTPUTS = {
    '0-Ip': 'paris-user2026-0-ip.webp',
    '0-Is': 'paris-user2026-0-is.webp',
    '0-IIa': 'paris-user2026-0-iia.webp',
    '0-IIb': 'paris-user2026-0-iib.webp',
    '0-IIc': 'paris-user2026-0-iic.webp',
    '0-IIc + IIa': 'paris-user2026-0-iic-iia.webp',
    '0-IIa + IIc (Pattern 1)': 'paris-user2026-0-iia-iic-1.webp',
    '0-IIa + IIc (Pattern 2)': 'paris-user2026-0-iia-iic-2.webp',
    '0-III': 'paris-user2026-0-iii.webp',
    '0-IIc + III': 'paris-user2026-0-iic-iii.webp',
    '0-III + IIc': 'paris-user2026-0-iii-iic.webp',
}


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
            'viewBox': f'{x} {y + 10} 300 170',
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


def main() -> None:
    ET.register_namespace('', SVG_NS)
    root = ET.parse(SOURCE).getroot()
    defs = root.find('svg:defs', NS)
    if defs is None:
        raise ValueError('SVG defs not found')

    found: set[str] = set()
    for group in root.findall('svg:g', NS):
        label = label_for(group)
        if label not in OUTPUTS:
            continue
        render(group, defs, FIGURES / OUTPUTS[label])
        found.add(label)
        print(OUTPUTS[label], f'{WIDTH}x{HEIGHT}')

    missing = set(OUTPUTS) - found
    if missing:
        raise ValueError(f'missing SVG groups: {sorted(missing)}')


if __name__ == '__main__':
    main()
