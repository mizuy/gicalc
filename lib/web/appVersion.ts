import Constants from 'expo-constants';

export function getAppVersion(): string {
  return Constants.expoConfig?.version ?? '0.0.0';
}
