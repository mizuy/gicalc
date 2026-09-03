import { computeKakushima } from '../../lib/scores/kakushima';
import type { ScoreDefinition } from '../../types/score';

/** Kakushima 2017 Endosc Int Open（PMID 28791326）。SNADET LGA vs HGA/癌。CC BY-NC-ND 4.0 */
export const KAKUSHIMA_2017_PUBMED = '28791326';

export const kakushimaScore: ScoreDefinition = {
  id: 'kakushima',
  name: 'Kakushima WLIスコア（SNADET LGA vs HGA/癌）',
  shortName: 'Kakushima WLI',
  developedInJapan: true,
  toolKind: 'prediction',
  organ: 'duodenum',
  category: 'classification',
  categoryLabel: 'SNADET',
  description:
    'SNADET を白光（±インジゴカルミン）だけで Vienna C3 と C4 以上に分ける 0–5 点。径・色調・肉眼型・結節。≥3 点で C4 以上。Ishii（NBI 拡大あり）とは別。',
  reference: 'Kakushima N et al. Endosc Int Open 2017;5:E763-E768',
  pubmed: KAKUSHIMA_2017_PUBMED,
  license: 'CC BY-NC-ND 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
  note: '混在色調は高い点を採用。生検による発赤・陥凹は過大評価しうる。検証コホート正診率 86%。',
  figures: [
    {
      href: 'https://www.thieme-connect.com/products/ejournals/html/10.1055/s-0043-113567#table-2',
      hrefLabel: 'Table 2',
      alt: 'Kakushima WLI scoring system for VCL3 vs VCL4 or higher (Table 2)',
      caption: 'Table 2. Scoring system for VCL3 and VCL4 or higher',
      source:
        'Kakushima N, Yoshida M, Iwai T, et al. A simple endoscopic scoring system to differentiate between duodenal adenoma and carcinoma. Endosc Int Open. 2017;5:E763-E768. Table 2.',
      doi: 'https://doi.org/10.1055/s-0043-113567',
      pubmed: KAKUSHIMA_2017_PUBMED,
      license: 'CC BY-NC-ND 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
      note: 'Thieme Endoscopy International Open。表は HTML なので埋め込まず Table 2 へリンクする。ライセンスは CC BY-NC-ND 4.0。',
    },
  ],
  fields: [
    {
      id: 'diameter',
      label: '腫瘍径',
      options: [
        { value: 0, label: '<10 mm', description: '0点' },
        { value: 1, label: '≥10 mm', description: '+1点' },
      ],
    },
    {
      id: 'color',
      label: '色調',
      description: '混在するときは高い点',
      options: [
        { value: 0, label: '白色', description: '0点' },
        { value: 1, label: '同色', description: '+1点' },
        { value: 2, label: '発赤', description: '+2点' },
      ],
    },
    {
      id: 'macro',
      label: '肉眼型',
      options: [
        { value: 0, label: 'Is / Ip / IIa（陥凹なし）', description: '0点' },
        { value: 1, label: '陥凹あり、または混在型', description: '+1点' },
      ],
    },
    {
      id: 'nodularity',
      label: '結節',
      options: [
        { value: 0, label: '均一', description: '0点' },
        { value: 1, label: '不均一またはなし', description: '+1点' },
      ],
    },
  ],
  compute: computeKakushima,
};
