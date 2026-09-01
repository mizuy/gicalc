# GI Calc / gicalc

消化管内視鏡向けスコアリング・予測ツール（Web / PWA）。

3つのスコア体系は目的も対象疾患も異なります。混同しないでください。

| ツール | 対象 | 出力 |
|--------|------|------|
| T1 Nomogram（Kajiwara / JSCCR） | 大腸T1癌の LNM 確率 | 確率（%） |
| eCura（Hatta 2017） | 早期胃癌・非治癒切除後 LNM | 点数 0–7 |
| BEST-J（Hatta 2021） | 早期胃癌 ESD 後出血 | 点数 |

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

1. `data/scores/xxx.ts` に `ScoreDefinition` を定義する
2. `data/scores/index.ts` の `SCORES` に追加する
3. 必要なら `types/score.ts` に `ScoreCategory` を追加する

`/score/{id}` は expo-router の動的ルートで自動的に開きます。

## 免責

本ツールは診断支援用であり、医師の臨床判断を代替するものではありません。スコア・ノモグラムの解釈は最新の JSCCR / JGES ガイドラインと施設プロトコルに従ってください。
