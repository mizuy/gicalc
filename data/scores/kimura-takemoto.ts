import type { ClassificationDefinition } from '../../types/score';

export const kimuraTakemotoScore: ClassificationDefinition = {
  id: 'kimura-takemoto',
  kind: 'classification',
  name: '木村–竹本分類（胃萎縮）',
  shortName: '木村–竹本',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '内視鏡的萎縮境界の位置による定義一覧です。C-0 は原著の6型にはなく京都分類で用います。京都分類の萎縮点や EGGIM・OLGA とは別です。',
  reference: 'Kimura K, Takemoto T. Endoscopy 1969;1:87-97',
  entries: [
    {
      label: 'C-0',
      meaning: '萎縮なし',
      group: '萎縮なし',
      severity: 'none',
      rows: [
        { heading: '境界', text: '萎縮境界がなく、胃小区が全域で保たれる' },
        { heading: '京都', text: '萎縮 0 点（C-0/C-1）' },
      ],
    },
    {
      label: 'C-1',
      meaning: '閉鎖型（軽度）',
      group: '閉鎖型（Closed）',
      severity: 'none',
      rows: [
        { heading: '境界', text: '前庭部にとどまる' },
        { heading: '京都', text: '萎縮 0 点（C-0/C-1）' },
      ],
    },
    {
      label: 'C-2',
      meaning: '閉鎖型（中等度）',
      group: '閉鎖型（Closed）',
      severity: 'mild',
      rows: [
        { heading: '境界', text: '胃体下部の小弯' },
        { heading: '京都', text: '萎縮 +1 点（C-2/C-3）' },
      ],
    },
    {
      label: 'C-3',
      meaning: '閉鎖型（中等度）',
      group: '閉鎖型（Closed）',
      severity: 'mild',
      rows: [
        { heading: '境界', text: '胃体上部小弯〜噴門寄り。まだ小弯上で噴門を越えない' },
        { heading: '京都', text: '萎縮 +1 点（C-2/C-3）' },
      ],
    },
    {
      label: 'O-1',
      meaning: '開放型',
      group: '開放型（Open）',
      severity: 'moderate',
      rows: [
        { heading: '境界', text: '噴門を越え前後壁に出る。前後壁の萎縮はまだ接しない' },
        { heading: '京都', text: '萎縮 +2 点（O-1–O-3）。開放型は閉鎖型より胃癌リスクが高い' },
      ],
    },
    {
      label: 'O-2',
      meaning: '開放型',
      group: '開放型（Open）',
      severity: 'moderate',
      rows: [
        { heading: '境界', text: 'O-1 と O-3 の中間。前後壁の萎縮が接する' },
        { heading: '京都', text: '萎縮 +2 点（O-1–O-3）' },
      ],
    },
    {
      label: 'O-3',
      meaning: '開放型（高度）',
      group: '開放型（Open）',
      severity: 'severe',
      rows: [
        { heading: '境界', text: '大弯にあり、ほぼ全域が萎縮' },
        { heading: '京都', text: '萎縮 +2 点（O-1–O-3）' },
      ],
    },
  ],
};
