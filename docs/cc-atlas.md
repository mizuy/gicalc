# CC Atlas 調査（分類ごとの CC 図インベントリ）

GI Calc の **CC atlas**（全分類の教育用 CC 図を揃える）に向けた文献調査です。画像の取得・切り抜き・埋め込みはしていません。実装時は本表と [`adding-scores.md`](./adding-scores.md) §5 を照合してください。

調査日: 2026-09-08。対象は `kind: 'classification'` の 30 ツール（Sarin を含む）。点数スコア（BBPS 等）は対象外。

---

## 1. 目的と範囲

- **目的**: 各分類について、型を教えるのに使える CC 図が文献に何があるかを網羅する。
- **新規埋め込みはしない**。既掲載と候補を区別する。
- **原著図が非 CC でも、二次資料の CC 図は候補**（現行方針と同じ。`figureKind: 'secondary'`）。
- 対象外: データセット全体（HyperKvasir 等）、AI 論文の未ラベル症例、許諾再掲（CC 原図ではないもの）。

---

## 2. 調査方法

1. リポジトリの `data/scores/*.ts` と About（`lib/i18n/ui.ts` の `citationsCc`）から **既掲載** を確定。
2. Europe PMC（`LICENSE:"cc by"`）と PMC / 出版社ページで、分類名・型名・「figure」を横断検索。
3. 論文単位で **ライセンス・図番号・型の揃い・crop 可否** を記録。
4. ライセンスは Europe PMC の `license` と出版社表記を優先。記事が CC でも **図が許諾再掲** なら CC 原図として扱わない。

限界: 2026-09 時点の OA インデックス。非 OA・図なしレビュー・ライセンス未タグ論文は漏れる。実装前に出版社ページで再確認すること。

---

## 3. Atlas 実装ルール（現行）

| ライセンス | 埋め込み | 切り抜き（型ごと） |
|---|---|---|
| CC BY / BY-SA | 可 | 可 |
| CC BY-NC | 可（非営利の GitHub Pages） | 可 |
| CC BY-NC-ND | 可 | **不可**（原図全体のみ） |
| 非 CC / 未確認 | 不可（`href` のみ） | 不可 |
| 許諾再掲（記事は CC、原図は他誌） | 不可 | 不可 |

Atlas に向く図: **全型が1枚または連続パネル**、実内視鏡または病理、定義と対応が本文で明示。模式図だけの論文は補助。

---

## 4. 凡例

| 状態 | 意味 |
|---|---|
| **掲載済** | `public/figures/` に WebP あり |
| **リンクのみ** | `href` のみ。埋め込みなし |
| **候補** | 未使用。Atlas に使える CC 図 |
| **ND 表示のみ** | 切り抜き不可 |
| **ギャップ** | 使える CC 教育図が見つからない |

---

## 5. 分類ごとのインベントリ

### 5.1 食道

#### JES（IPCL / A–B3）

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Oyama 2017 Esophagus | 28386209 / PMC5362661 | Fig. 1–5 | **CC BY 4.0** | **掲載済**（原著切り抜き） | A, B1, B2, B3, AVA | Atlas の一次ソース。追加不要 |
| Kim 2017 WJG | 28706424 / PMC5487505 | Fig. 1A–C | CC BY-NC | 候補 | B1–B3 | Type A なし |
| Ishihara 2024 Best Pract Res | 38865552 / PMC11164272 | 症例図 | CC BY | 参考 | 部分 | 型プレートではない |
| Applied Sci 2020 CAD | — / MDPI | Fig. 1, 13 | CC BY | 参考 | 模式 + B 型 | Fig. 1 は Oyama からの転載。原図は Oyama を使う |

#### LA（逆流性食道炎 Grade A–D）

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Jung 2025 KJHUGR | 40550541 / PMC12173581 | Fig. 1A–D（+E,F） | **CC BY-NC 4.0** | **掲載済**（A–D 切り抜き） | A–D | 一次ソース |
| Lundell 1999 Gut | 10410216 | — | 非 CC | リンクのみ | — | 原著 |
| Wang 2021 IJERPH | 33673512 / PMC7967559 | 症例サンプル | CC BY | 参考 | 部分 | AI 論文。型プレートではない |
| Wang 2022 Diagnostics | — | 学習画像 | CC BY | 参考 | 部分 | 同上 |
| VideoGIE 2013 | — | 動画 | CC BY-NC-ND | リンクのみ（About 記載） | A–D | 静止画プレートではない |

