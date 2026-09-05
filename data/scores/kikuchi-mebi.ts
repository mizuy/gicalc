import type { ClassificationDefinition } from '../../types/score';

/** Kikuchi 2014 Dig Endosc（PMID 24750143）。SNADET の ME-NBI アルゴリズム */
export const KIKUCHI_2014_PUBMED = '24750143';

export const kikuchiMebiScore: ClassificationDefinition = {
  id: 'kikuchi-mebi',
  kind: 'classification',
  name: 'Kikuchi ME-NBI（SNADET）',
  shortName: 'Kikuchi ME-NBI',
  developedInJapan: true,
  toolKind: 'algorithm',
  organ: 'duodenum',
  category: 'classification',
  categoryLabel: 'SNADET',
  description:
    '表在型非乳頭部十二指腸上皮性腫瘍（SNADET）の ME-NBI アルゴリズム（Kikuchi 2014）。表面が単一（monotype）か複数（mixed）かを分け、monotype では血管パターン（network / ISV / absent / unclassified）で Vienna C3 と C4/5 を推定する。ME-CV は Toya 2020。',
  originalLead:
    'Lesions displaying a single surface pattern were classified as monotype, and those displaying multiple surface patterns as mixed type. Surface pattern was classified as preserved, micrified, or absent. Vascular pattern was classified as absent, network, intrastructural vascular (ISV), or unclassified (dilated, tortuous, or irregular vessels). According to the revised Vienna classification, 100% of mixed-type lesions were category 4/5 tumors. In monotype lesions, unclassified vascular pattern was 100% category 4/5; ISV was 64.3% category 4/5; absent was 33.3% category 4/5; network was 25.0% category 4/5 (all network-pattern monotypes were category 3 in this series).',
  reference: 'Kikuchi D et al. Dig Endosc 2014;26(Suppl 2):16-22',
  pubmed: KIKUCHI_2014_PUBMED,
  note: 'ME-NBI 専用。Toya 2020 は ME-CV（クリスタルバイオレット）で別アルゴリズム。WOS で血管が見えにくい場合は表面構造を優先する。単施設後ろ向き。',
  figures: [
    {
      href: 'https://onlinelibrary.wiley.com/doi/10.1111/den.12282',
      hrefLabel: 'Kikuchi 2014',
      alt: 'Kikuchi ME-NBI diagnostic algorithm for SNADET (Fig. 10)',
      caption: 'Fig. 10. Diagnostic algorithm of ME-NBI for SNADET',
      source:
        'Kikuchi D, Hoteya S, Iizuka T, Kimura R, Kaise M. Diagnostic algorithm of magnifying endoscopy with narrow band imaging for superficial non-ampullary duodenal epithelial tumors. Dig Endosc. 2014;26(Suppl 2):16-22. Fig. 10.',
      doi: 'https://doi.org/10.1111/den.12282',
      pubmed: KIKUCHI_2014_PUBMED,
      note: '原著 Fig. 10。Wiley / Digestive Endoscopy の著作権。CC ではないので論文へリンクする。',
    },
  ],
  entries: [
    {
      label: 'Mixed type',
      meaning: 'Multiple surface patterns',
      group: '表面',
      severity: 'severe',
      rows: [
        { heading: 'Definition', text: 'Lesions displaying multiple surface patterns (multiplicity)' },
        { heading: 'Vienna', text: 'Category 4/5 (100% in Kikuchi 2014 series)' },
      ],
      comment: '複数表面パターン混在は C4/5。',
    },
    {
      label: 'Monotype',
      meaning: 'Single surface pattern',
      group: '表面',
      severity: 'none',
      rows: [
        { heading: 'Definition', text: 'Lesions displaying a single surface pattern' },
        {
          heading: 'Surface detail',
          text: 'Preserved, micrified, or absent mucosal structure (see vascular pattern next)',
        },
      ],
    },
    {
      label: 'Unclassified vessels',
      meaning: 'Unclassified vascular pattern',
      group: '血管',
      severity: 'severe',
      rows: [
        {
          heading: 'Definition',
          text: 'Dilated, tortuous, or irregular vessels; patterns other than absent, network, or ISV',
        },
        { heading: 'Vienna', text: 'Category 4/5' },
      ],
      comment: 'monotype でも unclassified 血管は C4/5。',
    },
    {
      label: 'ISV',
      meaning: 'Intrastructural vascular pattern',
      group: '血管',
      severity: 'severe',
      rows: [
        {
          heading: 'Definition',
          text: 'Dilated or tortuous vessels within the mucosal structure',
        },
        { heading: 'Vienna', text: 'Category 4/5 likely (64.3% in series)' },
      ],
    },
    {
      label: 'Network',
      meaning: 'Network vascular pattern',
      group: '血管',
      severity: 'mild',
      rows: [
        { heading: 'Definition', text: 'Regular network microvessels' },
        { heading: 'Vienna', text: 'Category 3 (all network monotypes were C3 in series)' },
      ],
      comment: '整った network は C3 寄り。表面 absent でも network なら C3 の報告あり。',
    },
    {
      label: 'Absent vessels',
      meaning: 'Absent vascular pattern',
      group: '血管',
      severity: 'mild',
      rows: [
        { heading: 'Definition', text: 'No microvessels visible across a wide area' },
        { heading: 'Vienna', text: 'Category 3 likely (33% were C4/5 in series)' },
      ],
      comment: '一部 C4/5 あり。生検で確定。',
    },
  ],
  flow: {
    title: 'アルゴリズム',
    start: 'surface',
    steps: {
      surface: {
        id: 'surface',
        prompt: '表面構造は単一ですか、複数ですか',
        hint: 'ME-NBI。単一 = monotype。複数 = mixed / multiplicity。',
        options: [
          { id: 'mixed', label: '複数（mixed）', next: 'c45-mixed' },
          { id: 'mono', label: '単一（monotype）', next: 'vessels' },
        ],
      },
      vessels: {
        id: 'vessels',
        prompt: '血管パターンはどれですか',
        hint: 'unclassified / ISV → C4/5。network → C3。absent → C3 寄り（一部 C4/5）。',
        options: [
          { id: 'unclassified', label: 'Unclassified', next: 'c45-uncl' },
          { id: 'isv', label: 'ISV', next: 'c45-isv' },
          { id: 'network', label: 'Network', next: 'c3-net' },
          { id: 'absent', label: 'Absent', next: 'c3-abs' },
        ],
      },
    },
    results: {
      'c45-mixed': { id: 'c45-mixed', entryLabel: 'Mixed type' },
      'c45-uncl': { id: 'c45-uncl', entryLabel: 'Unclassified vessels' },
      'c45-isv': { id: 'c45-isv', entryLabel: 'ISV' },
      'c3-net': { id: 'c3-net', entryLabel: 'Network' },
      'c3-abs': { id: 'c3-abs', entryLabel: 'Absent vessels' },
    },
    map: {
      id: 'start',
      label: 'SNADET · ME-NBI',
      children: [
        {
          id: 'surface-gate',
          label: 'Surface type',
          stepId: 'surface',
          children: [
            {
              id: 'mixed',
              label: 'Mixed',
              stepId: 'surface',
              optionId: 'mixed',
              children: [{ id: 'c45-mixed', label: 'C4/5', resultId: 'c45-mixed' }],
            },
            {
              id: 'mono',
              label: 'Monotype',
              stepId: 'surface',
              optionId: 'mono',
              children: [
                {
                  id: 'vessel-gate',
                  label: 'Vessels',
                  stepId: 'vessels',
                  children: [
                    {
                      id: 'uncl-opt',
                      label: 'Unclassified',
                      stepId: 'vessels',
                      optionId: 'unclassified',
                      children: [{ id: 'c45-uncl', label: 'C4/5', resultId: 'c45-uncl' }],
                    },
                    {
                      id: 'isv-opt',
                      label: 'ISV',
                      stepId: 'vessels',
                      optionId: 'isv',
                      children: [{ id: 'c45-isv', label: 'C4/5', resultId: 'c45-isv' }],
                    },
                    {
                      id: 'net-opt',
                      label: 'Network',
                      stepId: 'vessels',
                      optionId: 'network',
                      children: [{ id: 'c3-net', label: 'C3', resultId: 'c3-net' }],
                    },
                    {
                      id: 'abs-opt',
                      label: 'Absent',
                      stepId: 'vessels',
                      optionId: 'absent',
                      children: [{ id: 'c3-abs', label: 'C3', resultId: 'c3-abs' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
