import type { ClassificationDefinition } from '../../types/score';

/** Tajiri 2010 Dig Endosc（PMID 20078657）。日本門脈圧亢進症学会 記載基準 第2版 */
export const JSPH_VARICES_2010_PUBMED = '20078657';
/** Nagashima 2022 Healthcare Fig. 2（PMID 35885720）。RC の実例。CC BY 4.0 */
export const NAGASHIMA_2022_PUBMED = '35885720';

export const jsphVaricesScore: ClassificationDefinition = {
  id: 'jsph-varices',
  kind: 'classification',
  name: '食道胃静脈瘤（記載基準）',
  shortName: 'JSPH varices',
  developedInJapan: true,
  organ: 'esophagus',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '日本門脈圧亢進症学会の食道・胃静脈瘤内視鏡所見記載基準。部位（L / Lg）、形態（F）、色調（C）、発赤所見（RC）の順で書く。胃の国際分類は Sarin（GOV / IGV）を別ページに置いた。',
  originalLead:
    'The revised rules comprise six main categories: location (L), form (F), color (C), red color signs (RC), bleeding signs, and mucosal findings. In principle, the endoscopic diagnosis is based on endoscopic findings assessed with the naked eye. The esophagus is divided into three portions: Ls (locus superior), Lm (locus medialis), and Li (locus inferior). Gastric varices are listed separately as Lg-c (cardiac), Lg-cf (cardiofornical), and Lg-f (fundal). Form: F0 lesions lack a varicose appearance (used after treatment, even if red or blue veins remain); F1 lesions are straight, small-caliber varices (small venous dilatations that disappear on insufflation are not included); F2 lesions are moderately enlarged, beady varices; F3 lesions are markedly enlarged, nodular or tumor-shaped varices. Color: Cw (white) varices look like large folds of the esophageal mucosa; Cb (blue) varices are bluish or cyanotic and the covering mucosa appears thin. Red color signs are reddish changes immediately beneath the submucosa and are classified as red wale markings (RWM), cherry-red spots (CRS), and hematocystic spots (HCS). RC0 is absent; RC1 is small in number and localized; RC2 is intermediate; RC3 is large in number and circumferential.',
  reference: 'Tajiri T et al. Dig Endosc 2010;22:1-9',
  pubmed: JSPH_VARICES_2010_PUBMED,
  officialUrl: 'https://www.jsge.or.jp/committees/guideline/guideline/lc.html',
  officialLinkLabel: '肝硬変診療ガイドライン2020（食道・胃静脈瘤）',
  note: '1980年提案、1991年改訂、2010年第2版（英語）。現行の『門脈圧亢進症取扱い規約』も同じ軸。記載順は L, F, C, RC, 出血兆候, 粘膜所見。胃静脈瘤の国際分類は Sarin。欧米の small / large はおおよそ F1 と F2/F3。',
  figures: [
    {
      src: '/figures/varices-nagashima2022-fig2.jpg',
      alt: 'Red color signs on esophageal varices: cherry-red spot, red wale marking, and hematocystic spot (Nagashima 2022 Fig. 2)',
      caption: 'Fig. 2. RC findings in esophageal varices (A CRS and RWM; B HCS)',
      source:
        'Nagashima K, Irisawa A, Kashima K, et al. The risk of bleeding in small/straight esophageal varices with red color sign on endoscopy: a retrospective analysis from the natural course. Healthcare. 2022;10:1193. Fig. 2. Classification: Tajiri T, Yoshida H, Obara K, et al. General rules for recording endoscopic findings of esophagogastric varices (2nd edition). Dig Endosc. 2010;22:1-9.',
      doi: 'https://doi.org/10.3390/healthcare10071193',
      pubmed: NAGASHIMA_2022_PUBMED,
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      note: 'Nagashima 2022 Fig. 2（A は CRS と RWM、B は HCS）。MDPI Healthcare。ライセンスは CC BY 4.0。Tajiri 2010 Dig Endosc の原図は CC ではない。',
      aspectRatio: 2529 / 1194,
    },
    {
      href: 'https://onlinelibrary.wiley.com/doi/10.1111/j.1443-1661.2009.00929.x',
      hrefLabel: '2010 paper',
      alt: 'Tajiri 2010 general rules for recording endoscopic findings of esophagogastric varices',
      caption:
        'Tajiri T et al. General rules for recording endoscopic findings of esophagogastric varices (2nd edition). Dig Endosc 2010',
      source: 'Tajiri T, Yoshida H, Obara K, et al. Dig Endosc. 2010;22:1-9.',
      doi: 'https://doi.org/10.1111/j.1443-1661.2009.00929.x',
      pubmed: JSPH_VARICES_2010_PUBMED,
      note: '記載基準第2版の原著。Wiley / Digestive Endoscopy の著作権。CC ではないので画像は置かず、論文へリンクする。',
    },
  ],
  entries: [
    {
      label: 'L',
      meaning: 'Esophageal location',
      group: '部位',
      severity: 'none',
      rows: [
        {
          heading: 'Ls',
          text: 'Locus superior — from the esophageal orifice to the tracheal bifurcation',
        },
        {
          heading: 'Lm',
          text: 'Locus medialis — the middle esophagus',
        },
        {
          heading: 'Li',
          text: 'Locus inferior — the lower esophagus, including the abdominal esophagus',
        },
      ],
      comment: '複数にまたがるときは Ls,m や Lm,i のように全部書く。',
    },
    {
      label: 'Lg',
      meaning: 'Gastric location',
      group: '部位',
      severity: 'moderate',
      rows: [
        {
          heading: 'Lg-c',
          text: 'Cardiac varices adjacent to the cardiac orifice (roughly Sarin GOV1)',
        },
        {
          heading: 'Lg-cf',
          text: 'Cardiofornical varices involving both the cardia and the fundus (roughly Sarin GOV2)',
        },
        {
          heading: 'Lg-f',
          text: 'Fundal varices localized in the gastric fundus, away from the cardia (roughly Sarin IGV1)',
        },
      ],
      comment:
        '2010年版から胃は食道と分けて書く。異所性（体部・前庭・十二指腸）は Lg 記号がなく、Sarin IGV2 として別記する。',
    },
    {
      label: 'F0',
      meaning: 'No varicose appearance',
      group: '形態',
      severity: 'none',
      rows: [
        {
          heading: 'Definition',
          text: 'Lesions that lack a varicose appearance. Used to record disappearance after treatment, even if red veins or blue veins remain',
        },
      ],
    },
    {
      label: 'F1',
      meaning: 'Straight, small-caliber',
      group: '形態',
      severity: 'mild',
      rows: [
        {
          heading: 'Definition',
          text: 'Straight, small-caliber varices. Small venous dilatations that disappear on insufflation of the esophagus are not included',
        },
        {
          heading: 'West',
          text: 'Corresponds to small varices in Baveno / AASLD (often <5 mm)',
        },
      ],
      comment: 'RC が付く F1 は欧米では予防の対象。日本でも出血リスクとして無視しない。',
    },
    {
      label: 'F2',
      meaning: 'Beady, moderately enlarged',
      group: '形態',
      severity: 'moderate',
      rows: [
        {
          heading: 'Definition',
          text: 'Moderately enlarged, beady varices',
        },
        {
          heading: 'West',
          text: 'Corresponds to large varices in Baveno / AASLD',
        },
      ],
      comment: 'F2 / F3、または RC 陽性は日本で予防的内視鏡の主な対象。',
    },
    {
      label: 'F3',
      meaning: 'Nodular or tumor-shaped',
      group: '形態',
      severity: 'severe',
      rows: [
        {
          heading: 'Definition',
          text: 'Markedly enlarged, nodular or tumor-shaped varices',
        },
      ],
    },
    {
      label: 'Cw',
      meaning: 'White',
      group: '色調',
      severity: 'mild',
      rows: [
        {
          heading: 'Definition',
          text: 'White varices that look like large folds of the esophageal mucosa',
        },
      ],
      comment: '混在は優勢な色を先に書く（Cw-b / Cb-w）。血栓は Th を付ける（Cw-Th）。',
    },
    {
      label: 'Cb',
      meaning: 'Blue',
      group: '色調',
      severity: 'moderate',
      rows: [
        {
          heading: 'Definition',
          text: 'Bluish or cyanotic varices; the covering mucosa appears thin. High-risk varices have a tense appearance like an over-inflated balloon',
        },
      ],
    },
    {
      label: 'RC',
      meaning: 'Red color grade',
      group: '発赤所見',
      severity: 'severe',
      rows: [
        {
          heading: 'RC0',
          text: 'Absent',
        },
        {
          heading: 'RC1',
          text: 'Small in number and localized',
        },
        {
          heading: 'RC2',
          text: 'Intermediate between RC1 and RC3',
        },
        {
          heading: 'RC3',
          text: 'Large in number and circumferential',
        },
      ],
      comment: '2010年版の胃静脈瘤は RC0 / RC1（あり・なし）だけ。RC は出血の最も重要な予測因子。',
    },
    {
      label: 'RC type',
      meaning: 'RWM / CRS / HCS',
      group: '発赤所見',
      severity: 'severe',
      rows: [
        {
          heading: 'RWM',
          text: 'Red wale markings — dilated venules oriented longitudinally on the mucosal surface, somewhat like wale or whip marks',
        },
        {
          heading: 'CRS',
          text: 'Cherry-red spots — small red spots on the mucosal surface',
        },
        {
          heading: 'HCS',
          text: 'Hematocystic spots — large, round, crimson-red projections that look like blood blisters',
        },
      ],
      comment: '種類と等級を両方書く（例: RC3 (RWM, CRS)）。HCS は出血リスクが高い。',
    },
    {
      label: 'Bleeding',
      meaning: 'Bleeding signs',
      group: '出血・粘膜',
      severity: 'severe',
      rows: [
        {
          heading: 'During',
          text: 'Gushing, spurting, or oozing',
        },
        {
          heading: 'After',
          text: 'Red plug or white plug after hemostasis',
        },
      ],
    },
    {
      label: 'Mucosa',
      meaning: 'Mucosal findings',
      group: '出血・粘膜',
      severity: 'mild',
      rows: [
        {
          heading: 'Codes',
          text: 'E (erosion), Ul (ulcer), S (scar)',
        },
      ],
    },
    {
      label: 'Guideline',
      meaning: 'JSGE / JSH 2020',
      group: '日本ガイドライン',
      severity: 'none',
      rows: [
        {
          heading: 'RC',
          text: 'An endoscopic red color sign is a risk factor for esophagogastric variceal bleeding (JSGE/JSH Liver Cirrhosis 2020, BQ 4-1). AASLD / EASL treat even small (about F1) varices with RC as an indication for prophylaxis. Baveno VI also lists Child–Pugh C as a bleeding-risk factor.',
        },
        {
          heading: 'Esophagus',
          text: 'In Japan, endoscopic therapy (EVL or EIS) is first-line for high-risk esophageal varices. In the West, a non-selective beta-blocker is often first. Either EVL or EIS is suggested for secondary prevention (CQ 4-5).',
        },
        {
          heading: 'Stomach',
          text: 'Cardiac / GOV1 varices are treated like esophageal varices. Isolated fundal varices (Lg-f / IGV1): BRTO is suggested to prevent rebleeding; cyanoacrylate may be used for never-bled fundal varices. After bleeding, BRTO is preferred over cyanoacrylate (CQ 4-6, CQ 4-7).',
        },
      ],
      comment:
        '記載例: Ls, F3, Cb, RC3 (RWM, CRS)。胃は別に Lg-f, F2, Cb, RC0 のように書く。Sarin は胃のページ。',
    },
  ],
};
