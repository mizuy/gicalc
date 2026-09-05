import type { ClassificationDefinition } from '../../types/score';

/** Klimstra DS et al. — WHO 2019 endocrine tumours */
export const WHO_NET_2019_PUBMED = '31046179';

export const netGradeScore: ClassificationDefinition = {
  id: 'net-grade',
  kind: 'classification',
  name: 'WHO 2019 消化管 NET 分類（G1–G3）',
  shortName: 'NET G1–G3',
  organ: 'stomach',
  category: 'classification',
  categoryLabel: '病理分類',
  description:
    '胃・腸・膵の well-differentiated neuroendocrine tumour (NET) を Ki-67 指数と核分裂像で G1–G3 に分類します（WHO 2019）。',
  originalLead:
    'The WHO 2019 classification grades well-differentiated gastroenteropancreatic neuroendocrine tumours (NETs) by mitotic count and Ki-67 proliferation index. G1: mitotic count <2 per 2 mm² and Ki-67 index <3%. G2: mitotic count 2–20 per 2 mm² or Ki-67 index 3–20%. G3: mitotic count >20 per 2 mm² or Ki-67 index >20%. Poorly differentiated neuroendocrine carcinoma (NEC) is high-grade by definition (G3) but is a separate entity from well-differentiated NET G3. Grade is based on the higher value when mitotic count and Ki-67 disagree.',
  reference:
    'WHO Classification of Tumours: Endocrine and Neuroendocrine Tumours, 5th ed, 2019 / Klimstra DS et al.',
  pubmed: WHO_NET_2019_PUBMED,
  note: 'NET G3 と NEC（ poorly differentiated ）は別カテゴリ。NEC は small/large cell 型。機能性・非機能性は grade とは独立。',
  figures: [
    {
      href: 'https://tumourclassification.iarc.who.int/chapters/05',
      hrefLabel: 'WHO Blue Book',
      alt: 'WHO Classification of Tumours: Endocrine and Neuroendocrine Tumours, 5th edition',
      caption: 'WHO Classification of Tumours: Endocrine and Neuroendocrine Tumours (5th ed, 2019)',
      source: 'WHO Classification of Tumours Editorial Board. Endocrine and Neuroendocrine Tumours. Lyon: IARC; 2019.',
      note: 'IARC WHO Blue Book。CC ではないのでリンクのみ。',
    },
  ],
  entries: [
    {
      label: 'G1',
      meaning: 'Grade 1 (low)',
      group: 'NET',
      severity: 'mild',
      rows: [
        { heading: 'Mitotic count', text: '<2 per 2 mm²' },
        { heading: 'Ki-67 index', text: '<3%' },
        { heading: 'Clinical', text: 'Indolent; endoscopic or local resection often considered for small lesions' },
      ],
    },
    {
      label: 'G2',
      meaning: 'Grade 2 (intermediate)',
      group: 'NET',
      severity: 'moderate',
      rows: [
        { heading: 'Mitotic count', text: '2–20 per 2 mm²' },
        { heading: 'Ki-67 index', text: '3–20%' },
        { heading: 'Clinical', text: 'Intermediate behaviour; resection and surveillance per organ-specific guidelines' },
      ],
    },
    {
      label: 'G3',
      meaning: 'Grade 3 NET (well-differentiated)',
      group: 'NET',
      severity: 'severe',
      rows: [
        { heading: 'Mitotic count', text: '>20 per 2 mm²' },
        { heading: 'Ki-67 index', text: '>20%' },
        { heading: 'Differentiation', text: 'Well-differentiated NET G3 (not NEC)' },
        { heading: 'Clinical', text: 'More aggressive than G1/G2; systemic therapy may be considered' },
      ],
      comment: 'Poorly differentiated NEC も G3 相当だが、NET G3 とは別エンティティとして扱う。',
    },
    {
      label: 'NEC',
      meaning: 'Neuroendocrine carcinoma (reference)',
      group: 'NEC',
      severity: 'severe',
      rows: [
        { heading: 'Definition', text: 'Poorly differentiated neuroendocrine carcinoma (small cell or large cell type)' },
        { heading: 'Grade', text: 'High grade (G3) by definition' },
        { heading: 'Note', text: 'Separate from well-differentiated NET G3 in WHO 2019' },
      ],
    },
    {
      label: 'Rule',
      meaning: 'Grading rule',
      group: 'NET',
      severity: 'none',
      rows: [
        {
          heading: 'Discordance',
          text: 'When mitotic count and Ki-67 fall in different grades, assign the higher grade',
        },
        { heading: 'Counting', text: 'Mitotic count in 2 mm² (40×, 0.2 mm² fields); Ki-67 on ≥500–2000 cells' },
      ],
    },
  ],
};
