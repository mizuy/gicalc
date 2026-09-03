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
  flow: {
    title: 'アルゴリズム',
    start: 'nice',
    steps: {
      nice: {
        id: 'nice',
        prompt: 'NICE は Type 1 と Type 2 のどちらですか',
        hint: 'Type 2 所見: (1) 周囲粘膜より暗い、(2) 目立つ褐色血管、(3) 楕円・管状・分枝の表面構造。どれかが当てはまれば Type 2。なければ Type 1。',
        options: [
          { id: 'type1', label: 'Type 1', next: 'ssl1' },
          { id: 'type2', label: 'Type 2', next: 'ssl2' },
        ],
      },
      ssl1: {
        id: 'ssl1',
        prompt: 'Hazewinkel の SSL 所見はいくつありますか',
        hint: '(1) 雲状の表面、(2) 不明瞭な辺縁、(3) 不整な形、(4) 腺窩内の暗点。2つ以上あれば SSA/P。',
        options: [
          { id: 'lt2', label: '<2 所見', next: 'hp' },
          { id: 'gte2', label: '≥2 所見', next: 'ssap1' },
        ],
      },
      ssl2: {
        id: 'ssl2',
        prompt: 'Hazewinkel の SSL 所見はいくつありますか',
        hint: '(1) 雲状の表面、(2) 不明瞭な辺縁、(3) 不整な形、(4) 腺窩内の暗点。2つ以上あれば SSA/P。',
        options: [
          { id: 'lt2', label: '<2 所見', next: 'adenoma' },
          { id: 'gte2', label: '≥2 所見', next: 'ssap2' },
        ],
      },
    },
    results: {
      hp: { id: 'hp', entryLabel: 'Type 1 + <2 SSL features' },
      ssap1: { id: 'ssap1', entryLabel: 'Type 1 + ≥2 SSL features' },
      adenoma: { id: 'adenoma', entryLabel: 'Type 2 + <2 SSL features' },
      ssap2: { id: 'ssap2', entryLabel: 'Type 2 + ≥2 SSL features' },
    },
    map: {
      id: 'start',
      label: 'Polyp <10 mm',
      children: [
        {
          id: 'nice-gate',
          label: 'NICE',
          stepId: 'nice',
          children: [
            {
              id: 'type1',
              label: 'Type 1',
              stepId: 'nice',
              optionId: 'type1',
              children: [
                {
                  id: 'ssl-1',
                  label: 'SSA/P-like features',
                  stepId: 'ssl1',
                  children: [
                    {
                      id: 'hp-opt',
                      label: '<2',
                      stepId: 'ssl1',
                      optionId: 'lt2',
                      children: [{ id: 'hp', label: 'Hyperplastic polyp', resultId: 'hp' }],
                    },
                    {
                      id: 'ssap1-opt',
                      label: '≥2',
                      stepId: 'ssl1',
                      optionId: 'gte2',
                      children: [{ id: 'ssap1', label: 'SSA/P', resultId: 'ssap1' }],
                    },
                  ],
                },
              ],
            },
            {
              id: 'type2',
              label: 'Type 2',
              stepId: 'nice',
              optionId: 'type2',
              children: [
                {
                  id: 'ssl-2',
                  label: 'SSA/P-like features',
                  stepId: 'ssl2',
                  children: [
                    {
                      id: 'adenoma-opt',
                      label: '<2',
                      stepId: 'ssl2',
                      optionId: 'lt2',
                      children: [{ id: 'adenoma', label: 'Adenoma', resultId: 'adenoma' }],
                    },
                    {
                      id: 'ssap2-opt',
                      label: '≥2',
                      stepId: 'ssl2',
                      optionId: 'gte2',
                      children: [{ id: 'ssap2', label: 'SSA/P', resultId: 'ssap2' }],
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
