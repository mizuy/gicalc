import type { ClassificationDefinition } from '../../types/score';

/** Yamada T, Ichikawa H. Radiology 1974;110:79-83 */
export const YAMADA_1974_PUBMED = '4808543';

export const yamadaScore: ClassificationDefinition = {
  id: 'yamada',
  kind: 'classification',
  name: '山田分類（胃隆起性病変）',
  shortName: '山田',
  developedInJapan: true,
  originalLocale: 'ja',
  organ: 'stomach',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '胃の隆起性病変を、起始部の形態で I–IV 型に分ける肉眼分類です。組織型ではありません。Paris の 0-Ip / 0-Is / 0-IIa とは対応が厳密ではありません。',
  originalLead:
    '隆起性病変を起始部の形態で I–IV 型に分ける。I型：起始部がなだらかで境界が不明瞭。II型：境界は明瞭だがくびれを認めない。III型：くびれを認めるが茎はない。IV型：明らかな茎を有する。',
  citations: [
    {
      role: 'original',
      text: '山田達哉, 福富久之. 胃と腸 1966;1:145-150',
    },
    {
      role: 'related-study',
      text: 'Yamada T, Ichikawa H. Radiology 1974;110:79-83',
      pubmed: YAMADA_1974_PUBMED,
    },
  ],
  pubmed: YAMADA_1974_PUBMED,
  figures: [
    {
      href: 'https://pubmed.ncbi.nlm.nih.gov/4808543/',
      hrefLabel: '1974 paper',
      figureKind: 'original',
      sourceShort: 'Yamada 1974',
      alt: 'Yamada classification of elevated gastric lesions',
      caption: 'Yamada T, Ichikawa H. X-ray diagnosis of elevated lesions of the stomach. Radiology 1974',
      source: 'Yamada T, Ichikawa H. Radiology. 1974;110:79-83. Original types: 山田達哉, 福富久之. 胃と腸. 1966;1:145-150.',
      doi: 'https://doi.org/10.1148/110.1.79',
      pubmed: YAMADA_1974_PUBMED,
      note: '英語報告（Radiology 1974）。RSNA 著作権。1966 年『胃と腸』原著も CC ではない。画像は埋め込まず、PubMed へリンクする。',
    },
  ],
  entries: [
    {
      label: 'I型',
      meaning: 'Gently sloping base, indistinct border',
      group: '山田',
      severity: 'none',
      rows: [
        { heading: 'Base', text: 'Gently sloping; the border with surrounding mucosa is indistinct' },
        { heading: 'Stalk', text: 'No constriction and no stalk' },
      ],
    },
    {
      label: 'II型',
      meaning: 'Distinct border, no constriction',
      group: '山田',
      severity: 'mild',
      rows: [
        { heading: 'Base', text: 'Distinct border without constriction' },
        { heading: 'Stalk', text: 'None' },
      ],
    },
    {
      label: 'III型',
      meaning: 'Constriction without a stalk',
      group: '山田',
      severity: 'moderate',
      rows: [
        { heading: 'Base', text: 'Constriction is present' },
        { heading: 'Stalk', text: 'No definite stalk (subpedunculated)' },
      ],
      comment: 'Paris 0-Isp に近いことが多い。厳密な対応ではない。',
    },
    {
      label: 'IV型',
      meaning: 'Pedunculated',
      group: '山田',
      severity: 'moderate',
      rows: [
        { heading: 'Base', text: 'A definite stalk is present' },
        { heading: 'Stalk', text: 'Present (pedunculated)' },
      ],
      comment: 'Paris 0-Ip に近い。',
    },
    {
      label: '判定',
      meaning: 'Macroscopic type only',
      group: '注意',
      severity: 'none',
      rows: [
        {
          heading: 'Scope',
          text: 'Macroscopic classification by the base only. Histology and depth are not included',
        },
        {
          heading: 'Paris',
          text: '0-IIa often maps to I/II, 0-Is to II/III, and 0-Ip to IV, but the systems are not interchangeable',
        },
      ],
    },
  ],
};
