import { DEFAULT_LOCALE, isLocale, LOCALE_STORAGE_KEY, type Locale } from './types';

function readWebLocale(): Locale | null {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return null;
  }
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(stored) ? stored : null;
  } catch {
    return null;
  }
}

function writeWebLocale(locale: Locale): void {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Private mode or blocked storage — keep the in-memory locale only.
  }
}

export function readStoredLocale(): Locale {
  return readWebLocale() ?? DEFAULT_LOCALE;
}

export function writeStoredLocale(locale: Locale): void {
  writeWebLocale(locale);
}

export async function hydrateStoredLocale(): Promise<Locale> {
  return readStoredLocale();
}
