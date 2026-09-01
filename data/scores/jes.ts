import type { ClassificationDefinition } from '../../types/score';

export const jesScore: ClassificationDefinition = {
  id: 'jes',
  kind: 'classification',
  name: 'JES分類（食道扁平上皮・拡大）',
  shortName: 'JES',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '食道扁平上皮の拡大内視鏡分類（Type A / B1 / B2 / B3）の定義一覧です。Inoue の IPCL I–V や食道静脈瘤分類とは別です。',
  reference: 'Oyama T et al. Esophagus 2017;14:105-112（日本食道学会）',
  figures: [
    {
      src: '/figures/jes.svg',
      alt: 'JES Type A・B1・B2・B3 の血管形態と AVA の模式図',
      caption: '図. JES分類の血管形態と AVA（模式）',
      source:
        'Oyama T, Inoue H, Arima M, et al. Prediction of the invasion depth of superficial squamous cell carcinoma based on microvessel morphology: magnifying endoscopic classification of the Japan Esophageal Society. Esophagus. 2017;14:105-112.',
      doi: 'https://doi.org/10.1007/s10388-016-0527-7',
      note: '原著 Fig. は拡大内視鏡の実写真で Type A/B1/B2/B3 と AVA-small/middle/large を示している。本図は定義に基づく模式であり、原著図の複製ではない。',
      aspectRatio: 800 / 340,
    },
  ],
  entries: [
    {
      label: 'Type A',
      meaning: '非癌（炎症 / LGIN）',
      severity: 'none',
      rows: [
        { heading: '所見', text: '正常 IPCL、または高度不整のない血管' },
        { heading: '推定', text: '非腫瘍または低異型度上皮内腫瘍' },
        { heading: '方針', text: '必要なら生検。Inoue IPCL I–V とは別分類' },
      ],
    },
    {
      label: 'Type B1',
      meaning: 'EP / LPM',
      severity: 'mild',
      rows: [
        { heading: '所見', text: 'ループを保った異常血管（拡張・蛇行・口径不同・形状不均一）' },
        { heading: '推定', text: 'T1a-EP / T1a-LPM' },
        { heading: '方針', text: 'ESD の適応を検討' },
      ],
    },
    {
      label: 'Type B2',
      meaning: 'MM / SM1',
      severity: 'moderate',
      rows: [
        { heading: '所見', text: 'ループが破壊された非ループ血管' },
        { heading: '推定', text: 'T1a-MM / T1b-SM1（食道 SM1 は ≤200 μm）' },
        {
          heading: 'AVA',
          text: '小 <0.5 mm は EP/LPM、中 0.5–3 mm は MM/SM1、大 >3 mm は SM2 以深のことが多い',
        },
      ],
    },
    {
      label: 'Type B3',
      meaning: 'SM2 以深',
      severity: 'severe',
      rows: [
        { heading: '所見', text: '高度に拡張した異常血管（通常の B2 の約3倍以上）' },
        { heading: '推定', text: 'T1b-SM2 以深' },
        { heading: '方針', text: '外科または化学放射線を検討' },
      ],
    },
  ],
};
