import type { DuodenumSite, ListClinicalPhase, ListNavCategory, ScoreCategory, ScoreOrgan } from '../../types/score';
import type { Locale } from './types';

export type UiStrings = {
  tabs: { scores: string; about: string };
  back: string;
  listPhase: Record<ListClinicalPhase, string>;
  duodenumSite: Record<DuodenumSite, string>;
  reference: string;
  source: string;
  license: string;
  original: string;
  note: string;
  reset: string;
  algorithmFlow: string;
  algorithmNext: string;
  algorithmDiagnosis: string;
  algorithmHint: string;
  totalPoints: string;
  enlargeHint: string;
  openFigure: string;
  closeFigure: string;
  figureLoadError: string;
  secondarySourceFigure: string;
  resultPlaceholder: string;
  footnote: string;
  reportIssue: string;
  reportPrivacyNote: string;
  missingTitle: string;
  missingBody: string;
  notFoundTitle: string;
  notFoundBody: string;
  notFoundLink: string;
  languageJa: string;
  languageEn: string;
  variantTabModified: string;
  variantTabOriginal: string;
  relatedScores: string;
  japanDeveloped: string;
  organ: Record<ScoreOrgan, string>;
  navCategory: Record<ListNavCategory, string>;
  category: Record<ScoreCategory, string>;
  pwa: {
    title: string;
    installHint: string;
    manualHint: string;
    install: string;
    close: string;
    updateAvailable: string;
    updatePreparing: string;
    reload: string;
    later: string;
    checkUpdate: string;
    checking: string;
    upToDate: string;
  };
  about: {
    intro: string;
    pwaTitle: string;
    pwaIos: string;
    pwaAndroid: string;
    pwaBanner: string;
    pwaUpdate: string;
    versionLabel: string;
    citationsTitle: string;
    citationsIntro: string;
    citationsCc: string;
    citationsCcBody: string;
    citationsNotCc: string;
    citationsNotCcBody: string;
    disclaimer: string;
    disclaimerBody: string;
    disclaimerGuide: string;
  };
};

