export const REPORT_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdogXJeNGD_VGmqRhi-XR83a3HWQAFLl4XMeVVb3a6-9Ww21w/viewform';

const TARGET_PAGE_FIELD = 'entry.503972996';
const ENVIRONMENT_FIELD = 'entry.1136097801';

type ReportFormParams = {
  pageTitle: string;
  pageUrl?: string;
  appVersion: string;
  userAgent?: string;
};

function browserLabel(userAgent: string): string {
  const browsers: Array<[RegExp, string]> = [
    [/\bEdg(?:A|iOS)?\/([\d.]+)/, 'Edge'],
    [/\bOPR\/([\d.]+)/, 'Opera'],
    [/\bSamsungBrowser\/([\d.]+)/, 'Samsung Internet'],
    [/\b(?:Chrome|CriOS)\/([\d.]+)/, 'Chrome'],
    [/\b(?:Firefox|FxiOS)\/([\d.]+)/, 'Firefox'],
    [/\bVersion\/([\d.]+).*\bSafari\//, 'Safari'],
  ];

  for (const [pattern, name] of browsers) {
    const match = userAgent.match(pattern);
    if (match?.[1]) return `${name} ${match[1]}`;
  }
  return userAgent || 'Unknown browser';
}

function osLabel(userAgent: string): string | null {
  const android = userAgent.match(/\bAndroid\s+([\d.]+)/);
  if (android?.[1]) return `Android ${android[1]}`;

  const ios = userAgent.match(/\b(?:iPhone )?OS\s+([\d_]+)/);
  if (ios?.[1] && /iPhone|iPad|iPod/.test(userAgent)) return `iOS ${ios[1].replaceAll('_', '.')}`;

  const windows = userAgent.match(/\bWindows NT\s+([\d.]+)/);
  if (windows?.[1]) return `Windows ${windows[1]}`;

  const mac = userAgent.match(/\bMac OS X\s+([\d_]+)/);
  if (mac?.[1]) return `macOS ${mac[1].replaceAll('_', '.')}`;

  if (/\bLinux\b/.test(userAgent)) return 'Linux';
  return null;
}

export function reportEnvironment(appVersion: string, userAgent = ''): string {
  const environment = [`GI Calc ${appVersion}`, browserLabel(userAgent)];
  const os = osLabel(userAgent);
  if (os) environment.push(os);
  return environment.join(' / ');
}

export function buildReportFormUrl({
  pageTitle,
  pageUrl,
  appVersion,
  userAgent = '',
}: ReportFormParams): string {
  const url = new URL(REPORT_FORM_URL);
  url.searchParams.set('usp', 'pp_url');
  url.searchParams.set(TARGET_PAGE_FIELD, pageUrl ? `${pageTitle} — ${pageUrl}` : pageTitle);
  url.searchParams.set(ENVIRONMENT_FIELD, reportEnvironment(appVersion, userAgent));
  return url.toString();
}
