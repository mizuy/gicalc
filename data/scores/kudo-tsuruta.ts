import type { ClassificationDefinition, ClassificationFigure } from '../../types/score';

const PIT_PATTERN_USER_FIGURE_PATH = '/figures/pit-pattern-user2026-original.svg';

function userSchematicCrop(file: string, label: string, meaning: string): ClassificationFigure {
  return {
    src: `/figures/pit-pattern-user2026-${file}.webp`,
    href: PIT_PATTERN_USER_FIGURE_PATH,
    hrefLabel: 'Full schematic',
    isSecondarySource: true,
    alt: `Schematic of Kudo–Tsuruta pit pattern ${label}: ${meaning}`,
    caption: `${label}. ${meaning} (original schematic supplied for GI Calc)`,
    source: 'Original schematic created and supplied by a GI Calc project contributor, 2026.',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    note: `工藤–鶴田分類の原著図ではなく、提供者自作のCC参考図から${label}を抽出して高解像度化。`,
    aspectRatio: 1,
  };
}

export const kudoTsurutaScore: ClassificationDefinition = {
  id: 'kudo-tsuruta',
  kind: 'classification',
  name: '工藤–鶴田分類（pit pattern）',
  shortName: 'pit pattern',
  developedInJapan: true,
  organ: 'colorectum',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description: '大腸腫瘍の色素拡大 pit pattern 分類（I / II / IIIs / IIIL / IV / VI / VN）。',
  originalLead:
    'On the basis of stereomicroscopic appearances, pit patterns are classified into type I (round pit), type II (stellar or papillary pits), type IIIL (tubular or roundish pits larger than normal), type IIIS (tubular or roundish pits smaller than normal), type IV (branch-like or gyrus-like pits), and type V (irregular or non-structural pits). Type V was later subdivided into VI (irregular arrangement and sizes of type III and IV pits) and VN (loss or decrease of pits with an amorphous structure). Types I and II are non-neoplastic; types IIIL, IIIS and IV are adenomatous; types VI and VN are cancerous.',
  reference: 'Kudo S et al. Gastrointest Endosc 1996;44:8-14; Endoscopy 2001;33:367-373',
  pubmed: '8836710',
  figures: [
    {
      href: 'https://www.e-ce.org/journal/view.php?doi=10.5946/ce.2024.263#f4-ce-2024-263',
      hrefLabel: 'Fig. 4',
      alt: 'Kudo and Tsuruta pit pattern classification Types I, II, IIIs, IIIL, IV, VI, and VN',
      caption: 'Fig. 4. Kudo and Tsuruta pit pattern classification for colorectal neoplasia',
      source:
        'Kudo S, Tamura S, Nakajima T, et al. Diagnosis of colorectal tumorous lesions by magnifying endoscopy. Gastrointest Endosc. 1996;44:8-14. Figure as published in Kim OZ. Classification of image-enhanced endoscopy in colon tumors. Clin Endosc. 2025;58:337-351, Fig. 4 (adapted from Tanaka S et al. Dig Endosc. 2004;16:S161-S164).',
      doi: 'https://doi.org/10.5946/ce.2024.263',
      pubmed: '40336268',
      note: 'Type I–VN。原図 Tanaka 2004 Dig Endosc は CC ではないので埋め込まず、Clin Endosc 2025 Fig. 4（許諾再掲）へリンクする。',
    },
    {
      href: PIT_PATTERN_USER_FIGURE_PATH,
      hrefLabel: 'Full supplied schematic',
      isSecondarySource: true,
      alt: 'Original schematic of Kudo–Tsuruta pit patterns supplied for GI Calc',
      caption: 'Kudo–Tsuruta pit pattern Types I–VN — supplied original schematic',
      source: 'Original schematic created and supplied by a GI Calc project contributor, 2026.',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      note: '原著図ではない提供者自作のCC参考図。複合図自体は埋め込まず、各型へ分割してベクター要素から高解像度でラスタライズ。',
    },
  ],
  entries: [
    {
      label: 'Type I',
      meaning: 'Normal / inflammatory',
      group: '非腫瘍',
      severity: 'none',
      rows: [
        { heading: 'Pit', text: 'Round pit (normal pit); round and regular' },
        { heading: 'Histology', text: 'Normal glands or inflammatory mucosa' },
      ],
      figures: [userSchematicCrop('type-i', 'Type I', 'Normal / inflammatory')],
    },
    {
      label: 'Type II',
      meaning: 'Hyperplastic',
      group: '非腫瘍',
      severity: 'none',
      rows: [
        { heading: 'Pit', text: 'Asteroid pit; star-shaped or onion-like, larger than normal' },
        { heading: 'Histology', text: 'Hyperplastic polyp' },
      ],
      figures: [userSchematicCrop('type-ii', 'Type II', 'Hyperplastic')],
    },
    {
      label: 'Type IIIs',
      meaning: 'Adenoma / HGD / intramucosal ca',
      group: '腺腫',
      severity: 'moderate',
      rows: [
        {
          heading: 'Pit',
          text: 'Tubular or round pit that is smaller than the normal pit (Type I)',
        },
        {
          heading: 'Note',
          text: 'S stands for small or short. Compactly arranged. Typical of depressed tumors.',
        },
        {
          heading: 'Histology',
          text: 'Adenoma, high-grade dysplasia, or intramucosal cancer (de novo precursor)',
        },
      ],
      figures: [userSchematicCrop('type-iiis', 'Type IIIs', 'Adenoma / HGD / intramucosal ca')],
    },
    {
      label: 'Type IIIL',
      meaning: 'Tubular adenoma',
      group: '腺腫',
      severity: 'mild',
      rows: [
        {
          heading: 'Pit',
          text: 'Tubular or round pit that is larger than the normal pit (Type I)',
        },
        { heading: 'Note', text: 'L stands for long or large. Typical of polypoid tubular adenoma.' },
        { heading: 'Histology', text: 'Tubular adenoma' },
      ],
      figures: [userSchematicCrop('type-iiil', 'Type IIIL', 'Tubular adenoma')],
    },
    {
      label: 'Type IV',
      meaning: 'Tubulovillous adenoma',
      group: '腺腫',
      severity: 'mild',
      rows: [
        { heading: 'Pit', text: 'Dendritic or gyrus-like pit; branch-like' },
        { heading: 'Histology', text: 'Tubulovillous or villous adenoma; may include intramucosal cancer' },
      ],
      figures: [userSchematicCrop('type-iv', 'Type IV', 'Tubulovillous adenoma')],
    },
    {
      label: 'Type VI',
      meaning: 'Intramucosal / superficial SM ca',
      group: '癌',
      severity: 'moderate',
      rows: [
        {
          heading: 'Pit',
          text: 'Irregular arrangement and sizes of IIIS, IIIL, and IV type pit pattern',
        },
        { heading: 'Note', text: 'I stands for irregular (structural atypism).' },
        { heading: 'Histology', text: 'Intramucosal cancer or superficial submucosal invasive cancer' },
      ],
      figures: [userSchematicCrop('type-vi', 'Type VI', 'Intramucosal / superficial SM ca')],
    },
    {
      label: 'Type VN',
      meaning: 'Deep SM cancer',
      group: '癌',
      severity: 'severe',
      rows: [
        { heading: 'Pit', text: 'Loss or decrease of pits with an amorphous (non-structural) structure' },
        {
          heading: 'Note',
          text: 'N stands for non-structure. Exposes the desmoplastic reaction of deeply invasive SM cancer.',
        },
        { heading: 'Histology', text: 'Deep submucosal invasive cancer' },
      ],
      figures: [userSchematicCrop('type-vn', 'Type VN', 'Deep SM cancer')],
    },
  ],
};
