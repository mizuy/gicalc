import type { ClassificationDefinition } from '../../types/score';

export const jesScore: ClassificationDefinition = {
  id: 'jes',
  kind: 'classification',
  name: 'JES分類（食道扁平上皮・拡大）',
  shortName: 'JES',
  organ: 'esophagus',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description: '食道扁平上皮の拡大内視鏡分類（Type A / B1 / B2 / B3）。',
  originalLead:
    'Type A microvessels correspond to noncancerous lesions and lack severe irregularity; type B, to cancerous lesions, and exhibit severe irregularity. Type B vessels were subclassified into B1, B2, and B3.',
  reference: 'Oyama T et al. Esophagus 2017;14:105-112',
  pubmed: '28386209',
  figures: [
    {
      src: '/figures/jes-oyama2017-fig1-4.jpg',
      alt: 'JES classification Type A, B1, B2, and B3 (Oyama 2017 Fig. 1–4)',
      caption: 'Fig. 1–4. Type A / B1 / B2 / B3 (Oyama et al. Esophagus 2017)',
      source:
        'Oyama T, Inoue H, Arima M, et al. Prediction of the invasion depth of superficial squamous cell carcinoma based on microvessel morphology: magnifying endoscopic classification of the Japan Esophageal Society. Esophagus. 2017;14:105-112.',
      doi: 'https://doi.org/10.1007/s10388-016-0527-7',
      pubmed: '28386209',
      note: '上段左 Fig. 1 Type A、上段右 Fig. 2 Type B1、下段左 Fig. 3 Type B2、下段右 Fig. 4 Type B3。Open Access。',
      aspectRatio: 1200 / 523,
    },
    {
      src: '/figures/jes-oyama2017-fig5.jpg',
      alt: 'JES classification AVA (Oyama 2017 Fig. 5)',
      caption: 'Fig. 5. AVA (Oyama et al. Esophagus 2017)',
      source: 'Oyama T, Inoue H, Arima M, et al. Esophagus. 2017;14:105-112.',
      doi: 'https://doi.org/10.1007/s10388-016-0527-7',
      pubmed: '28386209',
      note: '原著: AVA-small <0.5 mm、AVA-middle 0.5–3 mm、AVA-large ≥3 mm。',
      aspectRatio: 709 / 203,
    },
  ],
  entries: [
    {
      label: 'Type A',
      meaning: 'Noncancerous',
      severity: 'none',
      rows: [
        {
          heading: '定義',
          text: 'Normal IPCL, or abnormal microvessels without severe irregularity',
        },
        { heading: '推定', text: 'Noncancerous lesions (inflammation / low-grade intraepithelial neoplasia)' },
        { heading: '注', text: '必要なら生検。' },
      ],
    },
    {
      label: 'Type B1',
      meaning: 'T1a-EP / T1a-LPM',
      severity: 'mild',
      rows: [
        { heading: '定義', text: 'Type B vessels with a loop-like formation' },
        { heading: '推定', text: 'T1a-EP or T1a-LPM' },
        {
          heading: 'AVA',
          text: 'Any AVA (small / middle / large) surrounded by B1 vessels is suggestive of T1a-EP or T1a-LPM',
        },
        { heading: '注', text: 'ESD の適応を検討。' },
      ],
    },
    {
      label: 'Type B2',
      meaning: 'T1a-MM / T1b-SM1',
      severity: 'moderate',
      rows: [
        { heading: '定義', text: 'Type B vessels without a loop-like formation' },
        { heading: '推定', text: 'T1a-MM or T1b-SM1（食道 SM1 は ≤200 μm）' },
        {
          heading: 'AVA',
          text: 'AVA-middle (0.5–3 mm) surrounded by B2 or B3 is suggestive of T1a-MM or T1b-SM1',
        },
      ],
    },
    {
      label: 'Type B3',
      meaning: 'T1b-SM2 or deeper',
      severity: 'severe',
      rows: [
        {
          heading: '定義',
          text: 'Highly dilated abnormal vessels (approximately three times the caliber of usual B2 vessels)',
        },
        { heading: '推定', text: 'T1b-SM2 or deeper' },
        {
          heading: 'AVA',
          text: 'AVA-large (≥3 mm) surrounded by B2 or B3 is suggestive of T1b-SM2 or deeper',
        },
        { heading: '注', text: '外科または化学放射線を検討。' },
      ],
    },
  ],
};
