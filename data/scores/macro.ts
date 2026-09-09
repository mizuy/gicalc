import type { ClassificationDefinition } from '../../types/score';

/** Paris 2003 workshop */
export const MACRO_PARIS_2003_PUBMED = '14652541';
/** Paris 2005 update */
export const MACRO_PARIS_2005_PUBMED = '15933932';
/** JSCCR 大腸癌取扱い規約 第9版の公式英語版 */
export const MACRO_JSCCR_2019_PUBMED = '31768468';
/** JGCA 胃癌取扱い規約 英語第3版（日本語第14版相当） */
export const MACRO_JGCA_2011_PUBMED = '21573743';
/** 日本食道学会 食道癌取扱い規約 第12版 Part I */
export const MACRO_JES_2024_PUBMED = '38568243';

export const macroScore: ClassificationDefinition = {
  id: 'macro',
  kind: 'classification',
  name: '規約の0型（Parisとの差）',
  shortName: 'Macro',
  developedInJapan: true,
  originalLocale: 'ja',
  organ: 'colorectum',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '食道・胃・大腸の取扱い規約における Type 0（表在型）と Paris 分類の違い。記号の骨格は同じで、ずれるのは 0-I の亜分類、0-I と 0-IIa の境、混合型の書き方、0-III の有無。進行癌 1–5 型は扱わない。',
  originalLead:
    'GI Calc commentary on Type 0 only. Paris 2003/2005 and the Japanese organ-specific Type 0 rules share the same symbols, but they diverge on 0-I subtypes, the 0-I versus 0-IIa cut-off, mixed-type notation, and whether 0-III is used. This page paraphrases those points; it is not a quotation of the source documents.',
  citations: [
    {
      role: 'original',
      text: 'Endoscopic Classification Review Group. Endoscopy 2005;37:570-578',
      pubmed: MACRO_PARIS_2005_PUBMED,
    },
    {
      role: 'related-study',
      text: 'The Paris endoscopic classification of superficial neoplastic lesions. Gastrointest Endosc 2003;58:S3-S43',
      pubmed: MACRO_PARIS_2003_PUBMED,
    },
    {
      role: 'official',
      text: 'JSCCR. J Anus Rectum Colon 2019;3:175-195 (9th Japanese ed., English)',
      pubmed: MACRO_JSCCR_2019_PUBMED,
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6845287/',
    },
    {
      role: 'official',
      text: 'JGCA. Gastric Cancer 2011;14:101-112 (3rd English ed.)',
      pubmed: MACRO_JGCA_2011_PUBMED,
    },
    {
      role: 'official',
      text: 'JES. Esophagus 2024 (12th ed., Part I)',
      pubmed: MACRO_JES_2024_PUBMED,
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11199297/',
    },
    {
      role: 'japanese-reference',
      text: '大腸癌研究会. 大腸癌取扱い規約 第9版. 金原出版; 2018',
    },
    {
      role: 'japanese-reference',
      text: '日本胃癌学会. 胃癌取扱い規約 第15版. 金原出版; 2017',
    },
    {
      role: 'japanese-reference',
      text: '日本食道学会. 食道癌取扱い規約 第12版. 金原出版; 2022',
    },
  ],
  pubmed: MACRO_PARIS_2005_PUBMED,
  officialUrl: 'https://www.jsccr.jp/kiyaku/index.html',
  officialLinkLabel: '大腸癌取扱い規約（研究会）',
  officialLinkRole: 'japanese-reference',
  note: '規約本文と公式英語版の文章は転載していない。胃の「約 2 mm」は第15版本文を未確認で、二次資料の記載として扱う。',
  hierarchy: [
    {
      id: 'macro-0',
      label: 'Type 0（表在）',
      children: [
        {
          id: 'macro-0-i',
          label: '0-I 隆起',
          children: [
            { id: 'macro-0-ip', label: '0-Ip — Paris / 大腸 / 食道' },
            { id: 'macro-0-isp', label: '0-Isp — 大腸規約のみ' },
            { id: 'macro-0-is', label: '0-Is — Paris / 大腸 / 食道（胃は 0-I）' },
          ],
        },
        {
          id: 'macro-0-ii',
          label: '0-II 表面',
          children: [
            { id: 'macro-0-ii-common', label: '0-IIa / IIb / IIc — 四文書ともある' },
            { id: 'macro-0-mixed', label: '混合型 — 書き方は文書で違う' },
          ],
        },
        {
          id: 'macro-0-iii',
          label: '0-III — Paris 表 / 胃 / 食道。大腸規約は削除',
        },
      ],
    },
  ],
  entries: [
    {
      label: '0-I の亜分類',
      meaning: '茎の分け方',
      group: '相違点',
      severity: 'moderate',
      rows: [
        {
          heading: 'Paris',
          text: '2003/2005 の表は 0-Ip と 0-Is だけ。Isp は臨床的意義が乏しいとして置かず、Is として扱う。',
        },
        {
          heading: '大腸規約',
          text: '0-Ip（有茎）/ 0-Isp（亜有茎）/ 0-Is（無茎）の3つ。Isp は正規の亜型。',
        },
        {
          heading: '胃癌規約',
          text: '0-I のみ。有茎・亜有茎・無茎には分けない。',
        },
        {
          heading: '食道規約',
          text: '0-Ip と 0-Is。亜有茎は Ip 側に寄せ、独立した Isp 欄はない。',
        },
        {
          heading: '実務でのずれ',
          text: '大腸で 0-Isp と書いた病変は Paris では 0-Is。胃の 0-I は Paris の Ip または Is に相当しうる。二次図に Isp が戻っていることがあり、Paris 原表と混同しやすい。',
        },
      ],
    },
    {
      label: '0-I と 0-IIa',
      meaning: '高さの境',
      group: '相違点',
      severity: 'severe',
      rows: [
        {
          heading: 'Paris',
          text: '定量。円柱上皮（胃・大腸）は閉じた生検鉗子約 2.5 mm。超えたら 0-Is、未満は 0-IIa。食道扁平上皮は 1.2 mm。',
        },
        {
          heading: '大腸規約',
          text: '定性。0-I は明らかな腫瘤状隆起、0-IIa は低い隆起。ミリ基準はない。',
        },
        {
          heading: '胃癌規約',
          text: '目安あり。英語第3版はおおむね 3 mm 未満を 0-IIa。日本語第15版では約 2 mm までを 0-IIa とする、と二次資料にある（第15版本文は未確認）。',
        },
        {
          heading: '食道規約',
          text: '高さと基部のくびれの印象。0-I は丈が高く表在と推定できる隆起、0-IIa はわずかに低い隆起。鉗子 2.5 mm は書いていない。',
        },
        {
          heading: '実務でのずれ',
          text: '高さ 3–4 mm の広い無茎隆起や LST-G の顆粒は、大腸記載では 0-IIa、Paris を厳密に当てると 0-Is になりやすい。同一病変で型名が入れ替わる最大点。',
        },
      ],
    },
    {
      label: '混合型',
      meaning: '＋の書き方',
      group: '相違点',
      severity: 'moderate',
      rows: [
        {
          heading: 'Paris',
          text: '形の組み合わせとして型を定義する。0-IIa+IIc は全体が隆起で中央陥凹（底が周囲粘膜より高い相対陥凹も含む）。0-IIc+IIa は主体が陥凹で辺縁や一部に隆起。',
        },
        {
          heading: '大腸規約',
          text: '面積の広い要素を先に書き、＋でつなぐ（例: 0-IIc＋IIa）。',
        },
        {
          heading: '胃癌規約',
          text: '大腸と同じく、面積の広い要素を先に書く（例: 0-IIc＋III）。',
        },
        {
          heading: '食道規約',
          text: '面積順に加え、より深い浸潤を示唆する成分を引用符で囲む（例: 0-IIc＋“0-Is”）。進行型が混ざるときは進行型を先に書く。',
        },
        {
          heading: '実務でのずれ',
          text: '規約は「広い方＋狭い方」、Paris は「隆起主体か陥凹主体か」。相対陥凹は Paris が明示し、規約注は薄い。引用符は食道だけ。',
        },
      ],
    },
    {
      label: '0-III',
      meaning: 'ある／なし',
      group: '相違点',
      severity: 'mild',
      rows: [
        {
          heading: 'Paris',
          text: '表に 0-III（潰瘍・深い陥凹）がある。IIc との差は深さ（円柱上皮で目安 1.2 mm、食道扁平上皮 0.5 mm）。大腸には適用しない（Barrett・胃が主）と注記する。',
        },
        {
          heading: '大腸規約',
          text: 'かつては胃癌に倣って置いたが、実在しないとして削除。現行の 0 型は 0-I と 0-II だけ。',
        },
        {
          heading: '胃癌規約',
          text: '0-III（陥凹型）あり。明らかに深い陥凹。',
        },
        {
          heading: '食道規約',
          text: '0-III（表在陥凹型）あり。',
        },
        {
          heading: '実務でのずれ',
          text: '大腸では Paris も規約も「ほぼ使わない」で一致する。胃・食道では規約の正規型。Paris ページに 0-III があるのは臓器横断の表だからで、大腸運用とは別。',
        },
      ],
    },
  ],
};
