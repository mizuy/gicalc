import type { ClassificationDefinition } from '../../types/score';

/** Burgess 2017 Gut（PMID 27464708）。Sydney classification of deep mural injury */
export const SYDNEY_DMI_2017_PUBMED = '27464708';

/** Swan 2011 GIE（PMID 21184873）。target sign の先行記載 */
export const SYDNEY_DMI_TARGET_SIGN_PUBMED = '21184873';

const BURGESS_SOURCE =
  'Burgess NG, Bassan MS, McLeod D, Williams SJ, Byth K, Bourke MJ. Deep mural injury and perforation after colonic endoscopic mucosal resection: a new classification and analysis of risk factors. Gut. 2017;66:1779-1789.';
const BURGESS_DOI = 'https://doi.org/10.1136/gutjnl-2015-309848';
const BURGESS_FIG1 = 'https://gut.bmj.com/content/66/10/1779#F1';
const BURGESS_FIG3 = 'https://gut.bmj.com/content/66/10/1779#F3';

export const sydneyDmiScore: ClassificationDefinition = {
  id: 'sydney-dmi',
  kind: 'classification',
  name: 'Sydney分類（深部壁損傷）',
  shortName: 'Sydney DMI',
  organ: 'colorectum',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '大腸 EMR（主に ≥20 mm の側方発育型）後の欠損を Type 0–V に分け、固有筋層損傷と穿孔を評価する。色素局注後の欠損観察が前提。ESD-F（線維化）とは別の分類です。',
  originalLead:
    'The Sydney classification of deep mural injury (DMI) following endoscopic mucosal resection grades muscularis propria (MP) injury. Type 0: Normal defect. Blue mat appearance of obliquely oriented intersecting submucosal connective tissue fibres. Type I: MP visible but no mechanical injury (whale sign). Type II: Focal loss of the submucosal plane raising concern for MP injury or rendering the MP defect uninterpretable. Type III: MP injured; specimen target sign or defect target sign identified. Type IV: Actual hole within a white cautery ring, no observed contamination. Type V: Actual hole within a white cautery ring, observed contamination. Types I and II are designated Potential DMI. Types III–V (target signs or perforation) require clip closure of the injured MP.',
  citations: [
    {
      role: 'original',
      text: 'Burgess NG, Bassan MS, McLeod D, et al. Gut 2017;66:1779-1789',
      pubmed: SYDNEY_DMI_2017_PUBMED,
    },
    {
      role: 'related-study',
      text: 'Swan MP, Bourke MJ, Moss A, Williams SJ. Gastrointest Endosc 2011;73:79-85',
      pubmed: SYDNEY_DMI_TARGET_SIGN_PUBMED,
    },
  ],
  pubmed: SYDNEY_DMI_2017_PUBMED,
  figures: [
    {
      href: BURGESS_FIG1,
      hrefLabel: 'Fig. 1',
      figureRef: 'Fig. 1',
      figureKind: 'original',
      sourceShort: 'Burgess 2017',
      alt: 'Sydney classification of deep mural injury following EMR (Burgess 2017 Fig. 1)',
      caption: 'Fig. 1. Sydney classification of deep mural injury following endoscopic mucosal resection',
      source: `${BURGESS_SOURCE} Fig. 1.`,
      doi: BURGESS_DOI,
      pubmed: SYDNEY_DMI_2017_PUBMED,
      note: '原著 Fig. 1。BMJ / Gut の著作権。CC ではないので画像は埋め込まず、論文の Fig. 1 へリンクする。',
    },
    {
      href: BURGESS_FIG3,
      hrefLabel: 'Fig. 3–5',
      figureRef: 'Fig. 3–5',
      figureKind: 'original',
      sourceShort: 'Burgess 2017',
      alt: 'Endoscopic examples of Sydney DMI types 0–V (Burgess 2017 Figs 3–5)',
      caption: 'Figs 3–5. Endoscopic examples of type 0–I (Fig. 3), type II (Fig. 4), and type III–V (Fig. 5)',
      source: `${BURGESS_SOURCE} Figs 3–5.`,
      doi: BURGESS_DOI,
      pubmed: SYDNEY_DMI_2017_PUBMED,
      note: '原著 Figs 3–5。BMJ / Gut の著作権。CC ではないので画像は埋め込まず、論文の Fig. 3 へリンクする。',
    },
  ],
  note:
    '判定は色素（インジゴカルミンまたはメチレンブルー）を混ぜた局注後の欠損観察が前提。Type I はクリップ不要、Type II は全例クリップ、Type III–V は損傷した固有筋層の閉鎖が必要。Type V は外科コンサルト。ESD-F（F0–F2）とは別体系。',
  entries: [
    {
      label: 'Type 0',
      meaning: 'Normal defect',
      group: '正常欠損',
      severity: 'none',
      rows: [
        {
          heading: 'Definition',
          text: 'Normal defect. Blue mat appearance of obliquely oriented intersecting submucosal connective tissue fibres (indigo carmine or methylene blue)',
        },
        {
          heading: 'Appearance',
          text: 'Homogeneously stained, partially resected submucosa. Submucosal vessels may be exposed but are uninjured',
        },
        { heading: 'Management', text: 'Clip closure is not required for the defect itself' },
      ],
    },
    {
      label: 'Type I',
      meaning: 'Whale sign',
      group: 'Potential DMI',
      severity: 'mild',
      rows: [
        {
          heading: 'Definition',
          text: 'Muscularis propria (MP) visible but no mechanical injury (whale sign)',
        },
        {
          heading: 'Appearance',
          text: 'Completely resected submucosa. White unstained MP with circumferential striations, resembling the ventral pleats of a blue whale seen from underwater',
        },
        {
          heading: 'Histology',
          text: 'MP was not present in any type I specimens in Burgess 2017',
        },
        { heading: 'Management', text: 'Clip placement is not required' },
      ],
      comment: 'Potential DMI。原則クリップ不要。',
    },
    {
      label: 'Type II',
      meaning: 'Uninterpretable plane',
      group: 'Potential DMI',
      severity: 'moderate',
      rows: [
        {
          heading: 'Definition',
          text: 'Focal loss of the submucosal plane raising concern for MP injury or rendering the MP defect uninterpretable',
        },
        {
          heading: 'Appearance',
          text: 'Distinction between submucosa and MP is unclear, often due to poorly staining submucosal fibrosis',
        },
        {
          heading: 'Management',
          text: 'Clip all type II injuries. The only delayed perforation in Burgess 2017 was an unclipped type II defect',
        },
      ],
      comment: '全例クリップを強く推奨。遅発穿孔の報告はこの未閉鎖 Type II のみ。',
    },
    {
      label: 'Type III',
      meaning: 'Target sign',
      group: '高度 DMI',
      severity: 'severe',
      rows: [
        {
          heading: 'Definition',
          text: 'MP injured; specimen target sign (STS) or defect target sign (DTS) identified',
        },
        {
          heading: 'Appearance',
          text: 'Partial MP resection. DTS in the defect and/or STS on the underside of the specimen (white/grey disc encircled by blue-stained submucosa)',
        },
        {
          heading: 'Management',
          text: 'Clip closure of the DTS to prevent delayed perforation. Same-day discharge is often possible if the patient is well and closure is secure',
        },
      ],
      comment: 'target sign。損傷した固有筋層をクリップ閉鎖する。',
    },
    {
      label: 'Type IV',
      meaning: 'Clean perforation',
      group: '高度 DMI',
      severity: 'severe',
      rows: [
        {
          heading: 'Definition',
          text: 'Actual hole within a white cautery ring, no observed contamination',
        },
        {
          heading: 'Appearance',
          text: 'Complete hole / full-thickness resection of the MP. Concentric ring of cautery artefact. Clean, no faecal effluent',
        },
        {
          heading: 'Management',
          text: 'Close immediately. Where possible, complete resection of surrounding adenoma before clip placement',
        },
      ],
      comment: '汚染のない穿孔。直ちに閉鎖。可能ならクリップ前に周囲腺腫を切除する。',
    },
    {
      label: 'Type V',
      meaning: 'Contaminated perforation',
      group: '高度 DMI',
      severity: 'severe',
      rows: [
        {
          heading: 'Definition',
          text: 'Actual hole within a white cautery ring, observed contamination',
        },
        {
          heading: 'Appearance',
          text: 'Full-thickness perforation contaminated by faecal effluent',
        },
        {
          heading: 'Management',
          text: 'Close the hole and obtain a surgical consultation. Acute surgery if clinical deterioration, peritonitis, significant free intraperitoneal fluid, or failed endoscopic resection',
        },
      ],
      comment: '便汚染のある穿孔。閉鎖に加え外科コンサルト。',
    },
    {
      label: 'Assessment',
      meaning: 'When and how to grade',
      group: '判定',
      severity: 'none',
      rows: [
        {
          heading: 'Injection',
          text: '1 mL of 0.4% indigo carmine or methylene blue and 1 mL of 1:10 000 adrenaline combined with 8 mL saline (Burgess 2017)',
        },
        {
          heading: 'Inspection',
          text: 'Careful post-resection assessment of the defect. Topical submucosal chromoendoscopy (dye via a retracted injection catheter) may enhance contrast when the plane is unclear',
        },
        {
          heading: 'Risk (I–II)',
          text: 'Potential DMI is associated with increasing lesion size, submucosal fibrosis, and transverse colon location',
        },
        {
          heading: 'Risk (III–V)',
          text: 'Target signs or perforation are associated with en bloc resection, transverse colon location, and high-grade dysplasia or submucosal invasive cancer. Avoid en bloc EMR of lesions ≥25 mm when possible',
        },
        {
          heading: 'Scope',
          text: 'Described for colonic EMR of laterally spreading lesions ≥20 mm. The same defect-assessment principles apply when a chromic injectate is used for ESD. Separate from the ESD-F (F0–F2) fibrosis grade',
        },
      ],
    },
  ],
};
