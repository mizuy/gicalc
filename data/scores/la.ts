import type { ClassificationDefinition } from '../../types/score';

/** Lundell 1999 Gut（PMID 10403727）。1994 提案、1999 が確定稿。 */
export const LA_1999_PUBMED = '10403727';

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
      href: 'https://www.videogie.org/article/S2212-0971(13)70046-3/fulltext',
      hrefLabel: 'VideoGIE',
      alt: 'Video demonstration of Los Angeles classification grades A–D',
      caption: 'Video encyclopedia of the Los Angeles classification of GERD (Sami & Ragunath 2013)',
      source:
        'Sami SS, Ragunath K. The Los Angeles Classification of Gastroesophageal Reflux Disease. Video Journal and Encyclopedia of GI Endoscopy. 2013;1:103-104. Original definitions: Lundell LR, Dent J, Bennett JR, et al. Endoscopic assessment of oesophagitis: clinical and functional correlates and further validation of the Los Angeles classification. Gut. 1999;45:172-180.',
      doi: 'https://doi.org/10.1016/S2212-0971(13)70046-3',
      note: 'VideoGIE 2013 は CC BY-NC-ND 4.0 の動画。A–D が揃った教科書用の静止画パネルは CC で確認できなかったので画像は置かず、動画記事へリンクする。Lundell 1999 Gut 原著は CC ではない。',
    },
  ],
  entries: [
    {
      label: 'Grade A',
      meaning: 'Mucosal break ≤5 mm, not bridging folds',
      group: '軽症',
      severity: 'mild',
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
      rows: [
        {
          heading: 'Definition',
          text: 'One (or more) mucosal break which involves at least 75% of the esophageal circumference',
        },
      ],
    },
  ],
};
