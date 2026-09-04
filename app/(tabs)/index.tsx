import { Image, ScrollView, StyleSheet, View } from 'react-native';

import { ScoreListItem } from '@/components/calculator/ScoreListItem';
import { Text, useThemeColor } from '@/components/Themed';
import { PwaInstallBanner } from '@/components/web/PwaInstallBanner';
import { getScoresGroupedByOrgan } from '@/data/scores';
import { localizeScore, useLocale } from '@/lib/i18n';

export default function HomeScreen() {
  const background = useThemeColor({}, 'background');
  const tint = useThemeColor({}, 'tint');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const { locale, t } = useLocale();
  const groups = getScoresGroupedByOrgan();

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: background }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Image
          accessibilityLabel="GI Calc"
          source={require('../../assets/images/icon-home.png')}
          style={styles.logo}
        />
        <View>
          <Text style={styles.brand}>GI Calc</Text>
          <Text style={[styles.slug, { color: tint }]}>gicalc</Text>
        </View>
      </View>
      <Text style={[styles.lead, { color: textSecondary }]}>{t.homeLead}</Text>

      <PwaInstallBanner />

      {groups.map((group) => (
        <View key={group.organ} style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={[styles.sectionTitle, { color: tint }]}>{t.organ[group.organ]}</Text>
            <Text style={[styles.sectionCount, { color: textSecondary }]}>{group.scores.length}</Text>
          </View>
          <View style={[styles.table, { backgroundColor: surface, borderColor: border }]}>
            {group.scores.map((score, index) => (
              <ScoreListItem
                key={score.id}
                score={localizeScore(score, locale)}
                last={index === group.scores.length - 1}
              />
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  brand: {
    fontSize: 28,
    fontWeight: '800',
  },
  slug: {
    fontSize: 14,
    fontWeight: '600',
  },
  lead: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  section: {
    marginBottom: 18,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: '600',
  },
  table: {
    borderWidth: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
});
