import type { ScoreResult } from '../../types/score';

export const BEST_J_MAX_SCORE = 19;
export const BEST_J_FIELD_IDS = [
  'warfarin',
  'doac',
  'p2y12',
  'aspirin',
  'cilostazol',
  'dialysis',
  'tumorSize',
  'lowerThird',
  'multiple',
] as const;

export function computeBestJ(values: Record<string, number>): ScoreResult {
  const total = BEST_J_FIELD_IDS.reduce((sum, id) => sum + values[id], 0);

  if (total <= 1) {
    return {
      total,
      maxScore: BEST_J_MAX_SCORE,
      displayMode: 'points',
      severity: 'none',
      interpretation: '低リスク',
      details: ['ESD後遅発性出血率 2.8%'],
    };
  }

  if (total === 2) {
    return {
      total,
      maxScore: BEST_J_MAX_SCORE,
      displayMode: 'points',
      severity: 'mild',
      interpretation: '中リスク',
      details: ['ESD後遅発性出血率 6.1%'],
    };
  }

  if (total <= 4) {
    return {
      total,
      maxScore: BEST_J_MAX_SCORE,
      displayMode: 'points',
      severity: 'moderate',
      interpretation: '高リスク',
      details: ['ESD後遅発性出血率 11.4%'],
    };
  }

  return {
    total,
    maxScore: BEST_J_MAX_SCORE,
    displayMode: 'points',
    severity: 'severe',
    interpretation: '超高リスク',
    details: ['ESD後遅発性出血率 29.7%'],
  };
}
