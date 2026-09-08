# CC Atlas 調査（分類ごとの CC 図インベントリ）

GI Calc の **CC atlas**（全分類の教育用 CC 図を揃える）に向けた文献調査です。画像の取得・切り抜き・埋め込みはしていません。実装時は本表と [`adding-scores.md`](./adding-scores.md) §5 を照合してください。

調査日: 2026-09-08（要確認の出版社照合は同日追記）。対象は `kind: 'classification'` の 30 ツール（Sarin を含む）。点数スコア（BBPS 等）は対象外。

**CC atlas は切り抜きしない。** 原図全体を載せられればよい。ND も全体掲載なら使える。

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

## 3. Atlas 実装ルール

Atlas ページは **原図全体だけ**載せる。型ごとの切り抜きは作らない（スコアカード側の既存切り抜きとは別）。

| ライセンス | Atlas（全体掲載） |
|---|---|
| CC BY / BY-SA | 可 |
| CC BY-NC | 可（非営利の GitHub Pages） |
| CC BY-NC-ND | 可（改変なしの全体） |
| 非 CC / 未確認 / All rights reserved | 不可（`href` のみ） |
| 許諾再掲（記事は CC、原図は他誌） | 不可 |

向く図: **全型が1枚または連続パネル**、実内視鏡または病理、定義と本文が対応。模式は補助。

---

## 4. 凡例

| 状態 | 意味 |
|---|---|
| **掲載済** | `public/figures/` に WebP あり |
| **リンクのみ** | `href` のみ。埋め込みなし |
| **候補** | 未使用。Atlas に使える CC 図 |
| **ギャップ** | 全体掲載できる CC 教育図が見つからない |

---

## 4.1 要確認だった項目の確定

出版社ページまたは PMC のライセンス文で確認した。Atlas は全体掲載前提。

| 旧表記 | 確定 | 図の中身 | Atlas |
|---|---|---|---|
| TGH Wu（Siewert） | **CC BY-NC-ND 4.0**（TGH 2026;11:57） | Fig. 1 は分子特徴。Servier Medical Art 転載。**解剖プレートではない** | 使わない（中身が型図でない） |
| AoE Saliba 2020 | **CC BY-NC-ND 4.0** | Fig. 1 は Siewert I–III 模式 | 全体なら可。JCE 2017 既掲載の方が良い |
| MRA 2023 Hill | 実体は Bharatam **J Surg (Gavin) 2022**;7:1674。**CC BY-SA 4.0** | Fig. 1 Grade I–IV | 全体なら可。Ge 2023 既掲載と重複 |
| Ge 2023「Sci Rep」 | **誤記**。PMC10653650 は Ge 2023 **Ann Med**（既掲載、CC BY-NC 4.0）と同じ論文 | I–IV サンプル | 追加しない |
| Sci Rep Hill（別論文） | Kafetzis 2024 Sci Rep。**CC BY 4.0** | AI 学習。型プレートではない | 使わない |
| Miyaoka TGH 2020 | **CC BY-NC-ND 4.0**（PDF Open Access Statement） | Fig. 5–8 が MESDA-G 手順の実例 | 全体なら可。Kurumi の補完 |
| Qiu 2013 J Transl Med | **CC BY 2.0** | Fig. 1 は生存曲線だけ | 使わない |
| Hu 2012 J Gastrointest Oncol | PMC に **All rights reserved**（Pioneer Bioscience 2012）。**CC ではない** | WHO 組織亜型。Lauren 対比ではない | 使わない |
| JE 2021 iScan WASP | **CC BY-NC-ND 4.0** | 研究フロー・正答率図。WASP 型プレートなし | 使わない |
| Utsumi / Sano 2018 WJGO | **CC BY-NC 4.0** | EC 不一致の症例図。全型プレートではない | 参考。Misawa で足りる |
| EBHI-Seg 2023 | 論文・データセットとも **CC BY 4.0** | LGIEN/HGIEN 等。**Vienna ラベルではない** | Vienna atlas には使わない |
| Iwashita 2015 Am J Case Rep（旧「Yamao」） | **CC BY-NC-ND 3.0** | Type I/II → 後年 Type III の経過。全型揃いではない | 全体なら部分候補 |
| Testoni 2024 Gastrointest Disord（旧「Nardone」） | **CC BY 4.0**（MDPI） | Fig. 1A–F 著者症例 I–Vn | **全体掲載の優先候補** |
| Mezzapesa 2022 IJMS（旧「De Palma」） | **CC BY 4.0**（MDPI） | SSL / TSA 病理 | **全体掲載の優先候補** |
| Tsuji 2015 WJG（旧「Goda」） | **CC BY-NC 4.0** | Kikuchi アルゴリズム転載 + 症例 | 全体なら可。Nakagawa の方が血管型が揃う |
| Sawada 2025 DEN Open | **CC BY 4.0**（PMID 39822952 / PMC11736424） | Fig. 1 の EoE 所見 | Abe の補完。全体なら可 |
| Berlth 2014 WJG / Ma 2016 Oncol Lett（Lauren 再検索） | WJG は **CC BY-NC 4.0**、Oncol Lett は **CC BY-NC-ND 4.0** | 表または本文のみ。病理対比図なし | 使わない。Lauren ギャップは残る |

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
| Saliba 2020 Ann Esophagus | — / aoe-2020-geja-02 | Fig. 1 | **CC BY-NC-ND 4.0** | 候補（全体） | I–III 模式 | JCE 既掲載を優先 |
| Wu 2026 TGH | — | Fig. 1 | **CC BY-NC-ND 4.0** | 使わない | 分子図 | Siewert 解剖図ではない |

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
| Ge 2023 Ann Med | 37949083 / PMC10653650 | Fig. 1 | **CC BY-NC 4.0** | **掲載済** | I–IV | スコアカードは切り抜き。Atlas は全体 |
| Bharatam 2022 J Surg (Gavin) | — | Fig. 1 | **CC BY-SA 4.0** | 候補（全体・重複） | I–IV | Ge で足りる |
| Kafetzis 2024 Sci Rep | — | — | CC BY 4.0 | 使わない | AI | 型プレートではない |

