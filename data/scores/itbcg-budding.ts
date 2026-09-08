import type { ClassificationDefinition, ClassificationFigure } from '../../types/score';

/** Lugli A et al. Mod Pathol 2017 — ITBCC recommendations */
export const ITBCG_BUDDING_PUBMED = '26907552';
/** Zlobec 2021 Virchows Arch（PMID 33843013）。BD0–BD3 の H&E 参考図 */
export const ITBCC_ZLOBEC_2021_PUBMED = '33843013';

const ITBCC_ZLOBEC_FIGURE_URL =
  'https://pmc.ncbi.nlm.nih.gov/articles/PMC8724067/figure/Fig1/';

function zlobecCrop(grade: 'BD1' | 'BD2' | 'BD3', panel: string): ClassificationFigure {
  return {
    src: `/figures/itbcc-zlobec2021-${grade.toLowerCase()}.webp`,
    href: ITBCC_ZLOBEC_FIGURE_URL,
    hrefLabel: `Fig. 1, panel ${panel}`,
    isSecondarySource: true,
    alt: `Representative H&E image of ${grade} tumor budding in colorectal cancer`,
    caption: `Fig. 1, panel ${panel}. Representative ${grade} tumor budding (Zlobec et al. 2021)`,
    source:
      'Zlobec I, et al. Refining the ITBCC tumor budding scoring system with a “zero-budding” category in colorectal cancer. Virchows Arch. 2021;479:1085-1090. Fig. 1.',
    doi: 'https://doi.org/10.1007/s00428-021-03090-w',
    pubmed: ITBCC_ZLOBEC_2021_PUBMED,
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    note: `Lugli 2017 ITBCC 原著ではなく、Zlobec 2021 Fig. 1 のパネル ${panel} から ${grade} を切り抜いた H&E 参考図。CC BY 4.0。`,
    aspectRatio: 342 / 170,
  };
}

export const itbcgBuddingScore: ClassificationDefinition = {
  id: 'itbcg-budding',
  kind: 'classification',
  name: 'ITBCG 腫瘍芽（Tumor budding）',
  shortName: 'ITBCG Budding',
  organ: 'colorectum',
  category: 'classification',
  categoryLabel: '病理分類',
  description:
    '大腸癌の浸潤前沿における腫瘍芽を ITBCC（2016）基準で BD1–BD3 に分類します。1 視野 0.785 mm² のホットスポットで計数します。',
  originalLead:
    'The International Tumor Budding Consensus Conference (ITBCC) recommends reporting tumor budding in colorectal cancer on H&E-stained sections. A bud is defined as a single cell or a cluster of up to four cells. Count buds in one hotspot (0.785 mm²; 20× objective, field diameter 0.5 mm) at the invasive front. BD1 (low): 0–4 buds; BD2 (intermediate): 5–9 buds; BD3 (high): ≥10 buds. Selective reporting is recommended when the count is 0–4; mandatory reporting when ≥5 in many guidelines.',
  reference: 'Lugli A et al. Mod Pathol 2017;30:1299-1311 (ITBCC 2016)',
  referenceRole: 'original',
  pubmed: ITBCG_BUDDING_PUBMED,
  note: '計数部位は浸潤前沿（intratumoral budding は別概念）。T1 癌・早期癌でも予後・LNM 因子として報告。免疫染色は budding 計数には不要（H&E）。',
  figures: [
    {
      href: 'https://www.nature.com/articles/modpathol201746',
      hrefLabel: 'Mod Pathol 2017',
      alt: 'Recommendations for reporting tumor budding in colorectal cancer (ITBCC)',
      caption: 'Lugli A et al. Recommendations for reporting tumor budding in colorectal cancer. Mod Pathol 2017',
      source: 'Lugli A, Kirsch R, Ajioka Y, et al. Mod Pathol. 2017;30:1299-1311.',
      doi: 'https://doi.org/10.1038/modpathol.2017.46',
      pubmed: ITBCG_BUDDING_PUBMED,
      note: 'Elsevier / Nature 著作権。CC ではないので画像は埋め込まず、論文へリンクする。',
    },
    {
      href: ITBCC_ZLOBEC_FIGURE_URL,
      hrefLabel: 'Zlobec 2021 Fig. 1',
      isSecondarySource: true,
      alt: 'Representative H&E images of BD0, BD1, BD2, and BD3 tumor budding',
      caption: 'Fig. 1. Representative BD0–BD3 tumor budding (Zlobec et al. 2021)',
      source:
        'Zlobec I, et al. Refining the ITBCC tumor budding scoring system with a “zero-budding” category in colorectal cancer. Virchows Arch. 2021;479:1085-1090. Fig. 1.',
      doi: 'https://doi.org/10.1007/s00428-021-03090-w',
      pubmed: ITBCC_ZLOBEC_2021_PUBMED,
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      note: 'Lugli 2017 ITBCC 原著ではなく、BD0 を研究的に分離した Zlobec 2021 の複合図。複合図自体は埋め込まず、公式3段階の BD1–BD3 のみ分類カードに切り抜き掲載し、BD0 は掲載しない。CC BY 4.0。',
    },
  ],
  entries: [
    {
      label: 'BD1',
      meaning: 'Low budding (0–4 buds)',
      group: 'ITBCG',
      severity: 'none',
      rows: [
        { heading: 'Count', text: '0–4 buds in one hotspot (0.785 mm²) at the invasive front' },
        { heading: 'Reporting', text: 'Selective reporting acceptable in many protocols' },
        { heading: 'Prognosis', text: 'Favourable compared with BD2/BD3' },
      ],
      figures: [zlobecCrop('BD1', '2')],
    },
    {
      label: 'BD2',
      meaning: 'Intermediate budding (5–9 buds)',
      group: 'ITBCG',
      severity: 'moderate',
      rows: [
        { heading: 'Count', text: '5–9 buds in one hotspot at the invasive front' },
        { heading: 'Reporting', text: 'Mandatory reporting recommended (ITBCC)' },
        { heading: 'Prognosis', text: 'Intermediate adverse prognostic factor' },
      ],
      figures: [zlobecCrop('BD2', '3')],
    },
    {
      label: 'BD3',
      meaning: 'High budding (≥10 buds)',
      group: 'ITBCG',
      severity: 'severe',
      rows: [
        { heading: 'Count', text: '≥10 buds in one hotspot at the invasive front' },
        { heading: 'Reporting', text: 'Mandatory reporting recommended (ITBCC)' },
        { heading: 'Prognosis', text: 'High risk of LNM and poor outcome; may influence adjuvant therapy' },
      ],
      comment: 'T1 大腸癌では LNM リスク上昇と関連。Kajiwara nomogram とは別の病理因子。',
      figures: [zlobecCrop('BD3', '4')],
    },
    {
      label: 'Method',
      meaning: 'Counting method',
      group: 'ITBCG',
      severity: 'none',
      rows: [
        { heading: 'Bud', text: 'Single cell or cluster of ≤4 cells' },
        { heading: 'Hotspot', text: '0.785 mm² field at invasive front (20×, 0.5 mm diameter)' },
        { heading: 'Stain', text: 'H&E (ITBCC standard)' },
      ],
    },
  ],
};
