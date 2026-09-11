import { computeOlga } from '../../lib/scores/olga';
import type { ScoreDefinition } from '../../types/score';

/** Rugge M, Genta RM. Staging gastritis: an international proposal. Gastroenterology 2005 */
export const OLGA_2005_PUBMED = '16285989';
/** Rugge et al. Gastritis staging in clinical practice. Gut 2007 */
export const OLGA_2007_GUT_PUBMED = '17142647';
/** Rugge et al. OLGA staging for gastritis: a tutorial. Dig Liver Dis 2008 */
export const OLGA_2008_TUTORIAL_PUBMED = '18424244';

const atrophyOptions = [
  { value: 0, label: 'なし（0）', description: '0' },
  { value: 1, label: '軽度（1）', description: 'mild' },
  { value: 2, label: '中等度（2）', description: 'moderate' },
  { value: 3, label: '高度（3）', description: 'severe' },
];

export const olgaScore: ScoreDefinition = {
  id: 'olga',
  name: 'OLGA（萎縮の胃炎ステージ）',
  shortName: 'OLGA',
  organ: 'stomach',
  category: 'gastritis',
  categoryLabel: '胃炎・胃癌リスク',
  description:
    '生検の萎縮を前庭・体部で 0–3 に分け、交差表で Stage 0–IV を求めます。Stage III–IV は胃癌高リスクです。腸上皮化生で staged するのは OLGIM です。',
  reference: 'Rugge M, Genta RM. Gastroenterology 2005;129:1807-1808',
  pubmed: OLGA_2005_PUBMED,
  citations: [
    {
      role: 'original',
      text: 'Rugge M, Genta RM. Staging gastritis: an international proposal. Gastroenterology 2005;129:1807-1808',
      pubmed: OLGA_2005_PUBMED,
    },
    {
      role: 'related-study',
      text: 'Rugge M et al. Gastritis staging in clinical practice: the OLGA staging system. Gut 2007;56:631-636',
      pubmed: OLGA_2007_GUT_PUBMED,
    },
    {
      role: 'related-study',
      text: 'Rugge M et al. OLGA staging for gastritis: a tutorial. Dig Liver Dis 2008;40:650-658',
      pubmed: OLGA_2008_TUTORIAL_PUBMED,
    },
  ],
  figures: [
    {
      href: 'https://pubmed.ncbi.nlm.nih.gov/16285989/',
      hrefLabel: '2005 letter',
      figureKind: 'original',
      sourceShort: 'Rugge 2005',
      alt: 'OLGA staging system for gastritis',
      caption: 'Rugge M, Genta RM. Staging gastritis: an international proposal. Gastroenterology 2005',
      source:
        'Rugge M, Genta RM. Staging gastritis: an international proposal. Gastroenterology. 2005;129:1807-1808.',
      doi: 'https://doi.org/10.1053/j.gastro.2005.09.056',
      pubmed: OLGA_2005_PUBMED,
      note: '原著は 2005 年 Gastroenterology のレター。Elsevier 著作権。以前の PMID 17452094 は別論文（マウス発生）だった。Gut 2007 は臨床検証、Dig Liver Dis 2008 は tutorial。いずれも CC ではないので画像は埋め込まず、PubMed へリンクする。',
    },
  ],
  fields: [
    { id: 'antrum', label: '前庭部の萎縮', options: atrophyOptions },
    { id: 'corpus', label: '体部の萎縮', options: atrophyOptions },
  ],
  compute: computeOlga,
};
