import type { ClassificationDefinition, ClassificationFigure } from '../../types/score';

/** Hill 1996 GIE（PMID 8934159） */
export const HILL_1996_PUBMED = '8934159';
export const HILL_GE_2023_PUBMED = '37949083';

const GE_SOURCE =
  'Ge Z, Fang Y, Chang J, et al. Using deep learning to assess the function of gastroesophageal flap valve according to the Hill classification system. Ann Med. 2023;55:2279239. Fig. 1. Original grades: Hill LD, Kozarek RA, Kraemer SJ, et al. The gastroesophageal flap valve: in vitro and in vivo observations. Gastrointest Endosc. 1996;44:541-547.';
const GE_DOI = 'https://doi.org/10.1080/07853890.2023.2279239';

function geCrop(figure: {
  src: string;
  alt: string;
  caption: string;
  note: string;
  aspectRatio: number;
}): ClassificationFigure {
  return {
    ...figure,
    source: GE_SOURCE,
    doi: GE_DOI,
    pubmed: HILL_GE_2023_PUBMED,
    license: 'CC BY-NC 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc/4.0/',
  };
}

export const hillScore: ClassificationDefinition = {
  id: 'hill',
  kind: 'classification',
  name: 'Hill分類（胃食道フラップ弁）',
  shortName: 'Hill',
  organ: 'stomach',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '反転観察での胃食道フラップ弁（gastroesophageal flap valve）Grade I–IV。逆流防止機構の内視鏡評価。',
  originalLead:
    'The gastroesophageal flap valve is graded in retroflexion. Grade I: a prominent fold of tissue along the lesser curvature that is closely apposed to the endoscope through all phases of respiration. Grade II: the fold is present but not as prominent; there are periods of rapid opening and closing around the endoscope. Grade III: the fold is not prominent and the endoscope is not tightly gripped by the tissue; a hiatal hernia is present in nearly all of these patients. Grade IV: essentially no fold, and the lumen of the esophagus is wide open, allowing the squamous epithelium to be viewed from below.',
  reference: 'Hill LD et al. Gastrointest Endosc 1996;44:541-547',
  pubmed: HILL_1996_PUBMED,
  entries: [
    {
      label: 'Grade I',
      meaning: 'Prominent fold, closely apposed',
      group: '正常寄り',
      severity: 'none',
      figures: [
        geCrop({
          src: '/figures/hill-ge2023-fig1-grade-i.webp',
          alt: 'Hill Grade I gastroesophageal flap valve (Ge 2023 Fig. 1)',
          caption: 'Fig. 1 Grade I',
          note: '原図 Fig. 1 の Grade I から切り抜き。Annals of Medicine。ライセンスは CC BY-NC 4.0。Hill 1996 GIE 原著は CC ではない。',
          aspectRatio: 388 / 301,
        }),
      ],
      rows: [
        {
          heading: 'Definition',
          text: 'A prominent fold of tissue along the lesser curvature that is closely apposed to the endoscope through all phases of respiration',
        },
      ],
    },
    {
      label: 'Grade II',
      meaning: 'Less prominent fold; opens and closes',
      group: '正常寄り',
      severity: 'mild',
      figures: [
        geCrop({
          src: '/figures/hill-ge2023-fig1-grade-ii.webp',
          alt: 'Hill Grade II gastroesophageal flap valve (Ge 2023 Fig. 1)',
          caption: 'Fig. 1 Grade II',
          note: '原図 Fig. 1 の Grade II から切り抜き。Annals of Medicine。ライセンスは CC BY-NC 4.0。Hill 1996 GIE 原著は CC ではない。',
          aspectRatio: 388 / 301,
        }),
      ],
      rows: [
        {
          heading: 'Definition',
          text: 'The fold is present but not as prominent, with periods of rapid opening and closing around the endoscope',
        },
      ],
    },
    {
      label: 'Grade III',
      meaning: 'Fold not prominent; hernia usual',
      group: '異常',
      severity: 'moderate',
      figures: [
        geCrop({
          src: '/figures/hill-ge2023-fig1-grade-iii.webp',
          alt: 'Hill Grade III gastroesophageal flap valve (Ge 2023 Fig. 1)',
          caption: 'Fig. 1 Grade III',
          note: '原図 Fig. 1 の Grade III から切り抜き。Annals of Medicine。ライセンスは CC BY-NC 4.0。Hill 1996 GIE 原著は CC ではない。',
          aspectRatio: 388 / 302,
        }),
      ],
      rows: [
        {
          heading: 'Definition',
          text: 'The fold is not prominent and the endoscope is not tightly gripped by the tissue. A hiatal hernia is present in nearly all of these patients',
        },
      ],
      comment: 'III–IV は逆流・裂孔ヘルニアと関連しやすい。',
    },
    {
      label: 'Grade IV',
      meaning: 'No fold; open lumen from below',
      group: '異常',
      severity: 'severe',
      figures: [
        geCrop({
          src: '/figures/hill-ge2023-fig1-grade-iv.webp',
          alt: 'Hill Grade IV gastroesophageal flap valve (Ge 2023 Fig. 1)',
          caption: 'Fig. 1 Grade IV',
          note: '原図 Fig. 1 の Grade IV から切り抜き。Annals of Medicine。ライセンスは CC BY-NC 4.0。Hill 1996 GIE 原著は CC ではない。',
          aspectRatio: 388 / 302,
        }),
      ],
      rows: [
        {
          heading: 'Definition',
          text: 'Essentially no fold, and the lumen of the esophagus is wide open, allowing the squamous epithelium to be viewed from below',
        },
      ],
    },
  ],
};
