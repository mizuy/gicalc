import { computeOlgim } from '../../lib/scores/olga';
import type { ScoreDefinition } from '../../types/score';

/** Capelle et al. Gastrointest Endosc 2010;71:1150-1158 */
export const OLGIM_2010_PUBMED = '20381801';

const imOptions = [
  { value: 0, label: 'なし（0）', description: '0' },
  { value: 1, label: '軽度（1）', description: 'mild' },
  { value: 2, label: '中等度（2）', description: 'moderate' },
  { value: 3, label: '高度（3）', description: 'severe' },
];

export const olgimScore: ScoreDefinition = {
  id: 'olgim',
  name: 'OLGIM（腸上皮化生の胃炎ステージ）',
  shortName: 'OLGIM',
  organ: 'stomach',
  category: 'gastritis',
  categoryLabel: '胃炎・胃癌リスク',
  description:
    '生検の腸上皮化生を前庭・体部で 0–3 に分け、OLGA と同じ交差表で Stage 0–IV を求めます。Stage III–IV は胃癌高リスクです。萎縮で staged するのは OLGA です。',
  reference: 'Capelle LG et al. Gastrointest Endosc 2010;71:1150-1158',
  pubmed: OLGIM_2010_PUBMED,
  figures: [
    {
      href: 'https://pubmed.ncbi.nlm.nih.gov/20381801/',
      hrefLabel: '2010 paper',
      figureKind: 'original',
      sourceShort: 'Capelle 2010',
      alt: 'OLGIM staging of gastritis using intestinal metaplasia',
      caption: 'Capelle LG et al. OLGIM staging. Gastrointest Endosc 2010',
      source:
        'Capelle LG, de Vries AC, Haringsma J, et al. The staging of gastritis with the OLGA system by using intestinal metaplasia as an accurate alternative for atrophic gastritis. Gastrointest Endosc. 2010;71:1150-1158.',
      doi: 'https://doi.org/10.1016/j.gie.2009.12.029',
      pubmed: OLGIM_2010_PUBMED,
      note: '原著。Elsevier / GIE の著作権。CC ではないので画像は埋め込まず、PubMed へリンクする。',
    },
  ],
  fields: [
    { id: 'antrum', label: '前庭部の腸上皮化生', options: imOptions },
    { id: 'corpus', label: '体部の腸上皮化生', options: imOptions },
  ],
  compute: computeOlgim,
};
