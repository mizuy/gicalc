import type { ScoreResult } from '../../types/score';

export const APCS_MAX_SCORE = 7;

export function computeApcs(values: Record<string, number>): ScoreResult {
  const total = values.age + values.sex + values.family + values.smoking;

  if (total <= 1) {
    return {
      total,
      maxScore: APCS_MAX_SCORE,
      displayMode: 'points',
      severity: 'none',
      interpretation: '平均リスク（AR）',
      details: [
        '検証コホートの進行腫瘍有病率 1.3%。',
        '便潜血による検診も選択肢です。大腸T1ノモグラムとは別です。',
      ],
    };
  }
  if (total <= 3) {
    return {
      total,
      maxScore: APCS_MAX_SCORE,
      displayMode: 'points',
      severity: 'moderate',
      interpretation: '中等度リスク（MR）',
      details: [
        '検証コホートの進行腫瘍有病率 3.2%（平均リスクの 2.6 倍）。',
        '第一度近親者の家族歴（+2）はこの群に入ります。',
      ],
    };
  }
  return {
    total,
    maxScore: APCS_MAX_SCORE,
    displayMode: 'points',
    severity: 'severe',
    interpretation: '高リスク（HR）',
    details: [
      '検証コホートの進行腫瘍有病率 5.2%（平均リスクの 4.3 倍）。',
      '大腸内視鏡検診の優先対象です。',
    ],
  };
}
