import { ScrollView, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { SeverityColors } from '@/constants/Colors';
import { GASTRIC_ESD_CURABILITY_TABLE } from '@/lib/i18n/gastricEsdCurabilityTable';
import type { GastricEsdCurabilityGradeCell } from '@/lib/i18n/gastricEsdCurabilityTable';
import { useLocale } from '@/lib/i18n';
import type { GastricEsdCurabilityCellId } from '@/lib/scores/gastric-esd-curability';

type Props = {
  highlightedCells: GastricEsdCurabilityCellId[];
  partial: boolean;
  complete: boolean;
};

type DataCellId =
  | 'cell-diff-pt1a-ul0'
  | 'cell-undiff-pt1a-ul0'
  | 'cell-diff-pt1a-ul1'
  | 'cell-undiff-pt1a-ul1'
  | 'cell-diff-pt1b-sm1'
  | 'cell-undiff-pt1b-sm1';

function gradeTone(grade: string): 'curative' | 'expanded' | 'nonCurative' {
  if (grade.startsWith('eCuraC')) return 'nonCurative';
  if (grade.startsWith('eCuraB')) return 'expanded';
  return 'curative';
}

function GradeCell({
  cell,
  highlighted,
  partial,
}: {
  cell: GastricEsdCurabilityGradeCell;
  highlighted: boolean;
  partial: boolean;
}) {
  const border = useThemeColor({}, 'border');
  const tint = useThemeColor({}, 'tint');
  const textSecondary = useThemeColor({}, 'textSecondary');
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
          backgroundColor: highlighted
            ? partial
              ? `${tint}14`
              : `${tint}24`
            : toneBg,
        },
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
      {cell.size ? (
        <Text style={[styles.gradeSize, { color: highlighted ? tint : textSecondary }]}>
          {cell.size}
        </Text>
      ) : null}
    </View>
  );
}

function LabelCell({
  text,
  header,
  rowSpan,
  style,
}: {
  text: string;
  header?: boolean;
  rowSpan?: boolean;
  style?: object;
}) {
  const border = useThemeColor({}, 'border');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const surface = useThemeColor({}, 'surface');

  return (
    <View
      style={[
        styles.labelCell,
        rowSpan && styles.labelCellRowSpan,
        header && styles.headerCell,
        {
          borderColor: border,
          backgroundColor: header || rowSpan ? surface : undefined,
        },
        style,
      ]}>
      <Text
        style={[
          header ? styles.headerText : styles.labelText,
          { color: textSecondary },
          header && styles.headerTextBold,
        ]}>
        {text}
      </Text>
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

export function GastricEsdCurabilityTable({ highlightedCells, partial, complete }: Props) {
  const { locale } = useLocale();
  const textSecondary = useThemeColor({}, 'textSecondary');
  const border = useThemeColor({}, 'border');
  const copy = GASTRIC_ESD_CURABILITY_TABLE[locale];
  const highlightSet = new Set(highlightedCells);
  const on = (id: DataCellId) => highlightSet.has(id);

  const renderGrade = (id: DataCellId) => (
    <GradeCell cell={copy.cells[id]} highlighted={on(id)} partial={partial} />
  );

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
          {/* Header row */}
          <View style={styles.row}>
            <View style={[styles.colDepthUlMerged, styles.headerCell, { borderColor: border }]}>
              <Text style={[styles.headerText, styles.headerTextBold, { color: textSecondary }]}>
                {copy.headers.depthUlceration}
              </Text>
            </View>
            <LabelCell text={copy.headers.differentiated} header style={styles.colGrade} />
            <LabelCell text={copy.headers.undifferentiated} header style={styles.colGrade} />
          </View>

          {/* pT1a UL0 */}
          <View style={styles.row}>
            <LabelCell text={copy.depth.pt1a} rowSpan style={styles.colDepth} />
            <LabelCell text={copy.ulceration.ul0} style={styles.colUl} />
            {renderGrade('cell-diff-pt1a-ul0')}
            {renderGrade('cell-undiff-pt1a-ul0')}
          </View>

          {/* pT1a UL1 */}
          <View style={styles.row}>
            <View style={[styles.colDepth, styles.mergedSpacer, { borderColor: border }]} />
            <LabelCell text={copy.ulceration.ul1} style={styles.colUl} />
            {renderGrade('cell-diff-pt1a-ul1')}
            {renderGrade('cell-undiff-pt1a-ul1')}
          </View>

          {/* pT1b SM1 — UL column merged into depth label area */}
          <View style={styles.row}>
            <View style={[styles.colDepthUlMerged, { borderColor: border }]}>
              <Text style={[styles.labelText, { color: textSecondary, fontWeight: '700' }]}>
                {copy.depth.pt1b}
              </Text>
            </View>
            {renderGrade('cell-diff-pt1b-sm1')}
            {renderGrade('cell-undiff-pt1b-sm1')}
          </View>
        </View>
      </ScrollView>

      <Text style={[styles.footnoteStar, { color: textSecondary }]}>{copy.footnoteStar}</Text>

      <View style={styles.notes}>
        <NoteRow
          text={copy.notes.c1}
          highlighted={highlightSet.has('row-c1')}
          partial={partial}
        />
        <NoteRow
          text={copy.notes.c2}
          highlighted={highlightSet.has('row-c2')}
          partial={partial}
        />
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
const COL_UL = 44;

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
    minWidth: 480,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  colDepth: {
    width: COL_DEPTH,
  },
  colUl: {
    width: COL_UL,
  },
  colGrade: {
    flex: 1,
    minWidth: 120,
  },
  colDepthUlMerged: {
    width: COL_DEPTH + COL_UL,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 6,
  },
  mergedSpacer: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  labelCell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  labelCellRowSpan: {
    minHeight: 88,
  },
  headerCell: {
    minHeight: 52,
  },
  headerText: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 15,
  },
  headerTextBold: {
    fontWeight: '700',
  },
  labelText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  gradeCell: {
    flex: 1,
    minWidth: 120,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  gradeLabel: {
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },
  gradeLabelActive: {
    fontWeight: '900',
  },
  gradeSize: {
    fontSize: 11,
    marginTop: 2,
    textAlign: 'center',
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
