import { ScrollView, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { GridCell, GridRow, GridTable, tableWidth } from '@/components/calculator/grid/FixedGrid';
import { ESOPHAGUS_ESD_CURABILITY_TABLE } from '@/lib/i18n/esophagusEsdCurabilityTable';
import { useLocale } from '@/lib/i18n';
import type { EsophagusEsdCurabilityCellId } from '@/lib/scores/esophagus-esd-curability';

type Props = {
  highlightedCells: EsophagusEsdCurabilityCellId[];
  partial: boolean;
  complete: boolean;
};

const ESOPHAGUS_COL_WIDTHS = [100, 150, 150] as const;
const ESOPHAGUS_TABLE_W = tableWidth(ESOPHAGUS_COL_WIDTHS);
const ROW_H = 52;
const HEADER_H = 40;

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

function DataCell({
  text,
  highlighted,
  partial,
  colSpan,
  startCol,
  borderColor,
}: {
  text: string;
  highlighted: boolean;
  partial: boolean;
  colSpan: number;
  startCol: number;
  borderColor: string;
}) {
  const tint = useThemeColor({}, 'tint');
  const textSecondary = useThemeColor({}, 'textSecondary');

  return (
    <GridCell
      columnWidths={ESOPHAGUS_COL_WIDTHS}
      colSpan={colSpan}
      startCol={startCol}
      highlighted={highlighted}
      highlightColor={tint}
      borderColor={borderColor}
      backgroundColor={highlighted ? (partial ? `${tint}12` : `${tint}22`) : undefined}
      minHeight={ROW_H}>
      <Text
        style={[
          styles.cellText,
          { color: highlighted ? tint : textSecondary },
          highlighted && styles.cellTextActive,
        ]}>
        {text}
      </Text>
    </GridCell>
  );
}

export function EsophagusEsdCurabilityTable({ highlightedCells, partial, complete }: Props) {
  const { locale } = useLocale();
  const textSecondary = useThemeColor({}, 'textSecondary');
  const border = useThemeColor({}, 'border');
  const surface = useThemeColor({}, 'surface');
  const copy = ESOPHAGUS_ESD_CURABILITY_TABLE[locale];
  const set = new Set(highlightedCells);
  const on = (id: EsophagusEsdCurabilityCellId) => set.has(id);

  const labelCell = (text: string) => (
    <GridCell
      columnWidths={ESOPHAGUS_COL_WIDTHS}
      startCol={0}
      borderColor={border}
      surfaceColor={surface}
      minHeight={ROW_H}>
      <Text style={[styles.labelText, { color: textSecondary }]}>{text}</Text>
    </GridCell>
  );

  const headerCell = (text: string, startCol: number) => (
    <GridCell
      columnWidths={ESOPHAGUS_COL_WIDTHS}
      startCol={startCol}
      borderColor={border}
      surfaceColor={surface}
      header
      minHeight={HEADER_H}>
      <Text style={[styles.headerText, { color: textSecondary }]}>{text}</Text>
    </GridCell>
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{copy.title}</Text>
      <Text style={[styles.subtitle, { color: textSecondary }]}>{copy.subtitle}</Text>
      <Text style={[styles.footnoteStar, { color: textSecondary }]}>{copy.footnoteStar}</Text>
      <Text style={[styles.hint, { color: textSecondary }]}>
        {complete || partial ? `${complete ? '✓ ' : '… '}${copy.tableHint}` : copy.tableHint}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tableScroll}>
        <GridTable borderColor={border} width={ESOPHAGUS_TABLE_W}>
          <GridRow borderColor={border} width={ESOPHAGUS_TABLE_W}>
            {headerCell(copy.headers.depth, 0)}
            {headerCell(copy.headers.v0, 1)}
            {headerCell(copy.headers.v1, 2)}
          </GridRow>

          <GridRow borderColor={border} width={ESOPHAGUS_TABLE_W}>
            {labelCell(copy.rows.epLpm.label)}
            <DataCell
              text={copy.rows.epLpm.v0}
              highlighted={on('cell-ep-lpm-v0')}
              partial={partial}
              colSpan={1}
              startCol={1}
              borderColor={border}
            />
            <DataCell
              text={copy.rows.epLpm.v1}
              highlighted={on('cell-ep-lpm-v1')}
              partial={partial}
              colSpan={1}
              startCol={2}
              borderColor={border}
            />
          </GridRow>

          <GridRow borderColor={border} width={ESOPHAGUS_TABLE_W}>
            {labelCell(copy.rows.mm.label)}
            <DataCell
              text={copy.rows.mm.v0}
              highlighted={on('cell-mm-v0')}
              partial={partial}
              colSpan={1}
              startCol={1}
              borderColor={border}
            />
            <DataCell
              text={copy.rows.mm.v1}
              highlighted={on('cell-mm-v1')}
              partial={partial}
              colSpan={1}
              startCol={2}
              borderColor={border}
            />
          </GridRow>

          <GridRow borderColor={border} width={ESOPHAGUS_TABLE_W}>
            {labelCell(copy.rows.sm.label)}
            <DataCell
              text={copy.rows.sm.text}
              highlighted={on('cell-sm')}
              partial={partial}
              colSpan={2}
              startCol={1}
              borderColor={border}
            />
          </GridRow>
        </GridTable>
      </ScrollView>

      <View style={styles.notes}>
        <NoteRow text={copy.notes.margin} highlighted={on('row-margin')} partial={partial} />
        <NoteRow text={copy.notes.jcog} highlighted={on('row-jcog')} partial={partial} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 24 },
  title: { fontSize: 16, fontWeight: '800', marginBottom: 4 },
  subtitle: { fontSize: 12, marginBottom: 8 },
  footnoteStar: { fontSize: 12, lineHeight: 18, marginBottom: 4 },
  hint: { fontSize: 12, lineHeight: 18, marginBottom: 12 },
  tableScroll: { marginHorizontal: -4, paddingHorizontal: 4 },
  headerText: { fontSize: 12, fontWeight: '700', textAlign: 'center' },
  labelText: { fontSize: 12, fontWeight: '600', textAlign: 'center' },
  cellText: { fontSize: 12, lineHeight: 17, textAlign: 'center' },
  cellTextActive: { fontWeight: '700' },
  notes: { marginTop: 12, gap: 6 },
  noteRow: { borderRadius: 8, paddingVertical: 8, paddingHorizontal: 10 },
  noteText: { fontSize: 12, lineHeight: 18 },
});
