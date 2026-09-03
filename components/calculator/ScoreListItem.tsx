import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { JapanMark } from '@/components/calculator/JapanMark';
import { ToolKindBadge } from '@/components/calculator/ToolKindBadge';
import { Text, useThemeColor } from '@/components/Themed';
import { getToolKind, isJapanDeveloped, type ScoreDefinition } from '@/types/score';

type Props = {
  score: ScoreDefinition;
  last?: boolean;
};

export function ScoreListItem({ score, last }: Props) {
  const tint = useThemeColor({}, 'tint');
  const border = useThemeColor({}, 'border');
  const textSecondary = useThemeColor({}, 'textSecondary');

  return (
    <Link href={`/score/${score.id}`} asChild>
      <Pressable
        accessibilityRole="link"
        style={({ pressed }) => [
          styles.row,
          { borderBottomColor: border, opacity: pressed ? 0.72 : 1 },
          last ? styles.rowLast : null,
        ]}>
        <View style={[styles.badge, { backgroundColor: `${tint}18` }]}>
          <Text style={[styles.badgeText, { color: tint }]} numberOfLines={1}>
            {score.shortName}
          </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {score.name}
            </Text>
            {isJapanDeveloped(score) ? <JapanMark compact /> : null}
          </View>
          <View style={styles.meta}>
            <ToolKindBadge kind={getToolKind(score)} />
            <Text style={[styles.category, { color: textSecondary }]} numberOfLines={1}>
              {score.categoryLabel}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    minWidth: 72,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  body: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  category: {
    fontSize: 11,
    fontWeight: '600',
    flexShrink: 1,
  },
});
