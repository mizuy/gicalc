import { computeKoyamaEt2 } from '../../lib/scores/koyama-et2';
import type { ScoreDefinition } from '../../types/score';

/** Koyama 2022 GIE（PMID 35271864）。T1b vs T2 の e-T2 Score */
export const KOYAMA_ET2_2022_PUBMED = '35271864';

export const koyamaEt2Score: ScoreDefinition = {
  id: 'koyama-et2',
  name: 'e-T2 Score（Koyama / 大腸 T1b vs T2）',
  shortName: 'e-T2',
  developedInJapan: true,
  toolKind: 'prediction',
  organ: 'colorectum',
  category: 't1-colorectal',
  categoryLabel: '大腸T1癌',
  description:
    '深在性 SM 浸潤（T1b、≥1000 μm）と T2（固有筋層浸潤）を内視鏡所見で鑑別する 0–11 点。Koyama 2022（GIE; 開発 411 例）の 5 因子スコア。≥7 点で T2 を疑う。',
  reference: 'Koyama Y et al. Gastrointest Endosc 2022;96:321-329.e2',
  pubmed: KOYAMA_ET2_2022_PUBMED,
  note:
    '白光とインジゴカルミン像を併用して評価。有茎性は対象外。襞集中は十分な送気・伸展下で腫瘍周囲の血管が描出できるまで観察し、≥4 本で「あり」とする。',
  figures: [
    {
      href: 'https://doi.org/10.1016/j.gie.2022.03.002',
      hrefLabel: 'GIE 2022 paper',
      figureKind: 'original',
      sourceShort: 'Koyama 2022',
      alt: 'Eight representative endoscopic findings for e-T2 Score (Koyama 2022 Fig. 2)',
      caption:
        'Fig. 2. Eight representative potential endoscopic findings of clinical submucosal invasion depth ≥1000 μm or muscularis propria invasive colorectal cancer (Koyama et al. Gastrointest Endosc 2022)',
      source:
        'Koyama Y, Yamada M, Makiguchi ME, et al. New scoring system to distinguish deep invasive submucosal and muscularis propria colorectal cancer during colonoscopy: a development and global multicenter external validation study (e-T2 Score). Gastrointest Endosc. 2022;96:321-329.e2. Fig. 2.',
      doi: 'https://doi.org/10.1016/j.gie.2022.03.002',
      pubmed: KOYAMA_ET2_2022_PUBMED,
      note: '原著 Fig. 2。Elsevier / GIE の著作権。CC ではないので画像は置かず、論文へリンクする。',
    },
  ],
  fields: [
    {
      id: 'deepDepression',
      label: 'Deep depression',
      description: '垂直方向に >3 mm の陥凹（評価者の目視）',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 1, label: 'あり', description: '+1点' },
      ],
    },
    {
      id: 'demarcatedDepression',
      label: 'Demarcated depressed area',
      description: '周囲に明瞭な境界をもつ陥凹',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 1, label: 'あり', description: '+2点' },
      ],
    },
    {
      id: 'foldConvergency',
      label: 'Fold convergency',
      description: '十分な送気・伸展下で腫瘍に向かう襞が ≥4 本',
      options: [
        { value: 0, label: 'なし（<4 本）', description: '0点' },
        { value: 1, label: 'あり（≥4 本）', description: '+2点' },
      ],
    },
    {
      id: 'erosionWhitePlaque',
      label: 'Erosion or white plaque',
      description: '洗浄しても容易に除去できない白色被覆',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 1, label: 'あり', description: '+3点' },
      ],
    },
    {
      id: 'borrmannType23',
      label: 'Borrmann type 2 or 3',
      description: 'Type 2: 境界明瞭な潰瘍性隆起。Type 3: 境界不明瞭な潰瘍性浸潤',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 1, label: 'あり', description: '+3点' },
      ],
    },
  ],
  compute: computeKoyamaEt2,
};
