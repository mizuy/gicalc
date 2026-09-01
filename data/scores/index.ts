import { CATEGORY_LABELS, CATEGORY_ORDER, type ScoreCategory, type ScoreDefinition } from '../../types/score';
import { apcsScore } from './apcs';
import { aronchickScore } from './aronchick';
import { bbpsScore } from './bbps';
import { bestJScore } from './best-j';
import { ecuraHattaScore } from './ecura-hatta';
import { eggimScore } from './eggim';
import { gbsScore } from './gbs';
import { kajiwaraNomogram } from './kajiwara-nomogram';
import { kyotoScore } from './kyoto';
import { kyotoModifiedScore } from './kyoto-modified';
import { nobladsScore } from './noblads';
import { sekiguchiScore } from './sekiguchi';

/** 表示順: 検診 → 大腸T1 → 前処置 → 早期胃癌 → 胃炎リスク → 出血 */
export const SCORES: ScoreDefinition[] = [
  apcsScore,
  kajiwaraNomogram,
  bbpsScore,
  aronchickScore,
  ecuraHattaScore,
  sekiguchiScore,
  bestJScore,
  kyotoScore,
  kyotoModifiedScore,
  eggimScore,
  gbsScore,
  nobladsScore,
];

export function getScoreById(id: string): ScoreDefinition | undefined {
  return SCORES.find((score) => score.id === id);
}

export type ScoreCategoryGroup = {
  category: ScoreCategory;
  label: string;
  scores: ScoreDefinition[];
};

export function getScoresGroupedByCategory(): ScoreCategoryGroup[] {
  return CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    scores: SCORES.filter((score) => score.category === category),
  })).filter((group) => group.scores.length > 0);
}
