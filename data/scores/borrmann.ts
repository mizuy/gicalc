import type { ClassificationDefinition } from '../../types/score';

/** JGCA. Gastric Cancer 2011;14:101-112. English 3rd ed. */
export const BORRMANN_JGCA_2011_PUBMED = '21573743';

export const borrmannScore: ClassificationDefinition = {
  id: 'borrmann',
  kind: 'classification',
  name: 'Borrmann分類（進行胃癌の肉眼型）',
  shortName: 'Borrmann',
  organ: 'stomach',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '進行胃癌の肉眼型 I–IV。I は腫瘤、II は限局潰瘍、III は浸潤潰瘍、IV はびまん浸潤。日本の規約の 5 型（分類不能）は原著にはない。表在型（0 型）は Paris / 規約 0 型。',
  originalLead:
    'Borrmann classified advanced gastric carcinoma by macroscopic appearance into four types. Type I: polypoid or fungating mass. Type II: ulcerated carcinoma with sharp, raised margins. Type III: ulcerated carcinoma with infiltration into the surrounding wall. Type IV: diffuse infiltrative growth (linitis plastica when the entire stomach is involved). Japanese classification adds Type 5 for unclassifiable tumours; Type 5 is not in the 1926 original.',
  citations: [
    {
      role: 'original',
      text: 'Borrmann R. Geschwülste des Magens und Duodenums. In: Henke F, Lubarsch O, eds. Handbuch der speziellen pathologischen Anatomie und Histologie. Vol. IV/1. Berlin: Springer; 1926. p. 812-1054',
    },
    {
      role: 'japanese-reference',
      text: 'JGCA. Gastric Cancer 2011;14:101-112 (3rd English ed.)',
      pubmed: BORRMANN_JGCA_2011_PUBMED,
    },
  ],
  pubmed: BORRMANN_JGCA_2011_PUBMED,
  figures: [
    {
      href: 'https://pubmed.ncbi.nlm.nih.gov/21573743/',
      hrefLabel: '2011 paper',
      figureKind: 'original',
      sourceShort: 'JGCA 2011',
      alt: 'Japanese classification of gastric carcinoma macroscopic types 1–5',
      caption: 'JGCA. Japanese classification of gastric carcinoma: 3rd English edition. Gastric Cancer 2011',
      source:
        'Japanese Gastric Cancer Association. Japanese classification of gastric carcinoma: 3rd English edition. Gastric Cancer. 2011;14:101-112. Original types: Borrmann R. In: Henke F, Lubarsch O, eds. Handbuch der speziellen pathologischen Anatomie und Histologie. 1926.',
      doi: 'https://doi.org/10.1007/s10120-011-0041-5',
      pubmed: BORRMANN_JGCA_2011_PUBMED,
      note: '規約英語第3版。Springer。1926 年原著も CC ではない。画像は埋め込まず、PubMed へリンクする。',
    },
  ],
  entries: [
    {
      label: 'Type 1',
      meaning: 'Polypoid / fungating',
      group: 'Borrmann',
      severity: 'moderate',
      rows: [
        {
          heading: 'Appearance',
          text: 'Polypoid or fungating mass protruding into the lumen',
        },
      ],
    },
    {
      label: 'Type 2',
      meaning: 'Ulcerative, sharp margins',
      group: 'Borrmann',
      severity: 'moderate',
      rows: [
        {
          heading: 'Appearance',
          text: 'Ulcerated carcinoma with sharp, raised margins and no definite infiltration at the ulcer edge',
        },
      ],
    },
    {
      label: 'Type 3',
      meaning: 'Infiltrative ulcerative',
      group: 'Borrmann',
      severity: 'severe',
      rows: [
        {
          heading: 'Appearance',
          text: 'Ulcerated carcinoma with infiltration into the surrounding gastric wall',
        },
      ],
    },
    {
      label: 'Type 4',
      meaning: 'Diffuse / linitis plastica',
      group: 'Borrmann',
      severity: 'severe',
      rows: [
        {
          heading: 'Appearance',
          text: 'Diffuse infiltrative growth. When the entire stomach is involved this is linitis plastica',
        },
      ],
      comment: 'びまん型（Lauren）と重なることが多いが、肉眼型と組織型は別。',
    },
    {
      label: 'Type 5',
      meaning: 'Unclassifiable',
      group: '規約',
      severity: 'none',
      rows: [
        {
          heading: 'JGCA',
          text: 'Unclassifiable advanced carcinoma that cannot be placed in Types 1–4',
        },
        {
          heading: 'Original',
          text: 'Not part of Borrmann 1926 (Types I–IV only)',
        },
      ],
      comment: '日本の規約の分類不能型。原著にはない。',
    },
    {
      label: 'Assessment',
      meaning: 'Advanced vs Type 0',
      group: '判定',
      severity: 'none',
      rows: [
        {
          heading: 'Scope',
          text: 'Advanced (T2 or deeper) gastric carcinoma. Superficial Type 0 is Paris / Japanese Type 0, not Borrmann',
        },
        {
          heading: 'Yamada',
          text: 'Yamada I–IV is for elevated lesions (often early). Do not interchange with Borrmann I–IV',
        },
      ],
    },
  ],
};
