import type { CSSProperties } from 'react';

export function htmlTableCellStyle(
  border: string,
  tint: string,
  options?: {
    highlighted?: boolean;
    backgroundColor?: string;
    label?: boolean;
    surface?: string;
  },
): CSSProperties {
  const highlighted = options?.highlighted ?? false;
  return {
    border: `${highlighted ? 2 : 1}px solid ${highlighted ? tint : border}`,
    padding: '8px 6px',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontSize: options?.label ? 11 : 12,
    fontWeight: options?.label ? 600 : undefined,
    lineHeight: 1.4,
    whiteSpace: 'pre-line',
    backgroundColor: options?.backgroundColor ?? (options?.label ? options.surface : undefined),
    boxSizing: 'border-box',
  };
}

export const HTML_TABLE_BASE: CSSProperties = {
  borderCollapse: 'collapse',
  tableLayout: 'fixed',
  maxWidth: '100%',
};
