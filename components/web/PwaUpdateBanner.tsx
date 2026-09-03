import { usePathname } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { useLocale } from '@/lib/i18n';
import {
  isPwaUpdateAvailable,
  shouldOfferUpdateAfterControllerChange,
  SKIP_WAITING_MESSAGE,
} from '@/lib/web/pwaUpdate';

const DISMISS_KEY = 'gicalc.pwaUpdate.dismissed';

function readDismissed(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(DISMISS_KEY) === '1';
  } catch {
    return false;
  }
}

function writeDismissed(): void {
  try {
    window.sessionStorage.setItem(DISMISS_KEY, '1');
  } catch {
    // ignore quota / private mode
  }
}

function applyIncomingWorker(
  registration: ServiceWorkerRegistration,
  markAvailable: () => void,
): void {
  if (
    isPwaUpdateAvailable({
      hasController: Boolean(navigator.serviceWorker.controller),
      waiting: Boolean(registration.waiting),
      installingState: registration.installing?.state,
    })
  ) {
    markAvailable();
  }

  const incoming = registration.installing;
  if (!incoming) return;
  incoming.addEventListener('statechange', () => {
    if (
      isPwaUpdateAvailable({
        hasController: Boolean(navigator.serviceWorker.controller),
        waiting: Boolean(registration.waiting),
        installingState: incoming.state,
      })
    ) {
      markAvailable();
    }
  });
}

export function PwaUpdateBanner() {
  const [available, setAvailable] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const registrationRef = useRef<ServiceWorkerRegistration | null>(null);
  const hadControllerRef = useRef(false);
  const pathname = usePathname();

  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const tint = useThemeColor({}, 'tint');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const { t } = useLocale();

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;

    let cancelled = false;
    hadControllerRef.current = Boolean(navigator.serviceWorker.controller);
    setDismissed(readDismissed());

    const markAvailable = () => {
      if (!cancelled) setAvailable(true);
    };

    const checkRegistration = (registration: ServiceWorkerRegistration) => {
      registrationRef.current = registration;
      applyIncomingWorker(registration, markAvailable);
    };

    const onUpdateFound = () => {
      const registration = registrationRef.current;
      if (registration) applyIncomingWorker(registration, markAvailable);
    };

    navigator.serviceWorker.ready.then((registration) => {
      if (cancelled) return;
      checkRegistration(registration);
      registration.addEventListener('updatefound', onUpdateFound);
      registration.update().catch(() => {});
    });

    const onControllerChange = () => {
      if (shouldOfferUpdateAfterControllerChange(hadControllerRef.current)) {
        markAvailable();
        return;
      }
      hadControllerRef.current = true;
    };
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);

    const requestUpdate = () => {
      registrationRef.current?.update().catch(() => {});
    };
    const onVisibility = () => {
      if (document.visibilityState === 'visible') requestUpdate();
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('focus', requestUpdate);

    return () => {
      cancelled = true;
      registrationRef.current?.removeEventListener('updatefound', onUpdateFound);
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('focus', requestUpdate);
    };
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    registrationRef.current?.update().catch(() => {});
  }, [pathname]);

  if (Platform.OS !== 'web' || !available || dismissed) {
    return null;
  }

  const reload = () => {
    const waiting = registrationRef.current?.waiting;
    if (waiting) {
      waiting.postMessage(SKIP_WAITING_MESSAGE);
    }
    window.location.reload();
  };

  const later = () => {
    writeDismissed();
    setDismissed(true);
  };

  return (
    <View
      accessibilityRole="alert"
      style={[styles.bar, { backgroundColor: surface, borderBottomColor: border }]}>
      <Text style={styles.title}>{t.pwa.updateAvailable}</Text>
      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={reload}
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
  );
}

const styles = StyleSheet.create({
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