#### EREFS（EoE）

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Abe 2022 Diagnostics | — | Fig. 2 | **CC BY 4.0** | **掲載済**（所見切り抜き） | E/R/Ex/F/S | 一次ソース |
| Hirano 2013 / CGH 総説 | — | — | 非 CC | リンクのみ | — | 原著スコア |
| Sawada 2025 DEN Open | 39822952 / PMC11736424 | Fig. 1 | **CC BY 4.0** | 候補（全体） | 主要所見 | Abe の補完 |

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
| Muto 2016 Dig Endosc | — | Fig. 13 等 | **CC BY-NC-ND 4.0** | 候補（全体） | アルゴリズム + 例 | 現行はリンク。Atlas は全体可。Fig. 1 は画面フローと重複 |
| Kurumi 2021 J Clin Med | — | Fig. 5 | **CC BY 4.0** | **掲載済** | regular / irregular / absent | スコアカードは切り抜き。Atlas は全体 |
| Castañeda 2022 Cancers | 35008263 / PMC8750452 | Fig. 2 | **CC BY 4.0** | 候補（全体） | アルゴリズム図 | 写真プレートではない |
| Miyaoka 2020 TGH | 33073045 / PMC7530321 | Fig. 5–8 | **CC BY-NC-ND 4.0** | 候補（全体） | 手順の実例 | Kurumi の補完 |

#### Lauren（腸型 / びまん型 / 混合）

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Lauren 1965 | 14300643 | — | 非 CC | リンクのみ | — | 原著 |
| Qiu 2013 J Transl Med | 23497313 / PMC3600019 | Fig. 1 | **CC BY 2.0** | 使わない | 生存曲線 | 組織図なし |
| Hu 2012 J Gastrointest Oncol | 22943016 / PMC3418539 | Fig. 1–7 | **All rights reserved** | 使わない | WHO 亜型 | CC ではない。Lauren 対比でもない |
| Berlth 2014 WJG | 24914328 / PMC4024777 | 表のみ | **CC BY-NC 4.0** | 使わない | 分類対照表 | 病理写真なし |
| Ma 2016 Oncol Lett | 27073512 / PMC4840723 | なし | **CC BY-NC-ND 4.0** | 使わない | 総説本文 | 図なし |
| — | — | — | — | **ギャップ** | — | 腸型・びまん型・混合の揃い CC 図は再検索後もなし |

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
| Yoshida 2021 EIO | 33553592 / PMC7857969 | BLI 代表例 | **CC BY-NC-ND** | 候補（全体） | 1–3 | Ahmed の補完 |

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
| van de Wetering 2021 United European Gastroenterol J | — / PMC8435252 | — | **CC BY-NC-ND 4.0** | 使わない | 正答率図 | WASP 型プレートなし |

