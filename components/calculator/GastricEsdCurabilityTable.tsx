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

function GradeCell({
  cell,
  highlighted,
  partial,
  style,
}: {
  cell: GastricEsdCurabilityGradeCell | null;
  highlighted: boolean;
  partial: boolean;
  style?: object;
}) {
  const border = useThemeColor({}, 'border');
  const tint = useThemeColor({}, 'tint');

  if (!cell) {
    return (
      <View
        style={[
          styles.gradeCell,
          styles.emptyCell,
          { borderColor: border },
          style,
        ]}
      />
    );
  }

  const tone = gradeTone(cell.grade);
  const toneBg = {
    curative: `${SeverityColors.none}22`,
    expanded: `${SeverityColors.mild}33`,
    nonCurative: `${SeverityColors.severe}22`,
  }[tone];
  const toneText = {
    curative: SeverityColors.none,
    expanded: '#9A7B1A',
    nonCurative: SeverityColors.severe,
  }[tone];

  return (
    <View
      style={[
        styles.gradeCell,
        {
          borderColor: highlighted ? tint : border,
          borderWidth: highlighted ? 2 : StyleSheet.hairlineWidth,
          backgroundColor: highlighted ? (partial ? `${tint}14` : `${tint}24`) : toneBg,
        },
        style,
      ]}>
      <Text
        style={[
          styles.gradeLabel,
          { color: highlighted ? tint : toneText },
          highlighted && styles.gradeLabelActive,
        ]}>
        {cell.grade}
        {cell.pattern ? ` ${cell.pattern}` : ''}
      </Text>
    </View>
  );
}

function HeaderCell({ text, style }: { text: string; style?: object }) {
  const border = useThemeColor({}, 'border');
  const surface = useThemeColor({}, 'surface');
  const textSecondary = useThemeColor({}, 'textSecondary');

  return (
    <View
      style={[
        styles.headerCell,
        { borderColor: border, backgroundColor: surface },
        style,
      ]}>
      <Text style={[styles.headerText, styles.headerTextBold, { color: textSecondary }]}>
        {text}
      </Text>
    </View>
  );
}