export const UI: Record<Locale, UiStrings> = {
  ja: {
    tabs: { scores: 'ホーム', about: 'About' },
    back: '戻る',
    listPhase: {
      screening: 'スクリーニング',
      examination: '検査',
      'background-mucosa': '背景粘膜',
      diagnosis: '診断',
      treatment: '治療',
    },
    duodenumSite: {
      'non-ampullary': '非乳頭部',
      ampulla: '乳頭部',
    },
    reference: '文献',
    source: '出典',
    license: 'ライセンス',
    original: '原著',
    note: '注',
    reset: 'リセット',
    algorithmFlow: 'アルゴリズム',
    algorithmNext: '次の判定',
    algorithmDiagnosis: '診断',
    algorithmHint: '選択すると経路が強調され、次の判定が出ます。すべて選ぶと診断が出ます。',
    totalPoints: '合計点',
    enlargeHint: 'タップして拡大',
    openFigure: '図を開く',
    closeFigure: '閉じる',
    figureLoadError: '画像を読み込めませんでした',
    secondarySourceFigure: '参考図（別文献）',
    resultPlaceholder: 'すべての項目を選択すると結果が表示されます',
    footnote:
      '診断支援です。最新ガイドラインと施設プロトコルに従って判断してください。分類の定義・用語は原著の言語で表示します（英語原著は英語、日本語原著は日本語）。注釈（コメント）は日本語です。',
    reportIssue: '不具合・その他を報告',
    reportPrivacyNote: '患者を識別できる情報や患者画像は入力しないでください。',
    missingTitle: '未登録',
    missingBody: '指定されたスコアは見つかりません。',
    notFoundTitle: 'ページが見つかりません',
    notFoundBody: 'この画面は存在しません。',
    notFoundLink: 'ホームへ戻る',
    languageJa: '日本語',
    languageEn: 'English',
    variantTabModified: '改変版',
    variantTabOriginal: '原法',
    relatedScores: '関連ツール',
    japanDeveloped: '日本で開発',
    organ: {
      esophagus: '食道',
      stomach: '胃',
      duodenum: '十二指腸',
      colorectum: '大腸',
      bleeding: '出血',
    },
    navCategory: {
      esophagus: '食道',
      stomach: '胃',
      duodenum: '十二指腸',
      colorectum: '大腸',
      pathology: '病理',
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
      updateAvailable: '新しい版があります',
      updatePreparing: '更新を準備中…',
      reload: '再読み込み',
      later: '後で',
      checkUpdate: '更新を確認',
      checking: '確認中…',
      upToDate: '最新版です',
    },
    about: {
      intro: '消化管内視鏡臨床医向けのスコア・予測・内視鏡分類ツールです。ブラウザまたはPWAで利用できます。',
      pwaTitle: 'PWA インストール手順',
      pwaIos: 'iPhone / iPad（Safari）: 共有ボタン → 「ホーム画面に追加」',
      pwaAndroid: 'Android（Chrome）: メニュー → 「アプリをインストール」または「ホーム画面に追加」',
      pwaBanner: '対応ブラウザではホーム画面のインストールバナーからも追加できます。',
      pwaUpdate:
        '新しい版があるときは画面上部にバナーが出ます。「再読み込み」を押すと最新になります。About のバージョン番号と「更新を確認」で、手元の版を確認できます。',
      versionLabel: 'バージョン',
      citationsTitle: '引用とライセンス',
      citationsIntro:
        '図と原著のライセンスは、出版社ページと Crossref の表記で確認した。Creative Commons のものは下に書き、そうでないものはリストにした。',
      citationsCc: 'Creative Commons のソース',
      citationsCcBody:
        /* origin/main の最新コピーを下で採用するため、旧コピーをコメントアウト。
        '• JES（Oyama 2017, Esophagus）の図: CC BY 4.0（各型に切り抜きを掲載）\n• 食道癌取扱い規約第11版（2017, Esophagus）の Siewert / 西分類の図: CC BY 4.0\n• EREFS の図（Abe 2022, Diagnostics Fig. 2）: CC BY 4.0（各所見に切り抜きを掲載）\n• 食道静脈瘤の形態 F1–F3（Pall 2023, Diagnostics Fig. 1）: CC BY 4.0\n• 食道静脈瘤の F / C / RC 等級（Kim 2024, Korean J Helicobacter Up Gastrointest Res Fig. 1）: CC BY-NC 4.0\n• 食道静脈瘤の発赤所見（Nagashima 2022, Healthcare Fig. 2）: CC BY 4.0\n• Hill の図（Ge 2023, Ann Med Fig. 1）: CC BY-NC 4.0（各 grade に切り抜きを掲載）\n• Forrest の図（Zhou 2025, J South Med Univ Fig. 1）: CC BY-NC-ND 4.0（改変・切り抜きなしで原図全体を掲載）\n• MESDA-G（Muto 2016, Dig Endosc）の Fig. 13: CC BY-NC-ND 4.0（Fig. 1 は画面のフローチャートと同じなので埋め込まず原著へリンク）\n• 木村–竹本の図（Quach 2019, Clin Endosc Fig. 2）: CC BY-NC 3.0\n• Paris の図（Kim 2025, Clin Endosc Fig. 2）: CC BY-NC 4.0（Johnson 2023 Can J Surg は CC BY-NC-ND 4.0）\n• LST の図（Kim 2025, Clin Endosc Fig. 3）: CC BY-NC 4.0（各亜型に切り抜きを掲載。Castillo-Regalado 2022 WJGE は CC BY-NC 4.0）\n• 虫垂開口部 Type 分類の図（Oung 2020, Endosc Int Open Fig. 2）: CC BY-NC-ND 4.0（改変・切り抜きなしで原図全体を掲載。Jacob 2016 Endoscopy 原著は CC ではない）\n• BEST-J（Hatta 2021, Gut）: CC BY-NC 4.0\n• NICE teaching 図（Hamada 2021, BMC Gastroenterol Fig. 1）: CC BY 4.0（各 Type に切り抜き。原図は埋め込まずリンク）\n• BBPS 区域スコア例（Kim 2024, Sci Rep Fig. 1）: CC BY 4.0（Lai 2009 原著 Fig. 1 は Elsevier 著作権）\n• Aronchick（2000, GIE）: Crossref 上の Version of Record は CC BY-NC-ND 4.0（遅延公開）\n• Kakushima WLI スコア（Kakushima 2017, Endosc Int Open Table 2）: CC BY-NC-ND 4.0（表は HTML のため埋め込まず Table 2 へリンク）\n• SPS 診断基準対照表（McWhinney 2023, Endosc Int Open Table 1）: CC BY-NC-ND 4.0（表は HTML のため埋め込まず Table 1 へリンク）\n• 大腸 EC 分類（Misawa 2021, Clin Endosc Fig. 2–3）: CC BY-NC 3.0（各型に切り抜きを掲載）\n• JNET 参考図（Ahmed 2024, DEN Open Fig. 1）: CC BY 4.0（Sano 2016 原著図ではない）\n• ESD-F 参考図（Inada 2013, Gastroenterol Res Pract Fig. 1）: CC BY 3.0（Matsumoto 2010 原著図ではない）\n• Prague 参考図（Oyanagi 2022, DEN Open Fig. 5）: CC BY 4.0（Sharma 2006 原著図ではない）\n• Sarin 参考図（Acevedo 2019, World J Hepatol Fig. 1）: CC BY-NC 4.0（Sarin 1992 原著図ではない）',
      citationsNotCc: 'CC ではないソース',
      citationsNotCcBody:
        '• JNET（Sano 2016, Dig Endosc）: Wiley 標準著作権。図は埋め込まず、原著 Fig. 7 へリンクする\n• NICE（Hayashi 2013, GIE）: Elsevier 著作権。原著 Fig. 1 は埋め込まずリンクする（CC 図は Hamada 2021 の各 Type 切り抜き。複合図はリンク）\n• WASP（IJspeert 2016, Gut）: BMJ 著作権。図は埋め込まず、原著 Fig. 1 へリンクする\n• Prague（Sharma 2006, Gastroenterology）: Elsevier 著作権。図は埋め込まず、原著 Fig. 3 へリンクする\n• Siewert 原著（Siewert 1998, Br J Surg）: Wiley 著作権。図は埋め込まず、論文へリンクする（規約第11版の模式図は CC BY 4.0 で埋め込み）\n• 食道胃静脈瘤記載基準（Tajiri 2010, Dig Endosc）: Wiley 著作権。図は埋め込まず、論文へリンクする（F / C / RC の CC 図は Pall 2023・Kim 2024・Nagashima 2022 を埋め込み）\n• Sarin 原著（Sarin 1992, Hepatology）: Wiley 著作権。図は埋め込まず、論文へリンクする\n• LA 原著（Lundell 1999, Gut）: CC ではない。A–D 揃いの静止画は置かず、VideoGIE 2013（CC BY-NC-ND 4.0 の動画）へリンクする\n• 工藤–鶴田の原図（Tanaka 2004, Dig Endosc / Kudo 1996, GIE）: CC ではない。図は埋め込まず、Clin Endosc 2025 Fig. 4 へリンクする（記事自体は CC BY-NC、原図は許諾再掲）\n• Paris 原著（2003 GIE / 2005 Endoscopy）: CC ではない\n• LST 原著（Kudo 2008, GIE）: CC ではない\n• 京都（Shichijo 2017）/ 改変京都（Kawamura 2021）: Wiley、CC ではない\n• EGGIM（Pimentel-Nunes 2016, Endoscopy / Thieme）: CC ではない\n• eCura（Hatta 2017, AJG）: CC ではない\n• Sekiguchi（2016, J Gastroenterol）: CC ではない\n• APCS（Yeoh 2011, Gut）: CC ではない\n• BBPS（Lai 2009, GIE）: CC ではない（CC 図例は Kim 2024 Sci Rep Fig. 1 を埋め込み）\n• GBS（Blatchford 2000, Lancet）: CC ではない\n• NOBLADS（Aoki 2016, CGH）: CC ではない\n• T1 Nomogram（Kajiwara 2023, GIE）: CC ではない。図は埋め込まず、原著 Fig. 2 へリンクする\n• e-T2 Score（Koyama 2022, GIE）: CC ではない。図は埋め込まず、論文へリンクする\n• Spigelman（Spigelman 1989, Lancet）: CC ではない。点数表は GeneReviews Table 5 へリンクする\n• Modified Spigelman（Saurin 2004, JCO）: CC ではない。論文へリンクする\n• Ishii スコア（Ishii 2021, Dig Endosc）: CC ではない。論文へリンクする\n• Toya ME-CV / Kikuchi ME-NBI（Toya 2020 / Kikuchi 2014, Dig Endosc）: CC ではない。論文へリンクする\n• Vienna 分類（Schlemper 2000, Gut）: CC ではない。論文へリンクする\n• SPS 診断基準（Dekker 2020, Gastroenterology）: CC ではない。論文へリンクする\n• 大腸 EC 分類原著（Kudo 2011 Endoscopy / Kudo 2015 GIE）: CC ではない\n• ESD-F（Matsumoto 2010, Scand J Gastroenterol / Kim 2016, Intest Res）: CC ではない。Kim 2016 Fig. 1 は埋め込まずリンクする',
        */
        '• JES（Oyama 2017, Esophagus）の図: CC BY 4.0（各型に切り抜きを掲載）\n• 食道癌取扱い規約第11版（2017, Esophagus）の Siewert / 西分類の図: CC BY 4.0\n• EREFS の図（Abe 2022, Diagnostics Fig. 2）: CC BY 4.0（各所見に切り抜きを掲載）\n• GERD LA分類の図（Jung 2025, Korean J Helicobacter Up Gastrointest Res Fig. 1A–D）: CC BY-NC 4.0（各 Grade に切り抜きを掲載）\n• 食道静脈瘤の形態 F1–F3（Pall 2023, Diagnostics Fig. 1）: CC BY 4.0\n• 食道静脈瘤の F / C / RC 等級（Kim 2024, Korean J Helicobacter Up Gastrointest Res Fig. 1）: CC BY-NC 4.0\n• 食道静脈瘤の発赤所見（Nagashima 2022, Healthcare Fig. 2）: CC BY 4.0\n• Hill の図（Ge 2023, Ann Med Fig. 1）: CC BY-NC 4.0（各 grade に切り抜きを掲載）\n• Forrest の図（Zhou 2025, J South Med Univ Fig. 1）: CC BY-NC-ND 4.0（改変・切り抜きなしで原図全体を掲載）\n• MESDA-G の VS 分類例（Kurumi 2021, J Clin Med Fig. 5）: CC BY 4.0（MS / MV の各型に切り抜きを掲載。Muto 2016 原著は CC BY-NC-ND 4.0）\n• 木村–竹本の図（Quach 2019, Clin Endosc Fig. 2）: CC BY-NC 3.0\n• Paris の図（Kim 2025, Clin Endosc Fig. 2）: CC BY-NC 4.0（Johnson 2023 Can J Surg は CC BY-NC-ND 4.0）\n• LST の図（Kim 2025, Clin Endosc Fig. 3）: CC BY-NC 4.0（各亜型に切り抜きを掲載。Castillo-Regalado 2022 WJGE は CC BY-NC 4.0）\n• 虫垂開口部 Type 分類の図（Oung 2020, Endosc Int Open Fig. 2）: CC BY-NC-ND 4.0（改変・切り抜きなしで原図全体を掲載。Jacob 2016 Endoscopy 原著は CC ではない）\n• BEST-J（Hatta 2021, Gut）: CC BY-NC 4.0\n• NICE teaching 図（Hamada 2021, BMC Gastroenterol Fig. 1）: CC BY 4.0（各 Type に切り抜き。原図は埋め込まずリンク）\n• BBPS 区域スコア例（Kim 2024, Sci Rep Fig. 1）: CC BY 4.0（Lai 2009 原著 Fig. 1 は Elsevier 著作権）\n• Aronchick（2000, GIE）: Crossref 上の Version of Record は CC BY-NC-ND 4.0（遅延公開）\n• Kakushima WLI スコア（Kakushima 2017, Endosc Int Open Table 2）: CC BY-NC-ND 4.0（表は HTML のため埋め込まず Table 2 へリンク）\n• SPS 診断基準対照表（McWhinney 2023, Endosc Int Open Table 1）: CC BY-NC-ND 4.0（表は HTML のため埋め込まず Table 1 へリンク）\n• 大腸 EC 分類（Misawa 2021, Clin Endosc Fig. 2–3）: CC BY-NC 3.0（各型に切り抜きを掲載）',
      citationsNotCc: 'CC ではないソース',
      citationsNotCcBody:
        '• JNET（Sano 2016, Dig Endosc）: Wiley 標準著作権。図は埋め込まず、原著 Fig. 7 へリンクする\n• NICE（Hayashi 2013, GIE）: Elsevier 著作権。原著 Fig. 1 は埋め込まずリンクする（CC 図は Hamada 2021 の各 Type 切り抜き。複合図はリンク）\n• WASP（IJspeert 2016, Gut）: BMJ 著作権。図は埋め込まず、原著 Fig. 1 へリンクする\n• Prague（Sharma 2006, Gastroenterology）: Elsevier 著作権。図は埋め込まず、原著 Fig. 3 へリンクする\n• Siewert 原著（Siewert 1998, Br J Surg）: Wiley 著作権。図は埋め込まず、論文へリンクする（規約第11版の模式図は CC BY 4.0 で埋め込み）\n• 食道胃静脈瘤記載基準（Tajiri 2010, Dig Endosc）: Wiley 著作権。図は埋め込まず、論文へリンクする（F / C / RC の CC 図は Pall 2023・Kim 2024・Nagashima 2022 を埋め込み）\n• Sarin 原著（Sarin 1992, Hepatology）: Wiley 著作権。図は埋め込まず、論文へリンクする\n• LA 原著（Lundell 1999, Gut）: CC ではない（CC 図は Jung 2025 Fig. 1A–D の切り抜きを掲載）\n• 工藤–鶴田の原図（Tanaka 2004, Dig Endosc / Kudo 1996, GIE）: CC ではない。図は埋め込まず、Clin Endosc 2025 Fig. 4 へリンクする（記事自体は CC BY-NC、原図は許諾再掲）\n• Paris 原著（2003 GIE / 2005 Endoscopy）: CC ではない\n• LST 原著（Kudo 2008, GIE）: CC ではない\n• 京都（Shichijo 2017）/ 改変京都（Kawamura 2021）: Wiley、CC ではない\n• EGGIM（Pimentel-Nunes 2016, Endoscopy / Thieme）: CC ではない\n• eCura（Hatta 2017, AJG）: CC ではない\n• Sekiguchi（2016, J Gastroenterol）: CC ではない\n• APCS（Yeoh 2011, Gut）: CC ではない\n• BBPS（Lai 2009, GIE）: CC ではない（CC 図例は Kim 2024 Sci Rep Fig. 1 を埋め込み）\n• GBS（Blatchford 2000, Lancet）: CC ではない\n• NOBLADS（Aoki 2016, CGH）: CC ではない\n• T1 Nomogram（Kajiwara 2023, GIE）: CC ではない。図は埋め込まず、原著 Fig. 2 へリンクする\n• e-T2 Score（Koyama 2022, GIE）: CC ではない。図は埋め込まず、論文へリンクする\n• Spigelman（Spigelman 1989, Lancet）: CC ではない。点数表は GeneReviews Table 5 へリンクする\n• Modified Spigelman（Saurin 2004, JCO）: CC ではない。論文へリンクする\n• Ishii スコア（Ishii 2021, Dig Endosc）: CC ではない。論文へリンクする\n• Toya ME-CV / Kikuchi ME-NBI（Toya 2020 / Kikuchi 2014, Dig Endosc）: CC ではない。論文へリンクする\n• Vienna 分類（Schlemper 2000, Gut）: CC ではない。論文へリンクする\n• SPS 診断基準（Dekker 2020, Gastroenterology）: CC ではない。論文へリンクする\n• 大腸 EC 分類原著（Kudo 2011 Endoscopy / Kudo 2015 GIE）: CC ではない\n• ESD-F（Matsumoto 2010, Scand J Gastroenterol / Kim 2016, Intest Res）: CC ではない。図は埋め込まず、Kim 2016 Fig. 1 へリンクする',
      disclaimer: '免責事項',
      disclaimerBody: '本ツールは診断支援用であり、医師の臨床判断を代替するものではありません。',
      disclaimerGuide: 'スコア・ノモグラムの解釈は最新のJSCCR/JGESガイドラインと施設プロトコルに従ってください。',
    },
  },
  en: {
    tabs: { scores: 'Home', about: 'About' },
    back: 'Back',
    listPhase: {
      screening: 'Screening',
      examination: 'Examination',
      'background-mucosa': 'Background mucosa',
      diagnosis: 'Diagnosis',
      treatment: 'Treatment',
    },
    duodenumSite: {
      'non-ampullary': 'Non-ampullary',
      ampulla: 'Ampulla',
    },
    reference: 'Reference',
    source: 'Source',
    license: 'License',
    original: 'Original',
    note: 'Note',
    reset: 'Reset',
    algorithmFlow: 'Algorithm',
    algorithmNext: 'Next step',
    algorithmDiagnosis: 'Diagnosis',
    algorithmHint: 'Tap a choice to highlight the path and see the next step. The diagnosis appears after every step is chosen.',
    totalPoints: 'Total points',
    enlargeHint: 'Tap to enlarge',
    openFigure: 'Open figure',
    closeFigure: 'Close',
    figureLoadError: 'Image unavailable',
    secondarySourceFigure: 'REFERENCE FIGURE (SECONDARY SOURCE)',
    resultPlaceholder: 'Select every item to see the result',
    footnote:
      'Decision support only. Follow current guidelines and local protocols. Classification definitions and terminology follow the original publication language.',
    reportIssue: 'Report an issue or feedback',
    reportPrivacyNote: 'Do not enter identifiable patient information or patient images.',
    missingTitle: 'Not found',
    missingBody: 'This score is not registered.',
    notFoundTitle: 'Page not found',
    notFoundBody: 'This screen does not exist.',
    notFoundLink: 'Back to home',
    languageJa: '日本語',
    languageEn: 'English',
    variantTabModified: 'Modified',
    variantTabOriginal: 'Original',
    relatedScores: 'Related tools',
    japanDeveloped: 'Japan-developed',
    organ: {
      esophagus: 'Esophagus',
      stomach: 'Stomach',
      duodenum: 'Duodenum',
      colorectum: 'Colorectum',
      bleeding: 'Bleeding',
    },
    navCategory: {
      esophagus: 'Esophagus',
      stomach: 'Stomach',
      duodenum: 'Duodenum',
      colorectum: 'Colorectum',
      pathology: 'Pathology',
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
      updateAvailable: 'A new version is available',
      updatePreparing: 'Preparing update…',
      reload: 'Reload',
      later: 'Later',
      checkUpdate: 'Check for updates',
      checking: 'Checking…',
      upToDate: 'You have the latest version',
    },
    about: {
      intro:
        'Scoring, prediction, and endoscopic classification tools for GI endoscopists, available in the browser or as a PWA.',
      pwaTitle: 'PWA install',
      pwaIos: 'iPhone / iPad (Safari): Share → Add to Home Screen',
      pwaAndroid: 'Android (Chrome): Menu → Install app or Add to Home Screen',
      pwaBanner: 'Supported browsers may also show an install banner on the home screen.',
      pwaUpdate:
        'When a new version is available, a banner appears at the top. Tap Reload to apply it. Check the version number and tap Check for updates on this About screen to verify what you are running.',
      versionLabel: 'Version',
      citationsTitle: 'Citations and licenses',
      citationsIntro:
        'Figure and paper licenses were checked against publisher pages and Crossref. Creative Commons sources are listed first; sources that are not CC follow.',
      citationsCc: 'Creative Commons sources',
      citationsCcBody:
        /* Keep the newer origin/main citation copy below; disable the older branch copy.
        '• JES figures (Oyama 2017, Esophagus): CC BY 4.0 (crops placed on each type)\n• Siewert / Nishi figures in the Japanese Classification of Esophageal Cancer, 11th ed. (2017, Esophagus): CC BY 4.0\n• EREFS figure (Abe 2022, Diagnostics Fig. 2): CC BY 4.0 (crops placed on each finding)\n• Esophageal variceal form F1–F3 (Pall 2023, Diagnostics Fig. 1): CC BY 4.0\n• Esophageal variceal F / C / RC grades (Kim 2024, Korean J Helicobacter Up Gastrointest Res Fig. 1): CC BY-NC 4.0\n• Esophageal variceal red-color signs (Nagashima 2022, Healthcare Fig. 2): CC BY 4.0\n• Hill figure (Ge 2023, Ann Med Fig. 1): CC BY-NC 4.0 (crops placed on each grade)\n• Forrest figure (Zhou 2025, J South Med Univ Fig. 1): CC BY-NC-ND 4.0 (the full original is shown without alteration or cropping)\n• MESDA-G Fig. 13 (Muto 2016, Dig Endosc): CC BY-NC-ND 4.0 (Fig. 1 is the same algorithm as the on-screen flowchart, so it is not hosted — link to the paper)\n• Kimura–Takemoto figure (Quach 2019, Clin Endosc Fig. 2): CC BY-NC 3.0\n• Paris figure (Kim 2025, Clin Endosc Fig. 2): CC BY-NC 4.0 (Johnson 2023 Can J Surg is CC BY-NC-ND 4.0)\n• LST figure (Kim 2025, Clin Endosc Fig. 3): CC BY-NC 4.0 (crops placed on each subtype; Castillo-Regalado 2022 WJGE is CC BY-NC 4.0)\n• Appendiceal orifice type figure (Oung 2020, Endosc Int Open Fig. 2): CC BY-NC-ND 4.0 (the full original is shown without alteration or cropping; Jacob 2016 Endoscopy original is not CC)\n• BEST-J (Hatta 2021, Gut): CC BY-NC 4.0\n• NICE teaching figure (Hamada 2021, BMC Gastroenterol Fig. 1): CC BY 4.0 (crops on each Type; the composite is not embedded — link only)\n• BBPS segment-score examples (Kim 2024, Sci Rep Fig. 1): CC BY 4.0 (Lai 2009 original Fig. 1 is Elsevier copyright)\n• Aronchick (2000, GIE): Crossref Version of Record is CC BY-NC-ND 4.0 (delayed OA)\n• Kakushima WLI score (Kakushima 2017, Endosc Int Open Table 2): CC BY-NC-ND 4.0 (HTML table — link to Table 2, not hosted)\n• SPS criteria comparison table (McWhinney 2023, Endosc Int Open Table 1): CC BY-NC-ND 4.0 (HTML table — link to Table 1, not hosted)\n• Colorectal EC classification (Misawa 2021, Clin Endosc Fig. 2–3): CC BY-NC 3.0 (crops placed on each type)\n• JNET reference figure (Ahmed 2024, DEN Open Fig. 1): CC BY 4.0 (not the Sano 2016 original)\n• ESD-F reference figure (Inada 2013, Gastroenterol Res Pract Fig. 1): CC BY 3.0 (not the Matsumoto 2010 original)\n• Prague reference figure (Oyanagi 2022, DEN Open Fig. 5): CC BY 4.0 (not the Sharma 2006 original)\n• Sarin reference figure (Acevedo 2019, World J Hepatol Fig. 1): CC BY-NC 4.0 (not the Sarin 1992 original)',
      citationsNotCc: 'Sources that are not Creative Commons',
      citationsNotCcBody:
        '• JNET (Sano 2016, Dig Endosc): Wiley standard copyright; not CC. Figure is not hosted — link to original Fig. 7\n• NICE (Hayashi 2013, GIE): Elsevier copyright; not CC. Original Fig. 1 is not hosted — link only (CC figures: Hamada 2021 crops on each Type; the composite is not hosted — link only)\n• WASP (IJspeert 2016, Gut): BMJ copyright; not CC. Figure is not hosted — link to original Fig. 1\n• Prague (Sharma 2006, Gastroenterology): Elsevier copyright; not CC. Figure is not hosted — link to original Fig. 3\n• Siewert original (Siewert 1998, Br J Surg): Wiley copyright; not CC. Figure is not hosted — link to the paper (the 11th-edition schematics are hosted under CC BY 4.0)\n• Esophagogastric varices rules (Tajiri 2010, Dig Endosc): Wiley copyright; not CC. Figure is not hosted — link to the paper (CC figures for F / C / RC are hosted from Pall 2023, Kim 2024, and Nagashima 2022)\n• Sarin original (Sarin 1992, Hepatology): Wiley copyright; not CC. Figure is not hosted — link to the paper\n• LA original (Lundell 1999, Gut): not CC. No complete A–D still panel is hosted — link to VideoGIE 2013 (CC BY-NC-ND 4.0 video)\n• Kudo–Tsuruta originals (Tanaka 2004, Dig Endosc / Kudo 1996, GIE): not CC. Figure is not hosted — link to Clin Endosc 2025 Fig. 4 (review article is CC BY-NC; the figure is a permission reprint)\n• Paris originals (2003 GIE / 2005 Endoscopy): not CC\n• LST original (Kudo 2008, GIE): not CC\n• Kyoto (Shichijo 2017) / modified Kyoto (Kawamura 2021): Wiley; not CC\n• EGGIM (Pimentel-Nunes 2016, Endoscopy / Thieme): not CC\n• eCura (Hatta 2017, AJG): not CC\n• Sekiguchi (2016, J Gastroenterol): not CC\n• APCS (Yeoh 2011, Gut): not CC\n• BBPS (Lai 2009, GIE): not CC (CC examples: Kim 2024 Sci Rep Fig. 1 is hosted)\n• GBS (Blatchford 2000, Lancet): not CC\n• NOBLADS (Aoki 2016, CGH): not CC\n• T1 Nomogram (Kajiwara 2023, GIE): not CC. Figure is not hosted — link to original Fig. 2\n• e-T2 Score (Koyama 2022, GIE): not CC. Figure is not hosted — link to the paper\n• Spigelman (Spigelman 1989, Lancet): not CC. Points table — link to GeneReviews Table 5\n• Modified Spigelman (Saurin 2004, JCO): not CC — link to the paper\n• Ishii score (Ishii 2021, Dig Endosc): not CC — link to the paper\n• Toya ME-CV / Kikuchi ME-NBI (Toya 2020 / Kikuchi 2014, Dig Endosc): not CC — link to the papers\n• Vienna classification (Schlemper 2000, Gut): not CC — link to the paper\n• SPS criteria (Dekker 2020, Gastroenterology): not CC — link to the paper\n• Colorectal EC originals (Kudo 2011 Endoscopy / Kudo 2015 GIE): not CC\n• ESD-F (Matsumoto 2010, Scand J Gastroenterol / Kim 2016, Intest Res): not CC. Kim 2016 Fig. 1 is not hosted — link only',
        */
        '• JES figures (Oyama 2017, Esophagus): CC BY 4.0 (crops placed on each type)\n• Siewert / Nishi figures in the Japanese Classification of Esophageal Cancer, 11th ed. (2017, Esophagus): CC BY 4.0\n• EREFS figure (Abe 2022, Diagnostics Fig. 2): CC BY 4.0 (crops placed on each finding)\n• GERD LA classification figure (Jung 2025, Korean J Helicobacter Up Gastrointest Res Fig. 1A–D): CC BY-NC 4.0 (crops placed on each Grade)\n• Esophageal variceal form F1–F3 (Pall 2023, Diagnostics Fig. 1): CC BY 4.0\n• Esophageal variceal F / C / RC grades (Kim 2024, Korean J Helicobacter Up Gastrointest Res Fig. 1): CC BY-NC 4.0\n• Esophageal variceal red-color signs (Nagashima 2022, Healthcare Fig. 2): CC BY 4.0\n• Hill figure (Ge 2023, Ann Med Fig. 1): CC BY-NC 4.0 (crops placed on each grade)\n• Forrest figure (Zhou 2025, J South Med Univ Fig. 1): CC BY-NC-ND 4.0 (the full original is shown without alteration or cropping)\n• MESDA-G VS examples (Kurumi 2021, J Clin Med Fig. 5): CC BY 4.0 (crops placed on each MS / MV type; the Muto 2016 original is CC BY-NC-ND 4.0)\n• Kimura–Takemoto figure (Quach 2019, Clin Endosc Fig. 2): CC BY-NC 3.0\n• Paris figure (Kim 2025, Clin Endosc Fig. 2): CC BY-NC 4.0 (Johnson 2023 Can J Surg is CC BY-NC-ND 4.0)\n• LST figure (Kim 2025, Clin Endosc Fig. 3): CC BY-NC 4.0 (crops placed on each subtype; Castillo-Regalado 2022 WJGE is CC BY-NC 4.0)\n• Appendiceal orifice type figure (Oung 2020, Endosc Int Open Fig. 2): CC BY-NC-ND 4.0 (the full original is shown without alteration or cropping; Jacob 2016 Endoscopy original is not CC)\n• BEST-J (Hatta 2021, Gut): CC BY-NC 4.0\n• NICE teaching figure (Hamada 2021, BMC Gastroenterol Fig. 1): CC BY 4.0 (crops on each Type; the composite is not embedded — link only)\n• BBPS segment-score examples (Kim 2024, Sci Rep Fig. 1): CC BY 4.0 (Lai 2009 original Fig. 1 is Elsevier copyright)\n• Aronchick (2000, GIE): Crossref Version of Record is CC BY-NC-ND 4.0 (delayed OA)\n• Kakushima WLI score (Kakushima 2017, Endosc Int Open Table 2): CC BY-NC-ND 4.0 (HTML table — link to Table 2, not hosted)\n• SPS criteria comparison table (McWhinney 2023, Endosc Int Open Table 1): CC BY-NC-ND 4.0 (HTML table — link to Table 1, not hosted)\n• Colorectal EC classification (Misawa 2021, Clin Endosc Fig. 2–3): CC BY-NC 3.0 (crops placed on each type)',
      citationsNotCc: 'Sources that are not Creative Commons',
      citationsNotCcBody:
        '• JNET (Sano 2016, Dig Endosc): Wiley standard copyright; not CC. Figure is not hosted — link to original Fig. 7\n• NICE (Hayashi 2013, GIE): Elsevier copyright; not CC. Original Fig. 1 is not hosted — link only (CC figures: Hamada 2021 crops on each Type; the composite is not hosted — link only)\n• WASP (IJspeert 2016, Gut): BMJ copyright; not CC. Figure is not hosted — link to original Fig. 1\n• Prague (Sharma 2006, Gastroenterology): Elsevier copyright; not CC. Figure is not hosted — link to original Fig. 3\n• Siewert original (Siewert 1998, Br J Surg): Wiley copyright; not CC. Figure is not hosted — link to the paper (the 11th-edition schematics are hosted under CC BY 4.0)\n• Esophagogastric varices rules (Tajiri 2010, Dig Endosc): Wiley copyright; not CC. Figure is not hosted — link to the paper (CC figures for F / C / RC are hosted from Pall 2023, Kim 2024, and Nagashima 2022)\n• Sarin original (Sarin 1992, Hepatology): Wiley copyright; not CC. Figure is not hosted — link to the paper\n• LA original (Lundell 1999, Gut): not CC (CC crops use Jung 2025 Fig. 1A–D)\n• Kudo–Tsuruta originals (Tanaka 2004, Dig Endosc / Kudo 1996, GIE): not CC. Figure is not hosted — link to Clin Endosc 2025 Fig. 4 (review article is CC BY-NC; the figure is a permission reprint)\n• Paris originals (2003 GIE / 2005 Endoscopy): not CC\n• LST original (Kudo 2008, GIE): not CC\n• Kyoto (Shichijo 2017) / modified Kyoto (Kawamura 2021): Wiley; not CC\n• EGGIM (Pimentel-Nunes 2016, Endoscopy / Thieme): not CC\n• eCura (Hatta 2017, AJG): not CC\n• Sekiguchi (2016, J Gastroenterol): not CC\n• APCS (Yeoh 2011, Gut): not CC\n• BBPS (Lai 2009, GIE): not CC (CC examples: Kim 2024 Sci Rep Fig. 1 is hosted)\n• GBS (Blatchford 2000, Lancet): not CC\n• NOBLADS (Aoki 2016, CGH): not CC\n• T1 Nomogram (Kajiwara 2023, GIE): not CC. Figure is not hosted — link to original Fig. 2\n• e-T2 Score (Koyama 2022, GIE): not CC. Figure is not hosted — link to the paper\n• Spigelman (Spigelman 1989, Lancet): not CC. Points table — link to GeneReviews Table 5\n• Modified Spigelman (Saurin 2004, JCO): not CC — link to the paper\n• Ishii score (Ishii 2021, Dig Endosc): not CC — link to the paper\n• Toya ME-CV / Kikuchi ME-NBI (Toya 2020 / Kikuchi 2014, Dig Endosc): not CC — link to the papers\n• Vienna classification (Schlemper 2000, Gut): not CC — link to the paper\n• SPS criteria (Dekker 2020, Gastroenterology): not CC — link to the paper\n• Colorectal EC originals (Kudo 2011 Endoscopy / Kudo 2015 GIE): not CC\n• ESD-F (Matsumoto 2010, Scand J Gastroenterol / Kim 2016, Intest Res): not CC. Figure is not hosted — link to Kim 2016 Fig. 1',
      disclaimer: 'Disclaimer',
      disclaimerBody: 'This tool is for decision support and does not replace clinical judgment.',
      disclaimerGuide:
        'Interpret scores and nomograms according to current JSCCR/JGES guidelines and local protocols.',
    },
  },
};

