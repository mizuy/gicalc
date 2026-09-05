import type { ListNavCategory, ScoreDefinition } from '../../types/score';
import { LIST_NAV_CATEGORY_ORDER, LIST_NAV_CATEGORY_LABELS } from '../../types/score';

/** 病理大カテゴリに載せる id（定義上の organ とは独立） */
const PATHOLOGY_NAV_SCORE_IDS = new Set<string>([
  'vienna',
  'who-serrated',
  'itbcg-budding',
  'net-grade',
  'lauren',
]);

export function getScoreNavCategory(score: ScoreDefinition): ListNavCategory {
  if (PATHOLOGY_NAV_SCORE_IDS.has(score.id)) return 'pathology';
  return score.organ;
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
