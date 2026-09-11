import type { ScoreResult } from '../../types/score';

export const OLGA_MAX_STAGE = 4;

/**
 * OLGA / OLGIM stage table (antrum row × corpus column).
 * Capelle 2010 GIE uses the same grid with IM instead of atrophy.
 */
const OLGA_STAGE: readonly (readonly number[])[] = [
  [0, 1, 2, 2],
  [1, 1, 2, 3],
  [2, 2, 3, 4],
  [3, 3, 4, 4],
];

export function olgaStage(antrum: number, corpus: number): number {
  const row = Math.min(3, Math.max(0, antrum));
  const col = Math.min(3, Math.max(0, corpus));
  return OLGA_STAGE[row][col];
}

const STAGE_LABEL = ['Stage 0', 'Stage I', 'Stage II', 'Stage III', 'Stage IV'] as const;

function stageResult(
  total: number,
  kind: 'atrophy' | 'im',
): ScoreResult {
  const noun = kind === 'atrophy' ? '萎縮' : '腸上皮化生';
  const details = [
    `前庭 × 体部の${noun}から Stage を求めます。`,
  ];
  if (total >= 3) {
    details.push('Stage III–IV は胃癌高リスクで、サーベイランスを検討します。');
  } else if (total === 0) {
    details.push(`組織学的な${noun}を認めません。`);
  } else {
    details.push('Stage I–II は低〜中等度リスクです。');
  }

  const severity = total >= 3 ? 'severe' : total === 0 ? 'none' : 'moderate';
  return {
    total,
    maxScore: OLGA_MAX_STAGE,
    displayMode: 'points',
    severity,
    interpretation: STAGE_LABEL[total],
    details,
  };
}

export function computeOlga(values: Record<string, number>): ScoreResult {
  return stageResult(olgaStage(values.antrum ?? 0, values.corpus ?? 0), 'atrophy');
}

export function computeOlgim(values: Record<string, number>): ScoreResult {
  return stageResult(olgaStage(values.antrum ?? 0, values.corpus ?? 0), 'im');
}
