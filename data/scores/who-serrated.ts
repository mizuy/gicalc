import type { ClassificationDefinition } from '../../types/score';

/** Nagtegaal JD et al. Histopathology 2020 — WHO 2019 digestive system tumours */
export const WHO_DIGESTIVE_2019_PUBMED = '32221997';

export const whoSerratedScore: ClassificationDefinition = {
  id: 'who-serrated',
  kind: 'classification',
  name: 'WHO 2019 鋸歯状病変の組織型',
  shortName: 'WHO Serrated',
  organ: 'colorectum',
  category: 'classification',
  categoryLabel: '病理分類',
  description:
    'WHO 第5版（2019）消化器腫瘍の鋸歯状ポリープ・病変の組織型。WASP・SPS と連動する病理報告の共通言語です。',
  originalLead:
    'The WHO 2019 classification of serrated lesions in the colorectum distinguishes hyperplastic polyp (HP), sessile serrated lesion (SSL; formerly sessile serrated adenoma/polyp, SSA/P), SSL with dysplasia, traditional serrated adenoma (TSA), and unclassified serrated lesion. SSL shows serrated architecture with crypt distortion (dilated, branched, or horizontally oriented crypts) without cytologic dysplasia. TSA shows ectopic crypt foci and often eosinophilic cytoplasm. SSA/P terminology is deprecated in favour of SSL.',
  reference:
    'WHO Classification of Tumours: Digestive System Tumours, 5th ed, 2019 / Nagtegaal JD et al. Histopathology 2020',
  pubmed: WHO_DIGESTIVE_2019_PUBMED,
  note: 'SSL with dysplasia は従来型異型増殖（tubular/villous）を伴う。TSA は大腸に限らず小腸にも起こりうる。未分類は上記に当てはまらない鋸歯状病変。',
  figures: [
    {
      href: 'https://tumourclassification.iarc.who.int/chapters/08',
      hrefLabel: 'WHO Blue Book',
      alt: 'WHO Classification of Tumours: Digestive System Tumours, 5th edition',
      caption: 'WHO Classification of Tumours: Digestive System Tumours (5th ed, 2019)',
      source: 'WHO Classification of Tumours Editorial Board. Digestive System Tumours. Lyon: IARC; 2019.',
      note: 'IARC WHO Blue Book。CC ではないのでリンクのみ。',
    },
  ],
  entries: [
    {
      label: 'HP',
      meaning: 'Hyperplastic polyp',
      group: '非腫瘍性',
      severity: 'none',
      rows: [
        {
          heading: 'Definition',
          text: 'Serrated crypts without architectural distortion of crypt bases; microvesicular or goblet-cell-rich hyperplastic mucosa',
        },
        { heading: 'Dysplasia', text: 'None' },
        { heading: 'Endoscopy', text: 'Often small rectosigmoid lesions; WASP Type 1 correlates' },
      ],
    },
    {
      label: 'SSL',
      meaning: 'Sessile serrated lesion (no dysplasia)',
      group: '腫瘍性',
      severity: 'mild',
      rows: [
        {
          heading: 'Definition',
          text: 'Serrated architecture with crypt distortion (dilated, branched, or horizontal crypt bases); no cytologic dysplasia',
        },
        { heading: 'Terminology', text: 'Replaces sessile serrated adenoma/polyp (SSA/P)' },
        { heading: 'Endoscopy', text: 'Often flat, mucus cap; WASP Type 2 (SSL) correlates' },
      ],
      comment: '鋸歯状経路の前駆病変。SSL 単独でも進展リスクがあり、サイズ・境界・異型度で管理。',
    },
    {
      label: 'SSL-D',
      meaning: 'SSL with dysplasia',
      group: '腫瘍性',
      severity: 'moderate',
      rows: [
        {
          heading: 'Definition',
          text: 'SSL architecture plus conventional adenomatous (low- or high-grade) dysplasia',
        },
        { heading: 'Clinical', text: 'Higher progression risk than SSL without dysplasia' },
      ],
    },
    {
      label: 'TSA',
      meaning: 'Traditional serrated adenoma',
      group: '腫瘍性',
      severity: 'moderate',
      rows: [
        {
          heading: 'Definition',
          text: 'Serrated lesion with ectopic crypt foci and often eosinophilic cytoplasm; may show cytologic dysplasia',
        },
        { heading: 'Endoscopy', text: 'Often protuberant; WASP Type 3 (TSA) correlates' },
      ],
    },
    {
      label: 'Unclassified',
      meaning: 'Unclassified serrated lesion',
      group: 'その他',
      severity: 'mild',
      rows: [
        {
          heading: 'Definition',
          text: 'Serrated lesion that does not meet criteria for HP, SSL, SSL with dysplasia, or TSA',
        },
        { heading: 'Clinical', text: 'Expert review or reclassification may be needed' },
      ],
    },
  ],
};
