import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import type { ScoreDefinition } from '@/types/score';

type Props = {
  score: ScoreDefinition;
};

export function ScoreListItem({ score }: Props) {
  const tint = useThemeColor({}, 'tint');
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const textSecondary = useThemeColor({}, 'textSecondary');

  return (
    <Link href={`/score/${score.id}`} asChild>
      <Pressable
        accessibilityRole="link"
        style={({ pressed }) => [
          styles.card,
          {
            backgroundColor: surface,
            borderColor: border,
            opacity: pressed ? 0.88 : 1,
          },
        ]}>
        <View style={styles.row}>
          <View style={[styles.badge, { backgroundColor: `${tint}18` }]}>
            <Text style={[styles.badgeText, { color: tint }]}>{score.shortName}</Text>
          </View>
          <Text style={[styles.category, { color: textSecondary }]}>{score.categoryLabel}</Text>
        </View>
        <Text style={styles.name}>{score.name}</Text>
        <Text style={[styles.description, { color: textSecondary }]}>{score.description}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
  },
});
