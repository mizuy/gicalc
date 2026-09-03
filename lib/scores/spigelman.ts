import type { ScoreResult, ScoreSeverity } from '../../types/score';

export const SPIGELMAN_MAX_SCORE = 12;

export function spigelmanStage(total: number): {
  stage: string;
  severity: ScoreSeverity;
  interval: string;
} {
  if (total <= 0) {
    return { stage: '0', severity: 'none', interval: '5年ごと' };
  }
  if (total <= 4) {
    return { stage: 'I', severity: 'none', interval: '5年ごと' };
  }
  if (total <= 6) {
    return { stage: 'II', severity: 'mild', interval: '3年ごと' };
  }
  if (total <= 8) {
    return { stage: 'III', severity: 'moderate', interval: '1年ごと' };
  }
  return { stage: 'IV', severity: 'severe', interval: '6–12か月。膵温存十二指腸切除も検討' };
}

export function computeSpigelman(values: Record<string, number>): ScoreResult {
  const total = values.number + values.size + values.histology + values.dysplasia;
  const { stage, severity, interval } = spigelmanStage(total);
  return {
    total,
    maxScore: SPIGELMAN_MAX_SCORE,
    displayMode: 'points',
    severity,
    interpretation: `Stage ${stage}`,
    details: [
      `Spigelman stage ${stage}（0–12 点）。`,
      `ESGE 2019 の十二指腸サーベイランス目安: ${interval}。`,
      '乳頭部は別評価。Stage IV は十二指腸・乳頭部癌リスクが高い。',
    ],
  };
}

export function computeModifiedSpigelman(values: Record<string, number>): ScoreResult {
  const total = values.number + values.size + values.histology + values.dysplasia;
  const { stage, severity, interval } = spigelmanStage(total);
  return {
    total,
    maxScore: SPIGELMAN_MAX_SCORE,
    displayMode: 'points',
    severity,
    interpretation: `Stage ${stage}`,
    details: [
      `Modified Spigelman stage ${stage}（Vienna: LGD 1 点 / HGD 3 点）。`,
      `ESGE 2019 の十二指腸サーベイランス目安: ${interval}。`,
      '1989 原法の軽度・中等度・高度は使わない。乳頭部は別評価。',
    ],
  };
}
