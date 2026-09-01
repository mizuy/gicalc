import type { ScoreResult } from '../../types/score';

export const GBS_MAX_SCORE = 23;

/** BUN は mg/dL。原著 Lancet 2000 の mmol/L 区分を換算（×2.8）。 */
export function bunPoints(mgDlBand: number): number {
  if (mgDlBand === 2) return 2;
  if (mgDlBand === 3) return 3;
  if (mgDlBand === 4) return 4;
  if (mgDlBand === 6) return 6;
  return 0;
}

/** hbBand: 0=≥13.0, 1=12.0–12.9, 2=10.0–11.9, 3=<10.0 */
export function hemoglobinPoints(sex: number, hbBand: number): number {
  if (hbBand <= 0) return 0;
  if (hbBand === 1) return sex === 1 ? 0 : 1;
  if (hbBand === 2) return sex === 1 ? 1 : 3;
  return 6;
}

export function computeGbs(values: Record<string, number>): ScoreResult {
  const total =
    bunPoints(values.bun) +
    hemoglobinPoints(values.sex, values.hb) +
    values.sbp +
    values.pulse +
    values.melena +
    values.syncope +
    values.hepatic +
    values.cardiac;

  if (total === 0) {
    return {
      total,
      maxScore: GBS_MAX_SCORE,
      displayMode: 'points',
      severity: 'none',
      interpretation: '超低リスク',
      details: ['介入不要の見込みが高いです。', 'ESGE では GBS 0–1 を外来管理の候補とします。'],
    };
  }
  if (total === 1) {
    return {
      total,
      maxScore: GBS_MAX_SCORE,
      displayMode: 'points',
      severity: 'none',
      interpretation: '低リスク',
      details: ['ESGE では GBS 0–1 を外来管理の候補とします。'],
    };
  }
  if (total <= 5) {
    return {
      total,
      maxScore: GBS_MAX_SCORE,
      displayMode: 'points',
      severity: 'moderate',
      interpretation: '中リスク',
      details: ['入院・早期内視鏡を検討してください。'],
    };
  }
  if (total <= 11) {
    return {
      total,
      maxScore: GBS_MAX_SCORE,
      displayMode: 'points',
      severity: 'severe',
      interpretation: '高リスク',
      details: ['治療介入（輸血・内視鏡）の必要性が高いです。'],
    };
  }
  return {
    total,
    maxScore: GBS_MAX_SCORE,
    displayMode: 'points',
    severity: 'severe',
    interpretation: '超高リスク',
    details: ['集中治療と緊急内視鏡を強く検討してください。'],
  };
}
