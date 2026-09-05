import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useMemo } from 'react';

import { OrganPickerCard } from '@/components/calculator/OrganPickerCard';
import { Text, useThemeColor } from '@/components/Themed';
import { PwaInstallBanner } from '@/components/web/PwaInstallBanner';
import { getScoresGroupedForHome } from '@/data/scores';
import { useLocale } from '@/lib/i18n';

export default function HomeScreen() {
  const background = useThemeColor({}, 'background');
  const tint = useThemeColor({}, 'tint');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const { t } = useLocale();
  const groups = useMemo(() => getScoresGroupedForHome(), []);

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

      <View style={[styles.table, { backgroundColor: surface, borderColor: border }]}>
        {groups.map((group, index) => (
          <OrganPickerCard
            key={group.category}
            category={group.category}
            label={t.navCategory[group.category]}
            count={group.scores.length}
            last={index === groups.length - 1}
          />
        ))}
      </View>
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
  table: {
    borderWidth: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
});
