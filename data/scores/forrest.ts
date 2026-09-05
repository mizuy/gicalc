import type { ClassificationDefinition, ClassificationFigure } from '../../types/score';

/** Forrest 1974 Lancet（PMID 4136718） */
export const FORREST_1974_PUBMED = '4136718';
export const FORREST_ZHOU_2025_PUBMED = '39819728';

const ZHOU_SOURCE =
  'Zhou P, Yang W, Li Q, Guo X, Fu R, Liu S. A fusion model of manually extracted visual features and deep learning features for rebleeding risk stratification in peptic ulcers. J South Med Univ. 2025;45:197-205. Fig. 1. Classification: Forrest JA, Finlayson ND, Shearman DJ. Endoscopy in gastrointestinal bleeding. Lancet. 1974;2:394-397.';
const ZHOU_DOI = 'https://doi.org/10.12122/j.issn.1673-4254.2025.01.23';

function zhouCrop(figure: {
  src: string;
  alt: string;
  caption: string;
  note: string;
  aspectRatio: number;
}): ClassificationFigure {
  return {
    ...figure,
    source: ZHOU_SOURCE,
    doi: ZHOU_DOI,
    pubmed: FORREST_ZHOU_2025_PUBMED,
    license: 'CC BY-NC-ND 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
  };
}

