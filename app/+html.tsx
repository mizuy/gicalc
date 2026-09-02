import { ScrollViewStyleReset } from 'expo-router/html';
import type { ReactNode } from 'react';

import { publicPath } from '../lib/web/baseUrl';

const manifestHref = publicPath('/manifest.json');
const iconHref = publicPath('/logo192.png');
const swHref = publicPath('/sw.js');

export default function Root({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <title>GI Calc</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#0D7377" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="gicalc" />
        <meta
          name="description"
          content="消化管内視鏡向けスコアリング・予測ツール（T1 Nomogram / eCura / BEST-J）"
        />
        <link rel="manifest" href={manifestHref} />
        <link rel="apple-touch-icon" href={iconHref} />
        <link rel="icon" href={iconHref} />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
try {
  var storedLocale = window.localStorage.getItem('gicalc.locale');
  if (storedLocale === 'en' || storedLocale === 'ja') {
    document.documentElement.lang = storedLocale;
  }
} catch (e) {}
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register(${JSON.stringify(swHref)}).catch(function () {});
  });
}
`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
body {
  background-color: #F4F8F8;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #0F1718;
  }
}`;
