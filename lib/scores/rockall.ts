import type { ScoreResult } from '../../types/score';

export const ROCKALL_MAX_SCORE = 11;
export const ROCKALL_CLINICAL_MAX = 7;

/** Rockall 1996 Gut Table IV(B) complete-score mortality (validation cohort, commonly cited). */
const COMPLETE_MORTALITY: Record<number, string> = {
  0: '0%',
  1: '0%',
  2: '0.2%',
  3: '2.9%',
  4: '5.3%',
  5: '10.8%',
  6: '17.3%',
  7: '27.0%',
};

function completeMortality(total: number): string {
  if (total >= 8) return '41.1%';
  return COMPLETE_MORTALITY[total] ?? '41.1%';
}

export function clinicalRockallScore(values: Record<string, number>): number {
  return (values.age ?? 0) + (values.shock ?? 0) + (values.comorbidity ?? 0);
}

export function computeRockall(values: Record<string, number>): ScoreResult {
  const clinical = clinicalRockallScore(values);
  const total = clinical + (values.diagnosis ?? 0) + (values.srh ?? 0);
  const mortality = completeMortality(total);
  const details = [
    `臨床（内視鏡前）スコア ${clinical} / ${ROCKALL_CLINICAL_MAX}`,
    `原著 complete score の死亡率は約 ${mortality} です。`,
  ];

  if (total <= 1) {
    return {
      total,
      maxScore: ROCKALL_MAX_SCORE,
      displayMode: 'points',
      severity: 'none',
      interpretation: '極低リスク',
      details: [...details, '再出血・死亡リスクはごく低いです。早期退院の候補になります。'],
    };
  }
  if (total <= 3) {
    return {
      total,
      maxScore: ROCKALL_MAX_SCORE,
      displayMode: 'points',
      severity: 'mild',
      interpretation: '低リスク',
      details: [...details, 'complete score ≤2 は原著で死亡リスクがごく低い群です。'],
    };
  }
  if (total <= 5) {
    return {
      total,
      maxScore: ROCKALL_MAX_SCORE,
      displayMode: 'points',
      severity: 'moderate',
      interpretation: '中リスク',
      details: [...details, '入院管理と早期内視鏡を検討してください。'],
    };
  }
  if (total <= 7) {
    return {
      total,
      maxScore: ROCKALL_MAX_SCORE,
      displayMode: 'points',
      severity: 'severe',
      interpretation: '高リスク',
      details: [...details, '死亡リスクが高く、集中治療と確実な止血を検討してください。'],
    };
  }
  return {
    total,
    maxScore: ROCKALL_MAX_SCORE,
    displayMode: 'points',
    severity: 'severe',
    interpretation: '超高リスク',
    details: [...details, 'complete score ≥8 は原著で死亡率約 41% です。'],
  };
}
