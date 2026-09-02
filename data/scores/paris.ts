import type { ClassificationDefinition } from '../../types/score';

/** 2003 Paris workshop (PMID 14652541) と 2005 update (PMID 15933932) */
export const PARIS_2003_PUBMED = '14652541';
export const PARIS_2005_PUBMED = '15933932';

export const parisScore: ClassificationDefinition = {
  id: 'paris',
  kind: 'classification',
  name: 'Paris分類（表在型腫瘍の肉眼型）',
  shortName: 'Paris',
  organ: 'colorectum',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '食道・胃・大腸の表在型腫瘍（粘膜〜粘膜下層まで）の内視鏡肉眼型。Type 0 を隆起（0-I）・平坦（0-II）・潰瘍（0-III）に分ける。0-Isp は 2003/2005 の表にはない。',
  originalLead:
    'Neoplastic lesions in the esophagus, stomach, and large bowel are called superficial when their endoscopic appearance suggests that invasion is limited to the mucosa and submucosa. Type 0 is divided into three categories: protruding (0-I), nonprotruding and nonexcavated (0-II), and excavated (0-III). Type 0-I is subdivided into pedunculated (0-Ip) and sessile (0-Is). Type 0-II is divided into slightly elevated (IIa), flat (IIb), or depressed (IIc). The distinction between a sessile (protruding) lesion and a slightly elevated (nonprotruding) lesion is based on the extent of the elevation from the adjacent mucosa. The cut-off limit is 2.5 mm in the columnar epithelium and 1.2 mm in the stratified epithelium of the esophagus.',
  reference:
    'The Paris endoscopic classification. Gastrointest Endosc 2003;58:S3-S43. Endoscopic Classification Review Group. Endoscopy 2005;37:570-578',
  pubmed: PARIS_2003_PUBMED,
  figures: [
    {
      src: '/figures/paris-ce2025-fig2.jpg',
      alt: 'Schematic of the Paris Type 0 classification (0-Ip, 0-Isp, 0-Is, 0-IIa, 0-IIb, 0-IIc, 0-III)',
      caption: 'Fig. 2. Schematic representation of the Paris classification of polyp morphology',
      source:
        'Kim OZ. Classification of image-enhanced endoscopy in colon tumors. Clin Endosc. 2025;58:337-351, Fig. 2 (adapted from Johnson GGRJ et al. Can J Surg. 2023;66:E491-E498). Original Type 0 definitions: Paris workshop, Gastrointest Endosc 2003;58:S3-S43, and Endoscopic Classification Review Group, Endoscopy 2005;37:570-578.',
      doi: 'https://doi.org/10.5946/ce.2024.263',
      pubmed: '40336268',
      note: '図の 0-Isp は日本語分類／後年の追加。2003/2005 の Paris 表は 0-Ip と 0-Is。図は Clin Endosc 2025 Fig. 2（Johnson 2023 より、CC）。',
      aspectRatio: 1566 / 815,
    },
  ],
  entries: [
    {
      label: '0-Ip',
      meaning: 'Pedunculated',
      group: '隆起型',
      severity: 'mild',
      rows: [
        { heading: 'Category', text: 'Protruding' },
        { heading: 'Morphology', text: 'Pedunculated' },
        {
          heading: 'Cut-off',
          text: 'Protruding vs slightly elevated: 2.5 mm (columnar epithelium; closed biopsy forceps) or 1.2 mm (esophageal squamous epithelium)',
        },
      ],
    },
    {
      label: '0-Is',
      meaning: 'Sessile',
      group: '隆起型',
      severity: 'moderate',
      rows: [
        { heading: 'Category', text: 'Protruding' },
        { heading: 'Morphology', text: 'Sessile' },
        {
          heading: 'Cut-off',
          text: 'Elevation from the adjacent mucosa is at least 2.5 mm in columnar epithelium (1.2 mm in the esophagus)',
        },
      ],
      comment: '大腸の無茎隆起は SM 浸潤が比較的多い（2005 年 Table 4: 大腸 0-Is 34%）。',
    },
    {
      label: '0-IIa',
      meaning: 'Slightly elevated',
      group: '平坦型',
      severity: 'mild',
      rows: [
        { heading: 'Category', text: 'Nonprotruding and nonexcavated' },
        { heading: 'Morphology', text: 'Slightly elevated' },
        {
          heading: 'Cut-off',
          text: 'Elevation less than 2.5 mm from the adjacent mucosa in columnar epithelium (less than 1.2 mm in the esophagus)',
        },
      ],
    },
    {
      label: '0-IIb',
      meaning: 'Completely flat',
      group: '平坦型',
      severity: 'none',
      rows: [
        { heading: 'Category', text: 'Nonprotruding and nonexcavated' },
        { heading: 'Morphology', text: 'Completely flat' },
      ],
      comment: '大腸ではきわめて稀。',
    },
    {
      label: '0-IIc',
      meaning: 'Slightly depressed',
      group: '平坦型',
      severity: 'severe',
      rows: [
        { heading: 'Category', text: 'Nonprotruding and nonexcavated' },
        { heading: 'Morphology', text: 'Slightly depressed' },
        {
          heading: 'Cut-off',
          text: 'Depression less deep than 1.2 mm in columnar epithelium (0.5 mm in esophageal squamous epithelium). Deeper lesions are excavated (0-III).',
        },
      ],
      comment: '陥凹は SM 浸潤リスクが高い（2005 年 Table 4: 大腸 0-IIc 61%）。',
    },
    {
      label: '0-IIc+IIa',
      meaning: 'Depressed + elevated rim',
      group: '平坦型',
      severity: 'severe',
      rows: [
        { heading: 'Category', text: 'Elevated and depressed types' },
        {
          heading: 'Morphology',
          text: 'Most of the surface is depressed; elevation is present in a segment of the lesion at the periphery',
        },
      ],
    },
    {
      label: '0-IIa+IIc',
      meaning: 'Elevated + central depression',
      group: '平坦型',
      severity: 'severe',
      rows: [
        { heading: 'Category', text: 'Elevated and depressed types' },
        {
          heading: 'Morphology',
          text: 'There is a central depression in a globally elevated lesion. The central depression is surrounded by an elevated ring.',
        },
        {
          heading: 'Note',
          text: 'When the level of the depression is higher than the mucosa adjacent to the lesion, it is a relatively depressed lesion.',
        },
      ],
    },
    {
      label: '0-III',
      meaning: 'Excavated (ulcer)',
      group: '潰瘍型',
      severity: 'severe',
      rows: [
        { heading: 'Category', text: 'Excavated' },
        { heading: 'Morphology', text: 'Ulcer' },
      ],
      comment: '大腸ではほとんど見ない。',
    },
    {
      label: '0-IIc+III',
      meaning: 'Depressed + central ulcer',
      group: '潰瘍型',
      severity: 'severe',
      rows: [
        { heading: 'Category', text: 'Excavated and depressed types' },
        { heading: 'Morphology', text: 'A depressed lesion with a central ulcer' },
      ],
    },
    {
      label: '0-III+IIc',
      meaning: 'Ulcer + depressed margin',
      group: '潰瘍型',
      severity: 'severe',
      rows: [
        { heading: 'Category', text: 'Excavated and depressed types' },
        { heading: 'Morphology', text: 'An ulcer with short depressed margins' },
      ],
    },
  ],
};
