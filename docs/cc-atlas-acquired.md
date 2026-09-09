# CC Atlas 原図の取得（JNET 以外）

切り抜きはしていません。原図全体を WebP（最大幅 1200px）にして `public/figures/` に置いただけです。スコアカードや Atlas UI への埋め込みはしていません。JNET は別 PR のため未取得。

## 取得した全体図

| ファイル | 分類 | 出典 | ライセンス | 中身 |
|---|---|---|---|---|
| `lst-moon2017-fig1.webp` | LST | Myung 2017 PLOS ONE Fig. 1（ファイル名の Moon は誤記。第一著者は Myung） | CC BY 4.0 | G-H / G-M / NG-F / NG-PD × WLI+色素 |
| `serrated-dang2021-fig1.webp` | WHO serrated | Hyun 2021 Can J Surg Fig. 1（ファイル名の Dang は誤記） | CC BY-NC-ND 4.0 | HP / SSL / TSA 病理（1枚） |
| `serrated-dang2021-fig2.webp` | WHO serrated | 同 Fig. 2 | CC BY-NC-ND 4.0 | HP / SSL の内視鏡 |
| `serrated-mezzapesa2022-fig1.webp` | WHO serrated | Mezzapesa 2022 IJMS Fig. 1 | CC BY 4.0 | HP。550px 版 |
| `serrated-mezzapesa2022-fig2.webp` | WHO serrated | 同 Fig. 2 | CC BY 4.0 | SSL。高解像度 |
| `serrated-mezzapesa2022-fig3.webp` | WHO serrated | 同 Fig. 3 | CC BY 4.0 | SSLD。高解像度 |
| `serrated-mezzapesa2022-fig4.webp` | WHO serrated | 同 Fig. 4 | CC BY 4.0 | TSA。550px 版 |
| `net-uccella2021-fig3.webp` | NET G1–G3 | La Rosa 2021 Rev Endocr Metab Disord Fig. 3（ファイル名の Uccella は第二著者） | CC BY 4.0 | H&E + Ki-67。G1–G3 / LCNEC / SmCNEC |
| `kikuchi-nakagawa2024-fig1.webp` | Kikuchi ME-NBI | Kurata 2024 Dig Dis Fig. 1（PMC11457973。ファイル名の Nakagawa は誤記。ライセンスは CC BY 4.0） | CC BY 4.0 | absent / network / ISV / unclassified / mixed。PMC 表示解像度 |
| `paris-castaneda2022-fig1.webp` | Paris（胃） | Fujiyoshi 2022 Cancers Fig. 1（ファイル名の Castañeda は誤記） | CC BY 4.0 | 0-I / IIa / IIb / IIc。WLI+色素。大腸ではない |
| `paris-johnson2023-fig1.webp` | Paris（模式） | Johnson 2023 Can J Surg Fig. 1 | CC BY-NC-ND 4.0 | 模式。Fig. 2 以降は許諾再掲なので未取得 |
| `erefs-sawada2025-fig1.webp` | EREFS | Tanaka 2025 DEN Open Fig. 1（ファイル名の Sawada は第二著者） | CC BY 4.0 | 病理 + 内視鏡所見。PMC 表示解像度 |
| `mesda-miyaoka2020-fig5.webp` | MESDA-G | Miyaoka 2020 TGH Fig. 5 | CC BY-NC-ND 4.0 | アルゴリズム図 |
| `mesda-miyaoka2020-fig6.webp` | MESDA-G | 同 Fig. 6 | CC BY-NC-ND 4.0 | 手順例 I |
| `mesda-miyaoka2020-fig7.webp` | MESDA-G | 同 Fig. 7 | CC BY-NC-ND 4.0 | 手順例 II |
| `mesda-miyaoka2020-fig8.webp` | MESDA-G | 同 Fig. 8 | CC BY-NC-ND 4.0 | 手順例 III |
| `uchiyama-iwashita2015-fig1.webp` | Uchiyama | Iwashita 2015 Am J Case Rep Fig. 1 | CC BY-NC-ND 3.0 | Type I/II 経過。全型揃いではない |
| `uchiyama-iwashita2015-fig2.webp` | Uchiyama | 同 Fig. 2 | CC BY-NC-ND 3.0 | 後年 Type III |

## 取らなかったもの

| 対象 | 理由 |
|---|---|
| JNET（Ahmed / Lee / Yoshida 等） | 別エージェント / PR #84 |
| Testoni 2024 pit Fig. 1 | MDPI が 403。Wayback に原図なし |
| Nardone 2025 LST Fig. 2 | Moon で足りる。MDPI 原図に届かず |
| Vu 2024 WASP Fig. 1 | アルゴリズム。画面フローと重複 |
| Johnson 2023 Fig. 2–5 | 許諾再掲 |
| Castañeda 2022 Fig. 2 | MESDA アルゴリズム。Miyaoka Fig. 5 と重複 |

埋め込み・出典行・About の更新は `cursor/cc-atlas-expand-1903` で実施。ファイル名は取得時の仮ラベルのまま残し、画面の `sourceShort` は第一著者に合わせる。
