import type { AtlasDefinition, AtlasFigure } from './types';
import { sortedAtlasFigures } from './types';

const JOHNSON: AtlasFigure = {
  src: '/figures/paris-johnson2023-fig1.webp',
  href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10521811/figure/fig1-E491/',
  hrefLabel: 'Fig. 1',
  figureRef: 'Fig. 1',
  figureKind: 'secondary',
  sourceShort: 'Johnson 2023',
  alt: 'Schematic of the Paris Type 0 classification of polyp morphology (Johnson 2023 Fig. 1)',
  caption: 'Fig. 1. Schematic representation of the Paris classification of polyp morphology (Johnson et al. 2023)',
  source:
    'Johnson GGRJ, Helewa RM, Hyun E, Moffatt DC, Coneys JG, Park J. Colorectal polyp classification and management of complex polyps for surgeon endoscopists. Can J Surg. 2023;66:E491-E498. Fig. 1.',
  doi: 'https://doi.org/10.1503/cjs.011422',
  pubmed: '37734853',
  license: 'CC BY-NC-ND 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
  note: 'アトラス用。CC BY-NC-ND 4.0 なので改変・切り抜きせず原図全体を掲載。模式図。Fig. 2 以降は許諾再掲のため未取得。カードの切り抜きは GI Calc 自作図。',
  aspectRatio: 1200 / 681,
  year: 2023,
  month: 9,
  authors: 'Johnson',
};

const FUJIYOSHI: AtlasFigure = {
  src: '/figures/paris-castaneda2022-fig1.webp',
  href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8750452/figure/cancers-14-00100-f001/',
  hrefLabel: 'Fig. 1',
  figureRef: 'Fig. 1',
  figureKind: 'secondary',
  sourceShort: 'Fujiyoshi 2022',
  alt: 'Gastric Paris Type 0 examples: 0-I, 0-IIa, 0-IIb, and 0-IIc on white light and chromoendoscopy (Fujiyoshi 2022 Fig. 1)',
  caption: 'Fig. 1. Representative images of the Paris endoscopic classification (Fujiyoshi et al. 2022)',
  source:
    'Fujiyoshi MRA, Inoue H, Fujiyoshi Y, et al. Endoscopic classifications of early gastric cancer: a literature review. Cancers (Basel). 2022;14:100. Fig. 1.',
  doi: 'https://doi.org/10.3390/cancers14010100',
  pubmed: '35008263',
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  note: 'アトラス用。切り抜きせず原図全体を掲載。胃の 0-I / IIa / IIb / IIc（WLI+色素）であり大腸の写真ではない。CC BY 4.0。',
  aspectRatio: 1200 / 576,
  year: 2022,
  month: 1,
  authors: 'Fujiyoshi',
};

/** メイン（GI Calc 模式図）に使った Figure は重ねない。残りを出版年の降順。 */
export const parisAtlas: AtlasDefinition = {
  id: 'paris',
  scoreId: 'paris',
  figures: sortedAtlasFigures([JOHNSON, FUJIYOSHI]),
};
