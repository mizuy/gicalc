import type { ClassificationDefinition } from '../../types/score';

/** 1969 年 Endoscopy は PubMed 未収載のため、書誌で検索する */
export const KIMURA_1969_PUBMED =
  'https://pubmed.ncbi.nlm.nih.gov/?term=Kimura+K%2C+Takemoto+T.+An+endoscopic+recognition+of+the+atrophic+border+and+its+significance+in+chronic+gastritis';

export const kimuraTakemotoScore: ClassificationDefinition = {
  id: 'kimura-takemoto',
  kind: 'classification',
  name: '木村–竹本分類（胃萎縮）',
  shortName: '木村–竹本',
  developedInJapan: true,
  organ: 'stomach',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description: '内視鏡的萎縮境界による Closed / Open 分類。',
  originalLead:
    'The endoscopic atrophic border can be recognized by discriminating mucosal differences between the 2 sides: the gastric mucosa has a lower level and is pale in color on 1 side, while it has a higher level and is homogeneously reddish on the other side. Based on location of the endoscopic atrophic border, Kimura and Takemoto proposed closed type (C-1, C-2, C-3) and open type (O-1, O-2, O-3).',
  reference: 'Kimura K, Takemoto T. Endoscopy 1969;1:87-97',
  pubmed: KIMURA_1969_PUBMED,
  figures: [
    {
      src: '/figures/kimura-takemoto-1969.png',
      alt: 'Kimura–Takemoto classification C-1 to O-3',
      caption: 'Fig. Kimura–Takemoto classification of the atrophic border (1969)',
      source:
        'Kimura K, Takemoto T. An endoscopic recognition of the atrophic border and its significance in chronic gastritis. Endoscopy. 1969;1:87-97. Figure as published in Quach DT, Hiyama T. Clin Endosc. 2019;52:321-327, Fig. 2.',
      doi: 'https://doi.org/10.5946/ce.2019.072',
      pubmed: '31327182',
      license: 'CC BY-NC 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc/3.0/',
      note: 'C-1–C-3, O-1–O-3。図は Quach 2019 Clin Endosc Fig. 2。ライセンスは CC BY-NC 3.0。白地の原図をそのまま使う（黒背景にすると線が見えない）。',
      aspectRatio: 634 / 585,
    },
  ],
  entries: [
    {
      label: 'C-0',
      meaning: '（原著にない）',
      group: '萎縮なし',
      severity: 'none',
      rows: [],
      comment: '原著の6型にはない。京都分類の萎縮 0 点（C-0/C-1）で用いる。',
    },
    {
      label: 'C-1',
      meaning: 'Closed type',
      group: '閉鎖型（Closed）',
      severity: 'none',
      rows: [
        {
          heading: 'Border',
          text: 'Endoscopic atrophic findings are not visible in the corpus but only in the antrum.',
        },
      ],
      comment: '京都分類の萎縮 0 点（C-0/C-1）。',
    },
    {
      label: 'C-2',
      meaning: 'Closed type',
      group: '閉鎖型（Closed）',
      severity: 'mild',
      rows: [
        {
          heading: 'Border',
          text: 'The atrophic border starts from the greater curvature of the antrum, coming up to the anterior wall, crossing the lesser curvature, making an almost symmetric enclosure. The atrophic border lies below the middle of the stomach on the lesser curvature.',
        },
      ],
      comment: '京都分類の萎縮 +1 点（C-2/C-3）。',
    },
    {
      label: 'C-3',
      meaning: 'Closed type',
      group: '閉鎖型（Closed）',
      severity: 'mild',
      rows: [
        {
          heading: 'Border',
          text: 'The atrophic border starts from the greater curvature of the antrum, coming up to the anterior wall, crossing the lesser curvature, making an almost symmetric enclosure. The atrophic border lies above the middle of the stomach on the lesser curvature.',
        },
      ],
      comment: '京都分類の萎縮 +1 点（C-2/C-3）。',
    },
    {
      label: 'O-1',
      meaning: 'Open type',
      group: '開放型（Open）',
      severity: 'moderate',
      rows: [
        {
          heading: 'Border',
          text: 'The endoscopic atrophic area is widely spread. The atrophic border no longer lies on the lesser curvature, but instead between the lesser curvature and the anterior wall.',
        },
      ],
      comment: '京都分類の萎縮 +2 点（O-1–O-3）。',
    },
    {
      label: 'O-2',
      meaning: 'Open type',
      group: '開放型（Open）',
      severity: 'moderate',
      rows: [
        { heading: 'Border', text: 'The atrophic border lies on the anterior wall.' },
      ],
      comment: '京都分類の萎縮 +2 点（O-1–O-3）。',
    },
    {
      label: 'O-3',
      meaning: 'Open type',
      group: '開放型（Open）',
      severity: 'severe',
      rows: [
        {
          heading: 'Border',
          text: 'The atrophic border lies between the anterior wall and the greater curvature.',
        },
      ],
      comment: '京都分類の萎縮 +2 点（O-1–O-3）。',
    },
  ],
};
