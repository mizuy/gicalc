import { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { useLocale } from '@/lib/i18n';
import {
  checkPwaUpdate,
  clearPwaUpdateDismissed,
  isPwaUpdateSupported,
  reloadPwaApp,
  type PwaUpdateCheckResult,
} from '@/lib/web/pwaUpdateService';

type CheckState = 'idle' | 'checking' | PwaUpdateCheckResult;

export function PwaCheckUpdate() {
  const [state, setState] = useState<CheckState>('idle');
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const tint = useThemeColor({}, 'tint');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const { t } = useLocale();

  if (Platform.OS !== 'web' || !isPwaUpdateSupported()) {
    return null;
  }

  const handleCheck = async () => {
    setState('checking');
    const result = await checkPwaUpdate();
    if (result === 'available') {
      clearPwaUpdateDismissed();
    }
    setState(result);
  };

  const statusMessage =
    state === 'checking'
      ? t.pwa.checking
      : state === 'current'
        ? t.pwa.upToDate
        : state === 'available'
          ? t.pwa.updateAvailable
          : null;

  return (
    <View style={[styles.box, { backgroundColor: surface, borderColor: border }]}>
      <Pressable
        accessibilityRole="button"
        disabled={state === 'checking'}
        onPress={handleCheck}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: tint, opacity: state === 'checking' ? 0.6 : pressed ? 0.85 : 1 },
        ]}>
        <Text style={styles.buttonText}>{t.pwa.checkUpdate}</Text>
      </Pressable>
      {statusMessage ? (
        <Text style={[styles.status, { color: textSecondary }]}>{statusMessage}</Text>
      ) : null}
      {state === 'available' ? (
        <Pressable
          accessibilityRole="button"
          onPress={reloadPwaApp}
          style={({ pressed }) => [styles.reload, { opacity: pressed ? 0.7 : 1 }]}>
          <Text style={[styles.reloadText, { color: tint }]}>{t.pwa.reload}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    gap: 10,
  },
  button: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  status: {
    fontSize: 14,
    lineHeight: 22,
  },
  reload: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  reloadText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
