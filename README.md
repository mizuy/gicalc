# GI Calc / gicalc

消化管内視鏡向けスコア・予測・内視鏡分類ツール（Web / PWA）。既定は英語です。ヘッダーの **JA / EN** で日本語と英語を切り替えられ、選んだ言語はブラウザに保存されます。計算は各項目の最低点から始まります。

食道、胃、十二指腸、大腸、出血の順です。

| 臓器 | ツール | 対象 | 出力 |
|------|--------|------|------|
| 食道 | JES（Oyama 2017） | 扁平上皮の拡大（IPCL） | 定義一覧（原著の図・文言） |
| 食道 | LA（Lundell 1999） | 逆流性食道炎 A–D | 定義一覧（文言。図は VideoGIE へリンク） |
| 食道 | Prague C & M（Sharma 2006） | Barrett の C / M | 定義一覧（文言。図は原著へリンク） |
| 食道 | EREFS（Hirano 2013） | 好酸球性食道炎の所見 | 定義一覧（Abe 2022 の図・文言） |
| 胃 | 木村–竹本（Quach 2019） | 内視鏡的萎縮 | 定義一覧（Quach 2019 の図・文言） |
| 胃 | Hill（1996） | 胃食道フラップ弁 I–IV | 定義一覧（Ge 2023 の図・文言） |
| 胃 | MESDA-G（Muto 2016） | 早期胃癌の拡大（M-NBI） | 定義一覧（原著の図・文言） |
| 胃 | 京都分類（原法） | 胃炎・胃癌リスク | 点数 0–8 |
| 胃 | 改変京都（Kawamura 2021） | 胃炎・胃癌リスク | 点数 0–5 |
| 胃 | EGGIM | 内視鏡的腸上皮化生 | 点数 0–8 |
| 胃 | eCura 判定（JGES/JGCA） | ESD 後・内視鏡的根治度 | eCuraA / B / C-1 / C-2 |
| 胃 | eCura（Hatta 2017） | 早期胃癌・非治癒切除後 LNM | 点数 0–7 |
| 胃 | Sekiguchi（2016） | 早期胃癌 LNM（混合型を区別） | 点数 0–11 |
| 胃 | BEST-J（Hatta 2021） | 早期胃癌 ESD 後出血 | 点数 |
| 十二指腸 | Spigelman（1989） | FAP 十二指腸腺腫 | 点数 0–12 / Stage 0–IV |
| 十二指腸 | Modified Spigelman（Saurin 2004） | FAP 十二指腸腺腫（Vienna 異型度） | 点数 0–12 / Stage 0–IV |
| 十二指腸 | Ishii（2021） | SNADET C3 vs C4/5 | 点数 0–5 |
| 十二指腸 | Kakushima WLI（2017） | SNADET LGA vs HGA/癌 | 点数 0–5 |
| 十二指腸 | Toya ME-CV（2020） | SNADET（ME-CV。ME-NBI は Kikuchi 2014） | アルゴリズム（C3 / C4/5） |
| 大腸 | APCS（Yeoh 2011） | 無症状アジア人の進行大腸腫瘍リスク | 点数 0–7 |
| 大腸 | Vienna（Schlemper 2000） | 消化管上皮性腫瘍の病理分類 | 定義一覧（C1–C5） |
| 大腸 | Paris（2003 / 2005） | 表在型腫瘍の肉眼型（Type 0） | 定義一覧（原著の図・文言） |
| 大腸 | LST（Kudo 2008） | 側方発育型腫瘍の4亜型 | 定義一覧（原著の図・文言） |
| 大腸 | 工藤–鶴田（pit pattern） | 色素拡大 pit pattern | 定義一覧（文言。図は原著へリンク） |
| 大腸 | NICE（Hayashi 2013） | 大腸 NBI（非拡大） | 定義一覧（文言。図は原著へリンク） |
| 大腸 | WASP（IJspeert 2016） | HP / SSL / 腺腫（<10 mm） | 定義一覧（文言。図は原著へリンク） |
| 大腸 | JNET（Sano 2016） | NBI 拡大 | 定義一覧（文言。図は原著へリンク） |
| 大腸 | T1 Nomogram（Kajiwara 2023） | 大腸T1癌の LNM 確率 | 確率（%）と nomogram 点 |
| 大腸 | BBPS（Lai 2009） | 腸管前処置（洗浄後・3区域） | 点数 0–9 |
| 大腸 | Aronchick | 腸管前処置（洗浄前・全体） | 5段階 |
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

