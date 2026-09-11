import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEFAULT_LOCALE, isLocale, LOCALE_STORAGE_KEY, type Locale } from './types';

let memoryLocale: Locale | null = null;

export function readStoredLocale(): Locale {
  return memoryLocale ?? DEFAULT_LOCALE;
}

export function writeStoredLocale(locale: Locale): void {
  memoryLocale = locale;
  void AsyncStorage.setItem(LOCALE_STORAGE_KEY, locale).catch(() => undefined);
}

export async function hydrateStoredLocale(): Promise<Locale> {
  try {
    const stored = await AsyncStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(stored)) {
      memoryLocale = stored;
      return stored;
    }
  } catch {
    // Ignore missing native storage.
  }
  return memoryLocale ?? DEFAULT_LOCALE;
}
