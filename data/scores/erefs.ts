import type { ClassificationDefinition } from '../../types/score';

/** Hirano 2013 Gut（PMID 22619364） */
export const EREFS_2013_PUBMED = '22619364';
export const EREFS_ABE_2022_PUBMED = '36553209';

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
  figures: [
    {
      src: '/figures/erefs-abe2022-fig2.webp',
      alt: 'EREFS findings: edema, rings, exudates, furrows, stricture, and narrow-caliber esophagus (Abe 2022 Fig. 2)',
      caption: 'Fig. 2. Characteristic endoscopic findings of EoE (Abe et al. Diagnostics 2022)',
      source:
        'Abe Y, Sasaki Y, Yagi M, Mizumoto N, Onozato Y, Umehara M, et al. Endoscopic Diagnosis of Eosinophilic Esophagitis: Basics and Recent Advances. Diagnostics. 2022;12:3202. Fig. 2. Original grading: Hirano I, Moy N, Heckman MG, et al. Endoscopic assessment of the oesophageal features of eosinophilic oesophagitis: validation of a novel classification and grading system. Gut. 2013;62:489-495.',
      doi: 'https://doi.org/10.3390/diagnostics12123202',
      pubmed: EREFS_ABE_2022_PUBMED,
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      note: 'Abe 2022 Fig. 2（a 浮腫、b 輪状溝、c 白斑、d 縦走溝、e 狭窄、f 細径化）。MDPI Diagnostics。ライセンスは CC BY 4.0。Hirano 2013 Gut 原著の表は CC ではない。',
      aspectRatio: 752 / 383,
    },
  ],
  entries: [
    {
      label: 'Edema',
      meaning: 'Decreased vascular markings',
      group: '炎症',
      severity: 'mild',
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
