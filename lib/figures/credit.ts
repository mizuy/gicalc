import { pubmedUrl } from '../pubmed';
import type { ClassificationFigure, FigureKind } from '../../types/score';

const FIGURE_REF_IN_TEXT = /\b((?:Fig\.|Table)\s+\d+(?:-\d+)?[A-Za-z]?)\b/;

export function compactLicense(license?: string): string | undefined {
  if (!license?.trim()) return undefined;
  return license.replace(/\s+\d+\.\d+\s*$/, '').trim();
}

export function figureOriginLabel(kind: FigureKind): 'Original' | 'Not original' {
  return kind === 'original' ? 'Original' : 'Not original';
}

function normalizeFigureRef(raw: string): string {
  const trimmed = raw.replace(/\s+/g, ' ').trim();
  const fig = trimmed.match(/^fig\.?\s*(.+)$/i);
  if (fig) return `Fig. ${fig[1]}`;
  const table = trimmed.match(/^table\s*(.+)$/i);
  if (table) return `Table ${table[1]}`;
  return trimmed;
}

function extractFigureRef(text?: string): string | undefined {
  if (!text) return undefined;
  const match = text.match(FIGURE_REF_IN_TEXT);
  return match ? normalizeFigureRef(match[1]) : undefined;
}

export function resolveFigureRef(figure: ClassificationFigure): string | undefined {
  if (figure.figureRef?.trim()) return normalizeFigureRef(figure.figureRef);
  return extractFigureRef(figure.hrefLabel) ?? extractFigureRef(figure.caption);
}

export function figureCreditParts(figure: ClassificationFigure): string[] {
  const parts = [figure.sourceShort.trim()];
  const ref = resolveFigureRef(figure);
  if (ref) parts.push(ref);
  parts.push(figureOriginLabel(figure.figureKind));
  const license = compactLicense(figure.license);
  if (license) parts.push(license);
  return parts;
}

export function figureCreditLabel(figure: ClassificationFigure): string {
  return figureCreditParts(figure).join(', ');
}

export function figureCreditHref(figure: ClassificationFigure): string | undefined {
  if (figure.figureKind === 'gicalc') return undefined;
  if (figure.href && /^https?:\/\//.test(figure.href)) return figure.href;
  if (figure.doi) return figure.doi;
  if (figure.pubmed) return pubmedUrl(figure.pubmed);
  return undefined;
}
