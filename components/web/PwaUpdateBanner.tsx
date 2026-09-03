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
const UPDATE_POLL_MS = 20_000;

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

  const incoming = registration.installing ?? registration.waiting;
  if (!incoming) return;
  incoming.addEventListener('statechange', () => {
    if (
      isPwaUpdateAvailable({
        hasController: Boolean(navigator.serviceWorker.controller),
        waiting: Boolean(registration.waiting) || incoming.state === 'installed',
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

    const onUpdateFound = () => {
      const registration = registrationRef.current;
      if (registration) applyIncomingWorker(registration, markAvailable);
    };

    const requestUpdate = () => {
      const registration = registrationRef.current;
      if (!registration) return;
      registration
        .update()
        .then(() => {
          if (!cancelled) applyIncomingWorker(registration, markAvailable);
        })
        .catch(() => {});
    };

    navigator.serviceWorker.ready.then((registration) => {
      if (cancelled) return;
      registrationRef.current = registration;
      registration.addEventListener('updatefound', onUpdateFound);
      applyIncomingWorker(registration, markAvailable);
      requestUpdate();
    });

    const onControllerChange = () => {
      if (shouldOfferUpdateAfterControllerChange(hadControllerRef.current)) {
        markAvailable();
        return;
      }
      hadControllerRef.current = true;
    };
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);

    const onVisibility = () => {
      if (document.visibilityState === 'visible') requestUpdate();
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('focus', requestUpdate);
    const poll = window.setInterval(requestUpdate, UPDATE_POLL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(poll);
      registrationRef.current?.removeEventListener('updatefound', onUpdateFound);
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('focus', requestUpdate);
    };
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const registration = registrationRef.current;
    if (!registration) return;
    registration
      .update()
      .then(() => {
        applyIncomingWorker(registration, () => setAvailable(true));
      })
      .catch(() => {});
  }, [pathname]);

  if (Platform.OS !== 'web' || !available || dismissed) {
    return null;
  }

  const reload = () => {
    const waiting = registrationRef.current?.waiting;
    if (waiting) {
      let reloaded = false;
      const doReload = () => {
        if (reloaded) return;
        reloaded = true;
        window.location.reload();
      };
      navigator.serviceWorker.addEventListener('controllerchange', doReload);
      waiting.postMessage(SKIP_WAITING_MESSAGE);
      window.setTimeout(doReload, 400);
      return;
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
      pointerEvents="box-none"
      style={styles.overlay}>
      <View style={[styles.bar, { backgroundColor: surface, borderBottomColor: border }]}>
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
