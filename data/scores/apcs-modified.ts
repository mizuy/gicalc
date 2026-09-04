import { computeApcsModified } from '../../lib/scores/apcs-modified';
import type { ScoreDefinition } from '../../types/score';

/** Sung 2018 J Gastroenterol Hepatol（PMID 28561279） */
export const APCS_MODIFIED_2018_PUBMED = '28561279';

export const apcsModifiedScore: ScoreDefinition = {
  id: 'apcs-modified',
  name: '改変 APCS（BMI 追加・0–6）',
  shortName: '改変APCS',
  organ: 'colorectum',
  category: 'screening',
  categoryLabel: '大腸がん検診',
  description:
    'Yeoh 2011 APCS に BMI（≥23 kg/m²）を加えた改変法（Sung 2018）。年齢・家族歴の点数を調整し 0–6 点。平均（0）/ 中等度（1–2）/ 高（3–6）の 3 段階。',
  reference: 'Sung JJY et al. J Gastroenterol Hepatol 2018;33:187-194',
  pubmed: APCS_MODIFIED_2018_PUBMED,
  note: '原法（Yeoh 2011、0–7 点）は APCS ページの「原法」タブ。BMI カットオフ 23 kg/m² はアジア人向け。',
  fields: [
    {
      id: 'age',
      label: '年齢',
      options: [
        { value: 0, label: '<50歳', description: '0点' },
        { value: 1, label: '50–59歳', description: '+1点' },
        { value: 2, label: '≥60歳', description: '+2点' },
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
        { value: 1, label: 'あり', description: '+1点' },
      ],
    },
    {
      id: 'smoking',
      label: '喫煙',
      description: '現在または過去',
      options: [
        { value: 0, label: 'なし（never）', description: '0点' },
        { value: 1, label: '現在または過去', description: '+1点' },
      ],
    },
    {
      id: 'bmi',
      label: 'BMI',
      description: '≥23 kg/m²（アジア人カットオフ）',
      options: [
        { value: 0, label: '<23 kg/m²', description: '0点' },
        { value: 1, label: '≥23 kg/m²', description: '+1点' },
      ],
    },
  ],
  compute: computeApcsModified,
};
