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

/**
 * 定義上の organ / 病理カテゴリ以外の臓器一覧にも載せる id。
 * 先頭に足す（その臓器の診断フェーズの先頭になる）。
 */
const EXTRA_NAV_LISTINGS: Record<string, readonly ListNavCategory[]> = {
  paris: ['esophagus', 'stomach'],
};

export function getScoreNavCategory(score: ScoreDefinition): ListNavCategory {
  if (PATHOLOGY_NAV_SCORE_IDS.has(score.id)) return 'pathology';
  return score.organ;
}

export function getExtraNavCategories(scoreId: string): readonly ListNavCategory[] {
  return EXTRA_NAV_LISTINGS[scoreId] ?? [];
}

export function scoreListedInNavCategory(score: ScoreDefinition, category: ListNavCategory): boolean {
  return getScoreNavCategory(score) === category || getExtraNavCategories(score.id).includes(category);
}

export type ScoreNavGroup = {
  category: ListNavCategory;
  label: string;
  scores: ScoreDefinition[];
};

export function getScoresGroupedByNavCategory(scores: ScoreDefinition[]): ScoreNavGroup[] {
  return LIST_NAV_CATEGORY_ORDER.map((category) => {
    const primary = scores.filter((score) => getScoreNavCategory(score) === category);
    const extra = scores.filter(
      (score) =>
        getScoreNavCategory(score) !== category && getExtraNavCategories(score.id).includes(category),
    );
    return {
      category,
      label: LIST_NAV_CATEGORY_LABELS[category],
      scores: [...extra, ...primary],
    };
  }).filter((group) => group.scores.length > 0);
}
