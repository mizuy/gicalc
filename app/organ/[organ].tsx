import { Stack, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ScoreListSection } from '@/components/calculator/ScoreListSection';
import { Text, useThemeColor } from '@/components/Themed';
import { getScoresGroupedForHome } from '@/data/scores';
import { localizeScore, useLocale } from '@/lib/i18n';
import { LIST_NAV_CATEGORY_ORDER, type ListNavCategory } from '@/types/score';

function isListNavCategory(value: string): value is ListNavCategory {
  return LIST_NAV_CATEGORY_ORDER.includes(value as ListNavCategory);
}

export function generateStaticParams() {
  return LIST_NAV_CATEGORY_ORDER.map((organ) => ({ organ }));
}

export default function OrganScoresScreen() {
  const { organ: categoryParam } = useLocalSearchParams<{ organ: string }>();
  const background = useThemeColor({}, 'background');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const { locale, t } = useLocale();

  const category =
    typeof categoryParam === 'string' && isListNavCategory(categoryParam) ? categoryParam : undefined;

  const scores = useMemo(() => {
    if (!category) return undefined;
    const group = getScoresGroupedForHome().find((item) => item.category === category);
    if (!group) return undefined;
    return group.scores.map((score) => localizeScore(score, locale));
  }, [locale, category]);

  if (!category || !scores) {
    return (
      <View style={[styles.missing, { backgroundColor: background }]}>
        <Stack.Screen options={{ title: t.missingTitle, headerBackTitle: t.back }} />
        <Text style={{ color: textSecondary }}>{t.missingBody}</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t.navCategory[category], headerBackTitle: t.back }} />
      <ScrollView
        style={[styles.scroll, { backgroundColor: background }]}
        contentContainerStyle={styles.content}>
        <Text style={[styles.lead, { color: textSecondary }]}>{t.navCategoryLead[category]}</Text>
        <ScoreListSection scores={scores} category={category} />
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
