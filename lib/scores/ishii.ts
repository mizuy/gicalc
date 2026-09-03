import type { ScoreResult } from '../../types/score';

export const ISHII_MAX_SCORE = 5;

export function computeIshii(values: Record<string, number>): ScoreResult {
  const total = values.color + values.size + values.surface + values.vessels;

  if (total >= 3) {
    return {
      total,
      maxScore: ISHII_MAX_SCORE,
      displayMode: 'points',
      severity: 'severe',
      interpretation: 'VCL C4/5（HGA / 癌）を疑う',
      details: [
        'カットオフ ≥3 点。導出コホートの正診率 92%、感度 95%、特異度 93%。',
        '色調は白光、表面・血管は NBI 拡大で評価する。',
      ],
    };
  }
  return {
    total,
    maxScore: ISHII_MAX_SCORE,
    displayMode: 'points',
    severity: 'mild',
    interpretation: 'VCL C3（LGA）を疑う',
    details: [
      'カットオフ <3 点。低異型度腺腫の見込み。',
      '色調は白光、表面・血管は NBI 拡大で評価する。',
    ],
  };
}
