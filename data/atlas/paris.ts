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
  legend:
    'Paris 分類 Type 0 の模式図。ポリープ型（高さ ≥2.5 mm）: 0-Ip 有茎、0-Isp 亜有茎、0-Is 無茎。非ポリープ型（<2.5 mm）: 0-IIa 表面隆起、0-IIb 平坦、0-IIc 表面陥凹、0-III 潰瘍・掘れ込み。m = 粘膜、sm = 粘膜下層。',
  legendEn:
    'Schematic of the Paris Type 0 classification. Polypoid (≥2.5 mm): 0-Ip pedunculated, 0-Isp subpedunculated, 0-Is sessile. Nonpolypoid (<2.5 mm): 0-IIa flat elevation, 0-IIb flat mucosal change, 0-IIc mucosal depression, 0-III ulceration/excavated. m = mucosa; sm = submucosa.',
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
  legend:
    '胃の Paris 分類の代表例。上段は通常観察、下段は同じ病変の色素内視鏡。列は左から 0-I（隆起）、0-IIa（表面隆起）、0-IIb（平坦）、0-IIc（表面陥凹）。大腸の写真ではない。',
  legendEn:
    'Representative gastric images of the Paris endoscopic classification. Upper row: white light; lower row: the same lesions under chromoendoscopy. Columns, left to right: 0-I (protruded), 0-IIa (superficial elevated), 0-IIb (flat), 0-IIc (superficial depressed). Not colorectal photographs.',
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
