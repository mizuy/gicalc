import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { NAV_CATEGORY_ICONS } from '@/lib/navCategoryIcons';
import type { ListNavCategory } from '@/types/score';

type Props = {
  category: ListNavCategory;
  label: string;
  count: number;
};

export function OrganPickerCard({ category, label, count }: Props) {
  const text = useThemeColor({}, 'text');
  const textSecondary = useThemeColor({}, 'textSecondary');

  return (
    <Link href={`/organ/${category}`} asChild>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={label}
        style={({ pressed }) => [styles.tile, { opacity: pressed ? 0.82 : 1 }]}>
        <View style={styles.iconWrap}>
          <Image
            accessibilityIgnoresInvertColors
            source={NAV_CATEGORY_ICONS[category]}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
        <Text style={[styles.label, { color: text }]}>{label}</Text>
        <Text style={[styles.count, { color: textSecondary }]}>{count}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  tile: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  iconWrap: {
    width: '100%',
    aspectRatio: 1,
  },
  icon: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  count: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
