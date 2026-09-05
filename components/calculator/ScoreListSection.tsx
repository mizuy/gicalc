import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { ScoreListItem } from '@/components/calculator/ScoreListItem';
import { Text, useThemeColor } from '@/components/Themed';
import { groupScoresByListPhase } from '@/data/scores/list-sections';
import { useLocale } from '@/lib/i18n';
import type { ScoreDefinition } from '@/types/score';

type Props = {
  scores: ScoreDefinition[];
};

export function ScoreListSection({ scores }: Props) {
  const textSecondary = useThemeColor({}, 'textSecondary');
  const { t } = useLocale();

  const groups = useMemo(() => groupScoresByListPhase(scores), [scores]);

  return (
    <View style={styles.wrap}>
      {groups.map((group) => (
        <View key={group.phase} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textSecondary }]}>{t.listPhase[group.phase]}</Text>
          <View style={styles.cards}>
            {group.scores.map((score) => (
              <ScoreListItem key={score.id} score={score} />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 22,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  cards: {
    gap: 10,
  },
});
