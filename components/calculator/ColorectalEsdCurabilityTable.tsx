import { StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { COLORECTAL_ESD_CURABILITY_TABLE } from '@/lib/i18n/colorectalEsdCurabilityTable';
import { useLocale } from '@/lib/i18n';
import type { ColorectalEsdCurabilityCellId } from '@/lib/scores/colorectal-esd-curability';

type Props = {
  highlightedCells: ColorectalEsdCurabilityCellId[];
  partial: boolean;
  complete: boolean;
};

function CriterionRow({
  label,
  text,
  highlighted,
  partial,
}: {
  label: string;
  text: string;
  highlighted: boolean;
  partial: boolean;
}) {
  const border = useThemeColor({}, 'border');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const tint = useThemeColor({}, 'tint');
  const surface = useThemeColor({}, 'surface');

  return (
    <View
      style={[
        styles.row,
        {
          borderColor: highlighted ? tint : border,
          borderWidth: highlighted ? 2 : 1,
          backgroundColor: highlighted ? (partial ? `${tint}10` : `${tint}18`) : surface,
        },
      ]}>
      <Text style={[styles.label, highlighted && { color: tint, fontWeight: '700' }]}>{label}</Text>
      <Text style={[styles.text, { color: textSecondary }, highlighted && { color: tint, fontWeight: '600' }]}>
        {text}
      </Text>
    </View>
  );
}

export function ColorectalEsdCurabilityTable({ highlightedCells, partial, complete }: Props) {
  const { locale } = useLocale();
  const textSecondary = useThemeColor({}, 'textSecondary');
  const copy = COLORECTAL_ESD_CURABILITY_TABLE[locale];
  const set = new Set(highlightedCells);
  const on = (id: ColorectalEsdCurabilityCellId) => set.has(id);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{copy.title}</Text>
      <Text style={[styles.subtitle, { color: textSecondary }]}>{copy.subtitle}</Text>
      <Text style={[styles.footnoteStar, { color: textSecondary }]}>{copy.footnoteStar}</Text>
      <Text style={[styles.hint, { color: textSecondary }]}>
        {complete || partial ? `${complete ? '✓ ' : '… '}${copy.tableHint}` : copy.tableHint}
      </Text>

      <View style={styles.table}>
        <CriterionRow
          label={copy.rows.tis.label}
          text={copy.rows.tis.text}
          highlighted={on('row-tis')}
          partial={partial}
        />
        <CriterionRow
          label={copy.rows.vm1.label}
          text={copy.rows.vm1.text}
          highlighted={on('row-vm1')}
          partial={partial}
        />
        <CriterionRow
          label={copy.rows.vm.label}
          text={copy.rows.vm.text}
          highlighted={on('crit-vm')}
          partial={partial}
        />
        <CriterionRow
          label={copy.rows.histology.label}
          text={copy.rows.histology.text}
          highlighted={on('crit-histology')}
          partial={partial}
        />
        <CriterionRow
          label={copy.rows.smDepth.label}
          text={copy.rows.smDepth.text}
          highlighted={on('crit-sm-depth')}
          partial={partial}
        />
        <CriterionRow
          label={copy.rows.lyv.label}
          text={copy.rows.lyv.text}
          highlighted={on('crit-lyv')}
          partial={partial}
        />
        <CriterionRow
          label={copy.rows.budding.label}
          text={copy.rows.budding.text}
          highlighted={on('crit-budding')}
          partial={partial}
        />
        <CriterionRow
          label={copy.rows.additional.label}
          text={copy.rows.additional.text}
          highlighted={on('row-additional')}
          partial={partial}
        />
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
  table: { gap: 6 },
  row: { borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12, gap: 4 },
  label: { fontSize: 14, fontWeight: '700' },
  text: { fontSize: 13, lineHeight: 18 },
});
