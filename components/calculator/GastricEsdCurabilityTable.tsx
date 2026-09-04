import { ScrollView, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { SeverityColors } from '@/constants/Colors';
import {
  GASTRIC_ESD_CURABILITY_TABLE,
  type GastricEsdCurabilityGradeCell,
  type GastricEsdCurabilityTableSection,
} from '@/lib/i18n/gastricEsdCurabilityTable';
import { useLocale } from '@/lib/i18n';
import {
  gastricCurabilityCellId,
  type GastricEsdCurabilityCellId,
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
}: {
  cell: GastricEsdCurabilityGradeCell;
  highlighted: boolean;
  partial: boolean;
}) {
  const border = useThemeColor({}, 'border');
  const tint = useThemeColor({}, 'tint');
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

function LabelCell({
  text,
  header,
  style,
}: {
  text: string;
  header?: boolean;
  style?: object;
}) {
  const border = useThemeColor({}, 'border');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const surface = useThemeColor({}, 'surface');

  return (
    <View
      style={[
        styles.labelCell,
        header && styles.headerCell,
        {
          borderColor: border,
          backgroundColor: header ? surface : undefined,
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

function HistologyTable({
  section,
  highlightSet,
  partial,
  border,
  textSecondary,
  depthUlHeader,
}: {
  section: GastricEsdCurabilityTableSection;
  highlightSet: Set<GastricEsdCurabilityCellId>;
  partial: boolean;
  border: string;
  textSecondary: string;
  depthUlHeader: string;
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: textSecondary }]}>{section.title}</Text>
      <View style={[styles.table, { borderColor: border }]}>
        <View style={styles.row}>
          <View style={[styles.colDepthUl, styles.headerCell, { borderColor: border }]}>
            <Text style={[styles.headerText, styles.headerTextBold, { color: textSecondary }]}>
              {depthUlHeader}
            </Text>
          </View>
          {section.sizeHeaders.map((header) => (
            <LabelCell key={header} text={header} header style={styles.colSize} />
          ))}
        </View>

        {section.rows.map((row) => (
          <View key={row.baseKey} style={styles.row}>
            <LabelCell text={row.depthUl} style={styles.colDepthUl} />
            {row.cells.map((cell, sizeIndex) => {
              const id = gastricCurabilityCellId(
                `${section.prefix}-${row.baseKey}` as Parameters<typeof gastricCurabilityCellId>[0],
                sizeIndex as 0 | 1 | 2,
              );
              return (
                <GradeCell
                  key={id}
                  cell={cell}
                  highlighted={highlightSet.has(id)}
                  partial={partial}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
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
        <View style={styles.tablesStack}>
          {copy.sections.map((section) => (
            <HistologyTable
              key={section.prefix}
              section={section}
              highlightSet={highlightSet}
              partial={partial}
              border={border}
              textSecondary={textSecondary}
              depthUlHeader={copy.headers.depthUlceration}
            />
          ))}
        </View>
      </ScrollView>

      <Text style={[styles.footnoteStar, { color: textSecondary }]}>{copy.footnoteStar}</Text>

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

const COL_DEPTH_UL = 88;

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
  tablesStack: {
    gap: 16,
    paddingHorizontal: 4,
    minWidth: 420,
  },
  section: {
    gap: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  table: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  colDepthUl: {
    width: COL_DEPTH_UL,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  colSize: {
    flex: 1,
    minWidth: 88,
  },
  labelCell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerCell: {
    minHeight: 44,
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
    lineHeight: 16,
  },
  gradeCell: {
    flex: 1,
    minWidth: 88,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  gradeLabel: {
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
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
