import { Pressable, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { useLocale } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();
  const tint = useThemeColor({}, 'tint');
  const textSecondary = useThemeColor({}, 'textSecondary');

  const button = (code: Locale, label: string) => {
    const active = locale === code;
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ selected: active }}
        onPress={() => setLocale(code)}
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.7 : 1 }]}>
        <Text style={[styles.label, { color: active ? tint : textSecondary, fontWeight: active ? '800' : '600' }]}>
          {code.toUpperCase()}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.row} accessibilityLabel={`${t.languageJa} / ${t.languageEn}`}>
      {button('ja', t.languageJa)}
      <Text style={[styles.divider, { color: textSecondary }]}>/</Text>
      {button('en', t.languageEn)}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  button: {
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  label: {
    fontSize: 13,
    letterSpacing: 0.4,
  },
  divider: {
    fontSize: 12,
  },
});
