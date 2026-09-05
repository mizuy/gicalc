import type { ClassificationDefinition } from '../../types/score';

/** 日本胆道外科学会 胆道癌取扱い規約（第6版）。乳头部癌の肉眼型 */
export const AMPULLARY_MACRO_JSBS_REF =
  'Japanese Society of Biliary Surgery. General rules for clinical and pathological studies on biliary tract cancer. 6th ed. Kanehara; 2013.';
/** JSCO 2015 胆道癌ガイドライン英語版（Nakamura 2019） */
export const JSCO_BILIARY_2015_PUBMED = '30338828';

export const ampullaryMacroscopicScore: ClassificationDefinition = {
  id: 'ampullary-macroscopic',
  kind: 'classification',
  name: '乳头部癌肉眼分類（日本胆道外科学会）',
  shortName: '乳头部肉眼型',
  developedInJapan: true,
  originalLocale: 'ja',
  organ: 'duodenum',
  category: 'classification',
  categoryLabel: '乳头部',
  description:
    '日本胆道外科学会「胆道癌取扱い規約」に基づく十二指腸乳头部癌の肉眼型。腫瘤型・潰瘍型・混在型・その他（正常型・ポリープ型・特殊型）。内視鏡で形態を記載し、生検・深達度評価へつなぐ。',
  reference: '日本胆道外科学会. 胆道癌取扱い規約 第6版. 2013 / JSCO 2015',
  pubmed: JSCO_BILIARY_2015_PUBMED,
  note: 'JCO 胆道癌診療ガイドライン 2015 でも内視鏡的肉眼型の記載が推奨される。切除標本の固定後所見で最終決定する場合もある。',
  figures: [
    {
      href: 'http://www.jsco-cpg.jp/biliary-tract-cancer/guideline/',
      hrefLabel: 'JSCO 2015',
      alt: 'Clinical practice guidelines for biliary tract cancers (macroscopic types)',
      caption: 'Ampullary carcinoma macroscopic types (JSCO 2015 guideline)',
      source:
        'Nakamura M, et al. Clinical practice guidelines for the management of biliary tract cancers 2015: the 2nd English edition. J Hepatobiliary Pancreat Sci. 2019;26:9-32. Referencing JSBS General Rules.',
      doi: 'https://doi.org/10.1002/jhbp.591',
      note: '肉眼型の臨床記載は JSCO 2015 ガイドライン CQ6。CC ではないのでガイドラインへリンクする。',
    },
  ],
  entries: [
    {
      label: '腫瘤型',
      meaning: 'Protruding type',
      group: '主型',
      severity: 'mild',
      rows: [
        { heading: 'Endoscopy', text: 'Protruding mass at the papilla without predominant ulceration' },
        { heading: 'Note', text: 'Strongly suspicious for ampullary neoplasm; biopsy recommended' },
      ],
    },
    {
      label: '潰瘍型',
      meaning: 'Ulcerative type',
      group: '主型',
      severity: 'severe',
      rows: [
        { heading: 'Endoscopy', text: 'Ulcerative lesion at or around the papilla' },
        { heading: 'Note', text: 'Includes protrusion with apical ulcer in clinical reports' },
      ],
    },
    {
      label: '混在型',
      meaning: 'Mixed type',
      group: '主型',
      severity: 'moderate',
      rows: [
        { heading: 'Endoscopy', text: 'Combined protruded and ulcerative features' },
        { heading: 'Note', text: 'Predominant protruded or ulcerative component is recorded when needed' },
      ],
    },
    {
      label: '正常型',
      meaning: 'Normal-appearing papilla',
      group: 'その他',
      severity: 'none',
      rows: [
        { heading: 'Endoscopy', text: 'Papilla appears normal on endoscopy' },
        { heading: 'Work-up', text: 'Endoscopic papillotomy may be needed before biopsy (JSCO 2015)' },
      ],
      comment: '非露出型腫瘍では内視鏡像が正常に見えることがある。',
    },
    {
      label: 'ポリープ型',
      meaning: 'Polypoid type',
      group: 'その他',
      severity: 'mild',
      rows: [
        { heading: 'Endoscopy', text: 'Polypoid lesion of the papilla' },
        {
          heading: 'Morphology',
          text: 'May be exposed into the duodenal lumen or non-exposed with intraductal growth',
        },
      ],
      comment: '露出性と非露出性で進展様式が異なる。',
    },
    {
      label: '特殊型',
      meaning: 'Special type',
      group: 'その他',
      severity: 'none',
      rows: [{ heading: 'Definition', text: 'Macroscopic pattern not fitting the above categories' }],
    },
  ],
};
