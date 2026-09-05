import { Stack, useLocalSearchParams } from 'expo-router';
import type { ComponentType } from 'react';
import { useMemo } from 'react';

import { AlgorithmFlowScreen } from '@/components/calculator/AlgorithmFlowScreen';
import { ClassificationReferenceScreen } from '@/components/calculator/ClassificationReferenceScreen';
import { ColorectalEsdCurabilityScreen } from '@/components/calculator/ColorectalEsdCurabilityScreen';
import { EsophagusEsdCurabilityScreen } from '@/components/calculator/EsophagusEsdCurabilityScreen';
import { GastricEsdCurabilityScreen } from '@/components/calculator/GastricEsdCurabilityScreen';
import { ScoreCalculatorScreen } from '@/components/calculator/ScoreCalculatorScreen';
import { Text, View } from '@/components/Themed';
import { SCORES, getScoreById } from '@/data/scores';
import { localizeScore, useLocale } from '@/lib/i18n';
import { hasAlgorithmFlow, isClassification, type CalculatorDefinition } from '@/types/score';

const CURABILITY_SCREENS: Record<string, ComponentType<{ score: CalculatorDefinition }>> = {
  'gastric-esd-curability': GastricEsdCurabilityScreen,
  'esophagus-esd-curability': EsophagusEsdCurabilityScreen,
  'colorectal-esd-curability': ColorectalEsdCurabilityScreen,
};

export function generateStaticParams() {
  return SCORES.map((score) => ({ id: score.id }));
}

export default function ScoreScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { locale, t } = useLocale();
  const score = typeof id === 'string' ? getScoreById(id) : undefined;

  const localized = useMemo(
    () => (score ? localizeScore(score, locale) : undefined),
    [score, locale],
  );

  if (!score || !localized) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Stack.Screen options={{ title: t.missingTitle, headerBackTitle: t.back }} />
        <Text>{t.missingBody}</Text>
      </View>
    );
  }

  const localizedScore = localized;
  const CurabilityScreen = CURABILITY_SCREENS[localizedScore.id];

  return (
    <>
      <Stack.Screen options={{ title: localizedScore.shortName, headerBackTitle: t.back }} />
      {hasAlgorithmFlow(localizedScore) ? (
        <AlgorithmFlowScreen key={localizedScore.id} score={localizedScore} />
      ) : isClassification(localizedScore) && !CurabilityScreen ? (
        <ClassificationReferenceScreen score={localizedScore} />
      ) : CurabilityScreen && !isClassification(localizedScore) ? (
        <CurabilityScreen key={localizedScore.id} score={localizedScore} />
      ) : !isClassification(localizedScore) ? (
        <ScoreCalculatorScreen key={localizedScore.id} score={localizedScore} />
      ) : null}
    </>
  );
}
