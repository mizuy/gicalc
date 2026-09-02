import type { ScoreResult } from '../../types/score';

export const BBPS_MAX_SCORE = 9;

const SEGMENT_LABELS = {
  right: '右（盲腸・上行）',
  transverse: '横行（肝・脾弯曲含む）',
  left: '左（下行・S状・直腸）',
} as const;

export function computeBbps(values: Record<string, number>): ScoreResult {
  const right = values.right;
  const transverse = values.transverse;
  const left = values.left;
  const total = right + transverse + left;
  const allAdequate = right >= 2 && transverse >= 2 && left >= 2;
  const segmentLine = `${SEGMENT_LABELS.right} ${right} / ${SEGMENT_LABELS.transverse} ${transverse} / ${SEGMENT_LABELS.left} ${left}`;

  if (allAdequate) {
    return {
      total,
      maxScore: BBPS_MAX_SCORE,
      displayMode: 'points',
      severity: total >= 8 ? 'none' : 'mild',
      interpretation: total >= 8 ? '良好（adequate）' : 'adequate',
      details: [
        segmentLine,
        '各区域 ≥2 かつ合計 ≥6 は、通常のサーベイランス間隔の目安です。',
        '洗浄・吸引後の抜去時に評価します。Aronchick とは時点が違います。',
      ],
    };
  }

  return {
    total,
    maxScore: BBPS_MAX_SCORE,
    displayMode: 'points',
    severity: total <= 2 ? 'severe' : 'moderate',
    interpretation: '不十分（inadequate）',
    details: [
      segmentLine,
      '1つでも区域が 0–1 なら inadequate とするのが一般的です。再検査間隔の短縮を検討してください。',
      '洗浄・吸引後の抜去時に評価します。',
    ],
  };
}
