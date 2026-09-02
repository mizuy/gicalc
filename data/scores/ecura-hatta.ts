import { computeEcura } from '../../lib/scores/ecura';
import type { ScoreDefinition } from '../../types/score';

export const ecuraHattaScore: ScoreDefinition = {
  id: 'ecura-hatta',
  name: 'eCura Scoring System（早期胃癌 LNM）',
  shortName: 'eCura',
  organ: 'stomach',
  category: 'gastric',
  categoryLabel: '早期胃癌',
  description:
    '早期胃癌の非治癒切除後におけるリンパ節転移リスクを点数化します。',
  reference: 'Hatta W et al. Am J Gastroenterol 2017;112:874-881',
  pubmed: '28397873',
  fields: [
    {
      id: 'ly',
      label: 'リンパ管侵襲 Ly',
      options: [
        { value: 0, label: 'Ly0', description: '0点' },
        { value: 3, label: 'Ly1', description: '+3点' },
      ],
    },
    {
      id: 'size',
      label: '腫瘍最大径',
      options: [
        { value: 0, label: '≤30mm', description: '0点' },
        { value: 1, label: '>30mm', description: '+1点' },
      ],
    },
    {
      id: 'vm',
      label: '垂直断端 VM',
      options: [
        { value: 0, label: 'VM0', description: '0点' },
        { value: 1, label: 'VM1', description: '+1点' },
      ],
    },
    {
      id: 'v',
      label: '静脈侵襲 V',
      options: [
        { value: 0, label: 'V0', description: '0点' },
        { value: 1, label: 'V1', description: '+1点' },
      ],
    },
    {
      id: 'sm',
      label: 'SM浸潤深度',
      options: [
        { value: 0, label: 'SM1 <500μm', description: '0点' },
        { value: 1, label: 'SM2 ≥500μm', description: '+1点' },
      ],
    },
  ],
  compute: computeEcura,
};
