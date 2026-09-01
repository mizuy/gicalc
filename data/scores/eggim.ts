import { computeEggim } from '../../lib/scores/eggim';
import type { ScoreDefinition } from '../../types/score';

const areaField = (id: string, label: string): ScoreDefinition['fields'][number] => ({
  id,
  label,
  options: [
    { value: 0, label: 'なし', description: '0点' },
    { value: 1, label: '限局 ≤30%', description: '+1点' },
    { value: 2, label: '広範 >30%', description: '+2点' },
  ],
});

export const eggimScore: ScoreDefinition = {
  id: 'eggim',
  name: 'EGGIM（内視鏡的腸上皮化生スコア）',
  shortName: 'EGGIM',
  category: 'gastritis',
  categoryLabel: '胃炎・胃癌リスク',
  description:
    'IEE で前庭・体部の小弯/大弯4領域の腸上皮化生を 0–8 点で評価します。5–8 が高リスク（Kawamura 2021）。生検は不要です。',
  reference:
    'Pimentel-Nunes P et al. Endoscopy 2016;48:723-730 / Kawamura M et al. Dig Endosc 2021',
  fields: [
    areaField('antrumLesser', '前庭部小弯'),
    areaField('antrumGreater', '前庭部大弯'),
    areaField('corpusLesser', '体部小弯'),
    areaField('corpusGreater', '体部大弯'),
  ],
  compute: computeEggim,
};
