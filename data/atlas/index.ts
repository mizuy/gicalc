import { jnetAtlas } from './jnet';
import type { AtlasDefinition } from './types';

export type { AtlasDefinition, AtlasFigure } from './types';
export { compareAtlasFigures, sortedAtlasFigures } from './types';

/** アトラス候補。公開するのはホストできる CC 図が 2 枚以上ある分類だけ。 */
export const ALL_ATLAS_DEFINITIONS: AtlasDefinition[] = [jnetAtlas];

export const ATLAS_MIN_FIGURES = 2;

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
