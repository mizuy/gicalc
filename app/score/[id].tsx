import { router, Stack, useLocalSearchParams } from 'expo-router';
import type { ComponentType } from 'react';
import { useCallback, useMemo } from 'react';
import { View } from 'react-native';

import { AlgorithmFlowScreen } from '@/components/calculator/AlgorithmFlowScreen';
import { ClassificationReferenceScreen } from '@/components/calculator/ClassificationReferenceScreen';
import { ColorectalEsdCurabilityScreen } from '@/components/calculator/ColorectalEsdCurabilityScreen';
import { EsophagusEsdCurabilityScreen } from '@/components/calculator/EsophagusEsdCurabilityScreen';
import { GastricEsdCurabilityScreen } from '@/components/calculator/GastricEsdCurabilityScreen';
import { ScoreCalculatorScreen } from '@/components/calculator/ScoreCalculatorScreen';
import { ScoreVariantTabs } from '@/components/calculator/ScoreVariantTabs';
import { Text } from '@/components/Themed';
import { ALL_SCORE_DEFINITIONS, SCORES, getScoreById } from '@/data/scores';
import {
  findVariantGroupByScoreId,
  getScoreRouteIds,
  getVariantGroup,
  resolveScoreRoute,
  type ScoreVariantGroup,
} from '@/data/scores/variant-groups';
import { localizeScore, useLocale } from '@/lib/i18n';
import { hasAlgorithmFlow, isClassification, type CalculatorDefinition } from '@/types/score';

const CURABILITY_SCREENS: Record<string, ComponentType<{ score: CalculatorDefinition }>> = {
  'gastric-esd-curability': GastricEsdCurabilityScreen,
  'esophagus-esd-curability': EsophagusEsdCurabilityScreen,
  'colorectal-esd-curability': ColorectalEsdCurabilityScreen,
};

export function generateStaticParams() {
  const ids = new Set<string>();
  for (const score of SCORES) ids.add(score.id);
  for (const routeId of getScoreRouteIds()) ids.add(routeId);
  return [...ids].map((id) => ({ id }));
}

export default function ScoreScreen() {
  const params = useLocalSearchParams<{ id: string; variant?: string }>();
  const { locale, t } = useLocale();

  const route = useMemo(() => {
    if (typeof params.id !== 'string') return undefined;
    const resolved = resolveScoreRoute(params.id);
    const group = getVariantGroup(resolved.pageId);
    if (!group) return { ...resolved, group: undefined as ScoreVariantGroup | undefined };

    const variantParam = typeof params.variant === 'string' ? params.variant : undefined;
    const variantId =
      variantParam && group.variantIds.includes(variantParam)
        ? variantParam
        : resolved.variantId;

    return { pageId: resolved.pageId, variantId, group };
  }, [params.id, params.variant]);

  const pageScore = route ? getScoreById(route.pageId) : undefined;
  const activeScore = route ? getScoreById(route.variantId) : undefined;

  const localizedPage = useMemo(
    () => (pageScore ? localizeScore(pageScore, locale) : undefined),
    [pageScore, locale],
  );
  const localizedActive = useMemo(
    () => (activeScore ? localizeScore(activeScore, locale) : undefined),
    [activeScore, locale],
  );

  const handleVariantSelect = useCallback(
    (variantId: string) => {
      if (!route?.group) return;
      router.setParams({ id: route.pageId, variant: variantId });
    },
    [route?.group, route?.pageId],
  );

  if (!route || !pageScore || !activeScore || !localizedPage || !localizedActive) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Stack.Screen options={{ title: t.missingTitle, headerBackTitle: t.back }} />
        <Text>{t.missingBody}</Text>
      </View>
    );
  }

  const CurabilityScreen = CURABILITY_SCREENS[localizedActive.id];

  const variantTabs = route.group ? (
    <ScoreVariantTabs
      group={route.group}
      activeVariantId={route.variantId}
      onSelect={handleVariantSelect}
    />
  ) : undefined;

  return (
    <>
      <Stack.Screen options={{ title: localizedPage.shortName, headerBackTitle: t.back }} />
      {hasAlgorithmFlow(localizedActive) ? (
        <AlgorithmFlowScreen key={localizedActive.id} score={localizedActive} />
      ) : isClassification(localizedActive) && !CurabilityScreen ? (
        <ClassificationReferenceScreen score={localizedActive} />
      ) : CurabilityScreen && !isClassification(localizedActive) ? (
        <CurabilityScreen key={localizedActive.id} score={localizedActive} />
      ) : !isClassification(localizedActive) ? (
        <ScoreCalculatorScreen key={localizedActive.id} score={localizedActive} header={variantTabs} />
      ) : null}
    </>
  );
}

export { ALL_SCORE_DEFINITIONS };