#### Prague C & M

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Sharma 2006 Gastroenterology | 17101315 | Fig. 3 | 非 CC | リンクのみ | C2M5 模式 | 原著 |
| Oyanagi 2022 DEN Open | 35310704 / PMC8828243 | Fig. 5 | **CC BY 4.0** | **掲載済** | 測り方 + C1M4 例 | 二次資料。十分 |

追加の全ランドマーク揃い CC プレートは見つからず。Oyanagi で足りる。

#### Siewert（GEJ I–III）

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Siewert 1998 BJS | 9823902 | — | 非 CC | リンクのみ | — | 原著 |
| JCE 11th ed. 2017 Esophagus | 28111536 / PMC5222925 | Fig. 2-5/2-6/2-7 | **CC BY 4.0** | **掲載済** | I–III + 西分類 | 一次ソース |
| TGH / AoE 総説 | — | 模式 | 要確認 | 参考 | I–III | 規約図を優先 |

#### JSPH 食道静脈瘤（F / C / RC）

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Tajiri 2010 Dig Endosc | — | — | 非 CC | リンクのみ | — | 記載基準原著 |
| Pall 2023 Diagnostics | — | Fig. 1 | **CC BY 4.0** | **掲載済** | F1–F3 | |
| Kim 2024 KJHUGR | — | Fig. 1 | **CC BY-NC 4.0** | **掲載済** | F / C / RC | |
| Nagashima 2022 Healthcare | — | Fig. 2 | **CC BY 4.0** | **掲載済** | 発赤所見 | |
| Philips 2016 J Clin Exp Hepatol | 27324725 / PMC4976684 | 歴史図 | CC BY | 参考 | 部分 | 教育プレートとしては Pall/Kim が上 |

#### Hill（GEFV I–IV）

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Hill 1996 | — | — | 非 CC | リンクのみ | — | 原著 |
| Ge 2023 Ann Med | — | Fig. 1 | **CC BY-NC 4.0** | **掲載済**（各 grade 切り抜き） | I–IV | 一次ソース |
| Ge 2023 Sci Rep（DL） | 37949083 / PMC10653650 | Fig. 1 | CC BY-NC | 候補（重複） | I–IV | 既掲載と同系。追加価値は低い |
| MRA 2023 | — | Fig. 1 | 要確認 | 参考 | I–IV | 出版社ライセンスを実装前に確認 |

#### EREFS（EoE）

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Abe 2022 Diagnostics | — | Fig. 2 | **CC BY 4.0** | **掲載済**（所見切り抜き） | E/R/Ex/F/S | 一次ソース |
| Hirano 2013 / CGH 総説 | — | — | 非 CC | リンクのみ | — | 原著スコア |
| Sawada 2025 DEN Open | — / deo2.70063 | Fig. 1b–e | **CC BY**（DEN Open） | 候補 | 主要所見 | Abe の補完。stricture の別例 |

---

### 5.2 胃

#### 木村–竹本

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Quach 2019 Clin Endosc | — | Fig. 2 | **CC BY-NC 3.0** | **掲載済** | C/O 系列 | 一次ソース |
| 原著 | — | — | 非 CC | — | — | |

追加の全段階揃い CC BY プレートは見つからず。Quach で足りる。

#### MESDA-G / VS

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Muto 2016 Dig Endosc | — | Fig. 13 等 | **CC BY-NC-ND 4.0** | リンクのみ（Fig. 1 はフローと重複） | アルゴリズム + 例 | ND。切り抜き不可 |
| Kurumi 2021 J Clin Med | — | Fig. 5 | **CC BY 4.0** | **掲載済**（MS/MV 切り抜き） | regular / irregular / absent | VS 教育の一次ソース |
| Castañeda 2022 Cancers | 35008263 / PMC8750452 | Fig. 2 | **CC BY 4.0** | 候補 | アルゴリズム図 | 画面フローと重複しうる。写真プレートではない |
| Miyaoka TGH | — | Fig. 5–8 | 要確認 | 参考 | 手順例 | AME ライセンスを確認 |

