import type { ScoreResult } from '../../types/score';

export const KYOTO_MAX_SCORE = 8;

export function computeKyoto(values: Record<string, number>): ScoreResult {
  const total = values.atrophy + values.im + values.fold + values.nodularity + values.redness;

  if (total <= 4) {
    return {
      total,
      maxScore: KYOTO_MAX_SCORE,
      displayMode: 'points',
      severity: total === 0 ? 'none' : 'mild',
      interpretation: '低リスク群（0–4）',
      details: ['Kawamura 2021 の原法カットオフ。萎縮が強いほど注意してください。'],
    };
  }
  return {
    total,
    maxScore: KYOTO_MAX_SCORE,
    displayMode: 'points',
    severity: 'severe',
    interpretation: '高リスク',
    details: ['5–8 点は高リスク群です。丁寧な観察とサーベイランスを検討してください。'],
  };
}
