import * as Linking from 'expo-linking';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { useLocale } from '@/lib/i18n';
import { getAppVersion } from '@/lib/web/appVersion';
import { buildReportFormUrl } from '@/lib/reportIssue';

type Props = {
  pageTitle: string;
};

function currentPageUrl(): string | undefined {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return undefined;
  return window.location.href;
}

function currentUserAgent(): string {
  if (Platform.OS !== 'web' || typeof navigator === 'undefined') return '';
  return navigator.userAgent;
}

export function ReportIssueButton({ pageTitle }: Props) {
  const tint = useThemeColor({}, 'tint');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const { t } = useLocale();

  const openReportForm = () => {
    const url = buildReportFormUrl({
      pageTitle,
      pageUrl: currentPageUrl(),
      appVersion: getAppVersion(),
      userAgent: currentUserAgent(),
    });
    void Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={t.reportIssue}
        onPress={openReportForm}
        style={({ pressed }) => [
          styles.button,
          { borderColor: tint, opacity: pressed ? 0.65 : 1 },
        ]}>
        <Text style={[styles.buttonText, { color: tint }]}>{t.reportIssue}</Text>
      </Pressable>
      <Text style={[styles.note, { color: textSecondary }]}>{t.reportPrivacyNote}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  button: {
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  note: {
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
  },
});
