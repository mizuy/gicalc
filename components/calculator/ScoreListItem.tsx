import { memo } from 'react';
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

export const ScoreListItem = memo(function ScoreListItem({ score, last }: Props) {
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
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <Text style={[styles.shortName, { color: tint }]} numberOfLines={2}>
              {score.shortName}
            </Text>
            {isJapanDeveloped(score) ? <JapanMark compact /> : null}
          </View>
          <Text style={[styles.fullName, { color: textSecondary }]} numberOfLines={2}>
            {score.name}
          </Text>
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
});

const styles = StyleSheet.create({
  row: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  body: {
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  shortName: {
    flexShrink: 1,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
  },
  fullName: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  category: {
    fontSize: 11,
    fontWeight: '600',
    flexShrink: 1,
  },
});
