import type { ClassificationDefinition } from '../../types/score';

/** Japanese Classification of Esophageal Cancer, 11th Edition: part I */
export const BARRETT_JCE11_PUBMED = '28111535';
/** Sharma P, Morales TG, Sampliner RE. Am J Gastroenterol 1998. SSBE */
export const BARRETT_SSBE_1998_PUBMED = '9681160';
/** Prague C & M */
export const BARRETT_PRAGUE_PUBMED = '17101315';
/** Oyanagi 2022 DEN Open. Japanese vs Western Barrett criteria. CC BY 4.0 */
export const BARRETT_OYANAGI_2022_PUBMED = '35310704';

export const barrettScore: ClassificationDefinition = {
  id: 'barrett',
  kind: 'classification',
  name: 'Barrett食道（日本の定義・SSBE/LSBE）',
  shortName: 'Barrett',
  developedInJapan: true,
  originalLocale: 'ja',
  organ: 'esophagus',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '日本では下部食道柵状血管の下端を EGJ とし、それより口側の円柱上皮を Barrett 食道とする。長さ 3 cm 未満が SSBE、3 cm 以上が LSBE。C / M の計測は Prague。腸上皮化生は日本の内視鏡診断には必須ではない。',
  originalLead:
    'Barrett食道とは、食道に円柱上皮を認めるものをいう。食道胃接合部（EGJ）は下部食道柵状血管の下端で同定する。柵状血管が不明なときは胃粘膜縦走ひだの上端を用いる。円柱上皮の長さが 3 cm 未満を SSBE、3 cm 以上を LSBE とする。円周方向と最長の記録は Prague C & M による。日本の内視鏡診断に腸上皮化生の証明は必須ではない。',
  citations: [
    {
      role: 'original',
      text: '日本食道学会. 食道癌取扱い規約 第11版. 金原出版',
    },
    {
      role: 'japanese-reference',
      text: 'Japan Esophageal Society. Esophagus 2017;14:1-36 (11th ed., Part I)',
      pubmed: BARRETT_JCE11_PUBMED,
    },
    {
      role: 'related-study',
      text: 'Sharma P, Morales TG, Sampliner RE. Am J Gastroenterol 1998;93:1033-1036',
      pubmed: BARRETT_SSBE_1998_PUBMED,
    },
    {
      role: 'related-study',
      text: 'Sharma P et al. Gastroenterology 2006;131:1392-1399 (Prague C & M)',
      pubmed: BARRETT_PRAGUE_PUBMED,
    },
  ],
  pubmed: BARRETT_JCE11_PUBMED,
  figures: [
    {
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5226084/',
      hrefLabel: '2017 paper',
      figureKind: 'original',
      sourceShort: 'JCE 2017',
      alt: 'Japanese Classification of Esophageal Cancer, 11th edition, Part I',
      caption: 'Japan Esophageal Society. Japanese Classification of Esophageal Cancer, 11th Edition: part I',
      source:
        'Japan Esophageal Society. Japanese Classification of Esophageal Cancer, 11th Edition: part I. Esophagus. 2017;14:1-36.',
      doi: 'https://doi.org/10.1007/s10388-016-0551-7',
      pubmed: BARRETT_JCE11_PUBMED,
      note: '規約第11版英語 Part I。Springer Open、CC BY 4.0 だが Barrett 定義の単独図を確認できないため埋め込まず論文へリンクする。',
    },
    {
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8828243/',
      hrefLabel: 'Oyanagi 2022',
      figureKind: 'secondary',
      sourceShort: 'Oyanagi 2022',
      alt: 'Japanese versus Western diagnostic criteria for Barrett esophagus',
      caption: 'Oyanagi T et al. Inconsistency of Barrett diagnostic criteria between Japan and Western countries. DEN Open 2022',
      source:
        'Oyanagi T, Watanabe M, Aoyama T, et al. Endoscopic diagnosis and screening of Barrett’s esophagus: inconsistency of diagnostic criteria between Japan and Western countries. DEN Open. 2022;2:e73.',
      doi: 'https://doi.org/10.1002/deo2.73',
      pubmed: BARRETT_OYANAGI_2022_PUBMED,
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      note: '日本と欧米の Barrett 定義の差を解説した二次文献。Prague ページの Fig. 5 とは別。CC BY 4.0。複合図は埋め込まず論文へリンクする。',
    },
  ],
  entries: [
    {
      label: 'EGJ',
      meaning: 'Lower end of palisade vessels',
      group: 'ランドマーク',
      severity: 'none',
      rows: [
        {
          heading: 'Japan',
          text: 'The EGJ is the lower end of the palisade vessels in the distal esophagus. If those vessels are unclear, use the oral end of the gastric mucosal folds',
        },
        {
          heading: 'West',
          text: 'Prague and Siewert use the tops of the gastric mucosal folds as the zero point',
        },
        {
          heading: 'SCJ',
          text: 'The Z-line (SCJ) may not coincide with the EGJ. Columnar epithelium oral to the EGJ is Barrett esophagus',
        },
      ],
      comment: '裂孔ヘルニアや Barrett では柵状血管が見えにくく、ひだの上端を使う。',
    },
    {
      label: '定義',
      meaning: 'Columnar epithelium oral to the EGJ',
      group: '定義',
      severity: 'mild',
      rows: [
        {
          heading: 'Japan',
          text: 'Barrett esophagus is columnar epithelium in the esophagus. Intestinal metaplasia is not required for the endoscopic diagnosis',
        },
        {
          heading: 'West',
          text: 'Many definitions also require intestinal metaplasia on biopsy of salmon-colored mucosa',
        },
      ],
    },
    {
      label: 'SSBE',
      meaning: 'Short segment <3 cm',
      group: '長さ',
      severity: 'mild',
      rows: [
        {
          heading: 'Definition',
          text: 'Maximum length of columnar epithelium <3 cm',
        },
        {
          heading: 'Report',
          text: 'A tongue-only segment is Prague C0M<3. Record C and M on the Prague page',
        },
      ],
    },
    {
      label: 'LSBE',
      meaning: 'Long segment ≥3 cm',
      group: '長さ',
      severity: 'moderate',
      rows: [
        {
          heading: 'Definition',
          text: 'Maximum length of columnar epithelium ≥3 cm',
        },
        {
          heading: 'Risk',
          text: 'Longer segments have higher adenocarcinoma risk. Record Prague C and M and plan surveillance',
        },
      ],
    },
    {
      label: 'Prague',
      meaning: 'C and M',
      group: '計測',
      severity: 'none',
      rows: [
        {
          heading: 'C',
          text: 'Circumferential columnar extent from the EGJ, in centimetres',
        },
        {
          heading: 'M',
          text: 'Maximum extent (circumferential segment plus tongue), in centimetres. Do not take M as the tongue alone',
        },
      ],
      comment: '計測手順は Prague ページ。このページは日本の定義と SSBE/LSBE。',
    },
  ],
};
