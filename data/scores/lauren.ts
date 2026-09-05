import type { ClassificationDefinition } from '../../types/score';

/** Lauren P. Acta Pathol Microbiol Scand 1965 */
export const LAUREN_1965_PUBMED = '14300643';

export const laurenScore: ClassificationDefinition = {
  id: 'lauren',
  kind: 'classification',
  name: 'Lauren 分類（胃癌組織型）',
  shortName: 'Lauren',
  organ: 'stomach',
  category: 'classification',
  categoryLabel: '病理分類',
  description:
    '胃腺癌の病理組織型を intestinal（腸型）・diffuse（びまん型）・mixed（混合型）に分類します（Lauren 1965）。',
  originalLead:
    'Lauren classified gastric adenocarcinoma into intestinal type (glandular, tubular, or papillary structures; often linked to atrophic gastritis and intestinal metaplasia), diffuse type (poorly cohesive cells, signet-ring cells, no gland formation), and mixed type (substantial components of both intestinal and diffuse types). The classification reflects different epidemiology, precursors, and molecular pathways.',
  reference: 'Lauren P. Acta Pathol Microbiol Scand 1965;64:31-49',
  pubmed: LAUREN_1965_PUBMED,
  note: 'WHO 2019 胃腺癌でも Lauren 型は報告される。弥漫型は E-cadherin 異常などが多い。混合型は両成分が「相当量」ある場合。',
  figures: [
    {
      href: 'https://pubmed.ncbi.nlm.nih.gov/14300643/',
      hrefLabel: '1965 paper',
      alt: 'The two histological main types of gastric carcinoma',
      caption: 'Lauren P. The two histological main types of gastric carcinoma. Acta Pathol Microbiol Scand 1965',
      source: 'Lauren P. Acta Pathol Microbiol Scand. 1965;64:31-49.',
      pubmed: LAUREN_1965_PUBMED,
      note: '原著。CC ではないので PubMed へリンクする。',
    },
  ],
  entries: [
    {
      label: 'Intestinal',
      meaning: 'Intestinal type',
      group: 'Lauren',
      severity: 'moderate',
      rows: [
        {
          heading: 'Histology',
          text: 'Glandular, tubular, or papillary structures; cohesive cells forming glands',
        },
        {
          heading: 'Background',
          text: 'Often associated with atrophic gastritis and intestinal metaplasia (Correa pathway)',
        },
        { heading: 'Prognosis', text: 'Varies by stage; distinct molecular profile from diffuse type' },
      ],
    },
    {
      label: 'Diffuse',
      meaning: 'Diffuse type',
      group: 'Lauren',
      severity: 'severe',
      rows: [
        {
          heading: 'Histology',
          text: 'Poorly cohesive cells; signet-ring cells common; no gland formation',
        },
        { heading: 'Background', text: 'Not preceded by intestinal metaplasia in most cases' },
        { heading: 'Genetics', text: 'CDH1 (E-cadherin) loss common in hereditary and sporadic cases' },
      ],
      comment: 'びまん型は linitis plastica を呈することがある。',
    },
    {
      label: 'Mixed',
      meaning: 'Mixed type',
      group: 'Lauren',
      severity: 'moderate',
      rows: [
        {
          heading: 'Definition',
          text: 'Substantial components of both intestinal and diffuse types in the same tumour',
        },
        { heading: 'Reporting', text: 'Both components should be quantified when possible' },
      ],
    },
  ],
};
