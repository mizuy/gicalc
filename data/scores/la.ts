import type { ClassificationDefinition, ClassificationFigure } from '../../types/score';

/** Lundell 1999 Gut（PMID 10403727）。1994 提案、1999 が確定稿。 */
export const LA_1999_PUBMED = '10403727';
/** Jung 2025 KJHUGR（PMID 40550541）。CC BY-NC 4.0 の A–D 画像。 */
export const LA_JUNG_2025_PUBMED = '40550541';

const JUNG_SOURCE =
  'Jung K. Reflux Esophagitis. Korean J Helicobacter Up Gastrointest Res. 2025;25:98-107. Fig. 1. Original definitions: Lundell LR, Dent J, Bennett JR, et al. Gut. 1999;45:172-180.';
const JUNG_DOI = 'https://doi.org/10.7704/kjhugr.2025.0001';

function jungCrop(figure: {
  src: string;
  alt: string;
  caption: string;
  note: string;
  aspectRatio: number;
}): ClassificationFigure {
  return {
    ...figure,
    figureKind: 'secondary',
    sourceShort: 'Jung 2025',
    source: JUNG_SOURCE,
    doi: JUNG_DOI,
    pubmed: LA_JUNG_2025_PUBMED,
    license: 'CC BY-NC 4.0',
  };
}

export const laScore: ClassificationDefinition = {
  id: 'la',
  kind: 'classification',
  name: 'Los Angeles分類（逆流性食道炎）',
  shortName: 'GERD LA',
  organ: 'esophagus',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '逆流性食道炎の粘膜破綻（mucosal break）の広がりで Grade A–D。いわゆる minimal change は含めない。',
  originalLead:
    'The extent of mucosal breaks due to erosive or ulcerative esophagitis is the sole determinant of each of the four severity grades. Grade A: one (or more) mucosal break no longer than 5 mm that does not extend between the tops of two mucosal folds. Grade B: one (or more) mucosal break more than 5 mm long that does not extend between the tops of two mucosal folds. Grade C: one (or more) mucosal break that is continuous between the tops of two or more mucosal folds but which involves less than 75% of the circumference. Grade D: one (or more) mucosal break which involves at least 75% of the esophageal circumference. So-called “minimal changes” are not included because endoscopists are unable to recognise these changes with acceptable agreement.',
  reference: 'Lundell LR et al. Gut 1999;45:172-180',
  pubmed: LA_1999_PUBMED,
  figures: [
    {
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12173581/figure/f1-kjhugr-2025-0001/',
      hrefLabel: 'Fig. 1',
      figureKind: 'secondary',
      sourceShort: 'Jung 2025',
      alt: 'Los Angeles classification Grade A–D endoscopic examples (Jung 2025 Fig. 1)',
      caption: 'Fig. 1 A–D. Endoscopic findings of reflux esophagitis',
      source: JUNG_SOURCE,
      doi: JUNG_DOI,
      pubmed: LA_JUNG_2025_PUBMED,
      license: 'CC BY-NC 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc/4.0/',
      note: '各 Grade カードに Fig. 1 A–D の切り抜きを掲載。原図は埋め込まず PMC の Fig. 1 へリンクする。ライセンスは CC BY-NC 4.0。E（消化性狭窄）と F（Barrett 食道）は使用しない。Lundell 1999 Gut 原著は CC ではない。',
    },
  ],
  entries: [
    {
      label: 'Grade A',
      meaning: 'Mucosal break ≤5 mm, not bridging folds',
      group: '軽症',
      severity: 'mild',
      figures: [
        jungCrop({
          src: '/figures/la-jung2025-grade-a.webp',
          alt: 'Los Angeles Grade A reflux esophagitis (Jung 2025 Fig. 1A)',
          caption: 'Fig. 1A LA Grade A',
          note: 'Jung 2025 Fig. 1A（LA Grade A）から切り抜き。ライセンスは CC BY-NC 4.0。',
          aspectRatio: 244 / 220,
        }),
      ],
      rows: [
        {
          heading: 'Definition',
          text: 'One (or more) mucosal break no longer than 5 mm that does not extend between the tops of two mucosal folds',
        },
      ],
    },
    {
      label: 'Grade B',
      meaning: 'Mucosal break >5 mm, not bridging folds',
      group: '軽症',
      severity: 'mild',
      figures: [
        jungCrop({
          src: '/figures/la-jung2025-grade-b.webp',
          alt: 'Los Angeles Grade B reflux esophagitis (Jung 2025 Fig. 1B)',
          caption: 'Fig. 1B LA Grade B',
          note: 'Jung 2025 Fig. 1B（LA Grade B）から切り抜き。ライセンスは CC BY-NC 4.0。',
          aspectRatio: 244 / 220,
        }),
      ],
      rows: [
        {
          heading: 'Definition',
          text: 'One (or more) mucosal break more than 5 mm long that does not extend between the tops of two mucosal folds',
        },
      ],
    },
    {
      label: 'Grade C',
      meaning: 'Breaks bridging folds, <75% circumference',
      group: '重症',
      severity: 'moderate',
      figures: [
        jungCrop({
          src: '/figures/la-jung2025-grade-c.webp',
          alt: 'Los Angeles Grade C reflux esophagitis (Jung 2025 Fig. 1C)',
          caption: 'Fig. 1C LA Grade C',
          note: 'Jung 2025 Fig. 1C（LA Grade C）から切り抜き。ライセンスは CC BY-NC 4.0。',
          aspectRatio: 243 / 220,
        }),
      ],
      rows: [
        {
          heading: 'Definition',
          text: 'One (or more) mucosal break that is continuous between the tops of two or more mucosal folds but which involves less than 75% of the circumference',
        },
      ],
      comment: '多くのガイドラインで A/B を軽症、C/D を重症とする。',
    },
    {
      label: 'Grade D',
      meaning: 'Breaks involving ≥75% circumference',
      group: '重症',
      severity: 'severe',
      figures: [
        jungCrop({
          src: '/figures/la-jung2025-grade-d.webp',
          alt: 'Los Angeles Grade D reflux esophagitis (Jung 2025 Fig. 1D)',
          caption: 'Fig. 1D LA Grade D',
          note: 'Jung 2025 Fig. 1D（LA Grade D）から切り抜き。ライセンスは CC BY-NC 4.0。',
          aspectRatio: 244 / 220,
        }),
      ],
      rows: [
        {
          heading: 'Definition',
          text: 'One (or more) mucosal break which involves at least 75% of the esophageal circumference',
        },
      ],
    },
  ],
};
