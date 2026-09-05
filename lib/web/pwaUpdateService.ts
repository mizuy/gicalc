import { fetchLiveAppVersion, getAppVersion } from './appVersion';
import {
  isPwaUpdateAvailable,
  RUNTIME_CACHE_NAMES,
  shouldOfferUpdateAfterControllerChange,
  SKIP_WAITING_MESSAGE,
  UPDATE_CHECK_TIMEOUT_MS,
} from './pwaUpdate';
import { shouldReportUpdateAvailable } from './pwaVersionCheck';

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

async function bustServiceWorkerScriptCache(reg: ServiceWorkerRegistration): Promise<void> {
  const swUrl = reg.waiting?.scriptURL ?? reg.installing?.scriptURL ?? reg.active?.scriptURL;
  if (!swUrl) return;

  try {
    await fetch(`${swUrl}?_=${Date.now()}`, { cache: 'no-store' });
  } catch {
    // ignore offline / blocked fetch
  }
}

async function clearRuntimeCaches(): Promise<void> {
  if (typeof caches === 'undefined') return;

  await Promise.all(RUNTIME_CACHE_NAMES.map((name) => caches.delete(name).catch(() => false)));
}

async function prepareForUpdateCheck(reg: ServiceWorkerRegistration): Promise<void> {
  await Promise.all([bustServiceWorkerScriptCache(reg), clearRuntimeCaches()]);
}

function waitForServiceWorkerUpdate(
  reg: ServiceWorkerRegistration,
  timeoutMs: number,
): Promise<boolean> {
  if (reg.waiting && navigator.serviceWorker.controller) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    let settled = false;

    const finish = (value: boolean) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      reg.removeEventListener('updatefound', onUpdateFound);
      resolve(value);
    };

    const inspect = () => {
      if (
        isPwaUpdateAvailable({
          hasController: Boolean(navigator.serviceWorker.controller),
          waiting: Boolean(reg.waiting),
          installingState: reg.installing?.state ?? reg.waiting?.state,
        })
      ) {
        finish(true);
      }
    };

    const watchWorker = (worker: ServiceWorker) => {
      worker.addEventListener('statechange', inspect);
    };

    const onUpdateFound = () => {
      if (reg.installing) watchWorker(reg.installing);
      inspect();
    };

    reg.addEventListener('updatefound', onUpdateFound);
    if (reg.installing) watchWorker(reg.installing);
    inspect();

    const timeout = window.setTimeout(() => finish(false), timeoutMs);
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

  await prepareForUpdateCheck(reg);

  const runningVersion = getAppVersion();
  const remoteVersion = await fetchLiveAppVersion();

  await reg.update().catch(() => {});

  if (shouldReportUpdateAvailable({ runningVersion, remoteVersion, swUpdateDetected: false })) {
    markAvailable();
    void waitForServiceWorkerUpdate(reg, UPDATE_CHECK_TIMEOUT_MS).then(() => applyIncomingWorker(reg));
    return 'available';
  }

  const swDetected = await waitForServiceWorkerUpdate(reg, UPDATE_CHECK_TIMEOUT_MS);
  applyIncomingWorker(reg);

  const available = shouldReportUpdateAvailable({
    runningVersion,
    remoteVersion,
    swUpdateDetected: swDetected || updateAvailable,
  });

  if (available) {
    markAvailable();
    return 'available';
  }

  return 'current';
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
  void clearRuntimeCaches().finally(() => {
    window.location.reload();
  });
}