#### Paris Type 0

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Paris 2003 GIE / 2005 Endoscopy | 15933932 | — | 非 CC | リンクのみ | — | 原著 |
| GI Calc 模式図 | — | カード図 | **CC BY 4.0** | **掲載済**（`gicalc`） | 0-I–III + 混在 | 現行カード |
| Kim 2025 Clin Endosc | 40336268 / PMC12138368 | Fig. 2 | **CC BY-NC 4.0** | リンクのみ | 模式 + Isp | 埋め込まず（現行）。**写真プレートではない** |
| Johnson 2023 Can J Surg | — / PMC10521811 | Fig. 1 | **CC BY-NC-ND 4.0** | 候補（全体） | 模式 | 現行はリンク。Atlas は全体可 |
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
| Testoni 2024 Gastrointest Disord | — / 10.3390/gidisord6030044 | Fig. 1A–F | **CC BY 4.0** | **候補（優先）** | I, II, IIIL/s, IV, Vi, Vn（i-Scan） | 著者症例。II-O なし |
| Li 2014 WJG meta | — / PMC4168103 | 表 | CC BY-NC | 参考 | 定義表 | 画像なし |

#### 大腸 EC / EC-V

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Kudo 2011 Endoscopy / 2015 GIE | 21837586 / 26071058 | — | 非 CC | リンクのみ | EC1a–3b, EC-V | 原著 |
| Misawa 2021 Clin Endosc | 34233111 | Fig. 2–3 | **CC BY-NC 3.0** | **掲載済** | EC + EC-V | 一次ソース |
| Utsumi / Sano 2018 WJGO | 29666668 | 不一致例 | **CC BY-NC 4.0** | 参考 | 部分 | 全型プレートではない。Misawa で足りる |

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
| Mezzapesa 2022 IJMS | — / PMC9032676 | Fig. 2, 4 等 | **CC BY 4.0** | **候補（優先）** | SSL, TSA（HP は本文） | 病理。第一著者 Mezzapesa |
| Dang 2021 Can J Surg | 34728521 / PMC8565879 | Fig. 1A–C | **CC BY-NC-ND 4.0** | 候補（全体） | HP / SSL / TSA | Atlas 向き。IJMS と並ぶ |
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
| EBHI-Seg 2023 | — / PMC9902656 | データセット | **CC BY 4.0** | 使わない | LGIEN/HGIEN 等 | Vienna ラベルではない |

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
| Tsuji 2015 WJG | — / 21(41):11832 | Fig. 2–4 | **CC BY-NC 4.0** | 候補（全体） | アルゴリズム転載 + 症例 | Nakagawa の方が血管型が揃う |
| Nakagawa 2024 Clin Endosc | 38749404 / PMC11457973 | Fig. 1a–e | **CC BY-NC** | **候補（優先・全体）** | absent / network / ISV / unclassified / mixed | 血管型が揃う。切り抜かない |
| QIMS 2023 総説 | 36819279 / PMC9929402 | 本文 | CC BY-NC-ND | 参考 | 記述のみ | 図なし |

**ギャップ（CC BY）**: NC なしの揃い図は未確認。Atlas は Nakagawa 2024 の全体で足りる。

#### Uchiyama ME-NBI（乳頭部 I–III）

| 出典 | PMID / PMC | 図 | ライセンス | 状態 | カバー | メモ |
|---|---|---|---|---|---|---|
| Uchiyama 2006 J Gastroenterol | 16612620 | — | 非 CC | リンクのみ | I–III | 原著 |
| Iwashita 2015 Am J Case Rep | 26324328 / PMC4560156 | Fig. 1–2 | **CC BY-NC-ND 3.0** | 候補（全体・部分） | I/II → 後年 III | 全型揃いではない。異常血管プレートなし |
| — | — | — | — | **ギャップ（揃い図）** | — | I / II / III + 異常血管が1枚に揃った CC 図は未確認 |

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
| Zhou 2025 J South Med Univ | — | Fig. 1 | **CC BY-NC-ND 4.0** | **掲載済（全体）** | Ia–III | Atlas 向き。追加不要 |
| Endoscopy Campus 等 | — | 多数 | 非 CC | 使わない | Ia–III | |

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

Atlas は全体掲載。ND も同じ優先度で見てよい。

### P1 — ギャップを埋める全体図

