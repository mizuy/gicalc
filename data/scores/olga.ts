import { computeOlga } from '../../lib/scores/olga';
import type { ScoreDefinition } from '../../types/score';

/** Rugge et al. Dig Liver Dis 2007/2008. OLGA staging tutorial */
export const OLGA_2007_PUBMED = '17452094';

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
  reference: 'Rugge M et al. Dig Liver Dis 2007',
  pubmed: OLGA_2007_PUBMED,
  figures: [
    {
      href: 'https://pubmed.ncbi.nlm.nih.gov/17452094/',
      hrefLabel: '2007 paper',
      figureKind: 'original',
      sourceShort: 'Rugge 2007',
      alt: 'OLGA staging system for gastritis',
      caption: 'Rugge M et al. OLGA staging for gastritis. Dig Liver Dis',
      source: 'Rugge M, Correa P, Di Mario F, et al. Dig Liver Dis. 2007.',
      pubmed: OLGA_2007_PUBMED,
      note: '原著。Elsevier / Digestive and Liver Disease の著作権。CC ではないので画像は埋め込まず、PubMed へリンクする。',
    },
  ],
  fields: [
    { id: 'antrum', label: '前庭部の萎縮', options: atrophyOptions },
    { id: 'corpus', label: '体部の萎縮', options: atrophyOptions },
  ],
  compute: computeOlga,
};
