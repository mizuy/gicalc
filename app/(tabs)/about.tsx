import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ReportIssueButton } from '@/components/ReportIssueButton';
import { Text, useThemeColor } from '@/components/Themed';
import { PwaCheckUpdate } from '@/components/web/PwaCheckUpdate';
import { useLocale } from '@/lib/i18n';

export default function AboutScreen() {
  const background = useThemeColor({}, 'background');
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const tint = useThemeColor({}, 'tint');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const accent = useThemeColor({}, 'accent');
  const { t } = useLocale();

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: background }]} contentContainerStyle={styles.content}>
      <Text style={styles.title}>GI Calc / gicalc</Text>
      <Text style={[styles.body, { color: textSecondary }]}>{t.about.intro}</Text>

      <Link href="/citations" asChild>
        <Pressable
          accessibilityRole="link"
          style={({ pressed }) => [
            styles.linkCard,
            {
              backgroundColor: surface,
              borderColor: border,
              opacity: pressed ? 0.75 : 1,
            },
          ]}>
          <Text style={[styles.linkText, { color: tint }]}>{t.about.citationsTitle}</Text>
          <Text style={[styles.linkArrow, { color: tint }]}>›</Text>
        </Pressable>
      </Link>

      <Text style={[styles.section, { color: tint }]}>{t.about.pwaTitle}</Text>
      <PwaCheckUpdate />
      <Text style={[styles.body, { color: textSecondary }]}>{t.about.pwaIos}</Text>
      <Text style={[styles.body, { color: textSecondary }]}>{t.about.pwaAndroid}</Text>
      <Text style={[styles.body, { color: textSecondary }]}>{t.about.pwaBanner}</Text>
      <Text style={[styles.body, { color: textSecondary }]}>{t.about.pwaUpdate}</Text>

      <Text style={[styles.section, { color: accent }]}>{t.about.disclaimer}</Text>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={[styles.body, { color: textSecondary }]}>{t.about.disclaimerBody}</Text>
        <Text style={[styles.body, { color: textSecondary }]}>{t.about.disclaimerGuide}</Text>
      </View>

      <ReportIssueButton pageTitle="GI Calc / About" />
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
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
  },
  section: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 20,
    marginBottom: 10,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  linkCard: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkText: {
    fontSize: 16,
    fontWeight: '700',
  },
  linkArrow: {
    fontSize: 24,
    lineHeight: 24,
  },
});
