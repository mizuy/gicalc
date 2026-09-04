import type { ScoreResult } from '../../types/score';

/** Sung 2018 JGH 改変 APCS（BMI 追加） */
export const APCS_MODIFIED_MAX_SCORE = 6;

export function computeApcsModified(values: Record<string, number>): ScoreResult {
  const total = values.age + values.sex + values.family + values.smoking + values.bmi;

  if (total === 0) {
    return {
      total,
      maxScore: APCS_MODIFIED_MAX_SCORE,
      displayMode: 'points',
      severity: 'none',
      interpretation: '平均リスク（AR）',
      details: [
        '検証コホートの進行腫瘍有病率 3.8%（Sung 2018）。',
        '便潜血検診も選択肢です。',
      ],
    };
  }
  if (total <= 2) {
    return {
      total,
      maxScore: APCS_MODIFIED_MAX_SCORE,
      displayMode: 'points',
      severity: 'moderate',
      interpretation: '中等度リスク（MR）',
      details: [
        '検証コホートの進行腫瘍有病率 4.3%（Sung 2018）。',
        'リスク適応型スクリーニングでは FIT 併用も検討されます。',
      ],
    };
  }
  return {
    total,
    maxScore: APCS_MODIFIED_MAX_SCORE,
    displayMode: 'points',
    severity: 'severe',
    interpretation: '高リスク（HR）',
    details: [
      '検証コホートの進行腫瘍有病率 9.3%（Sung 2018）。平均リスクの約 2.5 倍。',
      '大腸内視鏡検診の優先対象です。',
    ],
  };
}
