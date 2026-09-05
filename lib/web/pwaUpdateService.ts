import {
  isPwaUpdateAvailable,
  shouldOfferUpdateAfterControllerChange,
  SKIP_WAITING_MESSAGE,
} from './pwaUpdate';

export type PwaUpdateCheckResult = 'available' | 'current' | 'unsupported';

const DISMISS_KEY = 'gicalc.pwaUpdate.dismissed';
const UPDATE_POLL_MS = 5 * 60_000;

type UpdateListener = (available: boolean) => void;

let registration: ServiceWorkerRegistration | null = null;
let initCount = 0;
let updateAvailable = false;
let hadController = false;
const listeners = new Set<UpdateListener>();

let cleanupFns: Array<() => void> = [];

function readDismissed(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(DISMISS_KEY) === '1';
  } catch {
    return false;
  }
}

function notifyListeners() {
  for (const listener of listeners) {
    listener(updateAvailable);
  }
}

function markAvailable() {
  if (!updateAvailable) {
    updateAvailable = true;
    notifyListeners();
  }
}

function applyIncomingWorker(reg: ServiceWorkerRegistration): void {
  if (
    isPwaUpdateAvailable({
      hasController: Boolean(navigator.serviceWorker.controller),
      waiting: Boolean(reg.waiting),
      installingState: reg.installing?.state,
    })
  ) {
    markAvailable();
  }

  const incoming = reg.installing ?? reg.waiting;
  if (!incoming) return;
  incoming.addEventListener('statechange', () => {
    if (
      isPwaUpdateAvailable({
        hasController: Boolean(navigator.serviceWorker.controller),
        waiting: Boolean(reg.waiting) || incoming.state === 'installed',
        installingState: incoming.state,
      })
    ) {
      markAvailable();
    }
  });
}

async function requestUpdate(): Promise<void> {
  const reg = registration;
  if (!reg) return;
  await reg.update().catch(() => {});
  applyIncomingWorker(reg);
}

export function isPwaUpdateSupported(): boolean {
  return typeof navigator !== 'undefined' && 'serviceWorker' in navigator;
}

export function initPwaUpdateService(): () => void {
  if (!isPwaUpdateSupported()) return () => {};

  initCount += 1;
  if (initCount > 1) {
    return () => {
      initCount -= 1;
      if (initCount === 0) runCleanup();
    };
  }

  hadController = Boolean(navigator.serviceWorker.controller);
  let cancelled = false;

  const onUpdateFound = () => {
    if (registration) applyIncomingWorker(registration);
  };

  navigator.serviceWorker.ready.then((reg) => {
    if (cancelled) return;
    registration = reg;
    reg.addEventListener('updatefound', onUpdateFound);
    applyIncomingWorker(reg);
    void requestUpdate();
  });

  const onControllerChange = () => {
    if (shouldOfferUpdateAfterControllerChange(hadController)) {
      markAvailable();
      return;
    }
    hadController = true;
  };
  navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);

  const onVisibility = () => {
    if (document.visibilityState === 'visible') void requestUpdate();
  };
  const onFocus = () => void requestUpdate();
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('focus', onFocus);
  const poll = window.setInterval(() => void requestUpdate(), UPDATE_POLL_MS);

  cleanupFns = [
    () => {
      cancelled = true;
    },
    () => window.clearInterval(poll),
    () => registration?.removeEventListener('updatefound', onUpdateFound),
    () => navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange),
    () => document.removeEventListener('visibilitychange', onVisibility),
    () => window.removeEventListener('focus', onFocus),
    () => {
      registration = null;
      updateAvailable = false;
    },
  ];

  return () => {
    initCount -= 1;
    if (initCount === 0) runCleanup();
  };
}

function runCleanup() {
  for (const fn of cleanupFns) fn();
  cleanupFns = [];
}

export function subscribePwaUpdate(listener: UpdateListener): () => void {
  listeners.add(listener);
  listener(updateAvailable);
  return () => listeners.delete(listener);
}

export function isPwaUpdateAvailableNow(): boolean {
  return updateAvailable;
}

export function isPwaUpdateDismissed(): boolean {
  return readDismissed();
}

export function dismissPwaUpdate(): void {
  try {
    window.sessionStorage.setItem(DISMISS_KEY, '1');
  } catch {
    // ignore quota / private mode
  }
}

export function clearPwaUpdateDismissed(): void {
  try {
    window.sessionStorage.removeItem(DISMISS_KEY);
  } catch {
    // ignore
  }
}

export async function checkPwaUpdate(): Promise<PwaUpdateCheckResult> {
  if (!isPwaUpdateSupported()) return 'unsupported';

  const reg = registration ?? (await navigator.serviceWorker.ready);
  registration = reg;
  await reg.update().catch(() => {});
  applyIncomingWorker(reg);

  return updateAvailable ? 'available' : 'current';
}

export function reloadPwaApp(): void {
  const waiting = registration?.waiting;
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
}
