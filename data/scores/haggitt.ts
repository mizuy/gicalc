import type { ClassificationDefinition, ClassificationFigure } from '../../types/score';

/** Haggitt RC et al. Gastroenterology 1985;89:328-336 */
export const HAGGITT_1985_PUBMED = '4007423';

const HAGGITT_USER_FIGURE_PATH = '/figures/haggitt-gicalc2026-original.svg';

function userSchematicCrop(file: string, label: string, meaning: string): ClassificationFigure {
  return {
    src: `/figures/haggitt-gicalc2026-${file}.webp`,
    href: HAGGITT_USER_FIGURE_PATH,
    hrefLabel: 'Full schematic',
    figureKind: 'gicalc',
    sourceShort: 'GI Calc',
    alt: `Schematic of Haggitt ${label}: ${meaning}`,
    caption: `${label}. ${meaning} (original schematic supplied for GI Calc)`,
    source: 'GI Calc original schematic, 2026.',
    license: 'CC BY 4.0',
    note: `Haggitt原著の図ではなく、GI Calc自作のCC BY模式図から${label}を切り抜いて掲載。`,
    aspectRatio: 1200 / 680,
  };
}

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
      note: '原著。Elsevier / Gastroenterology の著作権。CC ではないので画像は埋め込まず、PubMed へリンクする。JCM 2024 Fig. 1 は CC BY 記事だが McKigney 2020 Surgery (Oxford) からの再掲なので埋め込まない。Kuo 2020 Gastroenterol Res Fig. 6 は CC BY-NC 4.0 の二次模式図だが、カードには GI Calc 図を載せる。',
    },
    {
      href: HAGGITT_USER_FIGURE_PATH,
      hrefLabel: 'Full supplied schematic',
      figureKind: 'gicalc',
      sourceShort: 'GI Calc',
      alt: 'Original schematic of Haggitt levels 0–4 supplied for GI Calc',
      caption: 'Haggitt Level 0–4 and sessile Level 4 — supplied original schematic',
      source: 'GI Calc original schematic, 2026.',
      license: 'CC BY 4.0',
      note: '原著図ではない GI Calc 自作 SVG。複合図は埋め込まず、各レベルの crop を WebP で掲載。',
    },
  ],
  entries: [
    {
      label: 'Level 0',
      meaning: 'CIS / intramucosal',
      group: 'Haggitt',
      severity: 'none',
      figures: [userSchematicCrop('level-0', 'Level 0', 'CIS / intramucosal')],
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
      figures: [userSchematicCrop('level-1', 'Level 1', 'SM limited to the head')],
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
      figures: [userSchematicCrop('level-2', 'Level 2', 'Neck')],
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
      figures: [userSchematicCrop('level-3', 'Level 3', 'Stalk')],
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
      figures: [
        userSchematicCrop('level-4', 'Level 4', 'Bowel-wall SM'),
        userSchematicCrop('sessile', 'Sessile = L4', 'Any SM invasion'),
      ],
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
