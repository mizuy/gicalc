import { ScrollView, StyleSheet, View } from 'react-native';

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

      <Text style={[styles.section, { color: tint }]}>{t.about.tools}</Text>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={styles.cardTitle}>{t.about.esophagus}</Text>
        <Text style={[styles.body, { color: textSecondary }]}>{t.about.esophagusBody}</Text>
      </View>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={styles.cardTitle}>{t.about.stomach}</Text>
        <Text style={[styles.body, { color: textSecondary }]}>{t.about.stomachBody}</Text>
      </View>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={styles.cardTitle}>{t.about.duodenum}</Text>
        <Text style={[styles.body, { color: textSecondary }]}>{t.about.duodenumBody}</Text>
      </View>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={styles.cardTitle}>{t.about.colorectum}</Text>
        <Text style={[styles.body, { color: textSecondary }]}>{t.about.colorectumBody}</Text>
      </View>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={styles.cardTitle}>{t.about.bleeding}</Text>
        <Text style={[styles.body, { color: textSecondary }]}>{t.about.bleedingBody}</Text>
      </View>

      <Text style={[styles.section, { color: tint }]}>{t.about.citationsTitle}</Text>
      <Text style={[styles.body, { color: textSecondary }]}>{t.about.citationsIntro}</Text>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={styles.cardTitle}>{t.about.citationsCc}</Text>
        {t.about.citationsCcBody.split('\n').map((line) => (
          <Text key={line} style={[styles.body, { color: textSecondary }]}>
            {line}
          </Text>
        ))}
      </View>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        <Text style={styles.cardTitle}>{t.about.citationsNotCc}</Text>
        {t.about.citationsNotCcBody.split('\n').map((line) => (
          <Text key={line} style={[styles.body, { color: textSecondary }]}>
            {line}
          </Text>
        ))}
      </View>

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
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
});
