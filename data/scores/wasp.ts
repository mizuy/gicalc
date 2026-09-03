import type { ClassificationDefinition } from '../../types/score';

/** IJspeert 2016 Gut（PMID 25753029） */
export const WASP_2016_PUBMED = '25753029';

export const waspScore: ClassificationDefinition = {
  id: 'wasp',
  kind: 'classification',
  name: 'WASP分類（HP / SSL / 腺腫）',
  shortName: 'WASP',
  organ: 'colorectum',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '10 mm 未満の大腸ポリープを、NICE のあと Hazewinkel の SSL 所見で HP / SSL / 腺腫に分ける。NICE とも JNET とも別の分類です。',
  originalLead:
    'The WASP classification combines the NICE classification and the Hazewinkel criteria in a stepwise approach for optical diagnosis of adenomas, hyperplastic polyps and SSA/Ps <10 mm. First the NICE criteria are used: type 1 versus type 2. NICE type 1/2 features are (1) a darker colour than the surrounding mucosa, (2) prominent brown vessels or (3) an oval, tubular or branched surface pattern. Subsequently the diagnostic criteria for SSA/Ps described by Hazewinkel et al. are used to differentiate SSA/Ps from hyperplastic polyps for type 1 polyps, and SSA/Ps from adenomas for type 2 polyps. The presence of at least two SSA/P-like features is considered sufficient to diagnose an SSA/P. SSA/P-like features are (1) a clouded surface, (2) indistinctive borders, (3) irregular shape and (4) dark spots inside the crypts.',
  reference: 'IJspeert JEG et al. Gut 2016;65:963-970',
  pubmed: WASP_2016_PUBMED,
  figures: [
    {
      href: 'https://gut.bmj.com/content/65/6/963#F1',
      hrefLabel: 'Fig. 1',
      alt: 'WASP classification stepwise diagram (IJspeert 2016 Fig. 1)',
      caption: 'Fig. 1. The WASP classification: NICE criteria then Hazewinkel criteria',
      source:
        'IJspeert JEG, Bastiaansen BAJ, van Leerdam ME, et al. Development and validation of the WASP classification system for optical diagnosis of adenomas, hyperplastic polyps and sessile serrated adenomas/polyps. Gut. 2016;65:963-970. Fig. 1.',
      doi: 'https://doi.org/10.1136/gutjnl-2014-308411',
      pubmed: WASP_2016_PUBMED,
      note: '原著 Fig. 1。BMJ / Gut の著作権。CC ではないので画像は置かず、論文の Fig. 1 へリンクする。NICE とも JNET とも別分類。',
    },
  ],
  entries: [
    {
      label: 'Step 1 · NICE',
      meaning: 'Type 1 vs Type 2',
      group: '手順',
      severity: 'none',
      rows: [
        {
          heading: 'Type 2 features',
          text: '(1) a darker colour than the surrounding mucosa, (2) prominent brown vessels or (3) an oval, tubular or branched surface pattern',
        },
        { heading: 'Type 1', text: 'NICE type 2 features are not present' },
        { heading: 'Type 2', text: 'NICE type 2 features are present' },
      ],
      comment: 'NICE 本体とは別の分類。NICE Type 1 には SSL が含まれない、という限界を補う。',
    },
    {
      label: 'Step 2 · SSL features',
      meaning: 'Hazewinkel criteria',
      group: '手順',
      severity: 'mild',
      rows: [
        {
          heading: 'Features',
          text: '(1) a clouded surface, (2) indistinctive borders, (3) irregular shape and (4) dark spots inside the crypts',
        },
        {
          heading: 'Threshold',
          text: 'The presence of at least two SSA/P-like features is considered sufficient to diagnose an SSA/P',
        },
      ],
    },
    {
      label: 'Type 1 + <2 SSL features',
      meaning: 'Hyperplastic polyp',
      group: '判定',
      severity: 'none',
      rows: [
        { heading: 'Pathway', text: 'NICE type 1, then fewer than two SSA/P-like features' },
        { heading: 'Diagnosis', text: 'Hyperplastic polyp' },
      ],
    },
    {
      label: 'Type 1 + ≥2 SSL features',
      meaning: 'SSA/P',
      group: '判定',
      severity: 'moderate',
      rows: [
        { heading: 'Pathway', text: 'NICE type 1, then at least two SSA/P-like features' },
        { heading: 'Diagnosis', text: 'Sessile serrated adenoma/polyp (SSA/P)' },
      ],
    },
    {
      label: 'Type 2 + <2 SSL features',
      meaning: 'Adenoma',
      group: '判定',
      severity: 'mild',
      rows: [
        { heading: 'Pathway', text: 'NICE type 2, then fewer than two SSA/P-like features' },
        { heading: 'Diagnosis', text: 'Adenoma' },
      ],
    },
    {
      label: 'Type 2 + ≥2 SSL features',
      meaning: 'SSA/P',
      group: '判定',
      severity: 'moderate',
      rows: [
        { heading: 'Pathway', text: 'NICE type 2, then at least two SSA/P-like features' },
        { heading: 'Diagnosis', text: 'Sessile serrated adenoma/polyp (SSA/P)' },
      ],
    },
  ],
};
