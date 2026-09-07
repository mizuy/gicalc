import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { LanguageToggle } from '@/components/LanguageToggle';
import { Text, useThemeColor } from '@/components/Themed';
import { useLocale } from '@/lib/i18n';

export default function CitationsScreen() {
  const router = useRouter();
  const background = useThemeColor({}, 'background');
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const tint = useThemeColor({}, 'tint');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const { t } = useLocale();

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: background }]} contentContainerStyle={styles.content}>
      <View style={styles.navigation}>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/(tabs)/about');
            }
          }}
          style={({ pressed }) => ({ opacity: pressed ? 0.65 : 1 })}>
          <Text style={[styles.back, { color: tint }]}>‹ {t.back}</Text>
        </Pressable>
        <LanguageToggle />
      </View>

      <Text style={styles.title}>{t.about.citationsTitle}</Text>
      <Text style={[styles.intro, { color: textSecondary }]}>{t.about.citationsIntro}</Text>

      <Text style={[styles.section, { color: tint }]}>{t.about.citationsCc}</Text>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        {t.about.citationsCcBody.split('\n').map((line) => (
          <Text key={line} style={[styles.body, { color: textSecondary }]}>
            {line}
          </Text>
        ))}
      </View>

      <Text style={[styles.section, { color: tint }]}>{t.about.citationsNotCc}</Text>
      <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
        {t.about.citationsNotCcBody.split('\n').map((line) => (
          <Text key={line} style={[styles.body, { color: textSecondary }]}>
            {line}
          </Text>
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
  navigation: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  back: {
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  intro: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  section: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 16,
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  },
});
