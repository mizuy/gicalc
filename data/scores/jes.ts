import type { ClassificationDefinition, ClassificationFigure } from '../../types/score';

const OYAMA_SOURCE =
  'Oyama T, Inoue H, Arima M, et al. Prediction of the invasion depth of superficial squamous cell carcinoma based on microvessel morphology: magnifying endoscopic classification of the Japan Esophageal Society. Esophagus. 2017;14:105-112.';
const OYAMA_DOI = 'https://doi.org/10.1007/s10388-016-0527-7';
const OYAMA_PUBMED = '28386209';

function oyamaCrop(figure: {
  src: string;
  alt: string;
  caption: string;
  note: string;
  aspectRatio: number;
}): ClassificationFigure {
  return {
    ...figure,
    source: OYAMA_SOURCE,
    doi: OYAMA_DOI,
    pubmed: OYAMA_PUBMED,
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  };
}

export const jesScore: ClassificationDefinition = {
  id: 'jes',
  kind: 'classification',
  name: 'JES分類（食道扁平上皮・拡大）',
  shortName: 'JES',
  developedInJapan: true,
  organ: 'esophagus',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description: '食道扁平上皮の拡大内視鏡分類（Type A / B1 / B2 / B3）。',
  originalLead:
    'The microvascular irregularity is evaluated for weaving (tortuosity), dilatation, irregular caliber, and different shape. Microvessels are classified as type A if they have three or fewer factors and type B if they have all four. Type A microvessels correspond to noncancerous lesions and lack severe irregularity; type B, to cancerous lesions, and exhibit severe irregularity. Type B vessels were subclassified into B1, B2, and B3.',
  reference: 'Oyama T et al. Esophagus 2017;14:105-112',
  pubmed: OYAMA_PUBMED,
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  entries: [
    {
      label: 'Type A',
      meaning: 'No invasion',
      severity: 'none',
      figures: [
        oyamaCrop({
          src: '/figures/jes-oyama2017-fig1-type-a.webp',
          alt: 'JES Type A microvessels (Oyama 2017 Fig. 1 a–b)',
          caption: 'Fig. 1 Type A',
          note: '原図 Fig. 1 から切り抜き（a / b）。Springer Open。ライセンスは CC BY 4.0。',
          aspectRatio: 598 / 258,
        }),
      ],
      rows: [
        { heading: 'Definition', text: 'Normal IPCL, or abnormal microvessels without severe irregularity' },
        { heading: 'Invasion', text: 'No invasion' },
        { heading: 'Histology', text: 'Normal epithelium, inflammation, and LGIN' },
      ],
    },
    {
      label: 'Type B1',
      meaning: 'T1a-EP or T1a-LPM',
      severity: 'mild',
      figures: [
        oyamaCrop({
          src: '/figures/jes-oyama2017-fig2-type-b1.webp',
          alt: 'JES Type B1 microvessels (Oyama 2017 Fig. 2 a–b)',
          caption: 'Fig. 2 Type B1',
          note: '原図 Fig. 2 から切り抜き（a / b）。Springer Open。ライセンスは CC BY 4.0。',
          aspectRatio: 598 / 258,
        }),
      ],
      rows: [
        { heading: 'Definition', text: 'Type B vessels with a loop-like formation' },
        { heading: 'Invasion', text: 'T1a-EP or T1a-LPM' },
        { heading: 'Histology', text: 'HGIN and invasive SCC' },
        {
          heading: 'Note',
          text: 'The B1 vessels normally appear as dot-like microvessels. The caliber of B1 vessels is around 20 μm.',
        },
      ],
    },
    {
      label: 'Type B2',
      meaning: 'T1a-MM or T1b-SM1',
      severity: 'moderate',
      figures: [
        oyamaCrop({
          src: '/figures/jes-oyama2017-fig3-type-b2.webp',
          alt: 'JES Type B2 microvessels (Oyama 2017 Fig. 3 a–b)',
          caption: 'Fig. 3 Type B2',
          note: '原図 Fig. 3 から切り抜き（a / b）。Springer Open。ライセンスは CC BY 4.0。',
          aspectRatio: 598 / 258,
        }),
      ],
      rows: [
        {
          heading: 'Definition',
          text: 'Type B vessels without a loop-like formation that have a stretched and markedly elongated transformation',
        },
        { heading: 'Invasion', text: 'T1a-MM or T1b-SM1' },
        {
          heading: 'Note',
          text: 'The B2 vessels often show a multilayered arrangement or an irregularly branched/running pattern.',
        },
      ],
      comment: '食道 SM1 は ≤200 μm。',
    },
    {
      label: 'Type B3',
      meaning: 'T1b-SM2 or deeper',
      severity: 'severe',
      figures: [
        oyamaCrop({
          src: '/figures/jes-oyama2017-fig4-type-b3.webp',
          alt: 'JES Type B3 microvessels (Oyama 2017 Fig. 4 a–b)',
          caption: 'Fig. 4 Type B3',
          note: '原図 Fig. 4 から切り抜き（a / b）。Springer Open。ライセンスは CC BY 4.0。',
          aspectRatio: 598 / 258,
        }),
      ],
      rows: [
        {
          heading: 'Definition',
          text: 'Highly dilated abnormal vessels whose caliber appears to be more than three times that of the usual B2 vessels',
        },
        { heading: 'Invasion', text: 'T1b-SM2 or deeper' },
        {
          heading: 'Note',
          text: 'The B3 vessels often appear green in color. The caliber of B3 vessels is often larger than 60 μm.',
        },
      ],
    },
    {
      label: 'AVA',
      meaning: 'Avascular area',
      severity: 'moderate',
      figures: [
        oyamaCrop({
          src: '/figures/jes-oyama2017-fig5-ava-small.webp',
          alt: 'JES AVA-small (Oyama 2017 Fig. 5a)',
          caption: 'Fig. 5a AVA-small',
          note: '原図 Fig. 5a から切り抜き。Springer Open。ライセンスは CC BY 4.0。',
          aspectRatio: 232 / 203,
        }),
        oyamaCrop({
          src: '/figures/jes-oyama2017-fig5-ava-middle.webp',
          alt: 'JES AVA-middle (Oyama 2017 Fig. 5b)',
          caption: 'Fig. 5b AVA-middle',
          note: '原図 Fig. 5b から切り抜き。Springer Open。ライセンスは CC BY 4.0。',
          aspectRatio: 233 / 203,
        }),
        oyamaCrop({
          src: '/figures/jes-oyama2017-fig5-ava-large.webp',
          alt: 'JES AVA-large (Oyama 2017 Fig. 5c)',
          caption: 'Fig. 5c AVA-large',
          note: '原図 Fig. 5c から切り抜き。Springer Open。ライセンスは CC BY 4.0。',
          aspectRatio: 233 / 203,
        }),
      ],
      rows: [
        {
          heading: 'Definition',
          text: 'A low or no vascularity area surrounded by all subtypes of type B microvessels, including B1. The stretched irregular vessels themselves are not included in AVA.',
        },
        { heading: 'AVA-small', text: 'Smaller than 0.5 mm in diameter' },
        { heading: 'AVA-middle', text: '0.5 mm or between 0.5 and 3 mm' },
        { heading: 'AVA-large', text: '3 mm or larger' },
        {
          heading: 'B1',
          text: 'Any types of AVA (small, middle, and large) surrounded by B1 vessels are suggestive of T1a-EP or T1a-LPM SCC.',
        },
        {
          heading: 'B2 / B3',
          text: 'AVA-middle surrounded by B2 or B3 vessels is suggestive of T1a-MM or T1b-SM1. AVA-large surrounded by B2 or B3 vessels is suggestive of T1b-SM2 invasive SCC.',
        },
      ],
    },
  ],
};