| 優先 | 分類 | 論文 | 図 | 理由 |
|---|---|---|---|---|
| 1 | **LST** | Moon 2017 PLOS ONE | Fig. 1A–H | 4 亜型の WLI+色素 |
| 2 | **pit pattern** | Testoni 2024 Gastrointest Disord | Fig. 1A–F | I–Vn 実写。Clin Endosc 2025 Fig. 4 は使わない |
| 3 | **WHO serrated** | Mezzapesa 2022 IJMS または Dang 2021 CJS | Fig. 2/4 または Fig. 1 | IJMS は BY。CJS は ND だが HP/SSL/TSA が1枚 |
| 4 | **NET G1–G3** | Uccella 2021 Endocrine | Fig. 3 | H&E+Ki-67。G3 vs NEC |
| 5 | **Kikuchi ME-NBI** | Nakagawa 2024 Clin Endosc | Fig. 1 | 血管型が揃う。NC。全体のまま |

### P2 — 既掲載の補完、または部分

| 分類 | 論文 | 図 | 理由 |
|---|---|---|---|
| MESDA-G | Miyaoka 2020 TGH / Muto 2016 | Fig. 5–8 / Fig. 13 | ND。全体。Kurumi の補完 |
| Paris（胃） | Castañeda 2022 Cancers | Fig. 1 | 実写だが胃 |
| Paris（模式） | Johnson 2023 Can J Surg | Fig. 1 | ND。全体 |
| EREFS | Sawada 2025 DEN Open | Fig. 1 | Abe の別症例 |
| JNET | Yoshida 2021 EIO | BLI 例 | ND。全体 |
| WASP | Vu 2024 Fig. 1 | アルゴリズム | 画面フローと重複しうる |
| Uchiyama | Iwashita 2015 AJCR | Fig. 1–2 | ND。経過例のみ |

### P3 — 文献の揃い図なし

| 分類 | 方針 |
|---|---|
| Vienna | カテゴリ表。CC の型プレートなし |
| Lauren | 対比図なし |
| 乳頭部肉眼型 | 揃い図なし。模式を新作するか表 |
| SPS | 既存の基準表で足りる |
| Forrest / 虫垂開口 | 既に全体掲載。追加不要 |

---

## 8. 使ってはいけないもの

| もの | 理由 |
|---|---|
| Kim 2025 Clin Endosc **Fig. 4**（pit） | 記事は CC BY-NC。**原図は他誌からの許諾再掲** |
| Kim 2025 Fig. 2/3 の「Paris/LST 原著図」扱い | 模式の転載。実写 atlas ではない。現行どおりリンク |
| Endoscopy Campus / 教科書サイトの写真 | CC ではない |
| HyperKvasir 等の大規模データセット画像 | 分類教育プレートではない。個別ライセンスも別 |
| Hu 2012 J Gastrointest Oncol の図 | All rights reserved。CC ではない |
| WHO Blue Book の図 | IARC。CC ではない |
| 原著 Wiley / Elsevier / BMJ / Thieme 図 | 現行どおり `href` のみ |

---

## 9. 臓器別の充足度

| 臓器 | 実写 CC が揃っている | 模式のみ / 部分 | ギャップ |
|---|---|---|---|
| 食道 | JES, LA, Hill, EREFS, JSPH, Prague, Siewert | — | — |
| 胃 | MESDA-G VS, 木村–竹本 | Lauren | Lauren 対比図（再検索後もなし） |
| 大腸光学 | JNET, NICE, WASP, EC, ESD-F | Paris, LST, pit（模式。実写候補あり） | 大腸 Paris 実写の揃い図 |
| 大腸病理 | ITBCC | SPS 表 | Vienna。WHO serrated は候補確定 |
| 十二指腸 | Toya | Kikuchi（NC 全体） | Uchiyama 揃い図、肉眼型 |
| 出血 | Forrest（全体済）, Sarin 模式 | — | — |

---

## 10. 実装時のチェックリスト

1. 出版社ページでライセンス文を再読する（Europe PMC タグと食い違うことがある）。
2. 図キャプションが「Adapted from / Reproduced with permission」なら **許諾再掲** として捨てる。
3. **Atlas は切り抜かない。** 原図全体を `src` に置く。ND も改変なしなら可。
4. 二次資料は `figureKind: 'secondary'`、`isSecondarySource: true`、About の `citationsCc` を更新。
5. スコアカード側で切る場合だけ、日本語 `note` にライセンスと `埋め込まず` を入れる（`verify-scores.ts`）。Atlas では不要。
6. このファイルの「掲載済」行を実装後に更新する。

関連: [`adding-scores.md`](./adding-scores.md) §5。
