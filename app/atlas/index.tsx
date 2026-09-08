import { Link, Stack, type Href } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { JapanMark } from '@/components/calculator/JapanMark';
import { ToolKindBadge } from '@/components/calculator/ToolKindBadge';
import { Text, useThemeColor } from '@/components/Themed';
import { listAtlases } from '@/data/atlas';
import { getScoreById } from '@/data/scores';
import { localizeScore, useLocale } from '@/lib/i18n';
import { getToolKind, isJapanDeveloped } from '@/types/score';

export default function AtlasIndexScreen() {
  const background = useThemeColor({}, 'background');
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const tint = useThemeColor({}, 'tint');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const { locale, t } = useLocale();
  const atlases = listAtlases();

  return (
    <>
      <Stack.Screen options={{ title: t.atlas.indexTitle, headerBackTitle: t.back }} />
      <ScrollView
        style={[styles.scroll, { backgroundColor: background }]}
        contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t.atlas.indexTitle}</Text>
        <Text style={[styles.intro, { color: textSecondary }]}>{t.atlas.indexIntro}</Text>

        {atlases.map((atlas) => {
          const score = getScoreById(atlas.scoreId);
          if (!score) return null;
          const localized = localizeScore(score, locale);
          return (
            <Link key={atlas.id} href={`/atlas/${atlas.id}` as Href} asChild>
              <Pressable
                accessibilityRole="link"
                style={({ pressed }) => [
                  styles.card,
                  {
                    backgroundColor: surface,
                    borderColor: border,
                    opacity: pressed ? 0.72 : 1,
                  },
                ]}>
                <View style={styles.cardHeader}>
                  <ToolKindBadge kind={getToolKind(localized)} />
                  {isJapanDeveloped(localized) ? <JapanMark compact /> : null}
                </View>
                <Text style={styles.cardTitle}>{localized.shortName}</Text>
                <Text style={[styles.cardName, { color: textSecondary }]} numberOfLines={2}>
                  {localized.name}
                </Text>
                <Text style={[styles.cardMeta, { color: tint }]}>
                  {t.atlas.figureCount.replace('{n}', String(atlas.figures.length))}
                </Text>
              </Pressable>
            </Link>
          );
        })}
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
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
  },
  intro: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    gap: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  cardName: {
    fontSize: 13,
    lineHeight: 18,
  },
  cardMeta: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
});
