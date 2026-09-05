const rawBaseUrl = process.env.EXPO_PUBLIC_BASE_URL ?? '';
const baseUrl = !rawBaseUrl || rawBaseUrl === '/' ? '' : rawBaseUrl.replace(/\/$/, '');

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildPageUrlPattern() {
  if (!baseUrl) {
    return /\.html$/;
  }

  const prefix = escapeRegExp(baseUrl);
  const staticAsset = '(?:_expo|assets|figures|sw\\.js|workbox-|manifest\\.json|version\\.json|logo\\d+\\.png|favicon\\.ico)';
  return new RegExp(`^${prefix}(?:/)?(?:$|/(?!${staticAsset})[^?#]+/?$|/.*\\.html$)`);
}

const pageUrlPattern = buildPageUrlPattern();

module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{js,css,ttf,ico,png,jpg,jpeg,webp,json,svg,woff,woff2}'],
  globIgnores: ['**/*.html'],
  swDest: 'dist/sw.js',
  clientsClaim: true,
  skipWaiting: false,
  runtimeCaching: [
    {
      urlPattern: /\/version\.json$/,
      handler: 'NetworkOnly',
    },
    {
      urlPattern: pageUrlPattern,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'gicalc-pages',
        networkTimeoutSeconds: 4,
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /\/_expo\/static\/js\/web\/entry-[^/]+\.js$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'gicalc-entry-js',
        networkTimeoutSeconds: 4,
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        },
      },
    },
  ],
  ...(baseUrl
    ? {
        modifyURLPrefix: {
          '': `${baseUrl}/`,
        },
      }
    : {}),
};
