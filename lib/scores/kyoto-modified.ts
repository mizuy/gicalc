import type { ScoreResult } from '../../types/score';

export const KYOTO_MODIFIED_MAX_SCORE = 5;

export function computeKyotoModified(values: Record<string, number>): ScoreResult {
  const total = values.rac + values.openAtrophy + values.corpusIm + values.mapRedness;

  if (total <= 1) {
    return {
      total,
      maxScore: KYOTO_MODIFIED_MAX_SCORE,
      displayMode: 'points',
      severity: 'none',
      interpretation: '低リスク',
      details: ['0–1 点。未分化型胃癌はこの群にも少数あります。'],
    };
  }
  if (total <= 3) {
    return {
      total,
      maxScore: KYOTO_MODIFIED_MAX_SCORE,
      displayMode: 'points',
      severity: 'moderate',
      interpretation: '中間リスク',
      details: ['2–3 点。注意深い観察を行ってください。'],
    };
  }
  return {
    total,
    maxScore: KYOTO_MODIFIED_MAX_SCORE,
    displayMode: 'points',
    severity: 'severe',
    interpretation: '高リスク',
    details: ['4–5 点。サーベイランス間隔の短縮を検討してください。'],
  };
}
