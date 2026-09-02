import type { ScoreCategory, ScoreOrgan } from '../../types/score';
import type { Locale } from './types';

export type UiStrings = {
  tabs: { scores: string; about: string };
  back: string;
  homeLead: string;
  reference: string;
  source: string;
  original: string;
  note: string;
  reset: string;
  resultPlaceholder: string;
  footnote: string;
  missingTitle: string;
  missingBody: string;
  notFoundTitle: string;
  notFoundBody: string;
  notFoundLink: string;
  languageJa: string;
  languageEn: string;
  organ: Record<ScoreOrgan, string>;
  category: Record<ScoreCategory, string>;
  pwa: {
    title: string;
    installHint: string;
    manualHint: string;
    install: string;
    close: string;
  };
  about: {
    intro: string;
    tools: string;
    esophagus: string;
    esophagusBody: string;
    stomach: string;
    stomachBody: string;
    colorectum: string;
    colorectumBody: string;
    bleeding: string;
    bleedingBody: string;
    pwaTitle: string;
    pwaIos: string;
    pwaAndroid: string;
    pwaBanner: string;
    disclaimer: string;
    disclaimerBody: string;
    disclaimerGuide: string;
  };
};

export const UI: Record<Locale, UiStrings> = {
  ja: {
    tabs: { scores: 'スコア一覧', about: 'About' },
    back: '戻る',
    homeLead: '消化管内視鏡向けのスコア、臨床尺度、内視鏡分類。食道、胃、大腸、出血の順です。',
    reference: '文献',
    source: '出典',
    original: '原著',
    note: '注',
    reset: 'リセット',
    resultPlaceholder: 'すべての項目を選択すると結果が表示されます',
    footnote: '診断支援です。最新ガイドラインと施設プロトコルに従って判断してください。',
    missingTitle: '未登録',
    missingBody: '指定されたスコアは見つかりません。',
    notFoundTitle: 'ページが見つかりません',
    notFoundBody: 'この画面は存在しません。',
    notFoundLink: 'スコア一覧へ戻る',
    languageJa: '日本語',
    languageEn: 'English',
    organ: {
      esophagus: '食道',
      stomach: '胃',
      colorectum: '大腸',
      bleeding: '出血',
    },
    category: {
      screening: '大腸がん検診',
      classification: '内視鏡分類',
      't1-colorectal': '大腸T1癌',
      prep: '腸管前処置',
      gastric: '早期胃癌',
      gastritis: '胃炎・胃癌リスク',
      bleeding: '消化管出血',
    },
    pwa: {
      title: 'ホーム画面に追加（PWA）',
      installHint: 'ブラウザからインストールすると、アプリのように使えます。',
      manualHint:
        'Safari: 共有 → 「ホーム画面に追加」 / Chrome: メニュー → 「アプリをインストール」または「ホーム画面に追加」',
      install: 'インストール',
      close: '閉じる',
    },
    about: {
      intro:
        '消化管内視鏡臨床医向けのスコア・予測・内視鏡分類ツールです。ブラウザとPWAで利用でき、App Storeは不要です。追加は data/scores/ に定義ファイルを足すだけです。',
      tools: '収録ツール',
      esophagus: '食道',
      esophagusBody: 'JES（Oyama 2017）: Type A / B1 / B2 / B3。原著の図と定義文。文献は PubMed に飛びます。',
      stomach: '胃',
      stomachBody:
        '木村–竹本（萎縮分類）、京都 / 改変京都 / EGGIM（胃炎リスク）、eCura / Sekiguchi（LNM）、BEST-J（ESD後出血）。',
      colorectum: '大腸',
      colorectumBody:
        'APCS（検診）、Paris（肉眼型）、LST（側方発育）、工藤–鶴田（pit pattern）、JNET（NBI拡大分類）、T1 Nomogram（Kajiwara）、BBPS / Aronchick（前処置）。',
      bleeding: '出血',
      bleedingBody: '上部は GBS（Blatchford 2000）、下部は NOBLADS（Aoki 2016）。',
      pwaTitle: 'PWA インストール手順',
      pwaIos: 'iPhone / iPad（Safari）: 共有ボタン → 「ホーム画面に追加」',
      pwaAndroid: 'Android（Chrome）: メニュー → 「アプリをインストール」または「ホーム画面に追加」',
      pwaBanner: '対応ブラウザではホーム画面のインストールバナーからも追加できます。',
      disclaimer: '免責事項',
      disclaimerBody: '本ツールは診断支援用であり、医師の臨床判断を代替するものではありません。',
      disclaimerGuide: 'スコア・ノモグラムの解釈は最新のJSCCR/JGESガイドラインと施設プロトコルに従ってください。',
    },
  },
  en: {
    tabs: { scores: 'Scores', about: 'About' },
    back: 'Back',
    homeLead:
      'Scores, clinical scales, and endoscopic classifications for GI endoscopy. Listed as esophagus, stomach, colorectum, then bleeding.',
    reference: 'Reference',
    source: 'Source',
    original: 'Original',
    note: 'Note',
    reset: 'Reset',
    resultPlaceholder: 'Select every item to see the result',
    footnote: 'Decision support only. Follow current guidelines and local protocols.',
    missingTitle: 'Not found',
    missingBody: 'This score is not registered.',
    notFoundTitle: 'Page not found',
    notFoundBody: 'This screen does not exist.',
    notFoundLink: 'Back to scores',
    languageJa: '日本語',
    languageEn: 'English',
    organ: {
      esophagus: 'Esophagus',
      stomach: 'Stomach',
      colorectum: 'Colorectum',
      bleeding: 'Bleeding',
    },
    category: {
      screening: 'CRC screening',
      classification: 'Classification',
      't1-colorectal': 'T1 colorectal',
      prep: 'Bowel prep',
      gastric: 'Early gastric ca',
      gastritis: 'Gastritis risk',
      bleeding: 'GI bleeding',
    },
    pwa: {
      title: 'Add to Home Screen (PWA)',
      installHint: 'Install from the browser to use it like an app.',
      manualHint:
        'Safari: Share → Add to Home Screen / Chrome: Menu → Install app or Add to Home Screen',
      install: 'Install',
      close: 'Close',
    },
    about: {
      intro:
        'Scoring, prediction, and endoscopic classification tools for GI endoscopists. Use it in the browser or as a PWA — no App Store needed. Add a definition file under data/scores/ to include a new tool.',
      tools: 'Included tools',
      esophagus: 'Esophagus',
      esophagusBody:
        'JES (Oyama 2017): Type A / B1 / B2 / B3. Original figures and wording. Citations open PubMed.',
      stomach: 'Stomach',
      stomachBody:
        'Kimura–Takemoto (atrophy), Kyoto / modified Kyoto / EGGIM (gastritis risk), eCura / Sekiguchi (LNM), BEST-J (post-ESD bleeding).',
      colorectum: 'Colorectum',
      colorectumBody:
        'APCS (screening), Paris (morphology), LST (laterally spreading), Kudo–Tsuruta (pit pattern), JNET (NBI magnifying), T1 Nomogram (Kajiwara), BBPS / Aronchick (bowel prep).',
      bleeding: 'Bleeding',
      bleedingBody: 'Upper GI: GBS (Blatchford 2000). Lower GI: NOBLADS (Aoki 2016).',
      pwaTitle: 'PWA install',
      pwaIos: 'iPhone / iPad (Safari): Share → Add to Home Screen',
      pwaAndroid: 'Android (Chrome): Menu → Install app or Add to Home Screen',
      pwaBanner: 'Supported browsers may also show an install banner on the home screen.',
      disclaimer: 'Disclaimer',
      disclaimerBody: 'This tool is for decision support and does not replace clinical judgment.',
      disclaimerGuide:
        'Interpret scores and nomograms according to current JSCCR/JGES guidelines and local protocols.',
    },
  },
};
