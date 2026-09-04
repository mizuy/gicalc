import { ScrollView, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { SeverityColors } from '@/constants/Colors';
import {
  GridCell,
  GridRow,
  GridTable,
} from '@/components/calculator/grid/FixedGrid';
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

const ROW_H = 46;
const HEADER_H = 40;

function gradeTone(grade: string): 'curative' | 'expanded' | 'nonCurative' {
  if (grade.startsWith('eCuraC')) return 'nonCurative';
  if (grade.startsWith('eCuraB')) return 'expanded';
  return 'curative';
}

function GradeCellContent({
  cell,
  highlighted,
}: {
  cell: GastricEsdCurabilityGradeCell | null;
  highlighted: boolean;
}) {
  const tint = useThemeColor({}, 'tint');

  if (!cell) return null;

  const tone = gradeTone(cell.grade);
  const toneText = {
    curative: SeverityColors.none,
    expanded: '#9A7B1A',
    nonCurative: SeverityColors.severe,
  }[tone];

  return (
    <Text
      style={[
        styles.gradeLabel,
        { color: highlighted ? tint : toneText },
        highlighted && styles.gradeLabelActive,
      ]}>
      {cell.grade}
      {cell.pattern ? ` ${cell.pattern}` : ''}
    </Text>
  );
}

function gradeCellBg(
  cell: GastricEsdCurabilityGradeCell | null,
  highlighted: boolean,
  partial: boolean,
  tint: string,
): string | undefined {
  if (!cell) return undefined;
  if (highlighted) return partial ? `${tint}14` : `${tint}24`;
  const tone = gradeTone(cell.grade);
  return {
    curative: `${SeverityColors.none}22`,
    expanded: `${SeverityColors.mild}33`,
    nonCurative: `${SeverityColors.severe}22`,
  }[tone];
}

function HeaderText({ text }: { text: string }) {
  const textSecondary = useThemeColor({}, 'textSecondary');
  return (
    <Text style={[styles.headerText, styles.headerTextBold, { color: textSecondary }]}>
      {text}
    </Text>
  );
}

function LabelText({ text }: { text: string }) {
  const textSecondary = useThemeColor({}, 'textSecondary');
  return <Text style={[styles.labelText, { color: textSecondary }]}>{text}</Text>;
}

function isHighlighted(
  highlightSet: Set<GastricEsdCurabilityCellId>,
  rowKey: GastricEsdCurabilityRowKey,
  colKeys: GastricEsdCurabilityColKey[],
): boolean {
  return colKeys.some((col) => highlightSet.has(gastricCurabilityCellId(rowKey, col)));
}

function DataGradeCell({
  cell,
  rowKey,
  colKeys,
  colSpan,
  startCol,
  highlightSet,
  partial,
  borderColor,
}: {
  cell: GastricEsdCurabilityGradeCell | null;
  rowKey: GastricEsdCurabilityRowKey;
  colKeys: GastricEsdCurabilityColKey[];
  colSpan: number;
  startCol: number;
  highlightSet: Set<GastricEsdCurabilityCellId>;
  partial: boolean;
  borderColor: string;
}) {
  const tint = useThemeColor({}, 'tint');
  const highlighted = isHighlighted(highlightSet, rowKey, colKeys);

  return (
    <GridCell
      colSpan={colSpan}
      startCol={startCol}
      highlighted={highlighted}
      highlightColor={tint}
      borderColor={borderColor}
      backgroundColor={gradeCellBg(cell, highlighted, partial, tint)}
      minHeight={ROW_H}>
      <GradeCellContent cell={cell} highlighted={highlighted} />
    </GridCell>
  );
}

function renderDataRow(
  row: GastricEsdCurabilityUnifiedRow,
  depthLabel: string,
  highlightSet: Set<GastricEsdCurabilityCellId>,
  partial: boolean,
  borderColor: string,
) {
  const rowKey = row.rowKey as GastricEsdCurabilityRowKey;

  return (
    <GridRow key={row.rowKey} borderColor={borderColor}>
      <GridCell startCol={0} borderColor={borderColor} minHeight={ROW_H}>
        <LabelText text={depthLabel} />
      </GridCell>

      <GridCell startCol={1} borderColor={borderColor} minHeight={ROW_H}>
        <LabelText text={row.ulcerLabel ?? ''} />
      </GridCell>

      {row.diffMergeSizeCols ? (
        <DataGradeCell
          cell={row.diffCells[0]}
          rowKey={rowKey}
          colKeys={[row.diffColKeys[0], row.diffColKeys[1]]}
          colSpan={2}
          startCol={2}
          highlightSet={highlightSet}
          partial={partial}
          borderColor={borderColor}
        />
      ) : (
        <>
          <DataGradeCell
            cell={row.diffCells[0]}
            rowKey={rowKey}
            colKeys={[row.diffColKeys[0]]}
            colSpan={1}
            startCol={2}
            highlightSet={highlightSet}
            partial={partial}
            borderColor={borderColor}
          />
          <DataGradeCell
            cell={row.diffCells[1]}
            rowKey={rowKey}
            colKeys={[row.diffColKeys[1]]}
            colSpan={1}
            startCol={3}
            highlightSet={highlightSet}
            partial={partial}
            borderColor={borderColor}
          />
        </>
      )}

      <DataGradeCell
        cell={row.undiffCells[0]}
        rowKey={rowKey}
        colKeys={[row.undiffColKeys[0]]}
        colSpan={1}
        startCol={4}
        highlightSet={highlightSet}
        partial={partial}
        borderColor={borderColor}
      />
      <DataGradeCell
        cell={row.undiffCells[1]}
        rowKey={rowKey}
        colKeys={[row.undiffColKeys[1]]}
        colSpan={1}
        startCol={5}
        highlightSet={highlightSet}
        partial={partial}
        borderColor={borderColor}
      />
    </GridRow>
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
  const surface = useThemeColor({}, 'surface');
  const copy = GASTRIC_ESD_CURABILITY_TABLE[locale];
  const highlightSet = new Set(highlightedCells);

  const pt1aUl0 = copy.rows.find((r) => r.rowKey === 'pt1a-ul0')!;
  const pt1aUl1 = copy.rows.find((r) => r.rowKey === 'pt1a-ul1')!;
  const pt1bSm1 = copy.rows.find((r) => r.rowKey === 'pt1b-sm1')!;
  const pt1bSm2 = copy.rows.find((r) => r.rowKey === 'pt1b-sm2')!;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{copy.title}</Text>
      <Text style={[styles.subtitle, { color: textSecondary }]}>{copy.subtitle}</Text>
      <Text style={[styles.caption, { color: textSecondary }]}>{copy.caption}</Text>
      <Text style={[styles.hint, { color: textSecondary }]}>
        {complete || partial ? `${complete ? '✓ ' : '… '}${copy.tableHint}` : copy.tableHint}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tableScroll}>
        <GridTable borderColor={border}>
          <GridRow borderColor={border}>
            <GridCell startCol={0} borderColor={border} surfaceColor={surface} header minHeight={HEADER_H}>
              <HeaderText text={copy.headers.depth} />
            </GridCell>
            <GridCell startCol={1} borderColor={border} surfaceColor={surface} header minHeight={HEADER_H}>
              <HeaderText text={copy.headers.ulcer} />
            </GridCell>
            <GridCell colSpan={2} startCol={2} borderColor={border} surfaceColor={surface} header minHeight={HEADER_H}>
              <HeaderText text={copy.headers.differentiated} />
            </GridCell>
            <GridCell colSpan={2} startCol={4} borderColor={border} surfaceColor={surface} header minHeight={HEADER_H}>
              <HeaderText text={copy.headers.undifferentiated} />
            </GridCell>
          </GridRow>

          <GridRow borderColor={border}>
            <GridCell startCol={0} borderColor={border} surfaceColor={surface} header minHeight={HEADER_H} />
            <GridCell startCol={1} borderColor={border} surfaceColor={surface} header minHeight={HEADER_H} />
            <GridCell startCol={2} borderColor={border} surfaceColor={surface} header minHeight={HEADER_H}>
              <HeaderText text={copy.headers.diffLe3} />
            </GridCell>
            <GridCell startCol={3} borderColor={border} surfaceColor={surface} header minHeight={HEADER_H}>
              <HeaderText text={copy.headers.diffGt3} />
            </GridCell>
            <GridCell startCol={4} borderColor={border} surfaceColor={surface} header minHeight={HEADER_H}>
              <HeaderText text={copy.headers.undiffLe2} />
            </GridCell>
            <GridCell startCol={5} borderColor={border} surfaceColor={surface} header minHeight={HEADER_H}>
              <HeaderText text={copy.headers.undiffGt2} />
            </GridCell>
          </GridRow>

          {renderDataRow(pt1aUl0, 'pT1a (M)', highlightSet, partial, border)}
          {renderDataRow(pt1aUl1, 'pT1a (M)', highlightSet, partial, border)}
          {renderDataRow(pt1bSm1, 'pT1b1 (SM1)', highlightSet, partial, border)}
          {renderDataRow(pt1bSm2, 'pT1b2 (SM2)', highlightSet, partial, border)}
        </GridTable>
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
    paddingHorizontal: 4,
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
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 15,
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
