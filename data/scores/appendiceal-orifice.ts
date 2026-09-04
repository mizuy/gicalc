import type { ClassificationDefinition, ClassificationFigure } from '../../types/score';

/** Jacob / Toyonaga 2016 Endoscopy（PMID 27467815） */
export const APPENDICEAL_ORIFICE_2016_PUBMED = '27467815';

/** Oung 2020 Endosc Int Open Fig. 2（PMID 32083562）。CC BY-NC-ND 4.0 */
export const OUNG_2020_PUBMED = '32083562';

const OUNG_SOURCE =
  'Oung B, Rivory J, Chabrun E, et al. ESD with double clips and rubber band traction of neoplastic lesions developed in the appendiceal orifice is effective and safe. Endosc Int Open. 2020;8:E388-E395. Fig. 2. Type definitions: Jacob H, Toyonaga T, Ohara Y, et al. Endoscopy. 2016;48:829-836.';
const OUNG_DOI = 'https://doi.org/10.1055/a-1072-4830';

function oungCrop(figure: {
  src: string;
  alt: string;
  caption: string;
  note: string;
  aspectRatio: number;
}): ClassificationFigure {
  return {
    ...figure,
    source: OUNG_SOURCE,
    doi: OUNG_DOI,
    pubmed: OUNG_2020_PUBMED,
    license: 'CC BY-NC-ND 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
  };
}

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
  entries: [
    {
      label: 'Type 0',
      meaning: 'Proximal, not touching',
      severity: 'none',
      figures: [
        oungCrop({
          src: '/figures/oung2020-fig2-type-0.jpg',
          alt: 'Toyonaga Type 0 lesion not contacting the appendiceal orifice (Oung 2020 Fig. 2)',
          caption: 'Fig. 2 Type 0',
          note: '原図 Fig. 2 の Type 0 から切り抜き。Endosc Int Open。ライセンスは CC BY-NC-ND 4.0。Jacob 2016 Endoscopy 原著は CC ではない。',
          aspectRatio: 248 / 218,
        }),
      ],
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
      comment: 'Oung 2020 の ESD シリーズは接触例のみ（Type 0 は対象外）。通常の盲腸 ESD と同様に扱えることが多い。',
    },
    {
      label: 'Type 1',
      meaning: 'Touches orifice',
      severity: 'mild',
      figures: [
        oungCrop({
          src: '/figures/oung2020-fig2-type-1.jpg',
          alt: 'Toyonaga Type 1 lesion touching the appendiceal orifice (Oung 2020 Fig. 2)',
          caption: 'Fig. 2 Type 1',
          note: '原図 Fig. 2 の Type 1 から切り抜き。Endosc Int Open。ライセンスは CC BY-NC-ND 4.0。Jacob 2016 Endoscopy 原著は CC ではない。',
          aspectRatio: 228 / 218,
        }),
      ],
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
      figures: [
        oungCrop({
          src: '/figures/oung2020-fig2-type-2.jpg',
          alt: 'Toyonaga Type 2 partial invasion of the appendiceal orifice (Oung 2020 Fig. 2)',
          caption: 'Fig. 2 Type 2',
          note: '原図 Fig. 2 の Type 2 から切り抜き。Endosc Int Open。ライセンスは CC BY-NC-ND 4.0。Jacob 2016 Endoscopy 原著は CC ではない。',
          aspectRatio: 258 / 218,
        }),
      ],
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
      figures: [
        oungCrop({
          src: '/figures/oung2020-fig2-type-3.jpg',
          alt: 'Toyonaga Type 3 deep invasion of the appendiceal orifice (Oung 2020 Fig. 2)',
          caption: 'Fig. 2 Type 3',
          note: '原図 Fig. 2 の Type 3 から切り抜き。Endosc Int Open。ライセンスは CC BY-NC-ND 4.0。Jacob 2016 Endoscopy 原著は CC ではない。',
          aspectRatio: 312 / 210,
        }),
      ],
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
      figures: [
        oungCrop({
          src: '/figures/oung2020-fig2-type-3a.jpg',
          alt: 'Type 3a deep invasion at a previous appendectomy site (Oung 2020 Fig. 2)',
          caption: 'Fig. 2 Type 3a',
          note: '原図 Fig. 2 の Type 3a から切り抜き。Endosc Int Open。ライセンスは CC BY-NC-ND 4.0。Jacob 2016 Endoscopy 原著は CC ではない。',
          aspectRatio: 340 / 210,
        }),
      ],
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
