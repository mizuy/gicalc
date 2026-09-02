export type Locale = 'ja' | 'en';

export const LOCALES: Locale[] = ['ja', 'en'];
export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_STORAGE_KEY = 'gicalc.locale';

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'ja' || value === 'en';
}
