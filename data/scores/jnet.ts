import type { ClassificationDefinition, ClassificationFigure } from '../../types/score';

export const JNET_2016_PUBMED = '26927367';
/** Lee 2021 Clin Endosc（PMID 33401348）。各型 WLE+NBI。下段 NBI をカードに切り抜く。 */
export const JNET_LEE_2021_PUBMED = '33401348';

const LEE_SOURCE =
  'Lee JS, Jeon SW, Kwon YH. Comparative study of narrow-band imaging and i-scan for predicting the histology of intermediate-to-large colorectal polyps: a prospective, randomized pilot study. Clin Endosc. 2021;54:881-887. Fig. 1.';
const LEE_DOI = 'https://doi.org/10.5946/ce.2020.257';

function leeCrop(figure: {
  src: string;
  alt: string;
  caption: string;
  note: string;
  aspectRatio: number;
  figureRef: string;
}): ClassificationFigure {
  return {
    ...figure,
    figureKind: 'secondary',
    sourceShort: 'Lee 2021',
    source: LEE_SOURCE,
    doi: LEE_DOI,
    pubmed: JNET_LEE_2021_PUBMED,
    license: 'CC BY-NC 4.0',
  };
}

export const jnetScore: ClassificationDefinition = {
  id: 'jnet',
  kind: 'classification',
  name: 'JNET分類（大腸 NBI 拡大）',
  shortName: 'JNET',
  developedInJapan: true,
  organ: 'colorectum',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description: '大腸腫瘍の NBI 拡大分類（Type 1 / 2A / 2B / 3）。',
  originalLead:
    'The JNET classification consists of four categories of vessel and surface pattern (i.e. Types 1, 2A, 2B, and 3). Types 1, 2A, 2B, and 3 are correlated with the histopathological findings of hyperplastic polyp/sessile serrated polyp (SSP), low-grade intramucosal neoplasia, high-grade intramucosal neoplasia/shallow submucosal invasive cancer, and deep submucosal invasive cancer, respectively.',
  reference: 'Sano Y et al. Dig Endosc 2016;28:526-533',
  pubmed: JNET_2016_PUBMED,
  figures: [
    {
      href: 'https://onlinelibrary.wiley.com/doi/10.1111/den.12644#den12644-fig-0007',
      hrefLabel: 'Fig. 7',
      figureKind: 'original',
      sourceShort: 'Sano 2016',
      alt: 'JNET classification Type 1, 2A, 2B, and 3 (Sano 2016 Fig. 7)',
      caption: 'Fig. 7. JNET classification (Sano et al. Dig Endosc 2016)',
      source:
        'Sano Y, Tanaka S, Kudo S-E, et al. Narrow-band imaging (NBI) magnifying endoscopic classification of colorectal tumors proposed by the Japan NBI Expert Team. Dig Endosc. 2016;28:526-533.',
      doi: 'https://doi.org/10.1111/den.12644',
      pubmed: JNET_2016_PUBMED,
      note: '原著 Fig. 7。Wiley / JGES の標準著作権。CC ではないので埋め込まず、論文の Fig. 7 へリンクする。',
    },
    {
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8652175/figure/f1-ce-2020-257/',
      hrefLabel: 'Fig. 1',
      figureRef: 'Fig. 1',
      figureKind: 'secondary',
      sourceShort: 'Lee 2021',
      alt: 'JNET Type 1, 2A, 2B, and 3 on WLE and NBI (Lee 2021 Fig. 1)',
      caption: 'Fig. 1. JNET Type 1 / 2A / 2B / 3 on WLE and NBI (Lee et al. 2021)',
      source: LEE_SOURCE,
      doi: LEE_DOI,
      pubmed: JNET_LEE_2021_PUBMED,
      license: 'CC BY-NC 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc/4.0/',
      note: '各型カードに下段 NBI の切り抜きを掲載。原図は埋め込まず Lee 2021 Fig. 1 へリンクする。ライセンスは CC BY-NC 4.0。Sano 2016 原著図ではない。',
    },
  ],
  entries: [
    {
      label: 'Type 1',
      meaning: 'Invisible vessels',
      severity: 'none',
      figures: [
        leeCrop({
          src: '/figures/jnet-lee2021-type1.webp',
          alt: 'JNET Type 1 NBI example (Lee 2021 Fig. 1A)',
          caption: 'Fig. 1A Type 1',
          figureRef: 'Fig. 1A',
          note: 'Lee 2021 Fig. 1 下段 NBI から Type 1 列を切り抜き。CC BY-NC 4.0。',
          aspectRatio: 385 / 292,
        }),
      ],
      rows: [
        { heading: 'Vessel', text: 'Invisible' },
        { heading: 'Surface', text: 'Regular dark or white spots similar to surrounding normal mucosa' },
        { heading: 'Histology', text: 'Hyperplastic polyp / sessile serrated polyp (SSP)' },
        {
          heading: '*1',
          text: 'If visible, the caliber in the lesion is similar to surrounding normal mucosa.',
        },
      ],
    },
    {
      label: 'Type 2A',
      meaning: 'Regular vessels and surface',
      severity: 'mild',
      figures: [
        leeCrop({
          src: '/figures/jnet-lee2021-type2a.webp',
          alt: 'JNET Type 2A NBI example (Lee 2021 Fig. 1B)',
          caption: 'Fig. 1B Type 2A',
          figureRef: 'Fig. 1B',
          note: 'Lee 2021 Fig. 1 下段 NBI から Type 2A 列を切り抜き。CC BY-NC 4.0。',
          aspectRatio: 385 / 292,
        }),
      ],
      rows: [
        { heading: 'Vessel', text: 'Regular caliber; regular distribution (meshed/spiral pattern)' },
        { heading: 'Surface', text: 'Regular (tubular / branched / papillary)' },
        { heading: 'Histology', text: 'Low-grade intramucosal neoplasia' },
        {
          heading: '*2',
          text: 'Micro-vessels are often distributed in a punctate pattern and well-ordered reticular or spiral vessels may not be observed in depressed lesions.',
        },
      ],
    },
    {
      label: 'Type 2B',
      meaning: 'Irregular vessels or surface',
      severity: 'moderate',
      figures: [
        leeCrop({
          src: '/figures/jnet-lee2021-type2b.webp',
          alt: 'JNET Type 2B NBI example (Lee 2021 Fig. 1C)',
          caption: 'Fig. 1C Type 2B',
          figureRef: 'Fig. 1C',
          note: 'Lee 2021 Fig. 1 下段 NBI から Type 2B 列を切り抜き。CC BY-NC 4.0。',
          aspectRatio: 385 / 292,
        }),
      ],
      rows: [
        { heading: 'Vessel', text: 'Variable caliber; irregular distribution' },
        { heading: 'Surface', text: 'Irregular or obscure' },
        { heading: 'Histology', text: 'High-grade intramucosal neoplasia / shallow submucosal invasive cancer' },
        { heading: '*3', text: 'Deep submucosal invasive cancer may be included.' },
      ],
    },
    {
      label: 'Type 3',
      meaning: 'Loose vessels; amorphous surface',
      severity: 'severe',
      figures: [
        leeCrop({
          src: '/figures/jnet-lee2021-type3.webp',
          alt: 'JNET Type 3 NBI example (Lee 2021 Fig. 1D)',
          caption: 'Fig. 1D Type 3',
          figureRef: 'Fig. 1D',
          note: 'Lee 2021 Fig. 1 下段 NBI から Type 3 列を切り抜き。CC BY-NC 4.0。',
          aspectRatio: 386 / 292,
        }),
      ],
      rows: [
        { heading: 'Vessel', text: 'Loose vessel areas; interruption of thick vessels' },
        { heading: 'Surface', text: 'Amorphous areas' },
        { heading: 'Histology', text: 'Deep submucosal invasive cancer' },
      ],
    },
  ],
};
