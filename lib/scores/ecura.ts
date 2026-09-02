import type { ScoreResult } from '../../types/score';

export const ECURA_MAX_SCORE = 7;

/** Hatta 2017 導出コホート。JGES ESD/EMR ガイドライン第2版 Table 4。 */
export const ECURA_LNM_BY_SCORE: Record<number, { rate: string; n: string; ci: string }> = {
  0: { rate: '1.6%', n: '1/62', ci: '0.3–8.6' },
  1: { rate: '2.6%', n: '9/341', ci: '1.4–4.9' },
  2: { rate: '4.9%', n: '9/185', ci: '2.6–9.0' },
  3: { rate: '7.4%', n: '11/148', ci: '4.2–12.8' },
  4: { rate: '8.3%', n: '11/132', ci: '4.7–14.3' },
  5: { rate: '19.9%', n: '28/141', ci: '14.1–27.2' },
  6: { rate: '27.3%', n: '21/77', ci: '18.6–38.1' },
  7: { rate: '26.7%', n: '4/15', ci: '10.9–52.0' },
};

function scoreLnmDetail(total: number): string {
  const lnm = ECURA_LNM_BY_SCORE[total] ?? ECURA_LNM_BY_SCORE[7];
  return `この点数の LNM率 ${lnm.rate}（${lnm.n}、95% CI ${lnm.ci}）`;
}

export function computeEcura(values: Record<string, number>): ScoreResult {
  const total = values.ly + values.size + values.vm + values.v + values.sm;
  const scoreLine = scoreLnmDetail(total);

  if (total <= 1) {
    return {
      total,
      maxScore: ECURA_MAX_SCORE,
      displayMode: 'points',
      severity: 'none',
      interpretation: '低リスク',
      details: [scoreLine, 'リスク区分の LNM率 2.5%（CSS 99.6%）', 'ESD単独も選択肢です。'],
    };
  }

  if (total <= 4) {
    return {
      total,
      maxScore: ECURA_MAX_SCORE,
      displayMode: 'points',
      severity: 'moderate',
      interpretation: '中リスク',
      details: [scoreLine, 'リスク区分の LNM率 6.7%（CSS 96.0%）', '追加治療は個別判断してください。'],
    };
  }

  return {
    total,
    maxScore: ECURA_MAX_SCORE,
    displayMode: 'points',
    severity: 'severe',
    interpretation: '高リスク',
    details: [scoreLine, 'リスク区分の LNM率 22.7%（CSS 90.1%）', '救済胃切除＋リンパ節郭清を推奨します。'],
  };
}