export const forrestScore: ClassificationDefinition = {
  id: 'forrest',
  kind: 'classification',
  name: 'Forrest分類（消化性潰瘍出血）',
  shortName: 'Forrest',
  organ: 'bleeding',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '消化性潰瘍出血の内視鏡所見（Ia–III）。再出血リスクと内視鏡治療の要否の共通言語。',
  originalLead:
    'Endoscopic stigmata of peptic ulcer hemorrhage are classified as Forrest I (active hemorrhage), Forrest II (signs of recent hemorrhage), and Forrest III (lesions without signs of recent hemorrhage). Forrest Ia: spurting hemorrhage. Forrest Ib: oozing hemorrhage. Forrest IIa: non-bleeding visible vessel. Forrest IIb: adherent clot. Forrest IIc: flat pigmented haematin (coffee-ground) spot on the ulcer base. Forrest III: clean ulcer base without stigmata of recent hemorrhage.',
  reference: 'Forrest JA, Finlayson ND, Shearman DJ. Lancet 1974;2:394-397',
  pubmed: FORREST_1974_PUBMED,
  figures: [
    {
      href: ZHOU_DOI,
      hrefLabel: 'Fig. 1',
      alt: 'Forrest classification Ia–III (Zhou 2025 Fig. 1)',
      caption: 'Fig. 1. Representative endoscopic images of peptic ulcers in the 6 Forrest grades (Zhou et al. 2025)',
      source: ZHOU_SOURCE,
      doi: ZHOU_DOI,
      pubmed: FORREST_ZHOU_2025_PUBMED,
      license: 'CC BY-NC-ND 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
      note: '各型カードに切り抜きを掲載。原図は埋め込まず Zhou 2025 Fig. 1 へリンクする。ライセンスは CC BY-NC-ND 4.0。Forrest 1974 Lancet 原著は CC ではない。',
    },
  ],
  entries: [
    {
      label: 'Ia',
      meaning: 'Spurting hemorrhage',
      group: '活動性出血',
      severity: 'severe',
      figures: [
        zhouCrop({
          src: '/figures/forrest-jsmu2025-fig1-ia-top.webp',
          alt: 'Forrest Ia spurting hemorrhage (Zhou 2025 Fig. 1A, upper)',
          caption: 'Fig. 1A Ia',
          note: '原図 Fig. 1A 上段から切り抜き。南方医科大学学报。ライセンスは CC BY-NC-ND 4.0。Forrest 1974 Lancet 原著は CC ではない。',
          aspectRatio: 282 / 284,
        }),
        zhouCrop({
          src: '/figures/forrest-jsmu2025-fig1-ia-bottom.webp',
          alt: 'Forrest Ia spurting hemorrhage (Zhou 2025 Fig. 1A, lower)',
          caption: 'Fig. 1A Ia',
          note: '原図 Fig. 1A 下段から切り抜き。南方医科大学学报。ライセンスは CC BY-NC-ND 4.0。Forrest 1974 Lancet 原著は CC ではない。',
          aspectRatio: 282 / 285,
        }),
      ],
      rows: [
        { heading: 'Finding', text: 'Active spurting arterial hemorrhage' },
        { heading: 'Risk', text: 'High risk of persistent bleeding or rebleeding if untreated' },
      ],
      comment: '内視鏡止血の適応。',
    },
    {
      label: 'Ib',
      meaning: 'Oozing hemorrhage',
      group: '活動性出血',
      severity: 'severe',
      figures: [
        zhouCrop({
          src: '/figures/forrest-jsmu2025-fig1-ib-top.webp',
          alt: 'Forrest Ib oozing hemorrhage (Zhou 2025 Fig. 1B, upper)',
          caption: 'Fig. 1B Ib',
          note: '原図 Fig. 1B 上段から切り抜き。南方医科大学学报。ライセンスは CC BY-NC-ND 4.0。Forrest 1974 Lancet 原著は CC ではない。',
          aspectRatio: 283 / 284,
        }),
        zhouCrop({
          src: '/figures/forrest-jsmu2025-fig1-ib-bottom.webp',
          alt: 'Forrest Ib oozing hemorrhage (Zhou 2025 Fig. 1B, lower)',
          caption: 'Fig. 1B Ib',
          note: '原図 Fig. 1B 下段から切り抜き。南方医科大学学报。ライセンスは CC BY-NC-ND 4.0。Forrest 1974 Lancet 原著は CC ではない。',
          aspectRatio: 283 / 285,
        }),
      ],
      rows: [
        { heading: 'Finding', text: 'Active oozing hemorrhage' },
        { heading: 'Risk', text: 'High risk of persistent bleeding or rebleeding if untreated' },
      ],
      comment: '内視鏡止血の適応。',
    },
    {
      label: 'IIa',
      meaning: 'Non-bleeding visible vessel',
      group: '最近の出血兆候',
      severity: 'severe',
      figures: [
        zhouCrop({
          src: '/figures/forrest-jsmu2025-fig1-iia-top.webp',
          alt: 'Forrest IIa non-bleeding visible vessel (Zhou 2025 Fig. 1C, upper)',
          caption: 'Fig. 1C IIa',
          note: '原図 Fig. 1C 上段から切り抜き。南方医科大学学报。ライセンスは CC BY-NC-ND 4.0。Forrest 1974 Lancet 原著は CC ではない。',
          aspectRatio: 283 / 284,
        }),
        zhouCrop({
          src: '/figures/forrest-jsmu2025-fig1-iia-bottom.webp',
          alt: 'Forrest IIa non-bleeding visible vessel (Zhou 2025 Fig. 1C, lower)',
          caption: 'Fig. 1C IIa',
          note: '原図 Fig. 1C 下段から切り抜き。南方医科大学学报。ライセンスは CC BY-NC-ND 4.0。Forrest 1974 Lancet 原著は CC ではない。',
          aspectRatio: 283 / 285,
        }),
      ],
      rows: [
        { heading: 'Finding', text: 'Non-bleeding visible vessel' },
        { heading: 'Risk', text: 'High risk of rebleeding if untreated' },
      ],
      comment: '内視鏡止血の適応。',
    },
    {
      label: 'IIb',
      meaning: 'Adherent clot',
      group: '最近の出血兆候',
      severity: 'moderate',
      figures: [
        zhouCrop({
          src: '/figures/forrest-jsmu2025-fig1-iib-top.webp',
          alt: 'Forrest IIb adherent clot (Zhou 2025 Fig. 1D, upper)',
          caption: 'Fig. 1D IIb',
          note: '原図 Fig. 1D 上段から切り抜き。南方医科大学学报。ライセンスは CC BY-NC-ND 4.0。Forrest 1974 Lancet 原著は CC ではない。',
          aspectRatio: 283 / 284,
        }),
        zhouCrop({
          src: '/figures/forrest-jsmu2025-fig1-iib-bottom.webp',
          alt: 'Forrest IIb adherent clot (Zhou 2025 Fig. 1D, lower)',
          caption: 'Fig. 1D IIb',
          note: '原図 Fig. 1D 下段から切り抜き。南方医科大学学报。ライセンスは CC BY-NC-ND 4.0。Forrest 1974 Lancet 原著は CC ではない。',
          aspectRatio: 283 / 285,
        }),
      ],
      rows: [
        { heading: 'Finding', text: 'Adherent clot on the ulcer base' },
        { heading: 'Risk', text: 'Intermediate risk; clot removal is used to expose the underlying stigma' },
      ],
    },
    {
      label: 'IIc',
      meaning: 'Flat pigmented spot',
      group: '最近の出血兆候',
      severity: 'mild',
      figures: [
        zhouCrop({
          src: '/figures/forrest-jsmu2025-fig1-iic-top.webp',
          alt: 'Forrest IIc flat pigmented spot (Zhou 2025 Fig. 1E, upper)',
          caption: 'Fig. 1E IIc',
          note: '原図 Fig. 1E 上段から切り抜き。南方医科大学学报。ライセンスは CC BY-NC-ND 4.0。Forrest 1974 Lancet 原著は CC ではない。',
          aspectRatio: 283 / 284,
        }),
        zhouCrop({
          src: '/figures/forrest-jsmu2025-fig1-iic-bottom.webp',
          alt: 'Forrest IIc flat pigmented spot (Zhou 2025 Fig. 1E, lower)',
          caption: 'Fig. 1E IIc',
          note: '原図 Fig. 1E 下段から切り抜き。南方医科大学学报。ライセンスは CC BY-NC-ND 4.0。Forrest 1974 Lancet 原著は CC ではない。',
          aspectRatio: 283 / 285,
        }),
      ],
      rows: [
        { heading: 'Finding', text: 'Flat pigmented haematin (coffee-ground) spot on the ulcer base' },
        { heading: 'Risk', text: 'Low risk of rebleeding' },
      ],
      comment: 'IIc / III は経過観察が基本。',
    },
    {
      label: 'III',
      meaning: 'Clean ulcer base',
      group: '出血兆候なし',
      severity: 'none',
      figures: [
        zhouCrop({
          src: '/figures/forrest-jsmu2025-fig1-iii-top.webp',
          alt: 'Forrest III clean ulcer base (Zhou 2025 Fig. 1F, upper)',
          caption: 'Fig. 1F III',
          note: '原図 Fig. 1F 上段から切り抜き。南方医科大学学报。ライセンスは CC BY-NC-ND 4.0。Forrest 1974 Lancet 原著は CC ではない。',
          aspectRatio: 284 / 284,
        }),
        zhouCrop({
          src: '/figures/forrest-jsmu2025-fig1-iii-bottom.webp',
          alt: 'Forrest III clean ulcer base (Zhou 2025 Fig. 1F, lower)',
          caption: 'Fig. 1F III',
          note: '原図 Fig. 1F 下段から切り抜き。南方医科大学学报。ライセンスは CC BY-NC-ND 4.0。Forrest 1974 Lancet 原著は CC ではない。',
          aspectRatio: 284 / 285,
        }),
      ],
      rows: [
        { heading: 'Finding', text: 'Clean, fibrin-covered ulcer base without stigmata of recent hemorrhage' },
        { heading: 'Risk', text: 'Lowest risk of rebleeding; endoscopic therapy is not indicated for the stigma itself' },
      ],
    },
  ],
};
