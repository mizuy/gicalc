#!/usr/bin/env python3
"""LST分類SVGから各亜型の模式図を抽出し、高解像度WebPへラスタライズする。"""

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
SOURCE = FIGURES / 'lst-user2026-original.svg'
SVG_NS = 'http://www.w3.org/2000/svg'
NS = {'svg': SVG_NS}
WIDTH = 1400
HEIGHT = 360

OUTPUTS = {
    'g-homogeneous': 'lst-user2026-g-homogeneous.webp',
    'g-mixed': 'lst-user2026-g-mixed.webp',
    'ng-flat': 'lst-user2026-ng-flat.webp',
    'ng-pseudodepressed': 'lst-user2026-ng-pseudodepressed.webp',
}

EXTRA_TOP = {
    'g-homogeneous': 36,
    'g-mixed': 58,
    'ng-flat': 36,
    'ng-pseudodepressed': 42,
}


def translation(element: ET.Element) -> tuple[float, float]:
    match = re.fullmatch(r'translate\(([-\d.]+),\s*([-\d.]+)\)', element.get('transform', '') or 'translate(0, 0)')
    if not match:
        return 0.0, 0.0
    return float(match.group(1)), float(match.group(2))


def type_key(group: ET.Element) -> str | None:
    desc = ' '.join(''.join(text.itertext()) for text in group.findall('svg:text', NS) if text.get('class') == 'type-desc')
    if 'Homogenous' in desc or 'Homogeneous' in desc:
        return 'g-homogeneous'
    if 'Nodular mixed' in desc:
        return 'g-mixed'
    if 'Pseudodepressed' in desc:
        return 'ng-pseudodepressed'
    if 'Flat elevated' in desc:
        return 'ng-flat'
    return None


def geometry_only(group: ET.Element) -> ET.Element:
    result = copy.deepcopy(group)
    for text in result.findall('svg:text', NS):
        result.remove(text)
    return result


def render(group: ET.Element, parent: ET.Element, defs: ET.Element, key: str, destination: Path) -> None:
    tissue = group.find('svg:rect', NS)
    if tissue is None:
        raise ValueError(f'{key}: tissue rect not found')
    px, py = translation(parent)
    x = float(tissue.get('x', '0'))
    y = float(tissue.get('y', '0'))
    width = float(tissue.get('width', '0'))
    height = float(tissue.get('height', '0'))
    extra_top = EXTRA_TOP[key]
    view = ET.Element(
        f'{{{SVG_NS}}}svg',
        {
            'viewBox': f'{px + x - 24:.1f} {py + y - extra_top:.1f} {width + 48:.1f} {extra_top + height + 20:.1f}',
            'width': str(WIDTH),
            'height': str(HEIGHT),
        },
    )
    view.append(copy.deepcopy(defs))
    placed = geometry_only(group)
    placed.set('transform', parent.get('transform', ''))
    view.append(placed)

    with tempfile.NamedTemporaryFile(suffix='.svg') as temporary:
        ET.ElementTree(view).write(temporary.name, encoding='utf-8', xml_declaration=True)
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
    for section in root.findall('svg:g', NS):
        for group in section.findall('svg:g', NS):
            key = type_key(group)
            if key not in OUTPUTS:
                continue
            render(group, section, defs, key, FIGURES / OUTPUTS[key])
            print(OUTPUTS[key], f'{WIDTH}x{HEIGHT}')
            found.add(key)

    missing = set(OUTPUTS) - found
    if missing:
        raise ValueError(f'missing SVG groups: {sorted(missing)}')


if __name__ == '__main__':
    main()
