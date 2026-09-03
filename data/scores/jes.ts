import type { ClassificationDefinition } from '../../types/score';

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
  pubmed: '28386209',
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  figures: [
    {
      src: '/figures/jes-oyama2017-fig1-4.jpg',
      alt: 'JES classification Type A, B1, B2, and B3 (Oyama 2017 Fig. 1–4)',
      caption: 'Fig. 1–4. Type A / B1 / B2 / B3 (Oyama et al. Esophagus 2017)',
      source:
        'Oyama T, Inoue H, Arima M, et al. Prediction of the invasion depth of superficial squamous cell carcinoma based on microvessel morphology: magnifying endoscopic classification of the Japan Esophageal Society. Esophagus. 2017;14:105-112.',
      doi: 'https://doi.org/10.1007/s10388-016-0527-7',
      pubmed: '28386209',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      note: '上段左 Fig. 1 Type A、上段右 Fig. 2 Type B1、下段左 Fig. 3 Type B2、下段右 Fig. 4 Type B3。Springer Open。ライセンスは CC BY 4.0。',
      aspectRatio: 1200 / 523,
    },
    {
      src: '/figures/jes-oyama2017-fig5.jpg',
      alt: 'JES classification AVA (Oyama 2017 Fig. 5)',
      caption: 'Fig. 5. AVA (Oyama et al. Esophagus 2017)',
      source: 'Oyama T, Inoue H, Arima M, et al. Esophagus. 2017;14:105-112.',
      doi: 'https://doi.org/10.1007/s10388-016-0527-7',
      pubmed: '28386209',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      note: 'AVA-small / middle / large。Springer Open。ライセンスは CC BY 4.0。',
      aspectRatio: 709 / 203,
    },
  ],
  entries: [
    {
      label: 'Type A',
      meaning: 'No invasion',
      severity: 'none',
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
