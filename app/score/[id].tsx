import { Stack, useLocalSearchParams } from 'expo-router';

import { ClassificationReferenceScreen } from '@/components/calculator/ClassificationReferenceScreen';
import { ScoreCalculatorScreen } from '@/components/calculator/ScoreCalculatorScreen';
import { Text, View } from '@/components/Themed';
import { SCORES, getScoreById } from '@/data/scores';
import { localizeScore, useLocale } from '@/lib/i18n';
import { isClassification } from '@/types/score';

export function generateStaticParams() {
  return SCORES.map((score) => ({ id: score.id }));
}

export default function ScoreScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { locale, t } = useLocale();
  const score = typeof id === 'string' ? getScoreById(id) : undefined;

  if (!score) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Stack.Screen options={{ title: t.missingTitle, headerBackTitle: t.back }} />
        <Text>{t.missingBody}</Text>
      </View>
    );
  }

  const localized = localizeScore(score, locale);

  return (
    <>
      <Stack.Screen options={{ title: localized.shortName, headerBackTitle: t.back }} />
      {isClassification(localized) ? (
        <ClassificationReferenceScreen score={localized} />
      ) : (
        <ScoreCalculatorScreen score={localized} />
      )}
    </>
  );
}
