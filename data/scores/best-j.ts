import { computeBestJ } from '../../lib/scores/best-j';
import type { ScoreDefinition } from '../../types/score';

const antithromboticOptions = (fullScore: number) => [
  { value: 0, label: 'なし', description: '0点' },
  { value: fullScore, label: '継続', description: `${fullScore}点` },
  { value: fullScore - 1, label: '休薬', description: `${fullScore - 1}点` },
];

export const bestJScore: ScoreDefinition = {
  id: 'best-j',
  name: 'BEST-J Score（早期胃癌 ESD後出血）',
  shortName: 'BEST-J',
  developedInJapan: true,
  organ: 'stomach',
  category: 'gastric',
  categoryLabel: '早期胃癌',
  description:
    'Bleeding after ESD Trend from Japan。早期胃癌ESD後の遅発性出血リスクを予測します。',
  reference: 'Hatta W et al. Gut 2021;70:476-484',
  pubmed: '32499390',
  license: 'CC BY-NC 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-nc/4.0/',
  fields: [
    {
      id: 'warfarin',
      label: 'ワーファリン',
      description: '抗血栓薬（なし / 継続 / 休薬）',
      options: antithromboticOptions(4),
    },
    {
      id: 'doac',
      label: 'DOAC',
      options: antithromboticOptions(4),
    },
    {
      id: 'p2y12',
      label: 'P2Y12拮抗薬',
      options: antithromboticOptions(2),
    },
    {
      id: 'aspirin',
      label: 'アスピリン',
      options: antithromboticOptions(2),
    },
    {
      id: 'cilostazol',
      label: 'シロスタゾール',
      options: antithromboticOptions(1),
    },
    {
      id: 'dialysis',
      label: '透析中CKD',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 3, label: 'あり', description: '+3点' },
      ],
    },
    {
      id: 'tumorSize',
      label: '腫瘍>30mm',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 1, label: 'あり', description: '+1点' },
      ],
    },
    {
      id: 'lowerThird',
      label: '胃下部1/3',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 1, label: 'あり', description: '+1点' },
      ],
    },
    {
      id: 'multiple',
      label: '多発病変',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 1, label: 'あり', description: '+1点' },
      ],
    },
  ],
  compute: computeBestJ,
};
