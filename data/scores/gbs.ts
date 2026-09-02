import { computeGbs } from '../../lib/scores/gbs';
import type { ScoreDefinition } from '../../types/score';

export const gbsScore: ScoreDefinition = {
  id: 'gbs',
  name: 'Glasgow-Blatchford Score（上部消化管出血）',
  shortName: 'GBS',
  organ: 'bleeding',
  category: 'bleeding',
  categoryLabel: '消化管出血',
  description:
    '上部消化管出血で治療介入（輸血・内視鏡・手術）の必要性を予測します。',
  reference: 'Blatchford O et al. Lancet 2000;356:1318-1321',
  pubmed: '11073021',
  fields: [
    {
      id: 'sex',
      label: '性別',
      description: 'ヘモグロビンの配点に使います（点数そのものではありません）',
      options: [
        { value: 0, label: '男性' },
        { value: 1, label: '女性' },
      ],
    },
    {
      id: 'bun',
      label: 'BUN',
      description: 'mg/dL（原著 mmol/L を ×2.8 で換算）',
      options: [
        { value: 0, label: '<18.2', description: '0点' },
        { value: 2, label: '18.2–22.3', description: '+2点' },
        { value: 3, label: '22.4–27.9', description: '+3点' },
        { value: 4, label: '28.0–69.9', description: '+4点' },
        { value: 6, label: '≥70', description: '+6点' },
      ],
    },
    {
      id: 'hb',
      label: 'ヘモグロビン',
      description: 'g/dL。12.0–12.9 は男性のみ1点、10.0–11.9 は男性3 / 女性1',
      options: [
        { value: 0, label: '≥13.0', description: '0点' },
        { value: 1, label: '12.0–12.9', description: '男性 +1 / 女性 0' },
        { value: 2, label: '10.0–11.9', description: '男性 +3 / 女性 +1' },
        { value: 3, label: '<10.0', description: '+6点' },
      ],
    },
    {
      id: 'sbp',
      label: '収縮期血圧',
      options: [
        { value: 0, label: '≥110', description: '0点' },
        { value: 1, label: '100–109', description: '+1点' },
        { value: 2, label: '90–99', description: '+2点' },
        { value: 3, label: '<90', description: '+3点' },
      ],
    },
    {
      id: 'pulse',
      label: '脈拍',
      options: [
        { value: 0, label: '<100 /分', description: '0点' },
        { value: 1, label: '≥100 /分', description: '+1点' },
      ],
    },
    {
      id: 'melena',
      label: '黒色便',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 1, label: 'あり', description: '+1点' },
      ],
    },
    {
      id: 'syncope',
      label: '失神',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 2, label: 'あり', description: '+2点' },
      ],
    },
    {
      id: 'hepatic',
      label: '肝疾患',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 2, label: 'あり', description: '+2点' },
      ],
    },
    {
      id: 'cardiac',
      label: '心不全',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 2, label: 'あり', description: '+2点' },
      ],
    },
  ],
  compute: computeGbs,
};
