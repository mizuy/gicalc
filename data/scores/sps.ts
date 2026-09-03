import type { ClassificationDefinition } from '../../types/score';

/** Dekker 2020 Gastroenterology（PMID 31982410）。WHO 2019 診断基準の解説 */
export const DEKKER_2020_PUBMED = '31982410';
/** McWhinney 2023 Endosc Int Open Table 1（PMID 37810899）。WHO 2010/2019 対照。CC BY-NC-ND 4.0 */
export const MCWHINNEY_2023_PUBMED = '37810899';

export const spsScore: ClassificationDefinition = {
  id: 'sps',
  kind: 'classification',
  name: 'SPS（鋸歯状ポリープ症候群）診断基準',
  shortName: 'SPS',
  organ: 'colorectum',
  category: 'classification',
  categoryLabel: '診断基準',
  description:
    'WHO 2019 の鋸歯状ポリープ症候群（Serrated Polyposis Syndrome; 旧 hyperplastic polyposis）の診断基準。2010 基準との差分と、カウント対象・サーベイランスの要点をまとめた。WASP の SSL 形態分類とは別物。',
  originalLead:
    'Serrated polyposis syndrome (SPS) is diagnosed when either of the following WHO 2019 criteria is met. Criterion I: at least five serrated polyps proximal to the rectum, all ≥5 mm in size, with at least two ≥10 mm. Criterion II: more than 20 serrated polyps of any size distributed throughout the large bowel, with at least five proximal to the rectum. Serrated polyps include hyperplastic polyps (HP), sessile serrated lesions (SSL; formerly SSA/P), and traditional serrated adenomas (TSA). Counts are cumulative over a lifetime and across multiple colonoscopies. Adenomas are not counted toward SPS criteria.',
  reference:
    'WHO Classification of Digestive System Tumours, 5th ed. 2019. Dekker E et al. Gastroenterology 2020;158:1520-1523',
  pubmed: DEKKER_2020_PUBMED,
  note: '2019 基準はいずれか 1 つで診断。2010 の家族歴基準（Type II）は 2019 で削除。直腸より口側＝rectosigmoid 以遠（2010 は sigmoid より口側）。ESGE 2019 polyposis、US MSTF 2020（Gupta GIE 2020）のサーベイランスを参照。',
  figures: [
    {
      href: 'https://www.thieme-connect.com/products/ejournals/html/10.1055/a-2157-4125#table-1',
      hrefLabel: 'Table 1',
      alt: 'WHO diagnostic criteria for serrated polyposis syndrome in 2010 and 2019 (McWhinney 2023 Table 1)',
      caption: 'Table 1. WHO diagnostic criteria for serrated polyposis syndrome in 2010 and 2019',
      source:
        'McWhinney CD, Lahr RE, Rex DK. Frequency of serrated polyposis syndrome recognition by community endoscopists. Endosc Int Open. 2023;11:E888-E892. Table 1.',
      doi: 'https://doi.org/10.1055/a-2157-4125',
      pubmed: MCWHINNEY_2023_PUBMED,
      license: 'CC BY-NC-ND 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
      note: '2010/2019 の対照表。Thieme Endoscopy International Open。表は HTML なので埋め込まず Table 1 へリンクする。Dekker 2020 の原著は CC ではない。',
    },
    {
      href: 'https://doi.org/10.1053/j.gastro.2019.11.310',
      hrefLabel: 'Dekker 2020',
      alt: 'Update on the WHO criteria for diagnosis of serrated polyposis syndrome',
      caption: 'Dekker E et al. Update on the WHO criteria for diagnosis of serrated polyposis syndrome. Gastroenterology 2020',
      source: 'Dekker E, Bleijenberg AG, Balaguer F, et al. Gastroenterology. 2020;158:1520-1523.',
      doi: 'https://doi.org/10.1053/j.gastro.2019.11.310',
      pubmed: DEKKER_2020_PUBMED,
      note: 'WHO 2019 基準の解説。Elsevier / Gastroenterology の著作権。CC ではないので論文へリンクする。',
    },
  ],
  entries: [
    {
      label: 'Criterion I',
      meaning: 'Proximal phenotype (WHO 2019)',
      group: 'WHO 2019',
      severity: 'moderate',
      rows: [
        {
          heading: 'Definition',
          text: 'At least five serrated polyps proximal to the rectum, all ≥5 mm in size, with at least two ≥10 mm',
        },
        {
          heading: 'Location',
          text: 'Proximal to the rectum (includes sigmoid colon; rectosigmoid and rectum are excluded)',
        },
        {
          heading: 'Size',
          text: 'All five (or more) qualifying polyps must be ≥5 mm; at least two must be ≥10 mm',
        },
      ],
      comment:
        '2010 Type I から sigmoid を含む「rectum より口側」に拡げ、5 mm 未満はカウント外とした。口側優位型。',
    },
    {
      label: 'Criterion II',
      meaning: 'Pancolonic phenotype (WHO 2019)',
      group: 'WHO 2019',
      severity: 'moderate',
      rows: [
        {
          heading: 'Definition',
          text: 'More than 20 serrated polyps of any size distributed throughout the large bowel, with at least five proximal to the rectum',
        },
        {
          heading: 'Location',
          text: 'Throughout the colon and rectum; ≥5 must be proximal to the rectum',
        },
        {
          heading: 'Size',
          text: 'Any size (diminutive polyps count toward the total of >20)',
        },
      ],
      comment: '2010 Type III に相当。全結腸型。サイズ不問で >20 個、うち ≥5 個が直腸より口側。',
    },
    {
      label: 'Type 1',
      meaning: 'WHO 2010 (superseded)',
      group: 'WHO 2010',
      severity: 'none',
      rows: [
        {
          heading: 'Definition',
          text: 'At least five serrated polyps proximal to the sigmoid colon, with at least two >10 mm in size',
        },
        {
          heading: '2019 change',
          text: 'Expanded to proximal to the rectum; all qualifying polyps must be ≥5 mm (not only the two ≥10 mm)',
        },
      ],
      comment: '2019 Criterion I の前身。文献上の旧基準として参照用。',
    },
    {
      label: 'Type 2',
      meaning: 'WHO 2010 — family history (removed)',
      group: 'WHO 2010',
      severity: 'none',
      rows: [
        {
          heading: 'Definition',
          text: 'Any number of serrated polyps proximal to the sigmoid colon in an individual with a first-degree relative with SPS',
        },
        {
          heading: '2019 change',
          text: 'Removed from WHO 2019 criteria',
        },
      ],
      comment: '2019 で削除。家族歴は別途遺伝カウンセリングの文脈で扱う。',
    },
    {
      label: 'Type 3',
      meaning: 'WHO 2010 (superseded)',
      group: 'WHO 2010',
      severity: 'none',
      rows: [
        {
          heading: 'Definition',
          text: 'More than 20 serrated polyps of any size distributed throughout the colon',
        },
        {
          heading: '2019 change',
          text: 'Requires ≥5 serrated polyps proximal to the rectum (Criterion II)',
        },
      ],
      comment: '2019 Criterion II の前身。2019 では口側 ≥5 個が追加条件。',
    },
    {
      label: 'HP',
      meaning: 'Hyperplastic polyp',
      group: 'Serrated polyp types',
      severity: 'none',
      rows: [
        { heading: 'Abbreviation', text: 'HP' },
        {
          heading: 'Counting',
          text: 'Included in SPS polyp counts when histologically confirmed',
        },
      ],
    },
    {
      label: 'SSL',
      meaning: 'Sessile serrated lesion',
      group: 'Serrated polyp types',
      severity: 'mild',
      rows: [
        { heading: 'Abbreviation', text: 'SSL (formerly SSA/P — sessile serrated adenoma/polyp)' },
        {
          heading: 'Counting',
          text: 'Included in SPS polyp counts; endoscopic detection quality matters',
        },
      ],
      comment: 'WHO 2019 用語は SSL。病理・内視鏡報告書では SSA/P 表記も残る。',
    },
    {
      label: 'TSA',
      meaning: 'Traditional serrated adenoma',
      group: 'Serrated polyp types',
      severity: 'mild',
      rows: [
        { heading: 'Abbreviation', text: 'TSA' },
        {
          heading: 'Counting',
          text: 'Included in SPS polyp counts when histologically confirmed',
        },
      ],
    },
    {
      label: 'Counting rules',
      meaning: 'What counts toward SPS',
      group: 'Application',
      severity: 'none',
      rows: [
        {
          heading: 'Cumulative',
          text: 'Polyp counts are cumulative over a lifetime and across multiple colonoscopies',
        },
        {
          heading: 'Histology',
          text: 'Only histologically confirmed serrated polyps (HP, SSL, TSA) count',
        },
        {
          heading: 'Exclusions',
          text: 'Conventional adenomas, non-serrated lesions, and unconfirmed endoscopic impressions do not count',
        },
        {
          heading: 'Resection',
          text: 'Removed polyps count if pathology confirms a serrated subtype',
        },
      ],
      comment: '生涯・複数回の内視鏡で累積。腺腫は SPS カウントに含めない。',
    },
    {
      label: 'Surveillance',
      meaning: 'Post-diagnosis follow-up (overview)',
      group: 'Application',
      severity: 'moderate',
      rows: [
        {
          heading: 'ESGE 2019',
          text: 'European Society of Gastrointestinal Endoscopy guideline on colorectal polyposis syndromes',
        },
        {
          heading: 'US MSTF 2020',
          text: 'Gupta S et al. Recommendations for follow-up after colonoscopy and polypectomy. Gastrointest Endosc 2020 — serrated polyposis surveillance intervals',
        },
        {
          heading: 'Principle',
          text: 'Clear the colon of significant serrated polyps and assign shortened surveillance based on polyp burden and dysplasia',
        },
      ],
      comment: '間隔は ESGE 2019 と US MSTF 2020（Gupta GIE 2020）を参照。施設プロトコルに従う。',
    },
  ],
};
