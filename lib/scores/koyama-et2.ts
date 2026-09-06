import type { ScoreResult } from '../../types/score';

export const KOYAMA_ET2_MAX_SCORE = 11;
export const KOYAMA_ET2_CUTOFF = 7;

const ITEM_POINTS = {
  deepDepression: 1,
  demarcatedDepression: 2,
  foldConvergency: 2,
  erosionWhitePlaque: 3,
  borrmannType23: 3,
} as const;

export function computeKoyamaEt2(values: Record<string, number>): ScoreResult {
  const total =
    values.deepDepression * ITEM_POINTS.deepDepression +
    values.demarcatedDepression * ITEM_POINTS.demarcatedDepression +
    values.foldConvergency * ITEM_POINTS.foldConvergency +
    values.erosionWhitePlaque * ITEM_POINTS.erosionWhitePlaque +
    values.borrmannType23 * ITEM_POINTS.borrmannType23;

  if (total >= KOYAMA_ET2_CUTOFF) {
    return {
      total,
      maxScore: KOYAMA_ET2_MAX_SCORE,
      displayMode: 'points',
      severity: 'severe',
      interpretation: 'T2（固有筋層浸潤）を疑う',
      details: [
        'カットオフ ≥7 点。開発コホート感度 82%、特異度 83%。',
        'T2 疑いでは ESD は不適当なことが多く、外科切除を検討する。',
      ],
    };
  }

  return {
    total,
    maxScore: KOYAMA_ET2_MAX_SCORE,
    displayMode: 'points',
    severity: 'mild',
    interpretation: '深在性 SM 浸潤（T1b）の可能性',
    details: [
      'カットオフ <7 点。T1b（SM 浸潤 ≥1000 μm）の可能性。',
      '深在性 SM 癌としての ESD 適応は個別判断（組織型・リンパ節転移リスク等）。',
    ],
  };
}
