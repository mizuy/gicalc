const rawBaseUrl = process.env.EXPO_PUBLIC_BASE_URL ?? '';
const baseUrl = !rawBaseUrl || rawBaseUrl === '/' ? '' : rawBaseUrl.replace(/\/$/, '');

module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{js,html,css,ttf,ico,png,jpg,jpeg,json,svg,woff,woff2}'],
  swDest: 'dist/sw.js',
  clientsClaim: true,
  skipWaiting: false,
  ...(baseUrl
    ? {
        modifyURLPrefix: {
          '': `${baseUrl}/`,
        },
      }
    : {}),
};