#### Lauren（腸型 / びまん型 / 混合）

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Lauren 1965 | 14300643 | — | 非 CC | リンクのみ | — | 原著 |
| Qiu 2013 J Transl Med | — / PMC3600019 | — | 要確認（BMC 系は CC BY が多い） | **ギャップ寄り** | 組織写真が型プレートになっていない | |
| Hu 2012 J Gastrointest Oncol | — / PMC3418539 | Fig. 7 等 | 要確認 | 参考 | HDGC / signet | intestinal vs diffuse の対比プレートではない |
| 各種総説 | — | 表のみ | — | **ギャップ** | — | **腸型・びまん型・混合の揃い CC 教育図は未確認** |

#### WHO NET G1–G3

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| WHO Blue Book 2019 | 31046179 | — | 非 CC | リンクのみ | — | IARC |
| Uccella 2021 Endocrine | 33169199 / PMC8346451 | Fig. 3 | **CC BY 4.0** | **候補（優先）** | NET G1–G3 + NEC（H&E + Ki-67） | Atlas 向き。G3 vs NEC が揃う |
| Nagtegaal 2020 Histopathology | 31433515 / PMC7003895 | — | CC BY | 参考 | 本文・表 | 消化器 WHO 2019 概説。型プレートではない |
| Khattab 2025/26 Cureus | — | Fig. 1–2 | **CC BY**（Cureus） | 候補 | H&E + Ki-67、または模式 | 消化管特化は Uccella を優先 |

---

### 5.3 大腸・光学診断

#### JNET

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Sano 2016 Dig Endosc | 26927367 | Fig. 7 | 非 CC | リンクのみ | 1 / 2A / 2B / 3 | 原著 |
| Ahmed 2024 DEN Open | 38023663 / PMC10681000 | Fig. 1 | **CC BY 4.0** | **掲載済** | 1–3 横並び | 二次。十分 |
| Nguyen 2024 Medicine | 38968516 / PMC11224830 | 本文中 | CC BY | 参考 | 分布表中心 | 型プレートとしては Ahmed が上 |
| Yoshida 2021 EIO | 33553592 / PMC7857969 | Fig. BLI 代表例 | **CC BY-NC-ND** | 候補（ND） | 1–3 | 切り抜き不可。全体表示のみ |

#### NICE

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Hayashi 2013 GIE | 23910062 | Fig. 1 | 非 CC | リンクのみ | 1–3 | 原著 |
| Hamada 2021 BMC Gastroenterol | 34454417 | Fig. 1 | **CC BY 4.0** | **掲載済**（Type 切り抜き） | 1–3 | 一次ソース |
| Visovan 2018 Gastroenterol Res Pract | 29666668 系ではなく Hindawi 2018 | 症例 | CC BY（Hindawi） | 参考 | 部分 | 型プレートではない |
| IJspeert 系 NICE+WASP 検証 | 複数 | — | まちまち | 参考 | — | Hamada で足りる |

#### WASP

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| IJspeert 2016 Gut | 25753029 | Fig. 1 | 非 CC | リンクのみ | アルゴリズム | 原著 |
| Vu / Quach 2024 JGH Open | 38919272 / PMC11196833 | Fig. 4 | **CC BY 4.0** | **掲載済**（SSL 3所見切り抜き） | cloud / border / dark spots | コード上は Quach 2024。第一著者 Vu |
| 同論文 Fig. 1 | 同上 | Fig. 1 | **CC BY 4.0** | **候補** | ステップ図 | 画面フローと重複しうる |
| JE 2021 iScan | — / PMC8435252 | — | 要確認 | 参考 | 動画研究 | 型プレートではない |

#### Paris Type 0

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Paris 2003 GIE / 2005 Endoscopy | 15933932 | — | 非 CC | リンクのみ | — | 原著 |
| GI Calc 模式図 | — | カード図 | **CC BY 4.0** | **掲載済**（`gicalc`） | 0-I–III + 混在 | 現行カード |
| Kim 2025 Clin Endosc | 40336268 / PMC12138368 | Fig. 2 | **CC BY-NC 4.0** | リンクのみ | 模式 + Isp | 埋め込まず（現行）。**写真プレートではない** |
| Johnson 2023 Can J Surg | — / PMC10521811 | Fig. 1 | **CC BY-NC-ND 4.0** | リンクのみ | 模式 | ND |
| Castañeda 2022 Cancers | 35008263 / PMC8750452 | Fig. 1 | **CC BY 4.0** | **候補** | 早期胃癌の Paris 実例 | 大腸ではなく胃。臓器注記が必要 |

