import { ScrollView, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { ESOPHAGUS_ESD_CURABILITY_TABLE } from '@/lib/i18n/esophagusEsdCurabilityTable';
import { useLocale } from '@/lib/i18n';
import type { EsophagusEsdCurabilityCellId } from '@/lib/scores/esophagus-esd-curability';

type Props = {
  highlightedCells: EsophagusEsdCurabilityCellId[];
  partial: boolean;
  complete: boolean;
};

function Cell({
  text,
  highlighted,
  partial,
  header,
  rowLabel,
}: {
  text: string;
  highlighted: boolean;
  partial: boolean;
  header?: boolean;
  rowLabel?: boolean;
}) {
  const border = useThemeColor({}, 'border');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const tint = useThemeColor({}, 'tint');
  const surface = useThemeColor({}, 'surface');
  const active = highlighted && !header && !rowLabel;

  return (
    <View
      style={[
        styles.cell,
        rowLabel ? styles.rowLabelCell : header ? styles.headerCell : styles.dataCell,
        {
          backgroundColor: active ? (partial ? `${tint}12` : `${tint}22`) : header || rowLabel ? surface : undefined,
          borderColor: active ? tint : border,
          borderWidth: active ? 2 : 1,
        },
      ]}>
      <Text
        style={[
          header || rowLabel ? styles.headerText : styles.cellText,
          { color: header || rowLabel ? textSecondary : undefined },
          active && { color: tint, fontWeight: '700' },
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

export function EsophagusEsdCurabilityTable({ highlightedCells, partial, complete }: Props) {
  const { locale } = useLocale();
  const textSecondary = useThemeColor({}, 'textSecondary');
  const copy = ESOPHAGUS_ESD_CURABILITY_TABLE[locale];
  const set = new Set(highlightedCells);
  const on = (id: EsophagusEsdCurabilityCellId) => set.has(id);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{copy.title}</Text>
      <Text style={[styles.subtitle, { color: textSecondary }]}>{copy.subtitle}</Text>
      <Text style={[styles.footnoteStar, { color: textSecondary }]}>{copy.footnoteStar}</Text>
      <Text style={[styles.hint, { color: textSecondary }]}>
        {complete || partial ? `${complete ? '✓ ' : '… '}${copy.tableHint}` : copy.tableHint}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          <View style={styles.row}>
            <Cell text={copy.headers.depth} highlighted={false} partial={partial} header />
            <Cell text={copy.headers.v0} highlighted={false} partial={partial} header />
            <Cell text={copy.headers.v1} highlighted={false} partial={partial} header />
          </View>
          <View style={styles.row}>
            <Cell text={copy.rows.epLpm.label} highlighted={false} partial={partial} rowLabel />
            <Cell text={copy.rows.epLpm.v0} highlighted={on('cell-ep-lpm-v0')} partial={partial} />
            <Cell text={copy.rows.epLpm.v1} highlighted={on('cell-ep-lpm-v1')} partial={partial} />
          </View>
          <View style={styles.row}>
            <Cell text={copy.rows.mm.label} highlighted={false} partial={partial} rowLabel />
            <Cell text={copy.rows.mm.v0} highlighted={on('cell-mm-v0')} partial={partial} />
            <Cell text={copy.rows.mm.v1} highlighted={on('cell-mm-v1')} partial={partial} />
          </View>
          <View style={styles.row}>
            <Cell text={copy.rows.sm.label} highlighted={false} partial={partial} rowLabel />
            <Cell text={copy.rows.sm.text} highlighted={on('cell-sm')} partial={partial} />
            <View style={[styles.dataCell, styles.spacer]} />
          </View>
        </View>
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
  table: { minWidth: 480, paddingHorizontal: 4 },
  row: { flexDirection: 'row' },
  cell: { justifyContent: 'center' },
  headerCell: { flex: 1, minWidth: 100, paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8, margin: 2 },
  rowLabelCell: { width: 96, paddingVertical: 12, paddingHorizontal: 8, borderRadius: 8, margin: 2 },
  dataCell: { flex: 1, minWidth: 120, paddingVertical: 12, paddingHorizontal: 8, borderRadius: 8, margin: 2 },
  spacer: { opacity: 0 },
  headerText: { fontSize: 12, fontWeight: '700', textAlign: 'center' },
  cellText: { fontSize: 13, lineHeight: 18, textAlign: 'center' },
  notes: { marginTop: 12, gap: 6 },
  noteRow: { borderRadius: 8, paddingVertical: 8, paddingHorizontal: 10 },
  noteText: { fontSize: 12, lineHeight: 18 },
});
