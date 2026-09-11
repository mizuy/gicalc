import type { ClassificationDefinition } from '../../types/score';

/** Haggitt RC et al. Gastroenterology 1985;89:328-336 */
export const HAGGITT_1985_PUBMED = '4007423';

export const haggittScore: ClassificationDefinition = {
  id: 'haggitt',
  kind: 'classification',
  name: 'Haggitt分類（悪性ポリープの浸潤レベル）',
  shortName: 'Haggitt',
  organ: 'colorectum',
  category: 'classification',
  categoryLabel: '病理分類',
  description:
    '有茎性悪性ポリープの浸潤を Level 0–4 に分ける。無茎性の悪性ポリープは定義上 Level 4。追加腸切除の判断は SM 距離・簇出・脈管も見る（治癒切除判定）。',
  originalLead:
    'The level of invasion in a pedunculated malignant polyp is classified as Level 0: carcinoma in situ or intramucosal carcinoma (does not invade the muscularis mucosae / submucosa). Level 1: carcinoma invading through the muscularis mucosae into the submucosa but limited to the head of the polyp. Level 2: carcinoma invading the neck (junction of head and stalk). Level 3: carcinoma invading any part of the stalk. Level 4: carcinoma invading into the submucosa of the bowel wall below the stalk, but above the muscularis propria. By definition, all sessile malignant polyps with submucosal invasion are Level 4.',
  reference: 'Haggitt RC, Glotzbach RE, Soffer EE, Wruble LD. Gastroenterology 1985;89:328-336',
  pubmed: HAGGITT_1985_PUBMED,
  figures: [
    {
      href: 'https://pubmed.ncbi.nlm.nih.gov/4007423/',
      hrefLabel: '1985 paper',
      figureKind: 'original',
      sourceShort: 'Haggitt 1985',
      alt: 'Haggitt levels of invasion in malignant colorectal polyps',
      caption: 'Haggitt RC et al. Prognostic factors in colorectal carcinomas arising in adenomas. Gastroenterology 1985',
      source:
        'Haggitt RC, Glotzbach RE, Soffer EE, Wruble LD. Prognostic factors in colorectal carcinomas arising in adenomas: implications for lesions removed by endoscopic polypectomy. Gastroenterology. 1985;89:328-336.',
      doi: 'https://doi.org/10.1016/0016-5085(85)90331-3',
      pubmed: HAGGITT_1985_PUBMED,
      note: '原著。Elsevier / Gastroenterology の著作権。CC ではないので画像は埋め込まず、PubMed へリンクする。',
    },
  ],
  entries: [
    {
      label: 'Level 0',
      meaning: 'CIS / intramucosal',
      group: 'Haggitt',
      severity: 'none',
      rows: [
        {
          heading: 'Definition',
          text: 'Carcinoma in situ or intramucosal carcinoma that does not invade through the muscularis mucosae into the submucosa',
        },
      ],
    },
    {
      label: 'Level 1',
      meaning: 'SM limited to the head',
      group: 'Haggitt',
      severity: 'mild',
      rows: [
        {
          heading: 'Definition',
          text: 'Carcinoma invading through the muscularis mucosae into the submucosa but limited to the head of the polyp',
        },
      ],
    },
    {
      label: 'Level 2',
      meaning: 'Neck',
      group: 'Haggitt',
      severity: 'moderate',
      rows: [
        {
          heading: 'Definition',
          text: 'Carcinoma invading the neck of the polyp (the junction of the head and the stalk)',
        },
      ],
    },
    {
      label: 'Level 3',
      meaning: 'Stalk',
      group: 'Haggitt',
      severity: 'moderate',
      rows: [
        {
          heading: 'Definition',
          text: 'Carcinoma invading any part of the stalk',
        },
      ],
    },
    {
      label: 'Level 4',
      meaning: 'Bowel-wall SM',
      group: 'Haggitt',
      severity: 'severe',
      rows: [
        {
          heading: 'Definition',
          text: 'Carcinoma invading into the submucosa of the bowel wall below the stalk but above the muscularis propria',
        },
        {
          heading: 'Sessile',
          text: 'All sessile malignant polyps with submucosal invasion are Level 4 by definition',
        },
      ],
      comment: '無茎性 SM 浸潤はすべて Level 4。',
    },
    {
      label: 'Assessment',
      meaning: 'How to use the level',
      group: '判定',
      severity: 'none',
      rows: [
        {
          heading: 'Scope',
          text: 'Described for pedunculated adenomas containing carcinoma. Sessile lesions with SM invasion are Level 4',
        },
        {
          heading: 'Surgery',
          text: 'Level 4 invasion, lymphovascular invasion, and poor differentiation were adverse factors in Haggitt 1985',
        },
        {
          heading: 'Today',
          text: 'Japanese curative-resection rules also use SM depth (µm), budding, and Ly/V. Use the colorectal ESD curability page',
        },
      ],
    },
  ],
};
