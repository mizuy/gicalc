import type { ListNavCategory, ScoreDefinition } from '../../types/score';
import { LIST_NAV_CATEGORY_ORDER, LIST_NAV_CATEGORY_LABELS } from '../../types/score';

/** 定義上の organ とは別に、一覧の大カテゴリへ割り当てる id */
const NAV_CATEGORY_OVERRIDE: Record<string, ListNavCategory> = {
  vienna: 'pathology',
};

export function getScoreNavCategory(score: ScoreDefinition): ListNavCategory {
  return NAV_CATEGORY_OVERRIDE[score.id] ?? score.organ;
}

export type ScoreNavGroup = {
  category: ListNavCategory;
  label: string;
  scores: ScoreDefinition[];
};

export function getScoresGroupedByNavCategory(scores: ScoreDefinition[]): ScoreNavGroup[] {
  return LIST_NAV_CATEGORY_ORDER.map((category) => ({
    category,
    label: LIST_NAV_CATEGORY_LABELS[category],
    scores: scores.filter((score) => getScoreNavCategory(score) === category),
  })).filter((group) => group.scores.length > 0);
}
