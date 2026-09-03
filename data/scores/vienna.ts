import type { ClassificationDefinition } from '../../types/score';

/** Schlemper 2000 Gut（PMID 10896917）。Vienna 分類 */
export const VIENNA_2000_PUBMED = '10896917';

export const viennaScore: ClassificationDefinition = {
  id: 'vienna',
  kind: 'classification',
  name: 'Vienna分類（消化管上皮性腫瘍）',
  shortName: 'Vienna',
  organ: 'colorectum',
  category: 'classification',
  categoryLabel: '病理分類',
  description:
    '食道・胃・大腸の上皮性腫瘍の国際病理分類（2000）。欧米（浸潤重視）と日本（細胞異型重視）の用語差を埋める。SNADET 論文の C3 / C4 / C5 は改訂 Vienna。',
  originalLead:
    'The Vienna classification of gastrointestinal epithelial neoplasia: (1) negative for neoplasia/dysplasia, (2) indefinite for neoplasia/dysplasia, (3) non-invasive low grade neoplasia (low grade adenoma/dysplasia), (4) non-invasive high grade neoplasia (high grade adenoma/dysplasia, non-invasive carcinoma and suspicion of invasive carcinoma), and (5) invasive neoplasia (intramucosal carcinoma, submucosal carcinoma or beyond). Category 4 is subdivided into 4.1 high grade adenoma/dysplasia, 4.2 non-invasive carcinoma (carcinoma in situ), and 4.3 suspicion of invasive carcinoma. Category 5 is subdivided into 5.1 intramucosal carcinoma and 5.2 submucosal carcinoma or beyond.',
  reference: 'Schlemper RJ et al. Gut 2000;47:251-255. Revised grouping: Dixon 2002 Gut',
  pubmed: VIENNA_2000_PUBMED,
  note: '2002 改訂では粘膜内癌を 4.4 に移し、Category 5 を粘膜下以深のみとする。SNADET の C4 は HGA + 粘膜内癌、C5 は SM 以深、という使い方が多い。',
  figures: [
    {
      href: 'https://gut.bmj.com/content/47/2/251',
      hrefLabel: '2000 paper',
      alt: 'The Vienna classification of gastrointestinal epithelial neoplasia',
      caption: 'Schlemper RJ et al. The Vienna classification of gastrointestinal epithelial neoplasia. Gut 2000',
      source: 'Schlemper RJ, Riddell RH, Kato Y, et al. Gut. 2000;47:251-255.',
      doi: 'https://doi.org/10.1136/gut.47.2.251',
      pubmed: VIENNA_2000_PUBMED,
      note: '原著。BMJ / Gut の著作権。CC ではないので論文へリンクする。',
    },
  ],
  entries: [
    {
      label: 'Category 1',
      meaning: 'Negative for neoplasia/dysplasia',
      group: '非腫瘍',
      severity: 'none',
      rows: [
        { heading: 'Definition', text: 'Negative for neoplasia / dysplasia' },
        { heading: 'Clinical', text: 'Surveillance at the usual interval' },
      ],
    },
    {
      label: 'Category 2',
      meaning: 'Indefinite for neoplasia/dysplasia',
      group: '非腫瘍',
      severity: 'mild',
      rows: [
        { heading: 'Definition', text: 'Indefinite for neoplasia / dysplasia' },
        { heading: 'Clinical', text: 'Repeat biopsy after treating inflammation' },
      ],
    },
    {
      label: 'Category 3',
      meaning: 'Non-invasive low-grade neoplasia',
      group: '腫瘍',
      severity: 'mild',
      rows: [
        {
          heading: 'Definition',
          text: 'Non-invasive low grade neoplasia (low grade adenoma / dysplasia)',
        },
        { heading: 'SNADET', text: 'C3 = LGA' },
      ],
    },
    {
      label: 'Category 4',
      meaning: 'Non-invasive high-grade neoplasia',
      group: '腫瘍',
      severity: 'moderate',
      rows: [
        { heading: '4.1', text: 'High grade adenoma / dysplasia' },
        { heading: '4.2', text: 'Non-invasive carcinoma (carcinoma in situ)' },
        { heading: '4.3', text: 'Suspicion of invasive carcinoma' },
        {
          heading: '4.4 (revised)',
          text: 'Intramucosal carcinoma (moved from 5.1 in the 2002 revision)',
        },
        { heading: 'SNADET', text: 'C4 usually includes HGA and intramucosal carcinoma' },
      ],
      comment: '改訂 Vienna の 4.4 が粘膜内癌。SNADET の C4 はここを含むことが多い。',
    },
    {
      label: 'Category 5',
      meaning: 'Invasive neoplasia',
      group: '腫瘍',
      severity: 'severe',
      rows: [
        {
          heading: '2000',
          text: '5.1 intramucosal carcinoma; 5.2 submucosal carcinoma or beyond',
        },
        {
          heading: '2002 revision',
          text: 'Category 5 = submucosal carcinoma or beyond only',
        },
        { heading: 'SNADET', text: 'C5 = SM invasive carcinoma' },
      ],
      comment: '2000 原著では粘膜内癌も Category 5。改訂後は SM 以深のみ。',
    },
  ],
};
