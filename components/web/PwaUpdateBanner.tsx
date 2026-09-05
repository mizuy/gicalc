import { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { useLocale } from '@/lib/i18n';
import {
  dismissPwaUpdate,
  initPwaUpdateService,
  isPwaUpdateDismissed,
  reloadPwaApp,
  subscribePwaUpdate,
} from '@/lib/web/pwaUpdateService';

export function PwaUpdateBanner() {
  const [available, setAvailable] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const tint = useThemeColor({}, 'tint');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const { t } = useLocale();

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    setDismissed(isPwaUpdateDismissed());
    const cleanupService = initPwaUpdateService();
    const unsubscribe = subscribePwaUpdate((isAvailable) => {
      setAvailable(isAvailable);
      if (isAvailable) {
        setDismissed(isPwaUpdateDismissed());
      }
    });

    return () => {
      unsubscribe();
      cleanupService();
    };
  }, []);

  if (Platform.OS !== 'web' || !available || dismissed) {
    return null;
  }

  const later = () => {
    dismissPwaUpdate();
    setDismissed(true);
  };

  return (
    <View
      accessibilityRole="alert"
      pointerEvents="box-none"
      style={styles.overlay}>
      <View style={[styles.bar, { backgroundColor: surface, borderBottomColor: border }]}>
        <Text style={styles.title}>{t.pwa.updateAvailable}</Text>
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={reloadPwaApp}
            style={({ pressed }) => [styles.button, { backgroundColor: tint, opacity: pressed ? 0.85 : 1 }]}>
            <Text style={styles.buttonText}>{t.pwa.reload}</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={later}
            style={({ pressed }) => [styles.later, { opacity: pressed ? 0.7 : 1 }]}>
            <Text style={[styles.laterText, { color: textSecondary }]}>{t.pwa.later}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10000,
  },
  bar: {
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    flexShrink: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  later: {
    paddingVertical: 8,
  },
  laterText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