UI.ja.about.citationsCcBody +=
  '\n• Toya ME-CV 参考図（Kumei 2025, DEN Open Fig. 1）: CC BY 4.0（Toya 2020 原著図ではない。4パターンを切り抜き）' +
  '\n• WASP 参考図（Vu 2024, JGH Open Fig. 4）: CC BY 4.0（IJspeert 2016 原著図ではない。SSL 3所見を切り抜き）' +
  '\n• ITBCC 参考図（Zlobec 2021, Virchows Arch Fig. 1）: CC BY 4.0（Lugli 2017 原著図ではない。BD1–BD3 を切り抜き、研究的 BD0 は除外）' +
  '\n• 工藤–鶴田 pit pattern カード模式図: プロジェクト提供者の自作図をベクター要素から高解像度化。CC BY 4.0（原著図ではない）';

UI.en.about.citationsCcBody +=
  '\n• Toya ME-CV reference figure (Kumei 2025, DEN Open Fig. 1): CC BY 4.0 (not the Toya 2020 original; four available patterns are cropped)' +
  '\n• WASP reference figure (Vu 2024, JGH Open Fig. 4): CC BY 4.0 (not the IJspeert 2016 original; three SSL findings are cropped)' +
  '\n• ITBCC reference figure (Zlobec 2021, Virchows Arch Fig. 1): CC BY 4.0 (not the Lugli 2017 original; BD1–BD3 are cropped and investigational BD0 is omitted)' +
  '\n• Kudo–Tsuruta pit pattern card schematics: contributor-created vector elements rasterized at high resolution. CC BY 4.0 (not figures from the original)';

UI.ja.about.citationsNotCcBody +=
  '\n• Paris分類カードの模式図: プロジェクト提供者の自作図を切り抜き、許諾のうえ掲載（Paris原著図ではない）';

UI.en.about.citationsNotCcBody +=
  '\n• Paris card schematics: cropped from an original diagram supplied by a project contributor and used with permission (not figures from the Paris original)';
