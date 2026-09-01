import type { ScoreResult } from '../../types/score';

export const SEKIGUCHI_MAX_SCORE = 11;

const LNM_BY_SCORE: Record<number, { rate: string; ci: string }> = {
  0: { rate: '0.0%', ci: '0.0–4.4' },
  1: { rate: '0.7%', ci: '0.1–2.4' },
  2: { rate: '1.8%', ci: '0.8–3.4' },
  3: { rate: '3.7%', ci: '2.4–5.5' },
  4: { rate: '7.9%', ci: '5.8–10.4' },
  5: { rate: '12.6%', ci: '9.1–16.9' },
  6: { rate: '17.2%', ci: '12.4–23.0' },
  7: { rate: '26.0%', ci: '18.7–34.3' },
  8: { rate: '35.1%', ci: '27.6–43.2' },
  9: { rate: '49.0%', ci: '40.7–57.3' },
  10: { rate: '56.1%', ci: '45.7–66.1' },
  11: { rate: '65.4%', ci: '44.3–82.8' },
};

const HISTOLOGY_POINTS = [0, 1, 1, 2] as const;

export function computeSekiguchi(values: Record<string, number>): ScoreResult {
  const histology = HISTOLOGY_POINTS[values.histology] ?? 0;
  const total = values.size + values.depth + histology + values.ulcer + values.lvi;
  const lnm = LNM_BY_SCORE[total] ?? LNM_BY_SCORE[11];

  if (total <= 2) {
    return {
      total,
      maxScore: SEKIGUCHI_MAX_SCORE,
      displayMode: 'points',
      severity: 'none',
      interpretation: '低リスク',
      details: [`LNM ${lnm.rate}（95% CI ${lnm.ci}、導出コホート）`, 'eCura とは点数・因子が異なります。'],
    };
  }
  if (total <= 5) {
    return {
      total,
      maxScore: SEKIGUCHI_MAX_SCORE,
      displayMode: 'points',
      severity: 'moderate',
      interpretation: '中リスク',
      details: [`LNM ${lnm.rate}（95% CI ${lnm.ci}）`, '追加胃切除は個別判断してください。'],
    };
  }
  return {
    total,
    maxScore: SEKIGUCHI_MAX_SCORE,
    displayMode: 'points',
    severity: 'severe',
    interpretation: '高リスク',
    details: [`LNM ${lnm.rate}（95% CI ${lnm.ci}）`, '胃切除＋リンパ節郭清を強く検討してください。'],
  };
}
