import type { ScoreResult } from '../../types/score';

export const NOBLADS_MAX_SCORE = 8;
export const NOBLADS_FIELD_IDS = [
  'nsaids',
  'noDiarrhea',
  'noTenderness',
  'hypotension',
  'antiplatelet',
  'albumin',
  'charlson',
  'syncope',
] as const;

const SEVERE_RATES: Record<number, string> = {
  0: '2.0%',
  1: '10.0%',
  2: '18.3%',
  3: '34.8%',
  4: '51.6%',
};

export function computeNoblads(values: Record<string, number>): ScoreResult {
  const total = NOBLADS_FIELD_IDS.reduce((sum, id) => sum + values[id], 0);
  const severeRate = total >= 5 ? '75.7%' : SEVERE_RATES[total];

  if (total < 2) {
    return {
      total,
      maxScore: NOBLADS_MAX_SCORE,
      displayMode: 'points',
      severity: 'none',
      interpretation: '低リスク',
      details: [`重症 LGIB 率 ${severeRate}（導出コホート）`, '外来管理の候補です。'],
    };
  }
  if (total < 4) {
    return {
      total,
      maxScore: NOBLADS_MAX_SCORE,
      displayMode: 'points',
      severity: 'moderate',
      interpretation: '高リスク',
      details: [`重症 LGIB 率 ${severeRate}`, '入院を検討してください。'],
    };
  }
  return {
    total,
    maxScore: NOBLADS_MAX_SCORE,
    displayMode: 'points',
    severity: 'severe',
    interpretation: '超高リスク',
    details: [
      `重症 LGIB 率 ${severeRate}`,
      '輸血・止血介入の可能性が高いです。緊急大腸内視鏡を検討してください。',
    ],
  };
}
