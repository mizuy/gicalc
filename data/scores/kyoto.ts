import { computeKyoto } from '../../lib/scores/kyoto';
import type { ScoreDefinition } from '../../types/score';

export const kyotoScore: ScoreDefinition = {
  id: 'kyoto',
  name: '京都分類リスクスコア（原法 0–8）',
  shortName: '京都分類',
  category: 'gastritis',
  categoryLabel: '胃炎・胃癌リスク',
  description:
    '萎縮・腸上皮化生・皺襞腫大・結節性・びまん性発赤の5所見（0–8点）。Shichijo 2017 は萎縮が独立因子、Kawamura 2021 は多変量で原法の説明力が不十分として改変法を提案しています。',
  reference:
    'Haruma K et al. Kyoto Classification of Gastritis, 2017 / Shichijo S et al. J Gastroenterol Hepatol 2017;32:1581-1586 / Kawamura M et al. Dig Endosc 2021',
  fields: [
    {
      id: 'atrophy',
      label: '萎縮（木村–竹本）',
      options: [
        { value: 0, label: 'C-0 / C-1', description: '0点' },
        { value: 1, label: 'C-2 / C-3', description: '+1点' },
        { value: 2, label: 'O-1 / O-2 / O-3', description: '+2点' },
      ],
    },
    {
      id: 'im',
      label: '腸上皮化生（WLI）',
      description: '灰白色扁平隆起。体部にあれば2点',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 1, label: '前庭部', description: '+1点' },
        { value: 2, label: '体部', description: '+2点' },
      ],
    },
    {
      id: 'fold',
      label: '皺襞腫大',
      description: '体部皺襞幅 ≥5 mm',
      options: [
        { value: 0, label: '<5 mm', description: '0点' },
        { value: 1, label: '≥5 mm', description: '+1点' },
      ],
    },
    {
      id: 'nodularity',
      label: '結節性変化',
      description: '前庭部の細顆粒状隆起',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 1, label: 'あり', description: '+1点' },
      ],
    },
    {
      id: 'redness',
      label: 'びまん性発赤',
      description: '体部粘膜の均一な発赤',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 1, label: '軽度', description: '+1点' },
        { value: 2, label: '高度', description: '+2点' },
      ],
    },
  ],
  compute: computeKyoto,
};
