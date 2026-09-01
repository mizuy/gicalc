export function getPublicBaseUrl(): string {
  const raw = process.env.EXPO_PUBLIC_BASE_URL ?? '';
  if (!raw || raw === '/') return '';
  return raw.endsWith('/') ? raw.slice(0, -1) : raw;
}

export function publicPath(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${getPublicBaseUrl()}${normalized}`;
}
