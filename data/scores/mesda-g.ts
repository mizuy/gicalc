import type { ClassificationDefinition } from '../../types/score';

/** Muto 2016 Dig Endosc（PMID 26896760）。胃の拡大診断アルゴリズム。JNET / NICE とは別。 */
export const MESDA_G_2016_PUBMED = '26896760';

export const mesdaGScore: ClassificationDefinition = {
  id: 'mesda-g',
  kind: 'classification',
  name: 'MESDA-G（早期胃癌・拡大内視鏡）',
  shortName: 'MESDA-G',
  organ: 'stomach',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  toolKind: 'algorithm',
  description:
    '早期胃癌の拡大内視鏡（M-NBI）簡易診断アルゴリズム。白光で疑わしい病変を見つけ、境界線（DL）の有無のあと、DL内の不整微小血管（IMVP）および／または不整微小表面（IMSP）で癌／非癌を判定する。大腸の JNET / NICE とは別。胃専用。',
  originalLead:
    'To diagnose EGC, one has to identify any suspicious lesion that is potentially a neoplasm. To recognize such a lesion, we carefully observe the color change (whitish or reddish) or morphological change (elevated, flat, or depressed) on the gastric mucosal surface. If we detect a suspicious lesion, identification of a demarcation line (DL) between the lesion and the background mucosa is the first step in distinguishing EGC from a non-cancerous lesion. If a DL is absent, the diagnosis of a benign lesion may be made. If a DL is present, the subsequent presence of an irregular microvascular (MV) pattern and an irregular microsurface (MS) pattern should be determined. If irregular MV and/or MS patterns are present within the demarcation line, the diagnosis of EGC can be made.',
  reference: 'Muto M et al. Dig Endosc 2016;28:379-393',
  pubmed: MESDA_G_2016_PUBMED,
  figures: [
    {
      src: '/figures/mesda-g-muto2016-fig1.jpg',
      alt: 'MESDA-G algorithm: suspicious lesion, demarcation line, then irregular MV and/or MS (Muto 2016 Fig. 1)',
      caption: 'Fig. 1. Magnifying Endoscopy Simple Diagnostic Algorithm for Gastric cancer (MESDA-G)',
      source:
        'Muto M, Yao K, Kaise M, Kato M, Uedo N, Yagi K, Tajiri H. Magnifying endoscopy simple diagnostic algorithm for early gastric cancer (MESDA-G). Dig Endosc. 2016;28:379-393. Fig. 1.',
      doi: 'https://doi.org/10.1111/den.12638',
      pubmed: MESDA_G_2016_PUBMED,
      note: '原著 Fig. 1。胃の拡大診断アルゴリズム。JNET / NICE とは別。',
      aspectRatio: 1120 / 1180,
    },
    {
      src: '/figures/mesda-g-muto2016-fig13.jpg',
      alt: 'VS classification: microvascular and microsurface patterns regular, irregular, or absent (Muto 2016 Fig. 13)',
      caption: 'Fig. 13. Vessels plus surface (VS) classification',
      source: 'Muto M, Yao K, Kaise M, et al. Dig Endosc. 2016;28:379-393. Fig. 13.',
      doi: 'https://doi.org/10.1111/den.12638',
      pubmed: MESDA_G_2016_PUBMED,
      note: '原著 Fig. 13。微小血管（V）と微小表面（S）を regular / irregular / absent に分ける。矢印は境界線（DL）。',
      aspectRatio: 2280 / 1550,
    },
  ],
  entries: [
    {
      label: 'Suspicious lesion',
      meaning: 'Identify on WLI',
      group: 'アルゴリズム',
      severity: 'mild',
      rows: [
        {
          heading: 'Color',
          text: 'Whitish or reddish color change; mucosal discoloration (erythema or pallor).',
        },
        {
          heading: 'Morphology',
          text: 'Elevated, flat, or depressed change; tapered or interrupted mucosal folds.',
        },
        {
          heading: 'Other clues',
          text: 'Spontaneous bleeding, localized opacity of the mucosa, or loss of mucosal glossiness.',
        },
      ],
      comment: '白光で色調・形態の微細な変化を探す。胃専用。大腸の JNET / NICE とは別。',
    },
    {
      label: 'Demarcation line (DL)',
      meaning: 'First step',
      group: 'アルゴリズム',
      severity: 'mild',
      rows: [
        {
          heading: 'Definition',
          text: 'A border between the lesion and non-lesion areas, discernible through an abrupt change in MV and/or MS patterns.',
        },
        {
          heading: 'Order',
          text: 'Identification of a DL is the first step in distinguishing EGC from a non-cancerous lesion.',
        },
      ],
      comment: '境界線がなければ非癌。あれば DL 内の微小血管と微小表面を別々に評価する。',
    },
    {
      label: 'DL absent',
      meaning: 'Non-cancer',
      group: '判定',
      severity: 'none',
      rows: [
        {
          heading: 'Diagnosis',
          text: 'If a DL is absent, the diagnosis of a benign lesion may be made.',
        },
      ],
    },
    {
      label: 'Regular MV and MS within DL',
      meaning: 'Non-cancer',
      group: '判定',
      severity: 'none',
      rows: [
        {
          heading: 'Diagnosis',
          text: 'Inside the demarcation line, there are regular microvascular and regular microsurface patterns. Because neither an irregular microvascular nor irregular microsurface pattern is present, this lesion can be diagnosed as non-cancer.',
        },
      ],
    },
    {
      label: 'Irregular MV and/or MS within DL',
      meaning: 'EGC',
      group: '判定',
      severity: 'severe',
      rows: [
        {
          heading: 'Criteria',
          text: '(i) an irregular MV pattern with a DL; and/or (ii) an irregular MS pattern with a DL.',
        },
        {
          heading: 'Diagnosis',
          text: 'If irregular MV and/or MS patterns are present within the demarcation line, the diagnosis of EGC can be made.',
        },
      ],
      comment:
        '原著では EGC の 97% がこの基準に合う。未分化型（びまん型）の診断能は原著でも不明。接触出血や粘液で像が取れないときは観察を丁寧に。',
    },
    {
      label: 'Regular MV',
      meaning: 'Regular',
      group: 'VS分類・微小血管',
      severity: 'none',
      rows: [
        {
          heading: 'MV',
          text: 'Mucosal capillaries have a uniform shape that can be closed-looped (polygonal) or open-looped with a homogeneous morphology, a symmetrical distribution, and a regular arrangement.',
        },
      ],
    },
    {
      label: 'Irregular MV',
      meaning: 'Irregular',
      group: 'VS分類・微小血管',
      severity: 'severe',
      rows: [
        {
          heading: 'MV',
          text: 'The vessels are closed-looped (polygonal), open-looped, tortuous, branched, or bizarrely shaped, have asymmetrical distribution and irregular arrangements.',
        },
        {
          heading: 'Morphology',
          text: 'Cancer-specific morphology of irregular microvessels has been described as dilation, heterogeneity in shape, abrupt caliber alteration, and tortuousness.',
        },
      ],
      comment:
        '後年の細分類として fine-network（分化型）と corkscrew（未分化型）があるが、MESDA-G 本体の分岐ではない。',
    },
    {
      label: 'Absent MV',
      meaning: 'Absent',
      group: 'VS分類・微小血管',
      severity: 'mild',
      rows: [
        {
          heading: 'MV',
          text: 'If a MV pattern is not fully visualized because of the presence of a white opaque substance (WOS) which obscures subepithelial microvessels, the MV pattern is described as absent.',
        },
        {
          heading: 'WOS',
          text: 'In cases in which the WOS is observed, rather than assessing the MVP, morphological analysis of the WOS could be an alternative marker of MS pattern.',
        },
      ],
      comment: '白濁物質（WOS）で血管が見えないときは、WOS の形態を微小表面の代替指標にする。',
    },
    {
      label: 'Regular MS',
      meaning: 'Regular',
      group: 'VS分類・微小表面',
      severity: 'none',
      rows: [
        {
          heading: 'MS',
          text: 'The MCE/WZ is a uniform linear, curved, oval, or circular structure with homogeneous morphology, symmetrical distribution, and regular arrangement.',
        },
      ],
    },
    {
      label: 'Irregular MS',
      meaning: 'Irregular',
      group: 'VS分類・微小表面',
      severity: 'severe',
      rows: [
        {
          heading: 'MS',
          text: 'The MCE/WZ is an irregular linear, curved, oval, circular, or villous structure with heterogeneous morphology, asymmetrical distribution, and irregular arrangement.',
        },
      ],
    },
    {
      label: 'Absent MS',
      meaning: 'Absent',
      group: 'VS分類・微小表面',
      severity: 'mild',
      rows: [
        {
          heading: 'MS',
          text: 'If neither the MCE/WZ is visible by ME, the MS pattern is classified as absent.',
        },
      ],
    },
  ],
};
