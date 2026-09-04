import { computeBbps } from '../../lib/scores/bbps';
import type { ScoreDefinition } from '../../types/score';

/** Lai 2009 GIE（PMID 19136102）。BBPS 原著。 */
export const BBPS_2009_PUBMED = '19136102';
/** Kim 2024 Sci Rep（PMID 38238553）。BBPS 0–3 の CC 図例。 */
export const BBPS_SCIREP_2024_PUBMED = '38238553';

const segmentOptions = [
  { value: 0, label: '0', description: '固形便で粘膜が見えない' },
  { value: 1, label: '1', description: '一部の粘膜のみ。残渣・混濁液で隠れる' },
  { value: 2, label: '2', description: '少量の残渣・小片・混濁液。粘膜はよく見える' },
  { value: 3, label: '3', description: '残渣なし。区域全体の粘膜が見える' },
];

export const bbpsScore: ScoreDefinition = {
  id: 'bbps',
  name: 'Boston Bowel Preparation Scale（BBPS）',
  shortName: 'BBPS',
  organ: 'colorectum',
  category: 'prep',
  categoryLabel: '腸管前処置',
  description:
    '大腸内視鏡の前処置を3区域（0–3点、合計0–9）で評価します。洗浄・吸引後の抜去時に付けます。',
  reference: 'Lai EJ et al. Gastrointest Endosc 2009;69:620-625',
  pubmed: BBPS_2009_PUBMED,
  figures: [
    {
      src: '/figures/bbps-scirep2024-fig1.png',
      alt: 'Boston Bowel Preparation Scale segment scores 0 through 3 (Kim 2024 Fig. 1)',
      caption: 'Fig. 1. Examples of the BBPS (segment scores 0–3)',
      source:
        'Kim J, Choi JM, Lee J, et al. Boston bowel preparation scale score 6 has more missed lesions compared with 7–9. Sci Rep. 2024;14:1605. Fig. 1. Scale: Lai EJ, Calderwood AH, Doros G, et al. Gastrointest Endosc. 2009;69:620-625.',
      doi: 'https://doi.org/10.1038/s41598-024-52244-8',
      pubmed: BBPS_SCIREP_2024_PUBMED,
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      note: 'Kim 2024 Sci Rep Fig. 1（CC BY 4.0）。区域スコア 0–3 の例。洗浄・吸引後に評価。Lai 2009 原著 Fig. 1 は Elsevier 著作権のため未掲載。',
      aspectRatio: 590 / 517,
    },
  ],
  fields: [
    {
      id: 'right',
      label: '右側結腸',
      description: '盲腸・上行結腸',
      options: segmentOptions,
    },
    {
      id: 'transverse',
      label: '横行結腸',
      description: '肝弯曲・脾弯曲を含む',
      options: segmentOptions,
    },
    {
      id: 'left',
      label: '左側結腸',
      description: '下行結腸・S状結腸・直腸',
      options: segmentOptions,
    },
  ],
  compute: computeBbps,
};
