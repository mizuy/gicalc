import { ScrollView, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { GASTRIC_ESD_CURABILITY_TABLE } from '@/lib/i18n/gastricEsdCurabilityTable';
import { useLocale } from '@/lib/i18n';
import type { GastricEsdCurabilityCellId } from '@/lib/scores/gastric-esd-curability';

type Props = {
  highlightedCells: GastricEsdCurabilityCellId[];
  partial: boolean;
  complete: boolean;
};

type CellProps = {
  text: string;
  highlighted: boolean;
  partial: boolean;
  header?: boolean;
  rowLabel?: boolean;
};

function TableCell({ text, highlighted, partial, header, rowLabel }: CellProps) {
  const border = useThemeColor({}, 'border');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const tint = useThemeColor({}, 'tint');
  const surface = useThemeColor({}, 'surface');

  const active = highlighted && !header && !rowLabel;
  const bg = active ? (partial ? `${tint}12` : `${tint}22`) : header || rowLabel ? surface : undefined;
  const borderColor = active ? tint : border;
  const borderWidth = active ? 2 : 1;

  return (
    <View
      style={[
        styles.cell,
        rowLabel ? styles.rowLabelCell : header ? styles.headerCell : styles.dataCell,
        {
          backgroundColor: bg,
          borderColor,
          borderWidth,
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
  id,
  text,
  highlighted,
  partial,
}: {
  id: GastricEsdCurabilityCellId;
  text: string;
  highlighted: boolean;
  partial: boolean;
}) {
  const border = useThemeColor({}, 'border');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const tint = useThemeColor({}, 'tint');
  const active = highlighted;

  return (
    <View
      nativeID={id}
      style={[
        styles.noteRow,
        {
          borderColor: active ? tint : border,
          borderWidth: active ? 2 : 1,
          backgroundColor: active ? (partial ? `${tint}10` : `${tint}18`) : undefined,
        },
      ]}>
      <Text
        style={[
          styles.noteText,
          { color: textSecondary },
          active && { color: tint, fontWeight: '600' },
        ]}>
        {text}
      </Text>
    </View>
  );
}

export function GastricEsdCurabilityTable({ highlightedCells, partial, complete }: Props) {
  const { locale } = useLocale();
  const textSecondary = useThemeColor({}, 'textSecondary');
  const copy = GASTRIC_ESD_CURABILITY_TABLE[locale];
  const highlightSet = new Set(highlightedCells);
  const isHighlighted = (id: GastricEsdCurabilityCellId) => highlightSet.has(id);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{copy.title}</Text>
      <Text style={[styles.subtitle, { color: textSecondary }]}>{copy.subtitle}</Text>
      <Text style={[styles.footnoteStar, { color: textSecondary }]}>{copy.footnoteStar}</Text>
      {complete || partial ? (
        <Text style={[styles.hint, { color: textSecondary }]}>
          {complete ? '✓ ' : '… '}
          {copy.tableHint}
        </Text>
      ) : (
        <Text style={[styles.hint, { color: textSecondary }]}>{copy.tableHint}</Text>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tableScroll}>
        <View style={styles.table}>
          <View style={styles.row}>
            <TableCell
              text={copy.headers.histology}
              highlighted={false}
              partial={partial}
              header
            />
            <TableCell
              text={copy.headers.pt1aUl0}
              highlighted={false}
              partial={partial}
              header
            />
            <TableCell
              text={copy.headers.pt1aUl1}
              highlighted={false}
              partial={partial}
              header
            />
            <TableCell
              text={copy.headers.pt1bSm1}
              highlighted={false}
              partial={partial}
              header
            />
          </View>

          <View style={styles.row}>
            <TableCell
              text={copy.rows.diff.label}
              highlighted={false}
              partial={partial}
              rowLabel
            />
            <TableCell
              text={copy.rows.diff.pt1aUl0}
              highlighted={isHighlighted('cell-diff-pt1a-ul0')}
              partial={partial}
            />
            <TableCell
              text={copy.rows.diff.pt1aUl1}
              highlighted={isHighlighted('cell-diff-pt1a-ul1')}
              partial={partial}
            />
            <TableCell
              text={copy.rows.diff.pt1bSm1}
              highlighted={isHighlighted('cell-diff-pt1b-sm1')}
              partial={partial}
            />
          </View>

          <View style={styles.row}>
            <TableCell
              text={copy.rows.undiff.label}
              highlighted={false}
              partial={partial}
              rowLabel
            />
            <TableCell
              text={copy.rows.undiff.pt1aUl0}
              highlighted={isHighlighted('cell-undiff-pt1a-ul0')}
              partial={partial}
            />
            <TableCell
              text={copy.rows.undiff.pt1aUl1}
              highlighted={isHighlighted('cell-undiff-pt1a-ul1')}
              partial={partial}
            />
            <TableCell
              text={copy.rows.undiff.pt1bSm1}
              highlighted={isHighlighted('cell-undiff-pt1b-sm1')}
              partial={partial}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.notes}>
        <NoteRow
          id="row-c1"
          text={copy.notes.c1}
          highlighted={isHighlighted('row-c1')}
          partial={partial}
        />
        <NoteRow
          id="row-c2"
          text={copy.notes.c2}
          highlighted={isHighlighted('row-c2')}
          partial={partial}
        />
        <NoteRow
          id="row-fig6-undiff-size"
          text={copy.notes.fig6UndiffSize}
          highlighted={isHighlighted('row-fig6-undiff-size')}
          partial={partial}
        />
        <NoteRow
          id="row-fig6-undiff-sm"
          text={copy.notes.fig6UndiffSm}
          highlighted={isHighlighted('row-fig6-undiff-sm')}
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
    marginBottom: 8,
  },
  footnoteStar: {
    fontSize: 12,
    lineHeight: 18,
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
    minWidth: 520,
    paddingHorizontal: 4,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    justifyContent: 'center',
  },
  headerCell: {
    flex: 1,
    minWidth: 100,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    margin: 2,
  },
  rowLabelCell: {
    width: 108,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    margin: 2,
  },
  dataCell: {
    flex: 1,
    minWidth: 100,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    margin: 2,
  },
  headerText: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  cellText: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },
  notes: {
    marginTop: 12,
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
