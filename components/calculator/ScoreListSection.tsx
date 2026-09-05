import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { ScoreListItem } from '@/components/calculator/ScoreListItem';
import { Text, useThemeColor } from '@/components/Themed';
import {
  groupScoresByDuodenumSite,
  groupScoresByListPhase,
  navCategoryUsesListPhases,
} from '@/data/scores/list-sections';
import { useLocale } from '@/lib/i18n';
import type { ListNavCategory, ScoreDefinition } from '@/types/score';

type Props = {
  scores: ScoreDefinition[];
  category: ListNavCategory;
};

function ScoreCards({ scores }: { scores: ScoreDefinition[] }) {
  return (
    <View style={styles.cards}>
      {scores.map((score) => (
        <ScoreListItem key={score.id} score={score} />
      ))}
    </View>
  );
}

export function ScoreListSection({ scores, category }: Props) {
  const textSecondary = useThemeColor({}, 'textSecondary');
  const { t } = useLocale();
  const usePhases = navCategoryUsesListPhases(category);
  const useDuodenumSites = category === 'duodenum';

  const phaseGroups = useMemo(
    () => (usePhases ? groupScoresByListPhase(scores) : null),
    [scores, usePhases],
  );
  const duodenumGroups = useMemo(
    () => (useDuodenumSites ? groupScoresByDuodenumSite(scores) : null),
    [scores, useDuodenumSites],
  );

  if (duodenumGroups) {
    return (
      <View style={styles.wrap}>
        {duodenumGroups.map((group) => (
          <View key={group.site} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: textSecondary }]}>
              {t.duodenumSite[group.site]}
            </Text>
            <ScoreCards scores={group.scores} />
          </View>
        ))}
      </View>
    );
  }

  if (!phaseGroups) {
    return (
      <View style={styles.wrap}>
        <ScoreCards scores={scores} />
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      {phaseGroups.map((group) => (
        <View key={group.phase} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textSecondary }]}>{t.listPhase[group.phase]}</Text>
          <ScoreCards scores={group.scores} />
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
