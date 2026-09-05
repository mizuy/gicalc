import { Stack, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ScoreListSection } from '@/components/calculator/ScoreListSection';
import { Text, useThemeColor } from '@/components/Themed';
import { getScoresGroupedByOrgan } from '@/data/scores';
import { localizeScore, useLocale } from '@/lib/i18n';
import { ORGAN_ORDER, type ScoreOrgan } from '@/types/score';

function isScoreOrgan(value: string): value is ScoreOrgan {
  return ORGAN_ORDER.includes(value as ScoreOrgan);
}

export function generateStaticParams() {
  return ORGAN_ORDER.map((organ) => ({ organ }));
}

export default function OrganScoresScreen() {
  const { organ: organParam } = useLocalSearchParams<{ organ: string }>();
  const background = useThemeColor({}, 'background');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const { locale, t } = useLocale();

  const organ = typeof organParam === 'string' && isScoreOrgan(organParam) ? organParam : undefined;

  const scores = useMemo(() => {
    if (!organ) return undefined;
    const group = getScoresGroupedByOrgan().find((item) => item.organ === organ);
    if (!group) return undefined;
    return group.scores.map((score) => localizeScore(score, locale));
  }, [locale, organ]);

  if (!organ || !scores) {
    return (
      <View style={[styles.missing, { backgroundColor: background }]}>
        <Stack.Screen options={{ title: t.missingTitle, headerBackTitle: t.back }} />
        <Text style={{ color: textSecondary }}>{t.missingBody}</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t.organ[organ], headerBackTitle: t.back }} />
      <ScrollView
        style={[styles.scroll, { backgroundColor: background }]}
        contentContainerStyle={styles.content}>
        <Text style={[styles.lead, { color: textSecondary }]}>{t.organLead[organ]}</Text>
        <ScoreListSection scores={scores} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  lead: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});