1. `data/scores/xxx.ts` に計算系（`fields` + `compute`）または分類一覧（`kind: 'classification'` + `entries`）を定義する
2. `data/scores/index.ts` の `SCORES` に追加する
3. 必要なら `types/score.ts` に `ScoreCategory` を追加する

`/score/{id}` は expo-router の動的ルートで自動的に開きます。

## 引用とライセンス

図と原著のライセンスは出版社ページと Crossref で確認した。

**Creative Commons**

- JES（Oyama 2017, *Esophagus*）の図: **CC BY 4.0**
- EREFS の図（Abe 2022, *Diagnostics* Fig. 2）: **CC BY 4.0**
- Hill の図（Ge 2023, *Ann Med* Fig. 1）: **CC BY-NC 4.0**
- Forrest の図（Zhou 2025, *J South Med Univ* Fig. 1）: **CC BY-NC-ND 4.0**
- MESDA-G（Muto 2016, *Dig Endosc*）の図: **CC BY-NC-ND 4.0**
- 木村–竹本の図（Quach 2019, *Clin Endosc* Fig. 2）: **CC BY-NC 3.0**
- Paris の図（Kim 2025, *Clin Endosc* Fig. 2）: **CC BY-NC 4.0**（Johnson 2023 *Can J Surg* は CC BY-NC-ND 4.0）
- LST の図（Kim 2025, *Clin Endosc* Fig. 3）: **CC BY-NC 4.0**（Castillo-Regalado 2022 *WJGE* は CC BY-NC 4.0）
- BEST-J（Hatta 2021, *Gut*）: **CC BY-NC 4.0**
- Aronchick（2000, *GIE*）: Crossref 上の Version of Record は **CC BY-NC-ND 4.0**（遅延公開）
- Kakushima WLI スコア（Kakushima 2017, *Endosc Int Open* Table 2）: **CC BY-NC-ND 4.0**（表は HTML のため埋め込まず Table 2 へリンク）

**CC ではないソース**

- JNET（Sano 2016, *Dig Endosc*）: Wiley 標準著作権。図は埋め込まず、原著 Fig. 7 へリンクする
- NICE（Hayashi 2013, *GIE*）: Elsevier 著作権。図は埋め込まず、原著 Fig. 1 へリンクする
- WASP（IJspeert 2016, *Gut*）: BMJ 著作権。図は埋め込まず、原著 Fig. 1 へリンクする
- Prague（Sharma 2006, *Gastroenterology*）: Elsevier 著作権。図は埋め込まず、原著 Fig. 3 へリンクする
- LA 原著（Lundell 1999, *Gut*）: CC ではない。A–D 揃いの静止画は置かず、VideoGIE 2013（CC BY-NC-ND 4.0 の動画）へリンクする
- 工藤–鶴田の原図（Tanaka 2004, *Dig Endosc* / Kudo 1996, *GIE*）: CC ではない。図は埋め込まず、*Clin Endosc* 2025 Fig. 4 へリンクする（記事自体は CC BY-NC、原図は許諾再掲）
- Paris 原著（2003 *GIE* / 2005 *Endoscopy*）: CC ではない
- LST 原著（Kudo 2008, *GIE*）: CC ではない
- 京都（Shichijo 2017）/ 改変京都（Kawamura 2021）: Wiley、CC ではない
- EGGIM（Pimentel-Nunes 2016, *Endoscopy* / Thieme）: CC ではない
- eCura（Hatta 2017, *AJG*）: CC ではない
- Sekiguchi（2016, *J Gastroenterol*）: CC ではない
- APCS（Yeoh 2011, *Gut*）: CC ではない
- BBPS（Lai 2009, *GIE*）: CC ではない
- GBS（Blatchford 2000, *Lancet*）: CC ではない
- NOBLADS（Aoki 2016, *CGH*）: CC ではない
- T1 Nomogram（Kajiwara 2023, *GIE*）: CC ではない。図は埋め込まず、原著 Fig. 2 へリンクする
- Spigelman（Spigelman 1989, *Lancet*）: CC ではない。点数表は GeneReviews Table 5 へリンクする
- Modified Spigelman（Saurin 2004, *JCO*）: CC ではない。論文へリンクする
- Ishii スコア（Ishii 2021, *Dig Endosc*）: CC ではない。論文へリンクする
- Toya ME-CV / Kikuchi ME-NBI（Toya 2020 / Kikuchi 2014, *Dig Endosc*）: CC ではない。論文へリンクする
- Vienna 分類（Schlemper 2000, *Gut*）: CC ではない。論文へリンクする

## 免責

本ツールは診断支援用であり、医師の臨床判断を代替するものではありません。スコア・ノモグラムの解釈は最新の JSCCR / JGES ガイドラインと施設プロトコルに従ってください。
