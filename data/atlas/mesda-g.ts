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
      aspectRatio: 1200 / 639,
    }),
    miyaoka({
      src: '/figures/mesda-miyaoka2020-fig6.webp',
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7530321/figure/fig6/',
      figureRef: 'Fig. 6',
      alt: 'MESDA-G example I: absent demarcation line, non-cancer (Miyaoka 2020 Fig. 6)',
      caption: 'Fig. 6. Example of application of MESDA-G (I). Demarcation line absent (Miyaoka et al. 2020)',
      aspectRatio: 1200 / 520,
    }),
    miyaoka({
      src: '/figures/mesda-miyaoka2020-fig7.webp',
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7530321/figure/fig7/',
      figureRef: 'Fig. 7',
      alt: 'MESDA-G example II: demarcation line present with regular MV and MS, non-cancer (Miyaoka 2020 Fig. 7)',
      caption:
        'Fig. 7. Example of application of MESDA-G (II). Demarcation line present; regular MV and MS (Miyaoka et al. 2020)',
      aspectRatio: 1200 / 522,
    }),
    miyaoka({
      src: '/figures/mesda-miyaoka2020-fig8.webp',
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7530321/figure/fig8/',
      figureRef: 'Fig. 8',
      alt: 'MESDA-G example III: demarcation line with irregular MV and MS, cancer (Miyaoka 2020 Fig. 8)',
      caption:
        'Fig. 8. Example of application of MESDA-G (III). Demarcation line present; irregular MV and MS (Miyaoka et al. 2020)',
      aspectRatio: 1200 / 522,
    }),
  ]),
};
