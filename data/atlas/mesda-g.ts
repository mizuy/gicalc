import type { AtlasDefinition, AtlasFigure } from './types';
import { sortedAtlasFigures } from './types';

const MIYAOKA_SOURCE =
  'Miyaoka M, Yao K, Tanabe H, et al. Diagnosis of early gastric cancer using image enhanced endoscopy: a systematic approach. Transl Gastroenterol Hepatol. 2020;5:50.';
const MIYAOKA_DOI = 'https://doi.org/10.21037/tgh.2019.12.16';
const MIYAOKA_PUBMED = '33073045';

function miyaoka(figure: {
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
    sourceShort: 'Miyaoka 2020',
    source: `${MIYAOKA_SOURCE} ${figure.figureRef}.`,
    doi: MIYAOKA_DOI,
    pubmed: MIYAOKA_PUBMED,
    license: 'CC BY-NC-ND 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
    note: 'アトラス用。CC BY-NC-ND 4.0 なので改変・切り抜きせず原図全体を掲載。カードの切り抜きは Kurumi 2021。',
    year: 2020,
    month: 10,
    authors: 'Miyaoka',
  };
}

/** メイン（Kurumi 2021）に使った Figure は重ねない。残りを図番号順。 */
export const mesdaGAtlas: AtlasDefinition = {
  id: 'mesda-g',
  scoreId: 'mesda-g',
  figures: sortedAtlasFigures([
    miyaoka({
      src: '/figures/mesda-miyaoka2020-fig5.webp',
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7530321/figure/fig5/',
      figureRef: 'Fig. 5',
      alt: 'MESDA-G algorithm: demarcation line then irregular MV and/or MS (Miyaoka 2020 Fig. 5)',
      caption: 'Fig. 5. Magnifying endoscopy simple diagnostic algorithm for early gastric cancer (Miyaoka et al. 2020)',
      legend:
        '早期胃癌の拡大内視鏡簡易診断アルゴリズム（MESDA-G）。まず境界線（demarcation line）の有無を見る。境界線がなければ非癌。あれば内部の不整 MV（IMVP）または不整 MS（IMSP）を評価し、いずれかがあれば癌。',
      legendEn:
        'Magnifying endoscopy simple diagnostic algorithm for early gastric cancer (MESDA-G). First look for a demarcation line. If absent, the lesion is non-cancer. If present, assess irregular MV (IMVP) and/or irregular MS (IMSP) inside the line; either finding means cancer.',
      aspectRatio: 1200 / 639,
    }),
    miyaoka({
      src: '/figures/mesda-miyaoka2020-fig6.webp',
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7530321/figure/fig6/',
      figureRef: 'Fig. 6',
      alt: 'MESDA-G example I: absent demarcation line, non-cancer (Miyaoka 2020 Fig. 6)',
      caption: 'Fig. 6. Example of application of MESDA-G (I). Demarcation line absent (Miyaoka et al. 2020)',
      legend:
        'MESDA-G の適用例 (I)。境界線なし → 非癌。(A) 通常観察。胃前庭部後壁の平坦な発赤（黄矢印）。(B) NBI 拡大。毛細血管と辺縁陰窩上皮の変化は漸増で、境界線は認めない。',
      legendEn:
        'MESDA-G example (I). Demarcation line absent → non-cancer. (A) White light: flat reddish mucosa on the posterior antral wall (yellow arrow). (B) Magnifying NBI: gradual change in capillaries and marginal crypt epithelium; no abrupt border.',
      aspectRatio: 1200 / 520,
    }),
    miyaoka({
      src: '/figures/mesda-miyaoka2020-fig7.webp',
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7530321/figure/fig7/',
      figureRef: 'Fig. 7',
      alt: 'MESDA-G example II: demarcation line present with regular MV and MS, non-cancer (Miyaoka 2020 Fig. 7)',
      caption:
        'Fig. 7. Example of application of MESDA-G (II). Demarcation line present; regular MV and MS (Miyaoka et al. 2020)',
      legend:
        'MESDA-G の適用例 (II)。境界線あり、不整 MV / 不整 MS なし → 非癌。(A) 通常観察。胃体部後壁の浅い発赤陥凹（黄矢印）。(B) NBI 拡大。黄矢印の部位で MV / MS が急変し境界線あり。内部の血管と辺縁陰窩上皮は整。',
      legendEn:
        'MESDA-G example (II). Demarcation line present; irregular MV and MS absent → non-cancer. (A) White light: slightly concave reddish lesion on the posterior corpus (yellow arrow). (B) Magnifying NBI: abrupt MV/MS change at the yellow arrows. Inside the line, vessels and marginal crypt epithelium are regular.',
      aspectRatio: 1200 / 522,
    }),
    miyaoka({
      src: '/figures/mesda-miyaoka2020-fig8.webp',
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7530321/figure/fig8/',
      figureRef: 'Fig. 8',
      alt: 'MESDA-G example III: demarcation line with irregular MV and MS, cancer (Miyaoka 2020 Fig. 8)',
      caption:
        'Fig. 8. Example of application of MESDA-G (III). Demarcation line present; irregular MV and MS (Miyaoka et al. 2020)',
      legend:
        'MESDA-G の適用例 (III)。境界線あり、不整 MV と不整 MS あり → 癌。(A) 通常観察。胃前庭部小弯の境界明瞭な陥凹と不整発赤（黄矢印）。(B) NBI 拡大（A の黄枠）。黄矢印に明瞭な境界線。内部の微小血管は不整ループ、辺縁陰窩上皮も不整または欠如。',
      legendEn:
        'MESDA-G example (III). Demarcation line present; irregular MV and MS present → cancer. (A) White light: well-demarcated depressed lesion with irregular redness on the lesser-curvature antrum (yellow arrow). (B) Magnifying NBI (yellow box in A): clear demarcation (yellow arrows). Inside, microvessels form irregular loops; marginal crypt epithelium is irregular or absent.',
      aspectRatio: 1200 / 522,
    }),
  ]),
};
