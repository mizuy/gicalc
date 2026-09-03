import type { ClassificationDefinition } from '../../types/score';

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
  pubmed: '26927367',
  figures: [
    {
      href: 'https://onlinelibrary.wiley.com/doi/10.1111/den.12644#den12644-fig-0007',
      hrefLabel: 'Fig. 7',
      alt: 'JNET classification Type 1, 2A, 2B, and 3 (Sano 2016 Fig. 7)',
      caption: 'Fig. 7. JNET classification (Sano et al. Dig Endosc 2016)',
      source:
        'Sano Y, Tanaka S, Kudo S-E, et al. Narrow-band imaging (NBI) magnifying endoscopic classification of colorectal tumors proposed by the Japan NBI Expert Team. Dig Endosc. 2016;28:526-533.',
      doi: 'https://doi.org/10.1111/den.12644',
      pubmed: '26927367',
      note: '原著 Fig. 7。Wiley / JGES の標準著作権。CC ではないので画像は置かず、論文の Fig. 7 へリンクする。',
    },
  ],
  entries: [
    {
      label: 'Type 1',
      meaning: 'Hyperplastic polyp / SSP',
      severity: 'none',
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
      meaning: 'Low-grade intramucosal neoplasia',
      severity: 'mild',
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
      meaning: 'HGIEN / shallow SM invasive cancer',
      severity: 'moderate',
      rows: [
        { heading: 'Vessel', text: 'Variable caliber; irregular distribution' },
        { heading: 'Surface', text: 'Irregular or obscure' },
        { heading: 'Histology', text: 'High-grade intramucosal neoplasia / shallow submucosal invasive cancer' },
        { heading: '*3', text: 'Deep submucosal invasive cancer may be included.' },
      ],
    },
    {
      label: 'Type 3',
      meaning: 'Deep SM invasive cancer',
      severity: 'severe',
      rows: [
        { heading: 'Vessel', text: 'Loose vessel areas; interruption of thick vessels' },
        { heading: 'Surface', text: 'Amorphous areas' },
        { heading: 'Histology', text: 'Deep submucosal invasive cancer' },
      ],
    },
  ],
};
