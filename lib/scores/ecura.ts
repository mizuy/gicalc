import type { ScoreResult } from '../../types/score';

export const ECURA_MAX_SCORE = 7;

export function computeEcura(values: Record<string, number>): ScoreResult {
  const total = values.ly + values.size + values.vm + values.v + values.sm;

  if (total <= 1) {
    return {
      total,
      maxScore: ECURA_MAX_SCORE,
      displayMode: 'points',
      severity: 'none',
      interpretation: '低リスク',
      details: ['LNM率 2.5%（CSS 99.6%）', 'ESD単独も選択肢です。'],
    };
  }

  if (total <= 4) {
    return {
      total,
      maxScore: ECURA_MAX_SCORE,
      displayMode: 'points',
      severity: 'moderate',
      interpretation: '中リスク',
      details: ['LNM率 6.7%（CSS 96.0%）', '追加治療は個別判断してください。'],
    };
  }

  return {
    total,
    maxScore: ECURA_MAX_SCORE,
    displayMode: 'points',
    severity: 'severe',
    interpretation: '高リスク',
    details: ['LNM率 22.7%（CSS 90.1%）', '救済胃切除＋リンパ節郭清を推奨します。'],
  };
}
