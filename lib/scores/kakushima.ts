import type { ScoreResult } from '../../types/score';

export const KAKUSHIMA_MAX_SCORE = 5;

export function computeKakushima(values: Record<string, number>): ScoreResult {
  const total = values.diameter + values.color + values.macro + values.nodularity;

  if (total >= 3) {
    return {
      total,
      maxScore: KAKUSHIMA_MAX_SCORE,
      displayMode: 'points',
      severity: 'severe',
      interpretation: 'VCL 4 以上（HGA / 癌）を疑う',
      details: [
        'カットオフ ≥3 点。検証コホートの感度 88%、特異度 79%、正診率 86%。',
        '白光（必要ならインジゴカルミン）のみ。混在色調は高い点を採用。',
      ],
    };
  }
  return {
    total,
    maxScore: KAKUSHIMA_MAX_SCORE,
    displayMode: 'points',
    severity: 'mild',
    interpretation: 'VCL 3（LGA）を疑う',
    details: [
      'カットオフ <3 点。低異型度腺腫の見込み。',
      '白光（必要ならインジゴカルミン）のみ。混在色調は高い点を採用。',
    ],
  };
}
