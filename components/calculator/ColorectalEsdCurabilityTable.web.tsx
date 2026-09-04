import { createElement, type CSSProperties } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { HTML_TABLE_BASE, htmlTableCellStyle } from '@/components/calculator/grid/htmlTableStyles';
import { COLORECTAL_ESD_CURABILITY_TABLE } from '@/lib/i18n/colorectalEsdCurabilityTable';
import { useLocale } from '@/lib/i18n';
import type { ColorectalEsdCurabilityCellId } from '@/lib/scores/colorectal-esd-curability';

type Props = {
  highlightedCells: ColorectalEsdCurabilityCellId[];
  partial: boolean;
  complete: boolean;
};

const TABLE_WIDTH = 400;

type RowDef = { id: ColorectalEsdCurabilityCellId; label: string; text: string };

export function ColorectalEsdCurabilityTable({ highlightedCells, partial, complete }: Props) {
  const { locale } = useLocale();
  const textSecondary = useThemeColor({}, 'textSecondary');
  const border = useThemeColor({}, 'border');
  const surface = useThemeColor({}, 'surface');
  const tint = useThemeColor({}, 'tint');
  const copy = COLORECTAL_ESD_CURABILITY_TABLE[locale];
  const set = new Set(highlightedCells);
  const on = (id: ColorectalEsdCurabilityCellId) => set.has(id);

  const rows: RowDef[] = [
    { id: 'row-tis', label: copy.rows.tis.label, text: copy.rows.tis.text },
    { id: 'row-vm1', label: copy.rows.vm1.label, text: copy.rows.vm1.text },
    { id: 'crit-vm', label: copy.rows.vm.label, text: copy.rows.vm.text },
    { id: 'crit-histology', label: copy.rows.histology.label, text: copy.rows.histology.text },
    { id: 'crit-sm-depth', label: copy.rows.smDepth.label, text: copy.rows.smDepth.text },
    { id: 'crit-lyv', label: copy.rows.lyv.label, text: copy.rows.lyv.text },
    { id: 'crit-budding', label: copy.rows.budding.label, text: copy.rows.budding.text },
    { id: 'row-additional', label: copy.rows.additional.label, text: copy.rows.additional.text },
  ];

  const tableStyle: CSSProperties = { ...HTML_TABLE_BASE, width: TABLE_WIDTH };

  const table = createElement(
    'table',
    { style: tableStyle },
    createElement(
      'tbody',
      null,
      ...rows.map((row) => {
        const highlighted = on(row.id);
        const bg = highlighted ? (partial ? `${tint}10` : `${tint}18`) : undefined;
        return createElement(
          'tr',
          { key: row.id },
          createElement(
            'td',
            {
              style: {
                ...htmlTableCellStyle(border, tint, {
                  highlighted,
                  backgroundColor: bg ?? surface,
                  label: true,
                  surface,
                }),
                textAlign: 'left',
              },
            },
            createElement(
              'span',
              {
                style: {
                  color: highlighted ? tint : textSecondary,
                  fontWeight: 700,
                  fontSize: 13,
                },
              },
              row.label,
            ),
          ),
          createElement(
            'td',
            {
              style: {
                ...htmlTableCellStyle(border, tint, { highlighted, backgroundColor: bg }),
                textAlign: 'left',
              },
            },
            createElement(
              'span',
              {
                style: {
                  color: highlighted ? tint : textSecondary,
                  fontWeight: highlighted ? 600 : 400,
                  fontSize: 13,
                },
              },
              row.text,
            ),
          ),
        );
      }),
    ),
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{copy.title}</Text>
      <Text style={[styles.subtitle, { color: textSecondary }]}>{copy.subtitle}</Text>
      <Text style={[styles.footnoteStar, { color: textSecondary }]}>{copy.footnoteStar}</Text>
      <Text style={[styles.hint, { color: textSecondary }]}>
        {complete || partial ? `${complete ? '✓ ' : '… '}${copy.tableHint}` : copy.tableHint}
      </Text>

      {table}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 24 },
  title: { fontSize: 16, fontWeight: '800', marginBottom: 4 },
  subtitle: { fontSize: 12, marginBottom: 8 },
  footnoteStar: { fontSize: 12, lineHeight: 18, marginBottom: 4 },
  hint: { fontSize: 12, lineHeight: 18, marginBottom: 12 },
});
