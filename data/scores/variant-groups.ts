/** 同一ページ内タブで切り替えるスコア群。defaultVariantId が初期表示。 */
export type ScoreVariantGroup = {
  /** 一覧・URL の代表 id */
  pageId: string;
  /** 初期タブ（改変版を優先） */
  defaultVariantId: string;
  /** タブ順（先頭が default） */
  variantIds: readonly string[];
};

export const SCORE_VARIANT_GROUPS: Record<string, ScoreVariantGroup> = {
  kyoto: {
    pageId: 'kyoto',
    defaultVariantId: 'kyoto-modified',
    variantIds: ['kyoto-modified', 'kyoto'],
  },
  spigelman: {
    pageId: 'spigelman',
    defaultVariantId: 'modified-spigelman',
    variantIds: ['modified-spigelman', 'spigelman'],
  },
  apcs: {
    pageId: 'apcs',
    defaultVariantId: 'apcs-modified',
    variantIds: ['apcs-modified', 'apcs'],
  },
};

/** 一覧から隠す variant 専用 id（pageId 以外） */
export const HIDDEN_LIST_SCORE_IDS = new Set(
  Object.values(SCORE_VARIANT_GROUPS).flatMap((group) =>
    group.variantIds.filter((id) => id !== group.pageId),
  ),
);

export function getVariantGroup(pageId: string): ScoreVariantGroup | undefined {
  return SCORE_VARIANT_GROUPS[pageId];
}

export function findVariantGroupByScoreId(id: string): ScoreVariantGroup | undefined {
  if (SCORE_VARIANT_GROUPS[id]) return SCORE_VARIANT_GROUPS[id];
  return Object.values(SCORE_VARIANT_GROUPS).find((group) => group.variantIds.includes(id));
}

export function resolveScoreRoute(id: string): { pageId: string; variantId: string } {
  const byPage = SCORE_VARIANT_GROUPS[id];
  if (byPage) {
    return { pageId: id, variantId: byPage.defaultVariantId };
  }
  const group = findVariantGroupByScoreId(id);
  if (group && group.variantIds.includes(id)) {
    return { pageId: group.pageId, variantId: id };
  }
  return { pageId: id, variantId: id };
}

export function getScoreRouteIds(): string[] {
  const ids = new Set<string>();
  for (const group of Object.values(SCORE_VARIANT_GROUPS)) {
    ids.add(group.pageId);
    for (const variantId of group.variantIds) {
      ids.add(variantId);
    }
  }
  return [...ids];
}