**ギャップ**: 大腸の 0-Ip / Is / IIa / IIb / IIc / III が揃った **CC 実写プレート** は未確認。模式は GI Calc で足りる。実写 atlas は Cancers 2022（胃）か、今後の OA 症例を待つ。

#### LST（G-H / G-M / NG-F / NG-PD）

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Kudo 2008 GIE | — | — | 非 CC | リンクのみ | — | 原著 |
| GI Calc 模式図 | — | カード図 | **CC BY 4.0** | **掲載済** | 4 亜型 | 現行カード |
| Kim 2025 Clin Endosc | 40336268 | Fig. 3 | **CC BY-NC 4.0** | リンクのみ | 模式（Castillo-Regalado 転載） | 埋め込まず |
| Castillo-Regalado 2022 WJGE | — | — | **CC BY-NC 4.0** | リンクのみ（About） | 模式 | |
| Moon 2017 PLOS ONE | 28977010 / PMC5627894 | Fig. 1A–H | **CC BY 4.0** | **候補（優先）** | 4 亜型 × WLI + インジゴ | **実写 atlas の最有力** |
| Nardone 2025 IJMS | 40943367 / PMC12429073 | Fig. 2 | **CC BY 4.0** | **候補** | 4 亜型代表 | 分子総説だが形態図あり |

#### 工藤–鶴田 pit pattern

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Kudo 1996 GIE / Tanaka 2004 | 8836710 | — | 非 CC | リンクのみ | I–Vn | 原著 |
| GI Calc Gemini SVG | — | カード図 | **CC BY 4.0** | **掲載済**（`gicalc`） | I–Vn | 現行カード |
| Kim 2025 Clin Endosc Fig. 4 | 40336268 | Fig. 4 | 記事 CC BY-NC、**原図は許諾再掲** | リンクのみ | I–Vn | **CC 原図として使わない** |
| Nardone 2024 Gastrointest Disord | — / MDPI 6(3):44 | Fig. 1A–F | **CC BY 4.0**（MDPI） | **候補（優先）** | I, II, IIIL/s, IV, Vi, Vn（i-Scan） | 実写。II-O はなし |
| Li 2014 WJG meta | — / PMC4168103 | 表 | CC BY-NC | 参考 | 定義表 | 画像なし |

#### 大腸 EC / EC-V

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Kudo 2011 Endoscopy / 2015 GIE | 21837586 / 26071058 | — | 非 CC | リンクのみ | EC1a–3b, EC-V | 原著 |
| Misawa 2021 Clin Endosc | 34233111 | Fig. 2–3 | **CC BY-NC 3.0** | **掲載済** | EC + EC-V | 一次ソース |
| Sano 2018 WJGO | 29666668 | 不一致例 | 要確認 | 参考 | 部分 | 型プレートではない |

追加の全型 CC BY プレートは見つからず。Misawa で足りる。

#### ESD 粘膜下線維化 F0–F2

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Matsumoto 2010 | 20626303 | — | 非 CC | — | — | 定義原著 |
| Kim 2016 Intest Res | 27799887 | Fig. 1 | 非 CC | リンクのみ | F0–F2 | |
| Inada 2013 Gastroenterol Res Pract | 23935609 / PMC3723096 | Fig. 1 | **CC BY 3.0** | **掲載済** | F0–F2 | 一次ソース |
| Makino 2018 Sci Rep | 29904058 / PMC6002368 | — | CC BY | 参考 | 予測因子 | 型プレートではない |

#### 虫垂開口部 Type

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Oung 2020 EIO | — | Fig. 2 | **CC BY-NC-ND 4.0** | **掲載済（全体・切り抜きなし）** | 全 Type | ND。代替の CC BY プレートは未確認 |

