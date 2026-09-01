import { computeJnet } from '../../lib/scores/jnet';
import type { ScoreDefinition } from '../../types/score';

export const jnetScore: ScoreDefinition = {
  id: 'jnet',
  name: 'JNET分類（大腸 NBI 拡大）',
  shortName: 'JNET',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '大腸腫瘍の NBI 拡大所見を Type 1 / 2A / 2B / 3 に分け、推定組織と治療方針を示します。拡大不要の NICE 分類や大腸T1ノモグラムとは別です。',
  reference: 'Sano Y et al. Dig Endosc 2016;28:526-533',
  fields: [
    {
      id: 'type',
      label: 'JNET Type',
      description: 'NBI 拡大での血管・表面構造',
      options: [
        { value: 1, label: 'Type 1', description: '血管不可視。規則的スポット' },
        { value: 2, label: 'Type 2A', description: '血管・表面とも整' },
        { value: 3, label: 'Type 2B', description: '血管・表面が不整' },
        { value: 4, label: 'Type 3', description: '疎な血管・無構造' },
      ],
    },
  ],
  compute: computeJnet,
};
