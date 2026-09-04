import { StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { GridCell, GridRow, GridTable, tableWidth } from '@/components/calculator/grid/FixedGrid';
import { COLORECTAL_ESD_CURABILITY_TABLE } from '@/lib/i18n/colorectalEsdCurabilityTable';
import { useLocale } from '@/lib/i18n';
import type { ColorectalEsdCurabilityCellId } from '@/lib/scores/colorectal-esd-curability';

type Props = {
  highlightedCells: ColorectalEsdCurabilityCellId[];
  partial: boolean;
  complete: boolean;
};

const COLORECTAL_COL_WIDTHS = [120, 280] as const;
const COLORECTAL_TABLE_W = tableWidth(COLORECTAL_COL_WIDTHS);
const ROW_H = 48;

type RowDef = { id: ColorectalEsdCurabilityCellId; label: string; text: string };

function CriterionRow({
  label,
  text,
  highlighted,
  partial,
  borderColor,
  surface,
}: {
  label: string;
  text: string;
  highlighted: boolean;
  partial: boolean;
  borderColor: string;
  surface: string;
}) {
  const textSecondary = useThemeColor({}, 'textSecondary');
  const tint = useThemeColor({}, 'tint');

  return (
    <GridRow borderColor={borderColor} width={COLORECTAL_TABLE_W}>
      <GridCell
        columnWidths={COLORECTAL_COL_WIDTHS}
        startCol={0}
        borderColor={borderColor}
        surfaceColor={surface}
        highlighted={highlighted}
        highlightColor={tint}
        backgroundColor={highlighted ? (partial ? `${tint}10` : `${tint}18`) : surface}
        minHeight={ROW_H}>
        <Text
          style={[
            styles.label,
            { color: highlighted ? tint : textSecondary },
            highlighted && { fontWeight: '700' },
          ]}>
          {label}
        </Text>
      </GridCell>
      <GridCell
        columnWidths={COLORECTAL_COL_WIDTHS}
        startCol={1}
        borderColor={borderColor}
        highlighted={highlighted}
        highlightColor={tint}
        backgroundColor={highlighted ? (partial ? `${tint}10` : `${tint}18`) : undefined}
        minHeight={ROW_H}>
        <Text
          style={[
            styles.text,
            { color: textSecondary },
            highlighted && { color: tint, fontWeight: '600' },
          ]}>
          {text}
        </Text>
      </GridCell>
    </GridRow>
  );
}

export function ColorectalEsdCurabilityTable({ highlightedCells, partial, complete }: Props) {
  const { locale } = useLocale();
  const textSecondary = useThemeColor({}, 'textSecondary');
  const border = useThemeColor({}, 'border');
  const surface = useThemeColor({}, 'surface');
  const copy = COLORECTAL_ESD_CURABILITY_TABLE[locale];
  const set = new Set(highlightedCells);
  const on = (id: ColorectalEsdCurabilityCellId) => set.has(id);

  const rows: RowDef[] = [
    { id: 'row-tis', label: copy.rows.tis.label, text: copy.rows.tis.text },
    { id: 'row-vm1', label: copy.rows.vm1.label, text: copy.rows.vm1.text },
    { id: 'row-hm1', label: copy.rows.hm1.label, text: copy.rows.hm1.text },
    { id: 'crit-vm', label: copy.rows.vm.label, text: copy.rows.vm.text },
    { id: 'crit-hm', label: copy.rows.hm.label, text: copy.rows.hm.text },
    { id: 'crit-histology', label: copy.rows.histology.label, text: copy.rows.histology.text },
    { id: 'crit-sm-depth', label: copy.rows.smDepth.label, text: copy.rows.smDepth.text },
    { id: 'crit-ly', label: copy.rows.ly.label, text: copy.rows.ly.text },
    { id: 'crit-v', label: copy.rows.v.label, text: copy.rows.v.text },
    { id: 'crit-budding', label: copy.rows.budding.label, text: copy.rows.budding.text },
    { id: 'row-additional', label: copy.rows.additional.label, text: copy.rows.additional.text },
  ];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{copy.title}</Text>
      <Text style={[styles.subtitle, { color: textSecondary }]}>{copy.subtitle}</Text>
      <Text style={[styles.footnoteStar, { color: textSecondary }]}>{copy.footnoteStar}</Text>
      <Text style={[styles.hint, { color: textSecondary }]}>
        {complete || partial ? `${complete ? '✓ ' : '… '}${copy.tableHint}` : copy.tableHint}
      </Text>

      <GridTable borderColor={border} width={COLORECTAL_TABLE_W}>
        {rows.map((row) => (
          <CriterionRow
            key={row.id}
            label={row.label}
            text={row.text}
            highlighted={on(row.id)}
            partial={partial}
            borderColor={border}
            surface={surface}
          />
        ))}
      </GridTable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 24 },
  title: { fontSize: 16, fontWeight: '800', marginBottom: 4 },
  subtitle: { fontSize: 12, marginBottom: 8 },
  footnoteStar: { fontSize: 12, lineHeight: 18, marginBottom: 4 },
  hint: { fontSize: 12, lineHeight: 18, marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '700', textAlign: 'left', lineHeight: 18 },
  text: { fontSize: 13, lineHeight: 18, textAlign: 'left' },
});
