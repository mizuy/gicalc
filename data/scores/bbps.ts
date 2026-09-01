import { computeBbps } from '../../lib/scores/bbps';
import type { ScoreDefinition } from '../../types/score';

const segmentOptions = [
  { value: 0, label: '0', description: '固形便で粘膜が見えない' },
  { value: 1, label: '1', description: '一部の粘膜のみ。残渣・混濁液で隠れる' },
  { value: 2, label: '2', description: '少量の残渣・小片・混濁液。粘膜はよく見える' },
  { value: 3, label: '3', description: '残渣なし。区域全体の粘膜が見える' },
];

export const bbpsScore: ScoreDefinition = {
  id: 'bbps',
  name: 'Boston Bowel Preparation Scale（BBPS）',
  shortName: 'BBPS',
  category: 'prep',
  categoryLabel: '腸管前処置',
  description:
    '大腸内視鏡の前処置を3区域（0–3点、合計0–9）で評価します。洗浄・吸引後の抜去時に付けます。Aronchick は洗浄前の全体評価で、別尺度です。',
  reference: 'Lai EJ et al. Gastrointest Endosc 2009;69:620-625',
  fields: [
    {
      id: 'right',
      label: '右側結腸',
      description: '盲腸・上行結腸',
      options: segmentOptions,
    },
    {
      id: 'transverse',
      label: '横行結腸',
      description: '肝弯曲・脾弯曲を含む',
      options: segmentOptions,
    },
    {
      id: 'left',
      label: '左側結腸',
      description: '下行結腸・S状結腸・直腸',
      options: segmentOptions,
    },
  ],
  compute: computeBbps,
};
