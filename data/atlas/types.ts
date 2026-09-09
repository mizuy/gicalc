import type { ClassificationFigure } from '../../types/score';

/** アトラスに載せる論文 Figure 1枚。切り抜きしない。CC BY / BY-NC / BY-ND / BY-NC-ND を原図のまま掲載してよい。 */
export type AtlasFigure = ClassificationFigure & {
  /** 出版年。並べは降順 */
  year: number;
  /** 1–12。同年のときは月の降順。無ければ著者 */
  month?: number;
  /** 同年同月のときの並べ用（第一著者） */
  authors?: string;
  /** 日本語の Figure legend（必須。パネル説明） */
  legend: string;
  /** 英語の Figure legend */
  legendEn: string;
};

export function localizeAtlasFigure(
  figure: AtlasFigure,
  locale: 'ja' | 'en',
): ClassificationFigure {
  if (locale !== 'en') return figure;
  return { ...figure, legend: figure.legendEn };
}

export type AtlasDefinition = {
  /** 分類 id と同じ（/atlas/{id}） */
  id: string;
  scoreId: string;
  figures: AtlasFigure[];
};

export function compareAtlasFigures(a: AtlasFigure, b: AtlasFigure): number {
  if (a.year !== b.year) return b.year - a.year;
  const monthA = a.month ?? 0;
  const monthB = b.month ?? 0;
  if (monthA !== monthB) return monthB - monthA;
  const authorA = a.authors ?? a.sourceShort;
  const authorB = b.authors ?? b.sourceShort;
  return authorA.localeCompare(authorB);
}

export function sortedAtlasFigures(figures: AtlasFigure[]): AtlasFigure[] {
  return [...figures].sort(compareAtlasFigures);
}
