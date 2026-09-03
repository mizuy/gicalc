import type { ClassificationDefinition } from '../../types/score';

/** Jacob / Toyonaga 2016 Endoscopy（PMID 27467815） */
export const APPENDICEAL_ORIFICE_2016_PUBMED = '27467815';

/** Oung 2020 Endosc Int Open Fig. 2（PMID 32083562）。CC BY-NC-ND 4.0 */
export const OUNG_2020_PUBMED = '32083562';

export const appendicealOrificeScore: ClassificationDefinition = {
  id: 'appendiceal-orifice',
  kind: 'classification',
  name: '虫垂開口部近傍病変のType分類',
  shortName: 'AO Type',
  developedInJapan: true,
  organ: 'colorectum',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '盲腸・虫垂開口部近傍の表在型病変を、虫垂開口部への接触・虫垂内伸展の程度で分類する（Toyonaga 分類）。ESD の難易度と一括切除可能性の目安として用いる。Type 3a は虫垂切除歴がある深部伸展例（Oung 2019 提案）。',
  originalLead:
    'Lesions within approximately 12 mm of the appendiceal orifice are classified by the relationship to the orifice: Type 0, proximity but does not reach the orifice; Type 1, reaches the border but does not enter; Type 2, enters the orifice and the transition to normal appendiceal mucosa is discernible in the lumen; Type 3, enters deeply and the tumor edge cannot be observed. Type 3a denotes deep invasion at the site of previous appendectomy.',
  reference:
    'Jacob H, Toyonaga T, Ohara Y, et al. Endoscopy 2016;48:829-836. Type 3a: Oung B, et al. Endosc Int Open 2020;8:E388-E395',
  pubmed: APPENDICEAL_ORIFICE_2016_PUBMED,
  figures: [
    {
      src: '/figures/oung2020-fig2.jpg',
      alt: 'Toyonaga appendiceal orifice lesion classification Types 1, 2, 3, and 3a',
      caption:
        'Fig. 2. Lesion classification according to Toyonaga’s classification with additional type 3a in case of previous appendectomy',
      source:
        'Oung B, Rivory J, Chabrun E, et al. ESD with double clips and rubber band traction of neoplastic lesions developed in the appendiceal orifice is effective and safe. Endosc Int Open. 2020;8:E388-E395. Fig. 2. Type definitions: Jacob H, Toyonaga T, Ohara Y, et al. Endoscopy. 2016;48:829-836.',
      doi: 'https://doi.org/10.1055/a-1072-4830',
      pubmed: OUNG_2020_PUBMED,
      license: 'CC BY-NC-ND 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
      note: '図は Type 1–3 と 3a のみ（Oung 2020 Fig. 2、CC BY-NC-ND 4.0）。Type 0 は原著 Jacob 2016 の定義どおりテキストで記載。Endoscopy 2016 原著は CC ではない。',
      aspectRatio: 800 / 475,
    },
  ],
  entries: [
    {
      label: 'Type 0',
      meaning: 'Proximal, not touching',
      severity: 'none',
      rows: [
        {
          heading: 'Relation',
          text: 'Proximity to the appendiceal orifice but does not reach it',
        },
        {
          heading: 'Endoscopy',
          text: 'Lesion margin does not contact the orifice',
        },
      ],
      comment: '図には含まれない（Oung 2020 は接触例のみ対象）。通常の盲腸 ESD と同様に扱えることが多い。',
    },
    {
      label: 'Type 1',
      meaning: 'Touches orifice',
      severity: 'mild',
      rows: [
        {
          heading: 'Relation',
          text: 'Reaches the border of the appendix but does not enter the orifice',
        },
        {
          heading: 'Endoscopy',
          text: 'Lesion margin contacts the appendiceal orifice',
        },
      ],
      comment: 'Strategy A（虫垂側を先に切開）が基本。線維化で困難なら Strategy B を検討。',
    },
    {
      label: 'Type 2',
      meaning: 'Partial invasion, edge visible',
      severity: 'moderate',
      rows: [
        {
          heading: 'Relation',
          text: 'Enters the orifice; transition to normal appendiceal mucosa is discernible in the lumen',
        },
        {
          heading: 'Endoscopy',
          text: 'Appendiceal-side margin of the lesion can be identified',
        },
      ],
      comment: 'ESD 一括切除率 83.3–100% と報告が多い。Strategy B が主。局注の膨隆が良好なら Strategy A も可。',
    },
    {
      label: 'Type 3',
      meaning: 'Deep invasion, edge not seen',
      severity: 'severe',
      rows: [
        {
          heading: 'Relation',
          text: 'Enters the orifice deeply; tumor edge cannot be observed',
        },
        {
          heading: 'Endoscopy',
          text: 'Appendiceal-side margin is not visible inside the orifice',
        },
      ],
      comment: '原則手術推奨。ESD 報告では穿孔率が高い（Oung 2020 で 54.5%）。Jacob 2016 では虫垂切除前の Type 3 は ESD 対象外とした。',
    },
    {
      label: 'Type 3a',
      meaning: 'Deep invasion after appendectomy',
      group: '虫垂切除後',
      severity: 'moderate',
      rows: [
        {
          heading: 'Relation',
          text: 'Deep invasion at the area of previous appendectomy (residual appendiceal stump)',
        },
        {
          heading: 'Endoscopy',
          text: 'Same deep extension pattern as Type 3, but appendectomy has been performed',
        },
      ],
      comment: '残存虫垂が短く一括切除しやすい。Oung 2020 では Type 3 と合わせて DCT-ESD の対象。トラクションが有効。',
    },
  ],
};
