import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScoreListItem } from '@/components/calculator/ScoreListItem';
import { Text, useThemeColor } from '@/components/Themed';
import { isSecondaryListScore } from '@/data/scores/list-tiers';
import { useLocale } from '@/lib/i18n';
import type { ScoreDefinition } from '@/types/score';

type Props = {
  scores: ScoreDefinition[];
};

export function ScoreListSection({ scores }: Props) {
  const [secondaryOpen, setSecondaryOpen] = useState(false);
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const tint = useThemeColor({}, 'tint');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const { t } = useLocale();

  const { primary, secondary } = useMemo(() => {
    const primaryScores: ScoreDefinition[] = [];
    const secondaryScores: ScoreDefinition[] = [];
    for (const score of scores) {
      if (isSecondaryListScore(score.id)) secondaryScores.push(score);
      else primaryScores.push(score);
    }
    return { primary: primaryScores, secondary: secondaryScores };
  }, [scores]);

  const renderList = (items: ScoreDefinition[]) => (
    <View style={[styles.table, { backgroundColor: surface, borderColor: border }]}>
      {items.map((score, index) => (
        <ScoreListItem key={score.id} score={score} last={index === items.length - 1} />
      ))}
    </View>
  );

  return (
    <View style={styles.wrap}>
      {primary.length > 0 ? renderList(primary) : null}
      {secondary.length > 0 ? (
        <View style={styles.secondaryBlock}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: secondaryOpen }}
            onPress={() => setSecondaryOpen((open) => !open)}
            style={({ pressed }) => [
              styles.secondaryHead,
              { borderColor: border, backgroundColor: surface, opacity: pressed ? 0.85 : 1 },
            ]}>
            <Text style={[styles.secondaryTitle, { color: tint }]}>{t.secondaryTools}</Text>
            <Text style={[styles.secondaryMeta, { color: textSecondary }]}>
              {secondary.length} · {secondaryOpen ? t.secondaryCollapse : t.secondaryExpand}
            </Text>
          </Pressable>
          {secondaryOpen ? renderList(secondary) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 14,
  },
  table: {
    borderWidth: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  secondaryBlock: {
    gap: 8,
  },
  secondaryHead: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  secondaryTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryMeta: {
    fontSize: 13,
    fontWeight: '600',
  },
});
