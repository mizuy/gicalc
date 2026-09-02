import { computeNoblads } from '../../lib/scores/noblads';
import type { ScoreField, ScoreDefinition } from '../../types/score';

const yesNo = (label: string, description?: string): ScoreField => ({
  id: '',
  label,
  description,
  options: [
    { value: 0, label: 'なし', description: '0点' },
    { value: 1, label: 'あり', description: '+1点' },
  ],
});

export const nobladsScore: ScoreDefinition = {
  id: 'noblads',
  name: 'NOBLADS Score（急性下部消化管出血）',
  shortName: 'NOBLADS',
  organ: 'bleeding',
  category: 'bleeding',
  categoryLabel: '消化管出血',
  description:
    '急性下部消化管出血の重症化（持続・再出血）を予測します。各因子1点。',
  reference: 'Aoki T et al. Clin Gastroenterol Hepatol 2016;14:1562-1570',
  pubmed: '27311620',
  fields: [
    { ...yesNo('NSAIDs', '非選択的 NSAIDs または COX-2 阻害薬（直近2週）'), id: 'nsaids' },
    {
      id: 'noDiarrhea',
      label: '下痢なし',
      description: '下痢＝1日3回超の泥状・水様便。下痢がないことがリスク',
      options: [
        { value: 0, label: '下痢あり', description: '0点' },
        { value: 1, label: '下痢なし', description: '+1点' },
      ],
    },
    {
      id: 'noTenderness',
      label: '腹部圧痛なし',
      description: '圧痛がないことがリスク',
      options: [
        { value: 0, label: '圧痛あり', description: '0点' },
        { value: 1, label: '圧痛なし', description: '+1点' },
      ],
    },
    {
      id: 'hypotension',
      label: '収縮期血圧 ≤100',
      options: [
        { value: 0, label: '>100 mmHg', description: '0点' },
        { value: 1, label: '≤100 mmHg', description: '+1点' },
      ],
    },
    {
      id: 'antiplatelet',
      label: '非アスピリン抗血小板薬',
      description: 'クロピドグレル、チクロピジン、シロスタゾールなど。アスピリンは含めない',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 1, label: 'あり', description: '+1点' },
      ],
    },
    {
      id: 'albumin',
      label: 'アルブミン <3.0 g/dL',
      options: [
        { value: 0, label: '≥3.0', description: '0点' },
        { value: 1, label: '<3.0', description: '+1点' },
      ],
    },
    {
      id: 'charlson',
      label: 'Charlson 併存疾患 ≥2',
      options: [
        { value: 0, label: '0–1', description: '0点' },
        { value: 1, label: '≥2', description: '+1点' },
      ],
    },
    {
      id: 'syncope',
      label: '失神',
      description: '一過性意識変容（GCS≤14）または失神既往',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 1, label: 'あり', description: '+1点' },
      ],
    },
  ],
  compute: computeNoblads,
};
