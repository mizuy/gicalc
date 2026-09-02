import type { ClassificationDefinition } from '../../types/score';

/** 1969 年 Endoscopy は PubMed 未収載のため、書誌で検索する */
export const KIMURA_1969_PUBMED =
  'https://pubmed.ncbi.nlm.nih.gov/?term=Kimura+K%2C+Takemoto+T.+An+endoscopic+recognition+of+the+atrophic+border+and+its+significance+in+chronic+gastritis';

export const kimuraTakemotoScore: ClassificationDefinition = {
  id: 'kimura-takemoto',
  kind: 'classification',
  name: '木村–竹本分類（胃萎縮）',
  shortName: '木村–竹本',
  organ: 'stomach',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '内視鏡的萎縮境界による Closed / Open 分類。C-0 は原著6型になく京都分類で用います。',
  originalLead:
    'Based on location of the endoscopic atrophic border, Kimura and Takemoto proposed closed type (C-1, C-2, C-3) and open type (O-1, O-2, O-3).',
  reference: 'Kimura K, Takemoto T. Endoscopy 1969;1:87-97',
  pubmed: KIMURA_1969_PUBMED,
  figures: [
    {
      src: '/figures/kimura-takemoto-1969.jpg',
      alt: 'Kimura–Takemoto classification C-1 to O-3',
      caption: 'Fig. Kimura–Takemoto classification of the atrophic border (1969)',
      source:
        'Kimura K, Takemoto T. An endoscopic recognition of the atrophic border and its significance in chronic gastritis. Endoscopy. 1969;1:87-97. Figure as published in Quach DT, Hiyama T. Clin Endosc. 2019;52:321-327, Fig. 2.',
      doi: 'https://doi.org/10.1055/s-0028-1098086',
      pubmed: '31327182',
      note: '閉鎖型 C-1–C-3 と開放型 O-1–O-3。C-0 は原著6型にない。図は Quach 2019 再掲。',
      aspectRatio: 966 / 876,
    },
  ],
  entries: [
    {
      label: 'C-0',
      meaning: 'No atrophy',
      group: '萎縮なし',
      severity: 'none',
      rows: [
        { heading: '境界', text: 'Atrophic border is absent; gastric areas are preserved throughout' },
        { heading: '注', text: '原著の6型にはない。京都分類の萎縮 0 点（C-0/C-1）で用いる。' },
      ],
    },
    {
      label: 'C-1',
      meaning: 'Closed type',
      group: '閉鎖型（Closed）',
      severity: 'none',
      rows: [
        {
          heading: '境界',
          text: 'Atrophic findings are not visible in the corpus but only in the antrum',
        },
        { heading: '注', text: '京都分類の萎縮 0 点（C-0/C-1）。' },
      ],
    },
    {
      label: 'C-2',
      meaning: 'Closed type',
      group: '閉鎖型（Closed）',
      severity: 'mild',
      rows: [
        {
          heading: '境界',
          text: 'The atrophic border lies below the middle of the stomach on the lesser curvature',
        },
        { heading: '注', text: '京都分類の萎縮 +1 点（C-2/C-3）。' },
      ],
    },
    {
      label: 'C-3',
      meaning: 'Closed type',
      group: '閉鎖型（Closed）',
      severity: 'mild',
      rows: [
        {
          heading: '境界',
          text: 'The atrophic border lies above the middle of the stomach on the lesser curvature and does not pass the cardia',
        },
        { heading: '注', text: '京都分類の萎縮 +1 点（C-2/C-3）。' },
      ],
    },
    {
      label: 'O-1',
      meaning: 'Open type',
      group: '開放型（Open）',
      severity: 'moderate',
      rows: [
        {
          heading: '境界',
          text: 'The atrophic border lies between the lesser curvature and the anterior wall',
        },
        { heading: '注', text: '京都分類の萎縮 +2 点（O-1–O-3）。開放型は閉鎖型より胃癌リスクが高い。' },
      ],
    },
    {
      label: 'O-2',
      meaning: 'Open type',
      group: '開放型（Open）',
      severity: 'moderate',
      rows: [
        { heading: '境界', text: 'The atrophic border lies on the anterior wall' },
        { heading: '注', text: '京都分類の萎縮 +2 点（O-1–O-3）。' },
      ],
    },
    {
      label: 'O-3',
      meaning: 'Open type (severe)',
      group: '開放型（Open）',
      severity: 'severe',
      rows: [
        {
          heading: '境界',
          text: 'The atrophic border lies between the anterior wall and the greater curvature (almost the entire stomach is atrophic)',
        },
        { heading: '注', text: '京都分類の萎縮 +2 点（O-1–O-3）。' },
      ],
    },
  ],
};
