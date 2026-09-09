import type { AtlasDefinition, AtlasFigure } from './types';
import { sortedAtlasFigures } from './types';

const MYUNG: AtlasFigure = {
  src: '/figures/lst-moon2017-fig1.webp',
  href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5627894/figure/pone.0184205.g001/',
  hrefLabel: 'Fig. 1',
  figureRef: 'Fig. 1',
  figureKind: 'secondary',
  sourceShort: 'Myung 2017',
  alt: 'LST-G homogeneous, LST-G mixed, LST-NG flat elevated, and LST-NG pseudodepressed on white light and indigo carmine (Myung 2017 Fig. 1)',
  caption:
    'Fig. 1. Endoscopic and chromoscopic findings of laterally spreading tumors (Myung et al. 2017)',
  legend:
    'LST の通常観察（A–D）と 0.4% インジゴカルミン散布（E–H）。A/E: LST-G 均一型（HG）。B/F: LST-G 結節混在型（NM）。C/G: LST-NG 平坦隆起型（FE）。D/H: LST-NG 偽陥凹型（PD）。',
  legendEn:
    'Endoscopic (A–D) and chromoscopic (E–H) findings of LSTs with 0.4% indigo carmine. A/E: LST-G homogeneous. B/F: LST-G nodular mixed. C/G: LST-NG flat elevated. D/H: LST-NG pseudodepressed.',
  source:
    'Myung DS, Kweon SS, Lee J, et al. Clinicopathological features of laterally spreading colorectal tumors and their association with advanced histology and invasiveness: an experience from Honam province of South Korea. PLoS One. 2017;12:e0184205. Fig. 1.',
  doi: 'https://doi.org/10.1371/journal.pone.0184205',
  pubmed: '28977010',
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  note: 'アトラス用。切り抜きせず原図全体を掲載。A/E G-HG、B/F G-NM、C/G NG-FE、D/H NG-PD。CC BY 4.0。カードの切り抜きは GI Calc 自作図。',
  aspectRatio: 1182 / 1913,
  year: 2017,
  month: 10,
  authors: 'Myung',
};

/** メイン（GI Calc 模式図）に使った Figure は重ねない。残り1枚。 */
export const lstAtlas: AtlasDefinition = {
  id: 'lst',
  scoreId: 'lst',
  figures: sortedAtlasFigures([MYUNG]),
};
