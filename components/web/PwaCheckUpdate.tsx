import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { useLocale } from '@/lib/i18n';
import { getAppVersion } from '@/lib/web/appVersion';
import {
  checkPwaUpdate,
  clearPwaUpdateDismissed,
  isPwaUpdateSupported,
  reloadPwaApp,
  subscribePwaUpdate,
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

  useEffect(() => {
    if (Platform.OS !== 'web' || !isPwaUpdateSupported()) return;
    return subscribePwaUpdate((updateState) => {
      if (updateState === 'preparing') setState('preparing');
      if (updateState === 'ready') setState('available');
    });
  }, []);

  if (Platform.OS !== 'web' || !isPwaUpdateSupported()) {
    return null;
  }

  const handleCheck = async () => {
    setState('checking');
    const result = await checkPwaUpdate();
    if (result === 'preparing' || result === 'available') {
      clearPwaUpdateDismissed();
    }
    setState(result);
  };

  const statusMessage =
    state === 'checking'
      ? t.pwa.checking
      : state === 'preparing'
        ? t.pwa.updatePreparing
        : state === 'current'
          ? t.pwa.upToDate
          : state === 'available'
            ? t.pwa.updateAvailable
            : null;

  const version = getAppVersion();

  return (
    <View style={[styles.box, { backgroundColor: surface, borderColor: border }]}>
      <Text style={[styles.version, { color: textSecondary }]}>
        {t.about.versionLabel}: {version}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ busy: state === 'checking', disabled: state === 'checking' }}
        disabled={state === 'checking'}
        onPress={handleCheck}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: tint, opacity: state === 'checking' ? 0.6 : pressed ? 0.85 : 1 },
        ]}>
        <View style={styles.buttonContent}>
          {state === 'checking' ? <ActivityIndicator color="#FFFFFF" size="small" /> : null}
          <Text style={styles.buttonText}>
            {state === 'checking' ? t.pwa.checking : t.pwa.checkUpdate}
          </Text>
        </View>
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
  version: {
    fontSize: 13,
    fontWeight: '600',
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
  buttonContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
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
