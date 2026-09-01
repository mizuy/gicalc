import { CATEGORY_LABELS, CATEGORY_ORDER, type ScoreCategory, type ScoreDefinition } from '../../types/score';
import { bestJScore } from './best-j';
import { ecuraHattaScore } from './ecura-hatta';
import { kajiwaraNomogram } from './kajiwara-nomogram';

/** 表示順: 大腸T1 → eCura → BEST-J */
export const SCORES: ScoreDefinition[] = [kajiwaraNomogram, ecuraHattaScore, bestJScore];

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
