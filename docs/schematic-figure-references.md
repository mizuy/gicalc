# 模式図リファレンス集（SVG 自作用）

GI Calc でベクター模式図を自作する前に参照すべき、原著・再掲論文の図を整理したカタログです。  
**画像の転載・模倣ではなく、定義・レイアウト・カットオフの確認用**として使います。

## 使い方

1. **Tier 1（肉眼型）** から参照を集める
2. 各論文の **原著（Primary）** で定義を確認し、**CC 再掲（Secondary）** でレイアウトの参考にする
3. 自作 SVG は Primary の文言（`data/scores/*.ts` の `originalLead` / `entries`）に合わせる
4. 埋め込み可否は [README の引用とライセンス](../README.md#引用とライセンス) を優先

凡例:

| 列 | 意味 |
|----|------|
| 図の種類 | `断面模式` / `上面模式` / `フロー` / `実写真` / `混合` |
| CC | Creative Commons ライセンス（埋め込み可否の目安） |
| GI Calc | 現在アプリでの扱い |

---

## Tier 1 — 肉眼型・形態模式図（最優先）

### Paris 分類（Type 0）

| 優先 | 論文 | Fig | 図の種類 | CC | PMID | リンク | 内容・メモ |
|------|------|-----|----------|----|------|--------|------------|
| ★ Primary | Paris workshop. *Gastrointest Endosc* 2003;58(S6):S3–S43 | **Diagram 1–6**, **Diagram 9** | 断面＋上面 | なし | [14652541](https://pubmed.ncbi.nlm.nih.gov/14652541/) | [PDF（World Endoscopy Organization ミラー）](https://www.worldendo.org/assets-craft/pdf/resources/guidelines/ParisClassification2000.pdf) · [DOI](https://doi.org/10.1016/s0016-5107(03)02159-x) | **Diagram 1**: 6 基本型（Ip, Is, IIa, IIb, IIc, III）。**Diagram 2–3**: 柱状上皮の 2.5 mm カットオフ（活检鉗子）。**Diagram 4–6**: 複合型（IIc+IIa, IIa+IIc, Is+IIc, III+IIc 等）。**Diagram 9**: 食道扁平上皮（1.2 mm スケール）。2003 表に **0-Isp はない** |
| Primary | Endoscopic Classification Review Group. *Endoscopy* 2005;37:570–578 | 表中心（図は 2003 と同系） | — | なし | [15933932](https://pubmed.ncbi.nlm.nih.gov/15933932/) | [DOI](https://doi.org/10.1055/s-2005-870066) | 2003 の更新。大腸 0-Is / 0-IIc の SM 浸潤率（Table 4） |
| Secondary | Johnson GGRJ et al. *Can J Surg* 2023;66:E491–E498 | **Fig. 1** | 断面模式 | **CC BY-NC-ND 4.0** | [37782500](https://pubmed.ncbi.nlm.nih.gov/37782500/) | [Fig. 1](https://www.canjsurg.ca/content/66/5/E491/F1) · [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC10521811/) | M/SM 層付き断面。**0-Isp を含む**（日本語分類・後年追加）。Paris 2003 より視覚的に分かりやすい |
| Secondary | Kim OZ. *Clin Endosc* 2025;58:337–351 | **Fig. 2** | 上面模式 | **CC BY-NC 4.0** | [40336268](https://pubmed.ncbi.nlm.nih.gov/40336268/) | [DOI](https://doi.org/10.5946/ce.2024.263) | Johnson 2023 を adapted。大腸 IEE 総説の統合図。GI Calc 旧埋め込み源 |
| Secondary | Endoscopy Campus | — | 上面模式 | 教育サイト | — | [Paris classification](https://www.endoscopy-campus.com/en/classifications/paris-classification-early-cancer/) | 複合型一覧。出典は 2003 論文 |

**SVG 自作メモ（Paris）**

- 第 1 版: Diagram 1 相当（0-Ip, 0-Is, 0-IIa, 0-IIb, 0-IIc, 0-III）＋ 2.5 mm 寸法線
- 第 2 版: Diagram 4–6（複合型）、Diagram 9（食道 1.2 mm 版）
- 0-Isp は別パネル＋「2003/2005 表外」注記

**GI Calc**: `paris-gicalc.svg`（自作）を掲載

---

### LST 分類（4 亜型）

| 優先 | 論文 | Fig | 図の種類 | CC | PMID | リンク | 内容・メモ |
|------|------|-----|----------|----|------|--------|------------|
| ★ Primary | Kudo S et al. *Gastrointest Endosc* 2008;68(S1):S3–S47 | 本文・表（LST 定義） | 混合 | なし | [18805238](https://pubmed.ncbi.nlm.nih.gov/18805238/) | [DOI](https://doi.org/10.1016/j.gie.2008.06.001) | LST の用語・≥10 mm・G/NG の原典。4 亜型の詳細は後続論文 |
| Primary | Oka S et al. *Gastrointest Endosc* 2020;92:880–889 | **Fig. 1** | **実写真**（4 亜型） | なし | [32446623](https://pubmed.ncbi.nlm.nih.gov/32446623/) | [GIE 本文](https://www.giejournal.org/article/S0016-5107(20)34187-0/fulltext) | **LST-G-H / G-M / NG-F / NG-PD** の代表内視鏡像。模式図ではないが形態確認に最適 |
| Secondary | Castillo-Regalado E, Uchima H. *World J Gastrointest Endosc* 2022;14:113–128 | **Fig. 2** | リスクチャート | **CC BY-NC 4.0** | [35432746](https://pubmed.ncbi.nlm.nih.gov/35432746/) | [WJGE 全文](https://www.wjgnet.com/1948-5190/full/v14/i3/113.htm) | 4 亜型の **深部 SM 浸潤率**（Bogie 2018 メタ解析）。**形態模式図ではない** |
| Secondary | Kim OZ. *Clin Endosc* 2025;58:337–351 | **Fig. 3** | 上面模式 | **CC BY-NC 4.0** | [40336268](https://pubmed.ncbi.nlm.nih.gov/40336268/) | [DOI](https://doi.org/10.5946/ce.2024.263) | Castillo-Regalado 2022 adapted。4 亜型＋浸潤率。GI Calc 現在の埋め込み源 |
| Secondary | Bogie R et al.（LST IOA 研究） | **Figure 2.2** | 上面模式 | 学位論文 | — | [電子書籍 p.19 付近](https://user-xmmlfju.cld.bz/Roel-Bogie/19) | 4 亜型の模式図（G-H, G-NM, NG-FE, NG-PD）。教育用参考 |

**SVG 自作メモ（LST）**

- Paris の上面視点＋顆粒／非顆粒のテクスチャ差
- 第 1 版: 4 亜型パネル（Kim 2025 / Bogie 2.2 レイアウト参考）
- 浸潤率は Bogie 2018 数値を脚注（Castillo-Regalado Fig. 2 と同じ）

**GI Calc**: `lst-ce2025-fig3.jpg`（CC BY-NC 借用）

---

## Tier 2 — 光学診断・パターン分類（模式図／フロー）

### 工藤–鶴田 pit pattern

| 優先 | 論文 | Fig | 図の種類 | CC | PMID | リンク | 内容・メモ |
|------|------|-----|----------|----|------|--------|------------|
| ★ Primary | Kudo S et al. *Gastrointest Endosc* 1996;44:8–14 | 本文図 | 実写真＋模式 | なし | [8836710](https://pubmed.ncbi.nlm.nih.gov/8836710/) | — | pit pattern 原典 |
| Primary | Tanaka S et al. *Dig Endosc* 2004;16:S161–S164 | pit 模式 | 上面模式 | なし | — | — | Type I–VN の整理図（Kim 2025 が adapted 元） |
| Secondary | Kim OZ. *Clin Endosc* 2025 | **Fig. 4** | 上面模式 | **CC BY-NC 4.0**（許諾再掲） | [40336268](https://pubmed.ncbi.nlm.nih.gov/40336268/) | [CE Fig. 4](https://www.e-ce.org/journal/view.php?doi=10.5946/ce.2024.263#f4-ce-2024-263) | I / II / IIIs / IIIL / IV / VI / VN |

**GI Calc**: リンクのみ（非 CC 原図）

---

### NICE 分類

| 論文 | Fig | 図の種類 | CC | PMID | リンク |
|------|-----|----------|----|------|--------|
| Hayashi N et al. *Gastrointest Endosc* 2013;78:625–632 | **Fig. 1** | 実写真（Type 1–3） | なし | [23910062](https://pubmed.ncbi.nlm.nih.gov/23910062/) | [Elsevier CDN Fig. 1](https://ars.els-cdn.com/content/image/1-s2.0-S0016510713018531-gr1_lrg.jpg) |

**GI Calc**: リンクのみ

---

### JNET 分類

| 論文 | Fig | 図の種類 | CC | PMID | リンク |
|------|-----|----------|----|------|--------|
| Sano Y et al. *Dig Endosc* 2016;28:526–533 | **Fig. 7** | 実写真（Type 1, 2A, 2B, 3） | なし | [26927367](https://pubmed.ncbi.nlm.nih.gov/26927367/) | [Wiley Fig. 7](https://onlinelibrary.wiley.com/doi/10.1111/den.12644#den12644-fig-0007) |

**GI Calc**: リンクのみ

---

### WASP 分類

| 論文 | Fig | 図の種類 | CC | PMID | リンク |
|------|-----|----------|----|------|--------|
| IJspeert JEG et al. *Gut* 2016;65:963–970 | **Fig. 1** | **フローチャート** | なし | [25753029](https://pubmed.ncbi.nlm.nih.gov/25753029/) | [Gut Fig. 1](https://gut.bmj.com/content/65/6/963#F1) |

**SVG メモ**: NICE → Hazewinkel のステップ図。アプリ内 `AlgorithmFlowScreen` と役割が近い

**GI Calc**: リンクのみ

---

## Tier 3 — 解剖・位置・線維化の模式図

### Prague C & M（Barrett）

| 論文 | Fig | 図の種類 | CC | PMID | リンク |
|------|-----|----------|----|------|--------|
| Sharma P et al. *Gastroenterology* 2006;131:1392–1399 | **Fig. 3** | 解剖模式（C2M5 例） | なし | [17101315](https://pubmed.ncbi.nlm.nih.gov/17101315/) | [Elsevier CDN](https://ars.els-cdn.com/content/image/1-s2.0-S0016508506017914-gr3.jpg) |

---

### 虫垂開口部 Type（Toyonaga）

| 論文 | Fig | 図の種類 | CC | PMID | リンク |
|------|-----|----------|----|------|--------|
| Jacob H et al. *Endoscopy* 2016;48:829–836 | 本文 | 模式＋実例 | なし | [27467815](https://pubmed.ncbi.nlm.nih.gov/27467815/) | — |
| Oung B et al. *Endosc Int Open* 2020;8:E388–E395 | **Fig. 2** | 模式（Type 1–3, 3a） | **CC BY-NC-ND 4.0** | [32083562](https://pubmed.ncbi.nlm.nih.gov/32083562/) | 埋め込み済 |

**GI Calc**: `oung2020-fig2.jpg`

---

### ESD 粘膜下層線維化（F0–F2）

| 論文 | Fig | 図の種類 | CC | PMID | リンク |
|------|-----|----------|----|------|--------|
| Matsumoto A et al. *Scand J Gastroenterol* 2010;45:1329–1337 | 本文 | 所見記述 | なし | [20626303](https://pubmed.ncbi.nlm.nih.gov/20626303/) | 大腸 F 分類の原型 |
| Kim EK et al. *Intest Res* 2016;14:358–364 | **Fig. 1** | 模式（F0–F2） | なし | [27799887](https://pubmed.ncbi.nlm.nih.gov/27799887/) | [IR journal Fig. 1](https://www.irjournal.org/journal/view.php?number=178) |

---

## Tier 4 — 統合レビュー（複数分類を1論文で参照）

| 論文 | Fig | 内容 | CC | PMID |
|------|-----|------|----|------|
| Kim OZ. *Clin Endosc* 2025;58:337–351 | Fig. 2 | Paris | CC BY-NC 4.0 | [40336268](https://pubmed.ncbi.nlm.nih.gov/40336268/) |
| 同上 | Fig. 3 | LST 4 亜型 | CC BY-NC 4.0 | 同上 |
| 同上 | Fig. 4 | pit pattern | CC BY-NC 4.0 | 同上 |

**推奨**: 大腸 IEE 関連の模式図をまとめて集めるときの **Secondary ハブ**。Primary は必ず Paris 2003 / Kudo 2008 等で定義を確認。

---

## 収集チェックリスト（作業用）

### Phase A — PDF／Fig リンクの確保

- [ ] Paris 2003 PDF（Diagram 1–6, 9）をローカル保存
- [ ] Johnson 2023 Fig. 1（CC BY-NC-ND）— 断面レイアウト参考
- [ ] Oka 2020 Fig. 1 — LST 4 亜型の実写真
- [ ] Kim 2025 Fig. 2–4 — 統合模式図（CC BY-NC）
- [ ] NICE / JNET / WASP / pit pattern / Prague / ESD-F — 各 Primary Fig リンク確認

### Phase B — SVG 化優先順位

1. **Paris** — 完了（`paris-gicalc.svg`）。複合型・食道版は未着手
2. **LST** — 次候補（Paris と上面視点を統一）
3. **pit pattern** — 7–8 パネルの上面模式
4. **Prague** — 解剖模式（C/M の矢印）
5. **ESD-F** — F0–F2 断面
6. **WASP** — フロー（既存 AlgorithmFlow と統合検討）

### Phase C — ライセンス整理

- CC 再掲は **レイアウト参考のみ**。自作 SVG には CC ライセンス表記不要
- 自作図の `source` には **Primary 定義文献**（Paris 2003/2005 等）を記載

---

## 更新履歴

| 日付 | 内容 |
|------|------|
| 2026-09-05 | 初版。Paris / LST / pit / NICE / JNET / WASP / Prague / AO / ESD-F / Kim 2025 統合 |