#### ITBCC budding（BD1–3）

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Lugli 2017 Mod Pathol | 26907552 | — | 非 CC | リンクのみ | — | 原著 |
| Zlobec 2021 Virchows Arch | 33843013 / PMC8724067 | Fig. 1 | **CC BY 4.0** | **掲載済**（BD1–3。BD0 除外） | BD1–3 | 一次ソース |
| Lugli 2020 Histopathology | 32601463 / PMC7462864 | 総説図 | CC BY | 候補（補完） | 概念図 + 例 | 既掲載と重複しうる |
| Chen 2022 Cancers | 34940086 / PMC8700531 | — | CC BY | 参考 | 予後総説 | |

#### WHO 2019 鋸歯状（HP / SSL / SSLD / TSA）

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| WHO Blue Book | — | — | 非 CC | リンクのみ | — | |
| De Palma 2022 IJMS | — / PMC9032676 | Fig. 2, 4 等 | **CC BY 4.0**（MDPI） | **候補（優先）** | SSL, TSA（HP は本文） | 病理 atlas 向き |
| Dang 2021 Can J Surg | 34728521 / PMC8565879 | Fig. 1A–C | **CC BY-NC-ND 4.0** | 候補（ND） | HP / SSL / TSA | 切り抜き不可。全体なら可 |
| Le 2024 WJG | — / PMC11438847 | 病理図 | CC BY-NC（WJG） | 候補 | SSL / SSLD 等 | NC。IJMS を優先 |

#### SPS（WHO 基準）

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Dekker 2020 | — | — | 非 CC | リンクのみ | 基準 | |
| McWhinney 2023 | — | 表 | **CC BY-NC-ND 4.0** | **掲載済（表・ND）** | 基準表 | 内視鏡プレートではない |
| — | — | — | — | **ギャップ（画像）** | — | 基準は表で足りる。症例写真の必要性は低い |

#### Vienna（C1–C5）

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Schlemper 2000 Gut | 10896917 | Fig. 1–3 | 非 CC | リンクのみ | 1 症例 + 一致率図 | **型ごとの病理プレートではない** |
| Dixon 2002 Gut | — | 表 | 非 CC | — | 改訂表 | |
| Castañeda 系 / 管理論文 | 複数 | 表 | まちまち | 参考 | 表 | |
| EBHI-Seg 2023 | — / PMC9902656 | データセット図 | 要確認 | 使わない | LGIEN/HGIEN 等 | Vienna ラベルではない。データセット |

**ギャップ**: C1–C5（または改訂 4.1–4.4 / 5）を並べた **CC 病理教育図は未確認**。表＋自作模式が現実的。

---

### 5.4 十二指腸

#### Toya ME-CV（SNADET）

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Toya 2020 | — | — | 非 CC | リンクのみ | — | 原著 |
| Kumei 2025 DEN Open | — | Fig. 1 | **CC BY 4.0** | **掲載済**（4 パターン切り抜き） | 二次 | 一次ソース |

#### Kikuchi ME-NBI（SNADET）

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Kikuchi 2014 Dig Endosc | 24750143 | Fig. 10 | 非 CC | リンクのみ | アルゴリズム | 原著 |
| Goda 2015 WJG | — / 21(41):11832 | Fig. 2–4 | **CC BY-NC**（WJG） | **候補** | アルゴリズム転載 + mixed / obscure | NC。写真は部分 |
| Nakagawa 2024 Clin Endosc | 38749404 / PMC11457973 | Fig. 1a–e | **CC BY-NC** | **候補（優先・NC）** | absent / network / ISV / unclassified / mixed | **血管型が揃う唯一の近い OA 図** |
| QIMS 2023 総説 | 36819279 / PMC9929402 | 本文 | CC BY-NC-ND | 参考 | 記述のみ | ND |

**ギャップ（CC BY）**: BY（NC なし）の揃い図は未確認。Atlas は Nakagawa 2024 を NC で切るか、GI Calc 模式を新作する。

#### Uchiyama ME-NBI（乳頭部 I–III）

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Uchiyama 2006 J Gastroenterol | 16612620 | — | 非 CC | リンクのみ | I–III | 原著 |
| Yamao 2015 Am J Case Rep | 26324328 / PMC4560156 | Fig. 1–2 | OA、**CC 表記なし** | 使わない | I/II と III の経過 | ライセンス不明 |
| その他症例 | — | 部分 | まちまち | **ギャップ** | — | **I / II / III + 異常血管の揃い CC 図は未確認** |

