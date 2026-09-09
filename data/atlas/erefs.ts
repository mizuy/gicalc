import type { AtlasDefinition, AtlasFigure } from './types';
import { sortedAtlasFigures } from './types';

const TANAKA: AtlasFigure = {
  src: '/figures/erefs-sawada2025-fig1.webp',
  href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11736424/figure/deo270063-fig-0001/',
  hrefLabel: 'Fig. 1',
  figureRef: 'Fig. 1',
  figureKind: 'secondary',
  sourceShort: 'Tanaka 2025',
  alt: 'Histology and endoscopic EREFS features of eosinophilic esophagitis (Tanaka 2025 Fig. 1)',
  caption: 'Fig. 1. Endoscopic characteristics of eosinophilic esophagitis (Tanaka et al. 2025)',
  legend:
    '(a) 好酸球性食道炎の病理。上皮内好酸球浸潤（45/HPF）と脱顆粒。(b) rings grade 1、furrows grade 1。(c) edema / rings / exudates / furrows 各 grade 1。矢頭は滲出物。(d) edema grade 1、rings grade 2、exudates grade 1。(e) strictures grade 1。(f) NBI の beige mucosa。',
  legendEn:
    '(a) Histology of eosinophilic esophagitis: intraepithelial eosinophils (45/HPF) and degranulation. (b) Rings grade 1; furrows grade 1. (c) Edema, rings, exudates, and furrows, each grade 1; arrowhead marks exudate. (d) Edema grade 1; rings grade 2; exudates grade 1. (e) Strictures grade 1. (f) Beige mucosa on NBI.',
  source:
    'Tanaka F, Sawada A, Tanaka S, Kohashi K, Fujiwara Y. Endoscopic diagnosis and management of eosinophilic esophagitis. DEN Open. 2025;5:e70063. Fig. 1.',
  doi: 'https://doi.org/10.1002/deo2.70063',
  pubmed: '39822952',
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  note: 'アトラス用。切り抜きせず原図全体を掲載。病理と EREFS 所見。PMC 表示解像度。CC BY 4.0。カードの切り抜きは Abe 2022。',
  aspectRatio: 600 / 349,
  year: 2025,
  month: 1,
  authors: 'Tanaka',
};

/** メイン（Abe 2022）に使った Figure は重ねない。残り1枚。 */
export const erefsAtlas: AtlasDefinition = {
  id: 'erefs',
  scoreId: 'erefs',
  figures: sortedAtlasFigures([TANAKA]),
};
