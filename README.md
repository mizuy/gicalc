# GI Calc / gicalc

消化管内視鏡向けスコア・予測・内視鏡分類ツール（Web / PWA）。ヘッダーの **JA / EN** で日本語と英語を切り替えられます。言語はブラウザに保存されます。

食道、胃、大腸、出血の順です。

| 臓器 | ツール | 対象 | 出力 |
|------|--------|------|------|
| 食道 | JES（Oyama 2017） | 扁平上皮の拡大（IPCL） | 定義一覧（原著の図・文言） |
| 胃 | 木村–竹本（1969） | 内視鏡的萎縮 | 定義一覧（原著の図・文言） |
| 胃 | 京都分類（原法） | 胃炎・胃癌リスク | 点数 0–8 |
| 胃 | 改変京都（Kawamura 2021） | 胃炎・胃癌リスク | 点数 0–5 |
| 胃 | EGGIM | 内視鏡的腸上皮化生 | 点数 0–8 |
| 胃 | eCura（Hatta 2017） | 早期胃癌・非治癒切除後 LNM | 点数 0–7 |
| 胃 | Sekiguchi（2016） | 早期胃癌 LNM（混合型を区別） | 点数 0–11 |
| 胃 | BEST-J（Hatta 2021） | 早期胃癌 ESD 後出血 | 点数 |
| 大腸 | APCS（Yeoh 2011） | 無症状アジア人の進行大腸腫瘍リスク | 点数 0–7 |
| 大腸 | 工藤–鶴田（pit pattern） | 色素拡大 pit pattern | 定義一覧（原著の図・文言） |
| 大腸 | JNET（Sano 2016） | NBI 拡大 | 定義一覧（原著の図・文言） |
| 大腸 | T1 Nomogram（Kajiwara 2023） | 大腸T1癌の LNM 確率 | 確率（%） |
| 大腸 | BBPS（Lai 2009） | 腸管前処置（洗浄後・3区域） | 点数 0–9 |
| 大腸 | Aronchick | 腸管前処置（洗浄前・全体） | 5段階 |
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

## 免責

本ツールは診断支援用であり、医師の臨床判断を代替するものではありません。スコア・ノモグラムの解釈は最新の JSCCR / JGES ガイドラインと施設プロトコルに従ってください。
