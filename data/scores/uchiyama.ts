import type { ClassificationDefinition } from '../../types/score';

/** Uchiyama 2006 J Gastroenterol（PMID 16612620）。乳頭部腫瘍の ME-NBI */
export const UCHIYAMA_2006_PUBMED = '16612620';

export const uchiyamaScore: ClassificationDefinition = {
  id: 'uchiyama',
  kind: 'classification',
  name: 'Uchiyama ME-NBI分類（乳头部）',
  shortName: 'Uchiyama ME-NBI',
  developedInJapan: true,
  toolKind: 'classification',
  organ: 'duodenum',
  category: 'classification',
  categoryLabel: '乳头部',
  description:
    '十二指腸乳头部腫瘍の拡大 NBI（ME-NBI）所見を、表面構造（Type I / II / III）と異常血管の有無で分類する（Uchiyama 2006）。Type I は炎症・増殖性、Type II/III は腺腫・癌。異常血管は腺癌に特徴的。',
  originalLead:
    'Magnifying endoscopy combined with narrow-band imaging (ME-NBI) images of ampullary tumors were classified into three groups by surface structure: Type I, oval-shaped villi; Type II, pinecone/leaf-shaped villi; Type III, irregular or nonstructured surface. Abnormal vessels were defined as dilated, tortuous, or network-like vessels, or vessel disappearance on papillary lesions. Type I occurred in inflammation or hyperplastic lesions; Type II and/or III occurred in adenomas and adenocarcinomas. Abnormal vessels appeared only in adenocarcinomas and help differentiate adenoma from adenocarcinoma.',
  reference: 'Uchiyama Y et al. J Gastroenterol 2006;41:483-490',
  pubmed: UCHIYAMA_2006_PUBMED,
  note: '症例数は少なく、さらなる検証が必要（原著の限界）。非乳头部 SNADET には Kikuchi ME-NBI / Ishii スコアを参照。',
  figures: [
    {
      href: 'https://link.springer.com/article/10.1007/s00535-006-1800-7',
      hrefLabel: 'Uchiyama 2006',
      alt: 'Uchiyama ME-NBI classification for ampullary tumors',
      caption: 'ME-NBI classification of ampullary tumors (Uchiyama 2006)',
      source:
        'Uchiyama Y, Imazu H, Kakutani H, et al. New approach to diagnosing ampullary tumors by magnifying endoscopy combined with a narrow-band imaging system. J Gastroenterol. 2006;41:483-490.',
      doi: 'https://doi.org/10.1007/s00535-006-1800-7',
      pubmed: UCHIYAMA_2006_PUBMED,
      note: '原著。Springer の著作権。CC ではないので論文へリンクする。',
    },
  ],
  entries: [
    {
      label: 'Type I',
      meaning: 'Oval-shaped villi',
      group: '表面',
      severity: 'none',
      rows: [
        { heading: 'Surface', text: 'Oval-shaped villi on ME-NBI' },
        { heading: 'Pathology', text: 'Inflammation or hyperplastic lesion' },
      ],
    },
    {
      label: 'Type II',
      meaning: 'Pinecone / leaf-shaped villi',
      group: '表面',
      severity: 'mild',
      rows: [
        { heading: 'Surface', text: 'Pinecone-shaped or leaf-shaped villi' },
        { heading: 'Pathology', text: 'Adenoma or adenocarcinoma' },
      ],
      comment: 'Type II/III は neoplastic。生検で確定。',
    },
    {
      label: 'Type III',
      meaning: 'Irregular / nonstructured',
      group: '表面',
      severity: 'severe',
      rows: [
        { heading: 'Surface', text: 'Irregular or nonstructured surface pattern' },
        { heading: 'Pathology', text: 'Adenoma or adenocarcinoma' },
      ],
    },
    {
      label: 'Abnormal vessels',
      meaning: 'Dilated, tortuous, or network-like',
      group: '血管',
      severity: 'severe',
      rows: [
        {
          heading: 'Definition',
          text: 'Dilated, tortuous, or network-like vessels; or vessel disappearance on the papillary lesion',
        },
        { heading: 'Pathology', text: 'Adenocarcinoma (not seen in adenoma alone in the original series)' },
      ],
      comment: '腺腫と腺癌の鑑別に有用。Type II/III と併せて評価。',
    },
  ],
};
