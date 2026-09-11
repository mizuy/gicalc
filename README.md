# GI Calc / gicalc

消化管内視鏡向けスコア・予測・内視鏡分類ツール（Web / PWA）。既定は英語です。ヘッダーの **JA / EN** で日本語と英語を切り替えられ、選んだ言語はブラウザに保存されます。計算は各項目の最低点から始まります。

公開サイト: https://mizuy.github.io/gicalc/

<img src="docs/gicalc-qr.png" alt="GI Calc 公開サイト https://mizuy.github.io/gicalc/ の QR コード" width="180" />

食道、胃、十二指腸、大腸、出血の順です。

| 臓器 | ツール | 対象 | 出力 |
|------|--------|------|------|
| 食道 | JES（Oyama 2017） | 扁平上皮の拡大（IPCL） | 定義一覧（原著の図・文言） |
| 食道 | LA（Lundell 1999） | 逆流性食道炎 A–D | 定義一覧（文言。図は VideoGIE へリンク） |
| 食道 | Prague C & M（Sharma 2006） | Barrett の C / M | 定義一覧（原著リンク + Oyanagi 2022 参考図） |
| 食道 | EREFS（Hirano 2013） | 好酸球性食道炎の所見 | 定義一覧（Abe 2022 の図・文言。ほかの CC 図は `/atlas/erefs`） |
| 食道 | 門脈圧亢進症学会分類（F / L / C / RC） | 食道胃静脈瘤 | 定義一覧 |
| 食道 | 治癒切除判定（JGES/JES） | 食道 ESD 後・根治度 | 治癒切除 / 追加治療 / 非治癒切除 |
| 胃 | 木村–竹本（Quach 2019） | 内視鏡的萎縮 | 定義一覧（Quach 2019 の図・文言） |
| 胃 | Hill（1996） | 胃食道フラップ弁 I–IV | 定義一覧（Ge 2023 の図・文言） |
| 胃 | MESDA-G（Muto 2016） | 早期胃癌の拡大（M-NBI） | 定義一覧（Kurumi 2021 切り抜き + 原著リンク。ほかの CC 図は `/atlas/mesda-g`） |
| 胃 | 京都分類（原法） | 胃炎・胃癌リスク | 点数 0–8 |
| 胃 | 改変京都（Kawamura 2021） | 胃炎・胃癌リスク | 点数 0–5 |
| 胃 | EGGIM | 内視鏡的腸上皮化生 | 点数 0–8 |
| 胃 | 治癒切除判定（JGES/JGCA） | ESD 後・内視鏡的根治度 | eCuraA / B / C-1 / C-2 |
| 胃 | eCura LNM（Hatta 2017） | 早期胃癌・非治癒切除後 LNM | 点数 0–7 |
| 胃 | Sekiguchi（2016） | 早期胃癌 LNM（混合型を区別） | 点数 0–11 |
| 胃 | BEST-J（Hatta 2021） | 早期胃癌 ESD 後出血 | 点数 |
| 十二指腸 | Spigelman（1989） | FAP 十二指腸腺腫 | 点数 0–12 / Stage 0–IV |
| 十二指腸 | Modified Spigelman（Saurin 2004） | FAP 十二指腸腺腫（Vienna 異型度） | 点数 0–12 / Stage 0–IV |
| 十二指腸 | Ishii（2021） | SNADET C3 vs C4/5 | 点数 0–5 |
| 十二指腸 | Kakushima WLI（2017） | SNADET LGA vs HGA/癌 | 点数 0–5 |
| 十二指腸 | Toya ME-CV（2020） | SNADET（ME-CV） | アルゴリズム（C3 / C4/5） |
| 十二指腸 | Kikuchi ME-NBI（2014） | SNADET（ME-NBI） | アルゴリズム（C3 / C4/5。Kurata 2024 参考図） |
| 十二指腸 | Uchiyama ME-NBI（2006） | 乳頭部 ME-NBI Type I–III | 分類（原著リンク。Iwashita 2015 は `/atlas/uchiyama`） |
| 十二指腸 | 乳頭部癌肉眼型（JSBS） | 胆道癌取扱い規約 | 分類（腫瘤 / 潰瘍 / 混在 / その他） |
| 大腸 | APCS（Yeoh 2011） | 無症状アジア人の進行大腸腫瘍リスク | 点数 0–7 |
| 大腸 | Vienna（Schlemper 2000） | 消化管上皮性腫瘍の病理分類 | 定義一覧（C1–C5） |
| 食道・胃・大腸 | Paris（2005 Update / 2003） | 表在型腫瘍の肉眼型（Type 0） | 定義一覧（自作 CC 参考図 + 原著リンク。ほかの CC 図は `/atlas/paris`。食道・胃・大腸の一覧から開く） |
| 大腸 | LST（Kudo 2008） | 側方発育型腫瘍の4亜型 | 定義一覧（自作 CC 参考図 + 原著リンク。ほかの CC 図は `/atlas/lst`） |
| 大腸 | 工藤–鶴田（pit pattern） | 色素拡大 pit pattern | 定義一覧（自作 CC 参考図 + 原著リンク） |
| 大腸 | ESD-F（Matsumoto 2010 / Kim 2016） | 大腸 ESD 粘膜下層線維化 F0–F2 | 定義一覧（原著リンク + Inada 2013 参考図） |
| 大腸 | Sydney DMI（Burgess 2017） | EMR 後の深部壁損傷 Type 0–V | 定義一覧（原著リンク） |
| 大腸 | 治癒切除判定（JGES/JSCCR） | 大腸 ESD 後・内視鏡的治癒切除 | 治癒切除 / 追加腸切除 / VM1 |
| 大腸 | NICE（Hayashi 2013） | 大腸 NBI（非拡大） | 定義一覧（Hamada 2021 CC 図 + Hayashi 原著リンク） |
| 大腸 | WASP（IJspeert 2016） | HP / SSL / 腺腫（<10 mm） | 定義一覧（文言。図は原著へリンク） |
| 大腸 | JNET（Sano 2016） | NBI 拡大 | 定義一覧（Lee 2021 切り抜き + 原著リンク。ほかの CC 図は `/atlas/jnet`） |
| 大腸 | T1 Nomogram（Kajiwara 2023） | 大腸T1癌の LNM 確率 | 確率（%）と nomogram 点 |
| 大腸 | e-T2 Score（Koyama 2022） | 大腸 T1b vs T2 の内視鏡鑑別 | 点数 0–11 |
| 大腸 | BBPS（Lai 2009） | 腸管前処置（洗浄後・3区域） | 点数 0–9（Kim 2024 CC 図例） |
| 大腸 | Aronchick | 腸管前処置（洗浄前・全体） | 5段階（JGES 2020 Table 11 準拠） |
| 出血 | Forrest（1974） | 消化性潰瘍出血の所見 | 定義一覧（Zhou 2025 の図・文言） |
| 出血 | GBS（Blatchford 2000） | 上部消化管出血 | 点数 0–23 |
| 出血 | NOBLADS（Aoki 2016） | 急性下部消化管出血 | 点数 0–8 |

