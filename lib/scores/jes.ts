import type { ScoreResult } from '../../types/score';

const TYPES: Record<
  number,
  { label: string; interpretation: string; severity: ScoreResult['severity']; details: string[] }
> = {
  1: {
    label: 'Type A',
    interpretation: '非癌（炎症 / LGIN）',
    severity: 'none',
    details: [
      '正常 IPCL、または高度不整のない血管。Inoue の IPCL I–V とは別分類です。',
      '非腫瘍または低異型度上皮内腫瘍のことが多い。必要なら生検します。',
    ],
  },
  2: {
    label: 'Type B1',
    interpretation: 'EP / LPM',
    severity: 'mild',
    details: [
      'ループを保った異常血管（拡張・蛇行・口径不同・形状不均一）。',
      '推定深達度は T1a-EP / T1a-LPM。ESD の適応を検討します。',
    ],
  },
  3: {
    label: 'Type B2',
    interpretation: 'MM / SM1',
    severity: 'moderate',
    details: [
      'ループが破壊された非ループ血管。推定深達度は T1a-MM / T1b-SM1（食道 SM1 は ≤200 μm）。',
      '無血管領域（AVA）: 小 <0.5 mm は EP/LPM、中 0.5–3 mm は MM/SM1、大 >3 mm は SM2 以深のことが多い。',
    ],
  },
  4: {
    label: 'Type B3',
    interpretation: 'SM2 以深',
    severity: 'severe',
    details: [
      '高度に拡張した異常血管（通常の B2 の約3倍以上）。',
      '推定深達度は T1b-SM2 以深。外科または化学放射線を検討します。',
    ],
  },
};

export function computeJes(values: Record<string, number>): ScoreResult {
  const spec = TYPES[values.type] ?? TYPES[1];
  return {
    total: values.type,
    displayMode: 'classification',
    classificationLabel: spec.label,
    severity: spec.severity,
    interpretation: spec.interpretation,
    details: spec.details,
  };
}
