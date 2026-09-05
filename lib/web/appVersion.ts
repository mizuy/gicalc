import Constants from 'expo-constants';

import { publicPath } from './baseUrl';

export function getAppVersion(): string {
  return process.env.EXPO_PUBLIC_APP_VERSION ?? Constants.expoConfig?.version ?? '0.0.0';
}

export async function fetchLiveAppVersion(): Promise<string | null> {
  if (typeof fetch === 'undefined') return null;

  try {
    const url = `${publicPath('/version.json')}?_=${Date.now()}`;
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    });
    if (!response.ok) return null;

    const payload = (await response.json()) as { version?: unknown };
    return typeof payload.version === 'string' ? payload.version : null;
  } catch {
    return null;
  }
}
