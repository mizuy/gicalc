# スコア・分類ページの追加方針

GI Calc に新しいツール（スコア、予測モデル、内視鏡分類、アルゴリズム）を追加するときの手順と設計方針です。

## 全体像

```
data/scores/xxx.ts     … 定義（メタデータ・fields / entries）
lib/scores/xxx.ts      … 計算ロジック（compute が必要なとき）
lib/i18n/scoreCopy.ts  … 英語 UI 文言
lib/i18n/results.ts    … 結果 interpretation / details の英訳
data/scores/index.ts   … 登録（ALL_SCORE_DEFINITIONS）
app/score/[id].tsx     … 動的ルート（通常は触らない）
scripts/verify-scores.ts … 回帰テスト（必ず更新）
```

`/score/{id}` は [expo-router](https://docs.expo.dev/router/introduction/) の動的ルートで自動的に開きます。専用のページファイルを増やす必要はありません。

**既定 UI 言語は英語**です。日本語は定義ファイルの原文、英語は `SCORE_EN` で上書きします。

---

## 1. ツール種別を決める

| 種別 | `toolKind` | 画面 | 例 |
|------|------------|------|-----|
| 内視鏡分類 | `classification`（省略可） | 定義一覧 | JNET, Paris, Vienna |
| 点数スコア | `score`（省略可） | 項目選択 → 合計点 | 京都分類, APCS, BBPS |
| 予測モデル | `prediction` | 項目選択 → 確率/判定 | Ishii, Kajiwara nomogram |
| アルゴリズム | `algorithm` | 専用 UI またはフロー | 治癒切除判定, MESDA-G, WASP |

型定義とコメントは [`types/score.ts`](../types/score.ts) を参照してください。

### 計算系（calculator）

`kind` を省略するか `'calculator'` にします。

```ts
// data/scores/xxx.ts
import { computeXxx } from '../../lib/scores/xxx';
import type { ScoreDefinition } from '../../types/score';

export const xxxScore: ScoreDefinition = {
  id: 'xxx',
  name: '…',
  shortName: '…',
  organ: 'colorectum',       // esophagus | stomach | duodenum | colorectum | bleeding
  category: 'screening',
  categoryLabel: '大腸がん検診',
  description: '…',
  reference: 'Author et al. Journal Year',
  pubmed: '12345678',        // PMID
  fields: [ /* ScoreField[] */ ],
  compute: computeXxx,
};
```

`compute` は [`lib/scores/xxx.ts`](../lib/scores/) に置き、`ScoreResult` を返します。各 field の `options[].value` は **数値**で、合計に足し込めるようにします。

### 分類一覧（classification）

```ts
import type { ClassificationDefinition } from '../../types/score';

export const xxxScore: ClassificationDefinition = {
  id: 'xxx',
  kind: 'classification',
  name: '…',
  shortName: '…',
  originalLead: '…',   // 原著の定義文（英語原著なら英語のまま）
  entries: [
    {
      label: 'Type 1',
      meaning: '…',
      rows: [{ heading: 'Vessel', text: '…' }],
      comment: '日本語コメント（任意）',
      group: 'グループ名（任意）',
      figures: [ /* 型ごとの切り抜き図 */ ],
    },
  ],
};
```

- **英語原著**（Paris, NICE など）: `originalLead` と `rows` は英語。`originalLocale` は省略（既定 `en`）。
- **日本語原著**（門脈圧亢進症学会分類など）: `originalLocale: 'ja'` を付け、定義文は日本語のまま。

### 手順付きアルゴリズム（classification + flow）

WASP や MESDA-G のように、分類に **対話フロー** を付ける場合は `flow` を追加します。画面は `AlgorithmFlowScreen` が担当します。

[`data/scores/wasp.ts`](../data/scores/wasp.ts) や [`data/scores/mesda-g.ts`](../data/scores/mesda-g.ts) をテンプレートにしてください。英語 UI には `lib/i18n/scoreCopy.ts` の `flow` ブロックも必要です。

### 治癒切除判定など専用 UI

胃・食道・大腸の ESD 治癒切除判定は、通常の calculator ではなく **専用 Screen** を使います。

1. `data/scores/xxx-esd-curability.ts` に定義（`toolKind: 'algorithm'`）
2. `lib/scores/xxx-esd-curability.ts` に判定ロジック
3. `components/calculator/XxxEsdCurabilityScreen.tsx` に UI
4. [`app/score/[id].tsx`](../app/score/[id].tsx) の `CURABILITY_SCREENS` に id を登録

新規の専用 UI が必要なケースは稀です。まず既存パターンに当てはまるか確認してください。

---

## 2. 一覧への登録

[`data/scores/index.ts`](../data/scores/index.ts) の **`ALL_SCORE_DEFINITIONS`** に import して追加します。

```ts
export const ALL_SCORE_DEFINITIONS: ScoreDefinition[] = [
  // … 臓器順（食道 → 胃 → 十二指腸 → 大腸 → 出血）
  xxxScore,
];

/** ホーム一覧用（variant 専用 id は除外） */
export const SCORES = ALL_SCORE_DEFINITIONS.filter(
  (score) => !HIDDEN_LIST_SCORE_IDS.has(score.id),
);
```

- 一覧の並びは **臓器順**、臓器内は **分類 → リスクスコア → 治療・予測** のおおよその順です。
- 新規 `ScoreCategory` が必要なら [`types/score.ts`](../types/score.ts) の `ScoreCategory` と `CATEGORY_LABELS` を更新し、`lib/i18n/ui.ts` の `category` 英訳も追加します。

---

## 3. 改変版がある場合（タブ統合）

原法と改変版を **別ページにせず、同一 URL 内タブ** で切り替える方針です（京都分類・Spigelman・APCS が先例）。

[`data/scores/variant-groups.ts`](../data/scores/variant-groups.ts):

```ts
export const SCORE_VARIANT_GROUPS = {
  kyoto: {
    pageId: 'kyoto',                    // 一覧・URL の代表 id
    defaultVariantId: 'kyoto-modified', // 初期タブ（改変版を優先）
    variantIds: ['kyoto-modified', 'kyoto'],
  },
};
```

| 項目 | 方針 |
|------|------|
| 一覧 | `pageId` のみ表示。`variantIds` のうち `pageId` 以外は `HIDDEN_LIST_SCORE_IDS` で自動除外 |
| デフォルト | **改変版**を `defaultVariantId` にする |
| URL | `/score/kyoto` → 改変版。`/score/kyoto-modified` 等のレガシー URL も `resolveScoreRoute()` で解決 |
| タブ UI | 計算系は `ScoreVariantTabs`（改変版 / 原法）。`app/score/[id].tsx` が自動表示 |

両方の定義を `ALL_SCORE_DEFINITIONS` に入れ、**英語コピーも両方**用意します。

---

## 3b. 関連スコアリンク

臨床フロー上つながるツール同士は、各ページ上部（文献・注の直後）に **関連ツール** パネルで相互リンクします。パラメータの引き継ぎ（prefill）は行いません — リンクのみです。

[`data/scores/related-scores.ts`](../data/scores/related-scores.ts) に一覧を書きます:

```ts
export const RELATED_SCORES: Record<string, readonly RelatedScoreEntry[]> = {
  'colorectal-esd-curability': [
    {
      id: 'kajiwara-nomogram',
      hint: { ja: '追加切除検討時の LNM 確率', en: 'LNM probability when considering additional resection' },
    },
  ],
  'kajiwara-nomogram': [
    { id: 'colorectal-esd-curability', hint: { ja: '…', en: '…' } },
  ],
};
```

| 項目 | 方針 |
|------|------|
| 表示 | [`RelatedScoresPanel`](../components/calculator/RelatedScoresPanel.tsx) — 全スコア画面に共通配置 |
| キー | 表示中スコア id。variant ページは `pageId`（例: `kyoto`）でも可 |
| URL | `resolveScoreRoute()` で `pageId` に解決（改変版タブの既定表示） |
| 双方向 | 関連があれば **両方** にエントリを書く |
| hint | 任意。省略時はスコア名のみ |
| 結果文 | 「本アプリの ○○ を参照」は残してよいが、リンクパネルが主導線 |

新規スコア追加時は、同カテゴリ・前後工程のツールがあれば `RELATED_SCORES` に追記してください。`scripts/verify-scores.ts` が id の妥当性を検証します。

---

## 4. 国際化（i18n）

| ファイル | 内容 |
|----------|------|
| [`lib/i18n/scoreCopy.ts`](../lib/i18n/scoreCopy.ts) | `SCORE_EN[id]`: name, description, fields, groups, comments, flow, note |
| [`lib/i18n/results.ts`](../lib/i18n/results.ts) | `compute()` が返す interpretation / details の英訳 |
| [`lib/i18n/ui.ts`](../lib/i18n/ui.ts) | 共通 UI（タブラベル等）。通常は触らない |

**ルール**

- 定義ファイル（`data/scores/`）は **日本語**を書く（分類の原著文は除く）。
- 英語モードは `localizeScore()` が `SCORE_EN` で上書きする。
- 新しい結果文言を足したら `results.ts` に英訳を追加しないと英語 UI に日本語が残る。

---

## 5. 図・引用・ライセンス

[`ClassificationFigure`](../types/score.ts) の方針:

| 条件 | やること |
|------|----------|
| **CC ライセンス確認済み** | `public/figures/` に画像を置き、`src: '/figures/xxx.jpg'` で埋め込む |
| **CC ではない / 未確認** | 画像は置かず `href` + `hrefLabel` で原著・GeneReviews 等へリンク |
| 出典 | `source`, `doi`, `pubmed`, `note`（ライセンス説明）を必ず書く |

CC 済み・非 CC の一覧は [README の引用とライセンス](../README.md#引用とライセンス) を参照。About 画面（`lib/i18n/ui.ts` の `about.citationsCc`）とも整合させてください。

`developedInJapan: true` は **日本で考案・策定されたツールのみ**（Paris / NICE 等の国際分類には付けない）。

---

## 6. テスト更新（必須）

[`scripts/verify-scores.ts`](../scripts/verify-scores.ts) を更新してから PR します。

```bash
npm test
npm run typecheck   # 任意だが推奨
```

最低限やること:

1. **登録スコア一覧** — `SCORES.map(s => s.id)` の期待配列に id を追加（variant 専用 id は一覧に入れない）
2. **臓器別グループ** — `getScoresGroupedByOrgan()` の期待値
3. **toolKind / developedInJapan** — 該当テストの期待値
4. **compute** — 代表入力での点数・解釈のテスト（新規 `test('Xxx: …')` ブロック）
5. **英語コピー** — `SCORE_EN[id]` を追加（variant 専用 id も `ALL_SCORE_DEFINITIONS` 分は必要）
6. **variant** — `variant-groups` を触ったらルーティング・件数テストを更新

「各スコア定義の compute がフィールド経由で動く」テストが全定義を走査するため、登録漏れはここで検出されます。

---

## 7. 追加チェックリスト

新規ツール追加時:

- [ ] `data/scores/xxx.ts` 定義
- [ ] `lib/scores/xxx.ts`（compute がある場合）
- [ ] `data/scores/index.ts` → `ALL_SCORE_DEFINITIONS`
- [ ] `lib/i18n/scoreCopy.ts` → `SCORE_EN['xxx']`
- [ ] `lib/i18n/results.ts`（新しい結果文言がある場合）
- [ ] 図: CC 確認 → `public/figures/` またはリンクのみ
- [ ] `scripts/verify-scores.ts` 更新
- [ ] `npm test` 成功
- [ ] README の収録ツール表（任意・大きな追加のとき）

改変版を既存ページに統合するとき:

- [ ] 改変版・原法の両定義を `ALL_SCORE_DEFINITIONS` に保持
- [ ] `variant-groups.ts` にグループ追加（`defaultVariantId` = 改変版）
- [ ] 原法側の `note` でタブの存在を案内
- [ ] 一覧から改変版専用 id が消えることをテストで確認

---

## 8. ローカル確認

```bash
npm install
npm run web
```

ブラウザで `/score/{id}` を開き、日本語・英語切替、最低点からの計算開始、図の表示/リンクを確認します。

GitHub Pages 相当の base path 確認:

```bash
npm run build:pages
npm run preview:pages
```

---

## 参考ファイル

| 用途 | ファイル |
|------|----------|
| 点数スコア | [`data/scores/apcs.ts`](../data/scores/apcs.ts), [`lib/scores/apcs.ts`](../lib/scores/apcs.ts) |
| 改変版タブ | [`data/scores/variant-groups.ts`](../data/scores/variant-groups.ts), [`data/scores/apcs-modified.ts`](../data/scores/apcs-modified.ts) |
| 分類一覧 | [`data/scores/jnet.ts`](../data/scores/jnet.ts) |
| アルゴリズムフロー | [`data/scores/wasp.ts`](../data/scores/wasp.ts) |
| 予測モデル | [`data/scores/ishii.ts`](../data/scores/ishii.ts) |
| 専用 UI | [`data/scores/gastric-esd-curability.ts`](../data/scores/gastric-esd-curability.ts) |
| ルーティング | [`app/score/[id].tsx`](../app/score/[id].tsx) |
