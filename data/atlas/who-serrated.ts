import type { AtlasDefinition, AtlasFigure } from './types';
import { sortedAtlasFigures } from './types';

const MEZZAPESA_SOURCE =
  'Mezzapesa M, Losurdo G, Celiberto F, et al. Serrated colorectal lesions: an up-to-date review from histological pattern to molecular pathogenesis. Int J Mol Sci. 2022;23:4461.';
const MEZZAPESA_DOI = 'https://doi.org/10.3390/ijms23084461';
const MEZZAPESA_PUBMED = '35457279';

function mezzapesa(figure: {
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
    sourceShort: 'Mezzapesa 2022',
    source: `${MEZZAPESA_SOURCE} ${figure.figureRef}.`,
    doi: MEZZAPESA_DOI,
    pubmed: MEZZAPESA_PUBMED,
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    note: 'アトラス用。切り抜きせず原図全体を掲載。病理写真。CC BY 4.0。WHO Blue Book は CC ではない。',
    year: 2022,
    month: 4,
    authors: 'Mezzapesa',
  };
}

const HYUN_SOURCE =
  'Hyun E, Helewa RM, Singh H, Wightman R, Park J. Serrated polyps and polyposis of the colon: a brief review for surgeon endoscopists. Can J Surg. 2021;64:E561-E566.';
const HYUN_DOI = 'https://doi.org/10.1503/cjs.018820';
const HYUN_PUBMED = '34728521';

function hyun(figure: {
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
    sourceShort: 'Hyun 2021',
    source: `${HYUN_SOURCE} ${figure.figureRef}.`,
    doi: HYUN_DOI,
    pubmed: HYUN_PUBMED,
    license: 'CC BY-NC-ND 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
    note: 'アトラス用。CC BY-NC-ND 4.0 なので改変・切り抜きせず原図全体を掲載。WHO Blue Book は CC ではない。',
    year: 2021,
    month: 11,
    authors: 'Hyun',
  };
}

/** カード切り抜きは無い。ホストできる CC 図を出版年の降順。 */
export const whoSerratedAtlas: AtlasDefinition = {
  id: 'who-serrated',
  scoreId: 'who-serrated',
  figures: sortedAtlasFigures([
    mezzapesa({
      src: '/figures/serrated-mezzapesa2022-fig1.webp',
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9032676/figure/ijms-23-04461-f001/',
      figureRef: 'Fig. 1',
      alt: 'Histopathology of a hyperplastic polyp (Mezzapesa 2022 Fig. 1)',
      caption: 'Fig. 1. Histopathological picture of a hyperplastic polyp (Mezzapesa et al. 2022)',
      legend: '過形成性ポリープの病理。矢印は粘液小胞。ヘマトキシリン・エオジン、200倍。',
      legendEn:
        'Histopathological picture of a hyperplastic polyp. The arrow highlights mucin vesicles. Hematoxylin–eosin, 200×.',
      aspectRatio: 550 / 405,
    }),
    mezzapesa({
      src: '/figures/serrated-mezzapesa2022-fig2.webp',
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9032676/figure/ijms-23-04461-f002/',
      figureRef: 'Fig. 2',
      alt: 'Histopathology of a sessile serrated lesion (Mezzapesa 2022 Fig. 2)',
      caption: 'Fig. 2. Histopathological picture of an SSL (Mezzapesa et al. 2022)',
      legend: 'SSL の病理。矢印は L 字型・T 字型の陰窩。ヘマトキシリン・エオジン、40倍。',
      legendEn:
        'Histopathological picture of an SSL. L- and T-shaped crypts are highlighted by arrows. Hematoxylin–eosin, 40×.',
      aspectRatio: 1200 / 890,
    }),
    mezzapesa({
      src: '/figures/serrated-mezzapesa2022-fig3.webp',
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9032676/figure/ijms-23-04461-f003/',
      figureRef: 'Fig. 3',
      alt: 'Histopathology of an SSL with dysplasia (Mezzapesa 2022 Fig. 3)',
      caption: 'Fig. 3. Histopathological picture of an SSL with dysplasia (Mezzapesa et al. 2022)',
      legend:
        '異型を伴う SSL の病理。赤矢印は異型、黒矢印は偽浸潤様の所見。ヘマトキシリン・エオジン、40倍。',
      legendEn:
        'Histopathological picture of an SSL with dysplasia (red arrow) and a pseudo-invasive pattern (black arrow). Hematoxylin–eosin, 40×.',
      aspectRatio: 1200 / 889,
    }),
    mezzapesa({
      src: '/figures/serrated-mezzapesa2022-fig4.webp',
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9032676/figure/ijms-23-04461-f004/',
      figureRef: 'Fig. 4',
      alt: 'Histopathology of a traditional serrated adenoma (Mezzapesa 2022 Fig. 4)',
      caption: 'Fig. 4. Histopathological picture of a TSA (Mezzapesa et al. 2022)',
      legend: 'TSA の病理。挿入図の矢印は鉛筆状核。ヘマトキシリン・エオジン、20倍。',
      legendEn:
        'Histopathological picture of a TSA. Penicillate nuclei are indicated in the inset by an arrow. Hematoxylin–eosin, 20×.',
      aspectRatio: 550 / 439,
    }),
    hyun({
      src: '/figures/serrated-dang2021-fig1.webp',
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8565879/figure/f1-064e561/',
      figureRef: 'Fig. 1',
      alt: 'Histopathology of hyperplastic polyp, sessile serrated lesion, and traditional serrated adenoma (Hyun 2021 Fig. 1)',
      caption: 'Fig. 1. Histomorphologic characteristics of serrated polyps (Hyun et al. 2021)',
      legend:
        '鋸歯状ポリープの病理。(A) 過形成性ポリープ。陰窩は表面から固有筋層まで直線的。(B) SSL。深部陰窩の拡張・鋸歯と boot / L / 逆 T 型の水平進展、固有筋層へのヘルニア。(C) TSA。鉛筆状核、好酸性細胞質、異所性陰窩。',
      legendEn:
        'Histopathologic features of serrated polyps. (A) Hyperplastic polyp: straight crypts from the surface to the muscularis propria. (B) SSL: deep crypt dilation/serration with boot-, L-, or inverted-T-shaped bases, and crypt herniation through the muscularis propria. (C) TSA: pencillate nuclei, eosinophilic cytoplasm, and ectopic crypts.',
      aspectRatio: 673 / 1280,
    }),
    hyun({
      src: '/figures/serrated-dang2021-fig2.webp',
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8565879/figure/f2-064e561/',
      figureRef: 'Fig. 2',
      alt: 'Endoscopic appearance of hyperplastic polyp and sessile serrated lesion (Hyun 2021 Fig. 2)',
      caption: 'Fig. 2. Endoscopic features of hyperplastic polyps and sessile serrated lesions (Hyun et al. 2021)',
      legend:
        '鋸歯状ポリープの内視鏡像。(A) 過形成性ポリープ。淡く平滑で平坦。(B) SSL。淡く平坦で辺縁不整、しばしば粘液帽を伴う。',
      legendEn:
        'Endoscopic appearance of serrated polyps. (A) Hyperplastic polyp: pale, smooth, and flat. (B) SSL: pale and flat with irregular borders, commonly covered by a mucous cap.',
      aspectRatio: 1200 / 479,
    }),
  ]),
};