## 開発

```bash
npm install
npm test
npm run web
```

静的書き出し（PWA Service Worker 付き）:

```bash
npm run build:web
npm run preview:web
```

## GitHub Pages

公開 URL: https://mizuy.github.io/gicalc/

`main` への push で GitHub Actions が `dist/` をデプロイします。初回だけリポジトリの
[Settings → Pages](https://github.com/mizuy/gicalc/settings/pages) で
**Source を GitHub Actions** にしてください。

プロジェクトサイトなので、本番ビルドは base path `/gicalc` を付けます。

```bash
npm run build:pages
npm run preview:pages
```

`dist/` を静的ホスティングへ配置することもできます。

## スコア追加

詳細な手順・設計方針は **[docs/adding-scores.md](docs/adding-scores.md)** を参照してください。

概要:

1. `data/scores/xxx.ts` に定義（計算系・分類一覧・アルゴリズム）
2. `data/scores/index.ts` の `ALL_SCORE_DEFINITIONS` に追加
3. 英語 UI は `lib/i18n/scoreCopy.ts`、結果訳は `lib/i18n/results.ts`
4. `scripts/verify-scores.ts` を更新して `npm test`

`/score/{id}` は expo-router の動的ルートで自動的に開きます。改変版がある場合は `data/scores/variant-groups.ts` で同一ページのタブにまとめます。

## 引用とライセンス

図と原著のライセンスは出版社ページと Crossref で確認した。

**Creative Commons**

- JES（Oyama 2017, *Esophagus*）の図: **CC BY 4.0**
- EREFS の図（Abe 2022, *Diagnostics* Fig. 2）: **CC BY 4.0**（各所見に切り抜き。Tanaka 2025 は `/atlas/erefs`）
- GERD LA分類の図（Jung 2025, *Korean J Helicobacter Up Gastrointest Res* Fig. 1A–D）: **CC BY-NC 4.0**（各 Grade に切り抜きを掲載）
- Hill の図（Ge 2023, *Ann Med* Fig. 1）: **CC BY-NC 4.0**
- Forrest の図（Zhou 2025, *J South Med Univ* Fig. 1）: **CC BY-NC-ND 4.0**（改変・切り抜きなしで原図全体を掲載）
- MESDA-G の VS 分類例（Kurumi 2021, *J Clin Med* Fig. 5）: **CC BY 4.0**（MS / MV の各型に切り抜きを掲載。Muto 2016 原著は CC BY-NC-ND 4.0。Miyaoka 2020 は `/atlas/mesda-g`）
- 木村–竹本の図（Quach 2019, *Clin Endosc* Fig. 2）: **CC BY-NC 3.0**
- Paris の図（Kim 2025, *Clin Endosc* Fig. 2）: **CC BY-NC 4.0**（埋め込まずリンク。Johnson 2023 / Fujiyoshi 2022 は `/atlas/paris`）
- LST の図（Kim 2025, *Clin Endosc* Fig. 3）: **CC BY-NC 4.0**（埋め込まずリンク。Myung 2017 は `/atlas/lst`）
- 虫垂開口部 Type 分類の図（Oung 2020, *Endosc Int Open* Fig. 2）: **CC BY-NC-ND 4.0**（改変・切り抜きなしで原図全体を掲載）
- BEST-J（Hatta 2021, *Gut*）: **CC BY-NC 4.0**
- NICE teaching 図（Hamada 2021, *BMC Gastroenterol* Fig. 1）: **CC BY 4.0**（各 Type に Endoscopic image 行から切り抜きを掲載。Hayashi 2013 原著 Fig. 1 は Elsevier 著作権のためリンクのみ）
- BBPS 区域スコア例（Kim 2024, *Sci Rep* Fig. 1）: **CC BY 4.0**（Lai 2009 原著 Fig. 1 は Elsevier 著作権）
- Aronchick（2000, *GIE*）: Crossref 上の Version of Record は **CC BY-NC-ND 4.0**（遅延公開）
- Kakushima WLI スコア（Kakushima 2017, *Endosc Int Open* Table 2）: **CC BY-NC-ND 4.0**（表は HTML のため埋め込まず Table 2 へリンク）
- JNET teaching 図（Lee 2021, *Clin Endosc* Fig. 1）: **CC BY-NC 4.0**（各 Type に下段 NBI を切り抜き。原図は埋め込まずリンク）
- JNET 図鑑（Grega 2025 *Sci Rep* Fig. 2 / Le 2024 *Medicine* Fig. 2 / Ahmed 2024 *DEN Open* Fig. 1 / Wang 2021 *WJGO* Fig. 2）: **CC BY-NC-ND 4.0** / **CC BY 4.0** / **CC BY 4.0** / **CC BY-NC 4.0**（切り抜きせず原図全体。ND も改変なしで掲載）
- Paris 図鑑（Johnson 2023 *Can J Surg* Fig. 1 / Fujiyoshi 2022 *Cancers* Fig. 1）: **CC BY-NC-ND 4.0** / **CC BY 4.0**（切り抜きせず原図全体。Fujiyoshi は胃）
- LST 図鑑（Myung 2017 *PLoS ONE* Fig. 1）: **CC BY 4.0**（切り抜きせず原図全体）
- WHO serrated 図鑑（Mezzapesa 2022 *IJMS* Fig. 1–4 / Hyun 2021 *Can J Surg* Fig. 1–2）: **CC BY 4.0** / **CC BY-NC-ND 4.0**（切り抜きせず原図全体）
- EREFS 図鑑（Tanaka 2025 *DEN Open* Fig. 1）: **CC BY 4.0**（切り抜きせず原図全体）
- MESDA-G 図鑑（Miyaoka 2020 *TGH* Fig. 5–8）: **CC BY-NC-ND 4.0**（切り抜きせず原図全体）
- Uchiyama 図鑑（Iwashita 2015 *Am J Case Rep* Fig. 1–2）: **CC BY-NC-ND 3.0**（切り抜きせず原図全体。症例経過）
- NET G1–G3 参考図（La Rosa 2021 *Rev Endocr Metab Disord* Fig. 3）: **CC BY 4.0**（改変・切り抜きなしで原図全体を掲載）
- Kikuchi ME-NBI 参考図（Kurata 2024 *Dig Dis* Fig. 1）: **CC BY 4.0**（改変・切り抜きなしで原図全体を掲載）
- ESD-F 参考図（Inada 2013, *Gastroenterol Res Pract* Fig. 1）: **CC BY 3.0**（Matsumoto 2010 原著図ではない）
- Prague 参考図（Oyanagi 2022, *DEN Open* Fig. 5）: **CC BY 4.0**（Sharma 2006 原著図ではない）
- Sarin 参考図（Acevedo 2019, *World J Hepatol* Fig. 1）: **CC BY-NC 4.0**（Sarin 1992 原著図ではない）
- Toya ME-CV 参考図（Kumei 2025, *DEN Open* Fig. 1）: **CC BY 4.0**（Toya 2020 原著図ではない。確認できる4パターンを切り抜き）
- WASP 参考図（Vu 2024, *JGH Open* Fig. 4）: **CC BY 4.0**（IJspeert 2016 原著図ではない。SSL 3所見を切り抜き）
- ITBCC 参考図（Zlobec 2021, *Virchows Arch* Fig. 1）: **CC BY 4.0**（Lugli 2017 原著図ではない。BD1–BD3 を切り抜き、研究的 BD0 は除外）
- 工藤–鶴田 pit pattern カード模式図: プロジェクト提供者の自作図をSVG要素から抽出して高解像度化。**CC BY 4.0**（原著図ではない）
- Paris分類カードの模式図: プロジェクト提供者の自作図を切り抜き。**CC BY 4.0**（Paris原著図ではない）
- LST分類カードの模式図: プロジェクト提供者の自作図を切り抜き。**CC BY 4.0**（LST原著図ではない）

**CC ではないソース**

- JNET（Sano 2016, *Dig Endosc*）: Wiley 標準著作権。原著 Fig. 7 は埋め込まずリンクする
- NICE（Hayashi 2013, *GIE*）: Elsevier 著作権。原著 Fig. 1 は埋め込まずリンクする（CC 図は Hamada 2021 *BMC Gastroenterol* Fig. 1 を埋め込み）
- WASP（IJspeert 2016, *Gut*）: BMJ 著作権。図は埋め込まず、原著 Fig. 1 へリンクする
- Sydney DMI（Burgess 2017, *Gut*）: BMJ 著作権。図は埋め込まず、原著 Fig. 1 / Figs 3–5 へリンクする
- Prague（Sharma 2006, *Gastroenterology*）: Elsevier 著作権。図は埋め込まず、原著 Fig. 3 へリンクする
- LA 原著（Lundell 1999, *Gut*）: CC ではない（CC 図は Jung 2025 Fig. 1A–D の切り抜きを掲載）
- 工藤–鶴田の原図（Tanaka 2004, *Dig Endosc* / Kudo 1996, *GIE*）: CC ではない。図は埋め込まず、*Clin Endosc* 2025 Fig. 4 へリンクする（各型カードには自作 CC 参考図を掲載）
- Paris 原著（2005 Update *Endoscopy* / 2003 *GIE*）: CC ではない（各型カードには自作 CC BY 参考図を掲載）
- LST 原著（Kudo 2008, *GIE*）: CC ではない（各亜型カードには自作 CC BY 参考図を掲載。Kim 2025 Fig. 3 はリンク）
- 京都（Shichijo 2017）/ 改変京都（Kawamura 2021）: Wiley、CC ではない
- EGGIM（Pimentel-Nunes 2016, *Endoscopy* / Thieme）: CC ではない
- eCura（Hatta 2017, *AJG*）: CC ではない
- Sekiguchi（2016, *J Gastroenterol*）: CC ではない
- APCS（Yeoh 2011, *Gut*）: CC ではない
- BBPS（Lai 2009, *GIE*）: CC ではない（CC 図例は Kim 2024 *Sci Rep* Fig. 1 を埋め込み）
- GBS（Blatchford 2000, *Lancet*）: CC ではない
- NOBLADS（Aoki 2016, *CGH*）: CC ではない
- T1 Nomogram（Kajiwara 2023, *GIE*）: CC ではない。図は埋め込まず、原著 Fig. 2 へリンクする
- e-T2 Score（Koyama 2022, *GIE*）: CC ではない。図は埋め込まず、論文へリンクする
- Spigelman（Spigelman 1989, *Lancet*）: CC ではない。点数表は GeneReviews Table 5 へリンクする
- Modified Spigelman（Saurin 2004, *JCO*）: CC ではない。論文へリンクする
- Ishii スコア（Ishii 2021, *Dig Endosc*）: CC ではない。論文へリンクする
- Toya ME-CV / Kikuchi ME-NBI（Toya 2020 / Kikuchi 2014, *Dig Endosc*）: CC ではない。論文へリンクする
- Vienna 分類（Schlemper 2000, *Gut*）: CC ではない。論文へリンクする

## 免責

本ツールは診断支援用であり、医師の臨床判断を代替するものではありません。スコア・ノモグラムの解釈は最新の JSCCR / JGES ガイドラインと施設プロトコルに従ってください。