#### 乳頭部肉眼型（JSBS）

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| JSBS 規約 / JSCO 2015 | 30338828 | — | 非 CC | リンクのみ | 腫瘤 / 潰瘍 / 混在 | |
| Panarese 2015 WJG | — / PMC4499340 | 記述 | CC BY-NC | 参考 | intra / peri / mixed | JSBS ラベルと完全一致しない |
| De Moura 2020 Ther Adv | 32030370 / PMC6977234 | 記述 | CC BY-NC | 参考 | intramural / exposed / ulcerative | 図は型プレートではない |

**ギャップ**: JSBS 4 型の揃い CC 図は未確認。

---

### 5.5 出血・静脈瘤（分類）

#### Forrest

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Forrest 1974 Lancet | — | — | 非 CC | — | — | 原著 |
| Zhou 2025 J South Med Univ | — | Fig. 1 | **CC BY-NC-ND 4.0** | **掲載済（全体のみ）** | Ia–III | ND。切り抜き不可 |
| Endoscopy Campus 等 | — | 多数 | 非 CC | 使わない | Ia–III | |

**ギャップ（crop）**: Ia–III を切れる CC BY / BY-NC プレートは未確認。全体表示は Zhou で足りる。

#### Sarin（GOV / IGV）

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Sarin 1992 Hepatology | — | — | 非 CC | リンクのみ | — | 原著 |
| Acevedo 2019 | 30967903 | 模式 | **CC BY-NC 4.0** | **掲載済** | GOV/IGV 模式 | 一次ソース |

---

## 6. 既掲載のまとめ（再掲しない）

次はアプリに既にある。Atlas の「新規」からは除外する。

| 分類 | 既掲載 CC | ライセンス |
|---|---|---|
| JES | Oyama 2017 Fig. 1–5 切り抜き | BY 4.0 |
| Siewert | JCE 2017 模式 | BY 4.0 |
| EREFS | Abe 2022 Fig. 2 切り抜き | BY 4.0 |
| LA | Jung 2025 Fig. 1A–D 切り抜き | BY-NC 4.0 |
| JSPH | Pall 2023 / Kim 2024 / Nagashima 2022 | BY / BY-NC / BY |
| Hill | Ge 2023 Fig. 1 切り抜き | BY-NC 4.0 |
| Forrest | Zhou 2025 全体 | BY-NC-ND 4.0 |
| MESDA-G | Kurumi 2021 Fig. 5 切り抜き | BY 4.0 |
| 木村–竹本 | Quach 2019 Fig. 2 | BY-NC 3.0 |
| Paris / LST / pit | GI Calc 模式 | BY 4.0 |
| JNET | Ahmed 2024 Fig. 1 | BY 4.0 |
| NICE | Hamada 2021 切り抜き | BY 4.0 |
| WASP | Vu/Quach 2024 Fig. 4 切り抜き | BY 4.0 |
| EC | Misawa 2021 Fig. 2–3 | BY-NC 3.0 |
| Prague | Oyanagi 2022 Fig. 5 | BY 4.0 |
| Toya | Kumei 2025 Fig. 1 切り抜き | BY 4.0 |
| ITBCC | Zlobec 2021 Fig. 1 BD1–3 | BY 4.0 |
| ESD-F | Inada 2013 Fig. 1 | BY 3.0 |
| Sarin | Acevedo 2019 模式 | BY-NC 4.0 |
| 虫垂開口 | Oung 2020 全体 | BY-NC-ND 4.0 |
| SPS | McWhinney 2023 表 | BY-NC-ND 4.0 |

---

## 7. Atlas 優先度（未掲載のうち実装価値が高いもの）

実装するならこの順。調査時点の推奨。

### P1 — 揃いが良く、ライセンスが BY、ギャップを埋める

| 優先 | 分類 | 論文 | 図 | 理由 |
|---|---|---|---|---|
| 1 | **LST** | Moon 2017 PLOS ONE | Fig. 1A–H | 4 亜型の WLI+色素。模式しかない現状を実写で補う |
| 2 | **pit pattern** | Nardone 2024 Gastrointest Disord | Fig. 1A–F | I–Vn 実写。Clin Endosc 2025 Fig. 4 は使えない |
| 3 | **WHO serrated** | De Palma 2022 IJMS | Fig. 2, 4 | 病理ギャップ。SSL/TSA |
| 4 | **NET G1–G3** | Uccella 2021 Endocrine | Fig. 3 | H&E+Ki-67。G3 vs NEC |

