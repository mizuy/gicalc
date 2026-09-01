import { computeKyotoModified } from '../../lib/scores/kyoto-modified';
import type { ScoreDefinition } from '../../types/score';

export const kyotoModifiedScore: ScoreDefinition = {
  id: 'kyoto-modified',
  name: '改変京都分類リスクスコア（0–5）',
  shortName: '改変京都',
  organ: 'stomach',
  category: 'gastritis',
  categoryLabel: '胃炎・胃癌リスク',
  description:
    'Kawamura 2021 の改変法。RAC 不可視 2点、開大型萎縮・体部 IEE 腸上皮化生>30%・体部地図状発赤 各1点。原法とは別スコアです。',
  reference: 'Kawamura M et al. Dig Endosc 2021',
  pubmed: '34415621',
  fields: [
    {
      id: 'rac',
      label: '角部 RAC',
      description: 'regular arrangement of collecting venules',
      options: [
        { value: 0, label: '可視', description: '0点' },
        { value: 2, label: '不可視', description: '+2点' },
      ],
    },
    {
      id: 'openAtrophy',
      label: '開大型萎縮',
      description: '木村–竹本 O-1–O-3',
      options: [
        { value: 0, label: '閉鎖型（C-0–C-3）', description: '0点' },
        { value: 1, label: '開大型（O-1–O-3）', description: '+1点' },
      ],
    },
    {
      id: 'corpusIm',
      label: '体部 IEE 腸上皮化生 >30%',
      description: 'LBC / WOS / 絨毛状パターン',
      options: [
        { value: 0, label: 'なし / 前庭のみ', description: '0点' },
        { value: 1, label: '体部 >30%', description: '+1点' },
      ],
    },
    {
      id: 'mapRedness',
      label: '地図状発赤',
      description: '体部の地図状発赤のみ配点',
      options: [
        { value: 0, label: 'なし / 前庭のみ', description: '0点' },
        { value: 1, label: '体部にあり', description: '+1点' },
      ],
    },
  ],
  compute: computeKyotoModified,
};
