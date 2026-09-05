/**
 * 一覧の「その他」にまとめる参考・ニッチなツール。
 * variant 専用 id（HIDDEN_LIST_SCORE_IDS）はここに含めない。
 */
export const SECONDARY_LIST_SCORE_IDS = new Set<string>([
  'appendiceal-orifice',
  'sps',
  'colorectal-ec',
  'esd-fibrosis',
  'aronchick',
  'ishii',
  'kakushima',
]);

export function isSecondaryListScore(id: string): boolean {
  return SECONDARY_LIST_SCORE_IDS.has(id);
}
