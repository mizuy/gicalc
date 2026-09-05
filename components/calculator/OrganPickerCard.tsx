import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import type { ListNavCategory } from '@/types/score';

type Props = {
  category: ListNavCategory;
  label: string;
  count: number;
  last?: boolean;
};

export function OrganPickerCard({ category, label, count, last }: Props) {
  const tint = useThemeColor({}, 'tint');
  const border = useThemeColor({}, 'border');
  const surface = useThemeColor({}, 'surface');
  const textSecondary = useThemeColor({}, 'textSecondary');

  return (
    <Link href={`/organ/${category}`} asChild>
      <Pressable
        accessibilityRole="link"
        style={({ pressed }) => [
          styles.row,
          { backgroundColor: surface, borderColor: border, opacity: pressed ? 0.72 : 1 },
          last ? styles.rowLast : null,
        ]}>
        <View style={styles.body}>
          <Text style={[styles.label, { color: tint }]}>{label}</Text>
          <Text style={[styles.count, { color: textSecondary }]}>
            {count}
          </Text>
        </View>
        <Text style={[styles.chevron, { color: textSecondary }]}>›</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 12,
  },
  label: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  count: {
    fontSize: 14,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 24,
    fontWeight: '300',
    lineHeight: 24,
  },
});
