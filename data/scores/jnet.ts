import type { ClassificationDefinition } from '../../types/score';

export const jnetScore: ClassificationDefinition = {
  id: 'jnet',
  kind: 'classification',
  name: 'JNET分類（大腸 NBI 拡大）',
  shortName: 'JNET',
  organ: 'colorectum',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description: '大腸腫瘍の NBI 拡大分類（Type 1 / 2A / 2B / 3）。',
  originalLead:
    'The JNET classification consists of four categories of vessel and surface pattern (Types 1, 2A, 2B, and 3). Types 1, 2A, 2B, and 3 are correlated with hyperplastic polyp/SSP, low-grade intramucosal neoplasia, high-grade intramucosal neoplasia/shallow SM invasive cancer, and deep SM invasive cancer, respectively.',
  reference: 'Sano Y et al. Dig Endosc 2016;28:526-533',
  pubmed: '26927367',
  figures: [
    {
      src: '/figures/jnet-sano2016-fig7.jpg',
      alt: 'JNET classification Type 1, 2A, 2B, and 3 (Sano 2016 Fig. 7)',
      caption: 'Fig. 7. JNET classification (Sano et al. Dig Endosc 2016)',
      source:
        'Sano Y, Tanaka S, Kudo S-E, et al. Narrow-band imaging (NBI) magnifying endoscopic classification of colorectal tumors proposed by the Japan NBI Expert Team. Dig Endosc. 2016;28:526-533.',
      doi: 'https://doi.org/10.1111/den.12644',
      pubmed: '26927367',
      note: '原著 Fig. 7。vessel / surface / most likely histology と NBI 拡大写真。',
      aspectRatio: 1302 / 766,
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
          heading: '注',
          text: '原著注: 見える場合、口径は周囲正常粘膜と同程度。右側で粘液帽など SSL を疑う場合は切除を検討。',
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
          heading: '注',
          text: '原著注: 陥凹型では punctate になり、整った網目・らせんが見えないことがある。方針は内視鏡切除。',
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
        {
          heading: '注',
          text: '原著注: deep SM invasive cancer が含まれることもある。一括内視鏡切除を検討。',
        },
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
        { heading: '注', text: '外科手術を検討。' },
      ],
    },
  ],
};
