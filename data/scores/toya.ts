import type { ClassificationDefinition, ClassificationFigure } from '../../types/score';

/** Toya 2020 Dig Endosc（PMID 31997426）。ME-CV アルゴリズム。Kikuchi 2014 は ME-NBI */
export const TOYA_2020_PUBMED = '31997426';
/** Kikuchi 2014 Dig Endosc（PMID 24750143）。SNADET の ME-NBI アルゴリズム */
export const KIKUCHI_2014_PUBMED = '24750143';
/** Kumei 2025 DEN Open（PMID 41090111）。Toya ME-CV の検証論文・Fig. 1 */
export const TOYA_KUMEI_2025_PUBMED = '41090111';

const TOYA_KUMEI_FIGURE_URL =
  'https://pmc.ncbi.nlm.nih.gov/articles/PMC12515707/figure/deo270223-fig-0001/';

function kumeiCrop(
  file: string,
  pattern: string,
  panel: string,
): ClassificationFigure {
  return {
    src: `/figures/toya-kumei2025-${file}.webp`,
    href: TOYA_KUMEI_FIGURE_URL,
    hrefLabel: `Fig. 1${panel}`,
    isSecondarySource: true,
    alt: `${pattern} pattern on magnifying endoscopy with crystal violet staining`,
    caption: `Fig. 1${panel}. ${pattern} pattern (Kumei et al. 2025)`,
    source:
      'Kumei T, Toya Y, Yamada S, et al. Diagnostic performance of magnifying endoscopy with crystal violet staining for superficial non-ampullary duodenal epithelial tumors. DEN Open. 2025;6:e70223. Fig. 1.',
    doi: 'https://doi.org/10.1002/deo2.70223',
    pubmed: TOYA_KUMEI_2025_PUBMED,
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    note: `Toya 2020 原著ではなく、検証論文 Fig. 1${panel} から ${pattern} を切り抜いた参考図。CC BY 4.0。`,
    aspectRatio: 301 / 261,
  };
}

