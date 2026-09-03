import { computeSekiguchi } from '../../lib/scores/sekiguchi';
import type { ScoreDefinition } from '../../types/score';

export const sekiguchiScore: ScoreDefinition = {
  id: 'sekiguchi',
  name: 'Sekiguchi Score（早期胃癌 LNM 11点）',
  shortName: 'Sekiguchi',
  developedInJapan: true,
  organ: 'stomach',
  category: 'gastric',
  categoryLabel: '早期胃癌',
  description:
    '早期胃癌のリンパ節転移を11点で層別します。混合型組織を分けます。',
  reference: 'Sekiguchi M et al. J Gastroenterol 2016;51:961-970',
  pubmed: '26884381',
  fields: [
    {
      id: 'size',
      label: '腫瘍径',
      options: [
        { value: 0, label: '≤2 cm', description: '0点' },
        { value: 1, label: '>2–≤3 cm', description: '+1点' },
        { value: 2, label: '>3 cm', description: '+2点' },
      ],
    },
    {
      id: 'depth',
      label: '深達度',
      description: 'SM1 は粘膜と同じ 0 点',
      options: [
        { value: 0, label: 'M / SM1', description: '0点（SM1 <500μm）' },
        { value: 2, label: 'SM2', description: '+2点（≥500μm）' },
      ],
    },
    {
      id: 'histology',
      label: '組織型',
      description: '分化型=tub1/tub2/pap、未分化型=por/sig/muc',
      options: [
        { value: 0, label: '純分化型', description: '0点' },
        { value: 1, label: '純未分化型', description: '+1点' },
        { value: 2, label: '混合・分化優位', description: '+1点' },
        { value: 3, label: '混合・未分化優位', description: '+2点' },
      ],
    },
    {
      id: 'ulcer',
      label: '潰瘍所見 UL',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 1, label: 'あり', description: '+1点' },
      ],
    },
    {
      id: 'lvi',
      label: '脈管侵襲',
      description: '最も強い因子（+4）',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 4, label: 'あり', description: '+4点' },
      ],
    },
  ],
  compute: computeSekiguchi,
};
