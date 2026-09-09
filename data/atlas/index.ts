import { erefsAtlas } from './erefs';
import { jnetAtlas } from './jnet';
import { lstAtlas } from './lst';
import { mesdaGAtlas } from './mesda-g';
import { parisAtlas } from './paris';
import { uchiyamaAtlas } from './uchiyama';
import { whoSerratedAtlas } from './who-serrated';
import type { AtlasDefinition } from './types';

export type { AtlasDefinition, AtlasFigure } from './types';
export { compareAtlasFigures, localizeAtlasFigure, sortedAtlasFigures } from './types';

/**
 * アトラス候補。ホストできる CC ソースが2つ以上ある分類だけ登録する。
 * 公開するのはカード用1ソース以外の残り（1枚でも可）。
 */
export const ALL_ATLAS_DEFINITIONS: AtlasDefinition[] = [
  erefsAtlas,
  mesdaGAtlas,
  uchiyamaAtlas,
  jnetAtlas,
  parisAtlas,
  lstAtlas,
  whoSerratedAtlas,
];

export const ATLAS_MIN_FIGURES = 1;

export function isPublishedAtlas(atlas: AtlasDefinition): boolean {
  return atlas.figures.length >= ATLAS_MIN_FIGURES;
}

export function listAtlases(): AtlasDefinition[] {
  return ALL_ATLAS_DEFINITIONS.filter(isPublishedAtlas);
}

export function getAtlasById(id: string): AtlasDefinition | undefined {
  const atlas = ALL_ATLAS_DEFINITIONS.find((item) => item.id === id);
  if (!atlas || !isPublishedAtlas(atlas)) return undefined;
  return atlas;
}

export function hasAtlas(scoreId: string): boolean {
  return getAtlasById(scoreId) != null;
}

export function getAtlasRouteIds(): string[] {
  return listAtlases().map((atlas) => atlas.id);
}