### P2 — 使えるが NC、または既掲載の補完

| 分類 | 論文 | 図 | 理由 |
|---|---|---|---|
| Kikuchi ME-NBI | Nakagawa 2024 Clin Endosc | Fig. 1a–e | 血管型が揃う。**BY-NC** |
| LST（予備） | Nardone 2025 IJMS | Fig. 2 | Moon と重複しうる |
| WHO serrated（ND） | Dang 2021 CJS | Fig. 1 | HP/SSL/TSA 3 枚。**切り抜き不可** |
| Paris（胃） | Castañeda 2022 Cancers | Fig. 1 | 実写だが胃。大腸カードとは別枠 |
| EREFS | Sawada 2025 DEN Open | Fig. 1 | Abe の別症例 |
| WASP | Vu 2024 Fig. 1 | アルゴリズム | 画面フローと重複しうる |
| JNET | Yoshida 2021 EIO | BLI 例 | **ND**。全体表示のみ |
| Lauren | （未確定） | — | 対比プレートが見つかってから |

### P3 — 自作模式または表で足りる（文献 CC 図なし）

| 分類 | 方針 |
|---|---|
| Vienna | カテゴリ表。病理写真は見つからず |
| Uchiyama | GI Calc 模式、または今後の OA 症例 |
| 乳頭部肉眼型 | GI Calc 模式（腫瘤 / 潰瘍 / 混在 / 正常） |
| SPS | 既存の基準表で足りる |
| Forrest crop | ND のため切らない。Zhou 全体のまま |
| 虫垂開口 crop | 同上（Oung 全体） |

---

## 8. 使ってはいけないもの

| もの | 理由 |
|---|---|
| Kim 2025 Clin Endosc **Fig. 4**（pit） | 記事は CC BY-NC。**原図は他誌からの許諾再掲** |
| Kim 2025 Fig. 2/3 の「Paris/LST 原著図」扱い | 模式の転載。実写 atlas ではない。現行どおりリンク |
| Endoscopy Campus / 教科書サイトの写真 | CC ではない |
| HyperKvasir 等の大規模データセット画像 | 分類教育プレートではない。個別ライセンスも別 |
| Am J Case Rep の乳頭部症例（PMC4560156） | OA だが CC 表記なし |
| WHO Blue Book の図 | IARC。CC ではない |
| 原著 Wiley / Elsevier / BMJ / Thieme 図 | 現行どおり `href` のみ |

---

## 9. 臓器別の充足度

| 臓器 | 実写 CC が揃っている | 模式のみ / 部分 | ギャップ |
|---|---|---|---|
| 食道 | JES, LA, Hill, EREFS, JSPH, Prague, Siewert | — | — |
| 胃 | MESDA-G VS, 木村–竹本 | Lauren | Lauren 対比図 |
| 大腸光学 | JNET, NICE, WASP, EC, ESD-F | Paris, LST, pit（模式） | 大腸 Paris 実写 |
| 大腸病理 | ITBCC | SPS 表 | Vienna, WHO serrated（候補あり） |
| 十二指腸 | Toya | — | Kikuchi（NC 候補）, Uchiyama, 肉眼型 |
| 出血 | Forrest（ND 全体）, Sarin 模式 | — | Forrest の crop 用 BY 図 |

---

## 10. 実装時のチェックリスト

1. 出版社ページでライセンス文を再読する（Europe PMC タグと食い違うことがある）。
2. 図キャプションが「Adapted from / Reproduced with permission」なら **許諾再掲** として捨てる。
3. ND は `src` に全体だけ。`entry.figures` の切り抜きを作らない。
4. 二次資料は `figureKind: 'secondary'`、`isSecondarySource: true`、About の `citationsCc` を更新。
5. 複合図から切る場合、日本語 `note` に `CC BY 4.0`（または実際のライセンス）と `埋め込まず` を入れる（`verify-scores.ts`）。
6. このファイルの「掲載済」行を実装後に更新する。

関連: [`adding-scores.md`](./adding-scores.md) §5。
