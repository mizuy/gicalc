import { computeIshii } from '../../lib/scores/ishii';
import type { ScoreDefinition } from '../../types/score';

/** Ishii 2021 Dig Endosc（PMID 32506480）。SNADET C3 vs C4/5 */
export const ISHII_2021_PUBMED = '32506480';

export const ishiiScore: ScoreDefinition = {
  id: 'ishii',
  name: 'Ishiiスコア（SNADET C3 vs C4/5）',
  shortName: 'Ishii',
  developedInJapan: true,
  toolKind: 'prediction',
  organ: 'duodenum',
  category: 'classification',
  categoryLabel: 'SNADET',
  description:
    '表在型非乳頭部十二指腸上皮性腫瘍（SNADET）で Vienna C3（LGA）と C4/5（HGA/癌）を分ける 0–5 点。色調・径は白光、表面・血管は NBI 拡大。≥3 点で C4/5。',
  reference: 'Ishii R et al. Dig Endosc 2021;33:399-407',
  pubmed: ISHII_2021_PUBMED,
  note: 'Kakushima WLI スコア（白光のみ）とは別。導出は単施設後ろ向き。生検前の光学診断用。',
  figures: [
    {
      href: 'https://onlinelibrary.wiley.com/doi/10.1111/den.13762',
      hrefLabel: '2021 paper',
      alt: 'Ishii simple scoring system for SNADET C3 vs C4/5',
      caption: 'Ishii R et al. Simple scoring system for the diagnosis of SNADETs. Dig Endosc 2021',
      source: 'Ishii R, Ohata K, Takayanagi S, et al. Dig Endosc. 2021;33:399-407.',
      doi: 'https://doi.org/10.1111/den.13762',
      pubmed: ISHII_2021_PUBMED,
      note: '原著。Wiley / Digestive Endoscopy の著作権。CC ではないので論文へリンクする。',
    },
  ],
  fields: [
    {
      id: 'color',
      label: '色調（白光）',
      options: [
        { value: 0, label: '白色 / 同色', description: '0点' },
        { value: 1, label: '発赤', description: '+1点' },
      ],
    },
    {
      id: 'size',
      label: '腫瘍径',
      options: [
        { value: 0, label: '<10 mm', description: '0点' },
        { value: 1, label: '10–19 mm', description: '+1点' },
        { value: 2, label: '≥20 mm', description: '+2点' },
      ],
    },
    {
      id: 'surface',
      label: '表面構造不整（NBI 拡大）',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 1, label: 'あり', description: '+1点' },
      ],
    },
    {
      id: 'vessels',
      label: '異常血管（NBI 拡大）',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 1, label: 'あり', description: '+1点' },
      ],
    },
  ],
  compute: computeIshii,
};
