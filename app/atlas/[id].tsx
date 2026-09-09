import { Link, Stack, useLocalSearchParams, type Href } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ClassificationFigure } from '@/components/calculator/ClassificationFigure';
import { ReportIssueButton } from '@/components/ReportIssueButton';
import { Text, useThemeColor } from '@/components/Themed';
import { getAtlasById, getAtlasRouteIds, localizeAtlasFigure } from '@/data/atlas';
import { getScoreById } from '@/data/scores';
import { localizeScore, useLocale } from '@/lib/i18n';
import { figureKey } from '@/types/score';

export function generateStaticParams() {
  return getAtlasRouteIds().map((id) => ({ id }));
}

export default function AtlasScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const background = useThemeColor({}, 'background');
  const tint = useThemeColor({}, 'tint');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const { locale, t } = useLocale();

  const atlas = typeof params.id === 'string' ? getAtlasById(params.id) : undefined;
  const score = atlas ? getScoreById(atlas.scoreId) : undefined;
  const localized = score ? localizeScore(score, locale) : undefined;

  if (!atlas || !score || !localized) {
    return (
      <View style={[styles.missing, { backgroundColor: background }]}>
        <Stack.Screen options={{ title: t.missingTitle, headerBackTitle: t.back }} />
        <Text>{t.missingBody}</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t.atlas.pageTitle.replace('{name}', localized.shortName), headerBackTitle: t.back }} />
      <ScrollView
        style={[styles.scroll, { backgroundColor: background }]}
        contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t.atlas.pageTitle.replace('{name}', localized.shortName)}</Text>
        <Text style={[styles.intro, { color: textSecondary }]}>{t.atlas.pageIntro}</Text>

        <Link href={`/score/${atlas.scoreId}` as Href} asChild>
          <Pressable
            accessibilityRole="link"
            style={({ pressed }) => [styles.backLink, { opacity: pressed ? 0.7 : 1 }]}>
            <Text style={[styles.backLinkText, { color: tint }]}>{t.atlas.backToScore}</Text>
          </Pressable>
        </Link>

        {atlas.figures.map((figure) => (
          <ClassificationFigure
            key={figureKey(figure)}
            figure={localizeAtlasFigure(figure, locale)}
          />
        ))}

        <ReportIssueButton pageTitle={`${localized.shortName} / Atlas`} />
        <Text style={[styles.footnote, { color: textSecondary }]}>{t.footnote}</Text>
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
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  intro: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  backLink: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backLinkText: {
    fontSize: 14,
    fontWeight: '700',
  },
  footnote: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
});
