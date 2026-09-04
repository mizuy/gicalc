import { computeApcs } from '../../lib/scores/apcs';
import type { ScoreDefinition } from '../../types/score';

export const apcsScore: ScoreDefinition = {
  id: 'apcs',
  name: 'Asia-Pacific Colorectal Screening Score（APCS）',
  shortName: 'APCS',
  organ: 'colorectum',
  category: 'screening',
  categoryLabel: '大腸がん検診',
  description:
    '無症状のアジア人で、進行大腸腫瘍（進行腺腫または癌）のリスクを年齢・性別・家族歴・喫煙で 0–7 点に層別します。',
  note: 'BMI を加えた改変法（Sung 2018、0–6 点）は「改変版」タブ。',
  reference: 'Yeoh KG et al. Gut 2011;60:1236-1241',
  pubmed: '21402615',
  fields: [
    {
      id: 'age',
      label: '年齢',
      options: [
        { value: 0, label: '<50歳', description: '0点' },
        { value: 2, label: '50–69歳', description: '+2点' },
        { value: 3, label: '≥70歳', description: '+3点' },
      ],
    },
    {
      id: 'sex',
      label: '性別',
      options: [
        { value: 0, label: '女性', description: '0点' },
        { value: 1, label: '男性', description: '+1点' },
      ],
    },
    {
      id: 'family',
      label: '大腸癌の家族歴',
      description: '第一度近親者（親・兄弟姉妹・子）のみ',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 2, label: 'あり', description: '+2点' },
      ],
    },
    {
      id: 'smoking',
      label: '喫煙',
      description: '現在または過去。原著の current は週1箱以上',
      options: [
        { value: 0, label: 'なし（never）', description: '0点' },
        { value: 1, label: '現在または過去', description: '+1点' },
      ],
    },
  ],
  compute: computeApcs,
};
