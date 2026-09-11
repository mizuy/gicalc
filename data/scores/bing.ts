import type { ClassificationDefinition } from '../../types/score';

/** Sharma P et al. Gastroenterology 2016;150:591-598 */
export const BING_2016_PUBMED = '26627609';

const BING_SOURCE =
  'Sharma P, Bergman JJGHM, Goda K, et al. Development and validation of a classification system to identify high-grade dysplasia and esophageal adenocarcinoma in Barrett’s esophagus using narrow-band imaging. Gastroenterology. 2016;150:591-598.';
const BING_DOI = 'https://doi.org/10.1053/j.gastro.2015.11.037';

export const bingScore: ClassificationDefinition = {
  id: 'bing',
  kind: 'classification',
  name: 'BING分類（Barrett NBI）',
  shortName: 'BING',
  organ: 'esophagus',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    'Barrett 粘膜の NBI 所見を、粘膜模様と血管模様の regular / irregular で分け、NDBE と HGD/EAC を予測する。両者 regular なら NDBE、どちらか irregular なら HGD/EAC。高自信判定の精度が高い。',
  originalLead:
    'The BING criteria classify Barrett’s esophagus on narrow-band imaging by mucosal and vascular pattern. Mucosal pattern is regular when circular, ridged/villous, or tubular, and irregular when absent or irregular. Vascular pattern is regular when blood vessels are regularly situated along or between mucosal ridges, and irregular when absent or irregularly distributed. Regular mucosa and regular vessels predict nondysplastic Barrett’s esophagus (NDBE). Irregular mucosa or irregular vessels predict high-grade dysplasia or esophageal adenocarcinoma (HGD/EAC). High-confidence interpretations are more accurate than low-confidence interpretations.',
  reference: 'Sharma P et al. Gastroenterology 2016;150:591-598',
  pubmed: BING_2016_PUBMED,
  figures: [
    {
      href: 'https://www.gastrojournal.org/article/S0016-5085(15)01717-2/fulltext',
      hrefLabel: 'Fig. 1',
      figureRef: 'Fig. 1',
      figureKind: 'original',
      sourceShort: 'Sharma 2016',
      alt: 'BING classification of mucosal and vascular patterns in Barrett esophagus',
      caption: 'Fig. 1. BING criteria for mucosal and vascular patterns (Sharma et al. 2016)',
      source: `${BING_SOURCE} Fig. 1.`,
      doi: BING_DOI,
      pubmed: BING_2016_PUBMED,
      note: '原著 Fig. 1。Elsevier / Gastroenterology の著作権。CC ではないので画像は埋め込まず、論文へリンクする。',
    },
  ],
  entries: [
    {
      label: 'Mucosa regular',
      meaning: 'Circular, ridged/villous, or tubular',
      group: '粘膜模様',
      severity: 'none',
      rows: [
        {
          heading: 'Pattern',
          text: 'Circular, ridged/villous, or tubular mucosal pattern',
        },
      ],
    },
    {
      label: 'Mucosa irregular',
      meaning: 'Absent or irregular',
      group: '粘膜模様',
      severity: 'severe',
      rows: [
        {
          heading: 'Pattern',
          text: 'Absent or irregular mucosal pattern',
        },
      ],
    },
    {
      label: 'Vessels regular',
      meaning: 'Regular vessels along or between ridges',
      group: '血管模様',
      severity: 'none',
      rows: [
        {
          heading: 'Pattern',
          text: 'Blood vessels regularly situated along or between mucosal ridges',
        },
      ],
    },
    {
      label: 'Vessels irregular',
      meaning: 'Absent or irregular vessels',
      group: '血管模様',
      severity: 'severe',
      rows: [
        {
          heading: 'Pattern',
          text: 'Absent or irregularly distributed vessels',
        },
      ],
    },
    {
      label: 'NDBE',
      meaning: 'Both patterns regular',
      group: '予測組織',
      severity: 'none',
      rows: [
        {
          heading: 'Rule',
          text: 'Regular mucosa and regular vessels predict nondysplastic Barrett’s esophagus',
        },
      ],
    },
    {
      label: 'HGD/EAC',
      meaning: 'Either pattern irregular',
      group: '予測組織',
      severity: 'severe',
      rows: [
        {
          heading: 'Rule',
          text: 'Irregular mucosa or irregular vessels predict high-grade dysplasia or esophageal adenocarcinoma',
        },
      ],
      comment: 'どちらか一方でも irregular なら HGD/EAC。',
    },
    {
      label: 'Confidence',
      meaning: 'High vs low',
      group: '判定',
      severity: 'mild',
      rows: [
        {
          heading: 'High',
          text: 'High-confidence assessments were more accurate (about 92% in Sharma 2016) than low-confidence assessments',
        },
        {
          heading: 'Use',
          text: 'Target irregular areas for biopsy or resection. BING does not replace Prague length or the Japanese Barrett definition',
        },
      ],
    },
  ],
};
