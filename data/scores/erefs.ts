import type { ClassificationDefinition, ClassificationFigure } from '../../types/score';

/** Hirano 2013 Gut（PMID 22619364） */
export const EREFS_2013_PUBMED = '22619364';
export const EREFS_ABE_2022_PUBMED = '36553209';

const ABE_SOURCE =
  'Abe Y, Sasaki Y, Yagi M, Mizumoto N, Onozato Y, Umehara M, et al. Endoscopic Diagnosis of Eosinophilic Esophagitis: Basics and Recent Advances. Diagnostics. 2022;12:3202. Fig. 2. Original grading: Hirano I, Moy N, Heckman MG, et al. Endoscopic assessment of the oesophageal features of eosinophilic oesophagitis: validation of a novel classification and grading system. Gut. 2013;62:489-495.';
const ABE_DOI = 'https://doi.org/10.3390/diagnostics12123202';

function abeCrop(figure: {
  src: string;
  alt: string;
  caption: string;
  note: string;
  aspectRatio: number;
}): ClassificationFigure {
  return {
    ...figure,
    source: ABE_SOURCE,
    doi: ABE_DOI,
    pubmed: EREFS_ABE_2022_PUBMED,
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  };
}

export const erefsScore: ClassificationDefinition = {
  id: 'erefs',
  kind: 'classification',
  name: 'EREFS（好酸球性食道炎）',
  shortName: 'EREFS',
  organ: 'esophagus',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '好酸球性食道炎の内視鏡所見（Edema / Rings / Exudates / Furrows / Stricture）。原著の合計は 0–8。生検の代替ではない。',
  originalLead:
    'The EoE Endoscopic Reference Score (EREFS) grades five major esophageal features: edema, rings, exudates, furrows, and stricture. Fixed rings: grade 0 none; grade 1 mild (subtle circumferential ridges); grade 2 moderate (distinct rings that do not impair passage of a standard adult endoscope); grade 3 severe (distinct rings that do not permit passage of a diagnostic endoscope). Exudates: grade 0 none; grade 1 mild (lesions involving ≤10% of the esophageal surface area); grade 2 severe (>10%). Furrows: grade 0 absent; grade 1 present. Edema: grade 0 absent (visible vascular markings); grade 1 loss of clarity or absence of vascular markings. Stricture: grade 0 absent; grade 1 present. Crepe-paper esophagus is a minor feature (absent or present). Report the highest score from the area of greatest involvement. The classification is not a substitute for esophageal biopsies.',
  reference: 'Hirano I et al. Gut 2013;62:489-495',
  pubmed: EREFS_2013_PUBMED,
  entries: [
    {
      label: 'Edema',
      meaning: 'Decreased vascular markings',
      group: '炎症',
      severity: 'mild',
      figures: [
        abeCrop({
          src: '/figures/erefs-abe2022-fig2-edema.jpg',
          alt: 'EREFS edema with decreased vascularity (Abe 2022 Fig. 2a)',
          caption: 'Fig. 2a Edema',
          note: '原図 Fig. 2a から切り抜き（浮腫）。MDPI Diagnostics。ライセンスは CC BY 4.0。Hirano 2013 Gut 原著の表は CC ではない。',
          aspectRatio: 243 / 182,
        }),
      ],
      rows: [
        { heading: 'Grade 0', text: 'Absent — distinct vascular markings' },
        { heading: 'Grade 1', text: 'Present — loss of clarity or absence of vascular markings' },
      ],
    },
    {
      label: 'Rings',
      meaning: 'Fixed rings / trachealization',
      group: '線維狭窄',
      severity: 'moderate',
      figures: [
        abeCrop({
          src: '/figures/erefs-abe2022-fig2-rings.jpg',
          alt: 'EREFS rings / esophageal trachealization (Abe 2022 Fig. 2b)',
          caption: 'Fig. 2b Rings',
          note: '原図 Fig. 2b から切り抜き（輪状溝）。MDPI Diagnostics。ライセンスは CC BY 4.0。Hirano 2013 Gut 原著の表は CC ではない。',
          aspectRatio: 241 / 182,
        }),
      ],
      rows: [
        { heading: 'Grade 0', text: 'None' },
        { heading: 'Grade 1', text: 'Mild — subtle circumferential ridges' },
        {
          heading: 'Grade 2',
          text: 'Moderate — distinct rings that do not impair passage of a standard adult endoscope',
        },
        {
          heading: 'Grade 3',
          text: 'Severe — distinct rings that do not permit passage of a diagnostic endoscope',
        },
      ],
    },
    {
      label: 'Exudates',
      meaning: 'White plaques or spots',
      group: '炎症',
      severity: 'mild',
      figures: [
        abeCrop({
          src: '/figures/erefs-abe2022-fig2-exudates.jpg',
          alt: 'EREFS white exudates (Abe 2022 Fig. 2c)',
          caption: 'Fig. 2c Exudates',
          note: '原図 Fig. 2c から切り抜き（白斑）。MDPI Diagnostics。ライセンスは CC BY 4.0。Hirano 2013 Gut 原著の表は CC ではない。',
          aspectRatio: 243 / 182,
        }),
      ],
      rows: [
        { heading: 'Grade 0', text: 'None' },
        { heading: 'Grade 1', text: 'Mild — lesions involving ≤10% of the esophageal surface area' },
        { heading: 'Grade 2', text: 'Severe — lesions involving >10% of the esophageal surface area' },
      ],
    },
    {
      label: 'Furrows',
      meaning: 'Longitudinal furrows',
      group: '炎症',
      severity: 'mild',
      figures: [
        abeCrop({
          src: '/figures/erefs-abe2022-fig2-furrows.jpg',
          alt: 'EREFS longitudinal furrows (Abe 2022 Fig. 2d)',
          caption: 'Fig. 2d Furrows',
          note: '原図 Fig. 2d から切り抜き（縦走溝）。MDPI Diagnostics。ライセンスは CC BY 4.0。Hirano 2013 Gut 原著の表は CC ではない。',
          aspectRatio: 243 / 183,
        }),
      ],
      rows: [
        { heading: 'Grade 0', text: 'Absent' },
        { heading: 'Grade 1', text: 'Present — vertical lines in the esophageal mucosa' },
      ],
      comment: '後年の改変では furrows を 0 / 軽度 / 高度の 3 段階にすることもある。ここは 2013 年原著の 0–1。',
    },
    {
      label: 'Stricture',
      meaning: 'Focal narrowing',
      group: '線維狭窄',
      severity: 'severe',
      figures: [
        abeCrop({
          src: '/figures/erefs-abe2022-fig2-stricture.jpg',
          alt: 'EREFS focal stricture (Abe 2022 Fig. 2e)',
          caption: 'Fig. 2e Stricture',
          note: '原図 Fig. 2e から切り抜き（狭窄）。MDPI Diagnostics。ライセンスは CC BY 4.0。Hirano 2013 Gut 原著の表は CC ではない。',
          aspectRatio: 241 / 183,
        }),
        abeCrop({
          src: '/figures/erefs-abe2022-fig2-narrow-caliber.jpg',
          alt: 'Narrow-caliber esophagus (Abe 2022 Fig. 2f)',
          caption: 'Fig. 2f Narrow caliber',
          note: '原図 Fig. 2f から切り抜き（細径化。2013 年原著の EREFS 項目ではない）。MDPI Diagnostics。ライセンスは CC BY 4.0。Hirano 2013 Gut 原著の表は CC ではない。',
          aspectRatio: 243 / 183,
        }),
      ],
      rows: [
        { heading: 'Grade 0', text: 'Absent' },
        { heading: 'Grade 1', text: 'Present' },
      ],
    },
    {
      label: 'Total',
      meaning: 'Sum 0–8',
      group: '合計',
      severity: 'moderate',
      rows: [
        { heading: 'Range', text: 'Edema 0–1 + rings 0–3 + exudates 0–2 + furrows 0–1 + stricture 0–1 = 0–8' },
        {
          heading: 'Domains',
          text: 'Inflammatory features: edema, exudates, and furrows. Fibrostenotic features: rings and stricture',
        },
        {
          heading: 'Reporting',
          text: 'Use the highest score from the area of greatest involvement. Crepe-paper esophagus is a minor feature (absent or present).',
        },
      ],
      comment: '診断には遠位と中部から生検が必要。EREFS だけでは確定しない。',
    },
  ],
};
