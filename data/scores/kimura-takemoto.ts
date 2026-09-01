import { computeKimuraTakemoto } from '../../lib/scores/kimura-takemoto';
import type { ScoreDefinition } from '../../types/score';

export const kimuraTakemotoScore: ScoreDefinition = {
  id: 'kimura-takemoto',
  name: '木村–竹本分類（胃萎縮）',
  shortName: '木村–竹本',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '内視鏡的萎縮境界の位置で C-0 と閉鎖型 C-1–C-3、開放型 O-1–O-3 に分けます。京都分類の萎縮点や EGGIM・OLGA とは別です。',
  reference: 'Kimura K, Takemoto T. Endoscopy 1969;1:87-97',
  fields: [
    {
      id: 'grade',
      label: '萎縮型',
      description: '萎縮境界（幽門腺と胃底腺領域の境）の位置',
      options: [
        { value: 0, label: 'C-0', description: '萎縮なし（京都分類）' },
        { value: 1, label: 'C-1', description: '前庭部にとどまる' },
        { value: 2, label: 'C-2', description: '体下部小弯' },
        { value: 3, label: 'C-3', description: '体上部小弯〜噴門寄り' },
        { value: 4, label: 'O-1', description: '噴門を越え前後壁へ' },
        { value: 5, label: 'O-2', description: 'O-1 と O-3 の中間' },
        { value: 6, label: 'O-3', description: '大弯・ほぼ全域' },
      ],
    },
  ],
  compute: computeKimuraTakemoto,
};
