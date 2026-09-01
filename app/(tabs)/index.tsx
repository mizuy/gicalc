import { ScrollView, StyleSheet, View } from 'react-native';

import { ScoreListItem } from '@/components/calculator/ScoreListItem';
import { Text, useThemeColor } from '@/components/Themed';
import { PwaInstallBanner } from '@/components/web/PwaInstallBanner';
import { getScoresGroupedByCategory } from '@/data/scores';

export default function HomeScreen() {
  const background = useThemeColor({}, 'background');
  const tint = useThemeColor({}, 'tint');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const groups = getScoresGroupedByCategory();

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: background }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.emoji}>🧮</Text>
        <View>
          <Text style={styles.brand}>GI Calc</Text>
          <Text style={[styles.slug, { color: tint }]}>gicalc</Text>
        </View>
      </View>
      <Text style={[styles.lead, { color: textSecondary }]}>
        消化管内視鏡向けのスコア、臨床尺度、内視鏡分類。体系は混同しないでください。
      </Text>

      <PwaInstallBanner />

      {groups.map((group) => (
        <View key={group.category} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: tint }]}>{group.label}</Text>
          {group.scores.map((score) => (
            <ScoreListItem key={score.id} score={score} />
          ))}
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
  emoji: {
    fontSize: 36,
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
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
    letterSpacing: 0.4,
  },
});
