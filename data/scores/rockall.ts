import { computeRockall } from '../../lib/scores/rockall';
import type { ScoreDefinition } from '../../types/score';

/** Rockall TA et al. Gut 1996;38:316-321 */
export const ROCKALL_1996_PUBMED = '8675081';

export const rockallScore: ScoreDefinition = {
  id: 'rockall',
  name: 'Rockallスコア（上部消化管出血）',
  shortName: 'Rockall',
  organ: 'bleeding',
  category: 'bleeding',
  categoryLabel: '消化管出血',
  description:
    '急性上部消化管出血の死亡リスクを、臨床3項目（年齢・ショック・併存症）と内視鏡2項目（診断・出血兆候）で 0–11 点にします。臨床スコア（内視鏡前）は最大 7 点です。',
  reference: 'Rockall TA, Logan RFA, Devlin HB, Northfield TC. Gut 1996;38:316-321',
  pubmed: ROCKALL_1996_PUBMED,
  figures: [
    {
      href: 'https://gut.bmj.com/content/38/3/316',
      hrefLabel: '1996 paper',
      figureKind: 'original',
      sourceShort: 'Rockall 1996',
      alt: 'Rockall risk score after acute upper gastrointestinal haemorrhage',
      caption: 'Rockall TA et al. Risk assessment after acute upper gastrointestinal haemorrhage. Gut 1996',
      source: 'Rockall TA, Logan RFA, Devlin HB, Northfield TC. Gut. 1996;38:316-321.',
      doi: 'https://doi.org/10.1136/gut.38.3.316',
      pubmed: ROCKALL_1996_PUBMED,
      note: '原著。BMJ / Gut の著作権。CC ではないので画像は埋め込まず、論文へリンクする。',
    },
  ],
  fields: [
    {
      id: 'age',
      label: '年齢',
      options: [
        { value: 0, label: '<60 歳', description: '0点' },
        { value: 1, label: '60–79 歳', description: '+1点' },
        { value: 2, label: '≥80 歳', description: '+2点' },
      ],
    },
    {
      id: 'shock',
      label: 'ショック',
      description: '収縮期血圧と脈拍',
      options: [
        { value: 0, label: 'なし（SBP ≥100 かつ脈拍 <100）', description: '0点' },
        { value: 1, label: '頻脈（SBP ≥100 かつ脈拍 ≥100）', description: '+1点' },
        { value: 2, label: '低血圧（SBP <100）', description: '+2点' },
      ],
    },
    {
      id: 'comorbidity',
      label: '併存症',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 2, label: '心不全・虚血性心疾患・その他の重大な併存症', description: '+2点' },
        { value: 3, label: '腎不全・肝不全・播種性悪性腫瘍', description: '+3点' },
      ],
    },
    {
      id: 'diagnosis',
      label: '内視鏡診断',
      options: [
        { value: 0, label: 'Mallory–Weiss または病変なし（SRH なし）', description: '0点' },
        { value: 1, label: 'その他すべて', description: '+1点' },
        { value: 2, label: '上部消化管悪性腫瘍', description: '+2点' },
      ],
    },
    {
      id: 'srh',
      label: '最近の出血兆候（major SRH）',
      options: [
        { value: 0, label: 'なし、または暗点のみ', description: '0点' },
        { value: 2, label: '血液・付着凝血・露出血管・噴出', description: '+2点' },
      ],
    },
  ],
  compute: computeRockall,
};
