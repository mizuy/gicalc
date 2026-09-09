import type { AtlasDefinition, AtlasFigure } from './types';
import { sortedAtlasFigures } from './types';

const IWASHITA_SOURCE =
  'Iwashita Y, Ito K, Noda Y, et al. A case of ampullary adenoma that developed to cancer 7 years after initial diagnosis. Am J Case Rep. 2015;16:586-589.';
const IWASHITA_DOI = 'https://doi.org/10.12659/AJCR.894014';
const IWASHITA_PUBMED = '26324328';

function iwashita(figure: {
  src: string;
  href: string;
  figureRef: string;
  alt: string;
  caption: string;
  legend: string;
  legendEn: string;
  aspectRatio: number;
}): AtlasFigure {
  return {
    ...figure,
    hrefLabel: figure.figureRef,
    figureKind: 'secondary',
    sourceShort: 'Iwashita 2015',
    source: `${IWASHITA_SOURCE} ${figure.figureRef}.`,
    doi: IWASHITA_DOI,
    pubmed: IWASHITA_PUBMED,
    license: 'CC BY-NC-ND 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/3.0/',
    note: 'アトラス用。CC BY-NC-ND 3.0 なので改変・切り抜きせず原図全体を掲載。症例経過であり I–III+異常血管の一覧ではない。Uchiyama 2006 原著は CC ではない。',
    year: 2015,
    month: 9,
    authors: 'Iwashita',
  };
}

/** カード切り抜きは無い。ホストできる CC 図を図番号順。 */
export const uchiyamaAtlas: AtlasDefinition = {
  id: 'uchiyama',
  scoreId: 'uchiyama',
  figures: sortedAtlasFigures([
    iwashita({
      src: '/figures/uchiyama-iwashita2015-fig1.webp',
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4560156/figure/f1-amjcaserep-16-586/',
      figureRef: 'Fig. 1',
      alt: 'Ampullary adenoma at diagnosis: white light, NBI villi, histology, and EUS (Iwashita 2015 Fig. 1)',
      caption: 'Fig. 1. Ampullary adenoma at the initial diagnosis (Iwashita et al. 2015)',
      legend:
        '初回診断時の乳頭部腺腫。(A) 十二指腸鏡。褪色〜一部発赤の分葉状隆起。(B) NBI。卵円〜松かさ/葉状の絨毛（矢印）。(C) 生検は管状腺腫。(D) EUS。低エコー腫瘤（矢印）は乳頭部に限局し、十二指腸固有筋層への浸潤なし（矢頭）。',
      legendEn:
        'Ampullary adenoma at the initial diagnosis. (A) Duodenoscopy: discolored, partly reddish, lobular protruding tumor. (B) NBI: oval and pinecone/leaf-shaped villi (arrow). (C) Biopsy: tubular adenoma. (D) EUS: hypoechoic mass (arrow) limited to the ampulla without invasion of the duodenal muscularis propria (arrowhead).',
      aspectRatio: 720 / 720,
    }),
    iwashita({
      src: '/figures/uchiyama-iwashita2015-fig2.webp',
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4560156/figure/f2-amjcaserep-16-586/',
      figureRef: 'Fig. 2',
      alt: 'Ampullary adenocarcinoma 7 years later: white light, irregular NBI surface, histology, and EUS (Iwashita 2015 Fig. 2)',
      caption: 'Fig. 2. Progression to ampullary adenocarcinoma after 7 years (Iwashita et al. 2015)',
      legend:
        '7年後の腺癌化。(A) 十二指腸鏡。胆管開口部周囲の易出血性・発赤・凹凸面。(B) NBI。不整で無構造の表面（矢印）。(C) 生検は高分化腺癌。(D) EUS。低エコー腫瘤（矢印）が十二指腸固有筋層へ浸潤（矢頭）。',
      legendEn:
        'Progression to adenocarcinoma after 7 years. (A) Duodenoscopy: easy-bleeding, reddish, uneven surface around the bile-duct orifice. (B) NBI: irregular, non-structured surface (arrow). (C) Biopsy: well-differentiated adenocarcinoma. (D) EUS: hypoechoic mass (arrow) invading the duodenal muscularis propria (arrowhead).',
      aspectRatio: 720 / 703,
    }),
  ]),
};
