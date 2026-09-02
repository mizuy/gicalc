import type { ClassificationDefinition } from '../../types/score';

/** Kudo / Lambert 2008 GIE supplement（PMID 18805238） */
export const LST_2008_PUBMED = '18805238';

export const lstScore: ClassificationDefinition = {
  id: 'lst',
  kind: 'classification',
  name: 'LST分類（側方発育型腫瘍）',
  shortName: 'LST',
  organ: 'colorectum',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '大腸の側方発育型腫瘍（laterally spreading tumor）。非ポリープ型で長径 10 mm 以上、壁に沿って横に広がる。顆粒型（均一 / 結節混在）と非顆粒型（平坦隆起 / 偽陥凹）の4型。Paris 分類とは別の分類です。',
  originalLead:
    'Laterally spreading tumors (LSTs) are nonpolypoid neoplastic lesions of the colorectal mucosa that extend laterally and circumferentially along the colonic wall rather than vertically, and are at least 10 mm in diameter. LSTs are classified into a granular type (homogeneous or nodular mixed) and a nongranular type (flat elevated or pseudodepressed). Pure sessile lesions (Paris 0-Is) are not classified as LST.',
  reference: 'Kudo S, Lambert R, Allen JI, et al. Gastrointest Endosc 2008;68:S3-S47',
  pubmed: LST_2008_PUBMED,
  figures: [
    {
      src: '/figures/lst-ce2025-fig3.jpg',
      alt: 'LST classification: granular homogeneous, granular mixed nodular, nongranular flat, nongranular pseudodepressed',
      caption: 'Fig. 3. Laterally spreading tumor (LST) classification',
      source:
        'Kim OZ. Classification of image-enhanced endoscopy in colon tumors. Clin Endosc. 2025;58:337-351, Fig. 3 (adapted from Castillo-Regalado E, Uchima H. World J Gastrointest Endosc. 2022;14:113-128). LST term and four subtypes: Kudo S, Lambert R, Allen JI, et al. Nonpolypoid neoplastic lesions of the colorectal mucosa. Gastrointest Endosc. 2008;68:S3-S47.',
      doi: 'https://doi.org/10.5946/ce.2024.263',
      pubmed: '40336268',
      note: '4亜型と深部SM浸潤率（Bogie 2018 メタ解析）。図は Clin Endosc 2025 Fig. 3（Castillo-Regalado 2022 より、CC）。',
      aspectRatio: 774 / 882,
    },
  ],
  entries: [
    {
      label: 'LST-G homogeneous',
      meaning: 'Granular, even granules',
      group: '顆粒型',
      severity: 'none',
      rows: [
        { heading: 'Surface', text: 'Granular type with granules of similar size and shape' },
        { heading: 'Paris', text: 'Usually 0-IIa' },
        { heading: 'Size', text: 'Nonpolypoid; diameter at least 10 mm; lateral spread along the wall' },
      ],
      comment: '深部SM浸潤は低い。図の 0.5%（CI 0.1–1.0%）は Bogie 2018 のメタ解析。',
    },
    {
      label: 'LST-G mixed nodular',
      meaning: 'Granular + large nodule(s)',
      group: '顆粒型',
      severity: 'moderate',
      rows: [
        {
          heading: 'Surface',
          text: 'Granular type with one or more large nodules on a bed of granules',
        },
        { heading: 'Paris', text: 'Usually 0-IIa+Is or 0-Is+IIa' },
        { heading: 'Size', text: 'Nonpolypoid; diameter at least 10 mm; lateral spread along the wall' },
      ],
      comment: '大きい結節に浸潤が寄りやすい。図の 10.5%（CI 5.9–15.1%）は Bogie 2018。',
    },
    {
      label: 'LST-NG flat elevated',
      meaning: 'Smooth, no granules',
      group: '非顆粒型',
      severity: 'moderate',
      rows: [
        { heading: 'Surface', text: 'Nongranular type with a flat, smooth surface and no granules' },
        { heading: 'Paris', text: 'Usually 0-IIa' },
        { heading: 'Size', text: 'Nonpolypoid; diameter at least 10 mm; lateral spread along the wall' },
      ],
      comment: '図の 4.9%（CI 2.1–7.8%）は Bogie 2018。',
    },
    {
      label: 'LST-NG pseudodepressed',
      meaning: 'Basin-like depression',
      group: '非顆粒型',
      severity: 'severe',
      rows: [
        {
          heading: 'Surface',
          text: 'Nongranular type with a poorly delineated, basin-like depression in the tumor center',
        },
        { heading: 'Paris', text: 'Usually 0-IIa+IIc or 0-IIc+IIa' },
        { heading: 'Size', text: 'Nonpolypoid; diameter at least 10 mm; lateral spread along the wall' },
      ],
      comment: '4型のうち浸潤リスクが最も高い。図の 31.6%（CI 19.8–43.4%）は Bogie 2018。一括切除を検討する。',
    },
  ],
};
