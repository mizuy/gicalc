import { createElement, type CSSProperties } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { HTML_TABLE_BASE, htmlTableCellStyle } from '@/components/calculator/grid/htmlTableStyles';
import { ESOPHAGUS_ESD_CURABILITY_TABLE } from '@/lib/i18n/esophagusEsdCurabilityTable';
import { useLocale } from '@/lib/i18n';
import type { EsophagusEsdCurabilityCellId } from '@/lib/scores/esophagus-esd-curability';

type Props = {
  highlightedCells: EsophagusEsdCurabilityCellId[];
  partial: boolean;
  complete: boolean;
};

const TABLE_WIDTH = 400;

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
  const border = useThemeColor({}, 'border');
  const surface = useThemeColor({}, 'surface');
  const tint = useThemeColor({}, 'tint');
  const copy = ESOPHAGUS_ESD_CURABILITY_TABLE[locale];
  const set = new Set(highlightedCells);
  const on = (id: EsophagusEsdCurabilityCellId) => set.has(id);

  const th = (text: string) =>
    createElement(
      'th',
      {
        style: htmlTableCellStyle(border, tint, { label: true, surface }),
      },
      createElement('span', { style: { color: textSecondary, fontWeight: 700 } }, text),
    );

  const labelTd = (text: string) =>
    createElement(
      'td',
      { style: htmlTableCellStyle(border, tint, { label: true, surface }) },
      createElement('span', { style: { color: textSecondary, fontWeight: 600 } }, text),
    );

  const dataTd = (text: string, highlighted: boolean, colSpan?: number) =>
    createElement(
      'td',
      {
        colSpan,
        style: htmlTableCellStyle(border, tint, {
          highlighted,
          backgroundColor: highlighted ? (partial ? `${tint}12` : `${tint}22`) : undefined,
        }),
      },
      createElement(
        'span',
        {
          style: {
            color: highlighted ? tint : textSecondary,
            fontWeight: highlighted ? 700 : 400,
            fontSize: 12,
          },
        },
        text,
      ),
    );

  const tableStyle: CSSProperties = { ...HTML_TABLE_BASE, width: TABLE_WIDTH };

  const table = createElement(
    'table',
    { style: tableStyle },
    createElement(
      'thead',
      null,
      createElement('tr', null, th(copy.headers.depth), th(copy.headers.v0), th(copy.headers.v1)),
    ),
    createElement(
      'tbody',
      null,
      createElement(
        'tr',
        null,
        labelTd(copy.rows.epLpm.label),
        dataTd(copy.rows.epLpm.v0, on('cell-ep-lpm-v0')),
        dataTd(copy.rows.epLpm.v1, on('cell-ep-lpm-v1')),
      ),
      createElement(
        'tr',
        null,
        labelTd(copy.rows.mm.label),
        dataTd(copy.rows.mm.v0, on('cell-mm-v0')),
        dataTd(copy.rows.mm.v1, on('cell-mm-v1')),
      ),
      createElement(
        'tr',
        null,
        labelTd(copy.rows.sm.label),
        dataTd(copy.rows.sm.text, on('cell-sm'), 2),
      ),
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tableScroll}>
        {table}
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
  notes: { marginTop: 12, gap: 6 },
  noteRow: { borderRadius: 8, paddingVertical: 8, paddingHorizontal: 10 },
  noteText: { fontSize: 12, lineHeight: 18 },
});
