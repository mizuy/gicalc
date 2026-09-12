import type { ClassificationDefinition, ClassificationFigure } from '../../types/score';

const PIT_PATTERN_USER_FIGURE_PATH = '/figures/pit-pattern-gemini2.svg';

function userSchematicCrop(file: string, label: string, meaning: string): ClassificationFigure {
  return {
    src: `/figures/pit-pattern-gemini2-${file}.webp`,
    href: PIT_PATTERN_USER_FIGURE_PATH,
    hrefLabel: 'Full schematic',
    figureKind: 'gicalc',
    sourceShort: 'GI Calc',
    alt: `Schematic of Kudo–Tsuruta pit pattern ${label}: ${meaning}`,
    caption: `${label}. ${meaning} (original schematic supplied for GI Calc)`,
    source: 'GI Calc original schematic, 2026.',
    license: 'CC BY 4.0',
    note: `工藤–鶴田分類の原著図ではなく、提供されたGemini生成SVGから${label}を抽出して高解像度化。`,
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
  description:
    '大腸腫瘍の色素拡大 pit pattern 分類（I / II / IIIs / IIIL / IV / VI mild / VI severe / VN）。V 型の VI / VN 境界は 2004 箱根合意で統一。VI は軽度不整と高度不整に分けて示す。',
  originalLead:
    'On the basis of stereomicroscopic appearances, pit patterns are classified into type I (round pit), type II (stellar or papillary pits), type IIIL (tubular or roundish pits larger than normal), type IIIS (tubular or roundish pits smaller than normal), type IV (branch-like or gyrus-like pits), and type V (irregular or non-structural pits). Type V was later subdivided into VI (irregular arrangement and sizes of type III and IV pits) and VN (loss or decrease of pits with an amorphous structure). Types I and II are non-neoplastic; types IIIL, IIIS and IV are adenomatous; types VI and VN are cancerous.',
  reference: 'Kudo S et al. Gastrointest Endosc 1996;44:8-14; Endoscopy 2001;33:367-373',
  pubmed: '8836710',
  figures: [
    {
      href: 'https://www.e-ce.org/journal/view.php?doi=10.5946/ce.2024.263#f4-ce-2024-263',
      hrefLabel: 'Fig. 4',
      figureKind: 'secondary',
      sourceShort: 'Kim 2025',
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
      figureKind: 'gicalc',
      sourceShort: 'GI Calc',
      alt: 'Original schematic of Kudo–Tsuruta pit patterns supplied for GI Calc',
      caption: 'Kudo–Tsuruta pit pattern Types I–VN — supplied original schematic',
      source: 'GI Calc original schematic, 2026.',
      license: 'CC BY 4.0',
      note: '原著図ではない提供されたGemini生成SVG。複合図自体は埋め込まず、各型のcrop-targetを高解像度WebPへラスタライズ。',
    },
  ],
  entries: [
    {
      label: 'Type I',
      meaning: 'Round pit',
      group: '非腫瘍',
      severity: 'none',
      rows: [
        { heading: 'Pit', text: 'Round pit (normal pit); round and regular' },
        { heading: 'Histology', text: 'Normal glands or inflammatory mucosa' },
      ],
      figures: [userSchematicCrop('type-i', 'Type I', 'Round pit')],
    },
    {
      label: 'Type II',
      meaning: 'Asteroid pit',
      group: '非腫瘍',
      severity: 'none',
      rows: [
        { heading: 'Pit', text: 'Asteroid pit; star-shaped or onion-like, larger than normal' },
        { heading: 'Histology', text: 'Hyperplastic polyp' },
      ],
      figures: [userSchematicCrop('type-ii', 'Type II', 'Asteroid pit')],
    },
    {
      label: 'Type IIIs',
      meaning: 'Small tubular pits',
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
      figures: [userSchematicCrop('type-iiis', 'Type IIIs', 'Small tubular pits')],
    },
    {
      label: 'Type IIIL',
      meaning: 'Large tubular pits',
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
      figures: [userSchematicCrop('type-iiil', 'Type IIIL', 'Large tubular pits')],
    },
    {
      label: 'Type IV',
      meaning: 'Gyrus-like / dendritic pit',
      group: '腺腫',
      severity: 'mild',
      rows: [
        { heading: 'Pit', text: 'Dendritic or gyrus-like pit; branch-like' },
        { heading: 'Histology', text: 'Tubulovillous or villous adenoma; may include intramucosal cancer' },
      ],
      figures: [userSchematicCrop('type-iv', 'Type IV', 'Gyrus-like / dendritic pit')],
    },
    {
      label: 'Type VI mild',
      meaning: 'Mild irregular pits',
      group: '癌',
      severity: 'moderate',
      comment:
        '箱根合意（2004）で不整腺管を VI と統一したうえでの軽度不整。腺管構造は保たれる。高度不整は次のカード。',
      rows: [
        {
          heading: 'Pit',
          text: 'Irregular arrangement and sizes of IIIS, IIIL, and IV type pit pattern, with architecture still preserved',
        },
        { heading: 'Note', text: 'I stands for irregular (structural atypism). Mild = low-grade irregularity.' },
        {
          heading: 'Hakone 2004',
          text:
            'Hakone Pit Pattern Symposium (Apr 2004): irregular glandular structure = VI; clear amorphous area = VN. VI was later read as mild vs severe for depth.',
        },
        {
          heading: 'Histology',
          text: 'Often intramucosal cancer or shallow submucosal invasive cancer (M to shallow SM).',
        },
      ],
      figures: [userSchematicCrop('type-vi', 'Type VI mild', 'Mild irregular pits')],
    },
    {
      label: 'Type VI severe',
      meaning: 'Severe irregular pits',
      group: '癌',
      severity: 'severe',
      comment:
        'VI 高度不整（破壊・荒廃）。invasive pattern（藤井）と重なる深達度指標。明らかな無構造は Type VN。',
      rows: [
        {
          heading: 'Pit',
          text:
            'Destroyed / desert pits: lumen narrowing, irregular margins, unclear contours, reduced or lost stromal staining, scratch sign (Kudo group 2005)',
        },
        {
          heading: 'Note',
          text: 'High-grade irregularity within VI. An index of deep SM invasion when architecture is lost but a clear amorphous VN area is not yet present.',
        },
        {
          heading: 'Invasive pattern',
          text:
            'Fujii clinical chromoscopy: irregular / distorted crypts whose orifices cannot be traced clearly, inside a demarcated area (depression, large nodule, or reddened zone). Overlaps VI severe and VN. Predicts deep SM (≥1000 μm) and favors surgery over endoscopic resection.',
        },
        {
          heading: 'Histology',
          text: 'Favors deep submucosal invasive cancer. If a clear amorphous area is present, classify as Type VN.',
        },
      ],
      figures: [userSchematicCrop('type-vi', 'Type VI severe', 'Severe irregular pits')],
    },
    {
      label: 'Type VN',
      meaning: 'Non-structure',
      group: '癌',
      severity: 'severe',
      comment: '箱根合意では「明らかな無構造領域」のみを VN。SM 深部浸潤の確実な指標。',
      rows: [
        { heading: 'Pit', text: 'Loss or decrease of pits with an amorphous (non-structural) structure' },
        {
          heading: 'Note',
          text:
            'N stands for non-structure. Hakone 2004 restricts VN to an apparent amorphous area (exposed desmoplastic reaction of deeply invasive SM cancer).',
        },
        { heading: 'Histology', text: 'Deep submucosal invasive cancer' },
      ],
      figures: [userSchematicCrop('type-vn', 'Type VN', 'Non-structure')],
    },
  ],
};
