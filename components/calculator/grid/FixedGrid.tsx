import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

/** 壁深達度 | 潰瘍 | 分化×2 | 未分化×2 */
export const GASTRIC_GRID_COL_WIDTHS = [76, 48, 76, 76, 76, 76] as const;

export const GASTRIC_GRID_WIDTH = GASTRIC_GRID_COL_WIDTHS.reduce((sum, w) => sum + w, 0);

export function gridColWidth(startCol: number, colSpan: number): number {
  return GASTRIC_GRID_COL_WIDTHS.slice(startCol, startCol + colSpan).reduce((sum, w) => sum + w, 0);
}

type GridCellProps = {
  colSpan?: number;
  startCol?: number;
  width?: number;
  highlighted?: boolean;
  highlightColor?: string;
  borderColor: string;
  backgroundColor?: string;
  minHeight?: number;
  header?: boolean;
  surfaceColor?: string;
  style?: ViewStyle;
  children?: ReactNode;
};

export function GridCell({
  colSpan = 1,
  startCol = 0,
  width,
  highlighted = false,
  highlightColor,
  borderColor,
  backgroundColor,
  minHeight = 44,
  header = false,
  surfaceColor,
  style,
  children,
}: GridCellProps) {
  const cellWidth = width ?? gridColWidth(startCol, colSpan);

  return (
    <View
      style={[
        styles.cell,
        {
          width: cellWidth,
          minWidth: cellWidth,
          maxWidth: cellWidth,
          minHeight,
          borderColor: highlighted && highlightColor ? highlightColor : borderColor,
          backgroundColor: backgroundColor ?? (header ? surfaceColor : undefined),
        },
        highlighted && highlightColor ? styles.cellHighlighted : null,
        style,
      ]}>
      {children}
    </View>
  );
}

export function GridRow({ children, borderColor }: { children: ReactNode; borderColor: string }) {
  return (
    <View style={[styles.row, { width: GASTRIC_GRID_WIDTH, borderColor }]}>
      {children}
    </View>
  );
}

export function GridTable({
  children,
  borderColor,
}: {
  children: ReactNode;
  borderColor: string;
}) {
  return (
    <View style={[styles.table, { borderColor, width: GASTRIC_GRID_WIDTH }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
  },
  cell: {
    flexShrink: 0,
    flexGrow: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  cellHighlighted: {
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    marginTop: -1,
    marginLeft: -1,
    zIndex: 1,
  },
});
