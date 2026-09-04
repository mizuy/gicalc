import { createElement, type CSSProperties, type ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { SeverityColors } from '@/constants/Colors';
import {
  GASTRIC_ESD_CURABILITY_TABLE,
  type GastricEsdCurabilityGradeCell,
  type GastricEsdCurabilityUnifiedRow,
} from '@/lib/i18n/gastricEsdCurabilityTable';
import { useLocale } from '@/lib/i18n';
import {
  gastricCurabilityCellId,
  type GastricEsdCurabilityCellId,
  type GastricEsdCurabilityColKey,
  type GastricEsdCurabilityRowKey,
} from '@/lib/scores/gastric-esd-curability';

type Props = {
  highlightedCells: GastricEsdCurabilityCellId[];
  partial: boolean;
  complete: boolean;
};

function gradeTone(grade: string): 'curative' | 'expanded' | 'nonCurative' {
  if (grade.startsWith('eCuraC')) return 'nonCurative';
  if (grade.startsWith('eCuraB')) return 'expanded';
  return 'curative';
}

function gradeColors(cell: GastricEsdCurabilityGradeCell | null, highlighted: boolean, partial: boolean, tint: string) {
  if (!cell) return { bg: undefined as string | undefined, color: undefined as string | undefined };
  if (highlighted) {
    return { bg: partial ? `${tint}14` : `${tint}24`, color: tint };
  }
  const tone = gradeTone(cell.grade);
  return {
    bg: {
      curative: `${SeverityColors.none}22`,
      expanded: `${SeverityColors.mild}33`,
      nonCurative: `${SeverityColors.severe}22`,
    }[tone],
    color: {
      curative: SeverityColors.none,
      expanded: '#9A7B1A',
      nonCurative: SeverityColors.severe,
    }[tone],
  };
}

function GradeText({
  cell,
  highlighted,
  partial,
  tint,
}: {
  cell: GastricEsdCurabilityGradeCell | null;
  highlighted: boolean;
  partial: boolean;
  tint: string;
}) {
  if (!cell) return null;
  const { color } = gradeColors(cell, highlighted, partial, tint);
  return (
    <span style={{ color, fontWeight: highlighted ? 900 : 800, fontSize: 12 }}>
      {cell.grade}
      {cell.pattern ? ` ${cell.pattern}` : ''}
    </span>
  );
}

function cellStyle(
  border: string,
  tint: string,
  highlighted: boolean,
  bg?: string,
  label = false,
  surface?: string,
): CSSProperties {
  return {
    border: `${highlighted ? 2 : 1}px solid ${highlighted ? tint : border}`,
    padding: '8px 4px',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontSize: label ? 11 : 12,
    fontWeight: label ? 600 : undefined,
    lineHeight: 1.35,
    backgroundColor: bg ?? (label ? surface : undefined),
    boxSizing: 'border-box',
  };
}

function isHighlighted(
  highlightSet: Set<GastricEsdCurabilityCellId>,
  rowKey: GastricEsdCurabilityRowKey,
  colKeys: GastricEsdCurabilityColKey[],
): boolean {
  return colKeys.some((col) => highlightSet.has(gastricCurabilityCellId(rowKey, col)));
}

function gradeTd(
  cell: GastricEsdCurabilityGradeCell | null,
  rowKey: GastricEsdCurabilityRowKey,
  colKeys: GastricEsdCurabilityColKey[],
  colSpan: number | undefined,
  highlightSet: Set<GastricEsdCurabilityCellId>,
  partial: boolean,
  border: string,
  tint: string,
) {
  const highlighted = isHighlighted(highlightSet, rowKey, colKeys);
  const { bg } = gradeColors(cell, highlighted, partial, tint);
  return createElement(
    'td',
    {
      key: `${rowKey}-${colKeys.join('-')}`,
      colSpan,
      style: cellStyle(border, tint, highlighted, bg),
    },
    createElement(GradeText, { cell, highlighted, partial, tint }),
  );
}

function renderBodyRow(
  row: GastricEsdCurabilityUnifiedRow,
  depthCell: ReactNode | null,
  highlightSet: Set<GastricEsdCurabilityCellId>,
  partial: boolean,
  border: string,
  tint: string,
  textSecondary: string,
) {
  const rowKey = row.rowKey as GastricEsdCurabilityRowKey;
  const cells: ReactNode[] = [];

  if (depthCell !== null) {
    cells.push(depthCell);
  }

  cells.push(
    createElement(
      'td',
      { style: cellStyle(border, tint, false, undefined, true, undefined) },
      createElement('span', { style: { color: textSecondary } }, row.ulcerLabel ?? ''),
    ),
  );

  if (row.diffMergeSizeCols) {
    cells.push(
      gradeTd(
        row.diffCells[0],
        rowKey,
        [row.diffColKeys[0], row.diffColKeys[1]],
        2,
        highlightSet,
        partial,
        border,
        tint,
      ),
    );
  } else {
    cells.push(
      gradeTd(row.diffCells[0], rowKey, [row.diffColKeys[0]], undefined, highlightSet, partial, border, tint),
      gradeTd(row.diffCells[1], rowKey, [row.diffColKeys[1]], undefined, highlightSet, partial, border, tint),
    );
  }

  cells.push(
    gradeTd(row.undiffCells[0], rowKey, [row.undiffColKeys[0]], undefined, highlightSet, partial, border, tint),
    gradeTd(row.undiffCells[1], rowKey, [row.undiffColKeys[1]], undefined, highlightSet, partial, border, tint),
  );

  return createElement('tr', { key: row.rowKey }, ...cells);
}

function NoteRow({
  text,
  highlighted,
  partial,
}: {
  text: string;
  highlighted: boolean;
  partial: boolean;
}) {
  const border = useThemeColor({}, 'border');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const tint = useThemeColor({}, 'tint');

  return (
    <View
      style={[
        styles.noteRow,
        {
          borderColor: highlighted ? tint : border,
          borderWidth: highlighted ? 2 : 1,
          backgroundColor: highlighted ? (partial ? `${tint}10` : `${tint}18`) : undefined,
        },
      ]}>
      <Text
        style={[
          styles.noteText,
          { color: textSecondary },
          highlighted && { color: tint, fontWeight: '600' },
        ]}>
        {text}
      </Text>
    </View>
  );
}

export function GastricEsdCurabilityTable({ highlightedCells, partial, complete }: Props) {
  const { locale } = useLocale();
  const textSecondary = useThemeColor({}, 'textSecondary');
  const border = useThemeColor({}, 'border');
  const surface = useThemeColor({}, 'surface');
  const tint = useThemeColor({}, 'tint');
  const copy = GASTRIC_ESD_CURABILITY_TABLE[locale];
  const highlightSet = new Set(highlightedCells);

  const pt1aUl0 = copy.rows.find((r) => r.rowKey === 'pt1a-ul0')!;
  const pt1aUl1 = copy.rows.find((r) => r.rowKey === 'pt1a-ul1')!;
  const pt1bSm1 = copy.rows.find((r) => r.rowKey === 'pt1b-sm1')!;
  const pt1bSm2 = copy.rows.find((r) => r.rowKey === 'pt1b-sm2')!;

  const th = (text: string, opts?: { colSpan?: number; rowSpan?: number }) =>
    createElement(
      'th',
      {
        colSpan: opts?.colSpan,
        rowSpan: opts?.rowSpan,
        style: cellStyle(border, tint, false, surface, true, surface),
      },
      createElement('span', { style: { color: textSecondary, fontWeight: 700 } }, text),
    );

  const labelTd = (text: string, rowSpan?: number) =>
    createElement(
      'td',
      {
        rowSpan,
        style: cellStyle(border, tint, false, undefined, true, undefined),
      },
      createElement('span', { style: { color: textSecondary, fontWeight: 600 } }, text),
    );

  const table = createElement(
    'table',
    { style: TABLE_STYLE },
    createElement(
      'thead',
      null,
      createElement(
        'tr',
        null,
        th(copy.headers.depth, { rowSpan: 2 }),
        th(copy.headers.ulcer, { rowSpan: 2 }),
        th(copy.headers.differentiated, { colSpan: 2 }),
        th(copy.headers.undifferentiated, { colSpan: 2 }),
      ),
      createElement(
        'tr',
        null,
        th(copy.headers.diffLe3),
        th(copy.headers.diffGt3),
        th(copy.headers.undiffLe2),
        th(copy.headers.undiffGt2),
      ),
    ),
    createElement(
      'tbody',
      null,
      renderBodyRow(
        pt1aUl0,
        labelTd('pT1a (M)', 2),
        highlightSet,
        partial,
        border,
        tint,
        textSecondary,
      ),
      renderBodyRow(pt1aUl1, null, highlightSet, partial, border, tint, textSecondary),
      renderBodyRow(
        pt1bSm1,
        labelTd('pT1b1 (SM1)'),
        highlightSet,
        partial,
        border,
        tint,
        textSecondary,
      ),
      renderBodyRow(
        pt1bSm2,
        labelTd('pT1b2 (SM2)'),
        highlightSet,
        partial,
        border,
        tint,
        textSecondary,
      ),
    ),
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{copy.title}</Text>
      <Text style={[styles.subtitle, { color: textSecondary }]}>{copy.subtitle}</Text>
      <Text style={[styles.caption, { color: textSecondary }]}>{copy.caption}</Text>
      <Text style={[styles.hint, { color: textSecondary }]}>
        {complete || partial ? `${complete ? '✓ ' : '… '}${copy.tableHint}` : copy.tableHint}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tableScroll}>
        {table}
      </ScrollView>

      <Text style={[styles.footnoteStar, { color: textSecondary }]}>{copy.footnoteStar}</Text>
      <Text style={[styles.footnoteStar, { color: textSecondary }]}>{copy.footnoteEcuraB}</Text>

      <View style={styles.notes}>
        <NoteRow text={copy.notes.c1} highlighted={highlightSet.has('row-c1')} partial={partial} />
        <NoteRow text={copy.notes.c2} highlighted={highlightSet.has('row-c2')} partial={partial} />
        <NoteRow
          text={copy.notes.fig6UndiffSize}
          highlighted={highlightSet.has('row-fig6-undiff-size')}
          partial={partial}
        />
        <NoteRow
          text={copy.notes.fig6UndiffSm}
          highlighted={highlightSet.has('row-fig6-undiff-sm')}
          partial={partial}
        />
      </View>
    </View>
  );
}

const TABLE_STYLE: CSSProperties = {
  borderCollapse: 'collapse',
  tableLayout: 'fixed',
  width: 428,
  maxWidth: '100%',
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 24 },
  title: { fontSize: 16, fontWeight: '800', marginBottom: 4 },
  subtitle: { fontSize: 12, marginBottom: 4 },
  caption: { fontSize: 11, lineHeight: 16, marginBottom: 4 },
  footnoteStar: { fontSize: 12, lineHeight: 18, marginTop: 8, marginBottom: 4 },
  hint: { fontSize: 12, lineHeight: 18, marginBottom: 12 },
  tableScroll: { marginHorizontal: -4, paddingHorizontal: 4 },
  notes: { marginTop: 8, gap: 6 },
  noteRow: { borderRadius: 8, paddingVertical: 8, paddingHorizontal: 10 },
  noteText: { fontSize: 12, lineHeight: 18 },
});
