import { getScoreById } from '../../data/scores';
import { RELATED_SCORES, type RelatedScoreEntry } from '../../data/scores/related-scores';
import { resolveScoreRoute } from '../../data/scores/variant-groups';
import { localizeScore, type Locale } from '../i18n';
import type { ScoreDefinition } from '../../types/score';

export type ResolvedRelatedScore = {
  entry: RelatedScoreEntry;
  score: ScoreDefinition;
  href: string;
  name: string;
  shortName: string;
  hint?: string;
};

function lookupEntries(scoreId: string): readonly RelatedScoreEntry[] {
  return RELATED_SCORES[scoreId] ?? RELATED_SCORES[resolveScoreRoute(scoreId).pageId] ?? [];
}

/** 関連スコアを解決。存在しない id は除外。 */
export function getRelatedScores(scoreId: string, locale: Locale): ResolvedRelatedScore[] {
  const seen = new Set<string>();
  const resolved: ResolvedRelatedScore[] = [];

  for (const entry of lookupEntries(scoreId)) {
    const score = getScoreById(entry.id);
    if (!score) continue;

    const route = resolveScoreRoute(entry.id);
    if (seen.has(route.pageId)) continue;
    seen.add(route.pageId);

    const localized = localizeScore(score, locale);
    resolved.push({
      entry,
      score,
      href: `/score/${route.pageId}`,
      name: localized.name,
      shortName: localized.shortName,
      hint: entry.hint ? entry.hint[locale] : undefined,
    });
  }

  return resolved;
}
