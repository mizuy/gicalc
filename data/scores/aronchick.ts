import { computeAronchick } from '../../lib/scores/aronchick';
import type { ScoreDefinition } from '../../types/score';

export const aronchickScore: ScoreDefinition = {
  id: 'aronchick',
  name: 'Aronchick Scale（腸管前処置）',
  shortName: 'Aronchick',
  organ: 'colorectum',
  category: 'prep',
  categoryLabel: '腸管前処置',
  description:
    '大腸全体の前処置を洗浄前に5段階で評価します。区域点はありません。',
  reference: 'Aronchick CA et al. Gastrointest Endosc 2000;52:346-352',
  pubmed: '10968848',
  license: 'CC BY-NC-ND 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
  fields: [
    {
      id: 'grade',
      label: '前処置グレード',
      description: '洗浄・吸引の前に、大腸全体を評価する',
      options: [
        { value: 1, label: 'Excellent', description: '透明な少量液。粘膜 >95%' },
        { value: 2, label: 'Good', description: '透明液が多め。粘膜 >90%' },
        { value: 3, label: 'Fair', description: '半固形便は吸引可。粘膜 >90%' },
        { value: 4, label: 'Poor', description: '吸引不能。粘膜 <90%' },
        { value: 5, label: 'Inadequate', description: '再前処置が必要' },
      ],
    },
  ],
  compute: computeAronchick,
};
