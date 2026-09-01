import { computeJes } from '../../lib/scores/jes';
import type { ScoreDefinition } from '../../types/score';

export const jesScore: ScoreDefinition = {
  id: 'jes',
  name: 'JES分類（食道扁平上皮・拡大）',
  shortName: 'JES',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '食道扁平上皮の拡大内視鏡（IPCL）を Type A / B1 / B2 / B3 に分け、推定深達度を示します。Inoue の IPCL I–V や食道静脈瘤分類とは別です。',
  reference: 'Oyama T et al. Esophagus 2017;14:1-10（日本食道学会）',
  fields: [
    {
      id: 'type',
      label: 'JES Type',
      description: '拡大での IPCL / 腫瘍血管',
      options: [
        { value: 1, label: 'Type A', description: '正常〜高度不整なし' },
        { value: 2, label: 'Type B1', description: 'ループを保つ異常血管' },
        { value: 3, label: 'Type B2', description: '非ループ' },
        { value: 4, label: 'Type B3', description: '高度拡張血管' },
      ],
    },
  ],
  compute: computeJes,
};