function LabelCell({ text, style }: { text: string; style?: object }) {
  const border = useThemeColor({}, 'border');
  const textSecondary = useThemeColor({}, 'textSecondary');

  return (
    <View style={[styles.labelCell, { borderColor: border }, style]}>
      <Text style={[styles.labelText, { color: textSecondary }]}>{text}</Text>
    </View>
  );
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

function renderDiffCells(
  row: GastricEsdCurabilityUnifiedRow,
  highlightSet: Set<GastricEsdCurabilityCellId>,
  partial: boolean,
  border: string,
) {
  const rowKey = row.rowKey as GastricEsdCurabilityRowKey;

  if (row.diffMergeSizeCols) {
    const id = gastricCurabilityCellId(rowKey, row.diffColKeys[0]);
    const highlighted =
      highlightSet.has(id) || highlightSet.has(gastricCurabilityCellId(rowKey, row.diffColKeys[1]));
    return (
      <GradeCell
        cell={row.diffCells[0]}
        highlighted={highlighted}
        partial={partial}
        style={[styles.colDiff, styles.mergedCell, { borderColor: border }]}
      />
    );
  }

  return row.diffCells.map((cell, index) => {
    const colKey = row.diffColKeys[index] as GastricEsdCurabilityColKey;
    const id = gastricCurabilityCellId(rowKey, colKey);
    return (
      <GradeCell
        key={id}
        cell={cell}
        highlighted={highlightSet.has(id)}
        partial={partial}
        style={styles.colDiffHalf}
      />
    );
  });
}

function renderUndiffCells(
  row: GastricEsdCurabilityUnifiedRow,
  highlightSet: Set<GastricEsdCurabilityCellId>,
  partial: boolean,
) {
  const rowKey = row.rowKey as GastricEsdCurabilityRowKey;

  return row.undiffCells.map((cell, index) => {
    const colKey = row.undiffColKeys[index] as GastricEsdCurabilityColKey;
    const id = gastricCurabilityCellId(rowKey, colKey);
    return (
      <GradeCell
        key={id}
        cell={cell}
        highlighted={highlightSet.has(id)}
        partial={partial}
        style={styles.colUndiffHalf}
      />
    );
  });
}

export function GastricEsdCurabilityTable({ highlightedCells, partial, complete }: Props) {
  const { locale } = useLocale();
  const textSecondary = useThemeColor({}, 'textSecondary');
  const border = useThemeColor({}, 'border');
  const copy = GASTRIC_ESD_CURABILITY_TABLE[locale];
  const highlightSet = new Set(highlightedCells);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{copy.title}</Text>
      <Text style={[styles.subtitle, { color: textSecondary }]}>{copy.subtitle}</Text>
      <Text style={[styles.caption, { color: textSecondary }]}>{copy.caption}</Text>
      {complete || partial ? (
        <Text style={[styles.hint, { color: textSecondary }]}>
          {complete ? '✓ ' : '… '}
          {copy.tableHint}
        </Text>
      ) : (
        <Text style={[styles.hint, { color: textSecondary }]}>{copy.tableHint}</Text>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tableScroll}>
        <View style={[styles.table, { borderColor: border }]}>
          <View style={styles.row}>
            <HeaderCell text={copy.headers.depth} style={styles.colDepth} />
            <HeaderCell text={copy.headers.ulcer} style={styles.colUlcer} />
            <HeaderCell text={copy.headers.differentiated} style={styles.colDiffGroup} />
            <HeaderCell text={copy.headers.undifferentiated} style={styles.colUndiffGroup} />
          </View>
          <View style={styles.row}>
            <HeaderCell text="" style={styles.colDepth} />
            <HeaderCell text="" style={styles.colUlcer} />
            <HeaderCell text={copy.headers.diffLe3} style={styles.colDiffHalf} />
            <HeaderCell text={copy.headers.diffGt3} style={styles.colDiffHalf} />
            <HeaderCell text={copy.headers.undiffLe2} style={styles.colUndiffHalf} />
            <HeaderCell text={copy.headers.undiffGt2} style={styles.colUndiffHalf} />
          </View>

          {copy.rows.map((row) => (
            <View key={row.rowKey} style={styles.row}>
              {row.depthLabel ? (
                <LabelCell text={row.depthLabel} style={styles.colDepth} />
              ) : (
                <View style={[styles.colDepth, styles.spacerCell, { borderColor: border }]} />
              )}
              <LabelCell text={row.ulcerLabel ?? ''} style={styles.colUlcer} />
              {renderDiffCells(row, highlightSet, partial, border)}
              {renderUndiffCells(row, highlightSet, partial)}
            </View>
          ))}
        </View>
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

const COL_DEPTH = 72;
const COL_ULCER = 44;
const COL_DIFF_HALF = 72;
const COL_UNDIFF_HALF = 72;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 4,
  },
  caption: {
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 4,
  },
  footnoteStar: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
    marginBottom: 4,
  },
  hint: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  tableScroll: {
    marginHorizontal: -4,
  },
  table: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    minWidth: 480,
    marginHorizontal: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  colDepth: {
    width: COL_DEPTH,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  colUlcer: {
    width: COL_ULCER,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  colDiffGroup: {
    width: COL_DIFF_HALF * 2,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  colUndiffGroup: {
    width: COL_UNDIFF_HALF * 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  colDiff: {
    width: COL_DIFF_HALF * 2,
  },
  colDiffHalf: {
    width: COL_DIFF_HALF,
  },
  colUndiffHalf: {
    width: COL_UNDIFF_HALF,
  },
  mergedCell: {
    flex: 0,
    width: COL_DIFF_HALF * 2,
  },
  spacerCell: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerCell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    minHeight: 40,
  },
  headerText: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 15,
  },
  headerTextBold: {
    fontWeight: '700',
  },
  labelCell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  labelText: {
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 15,
  },
  gradeCell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    minHeight: 44,
  },
  emptyCell: {
    backgroundColor: 'transparent',
  },
  gradeLabel: {
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 16,
  },
  gradeLabelActive: {
    fontWeight: '900',
  },
  notes: {
    marginTop: 8,
    gap: 6,
  },
  noteRow: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  noteText: {
    fontSize: 12,
    lineHeight: 18,
  },
});
