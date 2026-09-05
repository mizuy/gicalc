const rawBaseUrl = process.env.EXPO_PUBLIC_BASE_URL ?? '';
const baseUrl = rawBaseUrl === '/' ? '' : rawBaseUrl.replace(/\/$/, '');

module.exports = {
  expo: {
    name: 'GI Calc',
    slug: 'gicalc',
    version: '1.0.4',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'gicalc',
    userInterfaceStyle: 'automatic',
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        backgroundColor: '#0D7377',
        foregroundImage: './assets/images/android-icon-foreground.png',
        backgroundImage: './assets/images/android-icon-background.png',
        monochromeImage: './assets/images/android-icon-monochrome.png',
      },
      predictiveBackGestureEnabled: false,
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
      name: 'GI Calc',
      shortName: 'gicalc',
      description: 'GI endoscopy scores, predictions, and classifications (T1 Nomogram / eCura / BEST-J)',
      themeColor: '#0D7377',
      backgroundColor: '#F4F8F8',
      display: 'standalone',
      lang: 'en',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          resizeMode: 'contain',
          backgroundColor: '#0D7377',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      ...(baseUrl ? { baseUrl } : {}),
    },
  },
};
