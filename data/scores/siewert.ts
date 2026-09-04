import type { ClassificationDefinition } from '../../types/score';

/** Siewert / Stein 1998 Br J Surg（PMID 9823902） */
export const SIEWERT_1998_PUBMED = '9823902';
/** Japanese Classification of Esophageal Cancer, 11th Edition: part II and III（PMID 28111536）。CC BY 4.0 */
export const JCE_11_PART2_PUBMED = '28111536';

export const siewertScore: ClassificationDefinition = {
  id: 'siewert',
  kind: 'classification',
  name: 'Siewert分類（食道胃接合部腺癌）',
  shortName: 'Siewert',
  organ: 'esophagus',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '食道胃接合部（EGJ）の上下 5 cm に中心がある腺癌を、中心の位置で Type I / II / III に分ける。日本の規約・ガイドラインは西分類（接合部上下 2 cm、組織型を問わない）を採用しており、Siewert Type II がそれにほぼ相当する。',
  originalLead:
    'Adenocarcinomas of the esophagogastric junction are tumors whose center lies within 5 cm proximal or distal to the anatomical cardia. The cardia is identified endoscopically as the proximal end of the longitudinal gastric mucosal folds. Type I is adenocarcinoma of the distal esophagus, usually arising from specialized intestinal metaplasia (Barrett’s esophagus), with the tumor center 1–5 cm above the EGJ. Type II is true carcinoma of the cardia arising from cardiac epithelium or short-segment intestinal metaplasia at the EGJ, with the tumor center within 1 cm above and 2 cm below the EGJ. Type III is subcardial gastric carcinoma that infiltrates the EGJ and distal esophagus from below, with the tumor center 2–5 cm below the EGJ.',
  reference: 'Siewert JR, Stein HJ. Br J Surg 1998;85:1457-1459',
  pubmed: SIEWERT_1998_PUBMED,
  officialUrl: 'https://www.jgca.jp/guideline/sixth/002_01.html',
  officialLinkLabel: '胃癌治療ガイドライン 第6版（接合部癌）',
  note: 'Siewert はドイツの外科分類で、日本マークは付けない。日本では日本食道学会・日本胃癌学会が西分類を採用する。計測のゼロ点は Prague と同じく胃粘膜縦走ひだの上端（Siewert）。日本の内視鏡では柵状血管下端を優先し、不明なときだけひだの上端を EGJ とする。Z-line（SCJ）は EGJ と一致しないことがある。',
  figures: [
    {
      src: '/figures/siewert-jce2017-fig2-6.webp',
      alt: 'Siewert Type I, II, and III relative to the anatomical cardia (JCE 11th Fig. 2-6)',
      caption: 'Fig. 2-6. Definition of adenocarcinoma at the EGJ according to Siewert’s classification',
      source:
        'Japan Esophageal Society. Japanese Classification of Esophageal Cancer, 11th Edition: part II and III. Esophagus. 2017;14:37-65. Fig. 2-6. Original types: Siewert JR, Stein HJ. Br J Surg. 1998;85:1457-1459.',
      doi: 'https://doi.org/10.1007/s10388-016-0556-2',
      pubmed: JCE_11_PART2_PUBMED,
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      note: '食道癌取扱い規約第11版（英語版）Fig. 2-6。Springer Open。ライセンスは CC BY 4.0。Siewert 1998 BJS の原図は CC ではない。',
      aspectRatio: 387 / 321,
    },
    {
      src: '/figures/siewert-jce2017-fig2-5.webp',
      alt: 'Nishi EGJ zone: 2 cm above and 2 cm below the EGJ (JCE 11th Fig. 2-5)',
      caption: 'Fig. 2-5. Zone of the esophagogastric junction (Nishi: ±2 cm)',
      source:
        'Japan Esophageal Society. Japanese Classification of Esophageal Cancer, 11th Edition: part II and III. Esophagus. 2017;14:37-65. Fig. 2-5. Nishi definition: Nishi M, Kajisa T, Akune T, et al. Geka Shinryo. 1973;15:1328-1338.',
      doi: 'https://doi.org/10.1007/s10388-016-0556-2',
      pubmed: JCE_11_PART2_PUBMED,
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      note: '規約第11版 Fig. 2-5。接合部領域は EGJ の口側 2 cm（腹部食道 Ae）と肛門側 2 cm。ライセンスは CC BY 4.0。',
      aspectRatio: 387 / 257,
    },
    {
      src: '/figures/siewert-jce2017-fig2-7.webp',
      alt: 'Nishi occupation E, EG, E=G, GE, and G (JCE 11th Fig. 2-7)',
      caption: 'Fig. 2-7. Subclassification of cancer at the EGJ (E / EG / E=G / GE / G)',
      source:
        'Japan Esophageal Society. Japanese Classification of Esophageal Cancer, 11th Edition: part II and III. Esophagus. 2017;14:37-65. Fig. 2-7.',
      doi: 'https://doi.org/10.1007/s10388-016-0556-2',
      pubmed: JCE_11_PART2_PUBMED,
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      note: '規約第11版 Fig. 2-7。占居の表記。ライセンスは CC BY 4.0。',
      aspectRatio: 387 / 114,
    },
    {
      href: 'https://doi.org/10.1046/j.1365-2168.1998.00940.x',
      hrefLabel: '1998 paper',
      alt: 'Siewert and Stein 1998 classification paper in the British Journal of Surgery',
      caption: 'Siewert JR, Stein HJ. Classification of adenocarcinoma of the oesophagogastric junction. Br J Surg 1998',
      source: 'Siewert JR, Stein HJ. Br J Surg. 1998;85:1457-1459.',
      doi: 'https://doi.org/10.1046/j.1365-2168.1998.00940.x',
      pubmed: SIEWERT_1998_PUBMED,
      note: '原著。Wiley / BJS の著作権。CC ではないので画像は置かず、論文へリンクする。',
    },
  ],
  entries: [
    {
      label: 'EGJ',
      meaning: 'Zero point',
      group: 'ランドマーク',
      severity: 'none',
      rows: [
        {
          heading: 'Siewert',
          text: 'The anatomical cardia is identified endoscopically as the proximal end of the longitudinal gastric mucosal folds.',
        },
        {
          heading: 'JCE 11th',
          text: 'Endoscopic findings take priority. The EGJ is the lower margin of the palisading small vessels. If those vessels are unclear, the oral margin of the longitudinal folds of the greater curvature is used.',
        },
        {
          heading: 'SCJ',
          text: 'The squamocolumnar junction (Z-line) does not always coincide with the EGJ.',
        },
      ],
      comment:
        'Siewert / Prague は胃粘膜縦走ひだの上端。日本の規約は柵状血管下端を優先する。Barrett や裂孔ヘルニアではひだの上端を EGJ にする。',
    },
    {
      label: 'Type I',
      meaning: 'Distal esophageal adenocarcinoma',
      group: 'Siewert',
      severity: 'moderate',
      rows: [
        {
          heading: 'Center',
          text: '1–5 cm above the anatomical cardia (EGJ)',
        },
        {
          heading: 'Entity',
          text: 'Adenocarcinoma of the distal esophagus, usually arising from specialized intestinal metaplasia (Barrett’s esophagus)',
        },
      ],
      comment:
        '西の接合部癌（±2 cm）からは外れることが多い。日本では食道腺癌（Barrett腺癌）として扱う。Siewert は腺癌に限る。',
    },
    {
      label: 'Type II',
      meaning: 'True cardia carcinoma',
      group: 'Siewert',
      severity: 'severe',
      rows: [
        {
          heading: 'Center',
          text: 'Within 1 cm above and 2 cm below the anatomical cardia',
        },
        {
          heading: 'Entity',
          text: 'True carcinoma of the cardia arising from cardiac epithelium or short-segment intestinal metaplasia at the EGJ',
        },
      ],
      comment:
        '西分類の食道胃接合部癌にほぼ相当する。日本のガイドラインがいう接合部癌はこちら。',
    },
    {
      label: 'Type III',
      meaning: 'Subcardial carcinoma',
      group: 'Siewert',
      severity: 'mild',
      rows: [
        {
          heading: 'Center',
          text: '2–5 cm below the anatomical cardia, infiltrating the EGJ and distal esophagus from below',
        },
        {
          heading: 'Entity',
          text: 'Subcardial gastric carcinoma',
        },
      ],
      comment:
        '中心が接合部から 2–5 cm 胃側でも、食道浸潤がなければ Type III ではなく胃癌。西の接合部癌（±2 cm）からは外れる。',
    },
    {
      label: 'Nishi EGJ carcinoma',
      meaning: 'Center within ±2 cm',
      group: '西分類',
      severity: 'severe',
      rows: [
        {
          heading: 'Definition',
          text: 'A tumor whose center is located between 2 cm proximal to and 2 cm distal from the EGJ, irrespective of histological type.',
        },
        {
          heading: 'Scope',
          text: 'Includes adenocarcinoma and squamous cell carcinoma. Corresponds to Siewert Type II (true cardia cancer), not to the whole Siewert ±5 cm field.',
        },
        {
          heading: 'Source',
          text: 'Nishi M et al. Geka Shinryo 1973;15:1328-1338. Adopted by the Japanese Classification of Esophageal Cancer (11th) and the Japanese Classification of Gastric Carcinoma.',
        },
      ],
      comment:
        '現行規約に大きさの制限はない（古い規約には径 4 cm 以下の条件があった）。Siewert の「AEG（上下 5 cm の腺癌）」とは範囲が違う。',
    },
    {
      label: 'E',
      meaning: 'Esophagus only',
      group: '西分類',
      severity: 'moderate',
      rows: [
        {
          heading: 'Occupation',
          text: 'The tumor lies entirely on the esophageal side of the EGJ (within the Nishi zone).',
        },
      ],
    },
    {
      label: 'EG',
      meaning: 'Center on the esophageal side',
      group: '西分類',
      severity: 'moderate',
      rows: [
        {
          heading: 'Occupation',
          text: 'The tumor crosses the EGJ; the center is on the esophageal side. The oral portion is written first (E then G).',
        },
      ],
    },
    {
      label: 'E=G',
      meaning: 'Equal occupation',
      group: '西分類',
      severity: 'severe',
      rows: [
        {
          heading: 'Occupation',
          text: 'The esophagus and stomach are involved equally; the center is at the EGJ.',
        },
      ],
    },
    {
      label: 'GE',
      meaning: 'Center on the gastric side',
      group: '西分類',
      severity: 'mild',
      rows: [
        {
          heading: 'Occupation',
          text: 'The tumor crosses the EGJ; the center is on the gastric side.',
        },
      ],
    },
    {
      label: 'G',
      meaning: 'Stomach only',
      group: '西分類',
      severity: 'mild',
      rows: [
        {
          heading: 'Occupation',
          text: 'The tumor lies entirely on the gastric side of the EGJ (within the Nishi zone).',
        },
      ],
    },
    {
      label: 'JGCA / JES guideline',
      meaning: 'Nishi zone; invasion length',
      group: '日本ガイドライン',
      severity: 'none',
      rows: [
        {
          heading: 'Definition',
          text: 'EGJ cancer: adenocarcinoma or squamous cell carcinoma whose center lies within 2 cm above or below the EGJ (Nishi).',
        },
        {
          heading: 'Surgery',
          text: 'The JGCA 6th edition algorithm is based on esophageal invasion length, not on Siewert type. Invasion ≤2 cm: lower mediastinal dissection is usually limited. Invasion >2 cm: add lower mediastinal nodes. Invasion >4 cm: add upper and middle mediastinal nodes.',
        },
        {
          heading: 'UICC 8th',
          text: 'A tumor that involves the EGJ with its epicenter ≤2 cm into the stomach is staged as esophageal cancer. If the epicenter is >2 cm into the stomach, it is staged as gastric cancer.',
        },
      ],
      comment:
        '胃癌治療ガイドライン第6版と食道学会の接合部癌アルゴリズムは共通。Siewert 型で術式を決めない。浸潤長は内視鏡より切除標本の記載が新しい解析の主になっている。',
    },
  ],
};
