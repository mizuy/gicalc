import type { ScoreResult } from '../../types/score';

export const EGGIM_MAX_SCORE = 8;
export const EGGIM_FIELD_IDS = [
  'antrumLesser',
  'antrumGreater',
  'corpusLesser',
  'corpusGreater',
] as const;

export function computeEggim(values: Record<string, number>): ScoreResult {
  const total = EGGIM_FIELD_IDS.reduce((sum, id) => sum + values[id], 0);

  if (total === 0) {
    return {
      total,
      maxScore: EGGIM_MAX_SCORE,
      displayMode: 'points',
      severity: 'none',
      interpretation: '腸上皮化生なし',
      details: ['IEE で腸上皮化生を認めません。'],
    };
  }
  if (total <= 4) {
    return {
      total,
      maxScore: EGGIM_MAX_SCORE,
      displayMode: 'points',
      severity: 'moderate',
      interpretation: '低リスク（0–4）',
      details: ['Kawamura 2021 では EGGIM 0–4 を低リスクとしています。'],
    };
  }
  return {
    total,
    maxScore: EGGIM_MAX_SCORE,
    displayMode: 'points',
    severity: 'severe',
    interpretation: '高リスク（5–8）',
    details: ['広範な腸上皮化生です。胃癌リスクが高く、サーベイランスを検討してください。'],
  };
}
