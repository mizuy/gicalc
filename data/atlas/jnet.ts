import type { AtlasDefinition, AtlasFigure } from './types';
import { sortedAtlasFigures } from './types';

const AHMED: AtlasFigure = {
  src: '/figures/jnet-ahmed2024-fig1.webp',
  href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10681000/figure/deo2322-fig-0001/',
  hrefLabel: 'Fig. 1',
  figureRef: 'Fig. 1',
  figureKind: 'secondary',
  sourceShort: 'Ahmed 2024',
  alt: 'Representative JNET Type 1, 2A, 2B, and 3 lesions (Ahmed 2024 Fig. 1)',
  caption: 'Fig. 1. Representative JNET Type 1, 2A, 2B, and 3 lesions (Ahmed et al. 2024)',
  source:
    'Ahmed N, Bechara R. Endoscopic submucosal dissection and JNET classification for colorectal neoplasia: a North American academic center experience. DEN Open. 2024;4:e322. Fig. 1.',
  doi: 'https://doi.org/10.1002/deo2.322',
  pubmed: '38023663',
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  note: 'アトラス用。切り抜きせず原図全体を掲載。左から Type 1、2A、2B、3。Type 3 は出血あり。CC BY 4.0。Lee 2021 をメインの切り抜きに使ったので、こちらはメインに埋め込まない。',
  aspectRatio: 800 / 155,
  year: 2024,
  month: 4,
  authors: 'Ahmed',
};

const LE: AtlasFigure = {
  src: '/figures/jnet-le2024-fig2.webp',
  href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11224830/figure/F2/',
  hrefLabel: 'Fig. 2',
  figureRef: 'Fig. 2',
  figureKind: 'secondary',
  sourceShort: 'Le 2024',
  alt: 'JNET Type 1, 2A, 2B, and 3 with dual-focus NBI (Le 2024 Fig. 2)',
  caption: 'Fig. 2. JNET Type 1 / 2A / 2B / 3 with dual-focus NBI (Le et al. 2024)',
  source:
    'Le NQ, Huynh TM, Vo DTN, et al. Diagnostic performance of the Japanese Narrow-band imaging expert team classification system using dual focus magnification in real-time Vietnamese setting. Medicine (Baltimore). 2024;103:e38752. Fig. 2.',
  doi: 'https://doi.org/10.1097/MD.0000000000038752',
  pubmed: '38968516',
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  note: 'アトラス用。切り抜きせず原図全体を掲載。A–D = Type 1 / 2A / 2B / 3。dual-focus NBI。CC BY 4.0。',
  aspectRatio: 800 / 699,
  year: 2024,
  month: 7,
  authors: 'Le',
};

const WANG: AtlasFigure = {
  src: '/figures/jnet-wang2021-fig2.webp',
  href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7805268/figure/F2/',
  hrefLabel: 'Fig. 2',
  figureRef: 'Fig. 2',
  figureKind: 'secondary',
  sourceShort: 'Wang 2021',
  alt: 'JNET classification vessel and surface patterns with examples (Wang 2021 Fig. 2)',
  caption: 'Fig. 2. Japanese Narrow-band Imaging Expert Team classification (Wang et al. 2021)',
  source:
    'Wang Y, Li WK, Wang YD, Liu KL, Wu J. Diagnostic performance of narrow-band imaging international colorectal endoscopic and Japanese narrow-band imaging expert team classification systems for colorectal cancer and precancerous lesions. World J Gastrointest Oncol. 2021;13:58-68. Fig. 2.',
  doi: 'https://doi.org/10.4251/wjgo.v13.i1.58',
  pubmed: '33510849',
  license: 'CC BY-NC 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-nc/4.0/',
  note: 'アトラス用。切り抜きせず原図全体を掲載。拡大 NBI の典型例。CC BY-NC 4.0。',
  aspectRatio: 765 / 316,
  year: 2021,
  month: 1,
  authors: 'Wang',
};

/** メイン（Lee 2021）に使った Figure は重ねない。残りを出版年の降順。 */
export const jnetAtlas: AtlasDefinition = {
  id: 'jnet',
  scoreId: 'jnet',
  figures: sortedAtlasFigures([AHMED, LE, WANG]),
};
