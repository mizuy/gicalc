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
    '食道・胃・大腸の取扱い規約における Type 0（表在型）の肉眼型。記号は Paris と共通だが、0-I の亜分類、0-I と 0-IIa の境、混合型の書き方、0-III の有無は臓器と文書でずれる。進行癌 1–5 型は扱わない。',
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
  note: '規約本文と公式英語版の文章は転載していない。胃の 0-I と 0-IIa の境は第15版を確認し、Paris の円柱上皮と同じ 2.5 mm とした。',
  hierarchyOverviews: [
    {
      id: 'macro-overview-paris',
      label: 'Paris',
      nodes: [
        {
          id: 'macro-paris-0-i',
          label: '0-I 隆起',
          children: [
            { id: 'macro-paris-0-ip', label: '0-Ip' },
            { id: 'macro-paris-0-is', label: '0-Is' },
          ],
        },
        {
          id: 'macro-paris-0-ii',
          label: '0-II 表面',
          children: [
            { id: 'macro-paris-0-iia', label: '0-IIa' },
            { id: 'macro-paris-0-iib', label: '0-IIb' },
            { id: 'macro-paris-0-iic', label: '0-IIc' },
          ],
        },
        {
          id: 'macro-paris-0-iii-family',
          label: '0-III 陥凹',
          children: [
            { id: 'macro-paris-0-iii', label: '0-III' },
            { id: 'macro-paris-0-iic-iii', label: '0-IIc+III' },
            { id: 'macro-paris-0-iii-iic', label: '0-III+IIc' },
          ],
        },
        {
          id: 'macro-paris-0-mixed',
          label: '混合型',
          children: [
            { id: 'macro-paris-0-iic-iia', label: '0-IIc+IIa' },
            { id: 'macro-paris-0-iia-iic', label: '0-IIa+IIc' },
          ],
        },
      ],
    },
    {
      id: 'macro-overview-esophagus',
      label: '食道規約',
      nodes: [
        {
          id: 'macro-eso-0-i',
          label: '0-I 隆起',
          children: [
            { id: 'macro-eso-0-ip', label: '0-Ip' },
            { id: 'macro-eso-0-is', label: '0-Is' },
          ],
        },
        {
          id: 'macro-eso-0-ii',
          label: '0-II 表面',
          children: [
            { id: 'macro-eso-0-iia', label: '0-IIa' },
            { id: 'macro-eso-0-iib', label: '0-IIb' },
            { id: 'macro-eso-0-iic', label: '0-IIc' },
          ],
        },
        { id: 'macro-eso-0-iii', label: '0-III' },
        { id: 'macro-eso-0-mixed', label: '混合型' },
      ],
    },
    {
      id: 'macro-overview-stomach',
      label: '胃規約',
      nodes: [
        { id: 'macro-sto-0-i', label: '0-I' },
        {
          id: 'macro-sto-0-ii',
          label: '0-II 表面',
          children: [
            { id: 'macro-sto-0-iia', label: '0-IIa' },
            { id: 'macro-sto-0-iib', label: '0-IIb' },
            { id: 'macro-sto-0-iic', label: '0-IIc' },
          ],
        },
        { id: 'macro-sto-0-iii', label: '0-III' },
        { id: 'macro-sto-0-mixed', label: '混合型' },
      ],
    },
    {
      id: 'macro-overview-colorectum',
      label: '大腸規約',
      nodes: [
        {
          id: 'macro-colo-0-i',
          label: '0-I 隆起',
          children: [
            { id: 'macro-colo-0-ip', label: '0-Ip' },
            { id: 'macro-colo-0-isp', label: '0-Isp' },
            { id: 'macro-colo-0-is', label: '0-Is' },
          ],
        },
        {
          id: 'macro-colo-0-ii',
          label: '0-II 表面',
          children: [
            { id: 'macro-colo-0-iia', label: '0-IIa' },
            { id: 'macro-colo-0-iib', label: '0-IIb' },
            { id: 'macro-colo-0-iic', label: '0-IIc' },
          ],
        },
        { id: 'macro-colo-0-mixed', label: '混合型' },
      ],
    },
  ],
  entries: [
    {
      label: '0-I',
      meaning: '隆起',
      group: '隆起型',
      severity: 'mild',
      rows: [
        { heading: '形態', text: '明らかな隆起。胃では茎の有無で分けない。' },
        { heading: 'Paris', text: '0-I は 0-Ip と 0-Is に分ける。胃でも Paris では亜型を使う。' },
        {
          heading: '胃',
          text: '正規の型。0-I と 0-IIa の境は周囲から約 2.5 mm（Paris の円柱上皮と同じ）。',
        },
      ],
      comment: '第15版を確認し、胃の境は Paris に合わせて 2.5 mm とした。条文は転載していない。',
    },
    {
      label: '0-Ip',
      meaning: '有茎',
      group: '隆起型',
      severity: 'mild',
      rows: [
        { heading: '形態', text: '明らかな茎を持つ隆起。' },
        { heading: 'Paris', text: '表にある（0-Ip）。' },
        { heading: '大腸', text: '0-Ip として正規の亜型。' },
        { heading: '食道', text: '0-Ip。亜有茎もここへ寄せることがある。' },
      ],
    },
    {
      label: '0-Isp',
      meaning: '亜有茎',
      group: '隆起型',
      severity: 'moderate',
      rows: [
        { heading: '形態', text: 'くびれはあるが、長い茎はない亜有茎隆起。' },
        {
          heading: 'Paris',
          text: '2003/2005 の表にはない。臨床的意義が乏しいとして 0-Is に含める。',
        },
        { heading: '大腸', text: '正規の亜型（0-Ip / 0-Isp / 0-Is の3つ）。' },
        { heading: '食道', text: '独立した Isp 欄はない。Ip 側に寄せる。' },
      ],
      comment:
        '大腸で 0-Isp と書いた病変は Paris では 0-Is。二次図に Isp が戻っていることがあり、Paris 原表と混同しやすい。',
    },
    {
      label: '0-Is',
      meaning: '無茎',
      group: '隆起型',
      severity: 'severe',
      rows: [
        { heading: '形態', text: '茎のない、明らかな隆起。' },
        {
          heading: 'Paris',
          text: '表にある。円柱上皮（胃・大腸）では周囲から約 2.5 mm 以上（閉じた生検鉗子）。食道扁平上皮は 1.2 mm。未満は 0-IIa。',
        },
        { heading: '大腸', text: '明らかな腫瘤状隆起。ミリ基準はない。' },
        { heading: '食道', text: '基部の広さが目立つ無茎。鉗子のミリ基準は書いていない。' },
      ],
      comment:
        '高さ 3–4 mm の広い無茎隆起や LST-G の顆粒は、大腸記載では 0-IIa、Paris を厳密に当てると 0-Is になりやすい。',
    },
    {
      label: '0-IIa',
      meaning: '表面隆起',
      group: '表面型',
      severity: 'severe',
      rows: [
        { heading: '形態', text: '周囲より低い隆起。' },
        {
          heading: 'Paris',
          text: '円柱上皮では 2.5 mm 未満、食道扁平上皮では 1.2 mm 未満。それを超えると 0-Is。',
        },
        {
          heading: '大腸',
          text: '低い隆起。定性で、ミリ基準はない。径 10 mm 以上の側方発育は LST と呼び、肉眼型には含めない。',
        },
        {
          heading: '胃',
          text: '周囲から約 2.5 mm 未満。それを超えると 0-I。Paris の円柱上皮と同じ。',
        },
        { heading: '食道', text: 'わずかに低い隆起。鉗子 2.5 mm は書いていない。' },
      ],
      comment: '0-Is と同じ境の裏側。同一病変で型名が入れ替わる最大点。',
    },
    {
      label: '0-IIb',
      meaning: '平坦',
      group: '表面型',
      severity: 'none',
      rows: [
        { heading: '形態', text: '正常粘膜の凹凸を超えない平坦。' },
        { heading: 'Paris', text: '表にある。大腸ではきわめて稀。' },
        { heading: '大腸', text: 'ある。稀。' },
        { heading: '胃', text: 'ある。' },
        { heading: '食道', text: 'ある。' },
      ],
      comment: '四文書でほぼ同じ。差は小さい。',
    },
    {
      label: '0-IIc',
      meaning: '表面陥凹',
      group: '表面型',
      severity: 'moderate',
      rows: [
        { heading: '形態', text: '浅い陥凹またはびらん。' },
        {
          heading: 'Paris',
          text: '表にある。より深い潰瘍は 0-III（円柱上皮で深さの目安 1.2 mm、食道扁平上皮 0.5 mm）。',
        },
        { heading: '大腸', text: '表面陥凹。0-III は削除されているので、深い潰瘍型は置かない。' },
        { heading: '胃', text: '表面陥凹。明らかに深いものは 0-III。' },
        { heading: '食道', text: '表面陥凹。明らかに深いものは 0-III。' },
      ],
    },
    {
      label: '混合型',
      meaning: '複数成分',
      group: '混合型',
      severity: 'moderate',
      rows: [
        { heading: '形態', text: '2つ以上の型が混ざる。よく見るのは 0-IIa+IIc と 0-IIc+IIa。' },
        {
          heading: 'Paris',
          text: '形の組み合わせ。相対陥凹（陥凹底が周囲粘膜より高い）は 0-IIa+IIc。0-IIc+IIa は陥凹が主で、辺縁または一部に隆起。',
        },
        {
          heading: '大腸',
          text: '規約本文は面積の広い要素を先に＋。図譜は面積順ではなく高さで分ける。0-IIc+IIa は陥凹面が粘膜より低い（反応性辺縁隆起が目立つ）。0-IIa+IIc は扁平隆起で、陥凹面が粘膜より高い相対陥凹。',
        },
        { heading: '胃', text: '面積の広い要素を先に＋。' },
        {
          heading: '食道',
          text: '面積順。より深い浸潤を示唆する成分は引用符で囲む（例: 0-IIc＋“0-Is”）。進行型が混ざるときは進行型を先に書く。',
        },
      ],
      comment:
        '図譜の高さルール（IIc+IIa は粘膜より低い1階、IIa+IIc は相対陥凹の2階）は大腸の図譜注記に限る。規約本文は面積順。Paris は形。',
    },
    {
      label: '0-III',
      meaning: '深い陥凹',
      group: '陥凹型',
      severity: 'mild',
      rows: [
        { heading: '形態', text: '明らかに深い陥凹または潰瘍。' },
        {
          heading: 'Paris',
          text: '表にある。IIc との差は深さ。大腸には適用しない（Barrett・胃が主）と注記する。0-IIc+III / 0-III+IIc もある。',
        },
        {
          heading: '大腸',
          text: 'ほとんど使わないので削除されている。現行の 0 型は 0-I と 0-II だけ。',
        },
        { heading: '胃', text: '0-III（陥凹型）あり。IIc との混合（0-IIc＋III など）もある。' },
        { heading: '食道', text: '0-III（表在陥凹型）あり。IIc との混合もある。' },
      ],
      comment:
        '大腸では Paris も規約も「ほぼ使わない」で一致する。胃・食道では規約の正規型。Paris ページに 0-III があるのは臓器横断の表だからで、大腸運用とは別。',
    },
  ],
};