export const toyaScore: ClassificationDefinition = {
  id: 'toya',
  kind: 'classification',
  name: 'Toya分類（SNADET・ME-CV）',
  shortName: 'Toya ME-CV',
  developedInJapan: true,
  toolKind: 'algorithm',
  organ: 'duodenum',
  category: 'classification',
  categoryLabel: 'SNADET',
  description:
    'SNADET のクリスタルバイオレット拡大（ME-CV）アルゴリズム（Toya 2020）。表面が単一（monotype）か複数（mixed）か、pinecone / irregular / monotonous で Vienna C3 と C4/5 を分ける。ME-NBI は Kikuchi 2014。',
  originalLead:
    'Surface features of non-ampullary duodenal epithelial tumors under magnifying endoscopy with crystal violet staining (ME-CV) are classified as convoluted, leaf-like, reticular/sulciolar, or pinecone. Lesions displaying a single surface pattern are monotype; those displaying multiple surface patterns are mixed type (multiplicity). Monotypes with a pinecone pattern, monotypes with an irregular pattern, and mixed-type (multiple) surface patterns are classified as Vienna category 4/5. Except for the pinecone pattern, monotypes with a regular (monotonous) pattern are classified as category 3.',
  citations: [
    {
      role: 'original',
      text: 'Toya Y et al. Dig Endosc 2020;32:1066-1073',
      pubmed: TOYA_2020_PUBMED,
    },
    {
      role: 'review',
      text: 'Kikuchi D et al. Dig Endosc 2014;26:16-22 (ME-NBI)',
      pubmed: KIKUCHI_2014_PUBMED,
    },
  ],
  pubmed: TOYA_2020_PUBMED,
  note: 'Toya 原著のアルゴリズムは ME-CV（クリスタルバイオレット拡大）であり、ME-NBI ではない。WOS で血管が見えにくい十二指腸では表面構造を重視する。',
  implementationNote: 'ME-NBIのKikuchi 2014への導線は関連ツールに表示する。',
  figures: [
    {
      href: 'https://onlinelibrary.wiley.com/doi/10.1111/den.13640',
      hrefLabel: 'Toya 2020',
      alt: 'Toya ME-CV diagnostic algorithm for SNADET',
      caption: 'Toya Y et al. Diagnostic algorithm of ME-CV for NADETs. Dig Endosc 2020',
      source: 'Toya Y, Endo M, Oizumi T, et al. Dig Endosc. 2020;32:1066-1073.',
      doi: 'https://doi.org/10.1111/den.13640',
      pubmed: TOYA_2020_PUBMED,
      note: 'ME-CV アルゴリズム原著。Wiley / Digestive Endoscopy の著作権。CC ではないので埋め込まず、論文へリンクする。',
    },
    {
      href: 'https://onlinelibrary.wiley.com/doi/10.1111/den.12282',
      hrefLabel: 'Kikuchi 2014',
      alt: 'Kikuchi ME-NBI diagnostic algorithm for SNADET',
      caption: 'Kikuchi D et al. Diagnostic algorithm of ME-NBI for SNADET. Dig Endosc 2014',
      source: 'Kikuchi D, Hoteya S, Iizuka T, Kimura R, Kaise M. Dig Endosc. 2014;26:16-22.',
      doi: 'https://doi.org/10.1111/den.12282',
      pubmed: KIKUCHI_2014_PUBMED,
      note: 'ME-NBI アルゴリズム。mixed type と unclassified 血管は C4/5。CC ではないので埋め込まず、論文へリンクする。',
    },
    {
      href: TOYA_KUMEI_FIGURE_URL,
      hrefLabel: 'Kumei 2025 Fig. 1',
      isSecondarySource: true,
      alt: 'Convoluted, leaf-like, reticular or sulciolar, and pinecone ME-CV patterns',
      caption: 'Fig. 1. Four ME-CV surface patterns (Kumei et al. 2025)',
      source:
        'Kumei T, Toya Y, Yamada S, et al. Diagnostic performance of magnifying endoscopy with crystal violet staining for superficial non-ampullary duodenal epithelial tumors. DEN Open. 2025;6:e70223. Fig. 1.',
      doi: 'https://doi.org/10.1002/deo2.70223',
      pubmed: TOYA_KUMEI_2025_PUBMED,
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      note: 'Toya 2020 原著ではなく、検証論文の複合図。複合図自体は埋め込まず、各パターンの切り抜きを分類カードに掲載。CC BY 4.0。',
    },
  ],
  entries: [
    {
      label: 'Monotype',
      meaning: 'Single surface pattern',
      group: '表面',
      severity: 'none',
      rows: [
        {
          heading: 'Definition',
          text: 'Lesions displaying a single surface pattern',
        },
        {
          heading: 'Patterns',
          text: 'Convoluted, leaf-like, reticular/sulciolar, or pinecone',
        },
      ],
    },
    {
      label: 'Mixed type',
      meaning: 'Multiple surface patterns',
      group: '表面',
      severity: 'severe',
      rows: [
        {
          heading: 'Definition',
          text: 'Lesions displaying multiple surface patterns (multiplicity)',
        },
        { heading: 'Vienna', text: 'Category 4/5' },
      ],
      comment: '複数パターン混在は C4/5。',
    },
    {
      label: 'Pinecone',
      meaning: 'Pinecone monotype',
      group: '判定',
      severity: 'severe',
      rows: [
        { heading: 'Surface', text: 'Pinecone pattern as a single surface type' },
        { heading: 'Vienna', text: 'Category 4/5' },
      ],
      comment: '松ぼっくり様は単一でも C4/5。',
      figures: [kumeiCrop('pinecone', 'Pinecone', 'd')],
    },
    {
      label: 'Irregular',
      meaning: 'Irregular monotype',
      group: '判定',
      severity: 'severe',
      rows: [
        { heading: 'Surface', text: 'Irregular monotype surface pattern' },
        { heading: 'Vienna', text: 'Category 4/5' },
      ],
    },
    {
      label: 'Monotonous',
      meaning: 'Regular monotype (not pinecone)',
      group: '判定',
      severity: 'mild',
      rows: [
        {
          heading: 'Surface',
          text: 'Regular monotonous monotype except pinecone (convoluted, leaf-like, or reticular/sulciolar)',
        },
        { heading: 'Vienna', text: 'Category 3' },
      ],
      comment: 'pinecone 以外の整った単一パターンは C3。',
      figures: [
        kumeiCrop('convoluted', 'Convoluted', 'a'),
        kumeiCrop('leaf-like', 'Leaf-like', 'b'),
        kumeiCrop('reticular', 'Reticular/sulciolar', 'c'),
      ],
    },
  ],
  flow: {
    title: 'アルゴリズム',
    start: 'type',
    steps: {
      type: {
        id: 'type',
        prompt: '表面構造は単一ですか、複数ですか',
        hint: 'ME-CV。単一 = monotype。複数 = mixed / multiplicity。',
        options: [
          { id: 'mixed', label: '複数（mixed）', next: 'c45-mixed' },
          { id: 'mono', label: '単一（monotype）', next: 'pattern' },
        ],
      },
      pattern: {
        id: 'pattern',
        prompt: '単一パターンの種類はどれですか',
        hint: 'pinecone または不整は C4/5。それ以外の整った単一（convoluted / leaf-like / reticular）は C3。',
        options: [
          { id: 'pinecone', label: 'Pinecone', next: 'c45-pine' },
          { id: 'irregular', label: 'Irregular', next: 'c45-irr' },
          { id: 'monotonous', label: 'Monotonous（整）', next: 'c3' },
        ],
      },
    },
    results: {
      'c45-mixed': { id: 'c45-mixed', entryLabel: 'Mixed type' },
      'c45-pine': { id: 'c45-pine', entryLabel: 'Pinecone' },
      'c45-irr': { id: 'c45-irr', entryLabel: 'Irregular' },
      c3: { id: 'c3', entryLabel: 'Monotonous' },
    },
    map: {
      id: 'start',
      label: 'SNADET · ME-CV',
      children: [
        {
          id: 'type-gate',
          label: 'Surface type',
          stepId: 'type',
          children: [
            {
              id: 'mixed',
              label: 'Mixed',
              stepId: 'type',
              optionId: 'mixed',
              children: [{ id: 'c45-mixed', label: 'C4/5', resultId: 'c45-mixed' }],
            },
            {
              id: 'mono',
              label: 'Monotype',
              stepId: 'type',
              optionId: 'mono',
              children: [
                {
                  id: 'pattern-gate',
                  label: 'Pattern',
                  stepId: 'pattern',
                  children: [
                    {
                      id: 'pine-opt',
                      label: 'Pinecone',
                      stepId: 'pattern',
                      optionId: 'pinecone',
                      children: [{ id: 'c45-pine', label: 'C4/5', resultId: 'c45-pine' }],
                    },
                    {
                      id: 'irr-opt',
                      label: 'Irregular',
                      stepId: 'pattern',
                      optionId: 'irregular',
                      children: [{ id: 'c45-irr', label: 'C4/5', resultId: 'c45-irr' }],
                    },
                    {
                      id: 'mono-opt',
                      label: 'Monotonous',
                      stepId: 'pattern',
                      optionId: 'monotonous',
                      children: [{ id: 'c3', label: 'C3', resultId: 'c3' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
